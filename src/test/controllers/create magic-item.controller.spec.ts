import "reflect-metadata";
import { createMock } from "@golevelup/ts-jest";
import { faker } from "@faker-js/faker";
import mongoose from "mongoose";
import { Response } from "express";
import { getMockReq, getMockRes } from "@jest-mock/express";

import { mockedCreateMagicItemPayload, MockMagicItemService } from "../../mock";

import { IMagicItem } from "../../model/magic-item";
import { DEFAULT_ERROR } from "../../constant";
import { MagicItemController } from "../../controller";

describe("magic-item controller", () => {
  let res: Response;
  let service: MockMagicItemService;
  let controller: MagicItemController;

  beforeEach(async () => {
    service = new MockMagicItemService();
    controller = new MagicItemController();
    res = getMockRes().res;
  });

  it("Responses with 200 when the magic item is created successfully", async () => {
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
