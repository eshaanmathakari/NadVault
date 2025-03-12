// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
// frontend/src/App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline, Box } from '@mui/material';
import { useWeb3 } from './utils/Web3Context';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import MysteryBox from './pages/MysteryBox';
import Vault from './pages/Vault';
import WalletAnalyzer from './pages/WalletAnalyzer';
import Profile from './pages/Profile';

function App() {
  // Create a dark theme
  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#6a1b9a', // Purple
      },
      secondary: {
        main: '#00b0ff', // Light Blue
      },
      background: {
        default: '#121212',
        paper: '#1e1e1e',
      },
    },
    typography: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      h1: {
        fontWeight: 500,
      },
      h2: {
        fontWeight: 500,
      },
      h3: {
        fontWeight: 500,
      },
      h4: {
        fontWeight: 500,
      },
      h5: {
        fontWeight: 500,
      },
      h6: {
        fontWeight: 500,
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: 12,
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
        }}
      >
        <Navbar />
        <Box sx={{ flexGrow: 1, py: 3 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/mystery-box" element={<MysteryBox />} />
            <Route path="/vault" element={<Vault />} />
            <Route path="/wallet-analyzer" element={<WalletAnalyzer />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </Box>
        <Footer />
      </Box>
    </ThemeProvider>
  );
}

export default App;
