import { MagicItemModel } from "../model";
import { injectable } from "tsyringe";
import { IMagicItem } from "../model/magic-item";
import mongoose from "mongoose";

interface IListMagicItemsFilters {
  ids?: string[];
}

@injectable()
export class MagicItemRepository {
  /**
   *
   * @param dto The payload  to create a new magic items
   */
  async addMagicItem(dto: IMagicItem): Promise<IMagicItem> {
    return await MagicItemModel.create(dto);
  }

  /**
   *
   * @param filters the filters params to filter the magic items by
   */
  async listMagicItems(
    filters?: IListMagicItemsFilters
  ): Promise<IMagicItem[]> {
    const { ids } = filters ?? {};

    const query = {
      ...(ids?.length
        ? { _id: { $in: ids.map((i) => new mongoose.Types.ObjectId(i)) } }
        : {}),
    };

    return MagicItemModel.find(query).sort({ createdAt: -1 }).exec();
  }
}
