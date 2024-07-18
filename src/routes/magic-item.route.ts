import { Router } from "express";

import { MagicItemController } from "../controller";
import validateResource from "../vaildation";
import { CreateMagicItemSchema } from "../schema";

const magicItemController = new MagicItemController();

export const MagicItemRouter = Router();

/**
 *Handel for creating a new magic-ite
 */
MagicItemRouter.post(
  "/",
  validateResource(CreateMagicItemSchema),
  magicItemController.createMagicItem
);
