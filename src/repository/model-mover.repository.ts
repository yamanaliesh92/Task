import { IMagicMover, MagicMoverModel } from "../model/magic-mover";
import { injectable } from "tsyringe";

@injectable()
export class MagicMoverRepository {
  /**
   * Retrieve magic mover based on id
   * @param id the id of the magic mover
   */
  async getMagicMoverById(id: string): Promise<IMagicMover | null> {
    return await MagicMoverModel.findById({ _id: id });
  }

  async getAllMagicMovers(): Promise<IMagicMover[]> {
    return await MagicMoverModel.find().sort({ count: -1 });
  }

  /**
   *
   * @param dto the payload to add new magic-mover
   * @returns
   */
  async addMagicMover(dto: IMagicMover): Promise<IMagicMover> {
    return await MagicMoverModel.create(dto);
  }

  /**
   *
   * @param id the id of magic mover
   * @param updatedPayload  the payload to update it
   * @returns
   */
  async updateMagicMover(
    id: string,
    updatedPayload: Partial<IMagicMover>
  ): Promise<IMagicMover | null> {
    return await MagicMoverModel.findByIdAndUpdate(id, updatedPayload, {
      new: true,
    });
  }
}
