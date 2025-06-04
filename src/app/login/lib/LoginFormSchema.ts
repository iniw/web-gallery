import { z } from "zod";

export const LoginFormSchema = z.object({
  username: z.string().trim(),
  password: z.string().trim(),
});

export type LoginFormData = z.infer<typeof LoginFormSchema>;
