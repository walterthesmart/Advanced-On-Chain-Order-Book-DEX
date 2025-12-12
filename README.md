# Advanced On-Chain Order Book DEX

A fully decentralized exchange (DEX) built on Stacks with an advanced on-chain order book using Clarity smart contracts. This project showcases sophisticated DeFi primitives including limit orders, market orders, advanced order types, and cross-chain atomic swaps.

## Features

### Core Trading
- **Limit Orders**: Place buy/sell orders at specific price levels
- **Market Orders**: Execute immediate trades at current market prices
- **Partial Fills**: Orders can be partially filled across multiple transactions
- **Price-Time Priority**: FIFO matching at each price level
- **Order Cancellation**: Cancel unfilled or partially filled orders

### Advanced Order Types
- **Stop-Loss Orders**: Automatically trigger market sells when price drops
- **Take-Profit Orders**: Automatically sell when price targets are reached
- **TWAP Orders**: Time-Weighted Average Price orders split large orders into chunks over time

### Cross-Chain
- **Atomic Swaps**: Hash Time-Locked Contracts (HTLC) for Bitcoin/Stacks atomic swaps
- **Trustless Bridging**: Secure cross-chain asset transfers

## Architecture

### Smart Contracts

#### 1. `sip-010-trait.clar`
Standard SIP-010 fungible token trait definition.

#### 2. `test-token-a.clar` & `test-token-b.clar`
Test tokens implementing SIP-010 for development and testing (e.g., STX and USDA equivalents).

#### 3. `order-book-core.clar`
Main order book contract:
- Order data structures with trader, price, amount, filled amounts, timestamps
- Order storage in maps by order ID
- Price level tracking with buy/sell order lists
- User order tracking
- Order placement (limit and market)
- Order cancellation
- Order matching engine (FIFO at price levels)

#### 4. `advanced-orders.clar`
Advanced trading features:
- Stop-loss and take-profit conditional orders
- TWAP order creation and execution
- Market price oracle (simplified for demo)
- Conditional order triggering based on price

#### 5. `atomic-swap.clar`
Cross-chain trading via HTLCs:
- Swap initiation with hash-lock and time-lock
- Swap claiming with preimage reveal
- Automatic refunds after timeout
- State tracking for all swaps

## Technical Implementation

### Data Structures
- **Orders**: Map of order-id to order details  
- **Price Levels**: Separate maps for buy/sell orders at each price
- **User Orders**: Map of user addresses to their order IDs
- **Active Prices**: Lists of price levels with pending orders

### Clarity Features Used
- **Block Height**: Used as timestamp proxy for time-based logic
- **Maps & Lists**: For efficient order storage and price level management
- **Traits**: SIP-010 standard for token interoperability
- **Post-Conditions**: For secure token transfers (to be implemented in production)

### Key Algorithms
1. **Price-Time Priority Matching**:
   - Orders sorted  by price (best price first)
   - At same price level, orders matched FIFO by timestamp

2. **Partial Fill Handling**:
   - Track `filled` vs `amount` for each order
   - Update status: open → partially-filled → filled

3. **TWAP Execution**:
   - Calculate chunk size: total_amount / num_chunks
   - Execute chunks at intervals using block height as time proxy
   - Track execution progress and timestamps

4. **HTLC Atomic Swaps**:
   - Initiator locks tokens with SHA256 hash-lock
   - Participant claims with correct preimage before timeout
   - Initiator can refund after timeout if unclaimed

## Configuration

### Epoch Settings
The project uses **Epoch 3.0** in `settings/Devnet.toml` to enable Clarity features:
```toml
epoch_2_0 = 100
epoch_2_05 = 101
epoch_2_1 = 102
epoch_2_2 = 103
epoch_2_3 = 104
epoch_2_4 = 105
epoch_2_5 = 108
epoch_3_0 = 142
epoch_3_1 = 144
epoch_3_2 = 146
```

### Contract Configuration
All contracts in `Clarinet.toml` are set to use `epoch = "3.0"`.

## Getting Started

