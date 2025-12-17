import { Chainhook, ServerConfig } from '@hirosystems/chainhooks-client';
import { CHAINHOOKS_CONFIG } from '../config/chainhooks.config';

/**
 * Initialize and configure the Chainhooks client
 * This creates a connection to the chainhooks server to listen for blockchain events
 */
class ChainhooksClient {
    private client: Chainhook | null = null;
    private reconnectAttempts = 0;
    private isConnected = false;

    /**
     * Initialize the chainhooks client with server configuration
     */
    async initialize(): Promise<void> {
        try {
            const serverConfig: ServerConfig = {
                baseUrl: CHAINHOOKS_CONFIG.baseUrl,
            };

            this.client = new Chainhook(serverConfig);
            this.isConnected = true;
            this.reconnectAttempts = 0;

            console.log('✅ Chainhooks client initialized successfully');
        } catch (error) {
            console.error('❌ Failed to initialize chainhooks client:', error);
            this.handleReconnect();
        }
    }

    /**
     * Handle reconnection logic with exponential backoff
     */
    private async handleReconnect(): Promise<void> {
        if (!CHAINHOOKS_CONFIG.reconnect.enabled) {
            return;
        }

        if (this.reconnectAttempts >= CHAINHOOKS_CONFIG.reconnect.maxAttempts) {
            console.error('❌ Max reconnection attempts reached. Please check your chainhooks server.');
            return;
        }

        this.reconnectAttempts++;
        const delay = CHAINHOOKS_CONFIG.reconnect.delayMs * this.reconnectAttempts;

        console.log(`🔄 Attempting to reconnect (${this.reconnectAttempts}/${CHAINHOOKS_CONFIG.reconnect.maxAttempts})...`);

        setTimeout(() => {
            this.initialize();
        }, delay);
    }

    /**
     * Get the chainhooks client instance
     */
    getClient(): Chainhook | null {
        return this.client;
    }

    /**
     * Check if client is connected
     */
    connected(): boolean {
        return this.isConnected;
    }

    /**
     * Disconnect the client
     */
    disconnect(): void {
        this.client = null;
        this.isConnected = false;
        console.log('🔌 Chainhooks client disconnected');
    }
}

// Export singleton instance
export const chainhooksClient = new ChainhooksClient();
