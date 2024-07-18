import * as z from "zod";

export const CreateMagicItemSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: "Name is required",
    }),
    weight: z.number({
      required_error: "Weight is required",
    }),
  }),
});

export type CreateUserInput = z.TypeOf<typeof CreateMagicItemSchema>["body"];
