const NodeCache = require("node-cache");
const ttlSeconds = parseInt(process.env.CACHE_TTL) || 300;
const cache = new NodeCache({ stdTTL: ttlSeconds });
module.exports = cache;
