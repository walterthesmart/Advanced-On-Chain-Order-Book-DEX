import { useState, useEffect, useCallback } from 'react';
import { chainhooksClient } from '../services/chainhooks.client';
import type {
    SwapInitiatedEvent,
    SwapCompletedEvent,
    EventSubscriptionOptions
} from '../types/chainhook-events';

/**
 * React hook for subscribing to atomic swap events via chainhooks
 * Monitors swap initiations and completions for the DEX
 */
export const useSwapEvents = (options?: EventSubscriptionOptions) => {
    const [pendingSwaps, setPendingSwaps] = useState<SwapInitiatedEvent[]>([]);
    const [completedSwaps, setCompletedSwaps] = useState<SwapCompletedEvent[]>([]);
    const [isConnected, setIsConnected] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    /**
     * Handle swap initiated events
     */
    const handleSwapInitiated = useCallback((event: SwapInitiatedEvent) => {
        console.log('🔄 Swap initiated:', event);
        setPendingSwaps(prev => [event, ...prev].slice(0, 50));
    }, []);

    /**
     * Handle swap completed events
     */
    const handleSwapCompleted = useCallback((event: SwapCompletedEvent) => {
        console.log(event.success ? '✅ Swap completed successfully' : '❌ Swap failed', event);

        setCompletedSwaps(prev => [event, ...prev].slice(0, 100));

        // Remove from pending swaps
        setPendingSwaps(prev => prev.filter(swap => swap.swapId !== event.swapId));
    }, []);

    /**
     * Subscribe to swap events
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

                // Subscribe to swap events
                setIsConnected(true);
                options?.onConnect?.();

                console.log('✅ Subscribed to swap events');
            } catch (err) {
                const error = err instanceof Error ? err : new Error('Unknown error');
                setError(error);
                setIsConnected(false);
                options?.onError?.(error);
                console.error('Failed to subscribe to swap events:', error);
            }
        };

        initializeSubscription();

        // Cleanup on unmount
        return () => {
            setIsConnected(false);
            options?.onDisconnect?.();
            console.log('🔌 Unsubscribed from swap events');
        };
    }, [options]);

    /**
     * Get pending swaps for a specific user
     */
    const getPendingSwapsByUser = useCallback((userAddress: string) => {
        return pendingSwaps.filter(swap =>
            swap.initiator === userAddress || swap.counterparty === userAddress
        );
    }, [pendingSwaps]);

    /**
     * Get completed swaps for a specific user
     */
    const getCompletedSwapsByUser = useCallback((userAddress: string) => {
        return completedSwaps.filter(swap =>
            swap.initiator === userAddress || swap.counterparty === userAddress
        );
    }, [completedSwaps]);

    /**
     * Get swap success rate
     */
    const getSuccessRate = useCallback(() => {
        if (completedSwaps.length === 0) return 0;

        const successfulSwaps = completedSwaps.filter(swap => swap.success).length;
        return (successfulSwaps / completedSwaps.length) * 100;
    }, [completedSwaps]);

    return {
        pendingSwaps,
        completedSwaps,
        isConnected,
        error,
        handleSwapInitiated,
        handleSwapCompleted,
        getPendingSwapsByUser,
        getCompletedSwapsByUser,
        getSuccessRate,
    };
};
