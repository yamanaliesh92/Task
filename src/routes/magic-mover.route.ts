import { Router } from "express";
import { CreateMagicMoverSchema } from "../schema";
import { MagicMoverController } from "../controller";

import validateResource from "../vaildation";

const magicMoverController = new MagicMoverController();

export const MagicMoverRouter = Router();

/**
 * @openapi
 * '/magic-mover':
 *  post:
 *     tags:
 *     - Magic-mover
 *     summary: Create a new magic-mover
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            properties:
 *              weightLimit:
 *                type: number
 *                example: 12
 *              questState:
 *                type: string
 *                example: resting
 *
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *           schema:
 *            type: object
 *            properties:
 *              questState:
 *                type: string
 *              weightLimit:
 *                type: number
 *              id:
 *                type: string
 *      500:
 *        description: Internal Server Error
 *      400:
 *        description: Bad request
 */

/**
 * Handel for creating a new magic-mover
 */
MagicMoverRouter.post(
  "/",
  validateResource(CreateMagicMoverSchema),
  magicMoverController.createMagicMover
);

/**
 * @openapi
 * '/magic-mover/{id}':
 *  get:
 *     tags:
 *     - Magic-mover
 *     summary: Loads  a magic-mover bg id
 *     parameters:
 *      - name: id
 *        in: path
 *        description: The id of the magic-mover
 *        required: true
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *           schema:
 *            type: object
 *            properties:
 *              questState:
 *                type: string
 *              weightLimit:
 *                type: number
 *              id:
 *                type: string
 *      500:
 *        description: Internal Server Error
 *      400:
 *        description: Bad request
 */

/**
 *Handel Loading the magic mover byId
 */
MagicMoverRouter.get("/:id", magicMoverController.loadMagicMover);

/**
 * @openapi
 * '/magic-mover/start-mission/{id}':
 *  patch:
 *     tags:
 *     - Magic-mover
 *     summary: Updates the magic mover to start-mission a new magic-mover
 *     parameters:
 *      - name: id
 *        in: path
 *        description: The id of the magic-mover
 *        required: true
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *           schema:
 *            type: object
 *            properties:
 *              questState:
 *                type: string
 *              weightLimit:
 *                type: number
 *              id:
 *                type: string
 *      500:
 *        description: Internal Server Error
 *      400:
 *        description: Bad request
 */

/**
 * Handel starting-mission for a magic mover
 */
MagicMoverRouter.patch(
  "/start-mission/:id",
  magicMoverController.updateStartMission
);

/**
 * @openapi
 * '/magic-mover/end/mission/{id}':
 *  patch:
 *     tags:
 *     - Magic-mover
 *     summary: Updates magic-mover to end-mission
 *     parameters:
 *      - name: id
 *        in: path
 *        description: The id of the magic-mover
 *        required: true
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *           schema:
 *            type: object
 *            properties:
 *              questState:
 *                type: string
 *              weightLimit:
 *                type: number
 *              id:
 *                type: string
 *      500:
 *        description: Internal Server Error
 *      400:
 *        description: Bad request
 */

/**
 * Handel ending-mission for a magic mover
 */
MagicMoverRouter.patch(
  "/end/mission/:id",
  magicMoverController.updateEndMission
);

/**
 * @openapi
 * '/magic-mover':
 *  get:
 *     tags:
 *     - Magic-mover
 *     summary: Loads all magic mover
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *           schema:
 *            type: object
 *            properties:
 *              questState:
 *                type: string
 *              weightLimit:
 *                type: number
 *              id:
 *                type: string
 *      500:
 *        description: Internal Server Error
 *      400:
 *        description: Bad request
 */
/**
 * Handel get all magic movers
 */
MagicMoverRouter.get("/", magicMoverController.loadAllMagicMovers);
