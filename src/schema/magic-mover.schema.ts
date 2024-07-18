import * as z from "zod";

export const CreateMagicMoverSchema = z.object({
  body: z.object({
    weightLimit: z.number({
      required_error: "Weight is required",
    }),
  }),
});
export type CreateMagicMoverInput = z.TypeOf<
  typeof CreateMagicMoverSchema
>["body"];

export const LoadMagicMoverSchema = z.object({
  body: z.object({
    items: z.array(z.string()),
  }),
});

export type LoadMagicMoverInput = z.TypeOf<typeof LoadMagicMoverSchema>["body"];
