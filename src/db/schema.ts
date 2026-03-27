import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  username: text("username").notNull().unique(),
  displayName: text("display_name").notNull(),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  bio: text("bio").default(""),
  avatarUrl: text("avatar_url").default(""),
  allowAnonymous: integer("allow_anonymous", { mode: "boolean" }).default(true),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

export const questions = sqliteTable("questions", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  content: text("content").notNull(),
  authorId: integer("author_id").references(() => users.id),
  isAnonymous: integer("is_anonymous", { mode: "boolean" }).default(false),
  recipientId: integer("recipient_id").notNull().references(() => users.id),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

export const answers = sqliteTable("answers", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  content: text("content").notNull(),
  questionId: integer("question_id").notNull().references(() => questions.id),
  authorId: integer("author_id").notNull().references(() => users.id),
  isAiGenerated: integer("is_ai_generated", { mode: "boolean" }).default(false),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

export const likes = sqliteTable("likes", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: integer("user_id").notNull().references(() => users.id),
  answerId: integer("answer_id").notNull().references(() => answers.id),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

export const follows = sqliteTable("follows", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  followerId: integer("follower_id").notNull().references(() => users.id),
  followingId: integer("following_id").notNull().references(() => users.id),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});
