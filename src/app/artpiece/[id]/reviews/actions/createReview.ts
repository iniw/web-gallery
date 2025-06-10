"use server";

import { getUser } from "@/app/lib/auth/user";
import sql from "@/app/lib/sql";
import { revalidatePath } from "next/cache";
import { ReviewFormSchema } from "../lib/ReviewFormSchema";

export default async function createReview(
  userId: number,
  artpieceId: number,
  _formState: unknown,
  formData: FormData,
) {
  const parse = ReviewFormSchema.safeParse({
    content: formData.get("content"),
  });

  if (!parse.success) {
    return {
      errors: parse.error.flatten().fieldErrors,
    };
  }

  if (!(await getUser())) {
    console.error("Non-user trying to create a review");
    return {
      message: "I know what you are.",
    };
  }

  const { content } = parse.data;

  try {
    await sql`
      INSERT INTO review (user_id, artpiece_id, content)
      VALUES (${userId}, ${artpieceId}, ${content})
      ON CONFLICT (user_id, artpiece_id)
      DO UPDATE SET content = EXCLUDED.content
    `;
  } catch {
    return {
      message: "Internal error when creating review",
    };
  }

  revalidatePath(`/artpiece/${artpieceId}`);
}
