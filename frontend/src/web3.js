import { ethers } from "ethers";

// For local testing, you can use a local RPC URL (e.g., Hardhat node)
// For Monad testnet, use the provided RPC URL.
const provider = new ethers.providers.JsonRpcProvider(
  process.env.REACT_APP_RPC_URL || "https://testnet-rpc.monad.xyz",
  {
    chainId: process.env.REACT_APP_CHAIN_ID ? parseInt(process.env.REACT_APP_CHAIN_ID) : 10143,
    name: "monad-testnet",
  }
);

export default provider;
