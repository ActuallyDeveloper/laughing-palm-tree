"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { answerQuestionAction } from "@/lib/actions";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Textarea } from "@/components/ui/Textarea";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { QuestionIcon, SendIcon, SparkleIcon, AnonIcon } from "@/components/icons";
import { formatDate } from "@/lib/utils";

interface InboxQuestion {
  question: { id: number; content: string; isAnonymous: boolean | null; createdAt: Date | null };
  author: { id: number; username: string; displayName: string; avatarUrl: string | null } | null;
}

export function InboxContent({ questions, username }: { questions: InboxQuestion[]; username: string }) {
  const router = useRouter();
  const [answering, setAnswering] = useState<number | null>(null);
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);

  async function handleAnswer(questionId: number) {
    if (!answer.trim()) return;
    setLoading(true);

    const formData = new FormData();
    formData.set("content", answer);
    formData.set("questionId", String(questionId));

    await answerQuestionAction(formData);
    setAnswer("");
    setAnswering(null);
    setLoading(false);
    router.refresh();
  }

  async function handleAISuggest(questionContent: string) {
    setAiLoading(true);
    try {
      const res = await fetch("/api/ai/suggest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: questionContent }),
      });
      const data = await res.json();
      setAnswer(data.suggestion || "");
    } catch {
      setAnswer("Could not generate suggestion.");
    }
    setAiLoading(false);
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">
            <span className="gold-gradient-text">Inbox</span>
          </h1>
          <p className="text-[var(--text-secondary)] mt-1">
            {questions.length} unanswered question{questions.length !== 1 ? "s" : ""}
          </p>
        </div>
        <div className="p-3 rounded-xl bg-[var(--bg-input)]">
          <code className="text-xs text-gold-500">exotic.app/ask/{username}</code>
        </div>
      </div>

      {questions.length === 0 ? (
        <Card className="text-center py-12 animate-fade-in">
          <QuestionIcon size={48} className="text-[var(--text-muted)] mx-auto mb-4" />
          <h2 className="text-lg font-semibold mb-2 text-[var(--text-primary)]">All caught up!</h2>
          <p className="text-[var(--text-secondary)]">No unanswered questions. Share your link to get more!</p>
        </Card>
      ) : (
        <div className="space-y-4">
          {questions.map((item, i) => (
            <Card key={item.question.id} className="animate-fade-in" style={{ animationDelay: `${i * 0.05}s` }}>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  {item.question.isAnonymous ? (
                    <div className="w-10 h-10 rounded-full bg-[var(--bg-input)] flex items-center justify-center ring-2 ring-gold-500/30">
                      <AnonIcon size={20} className="text-gold-500" />
                    </div>
                  ) : item.author ? (
                    <Avatar src={item.author.avatarUrl || undefined} name={item.author.displayName} size="md" />
                  ) : (
                    <Avatar name="Unknown" size="md" />
                  )}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      {item.question.isAnonymous ? (
                        <Badge variant="gold">Anonymous</Badge>
                      ) : item.author ? (
                        <span className="font-medium text-[var(--text-primary)]">{item.author.displayName}</span>
                      ) : null}
                      <span className="text-xs text-[var(--text-muted)]">{formatDate(item.question.createdAt)}</span>
                    </div>
                    <p className="mt-2 text-[var(--text-primary)]">{item.question.content}</p>
                  </div>
                </div>

                {answering === item.question.id ? (
                  <div className="space-y-3 animate-fade-in">
                    <Textarea
                      value={answer}
                      onChange={(e) => setAnswer(e.target.value)}
                      placeholder="Write your answer..."
                      rows={3}
                    />
                    <div className="flex gap-2">
                      <Button onClick={() => handleAnswer(item.question.id)} disabled={loading || !answer.trim()} size="sm">
                        <SendIcon size={14} className="mr-2" />
                        {loading ? "Sending..." : "Reply"}
                      </Button>
                      <Button variant="secondary" size="sm" onClick={() => handleAISuggest(item.question.content)} disabled={aiLoading}>
                        <SparkleIcon size={14} className={`mr-1 ${aiLoading ? "animate-spin" : ""}`} />
                        AI Suggest
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => { setAnswering(null); setAnswer(""); }}>
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <Button size="sm" onClick={() => setAnswering(item.question.id)}>
                      Answer
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleAISuggest(item.question.content)}>
                      <SparkleIcon size={14} className="mr-1" />
                      AI Help
                    </Button>
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
