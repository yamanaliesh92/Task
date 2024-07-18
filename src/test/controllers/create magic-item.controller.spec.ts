import { faker } from "@faker-js/faker";
import { createMock } from "@golevelup/ts-jest";
import { getMockReq, getMockRes } from "@jest-mock/express";
import { Response } from "express";
import mongoose from "mongoose";
import "reflect-metadata";

import { mockedCreateMagicItemPayload, MockMagicItemService } from "../../mock";

import { DEFAULT_ERROR } from "../../constant";
import { MagicItemController } from "../../controller";
import { IMagicItem } from "../../model/magic-item";

describe("MagicItemsController create method", () => {
  let res: Response;
  let service: MockMagicItemService;
  let controller: MagicItemController;

  beforeEach(async () => {
    service = new MockMagicItemService();
    controller = new MagicItemController(service);
    res = getMockRes().res;
  });

  it("Responds with 200 when the magic item is created successfully", async () => {
    const req = getMockReq({ body: mockedCreateMagicItemPayload });

    const item: IMagicItem = createMock<IMagicItem>({
      weight: faker.number.int(),
      name: faker.commerce.productName(),
      magicMoverId: "669857009ece259c52fe8399",
      id: new mongoose.Types.ObjectId(),
    });

    jest.spyOn(service, "createMagicItem").mockResolvedValue(item);

    await controller.createMagicItem(req, res);

    expect(res.status).toHaveBeenCalledWith(201);

    expect(res.send).toHaveBeenCalledWith(item);
  });

  it(`Responds with 500 ${JSON.stringify(
    DEFAULT_ERROR
  )} if the service threw an unexpected error.`, async () => {
    const req = getMockReq({ body: mockedCreateMagicItemPayload });

    jest
      .spyOn(service, "createMagicItem")
      .mockRejectedValue(new Error("something went wrong."));

    await controller.createMagicItem(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith(DEFAULT_ERROR);
  });
});
