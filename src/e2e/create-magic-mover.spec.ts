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

  it("Response should throw bad request with status 400 ", async () => {
    const { statusCode, body } = await supertest(baseUrl)
      .post("/magic-mover")
      .send({ quest: "resting" });

    expect(statusCode).toBe(400);
  });
});
