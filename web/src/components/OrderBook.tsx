
export const OrderBook = () => {
    return (
        <div style={{ background: 'rgba(0,0,0,0.2)', padding: '20px', borderRadius: '12px', border: '1px solid var(--glass-border)' }}>
            <h4 style={{ color: 'var(--text-muted)' }}>Order Book</h4>
            <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {[...Array(5)].map((_, i) => (
                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                        <span style={{ color: '#ff4d4d' }}>{(1.45 + i * 0.01).toFixed(2)}</span>
                        <span style={{ color: 'var(--text-dim)' }}>{(Math.random() * 1000).toFixed(0)} STX</span>
                        <span style={{ color: 'var(--text-main)' }}>{(Math.random() * 500).toFixed(0)} USDA</span>
                    </div>
                ))}
                <div style={{ margin: '10px 0', borderTop: '1px solid var(--glass-border)' }}></div>
                {[...Array(5)].map((_, i) => (
                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                        <span style={{ color: '#00cc66' }}>{(1.44 - i * 0.01).toFixed(2)}</span>
                        <span style={{ color: 'var(--text-dim)' }}>{(Math.random() * 1000).toFixed(0)} STX</span>
                        <span style={{ color: 'var(--text-main)' }}>{(Math.random() * 500).toFixed(0)} USDA</span>
                    </div>
                ))}
            </div>
        </div>
    );
};
