import React, { useState } from "react";
import axios from "axios";

const WalletActivity = () => {
  const [wallet, setWallet] = useState("");
  const [activity, setActivity] = useState([]);

  const fetchActivity = async () => {
    try {
      const res = await axios.get(`http://localhost:3001/api/scan/${wallet}`);
      setActivity(res.data.history);
    } catch (error) {
      console.error("Error fetching wallet activity:", error);
    }
  };

  return (
    <div>
      <h2>Wallet Activity</h2>
      <input
        type="text"
        placeholder="Enter wallet address"
        value={wallet}
        onChange={(e) => setWallet(e.target.value)}
      />
      <button onClick={fetchActivity}>Fetch Activity</button>
      <ul>
        {activity.map((tx, idx) => (
          <li key={idx}>
            <p><strong>Hash:</strong> {tx.hash}</p>
            <p><strong>From:</strong> {tx.from}</p>
            <p><strong>To:</strong> {tx.to}</p>
            <p><strong>Value:</strong> {tx.value.toString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WalletActivity;
