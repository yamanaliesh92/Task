import { IMagicMover } from "../model/magic-mover";

export interface ICreateMagicMoverDto {
  weightLimit: number;
}

export abstract class IMagicMoverService {
  /**
   *
   * @param id Using to retrieve septic date form database
   */
  abstract getMagicMover(id: string): Promise<IMagicMover | null>;

  /**
   * Return list of magic movers
   */
  abstract getAllMagicMovers(): Promise<IMagicMover[]>;

  /**
   * @param dto The payload to create a new magic mover
   */
  abstract createMagicMover(dto: ICreateMagicMoverDto): Promise<IMagicMover>;

  /**
   *
   * @param id Using to determine a recoded from database
   * @param dto the payload to update data
   */
  abstract updateMagicMover(
    id: string,
    dto: Partial<IMagicMover>
  ): Promise<IMagicMover | null>;

  /**
   * Load magic mover
   * @param id The magic mover id
   * @param items The items to load the magic mover with
   */
  abstract loadMagicMover(
    magicMover: IMagicMover,
    items: string[]
  ): Promise<IMagicMover | null>;
}
