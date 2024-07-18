import supertest from "supertest";
import { baseUrl } from "./create-magic-item.spec";

describe("Loads magic-mover by id", () => {
  const id = "66969497874c503b14a81203";
  const wrongId = "1t124";
  it("Responses with 200 when the magic mover by id is loaded successfully", async () => {
    const { statusCode } = await supertest(baseUrl).get(`/magic-mover/${id}`);

    expect(statusCode).toBe(200);
  });

  it("Responses should throw error with 500", async () => {
    const { statusCode } = await supertest(baseUrl).post(
      `/magic-mover/${wrongId}`
    );

    expect(statusCode).toBe(500);
  });
});
