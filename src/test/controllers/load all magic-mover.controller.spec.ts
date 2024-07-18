import "reflect-metadata";
import { createMock } from "@golevelup/ts-jest";
import { faker } from "@faker-js/faker";
import mongoose from "mongoose";
import { getMockReq, getMockRes } from "@jest-mock/express";
import { Response } from "express";

import { MockMagicMoverService } from "../../mock";
import { DEFAULT_ERROR } from "../../constant";
import { MagicMoverController } from "../../controller";
import { IMagicMover, QuestStatus } from "../../model/magic-mover";
describe("magic-mover controller", () => {
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
        count: 0,
      },
      {
        weightLimit: 200,
        questState: QuestStatus.LOADING,
        id: new mongoose.Types.ObjectId(),
        count: 1,
      },
      {
        weightLimit: 400,
        count: 2,
        questState: QuestStatus.ON_MISSION,
        id: new mongoose.Types.ObjectId(),
      },
    ];
    jest
      .spyOn(service, "getAllMagicMovers")
      .mockResolvedValue(items as IMagicMover[]);

    await controller.loadAllMagicMovers(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it(`Responds with 500 ${JSON.stringify(
    DEFAULT_ERROR
  )} if the service threw an unexpected error.`, async () => {
    const req = getMockReq({ params: { id: "66969497874c503b14a81203" } });
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
