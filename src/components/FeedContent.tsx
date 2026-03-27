"use client";

import { Card } from "@/components/ui/Card";
import { Avatar } from "@/components/ui/Avatar";
import { HeartIcon, AnswerIcon, SparkleIcon } from "@/components/icons";
import { likeAnswerAction } from "@/lib/actions";
import { formatDate } from "@/lib/utils";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface FeedItem {
  answer: { id: number; content: string; createdAt: Date | null; isAiGenerated: boolean | null };
  question: { id: number; content: string; isAnonymous: boolean | null };
  author: { id: number; username: string; displayName: string; avatarUrl: string | null };
  likeCount: number;
  isLiked: boolean;
}

export function FeedContent({ feed, username }: { feed: FeedItem[]; username: string }) {
  const router = useRouter();
  const [likes, setLikes] = useState<Record<number, { count: number; liked: boolean }>>(() => {
    const map: Record<number, { count: number; liked: boolean }> = {};
    feed.forEach((item) => {
      map[item.answer.id] = { count: item.likeCount, liked: item.isLiked };
    });
    return map;
  });

  async function handleLike(answerId: number) {
    setLikes((prev) => ({
      ...prev,
      [answerId]: {
        count: prev[answerId]?.liked ? prev[answerId].count - 1 : (prev[answerId]?.count || 0) + 1,
        liked: !prev[answerId]?.liked,
      },
    }));
    await likeAnswerAction(answerId);
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">
        <span className="gold-gradient-text">Feed</span>
      </h1>

      {feed.length === 0 ? (
        <Card className="text-center py-12">
          <AnswerIcon size={48} className="text-[var(--text-muted)] mx-auto mb-4" />
          <h2 className="text-lg font-semibold mb-2 text-[var(--text-primary)]">No answers yet</h2>
          <p className="text-[var(--text-secondary)]">Share your profile link to start receiving questions!</p>
          <div className="mt-4 p-3 rounded-xl bg-[var(--bg-input)] inline-block">
            <code className="text-sm text-gold-500">exotic.app/ask/{username}</code>
          </div>
        </Card>
      ) : (
        <div className="space-y-4">
          {feed.map((item, i) => (
            <Card key={item.answer.id} className="animate-fade-in" style={{ animationDelay: `${i * 0.05}s` }}>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Avatar
                    src={item.author.avatarUrl || undefined}
                    name={item.author.displayName}
                    size="md"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-semibold text-[var(--text-primary)]">
                        {item.author.displayName}
                      </span>
                      <span className="text-sm text-[var(--text-muted)]">
                        @{item.author.username}
                      </span>
                      <span className="text-sm text-[var(--text-muted)]">
                        · {formatDate(item.answer.createdAt)}
                      </span>
                    </div>
                    <p className="text-sm text-[var(--text-muted)] mt-0.5">
                      {item.question.isAnonymous ? "Anonymously asked:" : "Asked:"}
                    </p>
                    <p className="text-[var(--text-secondary)] mt-1 font-medium">
                      {item.question.content}
                    </p>
                  </div>
                </div>

                <div className="ml-12 pl-3 border-l-2 border-gold-500/30">
                  <p className="text-[var(--text-primary)]">{item.answer.content}</p>
                  {item.answer.isAiGenerated ? (
                    <span className="inline-flex items-center gap-1 mt-2 text-xs text-gold-500">
                      <SparkleIcon size={12} /> AI-assisted
                    </span>
                  ) : null}
                </div>

                <div className="ml-12 flex items-center gap-4">
                  <button
                    onClick={() => handleLike(item.answer.id)}
                    className="flex items-center gap-1.5 text-sm transition-colors"
                    style={{ color: likes[item.answer.id]?.liked ? "#D4AF37" : "var(--text-muted)" }}
                  >
                    <HeartIcon size={16} filled={likes[item.answer.id]?.liked || false} />
                    <span>{likes[item.answer.id]?.count || 0}</span>
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
