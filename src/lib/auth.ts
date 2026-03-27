import { cookies } from "next/headers";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";

const SESSION_TOKEN = "exotic_session";

export async function createSession(userId: number) {
  const token = uuidv4();
  const cookieStore = await cookies();
  cookieStore.set(SESSION_TOKEN, `${userId}:${token}`, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 30,
    path: "/",
  });
  return token;
}

export async function getSession() {
  const cookieStore = await cookies();
  const session = cookieStore.get(SESSION_TOKEN);
  if (!session?.value) return null;

  const [userIdStr] = session.value.split(":");
  const userId = parseInt(userIdStr, 10);
  if (isNaN(userId)) return null;

  const user = await db.select().from(users).where(eq(users.id, userId)).get();
  return user || null;
}

export async function destroySession() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_TOKEN);
}

export async function hashPassword(password: string) {
  return bcrypt.hash(password, 10);
}

export async function verifyPassword(password: string, hash: string) {
  return bcrypt.compare(password, hash);
}
