
import { ArrowDownUp, Settings, Wallet } from 'lucide-react';
import { useDEXContract } from '../hooks/useDEXContract';
import toast from 'react-hot-toast';
import { useState } from 'react';

interface Props {
    balance: string;
    isLoggedIn: boolean;
}

export const Swap = ({ balance, isLoggedIn }: Props) => {
    const { placeOrder } = useDEXContract();
    const [orderType, setOrderType] = useState<'market' | 'limit'>('market');

    // Hardcoded for demo
    const handleSwap = async () => {
        try {
            await placeOrder(100, 1500000, true);
            toast.success('Swap transaction submitted!', {
                style: {
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                },
            });
        } catch (e) {
            toast.error('Swap failed. Please try again.', {
                style: {
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                },
            });
        }
    };

    return (
        <div style={{ background: 'rgba(0,0,0,0.2)', padding: '20px', borderRadius: '12px', border: '1px solid var(--glass-border)', flex: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <div style={{ display: 'flex', background: 'var(--glass-surface)', borderRadius: '8px', padding: '2px' }}>
                    <button
                        onClick={() => setOrderType('market')}
                        style={{
                            background: orderType === 'market' ? 'rgba(255,255,255,0.1)' : 'transparent',
                            border: 'none',
                            color: orderType === 'market' ? 'white' : 'var(--text-muted)',
                            padding: '6px 12px',
                            borderRadius: '6px',
                            fontSize: '12px',
                            cursor: 'pointer',
                            transition: 'all 0.2s'
                        }}
                    >
                        Market
                    </button>
                    <button
                        onClick={() => setOrderType('limit')}
                        style={{
                            background: orderType === 'limit' ? 'rgba(255,255,255,0.1)' : 'transparent',
                            border: 'none',
                            color: orderType === 'limit' ? 'white' : 'var(--text-muted)',
                            padding: '6px 12px',
                            borderRadius: '6px',
                            fontSize: '12px',
                            cursor: 'pointer',
                            transition: 'all 0.2s'
                        }}
                    >
                        Limit
                    </button>
                </div>
                <Settings size={20} color="var(--text-muted)" style={{ cursor: 'pointer' }} />
            </div>

            <div style={{ marginTop: '20px' }}>
                <div style={{ background: 'rgba(255,255,255,0.05)', padding: '12px', borderRadius: '8px', marginBottom: '4px' }}>
                    <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '4px', display: 'flex', justifyContent: 'space-between' }}>
                        <span>You Pay</span>
                        <span>Balance: {(parseInt(balance) / 1000000).toFixed(2)}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <input type="text" value={balance === '0' ? '0.0' : (parseInt(balance) / 1000000).toFixed(2)} style={{ background: 'transparent', border: 'none', color: 'white', fontSize: '24px', width: '100%', outline: 'none' }} readOnly />
                        <span style={{ fontWeight: 600, background: 'var(--glass-surface)', padding: '4px 8px', borderRadius: '6px' }}>STX</span>
                    </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'center', margin: '-10px 0', position: 'relative', zIndex: 10 }}>
                    <div style={{ background: 'var(--bg-panel)', border: '1px solid var(--glass-border)', borderRadius: '50%', padding: '6px', cursor: 'pointer' }}>
                        <ArrowDownUp size={16} color="var(--text-main)" />
                    </div>
                </div>

                <div style={{ background: 'rgba(255,255,255,0.05)', padding: '12px', borderRadius: '8px', marginBottom: '20px' }}>
                    <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '4px' }}>You Receive</div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <input type="text" value="0.0" style={{ background: 'transparent', border: 'none', color: 'white', fontSize: '24px', width: '100%', outline: 'none' }} readOnly />
                        <span style={{ fontWeight: 600, background: 'var(--glass-surface)', padding: '4px 8px', borderRadius: '6px' }}>USDA</span>
                    </div>
                </div>

                {orderType === 'limit' && (
                    <div style={{ background: 'rgba(255,255,255,0.05)', padding: '12px', borderRadius: '8px', marginBottom: '20px' }}>
                        <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '4px' }}>Limit Price</div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <input type="text" value="1.50" style={{ background: 'transparent', border: 'none', color: 'white', fontSize: '18px', width: '100%', outline: 'none' }} readOnly />
                            <span style={{ fontSize: '12px', color: 'var(--text-dim)' }}>USDA</span>
                        </div>
                    </div>
                )}

                <button className="btn-primary"
                    style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}
                    disabled={!isLoggedIn}
                    onClick={handleSwap}
                >
                    {!isLoggedIn && <Wallet size={18} />}
                    {isLoggedIn ? (orderType === 'limit' ? 'Place Limit Order' : 'Swap Market') : 'Connect Wallet to Trade'}
                </button>
            </div>
        </div>
    );
};
