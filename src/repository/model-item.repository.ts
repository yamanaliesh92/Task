import { MagicItemModel } from "../model";
import { injectable } from "tsyringe";
import { IMagicItem } from "../model/magic-item";

@injectable()
export class MagicItemRepository {
  /**
   *
   * @param dto The payload  to create a new magic-iten
   * @returns
   */
  async addMagicItem(dto: IMagicItem): Promise<IMagicItem> {
    return await MagicItemModel.create(dto);
  }
}
