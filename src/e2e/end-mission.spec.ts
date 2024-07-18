import { mockCreateMagicMoverPayload } from "../mock";
import supertest from "supertest";
import { baseUrl } from "./create-magic-item.spec";

describe("Updates quest to end-mission", () => {
  const wrongId = "1t124";
  it("Responses with 200 when the magic mover is updated successfully ", async () => {
    const res = await supertest(baseUrl)
      .post("/magic-mover")
      .send(mockCreateMagicMoverPayload);

    const { statusCode } = await supertest(baseUrl).patch(
      `/magic-mover/${res.body._id}/end-mission`
    );

    expect(statusCode).toBe(200);
  });

  it("Response should throw error with status 404 not found", async () => {
    const { statusCode } = await supertest(baseUrl).patch(
      `/magic-mover${wrongId}/end-mission`
    );
    expect(statusCode).toBe(404);
  });
});
