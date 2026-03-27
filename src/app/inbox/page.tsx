import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { getUnansweredQuestions } from "@/lib/actions";
import { AppShell } from "@/components/layout/AppShell";
import { InboxContent } from "@/components/InboxContent";

export default async function InboxPage() {
  const session = await getSession();
  if (!session) redirect("/auth/login");

  const questions = await getUnansweredQuestions();

  return (
    <AppShell username={session.username}>
      <InboxContent questions={questions} username={session.username} />
    </AppShell>
  );
}
