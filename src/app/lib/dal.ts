"use server";

import { cookies } from "next/headers";
import { decrypt } from "@/app/lib/session";
import { cache } from "react";
import sql from "./sql";

export const sessionUserId = cache(async (): Promise<number | undefined> => {
  const cookie = (await cookies()).get("session")?.value;
  const session = await decrypt(cookie);
  return session?.userId as number | undefined;
});

export type User = {
  id: number;
  username: string;
  user_role: "admin" | "user";
};

export const getUser = cache(async (): Promise<User | undefined> => {
  const userId = await sessionUserId();
  if (!userId) return undefined;

  try {
    const [row] = await sql`
      SELECT username, user_role
      FROM app_user
      WHERE id = ${userId}
    `;

    if (!row) return undefined;

    return {
      id: userId,
      username: row.username,
      user_role: row.user_role,
    };
  } catch (error) {
    console.log(`Failed to fetch user (error: ${error})`);
    return undefined;
  }
});
