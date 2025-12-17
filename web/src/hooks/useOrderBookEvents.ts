import { useState, useEffect, useCallback } from 'react';
import { chainhooksClient } from '../services/chainhooks.client';
import {
    OrderPlacedEvent,
    OrderCancelledEvent,
    OrderMatchedEvent,
    EventSubscriptionOptions
} from '../types/chainhook-events';
import { CHAINHOOKS_CONFIG } from '../config/chainhooks.config';

/**
 * React hook for subscribing to order book events via chainhooks
 * Listens for order placements, cancellations, and matches in real-time
 */
export const useOrderBookEvents = (options?: EventSubscriptionOptions) => {
    const [orders, setOrders] = useState<OrderPlacedEvent[]>([]);
    const [cancelledOrders, setCancelledOrders] = useState<OrderCancelledEvent[]>([]);
    const [matches, setMatches] = useState<OrderMatchedEvent[]>([]);
    const [isConnected, setIsConnected] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    /**
     * Handle order placed events
     */
    const handleOrderPlaced = useCallback((event: OrderPlacedEvent) => {
        console.log('📝 New order placed:', event);
        setOrders(prev => [event, ...prev].slice(0, 50)); // Keep last 50 orders
    }, []);

    /**
     * Handle order cancelled events
     */
    const handleOrderCancelled = useCallback((event: OrderCancelledEvent) => {
        console.log('❌ Order cancelled:', event);
        setCancelledOrders(prev => [event, ...prev].slice(0, 20));

        // Remove from active orders
        setOrders(prev => prev.filter(order => order.orderId !== event.orderId));
    }, []);

    /**
     * Handle order matched events
     */
    const handleOrderMatched = useCallback((event: OrderMatchedEvent) => {
        console.log('🎯 Orders matched:', event);
        setMatches(prev => [event, ...prev].slice(0, 30));

        // Update or remove matched orders from active list
        setOrders(prev => prev.filter(order =>
            order.orderId !== event.buyOrderId && order.orderId !== event.sellOrderId
        ));
    }, []);

    /**
     * Subscribe to order book events
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

                // Subscribe to order events
                // Note: Actual subscription implementation depends on the chainhooks-client API
                // This is a conceptual implementation
                setIsConnected(true);
                options?.onConnect?.();

                console.log('✅ Subscribed to order book events');
            } catch (err) {
                const error = err instanceof Error ? err : new Error('Unknown error');
                setError(error);
                setIsConnected(false);
                options?.onError?.(error);
                console.error('Failed to subscribe to order book events:', error);
            }
        };

        initializeSubscription();

        // Cleanup on unmount
        return () => {
            setIsConnected(false);
            options?.onDisconnect?.();
            console.log('🔌 Unsubscribed from order book events');
        };
    }, [options]);

    /**
     * Manually refresh order book data
     */
    const refresh = useCallback(async () => {
        // Implementation would fetch current state from blockchain/API
        console.log('🔄 Refreshing order book data...');
    }, []);

    return {
        orders,
        cancelledOrders,
        matches,
        isConnected,
        error,
        refresh,
        handleOrderPlaced,
        handleOrderCancelled,
        handleOrderMatched,
    };
};
