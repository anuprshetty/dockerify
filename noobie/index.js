import dotenv from "dotenv";
dotenv.config();
import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("Hi Noobie, Welcome!");
});

app.listen(process.env.APP_PORT, "0.0.0.0", () => {
  console.log(`Listening on port ${process.env.APP_PORT}`);
});
