import { Clarinet, Tx, Chain, Account, types } from 'https://deno.land/x/clarinet@v1.0.0/index.ts';
import { assertEquals } from 'https://deno.land/std@0.90.0/testing/asserts.ts';

Clarinet.test({
    name: "Can place a limit buy order",
    async fn(chain: Chain, accounts: Map<string, Account>) {
        const deployer = accounts.get('deployer')!;
        const wallet1 = accounts.get('wallet_1')!;

        let block = chain.mineBlock([
            // Place a limit buy order: side=1 (buy), price=1.5 STX, amount=100 tokens
            Tx.contractCall(
                'order-book-core',
                'place-limit-order',
                [types.uint(1), types.uint(1500000), types.uint(100000000)],
                wallet1.address
            ),
        ]);

        // Should return order ID 1
        block.receipts[0].result.expectOk().expectUint(1);
        
        // Verify the order was created
        let getOrder = chain.callReadOnlyFn(
            'order-book-core',
            'get-order',
            [types.uint(1)],
            deployer.address
        );
        
        const orderData = getOrder.result.expectOk().expectSome();
        console.log('Order created:', orderData);
    },
});

Clarinet.test({
    name: "Can place a limit sell order",
    async fn(chain: Chain, accounts: Map<string, Account>) {
        const wallet1 = accounts.get('wallet_1')!;

        let block = chain.mineBlock([
            // Place a limit sell order: side=2 (sell), price=2.0 STX, amount=50 tokens
            Tx.contractCall(
                'order-book-core',
                'place-limit-order',
                [types.uint(2), types.uint(2000000), types.uint(50000000)],
                wallet1.address
            ),
        ]);

        block.receipts[0].result.expectOk().expectUint(1);
    },
});

Clarinet.test({
    name: "Can cancel an order",
    async fn(chain: Chain, accounts: Map<string, Account>) {
        const wallet1 = accounts.get('wallet_1')!;

        let block = chain.mineBlock([
            // Place an order first
            Tx.contractCall(
                'order-book-core',
                'place-limit-order',
                [types.uint(1), types.uint(1500000), types.uint(100000000)],
                wallet1.address
            ),
            // Cancel the order
            Tx.contractCall(
                'order-book-core',
                'cancel-order',
                [types.uint(1)],
                wallet1.address
            ),
        ]);

        block.receipts[0].result.expectOk().expectUint(1);
        block.receipts[1].result.expectOk().expectBool(true);
    },
});

Clarinet.test({
    name: "Cannot cancel someone else's order",
    async fn(chain: Chain, accounts: Map<string, Account>) {
        const wallet1 = accounts.get('wallet_1')!;
        const wallet2 = accounts.get('wallet_2')!;

        let block = chain.mineBlock([
            // Wallet 1 places an order
            Tx.contractCall(
                'order-book-core',
                'place-limit-order',
                [types.uint(1), types.uint(1500000), types.uint(100000000)],
                wallet1.address
            ),
        ]);

        block.receipts[0].result.expectOk().expectUint(1);

        // Wallet 2 tries to cancel wallet 1's order
        let block2 = chain.mineBlock([
            Tx.contractCall(
                'order-book-core',
                'cancel-order',
                [types.uint(1)],
                wallet2.address
            ),
        ]);

        // Should fail with err-not-authorized (u101)
        block2.receipts[0].result.expectErr().expectUint(101);
    },
});

Clarinet.test({
    name: "Can place a market order",
    async fn(chain: Chain, accounts: Map<string, Account>) {
        const wallet1 = accounts.get('wallet_1')!;

        let block = chain.mineBlock([
            // Place a market buy order: side=1 (buy), amount=100 tokens
            Tx.contractCall(
                'order-book-core',
                'place-market-order',
                [types.uint(1), types.uint(100000000)],
                wallet1.address
            ),
        ]);

        block.receipts[0].result.expectOk().expectUint(1);
    },
});

Clarinet.test({
    name: "Can track user orders",
    async fn(chain: Chain, accounts: Map<string, Account>) {
        const deployer = accounts.get('deployer')!;
        const wallet1 = accounts.get('wallet_1')!;

        let block = chain.mineBlock([
            // Place multiple orders
            Tx.contractCall(
                'order-book-core',
                'place-limit-order',
                [types.uint(1), types.uint(1500000), types.uint(100000000)],
                wallet1.address
            ),
            Tx.contractCall(
                'order-book-core',
                'place-limit-order',
                [types.uint(2), types.uint(2000000), types.uint(50000000)],
                wallet1.address
            ),
        ]);

        // Check user orders
        let getUserOrders = chain.callReadOnlyFn(
            'order-book-core',
            'get-user-orders',
            [types.principal(wallet1.address)],
            deployer.address
        );

        const userOrders = getUserOrders.result.expectOk().expectSome();
        console.log('User orders:', userOrders);
    },
});

Clarinet.test({
    name: "Can get active price levels",
    async fn(chain: Chain, accounts: Map<string, Account>) {
        const deployer = accounts.get('deployer')!;
        const wallet1 = accounts.get('wallet_1')!;

        let block = chain.mineBlock([
            // Place orders at different price levels
            Tx.contractCall(
                'order-book-core',
                'place-limit-order',
                [types.uint(1), types.uint(1500000), types.uint(100000000)],
                wallet1.address
            ),
            Tx.contractCall(
                'order-book-core',
                'place-limit-order',
                [types.uint(1), types.uint(1600000), types.uint(100000000)],
                wallet1.address
            ),
        ]);

        // Get active buy prices
        let getBuyPrices = chain.callReadOnlyFn(
            'order-book-core',
            'get-active-buy-prices',
            [],
            deployer.address
        );

        const buyPrices = getBuyPrices.result.expectOk();
        console.log('Active buy prices:', buyPrices);
    },
});
