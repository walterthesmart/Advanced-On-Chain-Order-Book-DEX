
import { useState, useEffect } from 'react';
import './App.css';
import { ConnectWallet } from './components/ConnectWallet';
import { OrderBook } from './components/OrderBook';
import { Swap } from './components/Swap';
import { TradeHistory } from './components/TradeHistory';
import { Chart } from './components/Chart';
import { UserOrders } from './components/UserOrders';
import { Footer } from './components/Footer';
import { FaucetModal } from './components/FaucetModal';
import { userSession } from './common/constants';
import { useAccountBalance } from './hooks/useAccountBalance';
import { Toaster } from 'react-hot-toast';
import { Droplet } from 'lucide-react';

function App() {
  const [userData, setUserData] = useState<any>(null);
  const [isFaucetOpen, setIsFaucetOpen] = useState(false);
  const balance = useAccountBalance();
  const stxBalance = (parseInt(balance) / 1000000).toLocaleString(undefined, { maximumFractionDigits: 2 });

  useEffect(() => {
    if (userSession.isUserSignedIn()) {
      setUserData(userSession.loadUserData());
    }
  }, []);

  const handleConnect = () => {
    if (userSession.isUserSignedIn()) {
      setUserData(userSession.loadUserData());
    }
  };

  return (
    <div className="app-container">
      <Toaster position="bottom-right" />
      <FaucetModal isOpen={isFaucetOpen} onClose={() => setIsFaucetOpen(false)} />

      <header className="glass glass-panel" style={{ margin: '24px auto', padding: '16px 24px', maxWidth: '1200px' }}>
        <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '32px', height: '32px', background: 'var(--primary)', borderRadius: '8px' }}></div>
            <h2 style={{ margin: 0, fontSize: '24px', background: 'linear-gradient(45deg, #fff, var(--primary))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>StxDex</h2>
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <button onClick={() => setIsFaucetOpen(true)} style={{ background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '50%', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--text-muted)' }} title="Testnet Faucet">
                <Droplet size={18} />
              </button>

              {userData && (
                <div style={{ display: 'flex', gap: '12px' }}>
                  <div style={{ padding: '8px 12px', background: 'var(--glass-surface)', borderRadius: '8px', fontSize: '14px', border: '1px solid var(--glass-border)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <span style={{ color: 'var(--accent)' }}>{stxBalance}</span>
                    <span style={{ color: 'var(--text-muted)' }}>STX</span>
                  </div>
                  <div style={{ padding: '8px 12px', background: 'var(--glass-surface)', borderRadius: '8px', fontSize: '14px', border: '1px solid var(--glass-border)' }}>
                    {userData.profile.stxAddress.testnet.slice(0, 4)}...{userData.profile.stxAddress.testnet.slice(-4)}
                  </div>
                </div>
              )}
              <ConnectWallet onConnect={handleConnect} />
            </div>
          </div>
        </nav>
      </header>

      <main className="page-container" style={{ marginTop: '40px', paddingBottom: '80px', minHeight: 'calc(100vh - 400px)' }}>
        <div className="hero-section" style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h1 style={{ fontSize: '64px', marginBottom: '20px' }}>Trade on Bitcoin.</h1>
          <p style={{ fontSize: '20px', color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto' }}>
            The advanced on-chain order book built for the Stacks ecosystem. Experience true DeFi with Bitcoin settlement.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px', marginBottom: '20px' }}>
          <Chart />
        </div>

        <div className="glass glass-panel" style={{ padding: '40px', minHeight: '400px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px' }}>
            <h3>Market Overview</h3>
            <div style={{ display: 'flex', gap: '10px' }}>
              <span style={{ padding: '8px 16px', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', fontSize: '14px' }}>BTC/STX</span>
              <span style={{ padding: '8px 16px', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', fontSize: '14px' }}>STX/USDA</span>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <OrderBook />
              <UserOrders />
              <TradeHistory />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <Swap balance={balance} isLoggedIn={!!userData} />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;
