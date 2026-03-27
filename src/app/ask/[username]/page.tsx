import { getSession } from "@/lib/auth";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { AppShell } from "@/components/layout/AppShell";
import { AskForm } from "@/components/AskForm";
import { notFound } from "next/navigation";

export default async function AskPage({ params }: { params: Promise<{ username: string }> }) {
  const { username } = await params;
  const session = await getSession();
  const recipientResult = await db.select().from(users).where(eq(users.username, username)).limit(1);

  if (recipientResult.length === 0) notFound();

  const recipient = recipientResult[0];

  return (
    <AppShell username={session?.username}>
      <AskForm
        recipientName={recipient.displayName}
        recipientUsername={recipient.username}
        allowAnonymous={recipient.allowAnonymous ?? true}
        isLoggedIn={!!session}
      />
    </AppShell>
  );
}
