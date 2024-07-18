import supertest from "supertest";
import { baseUrl } from "./create-magic-item.spec";

describe("Updates quest to start-mission", () => {
  const id = "6698d95610cfb9b7a6d3b735";
  const wrongId = "1t124";
  it.only("Responses with 200 when the magic mover is updated successfully", async () => {
    const response = await supertest(baseUrl).patch(
      `/magic-mover/start-mission/${id}`
    );

    expect(response.statusCode).toBe(200);
  });

  it.only("Responses should throw error with 500 status", async () => {
    const { statusCode } = await supertest(baseUrl).patch(
      `/magic-mover/start-mission/${wrongId}`
    );

    expect(statusCode).toBe(500);
  });
});
export {};
