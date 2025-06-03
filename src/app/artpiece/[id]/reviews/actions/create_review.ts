"use server";

import { getUser } from "@/app/lib/auth/user";
import sql from "@/app/lib/sql";
import { redirect, RedirectType } from "next/navigation";

export default async function create_review(
  userId: number,
  artpieceId: number,
  content: string,
) {
  if (!(await getUser())) {
    console.error("Non-user trying to create a review");
    return;
  }

  await sql`
    INSERT INTO review (user_id, artpiece_id, content)
    VALUES (${userId}, ${artpieceId}, ${content})
  `;

  // Reload the artpiece page to show the new review
  redirect(`/artpiece/${artpieceId}`, RedirectType.replace);
}
