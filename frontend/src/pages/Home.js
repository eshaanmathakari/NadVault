import React from 'react';
import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  CardActions,
  Divider,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useWeb3 } from '../utils/Web3Context';
import LockIcon from '@mui/icons-material/Lock';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BarChartIcon from '@mui/icons-material/BarChart';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import { usePrivyAuth } from '../hooks/usePrivyAuth';
import PersonIcon from '@mui/icons-material/Person';

function Home() {
  const { authenticated, connectWallet, user } = usePrivyAuth();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const features = [
    {
      title: 'Mystery Box Launchpad',
      description: 'Create and bid on NFT mystery boxes with auction functionality.',
      icon: <ShoppingCartIcon fontSize="large" color="primary" />,
      path: '/mystery-box',
    },
    {
      title: 'Time-Locked Vaults',
      description: 'Lock tokens with memories and generate yield over time.',
      icon: <LockIcon fontSize="large" color="primary" />,
      path: '/vault',
    },
    {
      title: 'Wallet Analyzer',
      description: 'Analyze wallet activity and get insights about your on-chain presence.',
      icon: <BarChartIcon fontSize="large" color="primary" />,
      path: '/wallet-analyzer',
    },
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Paper
        sx={{
          position: 'relative',
          backgroundColor: 'background.paper',
          color: 'text.primary',
          mb: 4,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundImage: 'url(https://source.unsplash.com/random?blockchain)',
          p: 0,
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
            backgroundColor: 'rgba(0,0,0,.7)',
          }}
        />
        <Grid container>
          <Grid item md={6}>
            <Box
              sx={{
                position: 'relative',
                p: { xs: 3, md: 6 },
                pr: { md: 0 },
                minHeight: '400px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              <Typography component="h1" variant="h3" color="white" gutterBottom>
                Welcome to NadVault
              </Typography>
              <Typography variant="h5" color="white" paragraph>
                A decentralized platform for mystery box auctions, time-locked vaults, and wallet analytics on the Monad testnet.
              </Typography>
              <Box sx={{ mt: 4, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                {!authenticated ? (
                  <Button
                    variant="contained"
                    size="large"
                    color="primary"
                    startIcon={<PersonIcon />}
                    onClick={connectWallet}
                  >
                    Sign In
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    size="large"
                    color="primary"
                    onClick={() => navigate('/profile')}
                  >
                    View Profile
                  </Button>
                )}
                <Button
                  variant="outlined"
                  size="large"
                  sx={{ color: 'white', borderColor: 'white' }}
                  onClick={() => navigate('/mystery-box')}
                >
                  Explore Features
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ mb: 6 }}>
        <Typography variant="h4" component="h2" gutterBottom align="center" sx={{ mb: 4 }}>
          Features
        </Typography>
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                    {feature.icon}
                  </Box>
                  <Typography gutterBottom variant="h5" component="h3" align="center">
                    {feature.title}
                  </Typography>
                  <Typography align="center" color="text.secondary">
                    {feature.description}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    fullWidth
                    onClick={() => navigate(feature.path)}
                  >
                    Learn More
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Call to Action */}
      <Box sx={{ bgcolor: 'background.paper', py: 6 }}>
        <Container maxWidth="lg">
          <Typography variant="h4" component="h2" gutterBottom align="center">
            Ready to Get Started?
          </Typography>
          <Typography variant="body1" align="center" color="text.secondary" paragraph>
            Connect your wallet and start exploring the features of NadVault on the Monad testnet.
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4, gap: 2, flexWrap: 'wrap' }}>
            {!authenticated ? (
              <Button
                variant="contained"
                size="large"
                color="primary"
                startIcon={<PersonIcon />}
                onClick={connectWallet}
              >
                Sign In
              </Button>
            ) : (
              <Button
                variant="contained"
                size="large"
                color="primary"
                onClick={() => navigate('/profile')}
              >
                View Profile
              </Button>
            )}
            <Button
              variant="outlined"
              size="large"
              onClick={() => navigate('/mystery-box')}
            >
              Explore Mystery Boxes
            </Button>
            <Button
              variant="outlined"
              size="large"
              onClick={() => navigate('/vault')}
            >
              Create a Vault
            </Button>
          </Box>
        </Container>
      </Box>

      {/* About Section */}
      <Container maxWidth="lg" sx={{ my: 6 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Typography variant="h4" component="h2" gutterBottom>
              About NadVault
            </Typography>
            <Typography variant="body1" paragraph>
              NadVault is a decentralized application built on the Monad testnet, designed to showcase the capabilities of the Monad blockchain.
            </Typography>
            <Typography variant="body1" paragraph>
              Our platform offers three main features: a Mystery Box Launchpad for NFT auctions, Time-Locked Vaults for secure token storage with memories, and a Wallet Analyzer for insights into on-chain activity.
            </Typography>
            <Typography variant="body1">
              Built with React, Material-UI, and Solidity smart contracts, NadVault demonstrates the potential of decentralized applications on the Monad network.
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3, height: '100%' }}>
              <Typography variant="h5" gutterBottom>
                Getting Started
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Typography variant="body1" paragraph>
                1. Connect your Monad testnet wallet
              </Typography>
              <Typography variant="body1" paragraph>
                2. Explore the Mystery Box Launchpad to create or bid on NFTs
              </Typography>
              <Typography variant="body1" paragraph>
                3. Create a Time-Locked Vault to store tokens and add memories
              </Typography>
              <Typography variant="body1">
                4. Use the Wallet Analyzer to check your on-chain activity
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default Home; 