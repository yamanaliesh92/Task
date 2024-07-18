import { DomainException } from "./domain.exception";

export class MagicMoverWeightLimitExceeded extends DomainException {
  constructor(moverId: string, loadWeight: number, moverWeightLimit: number) {
    super(
      `The magic mover ${moverId} weight limit has been exceeded, max weight is ${moverWeightLimit}, the items full weight is ${loadWeight}`
    );
  }
}
