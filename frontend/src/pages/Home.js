import React from 'react';
import { Container, Typography, Grid, Card, CardContent, CardMedia, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import LockIcon from '@mui/icons-material/Lock';
import CasinoIcon from '@mui/icons-material/Casino';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';

function Home() {
  const navigate = useNavigate();

  const features = [
    {
      title: 'Mystery Box Launchpad',
      description: 'Create and participate in NFT mystery box auctions with fixed floor prices. Bid to win exclusive digital collectibles.',
      icon: <CasinoIcon sx={{ fontSize: 60 }} />,
      path: '/mystery-box',
    },
    {
      title: 'Time-Locked Vaults',
      description: 'Lock your tokens and personal memories for a set period. Add notes and images to your vault, and earn yield upon unlocking.',
      icon: <LockIcon sx={{ fontSize: 60 }} />,
      path: '/vault',
    },
    {
      title: 'Wallet Activity Analyzer',
      description: 'Get insights into your blockchain activity on the Monad testnet, including transaction history and wallet ranking.',
      icon: <AccountBalanceWalletIcon sx={{ fontSize: 60 }} />,
      path: '/wallet-analysis',
    },
  ];

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" component="h1" gutterBottom>
        Welcome to NadVault
      </Typography>
      <Typography paragraph>
        A decentralized application built on the Monad testnet.
      </Typography>

      <Grid container spacing={4}>
        {features.map((feature, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardMedia
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: 200,
                  bgcolor: 'primary.main',
                }}
              >
                {feature.icon}
              </CardMedia>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h2">
                  {feature.title}
                </Typography>
                <Typography>
                  {feature.description}
                </Typography>
              </CardContent>
              <Box sx={{ p: 2, display: 'flex', justifyContent: 'center' }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => navigate(feature.path)}
                >
                  Explore
                </Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Home; 