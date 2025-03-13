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
} from '@mui/material';
import { ethers } from 'ethers';
import { usePrivyAuth } from '../hooks/usePrivyAuth';
import MysteryBoxLaunchpadABI from '../contracts/MysteryBoxLaunchpad.json';
import contractAddresses from '../contracts/addresses.json';

function MysteryBox() {
  const { account, provider, signer, authenticated, isConnecting } = usePrivyAuth();
  const [loading, setLoading] = useState(false);
  const [mysteryBoxes, setMysteryBoxes] = useState([]);
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [openBidDialog, setOpenBidDialog] = useState(false);
  const [selectedBox, setSelectedBox] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });
  const [formData, setFormData] = useState({
    floorPrice: '',
    duration: '',
    totalSupply: '',
    metadataURI: '',
  });
  const [bidAmount, setBidAmount] = useState('');

  useEffect(() => {
    if (authenticated && account && provider) {
      fetchMysteryBoxes();
    }
  }, [authenticated, account, provider]);

  const fetchMysteryBoxes = async () => {
    try {
      setLoading(true);
      const contract = new ethers.Contract(
        contractAddresses.MysteryBoxLaunchpad,
        MysteryBoxLaunchpadABI.abi,
        provider
      );

      const activeBoxIds = await contract.getActiveBoxes();
      
      const boxesPromises = activeBoxIds.map(async (id) => {
        const box = await contract.mysteryBoxes(id);
        const auction = await contract.auctions(id);
        return { ...box, auction };
      });

      const boxes = await Promise.all(boxesPromises);
      setMysteryBoxes(boxes);
    } catch (error) {
      console.error('Error fetching mystery boxes:', error);
      setSnackbar({
        open: true,
        message: 'Error fetching mystery boxes',
        severity: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCreateMysteryBox = async () => {
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
      const contract = new ethers.Contract(
        contractAddresses.MysteryBoxLaunchpad,
        MysteryBoxLaunchpadABI.abi,
        signer
      );

      const tx = await contract.createMysteryBox(
        ethers.utils.parseEther(formData.floorPrice),
        parseInt(formData.duration) * 86400, // Convert days to seconds
        formData.totalSupply,
        formData.metadataURI
      );

      setSnackbar({
        open: true,
        message: 'Transaction submitted. Waiting for confirmation...',
        severity: 'info',
      });

      await tx.wait();
      
      setSnackbar({
        open: true,
        message: 'Mystery box created successfully!',
        severity: 'success',
      });
      
      setOpenCreateDialog(false);
      setFormData({
        floorPrice: '',
        duration: '',
        totalSupply: '',
        metadataURI: '',
      });
      
      fetchMysteryBoxes();
    } catch (error) {
      console.error('Error creating mystery box:', error);
      setSnackbar({
        open: true,
        message: 'Error creating mystery box: ' + error.message,
        severity: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePlaceBid = async () => {
    if (!account || !provider || !selectedBox) {
      setSnackbar({
        open: true,
        message: 'Please connect your wallet first',
        severity: 'warning',
      });
      return;
    }

    try {
      setLoading(true);
      const contract = new ethers.Contract(
        contractAddresses.MysteryBoxLaunchpad,
        MysteryBoxLaunchpadABI.abi,
        signer
      );

      const tx = await contract.placeBid(selectedBox.id, {
        value: ethers.utils.parseEther(bidAmount),
      });

      setSnackbar({
        open: true,
        message: 'Bid submitted. Waiting for confirmation...',
        severity: 'info',
      });

      await tx.wait();
      
      setSnackbar({
        open: true,
        message: 'Bid placed successfully!',
        severity: 'success',
      });
      
      setOpenBidDialog(false);
      setBidAmount('');
      setSelectedBox(null);
      
      fetchMysteryBoxes();
    } catch (error) {
      console.error('Error placing bid:', error);
      setSnackbar({
        open: true,
        message: 'Error placing bid: ' + error.message,
        severity: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEndAuction = async (boxId) => {
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
      const contract = new ethers.Contract(
        contractAddresses.MysteryBoxLaunchpad,
        MysteryBoxLaunchpadABI.abi,
        signer
      );

      const tx = await contract.endAuction(boxId);

      setSnackbar({
        open: true,
        message: 'Ending auction. Waiting for confirmation...',
        severity: 'info',
      });

      await tx.wait();
      
      setSnackbar({
        open: true,
        message: 'Auction ended successfully!',
        severity: 'success',
      });
      
      fetchMysteryBoxes();
    } catch (error) {
      console.error('Error ending auction:', error);
      setSnackbar({
        open: true,
        message: 'Error ending auction: ' + error.message,
        severity: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  const formatAddress = (address) => {
    if (!address || address === ethers.constants.AddressZero) return 'No bids yet';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const formatTimeLeft = (endTime) => {
    const now = Math.floor(Date.now() / 1000);
    const timeLeft = endTime - now;
    
    if (timeLeft <= 0) return 'Ended';
    
    const days = Math.floor(timeLeft / 86400);
    const hours = Math.floor((timeLeft % 86400) / 3600);
    const minutes = Math.floor((timeLeft % 3600) / 60);
    
    return `${days}d ${hours}h ${minutes}m`;
  };

  const handleOpenBidDialog = (box) => {
    setSelectedBox(box);
    setBidAmount(ethers.utils.formatEther(box.floorPrice));
    setOpenBidDialog(true);
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" component="h1">
          Mystery Box Launchpad
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setOpenCreateDialog(true)}
          disabled={!authenticated}
        >
          Create Mystery Box
        </Button>
      </Box>

      {!authenticated && (
        <Alert severity="info" sx={{ mb: 4 }}>
          Please connect your wallet to interact with mystery boxes.
        </Alert>
      )}

      {authenticated && isConnecting && (
        <Alert severity="info" sx={{ mb: 4 }}>
          Connecting to your wallet...
        </Alert>
      )}

      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          <CircularProgress />
        </Box>
      )}

      {!loading && mysteryBoxes.length === 0 && authenticated && !isConnecting && (
        <Alert severity="info" sx={{ mb: 4 }}>
          No active mystery boxes found. Create one to get started!
        </Alert>
      )}

      <Grid container spacing={3}>
        {mysteryBoxes.map((box) => (
          <Grid item xs={12} sm={6} md={4} key={box.id.toString()}>
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
                  Mystery Box #{box.id.toString()}
                </Typography>
                
                <Box sx={{ position: 'absolute', top: 16, right: 16 }}>
                  <Chip
                    label={formatTimeLeft(box.endTime)}
                    color={
                      box.endTime > Math.floor(Date.now() / 1000)
                        ? 'primary'
                        : 'default'
                    }
                    size="small"
                  />
                </Box>
                
                <Typography color="text.secondary" gutterBottom>
                  Creator: {formatAddress(box.creator)}
                </Typography>
                
                <Divider sx={{ my: 1.5 }} />
                
                <Typography variant="body2" gutterBottom>
                  Floor Price: {ethers.utils.formatEther(box.floorPrice)} MON
                </Typography>
                
                <Typography variant="body2" gutterBottom>
                  Supply: {box.remainingSupply.toString()} / {box.totalSupply.toString()}
                </Typography>
                
                <Typography variant="body2" gutterBottom>
                  Highest Bid: {box.auction.highestBid.gt(0)
                    ? ethers.utils.formatEther(box.auction.highestBid) + ' MON'
                    : 'No bids yet'}
                </Typography>
                
                <Typography variant="body2" gutterBottom>
                  Highest Bidder: {formatAddress(box.auction.highestBidder)}
                </Typography>
              </CardContent>
              
              <CardActions>
                <Button
                  size="small"
                  variant="contained"
                  fullWidth
                  disabled={
                    !account ||
                    box.endTime <= Math.floor(Date.now() / 1000) ||
                    box.auction.ended
                  }
                  onClick={() => handleOpenBidDialog(box)}
                >
                  Place Bid
                </Button>
                
                <Button
                  size="small"
                  variant="outlined"
                  fullWidth
                  disabled={
                    !account ||
                    box.endTime > Math.floor(Date.now() / 1000) ||
                    box.auction.ended ||
                    box.auction.highestBidder === ethers.constants.AddressZero
                  }
                  onClick={() => handleEndAuction(box.id)}
                >
                  End Auction
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Create Mystery Box Dialog */}
      <Dialog open={openCreateDialog} onClose={() => setOpenCreateDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Create Mystery Box</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Floor Price (MON)"
            type="number"
            fullWidth
            value={formData.floorPrice}
            onChange={(e) => setFormData({ ...formData, floorPrice: e.target.value })}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            label="Duration (days)"
            type="number"
            fullWidth
            value={formData.duration}
            onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            label="Total Supply"
            type="number"
            fullWidth
            value={formData.totalSupply}
            onChange={(e) => setFormData({ ...formData, totalSupply: e.target.value })}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            label="Metadata URI"
            type="text"
            fullWidth
            value={formData.metadataURI}
            onChange={(e) => setFormData({ ...formData, metadataURI: e.target.value })}
            helperText="IPFS URI or URL to the NFT metadata"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenCreateDialog(false)}>Cancel</Button>
          <Button
            onClick={handleCreateMysteryBox}
            variant="contained"
            disabled={
              loading ||
              !formData.floorPrice ||
              !formData.duration ||
              !formData.totalSupply ||
              !formData.metadataURI
            }
          >
            {loading ? <CircularProgress size={24} /> : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Place Bid Dialog */}
      <Dialog open={openBidDialog} onClose={() => setOpenBidDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Place Bid</DialogTitle>
        <DialogContent>
          {selectedBox && (
            <>
              <Typography variant="body1" gutterBottom>
                Mystery Box #{selectedBox.id.toString()}
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Floor Price: {ethers.utils.formatEther(selectedBox.floorPrice)} MON
              </Typography>
              {selectedBox.auction.highestBid.gt(0) && (
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Current Highest Bid: {ethers.utils.formatEther(selectedBox.auction.highestBid)} MON
                </Typography>
              )}
              <TextField
                margin="dense"
                label="Bid Amount (MON)"
                type="number"
                fullWidth
                value={bidAmount}
                onChange={(e) => setBidAmount(e.target.value)}
                sx={{ mt: 2 }}
                helperText={`Minimum bid: ${
                  selectedBox.auction.highestBid.gt(0)
                    ? ethers.utils.formatEther(selectedBox.auction.highestBid.add(ethers.utils.parseEther('0.01')))
                    : ethers.utils.formatEther(selectedBox.floorPrice)
                } MON`}
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenBidDialog(false)}>Cancel</Button>
          <Button
            onClick={handlePlaceBid}
            variant="contained"
            disabled={
              loading ||
              !bidAmount ||
              (selectedBox &&
                ethers.utils.parseEther(bidAmount).lte(
                  selectedBox.auction.highestBid.gt(0)
                    ? selectedBox.auction.highestBid
                    : selectedBox.floorPrice
                ))
            }
          >
            {loading ? <CircularProgress size={24} /> : 'Place Bid'}
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

export default MysteryBox; 