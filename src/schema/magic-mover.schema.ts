import * as z from "zod";

export const CreateMagicMoverSchema = z.object({
  body: z.object({
    questState: z.enum(["resting", "loading", "on-mission"]),
    weightLimit: z.number({
      required_error: "Weight is required",
    }),
  }),
});
export type CreateUserInput = z.TypeOf<typeof CreateMagicMoverSchema>["body"];
