import { useState, useEffect } from 'react';
import { userSession, network } from '../common/constants';

export const useAccountBalance = () => {
    const [balance, setBalance] = useState<string>('0');

    useEffect(() => {
        const fetchBalance = async () => {
            if (userSession.isUserSignedIn()) {
                const userData = userSession.loadUserData();
                // Default to testnet/mocknet address for this environment
                const address = userData.profile.stxAddress.testnet || userData.profile.stxAddress.mainnet;

                if (!address) return;

                try {
                    // Using fetch for direct API access as we didn't install the full API client
                    const response = await fetch(`${network.coreApiUrl}/v2/accounts/${address}`);
                    const data = await response.json();

                    // stx balance is in microstacks
                    if (data && data.stx && data.stx.balance) {
                        setBalance(data.stx.balance);
                    }
                } catch (e) {
                    console.error('Failed to fetch balance', e);
                }
            }
        };

        fetchBalance();
    }, []);

    return balance;
};
