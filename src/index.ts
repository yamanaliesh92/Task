import "reflect-metadata";
import express from "express";
import mongoose from "mongoose";
import { config } from "dotenv";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

import { MagicItemRouter } from "./routes/magic-item.route";
import { MagicMoverRouter } from "./routes/magic-mover.route";
import { swaggerOptions } from "./constant";

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

  app.get("/hello", (req, res) => {
    res.status(200).send("is done");
  });
  app.use("/magic-item", MagicItemRouter);

  app.use("/magic-mover", MagicMoverRouter);

  const spaces = swaggerJsdoc(swaggerOptions);

  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(spaces));

  app.listen(5000, () => {
    console.log("test");
  });
}

main();
