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
  // throw new Error("unhandled promise rejection occurred"); // for unhandled promise rejections (failures)

  let visits = await redis_client.get("visits");
  let current_visits = parseInt(visits) + 1;
  await redis_client.set("visits", current_visits);
  res.send(`Website visits: ${current_visits} times`);
});

const stopServer = async (event) => {
  console.log(`Stopping the server due to the event "${event}" ...`);

  await redis_client.flushAll();
  console.log("Cleaned up Redis data");

  redis_client.quit();
  console.log("Disconnected Redis client");

  console.log("Gracefully stopped the server");
  process.exit(0);
};

process.on("SIGINT", async () => {
  await stopServer("SIGINT");
}); // SIGINT --> User interrupt. Sent by pressing Ctrl+C in the terminal. Used to request the interruption or termination of a process.
process.on("SIGTERM", async () => {
  await stopServer("SIGTERM");
}); // SIGTERM --> Terminate. A general-purpose signal used to request a graceful termination of a process.

// if any unhandled promise rejections (failures), then ...
process.on("unhandledRejection", async (reason, promise) => {
  console.error(
    `Unhandled promise rejection at: ${promise}\nReason: ${reason}`
  );
  await stopServer("UnhandledPromiseRejection");
});

app.listen(process.env.APP_PORT, "0.0.0.0", () => {
  console.log(`Listening on port ${process.env.APP_PORT}`);
});
