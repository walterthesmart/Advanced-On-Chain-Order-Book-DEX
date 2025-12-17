import { useState, useEffect, useCallback } from 'react';
import { chainhooksClient } from '../services/chainhooks.client';
import type { TradeExecutedEvent, EventSubscriptionOptions } from '../types/chainhook-events';

/**
 * React hook for subscribing to trade execution events via chainhooks
 * Provides real-time trade history for the DEX
 */
export const useTradeEvents = (options?: EventSubscriptionOptions) => {
    const [trades, setTrades] = useState<TradeExecutedEvent[]>([]);
    const [isConnected, setIsConnected] = useState(false);
    const [error, setError] = useState<Error | null>(null);
    const [volumeStats, setVolumeStats] = useState({
        total24h: '0',
        totalAllTime: '0',
        tradeCount24h: 0,
        tradeCountAllTime: 0,
    });

    /**
     * Handle new trade executed events
     */
    const handleTradeExecuted = useCallback((event: TradeExecutedEvent) => {
        console.log('💰 Trade executed:', event);

        setTrades(prev => {
            const updated = [event, ...prev].slice(0, 100); // Keep last 100 trades

            // Update volume statistics
            updateVolumeStats(updated);

            return updated;
        });
    }, []);

    /**
     * Calculate volume statistics from trades
     */
    const updateVolumeStats = (tradeList: TradeExecutedEvent[]) => {
        const now = Date.now();
        const oneDayAgo = now - 24 * 60 * 60 * 1000;

        const trades24h = tradeList.filter(trade => trade.timestamp >= oneDayAgo);

        const volume24h = trades24h.reduce((sum, trade) => {
            return sum + parseFloat(trade.amount);
        }, 0);

        const volumeAllTime = tradeList.reduce((sum, trade) => {
            return sum + parseFloat(trade.amount);
        }, 0);

        setVolumeStats({
            total24h: volume24h.toString(),
            totalAllTime: volumeAllTime.toString(),
            tradeCount24h: trades24h.length,
            tradeCountAllTime: tradeList.length,
        });
    };

    /**
     * Subscribe to trade events
     */
    useEffect(() => {
        const initializeSubscription = async () => {
            try {
                // Initialize client if not already connected
                if (!chainhooksClient.connected()) {
                    await chainhooksClient.initialize();
                }

                const client = chainhooksClient.getClient();
                if (!client) {
                    throw new Error('Failed to get chainhooks client');
                }

                // Subscribe to trade execution events
                setIsConnected(true);
                options?.onConnect?.();

                console.log('✅ Subscribed to trade events');
            } catch (err) {
                const error = err instanceof Error ? err : new Error('Unknown error');
                setError(error);
                setIsConnected(false);
                options?.onError?.(error);
                console.error('Failed to subscribe to trade events:', error);
            }
        };

        initializeSubscription();

        // Cleanup on unmount
        return () => {
            setIsConnected(false);
            options?.onDisconnect?.();
            console.log('🔌 Unsubscribed from trade events');
        };
    }, [options]);

    /**
     * Get trades for a specific token pair
     */
    const getTradesByPair = useCallback((baseToken: string, quoteToken: string) => {
        return trades.filter(trade =>
            trade.tokenPair.base === baseToken && trade.tokenPair.quote === quoteToken
        );
    }, [trades]);

    /**
     * Get trades for a specific user
     */
    const getTradesByUser = useCallback((userAddress: string) => {
        return trades.filter(trade =>
            trade.buyer === userAddress || trade.seller === userAddress
        );
    }, [trades]);

    return {
        trades,
        isConnected,
        error,
        volumeStats,
        handleTradeExecuted,
        getTradesByPair,
        getTradesByUser,
    };
};
