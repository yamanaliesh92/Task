import "reflect-metadata";

import { faker } from "@faker-js/faker";
import { createMock } from "@golevelup/ts-jest";
import mongoose from "mongoose";

import { MagicMoverService } from "../../services";
import { IMagicMover, QuestStatus } from "../../model/magic-mover";
import { MockMagicMoverRepository } from "../../mock";

describe("magic-mover service", () => {
  let magicMoverRep = new MockMagicMoverRepository();
  let magicMoverSer = new MagicMoverService(magicMoverRep);

  it("Create magic-mover is created successfully", async () => {
    const body = {
      weightLimit: faker.number.int(),
      questState: QuestStatus.RESTING,
    };

    const magicMover = createMock<IMagicMover>({
      weightLimit: faker.number.int(),
      questState: QuestStatus.RESTING,
      id: new mongoose.Types.ObjectId(),
    });

    jest.spyOn(magicMoverRep, "addMagicMover").mockResolvedValue(magicMover);
    const result = await magicMoverSer.createMagicMover(body as IMagicMover);
    expect(result?.questState).toEqual(body.questState);
  });

  it("Update magic-mover is created successfully", async () => {
    const id = "123991249493131";
    const body = {
      questState: QuestStatus.RESTING,
    };

    const magicMover = createMock<IMagicMover>({
      weightLimit: faker.number.int(),
      questState: QuestStatus.RESTING,
      id: new mongoose.Types.ObjectId(),
    });

    jest.spyOn(magicMoverRep, "updateMagicMover").mockResolvedValue(magicMover);
    const result = await magicMoverSer.updateMagicMover(
      id,
      body as IMagicMover
    );
    expect(result?.questState).toEqual(body.questState);
  });
});
