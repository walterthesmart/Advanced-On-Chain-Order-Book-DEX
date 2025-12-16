
import { Twitter, Github, Disc } from 'lucide-react';

export const Footer = () => {
    return (
        <footer style={{ marginTop: '80px', borderTop: '1px solid var(--glass-border)', padding: '40px 0', background: 'var(--bg-panel)' }}>
            <div className="page-container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '40px' }}>
                <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                        <div style={{ width: '24px', height: '24px', background: 'var(--primary)', borderRadius: '6px' }}></div>
                        <h3 style={{ margin: 0, fontSize: '20px' }}>StxDex</h3>
                    </div>
                    <p style={{ color: 'var(--text-muted)', fontSize: '14px', lineHeight: '1.6' }}>
                        The most advanced on-chain order book DEX built on Stacks. Bitcoin settlement, DeFi speed.
                    </p>
                    <div style={{ display: 'flex', gap: '16px', marginTop: '20px' }}>
                        <Github size={20} color="var(--text-muted)" className="hover-accent" style={{ cursor: 'pointer' }} />
                        <Twitter size={20} color="var(--text-muted)" className="hover-accent" style={{ cursor: 'pointer' }} />
                        <Disc size={20} color="var(--text-muted)" className="hover-accent" style={{ cursor: 'pointer' }} />
                    </div>
                </div>

                <div>
                    <h4 style={{ color: 'var(--text-main)', marginBottom: '16px' }}>Platform</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', color: 'var(--text-muted)', fontSize: '14px' }}>
                        <span style={{ cursor: 'pointer' }}>Markets</span>
                        <span style={{ cursor: 'pointer' }}>Trade</span>
                        <span style={{ cursor: 'pointer' }}>Earn</span>
                        <span style={{ cursor: 'pointer' }}>Analytics</span>
                    </div>
                </div>

                <div>
                    <h4 style={{ color: 'var(--text-main)', marginBottom: '16px' }}>Support</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', color: 'var(--text-muted)', fontSize: '14px' }}>
                        <span style={{ cursor: 'pointer' }}>Documentation</span>
                        <span style={{ cursor: 'pointer' }}>API</span>
                        <span style={{ cursor: 'pointer' }}>Status</span>
                        <span style={{ cursor: 'pointer' }}>Contact</span>
                    </div>
                </div>
            </div>
            <div className="page-container" style={{ marginTop: '40px', paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.05)', textAlign: 'center', color: 'var(--text-dim)', fontSize: '12px' }}>
                © 2024 StxDex. All rights reserved. Built on Stacks.
            </div>
        </footer>
    );
};
