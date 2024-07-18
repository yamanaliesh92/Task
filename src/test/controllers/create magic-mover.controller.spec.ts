import "reflect-metadata";
import { createMock } from "@golevelup/ts-jest";
import { faker } from "@faker-js/faker";
import mongoose from "mongoose";
import { getMockReq, getMockRes } from "@jest-mock/express";
import { Response } from "express";

import { mockCreateMagicMoverPayload, MockMagicMoverService } from "../../mock";
import { DEFAULT_ERROR } from "../../constant";
import { MagicMoverController } from "../../controller";
import { IMagicMover, QuestStatus } from "../../model/magic-mover";

describe("magic-mover controller", () => {
  let res: Response;
  let service: MockMagicMoverService;
  let controller: MagicMoverController;

  beforeEach(async () => {
    service = new MockMagicMoverService();
    controller = new MagicMoverController();
    res = getMockRes().res;
  });

  it.skip("Responses with 200 when the magic item is created successfully", async () => {
    const req = getMockReq({ body: mockCreateMagicMoverPayload });

    const item: IMagicMover = createMock<IMagicMover>({
      weightLimit: faker.number.int(),
      questState: QuestStatus.RESTING,
      id: new mongoose.Types.ObjectId(),
    });
    jest.spyOn(service, "createMagicMover").mockResolvedValue(item);
    await controller.createMagicMover(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.send).toHaveBeenCalledWith(item);
  });

  it.skip(`Responds with 500 ${JSON.stringify(
    DEFAULT_ERROR
  )} if the service threw an unexpected error.`, async () => {
    const req = getMockReq({ body: mockCreateMagicMoverPayload });

    jest
      .spyOn(service, "createMagicMover")
      .mockRejectedValue(new Error("something went wrong."));

    await controller.createMagicMover(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith(DEFAULT_ERROR);
  });
});
