import { autobind } from "core-decorators";
import { Request, Response } from "express";
import { IMagicItemService } from "../services/magic-item.abstract.service";
import { container } from "tsyringe";

import { DEFAULT_ERROR } from "../constant";
import { logger } from "../logger";
import { CreateMagicItemInput } from "../schema/magic-item.schema";
import { MagicItemService } from "../services";

export class MagicItemController {
  private readonly magicItemService: IMagicItemService;

  constructor(
    magicItemService: IMagicItemService = container.resolve(MagicItemService)
  ) {
    this.magicItemService = magicItemService;
  }

  /**
   * Creates a new magic item
   * @param req The request object
   * @param res The response object
   */
  @autobind
  async createMagicItem(req: Request, res: Response): Promise<void> {
    try {
      const body: CreateMagicItemInput = req.body;
      const { name, weight } = body;

      const magicItem = await this.magicItemService.createMagicItem({
        name,
        weight,
      });

      res.status(201).send(magicItem);
    } catch (error) {
      logger.error(`Unable to create magic item: ${error}`, {
        body: req.body,
      });

      res.status(500).send(DEFAULT_ERROR);
    }
  }
}
