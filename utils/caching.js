const redis = require("redis");
const cachingClient = redis.createClient({ host: "127.0.0.1", port: 6379 });

cachingClient.on("error", (err) => {
  console.error("Redis error:", err);
});
cachingClient.on("connect", () => {
  console.log("Connected successfully to Redis server");
});
cachingClient.connect().catch(console.error);

const getCache = async (req, res, next) => {
  const cacheKey = req.originalUrl;
  try {
    const data = await cachingClient.get(cacheKey);

    if (data) {
      return res.status(200).json(JSON.parse(data));
    } else {
      next();
    }
  } catch (err) {
    console.error("Redis error:", err);
    return res.status(500).send("Server error");
  }
};

module.exports = { cachingClient, getCache };
