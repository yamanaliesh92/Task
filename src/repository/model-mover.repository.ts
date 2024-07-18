import { ICreateMagicMoverDto } from "src/services/magic-mover.abstract.service";
import {
  IMagicMover,
  MagicMoverModel,
  QuestStatus,
} from "../model/magic-mover";
import { injectable } from "tsyringe";

interface ICreateMagicMoverEntityDto {
  weightLimit: number;
  questState: QuestStatus;
  items: [];
}

@injectable()
export class MagicMoverRepository {
  /**
   * Retrieve magic mover based on id
   * @param id the id of the magic mover
   */
  async get(id: string): Promise<IMagicMover | null> {
    return await MagicMoverModel.findById({ _id: id });
  }

  async list(): Promise<IMagicMover[]> {
    return await MagicMoverModel.find().sort({ missionFinished: -1 });
  }

  /**
   * @param dto the payload to add new magic-mover
   */
  async create(dto: ICreateMagicMoverEntityDto): Promise<IMagicMover> {
    return await MagicMoverModel.create(dto);
  }

  /**
   * @param id the id of magic mover
   * @param updatedPayload  the payload to update it
   */
  async update(
    id: string,
    updatedPayload: Partial<IMagicMover>
  ): Promise<IMagicMover | null> {
    return await MagicMoverModel.findByIdAndUpdate(id, updatedPayload, {
      new: true,
    });
  }
}
