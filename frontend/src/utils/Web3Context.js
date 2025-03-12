import React, { createContext, useContext, useState, useEffect } from 'react';
import { ethers } from 'ethers';

const Web3Context = createContext(null);

export function Web3Provider({ children }) {
  const [account, setAccount] = useState(null);
  const [provider, setProvider] = useState(null);
  const [chainId, setChainId] = useState(null);
  const [isConnecting, setIsConnecting] = useState(false);

  useEffect(() => {
    const initWeb3 = async () => {
      if (window.ethereum) {
        try {
          // Create provider
          const ethersProvider = new ethers.providers.Web3Provider(window.ethereum);
          setProvider(ethersProvider);

          // Get network
          const network = await ethersProvider.getNetwork();
          setChainId(network.chainId);

          // Check if already connected
          const accounts = await ethersProvider.listAccounts();
          if (accounts.length > 0) {
            setAccount(accounts[0]);
          }

          // Setup event listeners
          window.ethereum.on('accountsChanged', handleAccountsChanged);
          window.ethereum.on('chainChanged', handleChainChanged);
          window.ethereum.on('disconnect', handleDisconnect);
        } catch (error) {
          console.error('Error initializing Web3:', error);
        }
      }
    };

    initWeb3();

    // Cleanup function
    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
        window.ethereum.removeListener('chainChanged', handleChainChanged);
        window.ethereum.removeListener('disconnect', handleDisconnect);
      }
    };
  }, []);

  const handleAccountsChanged = (accounts) => {
    if (accounts.length === 0) {
      // User disconnected their wallet
      setAccount(null);
    } else {
      // User switched account
      setAccount(accounts[0]);
    }
  };

  const handleChainChanged = (chainIdHex) => {
    // Chain changed, reload the page as recommended by MetaMask
    window.location.reload();
  };

  const handleDisconnect = () => {
    setAccount(null);
  };

  const connectWallet = async () => {
    if (!window.ethereum) {
      alert('Please install MetaMask to use this application.');
      return;
    }

    setIsConnecting(true);
    try {
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });
      setAccount(accounts[0]);
    } catch (error) {
      console.error('Error connecting wallet:', error);
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectWallet = () => {
    // MetaMask doesn't support programmatic disconnection,
    // so we just clear our state
    setAccount(null);
  };

  const value = {
    account,
    provider,
    chainId,
    isConnecting,
    connectWallet,
    disconnectWallet,
  };

  return <Web3Context.Provider value={value}>{children}</Web3Context.Provider>;
}

export function useWeb3() {
  const context = useContext(Web3Context);
  if (!context) {
    throw new Error('useWeb3 must be used within a Web3Provider');
  }
  return context;
}

export default Web3Context; 