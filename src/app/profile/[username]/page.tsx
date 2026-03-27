import { getSession } from "@/lib/auth";
import { getUserProfile } from "@/lib/actions";
import { AppShell } from "@/components/layout/AppShell";
import { ProfileContent } from "@/components/ProfileContent";
import { notFound } from "next/navigation";

export default async function ProfilePage({ params }: { params: Promise<{ username: string }> }) {
  const { username } = await params;
  const session = await getSession();
  const profile = await getUserProfile(username);

  if (!profile) notFound();

  return (
    <AppShell username={session?.username}>
      <ProfileContent
        profile={profile}
        isOwnProfile={session?.id === profile.user.id}
        isLoggedIn={!!session}
        currentUserId={session?.id}
      />
    </AppShell>
  );
}
