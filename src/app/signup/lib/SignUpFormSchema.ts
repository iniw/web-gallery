import { z } from "zod";

export const SignupFormSchema =
  process.env.NODE_ENV === "production"
    ? z.object({
        username: z
          .string()
          .trim()
          .min(1, { message: "Have at least one character." }),

        password: z
          .string()
          .min(8, { message: "Be at least 8 characters long." })
          .regex(/[a-zA-Z]/, { message: "Contain at least one letter." })
          .regex(/[0-9]/, { message: "Contain at least one number." })
          .regex(/[^a-zA-Z0-9]/, {
            message: "Contain at least one special character.",
          })
          .trim(),
      })
    : z.object({
        username: z.string().trim(),

        password: z.string().trim(),
      });

export type SignupFormData = z.infer<typeof SignupFormSchema>;
