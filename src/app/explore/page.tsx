import { getSession } from "@/lib/auth";
import { getExploreUsers } from "@/lib/actions";
import { AppShell } from "@/components/layout/AppShell";
import { ExploreContent } from "@/components/ExploreContent";

export default async function ExplorePage() {
  const session = await getSession();
  const users = await getExploreUsers();

  return (
    <AppShell username={session?.username}>
      <ExploreContent users={users} currentUserId={session?.id} />
    </AppShell>
  );
}
