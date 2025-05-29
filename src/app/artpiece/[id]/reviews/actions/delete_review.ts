"use server";

import sql from "@/app/lib/sql";
import { redirect, RedirectType } from "next/navigation";

export default async function delete_review(
  userId: number,
  artpieceId: number,
) {
  await sql`
    DELETE FROM review
    WHERE user_id = ${userId} AND artpiece_id = ${artpieceId}
  `;

  // Reload the artpiece page to allow the user to make a new review
  redirect(`/artpiece/${artpieceId}`, RedirectType.replace);
}
