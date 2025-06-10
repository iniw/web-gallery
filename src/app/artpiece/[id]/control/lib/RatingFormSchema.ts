import { z } from "zod";

export const RatingFormSchema = z.object({
  value: z.coerce.number().min(0).max(10, {
    message: "Rating must be between 0 and 10",
  }),
});

export type RatingFormData = z.infer<typeof RatingFormSchema>;
