import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Avatar,
  Chip,
  Button,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Grid,
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import GoogleIcon from '@mui/icons-material/Google';
import AppleIcon from '@mui/icons-material/Apple';
import ChatIcon from '@mui/icons-material/Chat';
import { usePrivyAuth } from '../hooks/usePrivyAuth';

function UserProfileCard() {
  const { 
    user, 
    account, 
    wallets, 
    linkWallet, 
    unlinkWallet, 
    createWallet 
  } = usePrivyAuth();

  if (!user) {
    return null;
  }

  // Get user's linked accounts
  const linkedAccounts = [];
  
  if (user.email) {
    linkedAccounts.push({
      type: 'email',
      value: user.email.address,
      icon: <EmailIcon />,
    });
  }
  
  if (user.google) {
    linkedAccounts.push({
      type: 'google',
      value: user.google.email,
      icon: <GoogleIcon />,
    });
  }
  
  if (user.apple) {
    linkedAccounts.push({
      type: 'apple',
      value: user.apple.email,
      icon: <AppleIcon />,
    });
  }
  
  if (user.discord) {
    linkedAccounts.push({
      type: 'discord',
      value: user.discord.username,
      icon: <ChatIcon />,
    });
  }

  // Get user's display name
  const getDisplayName = () => {
    if (user.email) return user.email.address;
    if (user.google) return user.google.email;
    if (user.apple) return user.apple.email;
    if (user.discord) return user.discord.username;
    if (account) return `${account.slice(0, 6)}...${account.slice(-4)}`;
    return 'User';
  };

  // Get avatar content
  const getAvatarContent = () => {
    const name = getDisplayName();
    return name.charAt(0).toUpperCase();
  };

  return (
    <Card sx={{ mb: 4 }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <Avatar
            sx={{
              width: 64,
              height: 64,
              bgcolor: 'primary.main',
              mr: 2,
            }}
          >
            {getAvatarContent()}
          </Avatar>
          <Box>
            <Typography variant="h5">{getDisplayName()}</Typography>
            <Typography variant="body2" color="text.secondary">
              User ID: {user.id.slice(0, 8)}...
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Typography variant="h6" gutterBottom>
          Linked Accounts
        </Typography>
        
        {linkedAccounts.length > 0 ? (
          <List>
            {linkedAccounts.map((account) => (
              <ListItem key={account.type}>
                <ListItemIcon>{account.icon}</ListItemIcon>
                <ListItemText
                  primary={account.type.charAt(0).toUpperCase() + account.type.slice(1)}
                  secondary={account.value}
                />
              </ListItem>
            ))}
          </List>
        ) : (
          <Typography variant="body2" color="text.secondary">
            No linked accounts
          </Typography>
        )}

        <Divider sx={{ my: 2 }} />

        <Typography variant="h6" gutterBottom>
          Wallets
        </Typography>
        
        {wallets && wallets.length > 0 ? (
          <Grid container spacing={2}>
            {wallets.map((wallet) => (
              <Grid item xs={12} key={wallet.address}>
                <Box
                  sx={{
                    p: 2,
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: 1,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <AccountBalanceWalletIcon sx={{ mr: 1 }} />
                    <Box>
                      <Typography variant="body2">
                        {wallet.address.slice(0, 6)}...{wallet.address.slice(-4)}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {wallet.walletClientType === 'privy'
                          ? 'Embedded Wallet'
                          : wallet.walletClientType}
                      </Typography>
                    </Box>
                  </Box>
                  
                  {wallet.walletClientType !== 'privy' && (
                    <Button
                      size="small"
                      variant="outlined"
                      color="error"
                      onClick={() => unlinkWallet(wallet.address)}
                    >
                      Unlink
                    </Button>
                  )}
                </Box>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography variant="body2" color="text.secondary">
            No wallets connected
          </Typography>
        )}

        <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
          <Button
            variant="contained"
            startIcon={<AccountBalanceWalletIcon />}
            onClick={createWallet}
          >
            Create Wallet
          </Button>
          <Button
            variant="outlined"
            startIcon={<AccountBalanceWalletIcon />}
            onClick={linkWallet}
          >
            Link Wallet
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}

export default UserProfileCard; 