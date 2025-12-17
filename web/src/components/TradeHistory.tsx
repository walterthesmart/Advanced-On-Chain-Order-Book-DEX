import { useTradeEvents } from '../hooks/useTradeEvents';

export const TradeHistory = () => {
    const { trades, isConnected } = useTradeEvents();

    return (
        <div className="glass-panel" style={{ background: 'rgba(0,0,0,0.2)', padding: '24px', borderRadius: '16px', border: '1px solid var(--glass-border)', marginTop: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', alignItems: 'center' }}>
                <h4 style={{ color: 'var(--text-muted)', margin: 0 }}>
                    Recent Trades {isConnected && <span style={{ color: '#00cc66', fontSize: '10px' }}>● LIVE</span>}
                </h4>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', fontSize: '12px', color: 'var(--text-dim)', paddingBottom: '8px', borderBottom: '1px solid var(--glass-border)', marginBottom: '12px' }}>
                <div style={{ textAlign: 'left' }}>Price (USDA)</div>
                <div style={{ textAlign: 'center' }}>Amount (STX)</div>
                <div style={{ textAlign: 'right' }}>Time</div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                {trades.length > 0 ? trades.map((trade) => (
                    <div key={trade.txid} className="trade-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', fontSize: '13px', padding: '6px 0', borderBottom: '1px solid rgba(255,255,255,0.02)' }}>
                        <span style={{ color: '#00cc66' }}>
                            {parseFloat(trade.price).toFixed(2)}
                        </span>
                        <span style={{ color: 'var(--text-main)', textAlign: 'center' }}>{parseFloat(trade.amount).toFixed(0)}</span>
                        <span style={{ color: 'var(--text-dim)', textAlign: 'right' }}>
                            {new Date(trade.timestamp).toLocaleTimeString()}
                        </span>
                    </div>
                )) : (
                    <div style={{ padding: '20px', textAlign: 'center', color: 'var(--text-dim)', fontSize: '13px' }}>
                        No recent trades found
                    </div>
                )}
            </div>
        </div>
    );
};
