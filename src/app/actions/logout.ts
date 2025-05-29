"use server";

import { redirect } from "next/navigation";
import { deleteSession } from "../lib/session";

export default async function logout() {
  await deleteSession();
  redirect("/login");
}
