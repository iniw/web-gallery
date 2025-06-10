"use server";

import { getUser } from "@/app/lib/auth/user";
import sql from "@/app/lib/sql";
import { revalidatePath } from "next/cache";
import { RatingFormSchema } from "../lib/RatingFormSchema";

export default async function createRating(
  userId: number,
  artpieceId: number,
  _formState: unknown,
  formData: FormData,
) {
  const parse = RatingFormSchema.safeParse({
    value: formData.get("value"),
  });

  if (!parse.success) {
    return {
      errors: parse.error.flatten().fieldErrors,
    };
  }

  if (!(await getUser())) {
    console.error("Non-user trying to create a rating");
    return {
      message: "I know what you are.",
    };
  }

  const { value } = parse.data;

  try {
    await sql`
      INSERT INTO rating (user_id, artpiece_id, value)
      VALUES (${userId}, ${artpieceId}, ${value})
      ON CONFLICT (user_id, artpiece_id)
      DO UPDATE SET value = EXCLUDED.value
    `;
  } catch {
    return {
      message: "Internal error when creating rating",
    };
  }

  revalidatePath(`/artpiece/${artpieceId}`);
}
