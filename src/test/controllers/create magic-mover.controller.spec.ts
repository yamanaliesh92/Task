import { faker } from "@faker-js/faker";
import { createMock } from "@golevelup/ts-jest";
import { getMockReq, getMockRes } from "@jest-mock/express";
import { Response } from "express";
import mongoose from "mongoose";
import "reflect-metadata";

import { DEFAULT_ERROR } from "../../constant";
import { MagicMoverController } from "../../controller";
import { mockCreateMagicMoverPayload, MockMagicMoverService } from "../../mock";
import { IMagicMover, QuestStatus } from "../../model/magic-mover";

describe("MagicMoverController create method", () => {
  let res: Response;
  let service: MockMagicMoverService;
  let controller: MagicMoverController;

  beforeEach(async () => {
    service = new MockMagicMoverService();
    controller = new MagicMoverController(service);
    res = getMockRes().res;
  });

  it("Responses with 200 when the magic item is created successfully", async () => {
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

  it(`Responds with 500 ${JSON.stringify(
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
