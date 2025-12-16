
import { ArrowUp, ArrowDown } from 'lucide-react';

export const OrderBook = () => {
    return (
        <div className="glass-panel" style={{ background: 'rgba(0,0,0,0.2)', padding: '24px', borderRadius: '16px', border: '1px solid var(--glass-border)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', alignItems: 'center' }}>
                <h4 style={{ color: 'var(--text-muted)', margin: 0 }}>Order Book</h4>
                <div style={{ fontSize: '12px', color: 'var(--text-dim)' }}>Spread: 0.8%</div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', fontSize: '12px', color: 'var(--text-dim)', paddingBottom: '8px', borderBottom: '1px solid var(--glass-border)', marginBottom: '12px' }}>
                <div style={{ textAlign: 'left' }}>Price (USDA)</div>
                <div style={{ textAlign: 'center' }}>Amount (STX)</div>
                <div style={{ textAlign: 'right' }}>Total (USDA)</div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                {[...Array(5)].map((_, i) => (
                    <div key={i} className="order-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', fontSize: '13px', padding: '4px 0', cursor: 'pointer', transition: 'background 0.2s' }}>
                        <span style={{ color: '#ff4d4d', display: 'flex', alignItems: 'center', gap: '4px' }}>
                            {(1.45 + i * 0.01).toFixed(2)}
                        </span>
                        <span style={{ color: 'var(--text-dim)', textAlign: 'center' }}>{(Math.random() * 1000).toFixed(0)}</span>
                        <span style={{ color: 'var(--text-main)', textAlign: 'right' }}>{(Math.random() * 500).toFixed(0)}</span>
                    </div>
                ))}

                <div style={{ margin: '12px 0', padding: '8px 0', borderTop: '1px solid var(--glass-border)', borderBottom: '1px solid var(--glass-border)', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '16px', fontWeight: 600, color: 'var(--text-main)' }}>1.44 USDA</span>
                    <span style={{ fontSize: '12px', color: 'var(--text-dim)' }}>$1.44</span>
                </div>

                {[...Array(5)].map((_, i) => (
                    <div key={i} className="order-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', fontSize: '13px', padding: '4px 0', cursor: 'pointer' }}>
                        <span style={{ color: '#00cc66', display: 'flex', alignItems: 'center', gap: '4px' }}>
                            {(1.44 - i * 0.01).toFixed(2)}
                        </span>
                        <span style={{ color: 'var(--text-dim)', textAlign: 'center' }}>{(Math.random() * 1000).toFixed(0)}</span>
                        <span style={{ color: 'var(--text-main)', textAlign: 'right' }}>{(Math.random() * 500).toFixed(0)}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};
