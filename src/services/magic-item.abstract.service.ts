import { IMagicItem } from "../model/magic-item";

interface ICreateMagicItemDto {
  weight: number;
  name: string;
}

export abstract class IMagicItemService {
  /**
   * Create a new magic item by make call to addMagicItem func
   * @param dto The payload to create a new magic item
   */
  abstract createMagicItem(dto: ICreateMagicItemDto): Promise<IMagicItem>;
}
