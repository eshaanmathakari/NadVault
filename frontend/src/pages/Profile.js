import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Avatar,
  Tabs,
  Tab,
  CircularProgress,
  Alert,
  Button,
} from '@mui/material';
import { ethers } from 'ethers';
import { usePrivyAuth } from '../hooks/usePrivyAuth';
import UserProfileCard from '../components/UserProfileCard';
import MysteryBoxLaunchpadABI from '../contracts/MysteryBoxLaunchpad.json';
import TimeLockVaultABI from '../contracts/TimeLockVault.json';
import contractAddresses from '../contracts/addresses.json';
import LockIcon from '@mui/icons-material/Lock';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import BarChartIcon from '@mui/icons-material/BarChart';
import { useNavigate } from 'react-router-dom';

function Profile() {
  const { account, provider, authenticated, user } = usePrivyAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const [mysteryBoxes, setMysteryBoxes] = useState([]);
  const [vaults, setVaults] = useState([]);
  const [walletStats, setWalletStats] = useState(null);

  useEffect(() => {
    if (account && provider) {
      fetchUserData();
    }
  }, [account, provider, tabValue]);

  const fetchUserData = async () => {
    setLoading(true);
    try {
      // Fetch data based on active tab
      if (tabValue === 0) {
        await fetchOverview();
      } else if (tabValue === 1) {
        await fetchMysteryBoxes();
      } else if (tabValue === 2) {
        await fetchVaults();
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchOverview = async () => {
    try {
      // Fetch wallet stats (mock data for now)
      setWalletStats({
        score: Math.floor(Math.random() * 100),
        transactions: Math.floor(Math.random() * 50),
        volume: (Math.random() * 10).toFixed(2),
        rank: Math.floor(Math.random() * 1000) + 1,
      });

      // Fetch a preview of mystery boxes
      await fetchMysteryBoxes(true);
      
      // Fetch a preview of vaults
      await fetchVaults(true);
    } catch (error) {
      console.error('Error fetching overview:', error);
    }
  };

  const fetchMysteryBoxes = async (preview = false) => {
    try {
      const mysteryBoxContract = new ethers.Contract(
        contractAddresses.MysteryBoxLaunchpad,
        MysteryBoxLaunchpadABI.abi,
        provider
      );

      const userCollection = await mysteryBoxContract.getUserCollection(account);
      
      // If preview, only get the first 3 items
      const boxesToFetch = preview ? userCollection.slice(0, 3) : userCollection;
      
      const boxesPromises = boxesToFetch.map(async (boxId) => {
        const box = await mysteryBoxContract.mysteryBoxes(boxId);
        return {
          id: boxId,
          name: box.name,
          description: box.description,
          imageURI: box.imageURI,
          creator: box.creator,
          currentBid: box.currentBid,
          highestBidder: box.highestBidder,
          endTime: box.endTime,
          active: box.active,
        };
      });

      const boxesData = await Promise.all(boxesPromises);
      setMysteryBoxes(boxesData);
    } catch (error) {
      console.error('Error fetching mystery boxes:', error);
    }
  };

  const fetchVaults = async (preview = false) => {
    try {
      const vaultContract = new ethers.Contract(
        contractAddresses.TimeLockVault,
        TimeLockVaultABI.abi,
        provider
      );

      const userVaults = await vaultContract.getUserVaults(account);
      
      // If preview, only get the first 3 items
      const vaultsToFetch = preview ? userVaults.slice(0, 3) : userVaults;
      
      const vaultsPromises = vaultsToFetch.map(async (vaultId) => {
        const details = await vaultContract.getVaultDetails(vaultId);
        return {
          id: vaultId,
          owner: details[0],
          token: details[1],
          amount: details[2],
          lockTime: details[3],
          unlockTime: details[4],
          yieldRate: details[5],
          memoryURI: details[6],
          active: details[7],
        };
      });

      const vaultsData = await Promise.all(vaultsPromises);
      setVaults(vaultsData);
    } catch (error) {
      console.error('Error fetching vaults:', error);
    }
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const formatDate = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleString();
  };

  const formatTimeLeft = (unlockTime) => {
    const now = Math.floor(Date.now() / 1000);
    const timeLeft = unlockTime - now;
    
    if (timeLeft <= 0) return 'Unlockable';
    
    const days = Math.floor(timeLeft / 86400);
    const hours = Math.floor((timeLeft % 86400) / 3600);
    const minutes = Math.floor((timeLeft % 3600) / 60);
    
    return `${days}d ${hours}h ${minutes}m`;
  };

  if (!authenticated) {
    return (
      <Container maxWidth="lg">
        <Box sx={{ my: 4, textAlign: 'center' }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Profile
          </Typography>
          <Alert severity="info" sx={{ mb: 2 }}>
            Please sign in to view your profile.
          </Alert>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Your Profile
        </Typography>
        
        {/* User Profile Card */}
        <UserProfileCard />

        <Paper sx={{ mb: 4 }}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab label="Overview" />
            <Tab label="Mystery Boxes" />
            <Tab label="Vaults" />
          </Tabs>
        </Paper>

        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
            <CircularProgress />
          </Box>
        )}

        {!loading && tabValue === 0 && (
          <Grid container spacing={3}>
            {/* Wallet Stats */}
            <Grid item xs={12} md={6}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <AccountBalanceWalletIcon color="primary" sx={{ mr: 1 }} />
                    <Typography variant="h6">Wallet Statistics</Typography>
                  </Box>
                  <Divider sx={{ mb: 2 }} />
                  
                  {walletStats ? (
                    <List>
                      <ListItem>
                        <ListItemText 
                          primary="Activity Score" 
                          secondary={`${walletStats.score}/100`} 
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemText 
                          primary="Total Transactions" 
                          secondary={walletStats.transactions} 
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemText 
                          primary="Transaction Volume" 
                          secondary={`${walletStats.volume} MON`} 
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemText 
                          primary="Rank" 
                          secondary={`#${walletStats.rank}`} 
                        />
                      </ListItem>
                    </List>
                  ) : (
                    <Typography variant="body2" color="text.secondary">
                      No wallet statistics available.
                    </Typography>
                  )}
                  
                  <Button 
                    variant="outlined" 
                    fullWidth 
                    sx={{ mt: 2 }}
                    onClick={() => navigate('/wallet-analyzer')}
                    startIcon={<BarChartIcon />}
                  >
                    View Full Analysis
                  </Button>
                </CardContent>
              </Card>
            </Grid>
            
            {/* Mystery Boxes Preview */}
            <Grid item xs={12} md={6}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <ShoppingCartIcon color="primary" sx={{ mr: 1 }} />
                    <Typography variant="h6">Your Mystery Boxes</Typography>
                  </Box>
                  <Divider sx={{ mb: 2 }} />
                  
                  {mysteryBoxes.length > 0 ? (
                    <List>
                      {mysteryBoxes.map((box) => (
                        <ListItem key={box.id.toString()}>
                          <ListItemText 
                            primary={box.name} 
                            secondary={
                              box.active 
                                ? `Current bid: ${ethers.utils.formatEther(box.currentBid)} MON` 
                                : 'Auction ended'
                            } 
                          />
                        </ListItem>
                      ))}
                      
                      {mysteryBoxes.length === 3 && (
                        <Button 
                          variant="outlined" 
                          fullWidth 
                          sx={{ mt: 2 }}
                          onClick={() => setTabValue(1)}
                        >
                          View All Mystery Boxes
                        </Button>
                      )}
                    </List>
                  ) : (
                    <Typography variant="body2" color="text.secondary">
                      You don't have any mystery boxes yet.
                    </Typography>
                  )}
                  
                  <Button 
                    variant="contained" 
                    fullWidth 
                    sx={{ mt: 2 }}
                    onClick={() => navigate('/mystery-box')}
                  >
                    Explore Mystery Boxes
                  </Button>
                </CardContent>
              </Card>
            </Grid>
            
            {/* Vaults Preview */}
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <LockIcon color="primary" sx={{ mr: 1 }} />
                    <Typography variant="h6">Your Time-Locked Vaults</Typography>
                  </Box>
                  <Divider sx={{ mb: 2 }} />
                  
                  {vaults.length > 0 ? (
                    <Grid container spacing={2}>
                      {vaults.map((vault) => (
                        <Grid item xs={12} md={4} key={vault.id.toString()}>
                          <Paper sx={{ p: 2 }}>
                            <Typography variant="subtitle1">
                              Vault #{vault.id.toString()}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {vault.active 
                                ? `Unlocks in: ${formatTimeLeft(vault.unlockTime)}` 
                                : 'Unlocked'}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              Amount: {ethers.utils.formatEther(vault.amount)} tokens
                            </Typography>
                          </Paper>
                        </Grid>
                      ))}
                    </Grid>
                  ) : (
                    <Typography variant="body2" color="text.secondary">
                      You don't have any vaults yet.
                    </Typography>
                  )}
                  
                  {vaults.length === 3 && (
                    <Button 
                      variant="outlined" 
                      fullWidth 
                      sx={{ mt: 2 }}
                      onClick={() => setTabValue(2)}
                    >
                      View All Vaults
                    </Button>
                  )}
                  
                  <Button 
                    variant="contained" 
                    fullWidth 
                    sx={{ mt: 2 }}
                    onClick={() => navigate('/vault')}
                  >
                    Manage Vaults
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        )}

        {!loading && tabValue === 1 && (
          <Box>
            <Typography variant="h5" gutterBottom>
              Your Mystery Boxes
            </Typography>
            
            {mysteryBoxes.length === 0 ? (
              <Alert severity="info">
                You don't have any mystery boxes yet. Visit the Mystery Box Launchpad to create or bid on boxes.
              </Alert>
            ) : (
              <Grid container spacing={3}>
                {mysteryBoxes.map((box) => (
                  <Grid item xs={12} md={4} key={box.id.toString()}>
                    <Card>
                      <CardContent>
                        <Typography variant="h6" gutterBottom>
                          {box.name}
                        </Typography>
                        
                        <Typography variant="body2" color="text.secondary" paragraph>
                          {box.description}
                        </Typography>
                        
                        <Divider sx={{ my: 1.5 }} />
                        
                        <Typography variant="body2" gutterBottom>
                          Current Bid: {ethers.utils.formatEther(box.currentBid)} MON
                        </Typography>
                        
                        <Typography variant="body2" gutterBottom>
                          Status: {box.active ? 'Active' : 'Ended'}
                        </Typography>
                        
                        {box.active && (
                          <Typography variant="body2" gutterBottom>
                            Ends: {formatDate(box.endTime)}
                          </Typography>
                        )}
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            )}
            
            <Button 
              variant="contained" 
              sx={{ mt: 3 }}
              onClick={() => navigate('/mystery-box')}
            >
              Go to Mystery Box Launchpad
            </Button>
          </Box>
        )}

        {!loading && tabValue === 2 && (
          <Box>
            <Typography variant="h5" gutterBottom>
              Your Time-Locked Vaults
            </Typography>
            
            {vaults.length === 0 ? (
              <Alert severity="info">
                You don't have any vaults yet. Visit the Vault page to create one.
              </Alert>
            ) : (
              <Grid container spacing={3}>
                {vaults.map((vault) => (
                  <Grid item xs={12} md={4} key={vault.id.toString()}>
                    <Card>
                      <CardContent>
                        <Typography variant="h6" gutterBottom>
                          Vault #{vault.id.toString()}
                        </Typography>
                        
                        <Divider sx={{ my: 1.5 }} />
                        
                        <Typography variant="body2" gutterBottom>
                          Token: {vault.token.slice(0, 6)}...{vault.token.slice(-4)}
                        </Typography>
                        
                        <Typography variant="body2" gutterBottom>
                          Amount: {ethers.utils.formatEther(vault.amount)} tokens
                        </Typography>
                        
                        <Typography variant="body2" gutterBottom>
                          Yield Rate: {vault.yieldRate / 100}%
                        </Typography>
                        
                        <Typography variant="body2" gutterBottom>
                          Status: {vault.active ? `Locked (${formatTimeLeft(vault.unlockTime)})` : 'Unlocked'}
                        </Typography>
                        
                        <Typography variant="body2" gutterBottom>
                          Lock Date: {formatDate(vault.lockTime)}
                        </Typography>
                        
                        <Typography variant="body2" gutterBottom>
                          Unlock Date: {formatDate(vault.unlockTime)}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            )}
            
            <Button 
              variant="contained" 
              sx={{ mt: 3 }}
              onClick={() => navigate('/vault')}
            >
              Go to Vaults
            </Button>
          </Box>
        )}
      </Box>
    </Container>
  );
}

export default Profile; 