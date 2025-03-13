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
  Chip,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import PersonIcon from '@mui/icons-material/Person';
import { useNavigate, useLocation } from 'react-router-dom';
import { usePrivyAuth } from '../hooks/usePrivyAuth';

const pages = [
  { name: 'Mystery Box', path: '/mystery-box' },
  { name: 'Vault', path: '/vault' },
  { name: 'Wallet Analyzer', path: '/wallet-analyzer' },
];

const settings = [
  { name: 'Profile', path: '/profile' },
  { name: 'Disconnect', path: null },
];

function Navbar() {
  const { 
    account, 
    connectWallet, 
    disconnectWallet, 
    authenticated,
    user,
    activeWallet,
    chainId,
  } = usePrivyAuth();
  
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
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', my: 2 }}>
        <img src="/nadvault_logo.png" alt="NadVault Logo" style={{ height: 30, marginRight: 8 }} />
        <Typography variant="h6">
          NadVault
        </Typography>
      </Box>
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

  // Get user display name or address
  const getUserDisplayName = () => {
    if (user?.email) {
      return user.email.address;
    } else if (account) {
      return `${account.slice(0, 6)}...${account.slice(-4)}`;
    }
    return 'User';
  };

  // Get avatar content
  const getAvatarContent = () => {
    if (user?.email) {
      return user.email.address.charAt(0).toUpperCase();
    } else if (account) {
      return account.slice(2, 4).toUpperCase();
    }
    return 'U';
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Logo for desktop */}
          <Box 
            sx={{
              display: { xs: 'none', md: 'flex' },
              alignItems: 'center',
              mr: 2, 
              cursor: 'pointer'
            }}
            onClick={() => navigate('/')}
          >
            <img src="/nadvault_logo.png" alt="NadVault Logo" style={{ height: 30, marginRight: 8 }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              sx={{
                fontWeight: 700,
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              NadVault
            </Typography>
          </Box>

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
          <Box
            sx={{
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              alignItems: 'center',
              cursor: 'pointer'
            }}
            onClick={() => navigate('/')}
          >
            <img src="/nadvault_logo.png" alt="NadVault Logo" style={{ height: 24, marginRight: 8 }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              sx={{
                fontWeight: 700,
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              NadVault
            </Typography>
          </Box>

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

          {/* Network indicator */}
          {authenticated && chainId && (
            <Chip 
              label={chainId === 1337 ? "Monad Testnet" : `Chain ID: ${chainId}`}
              color="secondary"
              size="small"
              sx={{ mr: 2 }}
            />
          )}

          {/* Wallet connection and user menu */}
          <Box sx={{ flexGrow: 0 }}>
            {authenticated ? (
              <>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar sx={{ bgcolor: 'secondary.main' }}>
                      {getAvatarContent()}
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
                      {getUserDisplayName()}
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
                startIcon={<PersonIcon />}
                onClick={connectWallet}
                sx={{ color: 'white', borderColor: 'white' }}
              >
                Sign In
              </Button>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar; 