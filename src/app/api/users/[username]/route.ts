import { NextResponse } from "next/server";
import { db } from "@/db";
import { users, questions, answers, follows } from "@/db/schema";
import { eq, sql } from "drizzle-orm";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ username: string }> }
) {
  try {
    const { username } = await params;

    const userResult = await db
      .select()
      .from(users)
      .where(eq(users.username, username))
      .limit(1);

    if (userResult.length === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const user = userResult[0];

    const questionCountResult = await db
      .select({ count: sql<number>`count(*)::int` })
      .from(questions)
      .where(eq(questions.recipientId, user.id));

    const answerCountResult = await db
      .select({ count: sql<number>`count(*)::int` })
      .from(answers)
      .where(eq(answers.authorId, user.id));

    const followerCountResult = await db
      .select({ count: sql<number>`count(*)::int` })
      .from(follows)
      .where(eq(follows.followingId, user.id));

    const followingCountResult = await db
      .select({ count: sql<number>`count(*)::int` })
      .from(follows)
      .where(eq(follows.followerId, user.id));

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
        questions: questionCountResult[0]?.count || 0,
        answers: answerCountResult[0]?.count || 0,
        followers: followerCountResult[0]?.count || 0,
        following: followingCountResult[0]?.count || 0,
      },
    });
  } catch (err) {
    console.error("Users API failed:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
