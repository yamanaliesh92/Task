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
describe("MagicMoverController load", () => {
  let res: Response;
  let service: MockMagicMoverService;
  let controller: MagicMoverController;

  beforeEach(async () => {
    service = new MockMagicMoverService();
    controller = new MagicMoverController(service);
    res = getMockRes().res;
  });

  it("Responses with 200 when the magic item is loaded successfully ", async () => {
    const items = [
      "76969497874c503b14a81203",
      "51969497874c503b14a81203",
      "32969497874c503b14a81203",
    ];

    const req = getMockReq({
      params: { id: "66969497874c503b14a81203" },
      body: items,
    });

    const item: IMagicMover = createMock<IMagicMover>({
      weightLimit: faker.number.int(),
      questState: QuestStatus.RESTING,
      id: new mongoose.Types.ObjectId(),
      items: [
        "76969497874c503b14a81203",
        "51969497874c503b14a81203",
        "32969497874c503b14a81203",
      ],
    });
    jest.spyOn(service, "loadMagicMover").mockResolvedValue(item);
    jest.spyOn(service, "getMagicMover").mockResolvedValue(item);

    await controller.loadMagicMover(req, res);
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
