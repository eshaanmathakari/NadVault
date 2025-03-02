import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import provider from "../web3";

// Replace with your deployed MysteryBoxLaunchpad contract address
const CONTRACT_ADDRESS = "0xYourMysteryBoxContractAddress";

// Simplified ABI for our auction contract
const ABI = [
  "function boxCount() view returns (uint256)",
  "function boxes(uint256) view returns (tuple(address creator, uint256 floorPrice, uint256 currentBid, address highestBidder, bool sold))",
  "function bid(uint256 boxId) payable",
];

const BoxAuction = () => {
  const [boxes, setBoxes] = useState([]);
  const [bidValue, setBidValue] = useState("");
  const [selectedBox, setSelectedBox] = useState(null);

  // Initialize contract instance
  const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, provider);

  useEffect(() => {
    async function fetchBoxes() {
      try {
        const count = await contract.boxCount();
        let boxList = [];
        for (let i = 0; i < count; i++) {
          const box = await contract.boxes(i);
          boxList.push({ id: i, ...box });
        }
        setBoxes(boxList);
      } catch (error) {
        console.error("Error fetching boxes:", error);
      }
    }
    fetchBoxes();
  }, [contract]);

  // Handle bidding via MetaMask
  const handleBid = async (boxId) => {
    if (!window.ethereum) return alert("MetaMask is required.");
    await window.ethereum.request({ method: "eth_requestAccounts" });
    const signer = provider.getSigner();
    const contractWithSigner = contract.connect(signer);
    try {
      const tx = await contractWithSigner.bid(boxId, {
        value: ethers.utils.parseEther(bidValue),
      });
      await tx.wait();
      alert("Bid successful!");
    } catch (error) {
      console.error("Bid failed:", error);
      alert("Bid failed: " + error.message);
    }
  };

  return (
    <div>
      <h2>Mystery Box Auctions</h2>
      {boxes.map((box) => (
        <div key={box.id} style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
          <p><strong>Box ID:</strong> {box.id}</p>
          <p><strong>Floor Price:</strong> {ethers.utils.formatEther(box.floorPrice)} Mon</p>
          <p><strong>Current Bid:</strong> {ethers.utils.formatEther(box.currentBid)} Mon</p>
          <button onClick={() => setSelectedBox(box.id)}>Place Bid</button>
          {selectedBox === box.id && (
            <div>
              <input
                type="text"
                placeholder="Bid amount in Mon"
                value={bidValue}
                onChange={(e) => setBidValue(e.target.value)}
              />
              <button onClick={() => handleBid(box.id)}>Submit Bid</button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default BoxAuction;
