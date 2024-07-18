import * as z from "zod";

/**
 * @openapi
 * components:
 *  schemas:
 *    CreateUserInput:
 *      type: object
 *      required:
 *        - email
 *        - name
 *        - password
 *        - passwordConfirmation
 *      properties:
 *        email:
 *          type: string
 *          example: jane.doe@example.com
 *        name:
 *          type: string
 *          example: Jane Doe
 *        password:
 *          type: string
 *          example: stringPassword123
 *        passwordConfirmation:
 *          type: string
 *          example: stringPassword123
 *    CreateUserResponse:
 *      type: object
 *      properties:
 *        email:
 *          type: string
 *        name:
 *          type: string
 *        _id:
 *          type: string
 *        createdAt:
 *          type: string
 *        updatedAt:
 *          type: string
 */

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
