import { Request, Response } from "express";
import { container } from "tsyringe";

import { autobind } from "core-decorators";
import { MagicMoverService } from "../services";

export class MagicMoverController {
  private magicMoverService: MagicMoverService;

  constructor() {
    this.magicMoverService = container.resolve(MagicMoverService);
  }

  /**
   * Loads magic mover and ensure that
   * the magic mover is not on mission already.
   * @param req The request object with the param id inside of it
   * @param res The response object
   */
  @autobind
  async loadMagicMover(req: Request, res: Response): Promise<void> {
    const id = req.params.id;

    try {
      const magicMover = await this.magicMoverService.getMagicMover(id);

      if (magicMover?.questState === QuestStatus.ON_MISSION) {
        res.status(400).send({
          error: errorMessages.MAGIC_MOVER.MAGIC_MOVER__ALREADY_ON_MISSION,
        });
      }

      const result = await this.magicMoverService?.updateMagicMover(id, {
        questState: QuestStatus.LOADING,
      });

      res.status(200).send(result);
    } catch (error) {
      logger.error(`Unable to load magic mover: ${error}`);

      res.status(500).send(DEFAULT_ERROR);
    }
  }

  /**
   * Loads all magic mover
   * @param _req
   * @param res The response object
   */
  @autobind
  async loadAllMagicMovers(_req: Request, res: Response): Promise<void> {
    if (!this.magicMoverService) throw new Error("Error DI");

    try {
      const magicMover = await this.magicMoverService.getAllMagicMovers();
      res.status(200).send(magicMover);
    } catch (error) {
      logger.error(`Unable to load all magic movers: ${error}`);

      res.status(500).send(DEFAULT_ERROR);
    }
  }

  /**
   * Updates the quest state to on_mission the start mission and increase the count by one
   * @param req The request object with the param id inside of it
   * @param res The response object
   */
  @autobind
  async updateStartMission(req: Request, res: Response): Promise<void> {
    const id = req.params.id;

    try {
      const findMagicMover = await this.magicMoverService.getMagicMover(id);

      if (!findMagicMover) {
        res.status(404).send({
          error: errorMessages.MAGIC_MOVER.MAGIC_MOVER__ALREADY_ON_MISSION,
        });
      }

      const count = findMagicMover?.count;
      const newCount = count ? count + 1 : count;
      const updateToStartMission =
        await this.magicMoverService?.updateMagicMover(id, {
          questState: QuestStatus.ON_MISSION,
          count: newCount,
        });
      res.status(200).json(updateToStartMission);
    } catch (error) {
      logger.error(`Unable to create magic item: ${error}`, {
        body: req.body,
      });

      res.status(500).send(DEFAULT_ERROR);
    }
  }

  /**
   * Updates quest state to resting to end mission
   * @param req The request object with the param id inside of it
   * @param res The response object
   */
  @autobind
  async updateEndMission(req: Request, res: Response): Promise<void> {
    const id = req.params.id;
    try {
      const result = await this.magicMoverService.updateMagicMover(id, {
        questState: QuestStatus.RESTING,
      });
      res.status(200).json(result);
    } catch (error: any) {
      logger.error(`Unable to  update magic item: ${error}`, {
        body: req.body,
      });

      res.status(500).send(DEFAULT_ERROR);
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
      logger.error(`Unable to create magic item: ${error}`, {
        body: req.body,
      });

      res.status(500).send(DEFAULT_ERROR);
    }
  }
}
