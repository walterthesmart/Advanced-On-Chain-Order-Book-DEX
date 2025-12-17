import { ArrowUp, ArrowDown } from 'lucide-react';
import { useOrderBookEvents } from '../hooks/useOrderBookEvents';
import { useMemo } from 'react';
import toast from 'react-hot-toast';

export const OrderBook = () => {
    // Subscribe to real-time order book events from blockchain
    const { orders, matches, isConnected, error } = useOrderBookEvents({
        onConnect: () => toast.success('📡 Connected to order book feed'),
        onError: (err) => toast.error(`Failed to connect: ${err.message}`),
        onDisconnect: () => toast('Disconnected from order book feed'),
    });

    // Separate buy and sell orders
    const { buyOrders, sellOrders } = useMemo(() => {
        const buys = orders.filter(o => o.isBuyOrder).slice(0, 5);
        const sells = orders.filter(o => !o.isBuyOrder).slice(0, 5);
        return { buyOrders: buys, sellOrders: sells };
    }, [orders]);

    // Calculate spread
    const spread = useMemo(() => {
        if (buyOrders.length === 0 || sellOrders.length === 0) return '0';
        const bestBid = Math.max(...buyOrders.map(o => parseFloat(o.price)));
        const bestAsk = Math.min(...sellOrders.map(o => parseFloat(o.price)));
        return ((bestAsk - bestBid) / bestBid * 100).toFixed(2);
    }, [buyOrders, sellOrders]);

    return (
        <div className="glass-panel" style={{ background: 'rgba(0,0,0,0.2)', padding: '24px', borderRadius: '16px', border: '1px solid var(--glass-border)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', alignItems: 'center' }}>
                <h4 style={{ color: 'var(--text-muted)', margin: 0 }}>
                    Order Book {isConnected && <span style={{ color: '#00cc66', fontSize: '10px' }}>● LIVE</span>}
                </h4>
                <div style={{ fontSize: '12px', color: 'var(--text-dim)' }}>Spread: {spread}%</div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', fontSize: '12px', color: 'var(--text-dim)', paddingBottom: '8px', borderBottom: '1px solid var(--glass-border)', marginBottom: '12px' }}>
                <div style={{ textAlign: 'left' }}>Price (USDA)</div>
                <div style={{ textAlign: 'center' }}>Amount (STX)</div>
                <div style={{ textAlign: 'right' }}>Total (USDA)</div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                {/* Sell orders (asks) */}
                {sellOrders.length > 0 ? sellOrders.map((order) => {
                    const total = (parseFloat(order.amount) * parseFloat(order.price)).toFixed(2);
                    return (
                        <div key={order.orderId} className="order-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', fontSize: '13px', padding: '4px 0', cursor: 'pointer', transition: 'background 0.2s' }}>
                            <span style={{ color: '#ff4d4d', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                {parseFloat(order.price).toFixed(2)}
                            </span>
                            <span style={{ color: 'var(--text-dim)', textAlign: 'center' }}>{parseFloat(order.amount).toFixed(0)}</span>
                            <span style={{ color: 'var(--text-main)', textAlign: 'right' }}>{total}</span>
                        </div>
                    );
                }) : [...Array(5)].map((_, i) => (
                    <div key={`sell-${i}`} className="order-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', fontSize: '13px', padding: '4px 0', opacity: 0.3 }}>
                        <span style={{ color: '#ff4d4d' }}>{(1.45 + i * 0.01).toFixed(2)}</span>
                        <span style={{ color: 'var(--text-dim)', textAlign: 'center' }}>-</span>
                        <span style={{ color: 'var(--text-main)', textAlign: 'right' }}>-</span>
                    </div>
                ))}

                <div style={{ margin: '12px 0', padding: '8px 0', borderTop: '1px solid var(--glass-border)', borderBottom: '1px solid var(--glass-border)', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '16px', fontWeight: 600, color: 'var(--text-main)' }}>1.44 USDA</span>
                    <span style={{ fontSize: '12px', color: 'var(--text-dim)' }}>$1.44</span>
                </div>

                {/* Buy orders (bids) */}
                {buyOrders.length > 0 ? buyOrders.map((order) => {
                    const total = (parseFloat(order.amount) * parseFloat(order.price)).toFixed(2);
                    return (
                        <div key={order.orderId} className="order-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', fontSize: '13px', padding: '4px 0', cursor: 'pointer' }}>
                            <span style={{ color: '#00cc66', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                {parseFloat(order.price).toFixed(2)}
                            </span>
                            <span style={{ color: 'var(--text-dim)', textAlign: 'center' }}>{parseFloat(order.amount).toFixed(0)}</span>
                            <span style={{ color: 'var(--text-main)', textAlign: 'right' }}>{total}</span>
                        </div>
                    );
                }) : [...Array(5)].map((_, i) => (
                    <div key={`buy-${i}`} className="order-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', fontSize: '13px', padding: '4px 0', opacity: 0.3 }}>
                        <span style={{ color: '#00cc66' }}>{(1.44 - i * 0.01).toFixed(2)}</span>
                        <span style={{ color: 'var(--text-dim)', textAlign: 'center' }}>-</span>
                        <span style={{ color: 'var(--text-main)', textAlign: 'right' }}>-</span>
                    </div>
                ))}
            </div>
        </div>
    );
};
