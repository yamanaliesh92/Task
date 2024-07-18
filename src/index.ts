import { config } from "dotenv";
import express from "express";
import mongoose from "mongoose";
import "reflect-metadata";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

import { swaggerOptions } from "./constant";
import { MagicItemRouter } from "./routes/magic-item.route";
import { MagicMoverRouter } from "./routes/magic-mover.route";

function main() {
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

  // register application routes
  app.use("/magic-item", MagicItemRouter);
  app.use("/magic-mover", MagicMoverRouter);

  const spaces = swaggerJsdoc(swaggerOptions);
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(spaces));

  const port = Number(process.env["PORT"]) || 5000;

  app.listen(port, () => {
    console.log(`API is listening on http://localhost:${port}`);
    console.log(
      `Swagger Docs are available on http://localhost:${port}/api-docs`
    );
  });
}

main();
