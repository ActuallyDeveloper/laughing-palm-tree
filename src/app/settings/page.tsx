import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { AppShell } from "@/components/layout/AppShell";
import { SettingsContent } from "@/components/SettingsContent";

export default async function SettingsPage() {
  const session = await getSession();
  if (!session) redirect("/auth/login");

  return (
    <AppShell username={session.username}>
      <SettingsContent user={session} />
    </AppShell>
  );
}
