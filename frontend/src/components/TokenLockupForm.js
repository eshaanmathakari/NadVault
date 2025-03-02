import React, { useState } from "react";
import { ethers } from "ethers";
import provider from "../web3";

// Replace with your deployed TokenLockup contract address and ABI
const CONTRACT_ADDRESS = "0xYourTokenLockupContractAddress";
const ABI = [
  "function deposit(uint256 amount, uint256 lockupPeriod, string calldata note) external"
];

const TokenLockupForm = () => {
  const [amount, setAmount] = useState("");
  const [lockupPeriod, setLockupPeriod] = useState("");
  const [note, setNote] = useState("");

  const handleDeposit = async () => {
    if (!window.ethereum) return alert("MetaMask is required.");
    await window.ethereum.request({ method: "eth_requestAccounts" });
    const signer = provider.getSigner();
    const contractWithSigner = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
    try {
      const tx = await contractWithSigner.deposit(
        ethers.utils.parseEther(amount),
        lockupPeriod,
        note
      );
      await tx.wait();
      alert("Deposit successful!");
    } catch (error) {
      console.error("Deposit failed:", error);
      alert("Deposit failed: " + error.message);
    }
  };

  return (
    <div>
      <h2>Token Lockup</h2>
      <input
        type="text"
        placeholder="Amount (Mon)"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <input
        type="number"
        placeholder="Lockup period (seconds)"
        value={lockupPeriod}
        onChange={(e) => setLockupPeriod(e.target.value)}
      />
      <input
        type="text"
        placeholder="Note or memory"
        value={note}
        onChange={(e) => setNote(e.target.value)}
      />
      <button onClick={handleDeposit}>Deposit Tokens</button>
    </div>
  );
};

export default TokenLockupForm;
