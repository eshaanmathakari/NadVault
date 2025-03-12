import React, { useState } from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Button,
  Tooltip,
  MenuItem,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import { useNavigate, useLocation } from 'react-router-dom';
import { useWeb3 } from '../utils/Web3Context';

const pages = [
  { name: 'Home', path: '/' },
  { name: 'Mystery Box', path: '/mystery-box' },
  { name: 'Vault', path: '/vault' },
  { name: 'Wallet Analyzer', path: '/wallet-analyzer' },
];

const settings = [
  { name: 'Profile', path: '/profile' },
  { name: 'Disconnect', path: null },
];

function Navbar() {
  const { account, connectWallet, disconnectWallet } = useWeb3();
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [anchorElUser, setAnchorElUser] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleSettingClick = (setting) => {
    handleCloseUserMenu();
    if (setting.path) {
      navigate(setting.path);
    } else if (setting.name === 'Disconnect') {
      disconnectWallet();
    }
  };

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        NadVault
      </Typography>
      <Divider />
      <List>
        {pages.map((page) => (
          <ListItem key={page.name} disablePadding>
            <ListItemButton
              sx={{ textAlign: 'center' }}
              onClick={() => navigate(page.path)}
              selected={location.pathname === page.path}
            >
              <ListItemText primary={page.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Logo for desktop */}
          <Typography
            variant="h6"
            noWrap
            component="a"
            onClick={() => navigate('/')}
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontWeight: 700,
              color: 'inherit',
              textDecoration: 'none',
              cursor: 'pointer',
            }}
          >
            NadVault
          </Typography>

          {/* Mobile menu button */}
          <Box sx={{ flexGrow: 0, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleDrawerToggle}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor="left"
              open={drawerOpen}
              onClose={handleDrawerToggle}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile
              }}
              sx={{
                display: { xs: 'block', md: 'none' },
                '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
              }}
            >
              {drawer}
            </Drawer>
          </Box>

          {/* Logo for mobile */}
          <Typography
            variant="h6"
            noWrap
            component="a"
            onClick={() => navigate('/')}
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontWeight: 700,
              color: 'inherit',
              textDecoration: 'none',
              cursor: 'pointer',
            }}
          >
            NadVault
          </Typography>

          {/* Desktop navigation */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page.name}
                onClick={() => navigate(page.path)}
                sx={{
                  my: 2,
                  color: 'white',
                  display: 'block',
                  backgroundColor: location.pathname === page.path ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                }}
              >
                {page.name}
              </Button>
            ))}
          </Box>

          {/* Wallet connection and user menu */}
          <Box sx={{ flexGrow: 0 }}>
            {account ? (
              <>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar sx={{ bgcolor: 'secondary.main' }}>
                      {account.slice(2, 4).toUpperCase()}
                    </Avatar>
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: '45px' }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <MenuItem disabled>
                    <Typography textAlign="center" noWrap>
                      {account.slice(0, 6)}...{account.slice(-4)}
                    </Typography>
                  </MenuItem>
                  <Divider />
                  {settings.map((setting) => (
                    <MenuItem key={setting.name} onClick={() => handleSettingClick(setting)}>
                      <Typography textAlign="center">{setting.name}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </>
            ) : (
              <Button
                variant="outlined"
                startIcon={<AccountBalanceWalletIcon />}
                onClick={connectWallet}
                sx={{ color: 'white', borderColor: 'white' }}
              >
                Connect Wallet
              </Button>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar; 