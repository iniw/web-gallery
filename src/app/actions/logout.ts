"use server";

import { deleteSession } from "@/app/lib/auth/session";
import { redirect } from "next/navigation";

export default async function logout() {
  await deleteSession();
  redirect("/login");
}
