import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
  Grid,
  CircularProgress,
  Alert,
  Card,
  CardContent,
  Divider,
} from '@mui/material';
import { usePrivyAuth } from '../hooks/usePrivyAuth';

function WalletAnalyzer() {
  const { account, authenticated, isConnecting } = usePrivyAuth();
  const [walletAddress, setWalletAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [walletData, setWalletData] = useState(null);

  const handleAnalyze = async () => {
    const addressToAnalyze = walletAddress || account;
    
    if (!addressToAnalyze) {
      setError('Please enter a wallet address or connect your wallet');
      return;
    }

    try {
      setLoading(true);
      setError('');
      
      // This is a placeholder for the actual API call to the existing wallet analyzer
      // In a real implementation, you would call your backend API here
      
      // Simulate API call with timeout
      setTimeout(() => {
        // Mock data for demonstration
        setWalletData({
          address: addressToAnalyze,
          score: Math.floor(Math.random() * 100),
          transactions: Math.floor(Math.random() * 50),
          volume: (Math.random() * 10).toFixed(2),
          rank: Math.floor(Math.random() * 1000) + 1,
          lastActive: new Date().toLocaleDateString(),
        });
        setLoading(false);
      }, 1500);
      
    } catch (error) {
      console.error('Error analyzing wallet:', error);
      setError('Error analyzing wallet. Please try again.');
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" component="h1" gutterBottom>
        Wallet Activity Analyzer
      </Typography>
      
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="body1" paragraph>
          Analyze wallet activity on the Monad testnet to get insights about transaction history and wallet ranking.
        </Typography>
        
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={8}>
            <TextField
              fullWidth
              label="Wallet Address"
              placeholder={account || "Enter wallet address"}
              value={walletAddress}
              onChange={(e) => setWalletAddress(e.target.value)}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={handleAnalyze}
              disabled={loading || (isConnecting && !walletAddress)}
            >
              {loading ? <CircularProgress size={24} /> : 'Analyze Wallet'}
            </Button>
          </Grid>
        </Grid>
        
        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}
        
        {!authenticated && (
          <Alert severity="info" sx={{ mt: 2 }}>
            Connect your wallet to automatically analyze your address, or enter any address manually.
          </Alert>
        )}
        
        {authenticated && isConnecting && (
          <Alert severity="info" sx={{ mt: 2 }}>
            Connecting to your wallet...
          </Alert>
        )}
      </Paper>
      
      {walletData && (
        <Box>
          <Typography variant="h5" gutterBottom>
            Analysis Results
          </Typography>
          
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Wallet Overview
                  </Typography>
                  <Divider sx={{ mb: 2 }} />
                  
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body1">Address:</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {`${walletData.address.slice(0, 6)}...${walletData.address.slice(-4)}`}
                    </Typography>
                  </Box>
                  
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body1">Activity Score:</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {walletData.score}/100
                    </Typography>
                  </Box>
                  
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body1">Rank:</Typography>
                    <Typography variant="body2" color="text.secondary">
                      #{walletData.rank}
                    </Typography>
                  </Box>
                  
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body1">Last Active:</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {walletData.lastActive}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Transaction Statistics
                  </Typography>
                  <Divider sx={{ mb: 2 }} />
                  
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body1">Total Transactions:</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {walletData.transactions}
                    </Typography>
                  </Box>
                  
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body1">Total Volume:</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {walletData.volume} MON
                    </Typography>
                  </Box>
                  
                  <Alert severity="info" sx={{ mt: 2 }}>
                    This is a simplified version of the wallet analyzer. The full version includes detailed transaction history and advanced analytics.
                  </Alert>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      )}
    </Container>
  );
}

export default WalletAnalyzer; 