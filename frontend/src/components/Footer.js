import React from 'react';
import {
  Box,
  Container,
  Grid,
  Link,
  Typography,
  Divider,
  IconButton,
} from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import TwitterIcon from '@mui/icons-material/Twitter';
import TelegramIcon from '@mui/icons-material/Telegram';

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: 6,
        px: 2,
        mt: 'auto',
        backgroundColor: (theme) => theme.palette.background.paper,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              NadVault
            </Typography>
            <Typography variant="body2" color="text.secondary">
              A decentralized application built on the Monad testnet, offering mystery box auctions, time-locked vaults, and wallet analytics.
            </Typography>
            <Box sx={{ mt: 2 }}>
              <IconButton aria-label="github" color="inherit" href="https://github.com" target="_blank" rel="noopener noreferrer">
                <GitHubIcon />
              </IconButton>
              <IconButton aria-label="twitter" color="inherit" href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <TwitterIcon />
              </IconButton>
              <IconButton aria-label="telegram" color="inherit" href="https://telegram.org" target="_blank" rel="noopener noreferrer">
                <TelegramIcon />
              </IconButton>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Features
            </Typography>
            <Link href="/mystery-box" color="inherit" display="block" sx={{ mb: 1 }}>
              Mystery Box Launchpad
            </Link>
            <Link href="/vault" color="inherit" display="block" sx={{ mb: 1 }}>
              Time-Locked Vaults
            </Link>
            <Link href="/wallet-analyzer" color="inherit" display="block" sx={{ mb: 1 }}>
              Wallet Analyzer
            </Link>
            <Link href="/profile" color="inherit" display="block">
              User Profile
            </Link>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Resources
            </Typography>
            <Link href="https://docs.monad.xyz" color="inherit" target="_blank" rel="noopener noreferrer" display="block" sx={{ mb: 1 }}>
              Monad Documentation
            </Link>
            <Link href="https://faucet.monad.xyz" color="inherit" target="_blank" rel="noopener noreferrer" display="block" sx={{ mb: 1 }}>
              Monad Testnet Faucet
            </Link>
            <Link href="https://explorer.monad.xyz" color="inherit" target="_blank" rel="noopener noreferrer" display="block">
              Monad Explorer
            </Link>
          </Grid>
        </Grid>
        <Divider sx={{ mt: 3, mb: 2 }} />
        <Typography variant="body2" color="text.secondary" align="center">
          {'Copyright © '}
          <Link color="inherit" href="/">
            NadVault
          </Link>{' '}
          {new Date().getFullYear()}
          {'. All rights reserved.'}
        </Typography>
      </Container>
    </Box>
  );
}

export default Footer; 