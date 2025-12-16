# Stacks DEX Web Interface

This is the official web interface for the Advanced On-Chain Order Book DEX on Stacks.

## Features

- **Premium UI/UX**: Glassmorphism design system with smooth micro-animations.
- **Real-time Order Book**: Visualize buy and sell orders with depth indicators.
- **Interactive Charts**: Trading view style charts for market analysis.
- **Seamless Swapping**: Easy-to-use swap interface with wallet integration.
- **User Dashboard**: Track active orders and trade history.
- **Wallet Connection**: Integrated with Stacks wallets (Leather, Xverse) via `@stacks/connect`.

## Tech Stack

- **Framework**: React + Vite + TypeScript
- **Styling**: Vanilla CSS with CSS Variables for theming
- **Blockchain Interaction**: 
  - `@stacks/connect`: For wallet authentication and transaction signing.
  - `@stacks/transactions`: For constructing Clarity contract calls.
  - `@stacks/network`: For communicating with the Stacks blockchain node.
- **Icons**: Lucide React
- **Notifications**: React Hot Toast

## Getting Started

1.  **Install Dependencies**:
    ```bash
    npm install
    ```

2.  **Run Development Server**:
    ```bash
    npm run dev
    ```

3.  **Build for Production**:
    ```bash
    npm run build
    ```

## Development

- The main application logic is in `src/App.tsx`.
- Components are located in `src/components/`.
- Blockchain hooks (e.g., `useDEXContract`) are in `src/hooks/`.
- Global styles and design tokens are in `src/index.css`.

## Contributing

Please create a new branch for every feature and follow the established design patterns.
