import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Box,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Button,
} from '@mui/material';
import { ethers } from 'ethers';

function WalletAnalysis() {
  const [loading, setLoading] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [transactions, setTransactions] = useState([]);
  const [walletStats, setWalletStats] = useState({
    totalTransactions: 0,
    totalVolume: ethers.parseEther('0'),
    rank: 0,
  });

  const fetchWalletActivity = async () => {
    if (!walletAddress) return;

    try {
      setLoading(true);
      const provider = new ethers.JsonRpcProvider(process.env.REACT_APP_MONAD_RPC_URL);

      // Fetch recent transactions
      const history = await provider.getHistory(walletAddress);
      const formattedTransactions = await Promise.all(
        history.map(async (tx) => {
          const receipt = await provider.getTransactionReceipt(tx.hash);
          return {
            hash: tx.hash,
            timestamp: new Date(tx.timestamp * 1000).toLocaleString(),
            from: tx.from,
            to: tx.to,
            value: ethers.formatEther(tx.value),
            type: tx.from.toLowerCase() === walletAddress.toLowerCase() ? 'Sent' : 'Received',
          };
        })
      );

      // Calculate wallet stats
      const totalVolume = history.reduce(
        (acc, tx) => acc.add(tx.value),
        ethers.parseEther('0')
      );

      // Note: In a real implementation, you would fetch the actual ranking from your backend
      const mockRank = Math.floor(Math.random() * 1000) + 1;

      setTransactions(formattedTransactions);
      setWalletStats({
        totalTransactions: history.length,
        totalVolume,
        rank: mockRank,
      });
    } catch (error) {
      console.error('Error fetching wallet activity:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" component="h1" gutterBottom>
        Wallet Activity Analyzer
      </Typography>

      <Box sx={{ mb: 4 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={8}>
            <TextField
              fullWidth
              label="Wallet Address"
              value={walletAddress}
              onChange={(e) => setWalletAddress(e.target.value)}
              placeholder="Enter Monad wallet address"
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              disabled={loading || !walletAddress}
            >
              Analyze Wallet
            </Button>
          </Grid>
        </Grid>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Wallet Statistics
              </Typography>
              <Typography color="text.secondary">
                Enter a wallet address to view its activity.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {walletStats.totalTransactions > 0 && (
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography color="text.secondary" gutterBottom>
                  Total Transactions
                </Typography>
                <Typography variant="h4">
                  {walletStats.totalTransactions}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography color="text.secondary" gutterBottom>
                  Total Volume
                </Typography>
                <Typography variant="h4">
                  {ethers.formatEther(walletStats.totalVolume)} MON
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography color="text.secondary" gutterBottom>
                  Wallet Rank
                </Typography>
                <Typography variant="h4">
                  #{walletStats.rank}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      {transactions.length > 0 && (
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Recent Transactions
            </Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Hash</TableCell>
                    <TableCell>Time</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>Value (MON)</TableCell>
                    <TableCell>From</TableCell>
                    <TableCell>To</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {transactions.map((tx) => (
                    <TableRow key={tx.hash}>
                      <TableCell>
                        <Typography
                          variant="body2"
                          sx={{
                            maxWidth: 150,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {tx.hash}
                        </Typography>
                      </TableCell>
                      <TableCell>{tx.timestamp}</TableCell>
                      <TableCell>
                        <Typography
                          color={tx.type === 'Sent' ? 'error' : 'success'}
                        >
                          {tx.type}
                        </Typography>
                      </TableCell>
                      <TableCell>{tx.value}</TableCell>
                      <TableCell>
                        <Typography
                          variant="body2"
                          sx={{
                            maxWidth: 150,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {tx.from}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography
                          variant="body2"
                          sx={{
                            maxWidth: 150,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {tx.to}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      )}
    </Container>
  );
}

export default WalletAnalysis; 