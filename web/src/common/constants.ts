import { AppConfig, UserSession } from '@stacks/connect';

export const appConfig = new AppConfig(['store_write', 'publish_data']);
export const userSession = new UserSession({ appConfig });

export const APP_DETAILS = {
    name: 'Stacks DEX',
    icon: typeof window !== 'undefined' ? window.location.origin + '/vite.svg' : '/vite.svg',
};

export const CONTRACT_ADDRESS = 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZBF';
export const CONTRACT_NAME = 'order-book-core';
