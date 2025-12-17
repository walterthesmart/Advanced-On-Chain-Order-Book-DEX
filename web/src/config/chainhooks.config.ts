import { CONTRACT_ADDRESS, CONTRACT_NAME } from '../common/constants';

/**
 * Chainhooks configuration for monitoring DEX contract events
 * This configuration defines which blockchain events we want to listen to
 */
export const CHAINHOOKS_CONFIG = {
    // Base URL for the chainhooks server (typically runs on port 20456)
    baseUrl: process.env.VITE_CHAINHOOKS_URL || 'http://localhost:20456',

    // Network configuration
    network: 'devnet', // Can be 'mainnet', 'testnet', or 'devnet'

    // Contract to monitor
    contract: {
        address: CONTRACT_ADDRESS,
        name: CONTRACT_NAME,
    },

    // Events to subscribe to
    events: {
        // Order book events
        orderPlaced: 'order-placed',
        orderCancelled: 'order-cancelled',
        orderMatched: 'order-matched',

        // Trade events
        tradeExecuted: 'trade-executed',

        // Swap events (from atomic-swap contract)
        swapInitiated: 'swap-initiated',
        swapCompleted: 'swap-completed',
    },

    // Reconnection settings
    reconnect: {
        enabled: true,
        maxAttempts: 5,
        delayMs: 3000,
    },
};

export type ChainhookEvent = keyof typeof CHAINHOOKS_CONFIG.events;
