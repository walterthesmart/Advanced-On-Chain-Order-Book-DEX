
import { Maximize2, MoreHorizontal } from 'lucide-react';

export const Chart = () => {
    return (
        <div className="glass-panel" style={{ background: 'rgba(0,0,0,0.2)', padding: '24px', borderRadius: '16px', border: '1px solid var(--glass-border)', height: '400px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <h3 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                            STX/USDA
                            <span style={{ fontSize: '12px', background: 'rgba(255,255,255,0.1)', padding: '2px 6px', borderRadius: '4px', color: 'var(--text-muted)' }}>Spot</span>
                        </h3>
                        <span style={{ fontSize: '24px', fontWeight: 700, marginTop: '4px' }}>1.45 USDA</span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        <span style={{ color: '#00cc66', fontWeight: 600, fontSize: '14px' }}>+4.2%</span>
                        <span style={{ color: 'var(--text-muted)', fontSize: '12px' }}>24h Vol: $1.2M</span>
                    </div>
                </div>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <div style={{ background: 'var(--glass-surface)', padding: '4px', borderRadius: '8px', display: 'flex' }}>
                        {['1H', '4H', '1D', '1W'].map((tf, i) => (
                            <button key={tf} className="btn-secondary" style={{ padding: '6px 12px', fontSize: '12px', border: 'none', background: i === 2 ? 'rgba(255,255,255,0.1)' : 'transparent', color: i === 2 ? 'white' : 'var(--text-muted)' }}>{tf}</button>
                        ))}
                    </div>
                    <button className="btn-secondary" style={{ padding: '8px', display: 'flex' }}><Maximize2 size={16} /></button>
                </div>
            </div>

            <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
                {/* SVG Chart Placeholder */}
                <svg width="100%" height="100%" viewBox="0 0 800 300" preserveAspectRatio="none">
                    <defs>
                        <linearGradient id="gradient" x1="0" x2="0" y1="0" y2="1">
                            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.2" />
                            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
                        </linearGradient>
                    </defs>
                    <path d="M0,250 C100,240 150,200 200,220 C250,240 300,180 350,190 C400,200 450,150 500,160 C550,170 600,100 650,120 C700,140 750,80 800,90 V300 H0 Z" fill="url(#gradient)" />
                    <path d="M0,250 C100,240 150,200 200,220 C250,240 300,180 350,190 C400,200 450,150 500,160 C550,170 600,100 650,120 C700,140 750,80 800,90" fill="none" stroke="var(--accent)" strokeWidth="2" />
                </svg>

                {/* Grid Lines */}
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, pointerEvents: 'none' }}>
                    {[1, 2, 3].map(i => (
                        <div key={i} style={{ position: 'absolute', top: `${i * 25}%`, left: 0, right: 0, borderTop: '1px dashed var(--glass-border)', display: 'flex', alignItems: 'center' }}>
                            <span style={{ position: 'absolute', right: 0, top: '-10px', fontSize: '10px', color: 'var(--text-dim)', paddingRight: '8px' }}>
                                {(1.45 + (2 - i) * 0.1).toFixed(2)}
                            </span>
                        </div>
                    ))}
                </div>

                {/* Cursor Line Simulation */}
                <div style={{ position: 'absolute', top: 0, bottom: 0, left: '65%', borderLeft: '1px dashed rgba(255,255,255,0.3)', pointerEvents: 'none' }}>
                    <div style={{ position: 'absolute', top: '40%', left: '-4px', width: '8px', height: '8px', background: 'var(--accent)', borderRadius: '50%' }}></div>
                    <div style={{ position: 'absolute', top: '40%', right: '100%', background: 'var(--bg-panel)', padding: '2px 6px', borderRadius: '4px', fontSize: '10px', marginRight: '8px', border: '1px solid var(--glass-border)' }}>1.64</div>
                </div>
            </div>
        </div>
    );
};
