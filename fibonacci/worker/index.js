import dotenv from "dotenv";
dotenv.config();
import redis from "redis";

const redisClient = await redis
  .createClient({
    // host: process.env.REDIS_SERVER_HOST,
    // port: process.env.REDIS_SERVER_PORT,
    url: `redis://${process.env.REDIS_SERVER_HOST}:${process.env.REDIS_SERVER_PORT}`,
    retry_strategy: () => 1000, // If redisClient loses connection to redis server, then retry every n milli seconds.
  })
  .on("error", (err) => console.log(`Redis client error: ${err}`))
  .connect();

const redisSubClient = await redisClient
  .duplicate()
  .on("error", (err) => console.log(`Redis subscribe client error: ${err}`))
  .connect();

// intentionally used recursive approach to mimic slow worker process.
function fib(index) {
  if (index < 2) return 1;
  return fib(index - 1) + fib(index - 2);
}

const listener = async (message, channel) => {
  let fib_index = parseInt(message);
  let fib_value = fib(fib_index);
  await redisClient.hSet("fib_mappings", fib_index, fib_value);
};

redisSubClient.subscribe("fib_channel", listener);
