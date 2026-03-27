import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { AppShell } from "@/components/layout/AppShell";
import { Card } from "@/components/ui/Card";
import { BellIcon } from "@/components/icons";

export default async function NotificationsPage() {
  const session = await getSession();
  if (!session) redirect("/auth/login");

  return (
    <AppShell username={session.username}>
      <div className="max-w-2xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-6">
          <span className="gold-gradient-text">Notifications</span>
        </h1>
        <Card className="text-center py-12 animate-fade-in">
          <BellIcon size={48} className="text-[var(--text-muted)] mx-auto mb-4" />
          <h2 className="text-lg font-semibold mb-2 text-[var(--text-primary)]">All clear!</h2>
          <p className="text-[var(--text-secondary)]">No new notifications right now.</p>
        </Card>
      </div>
    </AppShell>
  );
}
