const redis = require("redis");
const cachingClient = redis.createClient();

cachingClient.on("error", (err) => {
  console.error("Redis error:", err);
});
cachingClient.on("connect", () => {
  console.log("Connected to Redis");
});

const getCache = (req, res, next) => {
  const cacheKey = req.originalUrl;

  cachingClient.get(cacheKey, (err, data) => {
    if (err) {
      console.error("Redis error:", err);
      return res.status(500).send("Server error");
    }

    if (data) {
      return res.status(200).json(JSON.parse(data));
    } else {
      next();
    }
  });
};

module.exports = { cachingClient, getCache };
