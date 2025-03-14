import React, { useState, useEffect, useRef } from 'react';
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
  Fade,
  Slide,
  Grow,
  Stack,
  Chip,
  IconButton,
  Tooltip,
  LinearProgress,
  Avatar,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useWeb3 } from '../utils/Web3Context';
import LockIcon from '@mui/icons-material/Lock';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BarChartIcon from '@mui/icons-material/BarChart';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ExploreIcon from '@mui/icons-material/Explore';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import SecurityIcon from '@mui/icons-material/Security';
import SpeedIcon from '@mui/icons-material/Speed';
import GroupIcon from '@mui/icons-material/Group';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { usePrivyAuth } from '../hooks/usePrivyAuth';
import PersonIcon from '@mui/icons-material/Person';

function Home() {
  const { authenticated, connectWallet, user } = usePrivyAuth();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [activeStep, setActiveStep] = useState(0);
  const [showStats, setShowStats] = useState(false);
  
  // Create ref for the features section
  const featuresRef = useRef(null);

  useEffect(() => {
    // Auto-rotate testimonials
    const interval = setInterval(() => {
      setActiveStep((prevStep) => (prevStep + 1) % testimonials.length);
    }, 5000);
    
    // Show animated stats after 1 second
    const timer = setTimeout(() => {
      setShowStats(true);
    }, 1000);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, []);

  // Function to handle smooth scrolling
  const scrollToFeatures = () => {
    featuresRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const features = [
    {
      title: 'Mystery Box Launchpad',
      description: 'Create and bid on exclusive NFT mystery boxes with our cutting-edge auction platform. Discover rare digital collectibles and build your portfolio.',
      icon: <ShoppingCartIcon fontSize="large" color="primary" />,
      path: '/mystery-box',
      highlights: ['Transparent bidding', 'Exclusive NFTs', 'Creator royalties'],
    },
    {
      title: 'Time-Locked Vaults',
      description: 'Lock your tokens securely with sentimental memories attached. Generate yield over time and create a digital time capsule for the future.',
      icon: <LockIcon fontSize="large" color="primary" />,
      path: '/vault',
      highlights: ['Yield generation', 'Memory storage', 'Time-locked security'],
    },
    {
      title: 'Wallet Analyzer',
      description: 'Gain valuable insights about your on-chain presence. Visualize transaction patterns, track portfolio performance, and optimize your strategy.',
      icon: <BarChartIcon fontSize="large" color="primary" />,
      path: '/wallet-analyzer',
      highlights: ['Transaction history', 'Performance metrics', 'Portfolio insights'],
    },
  ];

  const testimonials = [
    {
      quote: "NadVault's Memory Vaults helped me create a digital time capsule for my family. The yield generation is an amazing bonus!",
      author: "Alex M.",
      avatar: "A",
      role: "Early Adopter"
    },
    {
      quote: "The Mystery Box platform is addictive! I've discovered rare NFTs that have significantly appreciated in value.",
      author: "Sarah T.",
      role: "Digital Collector",
      avatar: "S"
    },
    {
      quote: "As a developer, I'm impressed by how seamlessly NadVault integrates with Monad's infrastructure. The user experience is top-notch.",
      author: "Dev K.",
      role: "Blockchain Developer",
      avatar: "D"
    }
  ];

  const stats = [
    { label: "Active Users", value: "14,500+", icon: <GroupIcon color="secondary" /> },
    { label: "Locked Value", value: "$3.2M+", icon: <SecurityIcon color="secondary" /> },
    { label: "Auctions Completed", value: "8,700+", icon: <ShoppingCartIcon color="secondary" /> },
    { label: "Avg. Annual Yield", value: "12.3%", icon: <TrendingUpIcon color="secondary" /> },
  ];

  return (
    <Box>
      {/* Hero Section - Full-width gradient background with animated elements */}
      <Box
        sx={{
          position: 'relative',
          color: 'white',
          mb: 6,
          overflow: 'hidden',
          background: 'linear-gradient(135deg, #1e0338 0%, #570e97 50%, #1e0338 100%)',
          boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
        }}
      >
        {/* Animated background patterns */}
        <Box sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.1,
          background: `url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.4"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')`,
        }} />

        <Container maxWidth="lg" sx={{ position: 'relative', py: 8, zIndex: 1 }}>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Slide direction="right" in={true} timeout={1000}>
                <Box>
                  <Typography 
                    component="h1" 
                    variant="h2" 
                    fontWeight="700" 
                    color="white" 
                    gutterBottom
                    sx={{ textShadow: '0 2px 10px rgba(0,0,0,0.3)' }}
                  >
                    Unlock the Future of Digital Assets
                  </Typography>
                  <Typography 
                    variant="h5" 
                    color="white" 
                    sx={{ 
                      mb: 4, 
                      opacity: 0.9,
                      textShadow: '0 1px 5px rgba(0,0,0,0.2)',
                    }}
                  >
                    NadVault brings together Mystery Box auctions, Time-Locked Vaults, and powerful Wallet Analytics on the lightning-fast Monad network.
                  </Typography>
                  
                  <Stack direction="row" spacing={2} sx={{ mt: 4, flexWrap: 'wrap', gap: 2 }}>
                    {!authenticated ? (
                      <Button
                        variant="contained"
                        size="large"
                        color="secondary"
                        startIcon={<PersonIcon />}
                        onClick={connectWallet}
                        sx={{ 
                          px: 4, 
                          py: 1.5,
                          boxShadow: '0 4px 14px rgba(0,176,255,0.5)',
                        }}
                      >
                        Get Started Now
                      </Button>
                    ) : (
                      <Button
                        variant="contained"
                        size="large"
                        color="secondary"
                        onClick={() => navigate('/profile')}
                        sx={{ px: 4, py: 1.5 }}
                      >
                        View Your Dashboard
                      </Button>
                    )}
                    <Button
                      variant="outlined"
                      size="large"
                      endIcon={<KeyboardArrowDownIcon />}
                      sx={{ 
                        color: 'white', 
                        borderColor: 'rgba(255,255,255,0.5)',
                        '&:hover': {
                          borderColor: 'white',
                          backgroundColor: 'rgba(255,255,255,0.1)'
                        },
                        px: 3,
                        py: 1.5
                      }}
                      onClick={scrollToFeatures}
                    >
                      Explore Features
                    </Button>
                  </Stack>
                </Box>
              </Slide>
            </Grid>
            <Grid item xs={12} md={6}>
              <Fade in={true} timeout={1500}>
                <Box
                  sx={{
                    position: 'relative',
                    height: { xs: '300px', md: '500px' },
                    width: '100%',
                    overflow: 'hidden',
                    borderRadius: { xs: 0, md: 0 },
                    boxShadow: '0 10px 40px rgba(0,0,0,0.3)',
                  }}
                >
                  <Box
                    component="img"
                    src="/nadvault_hero.png" 
                    alt="NadVault Platform"
                    sx={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                    onError={(e) => {
                      // Fallback image if the custom image doesn't exist
                      e.target.src = 'https://source.unsplash.com/random?blockchain,technology,future';
                    }}
                  />
                  <Box
                    sx={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      p: 2,
                      background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
                    }}
                  >
                    <Chip 
                      label="Built on Monad Testnet" 
                      color="secondary" 
                      size="small" 
                      sx={{ mb: 1 }}
                    />
                    <Typography variant="body2" color="white">
                      Experience blazing-fast transactions and minimal fees
                    </Typography>
                  </Box>
                </Box>
              </Fade>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Stats Section */}
      <Container maxWidth="lg" sx={{ mb: 8 }}>
        <Grid container spacing={3}>
          {stats.map((stat, index) => (
            <Grid item xs={6} md={3} key={index}>
              <Grow in={showStats} timeout={1000 + (index * 200)}>
                <Paper sx={{ 
                  p: 3, 
                  textAlign: 'center',
                  height: '100%',
                  transition: 'transform 0.3s',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
                    borderTop: '2px solid',
                    borderColor: 'secondary.main'
                  }
                }}>
                  <Box sx={{ mb: 1 }}>
                    {stat.icon}
                  </Box>
                  <Typography variant="h4" component="div" fontWeight="bold" gutterBottom>
                    {stat.value}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {stat.label}
                  </Typography>
                </Paper>
              </Grow>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Features Section - With animated cards and more detailed content */}
      <Container id="features" ref={featuresRef} maxWidth="lg" sx={{ mb: 10, scrollMargin: '100px' }}>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography 
            variant="h3" 
            component="h2" 
            gutterBottom 
            fontWeight="700"
            sx={{ 
              background: 'linear-gradient(45deg, #6a1b9a 30%, #00b0ff 90%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 1
            }}
          >
            Revolutionary Features
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: '700px', mx: 'auto' }}>
            Discover the tools that are changing how people interact with digital assets
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Grow in={true} timeout={1000 + (index * 300)}>
                <Card 
                  sx={{ 
                    height: '100%', 
                    display: 'flex', 
                    flexDirection: 'column',
                    transition: 'transform 0.3s, box-shadow 0.3s',
                    '&:hover': {
                      transform: 'translateY(-10px)',
                      boxShadow: '0 12px 20px rgba(0,0,0,0.2)',
                    },
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  <Box 
                    sx={{ 
                      position: 'absolute', 
                      top: 0, 
                      left: 0, 
                      width: '100%', 
                      height: '5px',
                      background: index === 0 
                        ? 'linear-gradient(90deg, #6a1b9a, #9c27b0)' 
                        : index === 1 
                          ? 'linear-gradient(90deg, #00b0ff, #03a9f4)' 
                          : 'linear-gradient(90deg, #3d5afe, #536dfe)', 
                    }} 
                  />
                  <CardContent sx={{ flexGrow: 1, pt: 4 }}>
                    <Box sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      mb: 2,
                      px: 1, 
                    }}>
                      <Box sx={{ 
                        p: 1, 
                        borderRadius: '50%', 
                        bgcolor: 'background.paper',
                        mr: 2,
                        boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                      }}>
                        {feature.icon}
                      </Box>
                      <Typography gutterBottom variant="h5" component="h3" fontWeight="700">
                        {feature.title}
                      </Typography>
                    </Box>
                    <Typography variant="body1" paragraph color="text.secondary" sx={{ mb: 3 }}>
                      {feature.description}
                    </Typography>
                    
                    <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mb: 2 }}>
                      {feature.highlights.map((highlight, i) => (
                        <Chip 
                          key={i} 
                          label={highlight} 
                          size="small" 
                          sx={{ 
                            mb: 1,
                            bgcolor: 'background.paper',
                            border: '1px solid',
                            borderColor: 'divider',
                          }} 
                        />
                      ))}
                    </Stack>
                  </CardContent>
                  <CardActions sx={{ p: 2, pt: 0 }}>
                    <Button
                      size="large"
                      fullWidth
                      endIcon={<ArrowForwardIcon />}
                      onClick={() => navigate(feature.path)}
                      variant="outlined"
                      sx={{
                        py: 1,
                        borderWidth: '1px',
                      }}
                    >
                      Explore {feature.title}
                    </Button>
                  </CardActions>
                </Card>
              </Grow>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Testimonials Section */}
      <Box sx={{ bgcolor: 'background.paper', py: 8, mb: 8 }}>
        <Container maxWidth="md">
          <Typography 
            variant="h3" 
            component="h2" 
            gutterBottom 
            align="center" 
            fontWeight="700"
            sx={{ mb: 6 }}
          >
            What Our Users Say
          </Typography>
          
          <Box sx={{ position: 'relative', minHeight: '200px' }}>
            {testimonials.map((testimonial, index) => (
              <Fade 
                key={index} 
                in={activeStep === index} 
                timeout={800}
                style={{ 
                  display: activeStep === index ? 'block' : 'none',
                  position: 'absolute',
                  width: '100%',
                }}
              >
                <Paper 
                  elevation={0} 
                  sx={{ 
                    p: 4, 
                    textAlign: 'center',
                    borderLeft: '4px solid',
                    borderColor: 'primary.main',
                    bgcolor: 'background.default'
                  }}
                >
                  <Typography 
                    variant="h5" 
                    component="blockquote" 
                    sx={{ 
                      mb: 3, 
                      fontStyle: 'italic',
                      '&:before': { content: '"\\201C"', mr: 1, opacity: 0.7 },
                      '&:after': { content: '"\\201D"', ml: 1, opacity: 0.7 },
                    }}
                  >
                    {testimonial.quote}
                  </Typography>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
                      {testimonial.avatar}
                    </Avatar>
                    <Box>
                      <Typography variant="subtitle1" fontWeight="bold">
                        {testimonial.author}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {testimonial.role}
                      </Typography>
                    </Box>
                  </Box>
                </Paper>
              </Fade>
            ))}
          </Box>
          
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
            {testimonials.map((_, index) => (
              <Box
                key={index}
                sx={{
                  width: 12,
                  height: 12,
                  mx: 1,
                  borderRadius: '50%',
                  bgcolor: activeStep === index ? 'primary.main' : 'grey.500',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                }}
                onClick={() => setActiveStep(index)}
              />
            ))}
          </Box>
        </Container>
      </Box>

      {/* How It Works Section */}
      <Container maxWidth="lg" sx={{ mb: 10 }}>
        <Typography 
          variant="h3" 
          component="h2" 
          gutterBottom 
          align="center" 
          fontWeight="700"
          sx={{ mb: 6 }}
        >
          How It Works
        </Typography>
        
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={6}>
            <Fade in={true} timeout={1000}>
              <Box>
                <Box sx={{ position: 'relative' }}>
                  <Paper 
                    sx={{ 
                      p: 3, 
                      mb: 2, 
                      borderLeft: '4px solid', 
                      borderColor: 'primary.main',
                      transition: 'transform 0.3s',
                      '&:hover': {
                        transform: 'translateX(5px)',
                      }
                    }}
                  >
                    <Typography variant="h6" gutterBottom fontWeight="bold">
                      <Box component="span" sx={{ 
                        color: 'white', 
                        bgcolor: 'primary.main',
                        px: 1.5,
                        py: 0.5,
                        borderRadius: 0,
                        mr: 2,
                      }}>1</Box>
                      Connect Your Wallet
                    </Typography>
                    <Typography variant="body1">
                      Sign in with any web3 wallet or create a new embedded wallet instantly. No complex setup required.
                    </Typography>
                  </Paper>
                  
                  <Paper 
                    sx={{ 
                      p: 3, 
                      mb: 2, 
                      borderLeft: '4px solid', 
                      borderColor: 'secondary.main',
                      transition: 'transform 0.3s',
                      '&:hover': {
                        transform: 'translateX(5px)',
                      }
                    }}
                  >
                    <Typography variant="h6" gutterBottom fontWeight="bold">
                      <Box component="span" sx={{ 
                        color: 'white', 
                        bgcolor: 'secondary.main',
                        px: 1.5,
                        py: 0.5,
                        borderRadius: 0,
                        mr: 2,
                      }}>2</Box>
                      Explore Features
                    </Typography>
                    <Typography variant="body1">
                      Browse Mystery Boxes, create Time-Locked Vaults, or analyze wallet activity with intuitive interfaces.
                    </Typography>
                  </Paper>
                  
                  <Paper 
                    sx={{ 
                      p: 3, 
                      borderLeft: '4px solid', 
                      borderColor: 'primary.light',
                      transition: 'transform 0.3s',
                      '&:hover': {
                        transform: 'translateX(5px)',
                      }
                    }}
                  >
                    <Typography variant="h6" gutterBottom fontWeight="bold">
                      <Box component="span" sx={{ 
                        color: 'white', 
                        bgcolor: 'primary.light',
                        px: 1.5,
                        py: 0.5,
                        borderRadius: 0,
                        mr: 2,
                      }}>3</Box>
                      Start Building Your Portfolio
                    </Typography>
                    <Typography variant="body1">
                      Bid on NFTs, create vaults with memories, and optimize your strategy based on analytics.
                    </Typography>
                  </Paper>
                </Box>
              </Box>
            </Fade>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Fade in={true} timeout={1500}>
              <Paper sx={{ 
                p: { xs: 3, md: 4 }, 
                bgcolor: 'background.paper',
                boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
              }}>
                <Typography variant="h5" gutterBottom fontWeight="bold" sx={{ mb: 3 }}>
                  Why Choose NadVault?
                </Typography>
                
                <Grid container spacing={3}>
                  {[
                    { icon: <SecurityIcon color="primary" fontSize="large" />, title: "Secure Storage", description: "Enterprise-grade security for your digital assets" },
                    { icon: <SpeedIcon color="primary" fontSize="large" />, title: "Lightning Fast", description: "Built on Monad for instant transactions" },
                    { icon: <GroupIcon color="primary" fontSize="large" />, title: "Community Driven", description: "Join a thriving ecosystem of digital collectors" },
                    { icon: <TrendingUpIcon color="primary" fontSize="large" />, title: "Generate Yield", description: "Earn passive income while your assets are locked" },
                  ].map((item, index) => (
                    <Grid item xs={6} key={index}>
                      <Box sx={{ textAlign: 'center' }}>
                        {item.icon}
                        <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                          {item.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {item.description}
                        </Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
                
                <Box sx={{ mt: 4, textAlign: 'center' }}>
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    onClick={authenticated ? () => navigate('/profile') : connectWallet}
                    sx={{ px: 4, py: 1.5 }}
                  >
                    {authenticated ? 'View Dashboard' : 'Get Started Now'}
                  </Button>
                </Box>
              </Paper>
            </Fade>
          </Grid>
        </Grid>
      </Container>

      {/* Final CTA Section */}
      <Box sx={{ 
        bgcolor: 'background.paper', 
        py: 10,
        background: 'linear-gradient(135deg, #1e0338 0%, #570e97 100%)',
        color: 'white',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h3" gutterBottom fontWeight="bold">
              Ready to Transform Your Digital Experience?
            </Typography>
            <Typography variant="h6" paragraph sx={{ opacity: 0.9, mb: 4 }}>
              Join thousands of users already exploring the future of digital assets with NadVault.
            </Typography>
            
            <Button
              variant="contained"
              color="secondary"
              size="large"
              onClick={authenticated ? () => navigate('/profile') : connectWallet}
              sx={{ 
                px: 6, 
                py: 2,
                fontSize: '1.2rem',
                boxShadow: '0 4px 20px rgba(0,176,255,0.4)',
              }}
            >
              {authenticated ? 'Go to Dashboard' : 'Start Your Journey'}
            </Button>
          </Box>
        </Container>
        
        {/* Background decorative elements */}
        <Box sx={{
          position: 'absolute',
          top: '20%',
          left: '5%',
          width: '300px',
          height: '300px',
          background: 'radial-gradient(circle, rgba(106,27,154,0.8) 0%, rgba(106,27,154,0) 70%)',
          borderRadius: '50%',
          opacity: 0.6,
          zIndex: 0,
        }} />
        
        <Box sx={{
          position: 'absolute',
          bottom: '10%',
          right: '5%',
          width: '250px',
          height: '250px',
          background: 'radial-gradient(circle, rgba(0,176,255,0.8) 0%, rgba(0,176,255,0) 70%)',
          borderRadius: '50%',
          opacity: 0.6,
          zIndex: 0,
        }} />
      </Box>
    </Box>
  );
}

export default Home; 