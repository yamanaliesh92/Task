import supertest from "supertest";
import { baseUrl } from "./create-magic-item.spec";

describe("Updates quest to end-mission", () => {
  const id = "6698d95610cfb9b7a6d3b735";
  const wrongId = "1t124";
  it("Responses with 200 when the magic mover is updated successfully ", async () => {
    const response = await supertest(baseUrl).patch(
      `/magic-mover/end/mission/${id}`
    );

    expect(response.statusCode).toBe(200);
  });

  it("Response should throw error with status 500", async () => {
    const { statusCode } = await supertest(baseUrl).patch(
      `/magic-mover/end/mission/${wrongId}`
    );
    expect(statusCode).toBe(500);
  });
});
