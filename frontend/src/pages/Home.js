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
    <Box sx={{ mt: 0, pb: 0 }}>
      {/* Hero Section - Full-width gradient background with animated elements */}
      <Box
        sx={{
          position: 'relative',
          color: 'white',
          mb: 4,
          overflow: 'hidden',
          background: 'linear-gradient(135deg, #1e0338 0%, #570e97 50%, #1e0338 100%)',
          boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
        }}
      >
        {/* Hero Background Image */}
        <Box
          component="img"
          src="/nadvault_hero.png" 
          alt="NadVault Platform"
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: 0,
          }}
          onError={(e) => {
            // Fallback image if the custom image doesn't exist
            e.target.src = 'https://source.unsplash.com/random?blockchain,technology,future';
          }}
        />
        
        {/* Dark gradient overlay */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'linear-gradient(135deg, rgba(106,27,154,0.92) 0%, rgba(0,176,255,0.85) 100%)',
            mixBlendMode: 'multiply',
            zIndex: 1,
            willChange: 'transform',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: `radial-gradient(circle at 30% 40%, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 20%),
                               radial-gradient(circle at 70% 60%, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 20%)`,
              animation: 'floatingLights 20s cubic-bezier(0.445, 0.05, 0.55, 0.95) infinite',
              willChange: 'transform',
            },
            '&::after': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z\' fill=\'%23ffffff\' fill-opacity=\'0.03\' fill-rule=\'evenodd\'/%3E%3C/svg%3E")',
              opacity: 0.5,
              animation: 'patternFloat 60s linear infinite',
              willChange: 'background-position',
            },
            '@keyframes floatingLights': {
              '0%': {
                transform: 'translateX(0) translateY(0)',
              },
              '25%': {
                transform: 'translateX(3%) translateY(-3%)',
              },
              '50%': {
                transform: 'translateX(5%) translateY(-5%)',
              },
              '75%': {
                transform: 'translateX(2%) translateY(-2%)',
              },
              '100%': {
                transform: 'translateX(0) translateY(0)',
              }
            },
            '@keyframes patternFloat': {
              '0%': {
                backgroundPosition: '0% 0%',
              },
              '25%': {
                backgroundPosition: '25% 25%',
              },
              '50%': {
                backgroundPosition: '50% 50%',
              },
              '75%': {
                backgroundPosition: '75% 75%',
              },
              '100%': {
                backgroundPosition: '100% 100%',
              }
            }
          }}
        />
        
        {/* Add a semi-transparent black layer for additional darkness */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0,0,0,0.2)',
            zIndex: 1,
            mixBlendMode: 'multiply',
          }}
        />
        
        {/* Animated shapes */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 1,
            overflow: 'hidden',
            mixBlendMode: 'soft-light',
          }}
        >
          {/* Floating circles */}
          {[...Array(5)].map((_, i) => (
            <Box
              key={i}
              sx={{
                position: 'absolute',
                width: `${(i % 3 + 1) * 60 + 40}px`,
                height: `${(i % 3 + 1) * 60 + 40}px`,
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(0,176,255,0.3) 0%, rgba(0,176,255,0) 70%)',
                top: `${i * 15 + 10}%`,
                left: `${i * 20}%`,
                animation: `float${i} ${20 + i * 4}s cubic-bezier(0.445, 0.05, 0.55, 0.95) infinite`,
                willChange: 'transform',
                '@keyframes float0': {
                  '0%': { transform: 'translate(0, 0)' },
                  '25%': { transform: 'translate(30px, 15px)' },
                  '50%': { transform: 'translate(80px, 40px)' },
                  '75%': { transform: 'translate(30px, 15px)' },
                  '100%': { transform: 'translate(0, 0)' }
                },
                '@keyframes float1': {
                  '0%': { transform: 'translate(0, 0)' },
                  '25%': { transform: 'translate(-15px, 30px)' },
                  '50%': { transform: 'translate(-40px, 80px)' },
                  '75%': { transform: 'translate(-15px, 30px)' },
                  '100%': { transform: 'translate(0, 0)' }
                },
                '@keyframes float2': {
                  '0%': { transform: 'translate(0, 0)' },
                  '25%': { transform: 'translate(20px, -20px)' },
                  '50%': { transform: 'translate(50px, -50px)' },
                  '75%': { transform: 'translate(20px, -20px)' },
                  '100%': { transform: 'translate(0, 0)' }
                },
                '@keyframes float3': {
                  '0%': { transform: 'translate(0, 0)' },
                  '25%': { transform: 'translate(-30px, -15px)' },
                  '50%': { transform: 'translate(-80px, -40px)' },
                  '75%': { transform: 'translate(-30px, -15px)' },
                  '100%': { transform: 'translate(0, 0)' }
                },
                '@keyframes float4': {
                  '0%': { transform: 'translate(0, 0)' },
                  '25%': { transform: 'translate(15px, 40px)' },
                  '50%': { transform: 'translate(40px, 100px)' },
                  '75%': { transform: 'translate(15px, 40px)' },
                  '100%': { transform: 'translate(0, 0)' }
                },
              }}
            />
          ))}
        </Box>
        
        {/* Crypto Math Animations */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 1,
            overflow: 'hidden',
            mixBlendMode: 'screen',
            opacity: 0.6,
          }}
        >
          {/* Binary rain effect */}
          {[...Array(15)].map((_, i) => (
            <Box
              key={`binary-${i}`}
              sx={{
                position: 'absolute',
                color: 'rgba(0,176,255,0.6)',
                fontSize: `${(i % 3 + 1) * 10 + 4}px`,
                fontFamily: 'monospace',
                fontWeight: 'bold',
                whiteSpace: 'nowrap',
                top: `${i * 7}%`,
                left: `${i * 7}%`,
                transform: 'rotate(5deg)',
                animation: `binary${i} ${25 + i * 3}s linear infinite`,
                willChange: 'transform, opacity',
                textShadow: '0 0 8px rgba(0,176,255,0.8)',
                '@keyframes binary0': {
                  '0%': { transform: 'translateY(0) rotate(0deg)', opacity: 0 },
                  '5%': { opacity: 0.8 },
                  '95%': { opacity: 0.8 },
                  '100%': { transform: 'translateY(500px) rotate(15deg)', opacity: 0 }
                }
              }}
            >
              {i % 3 === 0 ? '10101' : i % 3 === 1 ? '01001' : '11010'}
              {i % 2 === 0 ? '01010' : '10101'}
            </Box>
          ))}
          
          {/* Crypto Equations */}
          {[
            "y = (Keccak-256(m))",
            "P = sG mod p",
            "E: y² = x³ + ax + b",
            "H(k || m)",
            "∫ v²/2g dt",
            "R = r·G",
            "∑ tx.outputs - ∑ tx.inputs",
            "0x3d5a...",
            "Diffie-Hellman: g^a mod p",
            "S = (z + re) / k mod n",
            "Merkle(TX₁, TX₂, ...)",
            "∀ inputs: verify(σ,m,pk)",
            "Y = X³ + 7 mod p",
            "hash(prev) + nonce"
          ].map((equation, i) => (
            <Box
              key={`eq-${i}`}
              sx={{
                position: 'absolute',
                color: 'rgba(106,27,154,0.7)',
                fontSize: `${12 + (i % 4) * 2}px`,
                fontFamily: 'monospace',
                fontWeight: 'bold',
                top: `${(i * 17) % 100}%`,
                left: `${(i * 23) % 100}%`,
                animation: `equation${i % 7} ${15 + i * 2}s cubic-bezier(0.445, 0.05, 0.55, 0.95) infinite`,
                willChange: 'transform, opacity',
                textShadow: '0 0 5px rgba(0,176,255,0.5)',
                opacity: 0.9,
                '@keyframes equation0': {
                  '0%': { transform: 'translate(0, 0) rotate(0deg) scale(1)', opacity: 0 },
                  '10%': { opacity: 0.9 },
                  '50%': { transform: 'translate(100px, -50px) rotate(5deg) scale(1.2)' },
                  '90%': { opacity: 0.9 },
                  '100%': { transform: 'translate(0, 0) rotate(0deg) scale(1)', opacity: 0 }
                },
                '@keyframes equation1': {
                  '0%': { transform: 'translate(0, 0) rotate(0deg) scale(1)', opacity: 0 },
                  '10%': { opacity: 0.9 },
                  '50%': { transform: 'translate(-120px, 70px) rotate(-8deg) scale(1.4)' },
                  '90%': { opacity: 0.9 },
                  '100%': { transform: 'translate(0, 0) rotate(0deg) scale(1)', opacity: 0 }
                },
                '@keyframes equation2': {
                  '0%': { transform: 'translate(0, 0) rotate(0deg) scale(1)', opacity: 0 },
                  '10%': { opacity: 0.9 },
                  '50%': { transform: 'translate(80px, 120px) rotate(10deg) scale(1.1)' },
                  '90%': { opacity: 0.9 },
                  '100%': { transform: 'translate(0, 0) rotate(0deg) scale(1)', opacity: 0 }
                },
                '@keyframes equation3': {
                  '0%': { transform: 'translate(0, 0) rotate(0deg) scale(1)', opacity: 0 },
                  '10%': { opacity: 0.9 },
                  '50%': { transform: 'translate(-90px, -80px) rotate(-5deg) scale(1.3)' },
                  '90%': { opacity: 0.9 },
                  '100%': { transform: 'translate(0, 0) rotate(0deg) scale(1)', opacity: 0 }
                },
                '@keyframes equation4': {
                  '0%': { transform: 'translate(0, 0) rotate(0deg) scale(1)', opacity: 0 },
                  '10%': { opacity: 0.9 },
                  '50%': { transform: 'translate(140px, 30px) rotate(15deg) scale(1.2)' },
                  '90%': { opacity: 0.9 },
                  '100%': { transform: 'translate(0, 0) rotate(0deg) scale(1)', opacity: 0 }
                },
                '@keyframes equation5': {
                  '0%': { transform: 'translate(0, 0) rotate(0deg) scale(1)', opacity: 0 },
                  '10%': { opacity: 0.9 },
                  '50%': { transform: 'translate(-60px, 100px) rotate(-12deg) scale(1.5)' },
                  '90%': { opacity: 0.9 },
                  '100%': { transform: 'translate(0, 0) rotate(0deg) scale(1)', opacity: 0 }
                },
                '@keyframes equation6': {
                  '0%': { transform: 'translate(0, 0) rotate(0deg) scale(1)', opacity: 0 },
                  '10%': { opacity: 0.9 },
                  '50%': { transform: 'translate(110px, -90px) rotate(8deg) scale(1.3)' },
                  '90%': { opacity: 0.9 },
                  '100%': { transform: 'translate(0, 0) rotate(0deg) scale(1)', opacity: 0 }
                }
              }}
            >
              {equation}
            </Box>
          ))}
          
          {/* Blockchain Grid */}
          <Box
            sx={{
              position: 'absolute',
              top: '10%',
              left: '15%',
              width: '70%',
              height: '80%',
              opacity: 0.2,
              background: `
                linear-gradient(0deg, transparent 24%, rgba(0,176,255,0.3) 25%, rgba(0,176,255,0.3) 26%, transparent 27%, transparent 74%, rgba(0,176,255,0.3) 75%, rgba(0,176,255,0.3) 76%, transparent 77%, transparent),
                linear-gradient(90deg, transparent 24%, rgba(0,176,255,0.3) 25%, rgba(0,176,255,0.3) 26%, transparent 27%, transparent 74%, rgba(0,176,255,0.3) 75%, rgba(0,176,255,0.3) 76%, transparent 77%, transparent)
              `,
              backgroundSize: '50px 50px',
              animation: 'gridMove 60s linear infinite',
              willChange: 'transform',
              '@keyframes gridMove': {
                '0%': { transform: 'perspective(500px) rotateX(10deg) rotateY(0deg) translateZ(0)' },
                '50%': { transform: 'perspective(500px) rotateX(10deg) rotateY(180deg) translateZ(50px)' },
                '100%': { transform: 'perspective(500px) rotateX(10deg) rotateY(360deg) translateZ(0)' },
              }
            }}
          />
          
          {/* Crypto Symbols */}
          {[
            "₿", "Ξ", "⟠", "Ł", "Ð", "₳", "₮", "◎"
          ].map((symbol, i) => (
            <Box
              key={`symbol-${i}`}
              sx={{
                position: 'absolute',
                color: 'rgba(0,176,255,0.7)',
                fontSize: `${30 + (i % 3) * 10}px`,
                fontWeight: 'bold',
                top: `${(i * 13 + 5) % 90}%`,
                left: `${(i * 17 + 7) % 90}%`,
                animation: `symbol${i % 4} ${20 + i * 5}s cubic-bezier(0.19, 1, 0.22, 1) infinite`,
                willChange: 'transform, opacity',
                textShadow: '0 0 10px rgba(255,255,255,0.5)',
                opacity: 0.8,
                '@keyframes symbol0': {
                  '0%': { transform: 'translate(0, 0) rotate(0deg) scale(1)', opacity: 0 },
                  '20%': { opacity: 0.8 },
                  '50%': { transform: 'translate(100px, 50px) rotate(180deg) scale(1.5)' },
                  '80%': { opacity: 0.8 },
                  '100%': { transform: 'translate(0, 0) rotate(360deg) scale(1)', opacity: 0 }
                },
                '@keyframes symbol1': {
                  '0%': { transform: 'translate(0, 0) rotate(0deg) scale(1)', opacity: 0 },
                  '20%': { opacity: 0.8 },
                  '50%': { transform: 'translate(-80px, -120px) rotate(-180deg) scale(1.2)' },
                  '80%': { opacity: 0.8 },
                  '100%': { transform: 'translate(0, 0) rotate(-360deg) scale(1)', opacity: 0 }
                },
                '@keyframes symbol2': {
                  '0%': { transform: 'translate(0, 0) rotate(0deg) scale(1)', opacity: 0 },
                  '20%': { opacity: 0.8 },
                  '50%': { transform: 'translate(150px, -70px) rotate(90deg) scale(1.3)' },
                  '80%': { opacity: 0.8 },
                  '100%': { transform: 'translate(0, 0) rotate(180deg) scale(1)', opacity: 0 }
                },
                '@keyframes symbol3': {
                  '0%': { transform: 'translate(0, 0) rotate(0deg) scale(1)', opacity: 0 },
                  '20%': { opacity: 0.8 },
                  '50%': { transform: 'translate(-120px, 90px) rotate(-90deg) scale(1.4)' },
                  '80%': { opacity: 0.8 },
                  '100%': { transform: 'translate(0, 0) rotate(-180deg) scale(1)', opacity: 0 }
                }
              }}
            >
              {symbol}
            </Box>
          ))}
          
          {/* Connection lines animation */}
          <svg 
            width="100%" 
            height="100%" 
            viewBox="0 0 100 100" 
            preserveAspectRatio="none"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              opacity: 0.2,
            }}
          >
            <defs>
              <linearGradient id="connectGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(0,176,255,0.8)" />
                <stop offset="100%" stopColor="rgba(0,176,255,0.4)" />
              </linearGradient>
            </defs>
            <g style={{ 
                animation: 'lineConnect 30s linear infinite',
                transformOrigin: 'center',
              }}
            >
              <line x1="20" y1="20" x2="80" y2="30" stroke="url(#connectGradient)" strokeWidth="0.3" />
              <line x1="15" y1="60" x2="65" y2="70" stroke="url(#connectGradient)" strokeWidth="0.3" />
              <line x1="40" y1="10" x2="85" y2="50" stroke="url(#connectGradient)" strokeWidth="0.3" />
              <line x1="10" y1="30" x2="45" y2="90" stroke="url(#connectGradient)" strokeWidth="0.3" />
              <line x1="70" y1="15" x2="25" y2="85" stroke="url(#connectGradient)" strokeWidth="0.3" />
              <line x1="90" y1="40" x2="30" y2="75" stroke="url(#connectGradient)" strokeWidth="0.3" />
              <line x1="60" y1="5" x2="35" y2="95" stroke="url(#connectGradient)" strokeWidth="0.3" />
              <line x1="5" y1="45" x2="95" y2="65" stroke="url(#connectGradient)" strokeWidth="0.3" />
            </g>
            <style jsx>{`
              @keyframes lineConnect {
                0% { transform: rotate(0deg) scale(1); }
                50% { transform: rotate(180deg) scale(1.1); }
                100% { transform: rotate(360deg) scale(1); }
              }
            `}</style>
          </svg>
        </Box>

        {/* Wave effect */}
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '200%',
            height: '300px',
            background: 'linear-gradient(to top, rgba(0,176,255,0.1), rgba(0,176,255,0))',
            transformOrigin: 'center bottom',
            animation: 'wave 30s cubic-bezier(0.445, 0.05, 0.55, 0.95) infinite',
            willChange: 'transform',
            '@keyframes wave': {
              '0%': {
                transform: 'translateX(0) scale(1, 0.2)',
              },
              '25%': {
                transform: 'translateX(-10%) scale(1, 0.25)',
              },
              '50%': {
                transform: 'translateX(-25%) scale(1, 0.3)',
              },
              '75%': {
                transform: 'translateX(-10%) scale(1, 0.25)',
              },
              '100%': {
                transform: 'translateX(0) scale(1, 0.2)',
              }
            },
            zIndex: 1,
            mixBlendMode: 'soft-light',
          }}
        />

        {/* Animated background patterns */}
        <Box sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.1,
          background: `url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.4"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')`,
          zIndex: 1,
        }} />

        {/* Hero Content */}
        <Container maxWidth="lg" sx={{ position: 'relative', py: 8, zIndex: 2 }}>
          <Grid container spacing={4} alignItems="center" justifyContent="center">
            <Grid item xs={12} md={8} lg={6}>
              <Slide direction="right" in={true} timeout={1000}>
                <Box>
                  <Typography 
                    component="h1" 
                    variant="h2" 
                    fontWeight="700" 
                    color="white" 
                    gutterBottom
                    sx={{ textShadow: '0 4px 12px rgba(0,0,0,0.5), 0 1px 3px rgba(0,0,0,0.8)' }}
                  >
                    Vault Digital Assets for the Future.
                  </Typography>
                  <Typography 
                    variant="h5" 
                    color="white" 
                    sx={{ 
                      mb: 4, 
                      opacity: 0.9,
                      textShadow: '0 2px 8px rgba(0,0,0,0.4), 0 1px 3px rgba(0,0,0,0.7)',
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
                          boxShadow: '0 4px 14px rgba(0,176,255,0.5), 0 2px 6px rgba(0,0,0,0.3)',
                          textShadow: '0 1px 2px rgba(0,0,0,0.3)',
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
                        sx={{ 
                          px: 4, 
                          py: 1.5,
                          boxShadow: '0 4px 14px rgba(0,176,255,0.5), 0 2px 6px rgba(0,0,0,0.3)',
                          textShadow: '0 1px 2px rgba(0,0,0,0.3)',
                        }}
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
                        py: 1.5,
                        textShadow: '0 1px 3px rgba(0,0,0,0.5)',
                      }}
                      onClick={scrollToFeatures}
                    >
                      Explore Features
                    </Button>
                  </Stack>
                </Box>
              </Slide>
            </Grid>
          </Grid>
        </Container>
        
        {/* Monad Testnet badge */}
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            p: 2,
            background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
            zIndex: 2,
            textAlign: 'center',
          }}
        >
          {/* <Chip 
            label="Built on Monad Testnet" 
            color="primary" 
            size="small" 
            sx={{ 
              mb: 1,
              textShadow: '0 1px 2px rgba(0,0,0,0.5)',
              '& .MuiChip-label': {
                textShadow: '0 1px 2px rgba(0,0,0,0.5)',
              }
            }}
          /> */}
        </Box>
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
      <Container maxWidth="lg" sx={{ mb: 6 }}>
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
        py: 8,
        background: 'linear-gradient(135deg, #1e0338 0%, #570e97 100%)',
        color: 'white',
        position: 'relative',
        overflow: 'hidden',
        mb: 0,
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