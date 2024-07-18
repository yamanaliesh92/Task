import { Router } from "express";
import { CreateMagicItemSchema } from "../schema/magic-item.schema";

import { MagicItemController } from "../controller";
import validateResource from "../vaildation";

const magicItemController = new MagicItemController();

export const MagicItemRouter = Router();

/**
 * @openapi
 * '/magic-item':
 *  post:
 *     tags:
 *     - Magic-item
 *     summary: Create a new magic-item
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            properties:
 *              weight:
 *                type: number
 *                example: 12
 *              name:
 *                type: string
 *                example: test
 *              magicMoverId:
 *                type: string
 *                example: "12312sa"
 *
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *           schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *              weight:
 *                type: number
 *              id:
 *                type: string
 *      500:
 *        description: Internal Server Error
 *      400:
 *        description: Bad request
 */

/**
 *Handel for creating a new magic-ite
 */
MagicItemRouter.post(
  "/",
  validateResource(CreateMagicItemSchema),
  magicItemController.createMagicItem
);
