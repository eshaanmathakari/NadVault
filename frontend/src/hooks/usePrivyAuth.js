import { usePrivy, useWallets } from '@privy-io/react-auth';
import { useEffect, useState } from 'react';
import { ethers } from 'ethers';

export function usePrivyAuth() {
  const { 
    ready,
    authenticated,
    user,
    login,
    logout,
    createWallet,
    linkWallet,
    unlinkWallet,
  } = usePrivy();
  
  const { wallets } = useWallets();
  const [activeWallet, setActiveWallet] = useState(null);
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [account, setAccount] = useState(null);
  const [chainId, setChainId] = useState(null);
  const [isConnecting, setIsConnecting] = useState(false);

  // Set up the active wallet when wallets change
  useEffect(() => {
    if (!wallets || wallets.length === 0) {
      setActiveWallet(null);
      setProvider(null);
      setSigner(null);
      setAccount(null);
      setChainId(null);
      return;
    }

    // Use the first embedded wallet or connected wallet as the active one
    const embeddedWallet = wallets.find(wallet => wallet.walletClientType === 'privy');
    const connectedWallet = wallets.find(wallet => wallet.connected);
    
    const wallet = embeddedWallet || connectedWallet || wallets[0];
    setActiveWallet(wallet);
  }, [wallets]);

  // Set up provider, signer, account, and chainId when active wallet changes
  useEffect(() => {
    const setupWallet = async () => {
      if (!activeWallet) {
        setProvider(null);
        setSigner(null);
        setAccount(null);
        setChainId(null);
        return;
      }

      try {
        setIsConnecting(true);
        
        // Get the provider and signer
        const ethersProvider = await activeWallet.getEthersProvider();
        setProvider(ethersProvider);
        
        const ethersSigner = await activeWallet.getEthersSigner();
        setSigner(ethersSigner);
        
        // Get the account address
        const address = await ethersSigner.getAddress();
        setAccount(address);
        
        // Get the chain ID
        const network = await ethersProvider.getNetwork();
        setChainId(network.chainId);
      } catch (error) {
        console.error('Error setting up wallet:', error);
      } finally {
        setIsConnecting(false);
      }
    };

    setupWallet();
  }, [activeWallet]);

  // Function to connect wallet
  const connectWallet = async () => {
    if (!authenticated) {
      await login();
      return;
    }

    if (wallets.length === 0) {
      await createWallet();
    }
  };

  // Function to disconnect wallet
  const disconnectWallet = async () => {
    await logout();
  };

  return {
    // Privy state
    ready,
    authenticated,
    user,
    wallets,
    activeWallet,
    
    // Web3 state (compatible with previous Web3Context)
    provider,
    signer,
    account,
    chainId,
    isConnecting,
    
    // Privy functions
    login,
    logout,
    createWallet,
    linkWallet,
    unlinkWallet,
    
    // Web3 functions (compatible with previous Web3Context)
    connectWallet,
    disconnectWallet,
  };
} 