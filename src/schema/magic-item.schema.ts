import { object, TypeOf, string } from "zod";

export const CreateMagicItemSchema = object({
  body: object({
    name: string({
      required_error: "Name is required",
    }),
    weight: string({
      required_error: "Weight is required",
    }),
  }),
});

export type CreateUserInput = TypeOf<typeof CreateMagicItemSchema>["body"];
