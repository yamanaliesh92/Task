import express from "express";
import { config } from "dotenv";

export function main() {
  config();
  const app = express();
  app.use(express.json());

  app.get("/hello", (req, res) => {
    res.status(200).send("is done");
  });

  app.listen(5000, () => {
    console.log("listen to this this");
  });
}

main();
