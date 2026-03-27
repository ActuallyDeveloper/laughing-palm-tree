import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { CompassIcon, QuestionIcon } from "@/components/icons";

interface ExploreUser {
  user: { id: number; username: string; displayName: string; bio: string | null; avatarUrl: string | null };
  questionCount: number;
}

export function ExploreContent({ users, currentUserId }: { users: ExploreUser[]; currentUserId?: number }) {
  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">
          <span className="gold-gradient-text">Explore</span>
        </h1>
        <p className="text-[var(--text-secondary)] mt-1">Discover interesting people to ask questions</p>
      </div>

      {users.length === 0 ? (
        <Card className="text-center py-12">
          <CompassIcon size={48} className="text-[var(--text-muted)] mx-auto mb-4" />
          <h2 className="text-lg font-semibold mb-2 text-[var(--text-primary)]">No users yet</h2>
          <p className="text-[var(--text-secondary)]">Be the first to create a profile!</p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {users.map(({ user, questionCount }, i) => (
            <Card key={user.id} hover className="animate-fade-in" style={{ animationDelay: `${i * 0.05}s` }}>
              <div className="flex items-start gap-3">
                <Avatar
                  src={user.avatarUrl || undefined}
                  name={user.displayName}
                  size="lg"
                />
                <div className="flex-1 min-w-0">
                  <Link href={`/profile/${user.username}`} className="hover:text-gold-500 transition-colors">
                    <h3 className="font-semibold truncate text-[var(--text-primary)]">
                      {user.displayName}
                    </h3>
                  </Link>
                  <p className="text-sm text-[var(--text-muted)]">@{user.username}</p>
                  {user.bio && (
                    <p className="text-sm text-[var(--text-secondary)] mt-1 line-clamp-2">
                      {user.bio}
                    </p>
                  )}
                  <div className="flex items-center gap-1 mt-2 text-xs text-[var(--text-muted)]">
                    <QuestionIcon size={14} />
                    <span>{questionCount} questions</span>
                  </div>
                </div>
              </div>
              {user.id !== currentUserId && (
                <div className="mt-3 pt-3 border-t border-[var(--border-color)]">
                  <Link href={`/ask/${user.username}`}>
                    <Button variant="secondary" size="sm" className="w-full">
                      Ask a question
                    </Button>
                  </Link>
                </div>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
