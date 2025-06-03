"use server";

import { getUser } from "@/app/lib/auth/user";
import sql from "@/app/lib/sql";
import { redirect, RedirectType } from "next/navigation";

export default async function update_review(
  userId: number,
  artpieceId: number,
  content: string,
) {
  if (!(await getUser())) {
    console.error("Non-user trying to update a review");
    return;
  }

  await sql`
    UPDATE review
    SET content = ${content}
    WHERE user_id = ${userId} AND artpiece_id = ${artpieceId}
  `;

  // Reload the artpiece page to show the new review
  redirect(`/artpiece/${artpieceId}`, RedirectType.replace);
}
