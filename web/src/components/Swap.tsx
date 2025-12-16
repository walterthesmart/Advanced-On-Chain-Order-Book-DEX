
interface Props {
    balance: string;
    isLoggedIn: boolean;
}

export const Swap = ({ balance, isLoggedIn }: Props) => {
    return (
        <div style={{ background: 'rgba(0,0,0,0.2)', padding: '20px', borderRadius: '12px', border: '1px solid var(--glass-border)', flex: 1 }}>
            <h4 style={{ color: 'var(--text-muted)' }}>Swap</h4>
            <div style={{ marginTop: '20px' }}>
                <div style={{ background: 'rgba(255,255,255,0.05)', padding: '12px', borderRadius: '8px', marginBottom: '10px' }}>
                    <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '4px' }}>You Pay</div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <input type="text" value={balance === '0' ? '0.0' : (parseInt(balance) / 1000000).toFixed(2)} style={{ background: 'transparent', border: 'none', color: 'white', fontSize: '20px', width: '100%' }} readOnly />
                        <span style={{ fontWeight: 600 }}>STX</span>
                    </div>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.05)', padding: '12px', borderRadius: '8px', marginBottom: '20px' }}>
                    <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '4px' }}>You Receive</div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <input type="text" value="0.0" style={{ background: 'transparent', border: 'none', color: 'white', fontSize: '20px', width: '100%' }} readOnly />
                        <span style={{ fontWeight: 600 }}>USDA</span>
                    </div>
                </div>
                <button className="btn-primary" style={{ width: '100%' }} disabled={!isLoggedIn}>
                    {isLoggedIn ? 'Swap' : 'Connect Wallet to Trade'}
                </button>
            </div>
        </div>
    );
};
