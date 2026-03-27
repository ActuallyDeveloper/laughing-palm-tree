"use client";

import Link from "next/link";
import { useState } from "react";
import { followUserAction } from "@/lib/actions";
import { Card } from "@/components/ui/Card";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { HeartIcon, QuestionIcon, AnswerIcon, AnonIcon, SparkleIcon } from "@/components/icons";
import { formatDate, truncate } from "@/lib/utils";

interface ProfileData {
  user: { id: number; username: string; displayName: string; bio: string | null; avatarUrl: string | null; allowAnonymous: boolean | null };
  questions: Array<{
    question: { id: number; content: string; isAnonymous: boolean | null; createdAt: Date | null };
    answer: { id: number; content: string; isAiGenerated: boolean | null; createdAt: Date | null } | null;
  }>;
  followerCount: number;
  followingCount: number;
}

export function ProfileContent({
  profile,
  isOwnProfile,
  isLoggedIn,
  currentUserId,
}: {
  profile: ProfileData;
  isOwnProfile: boolean;
  isLoggedIn: boolean;
  currentUserId?: number;
}) {
  const [isFollowing, setIsFollowing] = useState(false);
  const [followerCount, setFollowerCount] = useState(profile.followerCount);

  async function handleFollow() {
    if (!currentUserId) return;
    setIsFollowing(!isFollowing);
    setFollowerCount((prev) => (isFollowing ? prev - 1 : prev + 1));
    await followUserAction(profile.user.id);
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <Card className="mb-6 animate-slide-up">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
          <Avatar
            src={profile.user.avatarUrl || undefined}
            name={profile.user.displayName}
            size="xl"
          />
          <div className="flex-1 text-center sm:text-left">
            <h1 className="text-2xl font-bold text-[var(--text-primary)]">
              {profile.user.displayName}
            </h1>
            <p className="text-[var(--text-muted)]">@{profile.user.username}</p>

            {profile.user.bio && (
              <p className="mt-2 text-[var(--text-secondary)]">{profile.user.bio}</p>
            )}

            <div className="flex items-center gap-4 mt-3 justify-center sm:justify-start">
              <span className="text-sm">
                <span className="font-semibold text-[var(--text-primary)]">{followerCount}</span>{" "}
                <span className="text-[var(--text-muted)]">followers</span>
              </span>
              <span className="text-sm">
                <span className="font-semibold text-[var(--text-primary)]">{profile.followingCount}</span>{" "}
                <span className="text-[var(--text-muted)]">following</span>
              </span>
              <span className="text-sm">
                <span className="font-semibold text-[var(--text-primary)]">{profile.questions.length}</span>{" "}
                <span className="text-[var(--text-muted)]">questions</span>
              </span>
            </div>
          </div>

          <div className="flex gap-2">
            {isOwnProfile ? (
              <Link href="/settings">
                <Button variant="secondary" size="sm">Edit profile</Button>
              </Link>
            ) : isLoggedIn ? (
              <>
                <Link href={`/ask/${profile.user.username}`}>
                  <Button size="sm">Ask</Button>
                </Link>
                <Button
                  variant={isFollowing ? "secondary" : "ghost"}
                  size="sm"
                  onClick={handleFollow}
                >
                  {isFollowing ? "Following" : "Follow"}
                </Button>
              </>
            ) : (
              <Link href={`/ask/${profile.user.username}`}>
                <Button size="sm">Ask</Button>
              </Link>
            )}
          </div>
        </div>
      </Card>

      {profile.questions.length === 0 ? (
        <Card className="text-center py-12">
          <QuestionIcon size={48} className="text-[var(--text-muted)] mx-auto mb-4" />
          <h2 className="text-lg font-semibold mb-2 text-[var(--text-primary)]">No questions yet</h2>
          <p className="text-[var(--text-secondary)]">
            {isOwnProfile
              ? "Share your link to start receiving questions!"
              : "Be the first to ask a question!"}
          </p>
          {!isOwnProfile && (
            <Link href={`/ask/${profile.user.username}`}>
              <Button className="mt-4">Ask a question</Button>
            </Link>
          )}
        </Card>
      ) : (
        <div className="space-y-4">
          {profile.questions.map((item, i) => (
            <Card key={item.question.id} className="animate-fade-in" style={{ animationDelay: `${i * 0.05}s` }}>
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <QuestionIcon size={18} className="text-gold-500 mt-0.5 shrink-0" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      {item.question.isAnonymous ? (
                        <Badge variant="gold">Anonymous</Badge>
                      ) : (
                        <Badge>Question</Badge>
                      )}
                      <span className="text-xs text-[var(--text-muted)]">
                        {formatDate(item.question.createdAt)}
                      </span>
                    </div>
                    <p className="mt-1 text-[var(--text-primary)] font-medium">
                      {item.question.content}
                    </p>
                  </div>
                </div>

                {item.answer ? (
                  <div className="ml-6 pl-4 border-l-2 border-gold-500/30">
                    <div className="flex items-center gap-2 mb-1">
                      <AnswerIcon size={14} className="text-gold-500" />
                      <span className="text-xs text-[var(--text-muted)]">
                        {formatDate(item.answer.createdAt)}
                      </span>
                      {item.answer.isAiGenerated ? (
                        <Badge variant="gold"><SparkleIcon size={10} className="mr-1" /> AI</Badge>
                      ) : null}
                    </div>
                    <p className="text-[var(--text-secondary)]">{item.answer.content}</p>
                  </div>
                ) : isOwnProfile ? (
                  <div className="ml-6 pl-4 border-l-2 border-[var(--border-color)]">
                    <p className="text-sm text-[var(--text-muted)] italic">Not answered yet</p>
                  </div>
                ) : null}
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
