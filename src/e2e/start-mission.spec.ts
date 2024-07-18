import { mockCreateMagicMoverPayload } from "../mock";
import supertest from "supertest";
import { baseUrl } from "./create-magic-item.spec";

describe("Updates quest to start-mission", () => {
  const wrongId = "1t124";
  it.only("Responses with 200 when the magic mover is updated successfully", async () => {
    const response = await supertest(baseUrl)
      .post("/magic-mover")
      .send(mockCreateMagicMoverPayload);

    const { statusCode } = await supertest(baseUrl).patch(
      `/magic-mover/${response.body._id}/start-mission`
    );

    expect(statusCode).toBe(200);
  });

  it.only("Responses should throw error  with 500 status", async () => {
    const { statusCode } = await supertest(baseUrl).patch(
      `/magic-mover/${wrongId}/start-mission/`
    );

    expect(statusCode).toBe(500);
  });
});
export {};
