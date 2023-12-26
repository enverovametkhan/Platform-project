const redis = require("redis");

let redisClient;

(async () => {
  redisClient = redis.createClient({
    url: "redis://default:I2cVxjQXj4v07UAWPjQcfVrJND4lfDKh@redis-13093.c302.asia-northeast1-1.gce.cloud.redislabs.com:13093",
  });

  redisClient.on("error", (error) => console.error(`Error : ${error}`));

  await redisClient.connect();
})();

module.exports = { redisClient };
