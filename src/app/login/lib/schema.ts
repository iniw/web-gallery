import { z } from "zod";

export const LoginDataSchema = z.object({
  username: z.string().trim(),
  password: z.string().trim(),
});

export type LoginData = z.infer<typeof LoginDataSchema>;
