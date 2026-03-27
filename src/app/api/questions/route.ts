import { NextResponse } from "next/server";
import { db } from "@/db";
import { questions, answers, users } from "@/db/schema";
import { desc, eq } from "drizzle-orm";

export async function GET() {
  try {
    const feed = await db
      .select({
        answer: answers,
        question: questions,
        author: users,
      })
      .from(answers)
      .innerJoin(questions, eq(answers.questionId, questions.id))
      .innerJoin(users, eq(answers.authorId, users.id))
      .orderBy(desc(answers.createdAt))
      .limit(50);

    const feedWithLikes = feed.map((item) => ({
      ...item,
      likeCount: 0,
    }));

    return NextResponse.json({ feed: feedWithLikes });
  } catch (err) {
    console.error("Questions API failed:", err);
    return NextResponse.json({ feed: [] });
  }
}
