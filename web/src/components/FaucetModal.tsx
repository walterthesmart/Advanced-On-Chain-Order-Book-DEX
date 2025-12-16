
import { X, Droplet } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';

interface Props {
    isOpen: boolean;
    onClose: () => void;
}

export const FaucetModal = ({ isOpen, onClose }: Props) => {
    const [loading, setLoading] = useState(false);

    const handleMint = async (asset: string) => {
        setLoading(true);
        // Simulate contract call
        setTimeout(() => {
            setLoading(false);
            toast.success(`Minted 1000 ${asset} to your wallet!`, {
                style: {
                    background: '#333',
                    color: '#fff',
                }
            });
        }, 1500);
    };

    if (!isOpen) return null;

    return (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 }}>
            <div className="glass-panel" style={{ background: 'var(--bg-panel)', padding: '30px', borderRadius: '20px', width: '90%', maxWidth: '400px', border: '1px solid var(--glass-border)', position: 'relative' }}>
                <button onClick={onClose} style={{ position: 'absolute', top: '20px', right: '20px', background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
                    <X size={24} />
                </button>

                <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                    <div style={{ width: '48px', height: '48px', background: 'rgba(255,255,255,0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px auto' }}>
                        <Droplet size={24} color="var(--primary)" />
                    </div>
                    <h3 style={{ margin: 0, fontSize: '24px' }}>Testnet Faucet</h3>
                    <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginTop: '8px' }}>Mint test tokens to trade on the DEX.</p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', background: 'var(--glass-surface)', borderRadius: '10px', border: '1px solid var(--glass-border)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: 'bold' }}>S</div>
                            <span style={{ fontWeight: 600 }}>STX</span>
                        </div>
                        <button disabled={loading} onClick={() => handleMint('STX')} className="btn-secondary" style={{ padding: '6px 12px', fontSize: '12px' }}>
                            {loading ? 'Minting...' : 'Mint 1000'}
                        </button>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', background: 'var(--glass-surface)', borderRadius: '10px', border: '1px solid var(--glass-border)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#00cc66', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: 'bold' }}>U</div>
                            <span style={{ fontWeight: 600 }}>USDA</span>
                        </div>
                        <button disabled={loading} onClick={() => handleMint('USDA')} className="btn-secondary" style={{ padding: '6px 12px', fontSize: '12px' }}>
                            {loading ? 'Minting...' : 'Mint 1000'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
