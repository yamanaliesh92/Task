import { Router } from "express";
import { CreateMagicMoverSchema } from "../schema";
import { MagicMoverController } from "../controller";

import validateResource from "../vaildation";

const magicMoverController = new MagicMoverController();

export const MagicMoverRouter = Router();

/**
 * Handel for creating a new magic-mover
 */
MagicMoverRouter.post(
  "/",
  validateResource(CreateMagicMoverSchema),
  magicMoverController.createMagicMover
);

/**
 *Handel Loading the magic mover byId
 */
MagicMoverRouter.get("/:id", magicMoverController.loadMagicMover);

/**
 * Handel starting-mission for a magic mover
 */
MagicMoverRouter.patch(
  "/start-mission/:id",
  magicMoverController.updateStartMission
);

/**
 * Handel ending-mission for a magic mover
 */
MagicMoverRouter.patch(
  "/end/mission/:id",
  magicMoverController.updateEndMission
);
