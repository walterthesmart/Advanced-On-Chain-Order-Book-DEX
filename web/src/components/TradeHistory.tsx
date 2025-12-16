
export const TradeHistory = () => {
    return (
        <div className="glass-panel" style={{ background: 'rgba(0,0,0,0.2)', padding: '24px', borderRadius: '16px', border: '1px solid var(--glass-border)', marginTop: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', alignItems: 'center' }}>
                <h4 style={{ color: 'var(--text-muted)', margin: 0 }}>Recent Trades</h4>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', fontSize: '12px', color: 'var(--text-dim)', paddingBottom: '8px', borderBottom: '1px solid var(--glass-border)', marginBottom: '12px' }}>
                <div style={{ textAlign: 'left' }}>Price (USDA)</div>
                <div style={{ textAlign: 'center' }}>Amount (STX)</div>
                <div style={{ textAlign: 'right' }}>Time</div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                {[...Array(8)].map((_, i) => (
                    <div key={i} className="trade-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', fontSize: '13px', padding: '6px 0', borderBottom: '1px solid rgba(255,255,255,0.02)' }}>
                        <span style={{ color: Math.random() > 0.5 ? '#00cc66' : '#ff4d4d' }}>
                            {(1.44 + (Math.random() - 0.5) * 0.05).toFixed(2)}
                        </span>
                        <span style={{ color: 'var(--text-main)', textAlign: 'center' }}>{(Math.random() * 500).toFixed(0)}</span>
                        <span style={{ color: 'var(--text-dim)', textAlign: 'right' }}>{new Date().toLocaleTimeString()}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};
