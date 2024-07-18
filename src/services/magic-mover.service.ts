import { IMagicMover } from "../model/magic-mover";
import { MagicMoverRepository } from "../repository";
import { inject, injectable } from "tsyringe";

@injectable()
export class MagicMoverService {
  constructor(
    @inject(MagicMoverRepository)
    private readonly magicMoverRep?: MagicMoverRepository
  ) {}

  /**
   *
   * @param id Using to retrieve septic date form database
   * @returns
   */
  async getMagicMover(id: string): Promise<IMagicMover | null> {
    if (!this.magicMoverRep) throw new Error("DI Error");
    return await this.magicMoverRep?.getMagicMoverById(id);
  }

  /**
   *
   * @returns Return whole data from database
   */
  async getAllMagicMovers(): Promise<IMagicMover[]> {
    if (!this.magicMoverRep) throw new Error("DI Error");
    return await this.magicMoverRep.getAllMagicMovers();
  }

  /**
   * @param dto The payload to create a new magic item
   * @returns
   */
  async createMagicMover(dto: IMagicMover): Promise<IMagicMover> {
    if (!this.magicMoverRep) throw new Error("DI Error");
    return await this.magicMoverRep.addMagicMover(dto);
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
    if (!this.magicMoverRep) throw new Error("DI Error");
    return await this.magicMoverRep.updateMagicMover(id, dto);
  }
}
