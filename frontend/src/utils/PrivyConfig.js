// Privy configuration
export const PRIVY_CONFIG = {
  // Hardcoded App ID temporarily for testing
  appId: "cm87p4kbi034zfp9n44cb8e1k", // Make sure this matches your Privy dashboard
  
  // Configure login methods
  loginMethods: ['wallet', 'email', 'google', 'apple', 'discord'],
  
  // Appearance
  appearance: {
    theme: 'dark',
    accentColor: '#6a1b9a', // Purple to match our theme
    logo: 'https://your-logo-url.com/logo.png', // Replace with your logo URL
  },
  
  // Set to true for production
  embeddedWallets: {
    createOnLogin: 'users-without-wallets',
    noPromptOnSignature: false,
  },
}; 