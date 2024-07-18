import { MagicItemRepository } from "../repository";
import { autoInjectable, inject } from "tsyringe";
import { container } from "tsyringe";
import { IMagicItem } from "../model/magic-item";

@autoInjectable()
export class MagicItemService {
  // private readonly magicMoverRep: MagicItemRepository;

  constructor(
    @inject(MagicItemRepository)
    private readonly magicMoverRep?: MagicItemRepository
  ) {}

  /**
   * Create a new magic item by make call to addMagicItem func
   * @param dto The payload to create a new magic item
   * @returns
   */
  async createMagicItem(dto: IMagicItem): Promise<IMagicItem> {
    if (!this.magicMoverRep) throw new Error("DI Error");

    return this.magicMoverRep.addMagicItem(dto);
  }
}
