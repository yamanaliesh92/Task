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

export const mockUpdateMagicMoverPayload = {
  quest: "loading",
};

export const mockedCreateMagicItemPayload = {
  weight: 123,
  name: "test",
  magicMoverId: "66982a643401699bddc6ea21",
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
  async getMagicItemById(): Promise<IMagicItem | null> {
    throw new Error(
      "Unimplemented function, Please mock using jest.spyOn before usage."
    );
  }

  async getAllMagicItems(): Promise<IMagicItem[]> {
    throw new Error(
      "Unimplemented function, Please mock using jest.spyOn before usage."
    );
  }

  async addMagicItem(): Promise<IMagicItem> {
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
