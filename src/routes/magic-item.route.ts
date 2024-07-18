import { Router } from "express";
import { CreateMagicItemSchema } from "../schema/magic-item.schema";

import { MagicItemController } from "../controller";
import validateResource from "../vaildation";

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
