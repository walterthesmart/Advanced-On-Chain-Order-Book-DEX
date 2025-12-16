
import { ArrowDownUp, Settings, Wallet } from 'lucide-react';
import { useDEXContract } from '../hooks/useDEXContract';

interface Props {
    balance: string;
    isLoggedIn: boolean;
}

export const Swap = ({ balance, isLoggedIn }: Props) => {
    const { placeOrder } = useDEXContract();

    // Hardcoded for demo
    const handleSwap = () => {
        placeOrder(100, 1500000, true);
    };

    return (
        <div style={{ background: 'rgba(0,0,0,0.2)', padding: '20px', borderRadius: '12px', border: '1px solid var(--glass-border)', flex: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h4 style={{ color: 'var(--text-muted)', margin: 0 }}>Swap</h4>
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

                <button className="btn-primary"
                    style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}
                    disabled={!isLoggedIn}
                    onClick={handleSwap}
                >
                    {!isLoggedIn && <Wallet size={18} />}
                    {isLoggedIn ? 'Swap' : 'Connect Wallet to Trade'}
                </button>
            </div>
        </div>
    );
};
