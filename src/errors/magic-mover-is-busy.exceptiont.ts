import { DomainException } from "./domain.exception";

export class MagicMoverIsBusyDomainException extends DomainException {
  constructor(magicMoverId: string) {
    super(
      `The magic mover with id ${magicMoverId} is currently on mission, Please wait until they have finished in order to load it again.`
    );
  }
}
