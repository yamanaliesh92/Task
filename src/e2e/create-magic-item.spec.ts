import { mockedCreateMagicItemPayload } from "../mock";
import supertest from "supertest";

export const baseUrl = "http://localhost:5000";

describe("Creates a new magic item", () => {
  it("Responses with 200 when the magic item is created successfully", async () => {
    const { body, status } = await supertest(baseUrl)
      .post("/magic-item")
      .send(mockedCreateMagicItemPayload);

    expect(status).toBe(201);
    expect(body.name).toEqual(mockedCreateMagicItemPayload.name);
  });

  it("Response should throw bad request with status 400 ", async () => {
    const { statusCode } = await supertest(baseUrl)
      .post("/magic-item")
      .send({
        ...mockedCreateMagicItemPayload,
        weight: "wrong",
      });

    expect(statusCode).toBe(400);
  });
});
