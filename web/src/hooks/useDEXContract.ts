import { openContractCall } from '@stacks/connect';
import { StacksMocknet } from '@stacks/network';
import { CONTRACT_ADDRESS, CONTRACT_NAME } from '../common/constants';
import { uintCV, PostConditionMode } from '@stacks/transactions';

export const useDEXContract = () => {
    const network = new StacksMocknet();

    const placeOrder = async (amount: number, price: number, isBuy: boolean) => {
        const functionName = isBuy ? 'place-buy-order' : 'place-sell-order';

        // This is a simplified interface for the hook
        const options = {
            contractAddress: CONTRACT_ADDRESS,
            contractName: CONTRACT_NAME,
            functionName,
            functionArgs: [uintCV(amount), uintCV(price)],
            network,
            postConditionMode: PostConditionMode.Allow, // Simplified for demo
            appDetails: {
                name: 'Stacks DEX',
                icon: window.location.origin + '/vite.svg',
            },
            onFinish: (data: any) => {
                console.log('Transaction finished:', data);
            },
        };

        await openContractCall(options);
    };

    return { placeOrder };
};
