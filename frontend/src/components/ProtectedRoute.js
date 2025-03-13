import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { usePrivyAuth } from '../hooks/usePrivyAuth';
import { Box, CircularProgress, Typography, Button, Paper } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';

function ProtectedRoute({ children }) {
  const { authenticated, ready, connectWallet } = usePrivyAuth();
  const location = useLocation();

  // Show loading state while Privy is initializing
  if (!ready) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '50vh',
        }}
      >
        <CircularProgress size={40} />
        <Typography variant="body1" sx={{ mt: 2 }}>
          Loading...
        </Typography>
      </Box>
    );
  }

  // If not authenticated, show login prompt
  if (!authenticated) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '50vh',
          p: 3,
        }}
      >
        <Paper
          elevation={3}
          sx={{
            p: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            maxWidth: 500,
            width: '100%',
          }}
        >
          <Typography variant="h5" gutterBottom>
            Authentication Required
          </Typography>
          <Typography variant="body1" align="center" sx={{ mb: 3 }}>
            Please sign in to access this page.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<PersonIcon />}
            onClick={connectWallet}
            size="large"
          >
            Sign In
          </Button>
        </Paper>
      </Box>
    );
  }

  // If authenticated, render the protected content
  return children;
}

export default ProtectedRoute; 