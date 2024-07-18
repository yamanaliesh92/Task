export class DomainException extends Error {
  constructor(msg: string, readonly cause?: unknown) {
    super(msg);
  }
}
