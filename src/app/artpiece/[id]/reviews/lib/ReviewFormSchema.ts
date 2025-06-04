import { z } from "zod";

export const ReviewFormSchema = z.object({
  content: z.string().trim().min(1, {
    message: "Review needs to be at least 1 character long",
  }),
});

export type ReviewFormData = z.infer<typeof ReviewFormSchema>;
