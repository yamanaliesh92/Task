import { faker } from "@faker-js/faker";

import { IMagicItem } from "../model/magic-item";
import { IMagicMover } from "../model/magic-mover";
import { CreateMagicMoverInput } from "../schema/magic-mover.schema";
import { IMagicItemService } from "../services/magic-item.abstract.service";
import { IMagicMoverService } from "../services/magic-mover.abstract.service";

export const mockCreateMagicMoverPayload: CreateMagicMoverInput = {
  weightLimit: faker.number.int(),
};

export const mockedCreateMagicItemPayload = {
  weight: 123,
  name: "test",
};

export class MockMagicMoverService implements IMagicMoverService {
  async getMagicMover(): Promise<IMagicMover | null> {
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

  async updateMagicMover(): Promise<IMagicMover> {
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
  async get(): Promise<IMagicMover | null> {
    throw new Error(
      "Unimplemented function, Please mock using jest.spyOn before usage."
    );
  }

  async list(): Promise<IMagicMover[]> {
    throw new Error(
      "Unimplemented function, Please mock using jest.spyOn before usage."
    );
  }

  async create(): Promise<IMagicMover> {
    throw new Error(
      "Unimplemented function, Please mock using jest.spyOn before usage."
    );
  }

  async update(): Promise<IMagicMover> {
    throw new Error(
      "Unimplemented function, Please mock using jest.spyOn before usage."
    );
  }
}

export class MockMagicItemService implements IMagicItemService {
  async createMagicItem(): Promise<IMagicItem> {
    throw new Error(
      "Unimplemented function, Please mock using jest.spyOn before usage."
    );
  }
}
