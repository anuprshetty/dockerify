import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import pg from "pg";
import redis from "redis";

const app = express();
app.use(cors());
app.use(bodyParser.json());

const pgPool = new pg.Pool({
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
});
const table_name = "fib_indeces";

const pgClient = await pgPool.connect();
pgClient
  .query(`CREATE TABLE IF NOT EXISTS ${table_name} (number INT UNIQUE)`)
  .then((queryResult) => {})
  .catch((reason) =>
    console.error(`Error while creating '${table_name}' table: ${reason}`)
  )
  .finally(() => {
    pgClient.release();
  });

const redisClient = await redis
  .createClient({
    // host: process.env.REDIS_SERVER_HOST,
    // port: process.env.REDIS_SERVER_PORT,
    url: `redis://${process.env.REDIS_SERVER_HOST}:${process.env.REDIS_SERVER_PORT}`,
    retry_strategy: () => 1000, // If redisClient loses connection to redis server, then retry every n milli seconds.
  })
  .on("error", (err) => console.log(`Redis Client Error: ${err}`))
  .connect();

app.get("/fib_indeces", async (req, res) => {
  let result = await pgPool.query("SELECT * from fib_indeces");
  let fib_indeces = result.rows;
  res.send(fib_indeces);
});

app.get("/fib_mappings", async (req, res) => {
  let fib_mappings = await redisClient.hGetAll("fib_mappings");
  res.send(fib_mappings);
});

app.post("/fib_indices", async (req, res) => {
  let fib_index = parseInt(req.body.fib_index);

  // const maxFibIndex = 40;
  // if (fib_index > maxFibIndex) {
  //   return res
  //     .status(422)
  //     .send(
  //       `Fibonacci index is too high to calculate. Pick an index lesser than or equal to ${maxFibIndex}`
  //     );
  // }

  let fib_value = null;
  const fib_index_exists = await redisClient.hExists(
    "fib_mappings",
    fib_index.toString()
  );
  if (fib_index_exists) {
    fib_value = await redisClient.hGet("fib_mappings", fib_index.toString());
  }

  if (fib_value === null) {
    await pgPool.query(
      `INSERT INTO fib_indeces(number) VALUES(${fib_index}) ON CONFLICT (number) DO NOTHING`
    );
    await redisClient.hSet("fib_mappings", fib_index, "not yet calculated");
    await redisClient.publish("fib_channel", fib_index.toString());

    res.send({ status: "processing" });
  } else if (fib_value === "not yet calculated") {
    res.send({ status: "processing" });
  } else {
    res.send({ status: "processed" });
  }
});

const stopServer = async (event) => {
  console.log(`Stopping the server due to the event "${event}" ...`);

  // await redisClient.flushAll();
  // console.log("Cleaned up Redis data");

  redisClient.quit();
  console.log("Disconnected Redis client");

  // const pgClient = await pgPool.connect();
  // try {
  //   await pgClient.query(`DROP TABLE IF EXISTS ${table_name}`);
  // } catch (error) {
  //   console.error(`Error while dropping '${table_name}' table: ${error}`);
  // } finally {
  //   pgClient.release();
  // }
  // console.log("Cleaned up PostgreSQL data");

  await pgPool.end();
  console.log("Disconnected PostgreSQL client");

  console.log("Gracefully stopped the server");
  process.exit(0);
};

process.on("SIGINT", async () => {
  await stopServer("SIGINT");
}); // SIGINT --> User interrupt. Sent by pressing Ctrl+C in the terminal. Used to request the interruption or termination of a process.
process.on("SIGTERM", async () => {
  await stopServer("SIGTERM");
}); // SIGTERM --> Terminate. A general-purpose signal used to request a graceful termination of a process.

app.listen(process.env.APP_PORT, "0.0.0.0", () => {
  console.log(`Listening on port ${process.env.APP_PORT}`);
});
