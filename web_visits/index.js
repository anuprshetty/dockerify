import dotenv from "dotenv";
dotenv.config();
import express from "express";
import redis from "redis";

const app = express();

const redis_client = await redis
  .createClient({
    // host: process.env.REDIS_SERVER_HOST,
    // port: process.env.REDIS_SERVER_PORT,
    url: `redis://${process.env.REDIS_SERVER_HOST}:${process.env.REDIS_SERVER_PORT}`,
  })
  .on("error", (err) => console.log(`Redis Client Error: ${err}`))
  .connect();

await redis_client.set("visits", 0);

app.get("/", async (req, res) => {
  let visits = await redis_client.get("visits");
  let current_visits = parseInt(visits) + 1;
  await redis_client.set("visits", current_visits);
  res.send(`Website visits: ${current_visits} times`);
});

app.listen(process.env.APP_PORT, "0.0.0.0", () => {
  console.log(`Listening on port ${process.env.APP_PORT}`);
});
