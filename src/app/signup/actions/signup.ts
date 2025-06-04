"use server";

import { createSession } from "@/app/lib/auth/session";
import sql from "@/app/lib/sql";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";
import { SignupFormSchema } from "../lib/SignUpFormSchema";

export default async function signup(_formState: unknown, formData: FormData) {
  const parse = SignupFormSchema.safeParse({
    username: formData.get("username"),
    password: formData.get("password"),
  });

  if (!parse.success) {
    return {
      errors: parse.error.flatten().fieldErrors,
    };
  }

  const { username, password } = parse.data;
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
  }

  redirect("/");
}
