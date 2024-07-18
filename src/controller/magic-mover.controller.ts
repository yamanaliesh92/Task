import { Request, Response } from "express";
import { container } from "tsyringe";
import { autobind } from "core-decorators";

import { MagicMoverService } from "../services";
import { errorMessages } from "../constant";
import { logger } from "../logger";
import { QuestStatus } from "../model/magic-mover";
import { LoadMagicMoverInput } from "../schema/magic-mover.schema";
import { MagicMoverIsBusyDomainException } from "../errors/magic-mover-is-busy.exceptiont";
import { MagicMoverWeightLimitExceeded } from "../errors";

export class MagicMoverController {
  private readonly magicMoverService: MagicMoverService;

  constructor(
    magicMoverService: MagicMoverService = container.resolve(MagicMoverService)
  ) {
    this.magicMoverService = magicMoverService;
  }

  /**
   * Loads magic mover and ensure that
   * the magic mover is not on mission already.
   * @param req The request object with the param id inside of it
   * @param res The response object
   */
  @autobind
  async loadMagicMover(req: Request, res: Response): Promise<void> {
    console.log("++++++");
    const id = req.params.id;
    const body: LoadMagicMoverInput = req.body;

    logger.info("Loading magic mover", { id, body });

    try {
      const magicMover = await this.magicMoverService.getMagicMover(id);

      // the magic mover does not exist
      if (!magicMover) {
        logger.warn(
          `The magic mover associated with id "${id}" does not exist.`
        );

        res
          .status(404)
          .send({ error: errorMessages.MAGIC_MOVER.MAGIC_MOVER_IS_NOT_FOUND });

        return;
      }

      const result = await this.magicMoverService?.loadMagicMover(
        magicMover,
        body.items
      );

      res.status(200).send(result);
    } catch (error) {
      if (error instanceof MagicMoverIsBusyDomainException) {
        res.status(400).send({ error: error.message });
        return;
      }

      if (error instanceof MagicMoverWeightLimitExceeded) {
        /** @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/429 */
        res.status(429).send({ error: error.message });
        return;
      }

      this.#handleUnexpectedError(
        `Unable to load magic mover: ${error}`,
        { body: req.body },
        res
      );
    }
  }

  /**
   * Loads all magic mover
   * @param _req The request object
   * @param res The response object
   */
  @autobind
  async loadAllMagicMovers(_req: Request, res: Response): Promise<void> {
    try {
      const magicMover = await this.magicMoverService.getAllMagicMovers();

      res.status(200).send(magicMover);
    } catch (error) {
      this.#handleUnexpectedError(
        `Unable to load all magic movers: ${error}`,
        {},
        res
      );
    }
  }

  /**
   * Updates the quest state to on_mission the start mission and increase the count by one
   * @param req The request object with the param id inside of it
   * @param res The response object
   */
  @autobind
  async startMission(req: Request, res: Response): Promise<void> {
    const id = req.params.id;

    try {
      const update = await this.magicMoverService?.updateMagicMover(id, {
        questState: QuestStatus.ON_MISSION,
      });

      res.status(200).send(update);
    } catch (error) {
      this.#handleUnexpectedError(
        `Unable to create magic item: ${error}`,
        {
          body: req.body,
        },
        res
      );
    }
  }

  /**
   * Updates quest state to resting to end mission
   * @param req The request object with the param id inside of it
   * @param res The response object
   */
  @autobind
  async endMission(req: Request, res: Response): Promise<void> {
    const id = req.params.id;

    try {
      const magicMover = await this.magicMoverService.getMagicMover(id);

      if (!magicMover) {
        res.status(404).send({
          error: errorMessages.MAGIC_MOVER.MAGIC_MOVER__ALREADY_ON_MISSION,
        });
        return;
      }

      const result = await this.#handleMissionEnding(
        id,
        magicMover.missionFinished
      );

      res.status(200).json(result);
    } catch (error: any) {
      this.#handleUnexpectedError(
        `Unable to update magic item: ${error}`,
        {
          body: req.body,
        },
        res
      );
    }
  }
  /**
   * Creates a new  magic mover
   * @param req The request object with the body id inside of it
   * @param res The response object
   */
  @autobind
  async createMagicMover(req: Request, res: Response): Promise<void> {
    const body = req.body;

    try {
      const magicMover = await this.magicMoverService?.createMagicMover(body);
      res.status(201).send(magicMover);
    } catch (error) {
      this.#handleUnexpectedError(
        `Unable to create magic mover: ${error}`,
        {
          body: req.body,
        },
        res
      );
    }
  }

  /**
   * Increases the count of magic mover finished missions
   * @param id The id of the magic mover
   * @param previousCount the precious value of the count
   */
  async #handleMissionEnding(id: string, previousCount: number) {
    const newCount = previousCount + 1;

    return await this.magicMoverService.updateMagicMover(id, {
      questState: QuestStatus.RESTING,
      missionFinished: newCount,
      items: [], // empty the load
    });
  }

  /**
   * Handle unexpected errors
   * @param errMsg The error message
   */
  async #handleUnexpectedError<T extends Record<string, any>>(
    errMsg: string,
    context: T,
    res: Response
  ) {
    logger.error(errMsg, { context });

    res.status(500).send({ error: errorMessages.DEFAULT });
  }
}
