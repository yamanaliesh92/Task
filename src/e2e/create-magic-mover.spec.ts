import supertest from "supertest";

import { mockCreateMagicMoverPayload } from "../mock";
import { baseUrl } from "./create-magic-item.spec";

describe("Creates a new  magic-mover", () => {
  it("Responses with 200 when the magic item is created successfully", async () => {
    const { body, status } = await supertest(baseUrl)
      .post("/magic-mover")
      .send(mockCreateMagicMoverPayload);

    expect(status).toBe(201);
    expect(body.weightLimit).toEqual(mockCreateMagicMoverPayload.weightLimit);
  });

  it("Response with 400 when weightLimit is missing from request ", async () => {
    const { statusCode } = await supertest(baseUrl)
      .post("/magic-mover")
      .send({});

    expect(statusCode).toBe(400);
  });
});
