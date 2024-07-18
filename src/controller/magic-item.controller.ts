import { Request, Response } from "express";
import { container, inject } from "tsyringe";
import { autobind } from "core-decorators";

import MagicItemService from "../services/magic-item.service";
import { logger } from "../logger";
import { DEFAULT_ERROR } from "../constant";

export class MagicItemController {
  private magicItemService: MagicItemService;

  constructor() {
    this.magicItemService = container.resolve(MagicItemService);
  }

  /**
   * Creates a new magic item
   * @param req The request object with the body id inside of it
   * @param res The response object
   */
  @autobind
  async createMagicItem(req: Request, res: Response): Promise<void> {
    const body = req.body;
    try {
      const magicItem = await this.magicItemService.createMagicItem(body);
      res.status(201).send(magicItem);
    } catch (error) {
      logger.error(`Unable to create magic item: ${error}`, {
        body: req.body,
      });

      res.status(500).send(DEFAULT_ERROR);
    }
  }
}