### Prerequisites
- [Clarinet](https://github.com/hirosystems/clarinet) v3.8.1 or later
- Node.js and npm (for tests)

### Installation

```bash
# Clone or navigate to the project directory
cd "c:\Users\HomePC\Desktop\Blockchain\Stacks\Advanced On-Chain Order Book DEX"

# Check contract syntax
clarinet check

# Run tests
clarinet test# Run local devnet
clarinet integrate
```

### Usage Example

```clarity
;; 1. Mint test tokens to users
(contract-call? .test-token-a mint u1000000 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM)
(contract-call? .test-token-b mint u10000000 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM)

;; 2. Place a limit buy order (buy 100 tokens at price 1.5)
(contract-call? .order-book-core place-limit-order u1 u1500000 u100000000)

;; 3. Place a limit sell order (sell 100 tokens at price 1.5)
(contract-call? .order-book-core place-limit-order u2 u1500000 u100000000)

;; 4. Create a stop-loss order
(contract-call? .advanced-orders create-stop-loss-order u1400000 u50000000)

;; 5. Create a TWAP order (split into 10 chunks, 100 blocks apart)
(contract-call? .advanced-orders create-twap-order u1000000000 u10 u100)

;; 6. Initiate an atomic swap
(contract-call? .atomic-swap initiate-swap 
    'ST1SJ3DTE5DN7X54YDH5D64R3BCB6A2AG2ZQ8YPD5  ;; participant
    u100000000  ;; amount
    0x1234...  ;; hash of secret
    u1440  ;; timeout in blocks (~10 days)
)
```

## Project Structure

```
Advanced On-Chain Order Book DEX/
├── Clarinet.toml           # Project configuration
├── contracts/
│   ├── sip-010-trait.clar     # Token standard
│   ├── test-token-a.clar      # Test token A
│   ├── test-token-b.clar      # Test token B
│   ├── order-book-core.clar   # Core order book
│   ├── advanced-orders.clar   # Advanced trading features
│   └── atomic-swap.clar       # Cross-chain swaps
├── tests/
│   ├── order-book-core_test.ts
│   ├── advanced-orders_test.ts
│   └── atomic-swap_test.ts
├── settings/
│   └── Devnet.toml         # Devnet configuration
└── README.md               # This file
```

## Testing

Tests are written in TypeScript using Clarinet's testing framework:

```bash
# Run all tests
clarinet test

# Run specific test file
clarinet test tests/order-book-core_test.ts
```

### Test Coverage
- Order placement (limit & market)
- Order matching and partial fills
- Order cancellation
- Stop-loss and take-profit triggering
- TWAP chunk execution
- Atomic swap lifecycle

## Roadmap

### Phase 1 (Current)
- [x] Core order book with limit/market orders
- [x] Advanced order types (stop-loss, take-profit, TWAP)
- [x] Atomic swap HTLCs
- [ ] Comprehensive test suite
- [ ] Full matching engine implementation

### Phase 2 (Future)
- [ ] Multiple trading pairs support
- [ ] Liquidity provider rewards
- [ ] Order book depth visualization
- [ ] Frontend UI
- [ ] Integration with real price oracles (Redstone, Pyth)
- [ ] Mainnet deployment

### Phase 3 (Future)
- [ ] Governance token
- [ ] Fee distribution mechanism
- [ ] Advanced analytics
- [ ] Mobile app

## Security Considerations

> **⚠️ Warning**: This is a demonstration/educational project. NOT audited for production use.

Key security features to implement before mainnet:
1. Comprehensive access controls
2. Reentrancy guards
3. Integer overflow/underflow protection (Clarity handles this automatically)
4. Post-condition enforcement for all token transfers
5. Rate limiting for order placement
6. External security audit

## Contributing

This project is for educational purposes. Feel free to fork and experiment!

## License

MIT License

## Acknowledgments

Built with:
- [Stacks](https://www.stacks.co/) - Bitcoin smart contracts
- [Clarity](https://clarity-lang.org/) - Smart contract language
- [Clarinet](https://github.com/hirosystems/clarinet) - Development tooling

## Contact

For questions or discussions about this implementation, please open an issue on the repository.

---

**Note**: Block height is used as a timestamp proxy throughout the contracts. In a production system with actual Clarity 4 support, you would use `stacks-block-time` for precise timestamp-based logic.
