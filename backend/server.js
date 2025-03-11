const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const NodeCache = require("node-cache");
const cors = require('cors');

const app = express();
app.use(cors());
const port = 3000;
const cache = new NodeCache({ stdTTL: 3600 }); // Cache entries for 1 hour

// Dummy scraping function for Monad testnet explorer.
// Adjust selectors based on the actual HTML structure of the target page.
async function scrapeUserActivity(walletAddress) {
    const url = `https://monad-testnet.socialscan.io/address/${walletAddress}`;
    try {
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);
        // Example: Extract number of transactions and contract interactions.
        // You will need to inspect the page and update selectors accordingly.
        let transactions = parseInt($('#transaction-count').text()) || 0;
        let contractInteractions = parseInt($('#contract-interactions').text()) || 0;
        return { transactions, contractInteractions };
    } catch (error) {
        console.error("Error scraping user activity:", error);
        return { transactions: 0, contractInteractions: 0 };
    }
}

// Rule-based scoring function: weight transactions more heavily than contract interactions.
function calculateScore(activity) {
    const transactionWeight = 2;
    const contractWeight = 1;
    return (activity.transactions * transactionWeight) + (activity.contractInteractions * contractWeight);
}

// Endpoint to get a user’s score based on wallet address.
app.get('/score', async (req, res) => {
    const wallet = req.query.wallet;
    if (!wallet) {
        return res.status(400).json({ error: "Wallet address is required" });
    }
    
    // Check if score is cached.
    let cachedScore = cache.get(wallet);
    if (cachedScore !== undefined) {
        return res.json({ wallet, score: cachedScore });
    }
    
    const activity = await scrapeUserActivity(wallet);
    const score = calculateScore(activity);
    cache.set(wallet, score);
    res.json({ wallet, score });
});

// Endpoint to serve a dummy leaderboard.
app.get('/leaderboard', (req, res) => {
    // This is static/dummy data; in a real app, leaderboard scores should be computed from on-chain data.
    const leaderboard = [
        { wallet: "0xABC123...", score: 150 },
        { wallet: "0xDEF456...", score: 120 },
        { wallet: "0x789XYZ...", score: 100 }
    ];
    res.json(leaderboard);
});

app.listen(port, () => {
    console.log(`Backend running at http://localhost:${port}`);
});
