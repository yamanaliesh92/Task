import { inject, injectable } from "tsyringe";

import { MagicItemRepository, MagicMoverRepository } from "../repository";
import { MagicMoverWeightLimitExceeded } from "../errors/magic-mover-weight-limit-exceeded.exception";
import { IMagicMover, QuestStatus } from "../model/magic-mover";
import { logger } from "../logger";

import { IMagicItem } from "../model/magic-item";
import { DomainException } from "../errors";
import {
  ICreateMagicMoverDto,
  IMagicMoverService,
} from "./magic-mover.abstract.service";
import { MagicMoverIsBusyDomainException } from "../errors/magic-mover-is-busy.exceptiont";

@injectable()
export class MagicMoverService implements IMagicMoverService {
  constructor(
    @inject(MagicMoverRepository)
    private readonly magicMoverRep?: MagicMoverRepository,
    @inject(MagicItemRepository)
    private readonly magicItemsRep?: MagicItemRepository
  ) {}

  /**
   *
   * @param id Using to retrieve septic date form database
   * @returns
   */
  async getMagicMover(id: string): Promise<IMagicMover | null> {
    if (!this.magicMoverRep) throw new DomainException("DI Error");

    return await this.magicMoverRep?.get(id);
  }

  /**
   *
   * @returns Return whole data from database
   */
  async getAllMagicMovers(): Promise<IMagicMover[]> {
    if (!this.magicMoverRep) throw new DomainException("DI Error");
    return await this.magicMoverRep.list();
  }

  /**
   * @param dto The payload to create a new magic item
   * @returns
   */
  async createMagicMover(dto: ICreateMagicMoverDto): Promise<IMagicMover> {
    if (!this.magicMoverRep) throw new DomainException("DI Error");

    return await this.magicMoverRep.create({
      weightLimit: dto.weightLimit,
      questState: QuestStatus.RESTING,
      items: [],
    });
  }

  /**
   *
   * @param id Using to determine a recoded from database
   * @param dto the payload to update data
   * @returns
   */
  async updateMagicMover(
    id: string,
    dto: Partial<IMagicMover>
  ): Promise<IMagicMover | null> {
    if (!this.magicMoverRep) throw new DomainException("DI Error");

    return await this.magicMoverRep.update(id, dto);
  }

  /**
   *
   * @param id The magic mover id
   * @param items The items to load the magic mover with
   */
  async loadMagicMover(
    magicMover: IMagicMover,
    items: string[]
  ): Promise<IMagicMover | null> {
    if (!this.magicItemsRep) throw new DomainException("DI Error");
    if (!this.magicMoverRep) throw new DomainException("DI Error");

    // add the existing items loaded to the new items we want to load
    const totalItems = [
      ...new Set([...items, ...magicMover.items.map(String)]),
    ];

    logger.info("Loading the items", {
      totalItems,
      newItems: items,
      currentItems: magicMover.items,
    });

    const totalItemsToLoad = await this.magicItemsRep.listMagicItems({
      ids: totalItems,
    });

    // Ensure the magic mover is not on mission
    this.#validateMagicMoverStatus(magicMover);

    // Ensure we are not exceeding the weight
    this.#validateMagicMoverLoadedWeight(
      totalItemsToLoad,
      magicMover.weightLimit,
      magicMover.id
    );

    return this.magicMoverRep.update(magicMover.id, {
      questState: QuestStatus.LOADING,
      items: totalItems,
    });
  }

  /**
   * Ensure that magic mover is not on a mission
   * @param magicMover The magic mover to validate the status for
   */
  #validateMagicMoverStatus(magicMover: IMagicMover) {
    if (magicMover.questState === QuestStatus.ON_MISSION) {
      throw new MagicMoverIsBusyDomainException(magicMover.id);
    }
  }

  /**
   * Ensure that magic items total weight, does not exceed the magic mover weight limit
   * @param totalItemsToLoad the items to load
   * @param weightLimit the magic mover weight limit
   * @param magicMoverId the id of the magic mover
   */
  #validateMagicMoverLoadedWeight(
    totalItemsToLoad: IMagicItem[],
    weightLimit: number,
    magicMoverId: string
  ) {
    // figure out the total weight
    const totalWeightToLoad = totalItemsToLoad.reduce(
      (acc, curr) => (acc += curr.weight),
      0
    );

    logger.info("Total weight calculation", { totalItemsToLoad, weightLimit });

    if (totalWeightToLoad > weightLimit) {
      throw new MagicMoverWeightLimitExceeded(
        magicMoverId,
        totalWeightToLoad,
        weightLimit
      );
    }
  }
}
