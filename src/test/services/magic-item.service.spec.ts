import "reflect-metadata";

import { faker } from "@faker-js/faker";
import { createMock } from "@golevelup/ts-jest";
import mongoose from "mongoose";
import { MagicItemService } from "../../services";
import { IMagicItem } from "../../model/magic-item";
import { MockMagicItemRepository } from "../../mock";

describe("magic-item service", () => {
  let magicMoverRep = new MockMagicItemRepository();
  let magicItemSer = new MagicItemService(magicMoverRep);

  it("create magic-mover is created successfully", async () => {
    const body = {
      weight: faker.number.int(),
      name: "test",
      magicMoverId: "669857009ece259c52fe8399",
    };

    const item: IMagicItem = createMock<IMagicItem>({
      weight: faker.number.int(),
      name: "test",
      magicMoverId: "669857009ece259c52fe8399",
      id: new mongoose.Types.ObjectId(),
    });

    jest.spyOn(magicMoverRep, "addMagicItem").mockResolvedValue(item);
    const result = await magicItemSer.createMagicItem(body as IMagicItem);
    expect(result?.name).toEqual(body.name);
  });
});
