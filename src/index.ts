import express from "express";
import mongoose from "mongoose";
import { config } from "dotenv";

export function main() {
  config();
  const app = express();
  app.use(express.json());

  mongoose
    .connect(process.env["DB_URL"] as string)
    .then(() => console.log("connected to db"))
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });

  app.get("/hello", (_req, res) => {
    res.status(200).send("is done");
  });

  app.listen(5000, () => {
    console.log("listen to this this");
  });
}

main();
