import { getSession } from "@/lib/auth";
import { getFeed } from "@/lib/actions";
import { AppShell } from "@/components/layout/AppShell";
import { FeedContent } from "@/components/FeedContent";
import { LandingContent } from "@/components/LandingContent";

export default async function HomePage() {
  const session = await getSession();

  if (!session) {
    return <LandingContent />;
  }

  const feed = await getFeed();

  return (
    <AppShell username={session.username}>
      <FeedContent feed={feed} username={session.username} />
    </AppShell>
  );
}
