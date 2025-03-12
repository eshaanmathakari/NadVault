# NadVault Frontend

A modern React application for interacting with the NadVault dApp on the Monad testnet.

## Features

- **Mystery Box Launchpad**: Create and bid on NFT mystery boxes with auction functionality
- **Time-Locked Vaults**: Lock tokens with memories and generate yield over time
- **Wallet Analyzer**: Analyze wallet activity and get insights about your on-chain presence
- **User Profile**: View your activity across the platform

## Tech Stack

- React 18
- Material-UI (MUI) for UI components
- React Router for navigation
- ethers.js for blockchain interactions
- Dark mode UI

## Getting Started

### Prerequisites

- Node.js (v16+)
- npm or yarn
- MetaMask or another Ethereum-compatible wallet with Monad testnet configured

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/NadVault.git
   cd NadVault/frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```
   or
   ```
   yarn install
   ```

3. Create a `.env` file in the frontend directory with the following variables:
   ```
   REACT_APP_MONAD_RPC_URL=https://rpc.monad.xyz/testnet
   REACT_APP_CHAIN_ID=1337
   ```

4. Start the development server:
   ```
   npm start
   ```
   or
   ```
   yarn start
   ```

5. Open [http://localhost:3000](http://localhost:3000) to view the application in your browser.

## Connecting to Monad Testnet

To interact with the dApp, you'll need to configure your MetaMask wallet to connect to the Monad testnet:

1. Open MetaMask and go to Settings > Networks > Add Network
2. Enter the following details:
   - Network Name: Monad Testnet
   - RPC URL: https://rpc.monad.xyz/testnet
   - Chain ID: 1337
   - Currency Symbol: MON
   - Block Explorer URL: https://explorer.monad.xyz/testnet

3. Save the network configuration
4. Request testnet tokens from the [Monad Testnet Faucet](https://faucet.monad.xyz)

## Building for Production

To build the application for production:

```
npm run build
```
or
```
yarn build
```

The build artifacts will be stored in the `build` directory.

## Project Structure

```
frontend/
├── public/             # Static files
├── src/                # Source code
│   ├── components/     # Reusable UI components
│   ├── contracts/      # Contract ABIs and addresses
│   ├── hooks/          # Custom React hooks
│   ├── pages/          # Page components
│   ├── utils/          # Utility functions and context providers
│   ├── App.js          # Main application component
│   └── index.js        # Application entry point
├── .env                # Environment variables
└── package.json        # Dependencies and scripts
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.
