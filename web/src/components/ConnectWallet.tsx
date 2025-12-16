import { showConnect } from '@stacks/connect';
import { userSession, APP_DETAILS } from '../common/constants';

interface Props {
    onConnect?: () => void;
}

export const ConnectWallet = ({ onConnect }: Props) => {
    const authenticate = () => {
        showConnect({
            appDetails: APP_DETAILS,
            redirectTo: '/',
            onFinish: () => {
                if (onConnect) onConnect();
            },
            userSession,
        });
    };

    if (userSession.isUserSignedIn()) {
        return (
            <button
                className="btn-primary"
                onClick={() => {
                    userSession.signUserOut();
                    window.location.reload();
                }}
                style={{
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid var(--glass-border)',
                    color: 'var(--text-muted)'
                }}
            >
                Sign Out
            </button>
        );
    }

    return (
        <button className="btn-primary" onClick={authenticate}>
            Connect Wallet
        </button>
    );
};
