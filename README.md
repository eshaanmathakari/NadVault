# NadVault
NadVault is a decentralized application (dApp) built on the Monad testnet, combining three innovative features:

1. **Mystery Box Launchpad**: Creators can launch NFT-based mystery boxes with a fixed floor price (e.g., 0.1 MON), and users can bid in auctions to win exclusive digital collectibles.
2. **Wallet Activity Analyzer**: An AI-powered agent (simplified for insights) fetches and displays users' blockchain activity on the Monad testnet, including transaction history and a basic wallet ranking system.
3. **Time-Locked Vaults**: Users can lock tokens and personal memories (notes, images) for a set period, pay a subscription fee, and earn yield upon unlocking.

## Features

### Mystery Box Launchpad
- Create mystery boxes with fixed floor prices
- Participate in auctions to win exclusive NFTs
- Track auction status and history
- View mystery box details and metadata

### Time-Locked Vaults
- Create vaults with custom lock periods
- Add personal memories (notes and images)
- Earn yield on locked tokens
- Manage subscription fees
- View vault status and unlock countdown

### Wallet Activity Analyzer
- View transaction history
- Track total volume and transaction count
- Get wallet ranking insights
- Monitor recent activity

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MetaMask or compatible Web3 wallet
- Access to Monad testnet

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/nadvault.git
cd nadvault
```

2. Install dependencies:
```bash
npm install
cd frontend
npm install
```

3. Configure environment variables:
- Copy `.env.example` to `.env`
- Update the contract addresses with your deployed contract addresses
- Set your Monad testnet RPC URL

## Smart Contract Deployment

1. Deploy the contracts to Monad testnet:
```bash
npx hardhat run scripts/deploy.js --network monad-testnet
```

2. Update the contract addresses in your `.env` file with the newly deployed addresses.

## Development

1. Start the development server:
```bash
cd frontend
npm start
```

2. The application will be available at `http://localhost:3000`

## Testing

Run the test suite:
```bash
npm test
```

## Usage

1. Connect your Web3 wallet (MetaMask or compatible)
2. Switch to Monad testnet
3. Navigate through the different features:
   - Mystery Box: Create or participate in mystery box auctions
   - Vault: Create time-locked vaults and add memories
   - Wallet Analysis: View your wallet activity and rankings

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.