"use server";

import { getUser } from "@/app/lib/auth/user";
import sql from "@/app/lib/sql";
import { revalidatePath } from "next/cache";

export default async function deleteReview(
  userId: number,
  artpieceId: number,
  _formState: unknown,
  _formData: FormData,
) {
  if (!(await getUser())) {
    console.error("Non-user trying to delete a review");
    return {
      message: "I know what you are.",
    };
  }

  try {
    await sql`
      DELETE FROM review
      WHERE user_id = ${userId} AND artpiece_id = ${artpieceId}
    `;
  } catch {
    return {
      message: "Internal error when deleting review.",
    };
  }

  revalidatePath(`/artpiece/${artpieceId}`);
}
