"use server";

import { db } from "@/db";
import { users, questions, answers, likes, follows } from "@/db/schema";
import { eq, desc, and, sql } from "drizzle-orm";
import { hashPassword, verifyPassword, createSession, destroySession, getSession } from "@/lib/auth";

export async function registerAction(formData: FormData) {
  const username = formData.get("username") as string;
  const displayName = formData.get("displayName") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!username || !email || !password || !displayName) {
    return { error: "All fields are required" };
  }

  const existingUser = await db.select().from(users).where(eq(users.email, email)).get();
  if (existingUser) {
    return { error: "Email already registered" };
  }

  const existingUsername = await db.select().from(users).where(eq(users.username, username)).get();
  if (existingUsername) {
    return { error: "Username already taken" };
  }

  const passwordHash = await hashPassword(password);
  const user = await db
    .insert(users)
    .values({ username, displayName, email, passwordHash })
    .returning()
    .get();

  await createSession(user.id);
  return { success: true, userId: user.id };
}

export async function loginAction(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { error: "Email and password are required" };
  }

  const user = await db.select().from(users).where(eq(users.email, email)).get();
  if (!user) {
    return { error: "Invalid credentials" };
  }

  const valid = await verifyPassword(password, user.passwordHash);
  if (!valid) {
    return { error: "Invalid credentials" };
  }

  await createSession(user.id);
  return { success: true, userId: user.id };
}

export async function logoutAction() {
  await destroySession();
  return { success: true };
}

export async function askQuestionAction(formData: FormData) {
  const session = await getSession();
  const content = formData.get("content") as string;
  const recipientUsername = formData.get("recipientUsername") as string;
  const isAnonymous = formData.get("isAnonymous") === "true";

  if (!content || !recipientUsername) {
    return { error: "Question content and recipient are required" };
  }

  const recipient = await db
    .select()
    .from(users)
    .where(eq(users.username, recipientUsername))
    .get();

  if (!recipient) {
    return { error: "User not found" };
  }

  if (!recipient.allowAnonymous && isAnonymous) {
    return { error: "This user does not accept anonymous questions" };
  }

  await db.insert(questions).values({
    content,
    authorId: session?.id || null,
    isAnonymous,
    recipientId: recipient.id,
  });

  return { success: true };
}

export async function answerQuestionAction(formData: FormData) {
  const session = await getSession();
  if (!session) return { error: "Must be logged in" };

  const content = formData.get("content") as string;
  const questionId = parseInt(formData.get("questionId") as string, 10);

  if (!content || isNaN(questionId)) {
    return { error: "Answer content and question ID are required" };
  }

  const question = await db.select().from(questions).where(eq(questions.id, questionId)).get();
  if (!question) return { error: "Question not found" };
  if (question.recipientId !== session.id) return { error: "Not your question to answer" };

  await db.insert(answers).values({
    content,
    questionId,
    authorId: session.id,
  });

  return { success: true };
}

export async function likeAnswerAction(answerId: number) {
  const session = await getSession();
  if (!session) return { error: "Must be logged in" };

  const existing = await db
    .select()
    .from(likes)
    .where(and(eq(likes.userId, session.id), eq(likes.answerId, answerId)))
    .get();

  if (existing) {
    await db.delete(likes).where(eq(likes.id, existing.id));
    return { success: true, action: "unliked" };
  }

  await db.insert(likes).values({ userId: session.id, answerId });
  return { success: true, action: "liked" };
}

export async function followUserAction(userId: number) {
  const session = await getSession();
  if (!session) return { error: "Must be logged in" };
  if (session.id === userId) return { error: "Cannot follow yourself" };

  const existing = await db
    .select()
    .from(follows)
    .where(and(eq(follows.followerId, session.id), eq(follows.followingId, userId)))
    .get();

  if (existing) {
    await db.delete(follows).where(eq(follows.id, existing.id));
    return { success: true, action: "unfollowed" };
  }

  await db.insert(follows).values({ followerId: session.id, followingId: userId });
  return { success: true, action: "followed" };
}

export async function updateProfileAction(formData: FormData) {
  const session = await getSession();
  if (!session) return { error: "Must be logged in" };

  const displayName = formData.get("displayName") as string;
  const bio = formData.get("bio") as string;
  const allowAnonymous = formData.get("allowAnonymous") === "true";

  await db
    .update(users)
    .set({
      displayName: displayName || session.displayName,
      bio: bio ?? session.bio,
      allowAnonymous,
    })
    .where(eq(users.id, session.id));

  return { success: true };
}

export async function getFeed() {
  const session = await getSession();
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
    .limit(50)
    .all();

  const feedWithLikes = await Promise.all(
    feed.map(async (item) => {
      const likeCount = await db
        .select({ count: sql<number>`count(*)` })
        .from(likes)
        .where(eq(likes.answerId, item.answer.id))
        .get();

      let isLiked = false;
      if (session) {
        const liked = await db
          .select()
          .from(likes)
          .where(and(eq(likes.userId, session.id), eq(likes.answerId, item.answer.id)))
          .get();
        isLiked = !!liked;
      }

      return { ...item, likeCount: likeCount?.count || 0, isLiked };
    })
  );

  return feedWithLikes;
}

export async function getUserProfile(username: string) {
  const user = await db.select().from(users).where(eq(users.username, username)).get();
  if (!user) return null;

  const userQuestions = await db
    .select({
      question: questions,
      answer: answers,
    })
    .from(questions)
    .leftJoin(answers, eq(questions.id, answers.questionId))
    .where(eq(questions.recipientId, user.id))
    .orderBy(desc(questions.createdAt))
    .limit(50)
    .all();

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

  return {
    user,
    questions: userQuestions,
    followerCount: followerCount?.count || 0,
    followingCount: followingCount?.count || 0,
  };
}

export async function getUnansweredQuestions() {
  const session = await getSession();
  if (!session) return [];

  const unanswered = await db
    .select({
      question: questions,
      author: users,
    })
    .from(questions)
    .leftJoin(users, eq(questions.authorId, users.id))
    .where(
      and(
        eq(questions.recipientId, session.id),
        sql`NOT EXISTS (SELECT 1 FROM answers WHERE answers.question_id = questions.id)`
      )
    )
    .orderBy(desc(questions.createdAt))
    .all();

  return unanswered;
}

export async function getExploreUsers() {
  const topUsers = await db
    .select({
      user: users,
      questionCount: sql<number>`(SELECT COUNT(*) FROM questions WHERE questions.recipient_id = users.id)`,
    })
    .from(users)
    .orderBy(desc(sql`questionCount`))
    .limit(20)
    .all();

  return topUsers;
}
