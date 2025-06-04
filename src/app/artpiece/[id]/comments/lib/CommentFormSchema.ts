import { z } from "zod";

export const CommentFormSchema = z.object({
  content: z.string().trim().min(1, {
    message: "Comment needs to be at least 1 character long",
  }),
});

export type CommentFormData = z.infer<typeof CommentFormSchema>;
