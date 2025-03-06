import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
} from '@mui/material';

function Navbar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          NadVault
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button color="inherit" component={RouterLink} to="/">
            Home
          </Button>
          <Button color="inherit" component={RouterLink} to="/mystery-box">
            Mystery Box
          </Button>
          <Button color="inherit" component={RouterLink} to="/vault">
            Vault
          </Button>
          <Button color="inherit" component={RouterLink} to="/wallet-analysis">
            Wallet Analysis
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar; 