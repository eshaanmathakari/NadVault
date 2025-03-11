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
import React, { useState } from 'react';
import axios from 'axios';
import { ethers } from 'ethers';
import config from './config';

function App() {
  const [wallet, setWallet] = useState('');
  const [score, setScore] = useState(null);
  const [lockCount, setLockCount] = useState(null);
  const [error, setError] = useState('');

  // Function to get score from backend
  const getScore = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/score?wallet=${wallet}`);
      setScore(res.data.score);
    } catch (err) {
      console.error("Error fetching score:", err);
      setError("Error fetching score. Please try again later.");
    }
  };

  // Function to interact with NadVault contract using ethers.js
  const fetchContractData = async () => {
    if (!window.ethereum) {
      setError("MetaMask is not installed.");
      return;
    }
    try {
      // Request account access if needed
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const nadVaultContract = new ethers.Contract(
        config.NADVAULT_ADDRESS,
        config.NADVAULT_ABI,
        provider
      );

      // Fetch the total number of locks from the contract
      const count = await nadVaultContract.lockCount();
      setLockCount(count.toString());
    } catch (err) {
      console.error("Error interacting with contract:", err);
      setError("Error fetching contract data.");
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>NadVault Dashboard</h1>
      <div>
        <input 
          type="text"
          placeholder="Enter your wallet address" 
          value={wallet} 
          onChange={(e) => setWallet(e.target.value)}
          style={{ width: "300px", padding: "8px", marginRight: "10px" }}
        />
        <button onClick={getScore} style={{ padding: "8px 12px" }}>Get Score</button>
      </div>
      {score !== null && <p>Your score: <strong>{score}</strong></p>}
      <div style={{ marginTop: "20px" }}>
        <button onClick={fetchContractData} style={{ padding: "8px 12px" }}>
          Fetch NadVault Contract Data
        </button>
        {lockCount !== null && <p>Total locks in NadVault: <strong>{lockCount}</strong></p>}
      </div>
      {error && <p style={{color:'red'}}>{error}</p>}
    </div>
  );
}

export default App;
