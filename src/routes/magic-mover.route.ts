import { Router } from "express";
import { CreateMagicMoverSchema } from "../schema";
import { MagicMoverController } from "../controller";

import { LoadMagicMoverSchema } from "../schema/magic-mover.schema";
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
 *                enum:
 *                  - resting
 *                  - loading
 *                  - on-mission
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
 *                enum:
 *                  - resting
 *                  - loading
 *                  - on-mission
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
 * '/magic-mover/{id}/load':
 *  post:
 *     tags:
 *     - Magic-mover
 *     summary: Loads  a magic-mover bg id
 *     parameters:
 *      - name: id
 *        in: path
 *        description: The id of the magic-mover
 *        required: true
 *     requestBody:
 *      required: true
 *      content:
 *        application/x-www-form-urlencoded:
 *           schema:
 *            type: object
 *            properties:
 *              items:
 *                type: array
 *                items:
 *                  type: string
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
 *Handel Loading the magic mover byId
 */
MagicMoverRouter.post(
  "/:id/load",
  validateResource(LoadMagicMoverSchema),
  magicMoverController.loadMagicMover
);

/**
 * @openapi
 * '/magic-mover/{id}/start-mission':
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
MagicMoverRouter.patch("/:id/start-mission", magicMoverController.startMission);

/**
 * @openapi
 * '/magic-mover/{id}/end-mission':
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
MagicMoverRouter.patch("/:id/end-mission", magicMoverController.endMission);

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
MagicMoverRouter.get("/", magicMoverController.getMagicMovers);
