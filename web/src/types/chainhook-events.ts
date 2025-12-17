/**
 * Type definitions for blockchain events from the DEX smart contracts
 * These types define the structure of events emitted by the order book and swap contracts
 */

/**
 * Base event interface that all chainhook events extend
 */
export interface BaseChainEvent {
    txid: string;
    blockHeight: number;
    timestamp: number;
}

/**
 * Order placed event - emitted when a new order is added to the order book
 */
export interface OrderPlacedEvent extends BaseChainEvent {
    orderId: string;
    maker: string;
    isBuyOrder: boolean;
    amount: string;
    price: string;
    tokenPair: {
        base: string;
        quote: string;
    };
}

/**
 * Order cancelled event - emitted when an order is removed from the book
 */
export interface OrderCancelledEvent extends BaseChainEvent {
    orderId: string;
    maker: string;
    remainingAmount: string;
}

/**
 * Order matched event - emitted when orders are matched
 */
export interface OrderMatchedEvent extends BaseChainEvent {
    buyOrderId: string;
    sellOrderId: string;
    buyer: string;
    seller: string;
    matchedAmount: string;
    matchedPrice: string;
}

/**
 * Trade executed event - emitted when a trade is completed
 */
export interface TradeExecutedEvent extends BaseChainEvent {
    tradeId: string;
    buyer: string;
    seller: string;
    amount: string;
    price: string;
    tokenPair: {
        base: string;
        quote: string;
    };
}

/**
 * Swap initiated event - emitted when an atomic swap starts
 */
export interface SwapInitiatedEvent extends BaseChainEvent {
    swapId: string;
    initiator: string;
    counterparty: string;
    offeredToken: string;
    offeredAmount: string;
    requestedToken: string;
    requestedAmount: string;
}

/**
 * Swap completed event - emitted when an atomic swap is finalized
 */
export interface SwapCompletedEvent extends BaseChainEvent {
    swapId: string;
    initiator: string;
    counterparty: string;
    success: boolean;
}

/**
 * Union type of all possible DEX events
 */
export type DexEvent =
    | OrderPlacedEvent
    | OrderCancelledEvent
    | OrderMatchedEvent
    | TradeExecutedEvent
    | SwapInitiatedEvent
    | SwapCompletedEvent;

/**
 * Event handler callback type
 */
export type EventHandler<T extends DexEvent> = (event: T) => void;

/**
 * Event subscription options
 */
export interface EventSubscriptionOptions {
    onError?: (error: Error) => void;
    onConnect?: () => void;
    onDisconnect?: () => void;
}
