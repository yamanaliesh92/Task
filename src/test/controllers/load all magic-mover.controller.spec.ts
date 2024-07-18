import { faker } from "@faker-js/faker";
import { createMock } from "@golevelup/ts-jest";
import { getMockReq, getMockRes } from "@jest-mock/express";
import { Response } from "express";
import mongoose from "mongoose";
import "reflect-metadata";

import { DEFAULT_ERROR } from "../../constant";
import { MagicMoverController } from "../../controller";
import { MockMagicMoverService } from "../../mock";
import { IMagicMover, QuestStatus } from "../../model/magic-mover";
describe("MagicMoverController getMagicMovers method", () => {
  let res: Response;
  let service: MockMagicMoverService;
  let controller: MagicMoverController;

  beforeEach(async () => {
    service = new MockMagicMoverService();
    controller = new MagicMoverController(service);
    res = getMockRes().res;
  });

  it("Responses with 200 when the magic item is loaded all magic-mover successfully ", async () => {
    const req = getMockReq();

    const items = [
      {
        weightLimit: 100,
        questState: QuestStatus.RESTING,
        id: new mongoose.Types.ObjectId(),
        items: ["129993193913", "19391929921912912"],
        missionFinished: 0,
      },
      {
        weightLimit: 200,
        questState: QuestStatus.LOADING,
        id: new mongoose.Types.ObjectId(),
        items: ["6299931939153", "49391941342"],
        missionFinished: 1,
      },
      {
        weightLimit: 400,
        missionFinished: 2,
        items: ["456299931939153", "909391941342"],
        questState: QuestStatus.ON_MISSION,
        id: new mongoose.Types.ObjectId(),
      },
    ];
    jest
      .spyOn(service, "getAllMagicMovers")
      .mockResolvedValue(items as IMagicMover[]);

    await controller.getMagicMovers(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it(`Responds with 500 ${JSON.stringify(
    DEFAULT_ERROR
  )} if the service threw an unexpected error.`, async () => {
    const req = getMockReq();
    const item: IMagicMover = createMock<IMagicMover>({
      weightLimit: faker.number.int(),
      questState: QuestStatus.RESTING,
      id: new mongoose.Types.ObjectId(),
    });
    jest.spyOn(service, "getMagicMover").mockResolvedValue(item);

    await controller.loadMagicMover(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
  });
});
