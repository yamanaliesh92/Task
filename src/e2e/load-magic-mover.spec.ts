import supertest from "supertest";
import { baseUrl } from "./create-magic-item.spec";

describe("Loads magic-mover by id", () => {
  const magicItemPayloadOne = {
    name: "first",
    weight: 500,
  };
  const magicItemPayloadTwo = {
    name: "second",
    weight: 20,
  };

  const magicMoverPayload = {
    questState: "resting",
    weightLimit: 500,
  };
  it("Responds with 200 when the magic mover is loaded successfully", async () => {
    const { body: createMagicItemTwo } = await supertest(baseUrl)
      .post("/magic-item")
      .send(magicItemPayloadTwo);

    const { body: createdMagicMover } = await supertest(baseUrl)
      .post("/magic-mover")
      .send(magicMoverPayload);

    const items: string[] = [createMagicItemTwo._id];
    const body = { items };

    const id = createdMagicMover._id;
    const res = await supertest(baseUrl)
      .post(`/magic-mover/${id}/load`)
      .send(body);

    console.log("res", res);

    expect(res.statusCode).toBe(200);
  });

  it.only("Responds with 429 when the wightLimit cannot holds all items.", async () => {
    const { body: createMagicItemOne } = await supertest(baseUrl)
      .post("/magic-item")
      .send(magicItemPayloadOne);

    const { body: createMagicItemTwo } = await supertest(baseUrl)
      .post("/magic-item")
      .send(magicItemPayloadTwo);

    const { body: createdMagicMover } = await supertest(baseUrl)
      .post("/magic-mover")
      .send(magicMoverPayload);

    const items: string[] = [createMagicItemTwo._id, createMagicItemOne._id];
    const body = { items };

    const id = createdMagicMover._id;
    const res = await supertest(baseUrl)
      .post(`/magic-mover/${id}/load`)
      .send(body);

    expect(res.statusCode).toBe(429);
  });
});
