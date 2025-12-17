import { useOrderBookEvents } from '../hooks/useOrderBookEvents';
import { useMemo, useState, useEffect } from 'react';
import { userSession } from '../common/constants';

export const UserOrders = () => {
    const { orders: activeOrders, isConnected } = useOrderBookEvents();
    const [userAddress, setUserAddress] = useState<string>('');

    useEffect(() => {
        if (userSession.isUserSignedIn()) {
            const userData = userSession.loadUserData();
            // Stacks address (using testnet for dev environment compatibility)
            setUserAddress(userData.profile.stxAddress.testnet || userData.profile.stxAddress.mainnet);
        }
    }, []);

    const myOrders = useMemo(() => {
        if (!userAddress) return [];
        return activeOrders.filter(o => o.maker === userAddress);
    }, [activeOrders, userAddress]);

    return (
        <div className="glass-panel" style={{ background: 'rgba(0,0,0,0.2)', padding: '24px', borderRadius: '16px', border: '1px solid var(--glass-border)', marginTop: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', alignItems: 'center' }}>
                <h4 style={{ color: 'var(--text-muted)', margin: 0 }}>
                    Your Open Orders {isConnected && <span style={{ color: '#00cc66', fontSize: '10px' }}>● LIVE</span>}
                </h4>
                <div style={{ display: 'flex', gap: '8px' }}>
                    <button className="btn-secondary" style={{ padding: '4px 12px', fontSize: '12px', borderColor: 'var(--primary)', color: 'var(--primary)' }}>Active</button>
                    <button className="btn-secondary" style={{ padding: '4px 12px', fontSize: '12px' }}>History</button>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', fontSize: '12px', color: 'var(--text-dim)', paddingBottom: '8px', borderBottom: '1px solid var(--glass-border)', marginBottom: '12px' }}>
                <div style={{ textAlign: 'left' }}>Pair</div>
                <div style={{ textAlign: 'center' }}>Price</div>
                <div style={{ textAlign: 'center' }}>Amount</div>
                <div style={{ textAlign: 'right' }}>Action</div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                {myOrders.length > 0 ? myOrders.map((order) => (
                    <div key={order.orderId} className="trade-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', fontSize: '13px', padding: '12px 0', borderBottom: '1px solid rgba(255,255,255,0.02)', alignItems: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: order.isBuyOrder ? '#00cc66' : '#ff4d4d' }}></div>
                            <span style={{ fontWeight: 600 }}>STX/USDA</span>
                        </div>
                        <span style={{ color: 'var(--text-main)', textAlign: 'center' }}>{parseFloat(order.price).toFixed(2)}</span>
                        <span style={{ color: 'var(--text-main)', textAlign: 'center' }}>{parseFloat(order.amount).toFixed(0)}</span>
                        <div style={{ textAlign: 'right', display: 'flex', justifyContent: 'flex-end' }}>
                            <button style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', padding: '4px 8px', borderRadius: '4px' }} className="hover-danger">
                                <span style={{ fontSize: '12px' }}>Cancel</span>
                                <span style={{ fontSize: '14px', fontWeight: 'bold' }}>×</span>
                            </button>
                        </div>
                    </div>
                )) : (
                    <div style={{ padding: '40px 0', textAlign: 'center', color: 'var(--text-dim)' }}>
                        {/* Clock icon replaced with text/css spinner or just text */}
                        <div style={{ fontSize: '20px', marginBottom: '8px', opacity: 0.5 }}>🕒</div>
                        <div>No active orders</div>
                    </div>
                )}
            </div>
        </div>
    );
};
