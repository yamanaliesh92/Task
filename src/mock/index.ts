import { MagicItemRepository } from "../repository";
import { IMagicItem } from "../model/magic-item";
import { IMagicMover } from "../model/magic-mover";

export const mockMagicMoverResponse = {
  id: "1234",
  weight: 100,
  quest: "resting",
};

export const mockCreateMagicMoverPayload = {
  weightLimit: 100,
  questState: "resting",
};

export const mockedCreateMagicItemPayload = {
  weight: 123,
  name: "test",
};

export const mockCreateMagicItemResponse = {
  _id: "412421421",
  weight: "669694a4874c503b14a81206",
  name: "test",
};

export class MockMagicMoverService {
  async getMagicMover(): Promise<IMagicMover | null> {
    throw new Error(
      "Unimplemented function, Please mock using jest.spyOn before usage."
    );
  }

  validateMagicMoverStatus() {
    throw new Error(
      "Unimplemented function, Please mock using jest.spyOn before usage."
    );
  }

  validateMagicMoverLoadedWeight() {
    throw new Error(
      "Unimplemented function, Please mock using jest.spyOn before usage."
    );
  }

  async loadMagicMover(): Promise<IMagicMover | null> {
    throw new Error(
      "Unimplemented function, Please mock using jest.spyOn before usage."
    );
  }
  async getAllMagicMovers(): Promise<IMagicMover[]> {
    throw new Error(
      "Unimplemented function, Please mock using jest.spyOn before usage."
    );
  }
  async createMagicMover(): Promise<IMagicMover> {
    throw new Error(
      "Unimplemented function, Please mock using jest.spyOn before usage."
    );
  }

  async updateMagicMover(): Promise<IMagicMover | null> {
    throw new Error(
      "Unimplemented function, Please mock using jest.spyOn before usage."
    );
  }
}

export class MockMagicItemRepository {
  async addMagicItem(): Promise<IMagicItem> {
    throw new Error(
      "Unimplemented function, Please mock using jest.spyOn before usage."
    );
  }

  async listMagicItems(): Promise<IMagicItem[]> {
    throw new Error(
      "Unimplemented function, Please mock using jest.spyOn before usage."
    );
  }
}

export class MockMagicMoverRepository {
  async getMagicMoverById(): Promise<IMagicMover | null> {
    throw new Error(
      "Unimplemented function, Please mock using jest.spyOn before usage."
    );
  }

  async getAllMagicMovers(): Promise<IMagicMover[]> {
    throw new Error(
      "Unimplemented function, Please mock using jest.spyOn before usage."
    );
  }

  async addMagicMover(): Promise<IMagicMover> {
    throw new Error(
      "Unimplemented function, Please mock using jest.spyOn before usage."
    );
  }

  async updateMagicMover(): Promise<IMagicMover> {
    throw new Error(
      "Unimplemented function, Please mock using jest.spyOn before usage."
    );
  }
}

export class MockMagicItemService {
  async createMagicItem(): Promise<IMagicItem> {
    throw new Error(
      "Unimplemented function, Please mock using jest.spyOn before usage."
    );
  }
}
