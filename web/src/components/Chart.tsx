
export const Chart = () => {
    return (
        <div className="glass-panel" style={{ background: 'rgba(0,0,0,0.2)', padding: '24px', borderRadius: '16px', border: '1px solid var(--glass-border)', height: '400px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                    <h3 style={{ margin: 0 }}>STX/USDA</h3>
                    <span style={{ color: '#00cc66', fontWeight: 600 }}>+4.2%</span>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                    {['1H', '4H', '1D', '1W'].map(tf => (
                        <button key={tf} className="btn-secondary" style={{ padding: '4px 12px', fontSize: '12px' }}>{tf}</button>
                    ))}
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
                        <div key={i} style={{ position: 'absolute', top: `${i * 25}%`, left: 0, right: 0, borderTop: '1px dashed var(--glass-border)' }}></div>
                    ))}
                </div>
            </div>
        </div>
    );
};
