import { NextResponse } from "next/server";
import { db } from "@/db";
import { users, questions, answers, follows } from "@/db/schema";
import { eq, sql } from "drizzle-orm";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ username: string }> }
) {
  const { username } = await params;

  const user = await db
    .select()
    .from(users)
    .where(eq(users.username, username))
    .get();

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const questionCount = await db
    .select({ count: sql<number>`count(*)` })
    .from(questions)
    .where(eq(questions.recipientId, user.id))
    .get();

  const answerCount = await db
    .select({ count: sql<number>`count(*)` })
    .from(answers)
    .where(eq(answers.authorId, user.id))
    .get();

  const followerCount = await db
    .select({ count: sql<number>`count(*)` })
    .from(follows)
    .where(eq(follows.followingId, user.id))
    .get();

  const followingCount = await db
    .select({ count: sql<number>`count(*)` })
    .from(follows)
    .where(eq(follows.followerId, user.id))
    .get();

  return NextResponse.json({
    user: {
      id: user.id,
      username: user.username,
      displayName: user.displayName,
      bio: user.bio,
      avatarUrl: user.avatarUrl,
      createdAt: user.createdAt,
    },
    stats: {
      questions: questionCount?.count || 0,
      answers: answerCount?.count || 0,
      followers: followerCount?.count || 0,
      following: followingCount?.count || 0,
    },
  });
}
