"use server";

import { getUser } from "@/app/lib/auth/user";
import sql from "@/app/lib/sql";
import { revalidatePath } from "next/cache";
import { CommentFormSchema } from "../lib/CommentFormSchema";

export default async function createComment(
  userId: number,
  artpieceId: number,
  _formState: unknown,
  formData: FormData,
) {
  const parse = CommentFormSchema.safeParse({
    content: formData.get("content"),
  });

  if (!parse.success) {
    return {
      errors: parse.error.flatten().fieldErrors,
    };
  }

  if (!(await getUser())) {
    console.error("Non-user trying to create a comment");
    return {
      message: "I know what you are.",
    };
  }

  const { content } = parse.data;

  try {
    await sql`
      INSERT INTO comment (user_id, artpiece_id, content)
      VALUES (${userId}, ${artpieceId}, ${content})
    `;
  } catch {
    return {
      message: "Internal error when creating comment.",
    };
  }

  revalidatePath(`/artpiece/${artpieceId}`);
}
