import { MagicItemRepository } from "../repository";
import { autoInjectable, inject } from "tsyringe";
import { IMagicItem } from "../model/magic-item";
import { DomainException } from "../errors";

@autoInjectable()
export class MagicItemService {
  constructor(
    @inject(MagicItemRepository)
    private readonly magicMoverRep?: MagicItemRepository
  ) {}

  /**
   * Create a new magic item by make call to addMagicItem func
   * @param dto The payload to create a new magic item
   */
  async createMagicItem(dto: IMagicItem): Promise<IMagicItem> {
    if (!this.magicMoverRep) throw new DomainException("DI Error");

    return this.magicMoverRep.addMagicItem(dto);
  }
}
