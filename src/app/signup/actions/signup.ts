"use server";

import { SignupDataSchema } from "../lib/schema";
import bcrypt from "bcrypt";
import sql from "@/app/lib/sql";
import { createSession } from "@/app/lib/session";
import { redirect } from "next/navigation";

export default async function signup(_: unknown, formData: FormData) {
  const fields = SignupDataSchema.safeParse({
    username: formData.get("username"),
    password: formData.get("password"),
  });

  if (!fields.success) {
    return {
      errors: fields.error.flatten().fieldErrors,
    };
  }

  const { username, password } = fields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const [row] = await sql`
      INSERT INTO app_user (username, password, user_role)
      VALUES (${username}, ${hashedPassword}, 'user')
      RETURNING app_user.id
    `;

    await createSession(row.id);
  } catch {
    return {
      message: "Username must be unique.",
    };
  } finally {
    redirect("/");
  }
}
