"use server";

import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

type Payload = {
  userId: number;
  expiresAt: Date;
};

const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

export async function encrypt(payload: Payload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey);
}

export async function decrypt(session: string | undefined = "") {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error) {
    console.log(`Failed to verify session (${error})`);
  }
}

const sessionDuration = 7 * 24 * 60 * 60 * 1000;

export async function createSession(userId: number) {
  const expires = new Date(Date.now() + sessionDuration);
  const session = await encrypt({ userId, expiresAt: expires });
  const cookieStore = await cookies();
  cookieStore.set("session", session, {
    httpOnly: true,
    secure: true,
    expires: expires,
    sameSite: "lax",
    path: "/",
  });
}

export async function updateSession() {
  const cookieStore = await cookies();

  const session = cookieStore.get("session")?.value;
  const payload = await decrypt(session);

  if (!session || !payload) return null;

  cookieStore.set("session", session, {
    httpOnly: true,
    secure: true,
    expires: new Date(Date.now() + sessionDuration),
    sameSite: "lax",
    path: "/",
  });
}

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete("session");
}
