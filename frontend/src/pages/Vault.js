import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardActions,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  TextField,
  Typography,
  CircularProgress,
  Alert,
  Chip,
  Snackbar,
  Tabs,
  Tab,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
} from '@mui/material';
import { ethers } from 'ethers';
import { useWeb3 } from '../utils/Web3Context';
import TimeLockVaultABI from '../contracts/TimeLockVault.json';
import contractAddresses from '../contracts/addresses.json';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import ImageIcon from '@mui/icons-material/Image';
import NoteIcon from '@mui/icons-material/Note';
import PaymentIcon from '@mui/icons-material/Payment';

function Vault() {
  const { account, provider } = useWeb3();
  const [loading, setLoading] = useState(false);
  const [vaults, setVaults] = useState([]);
  const [selectedVault, setSelectedVault] = useState(null);
  const [vaultMemories, setVaultMemories] = useState([]);
  const [subscriptionFee, setSubscriptionFee] = useState('0');
  const [tabValue, setTabValue] = useState(0);
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [openMemoryDialog, setOpenMemoryDialog] = useState(false);
  const [openSubscriptionDialog, setOpenSubscriptionDialog] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });
  
  const [formData, setFormData] = useState({
    token: '',
    amount: '',
    lockDuration: '',
    yieldRate: '',
    memoryURI: '',
  });
  
  const [memoryData, setMemoryData] = useState({
    note: '',
    imageURI: '',
  });
  
  const [paymentAmount, setPaymentAmount] = useState('0.01');

  useEffect(() => {
    if (account && provider) {
      fetchVaults();
      fetchSubscriptionFee();
    }
  }, [account, provider]);

  const fetchVaults = async () => {
    try {
      setLoading(true);
      const contract = new ethers.Contract(
        contractAddresses.TimeLockVault,
        TimeLockVaultABI.abi,
        provider
      );

      const vaultIds = await contract.getUserVaults(account);
      
      const vaultsPromises = vaultIds.map(async (id) => {
        const details = await contract.getVaultDetails(id);
        return {
          id,
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
      setSnackbar({
        open: true,
        message: 'Error fetching vaults',
        severity: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchSubscriptionFee = async () => {
    try {
      const contract = new ethers.Contract(
        contractAddresses.TimeLockVault,
        TimeLockVaultABI.abi,
        provider
      );

      const fee = await contract.getSubscriptionFee(account);
      setSubscriptionFee(ethers.utils.formatEther(fee));
    } catch (error) {
      console.error('Error fetching subscription fee:', error);
    }
  };

  const fetchVaultMemories = async (vaultId) => {
    try {
      setLoading(true);
      const contract = new ethers.Contract(
        contractAddresses.TimeLockVault,
        TimeLockVaultABI.abi,
        provider
      );

      const memories = await contract.getVaultMemories(vaultId);
      setVaultMemories(memories);
    } catch (error) {
      console.error('Error fetching vault memories:', error);
      setSnackbar({
        open: true,
        message: 'Error fetching vault memories',
        severity: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCreateVault = async () => {
    if (!account || !provider) {
      setSnackbar({
        open: true,
        message: 'Please connect your wallet first',
        severity: 'warning',
      });
      return;
    }

    try {
      setLoading(true);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        contractAddresses.TimeLockVault,
        TimeLockVaultABI.abi,
        signer
      );

      // First approve the token transfer
      const tokenContract = new ethers.Contract(
        formData.token,
        ['function approve(address spender, uint256 amount) public returns (bool)'],
        signer
      );

      const approvalTx = await tokenContract.approve(
        contractAddresses.TimeLockVault,
        ethers.utils.parseEther(formData.amount)
      );

      setSnackbar({
        open: true,
        message: 'Approving token transfer...',
        severity: 'info',
      });

      await approvalTx.wait();

      // Then create the vault
      const tx = await contract.createVault(
        formData.token,
        ethers.utils.parseEther(formData.amount),
        parseInt(formData.lockDuration) * 86400, // Convert days to seconds
        parseInt(formData.yieldRate) * 100, // Convert percentage to basis points
        formData.memoryURI
      );

      setSnackbar({
        open: true,
        message: 'Creating vault...',
        severity: 'info',
      });

      await tx.wait();
      
      setSnackbar({
        open: true,
        message: 'Vault created successfully!',
        severity: 'success',
      });
      
      setOpenCreateDialog(false);
      setFormData({
        token: '',
        amount: '',
        lockDuration: '',
        yieldRate: '',
        memoryURI: '',
      });
      
      fetchVaults();
    } catch (error) {
      console.error('Error creating vault:', error);
      setSnackbar({
        open: true,
        message: 'Error creating vault: ' + error.message,
        severity: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddMemory = async () => {
    if (!account || !provider || !selectedVault) {
      setSnackbar({
        open: true,
        message: 'Please connect your wallet first',
        severity: 'warning',
      });
      return;
    }

    try {
      setLoading(true);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        contractAddresses.TimeLockVault,
        TimeLockVaultABI.abi,
        signer
      );

      const tx = await contract.addMemory(
        selectedVault.id,
        memoryData.note,
        memoryData.imageURI
      );

      setSnackbar({
        open: true,
        message: 'Adding memory...',
        severity: 'info',
      });

      await tx.wait();
      
      setSnackbar({
        open: true,
        message: 'Memory added successfully!',
        severity: 'success',
      });
      
      setOpenMemoryDialog(false);
      setMemoryData({
        note: '',
        imageURI: '',
      });
      
      fetchVaultMemories(selectedVault.id);
    } catch (error) {
      console.error('Error adding memory:', error);
      setSnackbar({
        open: true,
        message: 'Error adding memory: ' + error.message,
        severity: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePaySubscription = async () => {
    if (!account || !provider) {
      setSnackbar({
        open: true,
        message: 'Please connect your wallet first',
        severity: 'warning',
      });
      return;
    }

    try {
      setLoading(true);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        contractAddresses.TimeLockVault,
        TimeLockVaultABI.abi,
        signer
      );

      const tx = await contract.paySubscription({
        value: ethers.utils.parseEther(paymentAmount),
      });

      setSnackbar({
        open: true,
        message: 'Processing payment...',
        severity: 'info',
      });

      await tx.wait();
      
      setSnackbar({
        open: true,
        message: 'Subscription fee paid successfully!',
        severity: 'success',
      });
      
      setOpenSubscriptionDialog(false);
      setPaymentAmount('0.01');
      
      fetchSubscriptionFee();
    } catch (error) {
      console.error('Error paying subscription:', error);
      setSnackbar({
        open: true,
        message: 'Error paying subscription: ' + error.message,
        severity: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleUnlockVault = async (vaultId) => {
    if (!account || !provider) {
      setSnackbar({
        open: true,
        message: 'Please connect your wallet first',
        severity: 'warning',
      });
      return;
    }

    try {
      setLoading(true);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        contractAddresses.TimeLockVault,
        TimeLockVaultABI.abi,
        signer
      );

      const tx = await contract.unlockVault(vaultId);

      setSnackbar({
        open: true,
        message: 'Unlocking vault...',
        severity: 'info',
      });

      await tx.wait();
      
      setSnackbar({
        open: true,
        message: 'Vault unlocked successfully!',
        severity: 'success',
      });
      
      fetchVaults();
    } catch (error) {
      console.error('Error unlocking vault:', error);
      setSnackbar({
        open: true,
        message: 'Error unlocking vault: ' + error.message,
        severity: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleViewMemories = (vault) => {
    setSelectedVault(vault);
    fetchVaultMemories(vault.id);
    setTabValue(1);
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

  const formatDate = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleString();
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" component="h1">
          Time-Locked Vaults
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => setOpenSubscriptionDialog(true)}
            disabled={!account}
          >
            Pay Subscription
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setOpenCreateDialog(true)}
            disabled={!account}
          >
            Create Vault
          </Button>
        </Box>
      </Box>

      {!account && (
        <Alert severity="info" sx={{ mb: 4 }}>
          Please connect your wallet to interact with vaults.
        </Alert>
      )}

      {account && (
        <Paper sx={{ mb: 4, p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Your Subscription
          </Typography>
          <Typography variant="body1">
            Current Balance: {subscriptionFee} MON
          </Typography>
          <Typography variant="body2" color="text.secondary">
            You need at least 0.01 MON to unlock a vault.
          </Typography>
        </Paper>
      )}

      <Paper sx={{ mb: 4 }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab label="Your Vaults" />
          <Tab label="Memories" disabled={!selectedVault} />
        </Tabs>
      </Paper>

      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          <CircularProgress />
        </Box>
      )}

      {tabValue === 0 && !loading && vaults.length === 0 && (
        <Alert severity="info" sx={{ mb: 4 }}>
          No vaults found. Create one to get started!
        </Alert>
      )}

      {tabValue === 0 && (
        <Grid container spacing={3}>
          {vaults.map((vault) => (
            <Grid item xs={12} sm={6} md={4} key={vault.id.toString()}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h5" component="h2" gutterBottom>
                    Vault #{vault.id.toString()}
                  </Typography>
                  
                  <Box sx={{ position: 'absolute', top: 16, right: 16 }}>
                    <Chip
                      icon={vault.active ? <LockIcon /> : <LockOpenIcon />}
                      label={vault.active ? formatTimeLeft(vault.unlockTime) : 'Unlocked'}
                      color={vault.active ? 'primary' : 'default'}
                      size="small"
                    />
                  </Box>
                  
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
                    Lock Date: {formatDate(vault.lockTime)}
                  </Typography>
                  
                  <Typography variant="body2" gutterBottom>
                    Unlock Date: {formatDate(vault.unlockTime)}
                  </Typography>
                </CardContent>
                
                <CardActions>
                  <Button
                    size="small"
                    variant="outlined"
                    fullWidth
                    onClick={() => handleViewMemories(vault)}
                  >
                    View Memories
                  </Button>
                  
                  {vault.active && (
                    <Button
                      size="small"
                      variant="contained"
                      fullWidth
                      disabled={
                        !account ||
                        vault.unlockTime > Math.floor(Date.now() / 1000) ||
                        parseFloat(subscriptionFee) < 0.01
                      }
                      onClick={() => handleUnlockVault(vault.id)}
                    >
                      Unlock Vault
                    </Button>
                  )}
                  
                  {vault.active && (
                    <Button
                      size="small"
                      variant="outlined"
                      fullWidth
                      onClick={() => {
                        setSelectedVault(vault);
                        setOpenMemoryDialog(true);
                      }}
                    >
                      Add Memory
                    </Button>
                  )}
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {tabValue === 1 && selectedVault && (
        <Box>
          <Typography variant="h5" gutterBottom>
            Memories for Vault #{selectedVault.id.toString()}
          </Typography>
          
          <Button
            variant="outlined"
            sx={{ mb: 2 }}
            onClick={() => {
              setSelectedVault(null);
              setVaultMemories([]);
              setTabValue(0);
            }}
          >
            Back to Vaults
          </Button>
          
          {vaultMemories.length === 0 ? (
            <Alert severity="info">
              No memories found for this vault.
            </Alert>
          ) : (
            <List>
              {vaultMemories.map((memory, index) => (
                <Paper key={index} sx={{ mb: 2, p: 2 }}>
                  <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar>
                        <NoteIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={memory.note}
                      secondary={
                        <>
                          <Typography
                            component="span"
                            variant="body2"
                            color="text.primary"
                          >
                            {formatDate(memory.timestamp)}
                          </Typography>
                          {memory.imageURI && (
                            <Box sx={{ mt: 1 }}>
                              <Button
                                startIcon={<ImageIcon />}
                                href={memory.imageURI}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                View Image
                              </Button>
                            </Box>
                          )}
                        </>
                      }
                    />
                  </ListItem>
                </Paper>
              ))}
            </List>
          )}
          
          {selectedVault.active && (
            <Button
              variant="contained"
              startIcon={<NoteIcon />}
              onClick={() => setOpenMemoryDialog(true)}
              sx={{ mt: 2 }}
            >
              Add New Memory
            </Button>
          )}
        </Box>
      )}

      {/* Create Vault Dialog */}
      <Dialog open={openCreateDialog} onClose={() => setOpenCreateDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Create Time-Locked Vault</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Token Address"
            type="text"
            fullWidth
            value={formData.token}
            onChange={(e) => setFormData({ ...formData, token: e.target.value })}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            label="Amount"
            type="number"
            fullWidth
            value={formData.amount}
            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            label="Lock Duration (days)"
            type="number"
            fullWidth
            value={formData.lockDuration}
            onChange={(e) => setFormData({ ...formData, lockDuration: e.target.value })}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            label="Yield Rate (%)"
            type="number"
            fullWidth
            value={formData.yieldRate}
            onChange={(e) => setFormData({ ...formData, yieldRate: e.target.value })}
            sx={{ mb: 2 }}
            helperText="Maximum 50%"
          />
          <TextField
            margin="dense"
            label="Memory URI"
            type="text"
            fullWidth
            value={formData.memoryURI}
            onChange={(e) => setFormData({ ...formData, memoryURI: e.target.value })}
            helperText="IPFS URI or URL to the vault metadata"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenCreateDialog(false)}>Cancel</Button>
          <Button
            onClick={handleCreateVault}
            variant="contained"
            disabled={
              loading ||
              !formData.token ||
              !formData.amount ||
              !formData.lockDuration ||
              !formData.yieldRate ||
              !formData.memoryURI
            }
          >
            {loading ? <CircularProgress size={24} /> : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add Memory Dialog */}
      <Dialog open={openMemoryDialog} onClose={() => setOpenMemoryDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Add Memory to Vault</DialogTitle>
        <DialogContent>
          {selectedVault && (
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Vault #{selectedVault.id.toString()}
            </Typography>
          )}
          <TextField
            margin="dense"
            label="Note"
            type="text"
            fullWidth
            multiline
            rows={4}
            value={memoryData.note}
            onChange={(e) => setMemoryData({ ...memoryData, note: e.target.value })}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            label="Image URI"
            type="text"
            fullWidth
            value={memoryData.imageURI}
            onChange={(e) => setMemoryData({ ...memoryData, imageURI: e.target.value })}
            helperText="IPFS URI or URL to an image"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenMemoryDialog(false)}>Cancel</Button>
          <Button
            onClick={handleAddMemory}
            variant="contained"
            disabled={loading || !memoryData.note}
          >
            {loading ? <CircularProgress size={24} /> : 'Add Memory'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Pay Subscription Dialog */}
      <Dialog open={openSubscriptionDialog} onClose={() => setOpenSubscriptionDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Pay Subscription Fee</DialogTitle>
        <DialogContent>
          <Typography variant="body1" gutterBottom>
            Current Balance: {subscriptionFee} MON
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            You need at least 0.01 MON to unlock a vault.
          </Typography>
          <TextField
            margin="dense"
            label="Amount (MON)"
            type="number"
            fullWidth
            value={paymentAmount}
            onChange={(e) => setPaymentAmount(e.target.value)}
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenSubscriptionDialog(false)}>Cancel</Button>
          <Button
            onClick={handlePaySubscription}
            variant="contained"
            disabled={loading || !paymentAmount || parseFloat(paymentAmount) <= 0}
            startIcon={<PaymentIcon />}
          >
            {loading ? <CircularProgress size={24} /> : 'Pay'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default Vault; 