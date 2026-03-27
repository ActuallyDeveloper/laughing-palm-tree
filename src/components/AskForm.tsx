"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { askQuestionAction } from "@/lib/actions";
import { Button } from "@/components/ui/Button";
import { Textarea } from "@/components/ui/Textarea";
import { Card } from "@/components/ui/Card";
import { Avatar } from "@/components/ui/Avatar";
import { Toggle } from "@/components/ui/Toggle";
import { SendIcon, AnonIcon, SparkleIcon } from "@/components/icons";

interface AskFormProps {
  recipientName: string;
  recipientUsername: string;
  allowAnonymous: boolean;
  isLoggedIn: boolean;
}

export function AskForm({ recipientName, recipientUsername, allowAnonymous, isLoggedIn }: AskFormProps) {
  const router = useRouter();
  const [content, setContent] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [aiSuggestion, setAiSuggestion] = useState("");
  const [loadingAI, setLoadingAI] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!content.trim()) return;

    setError("");
    setLoading(true);

    const formData = new FormData();
    formData.set("content", content);
    formData.set("recipientUsername", recipientUsername);
    formData.set("isAnonymous", String(isAnonymous && allowAnonymous));

    const result = await askQuestionAction(formData);

    if (result.error) {
      setError(result.error);
      setLoading(false);
    } else {
      setSuccess(true);
      setContent("");
      setLoading(false);
    }
  }

  async function handleAISuggest() {
    if (!content.trim()) return;
    setLoadingAI(true);
    try {
      const res = await fetch("/api/ai/suggest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: content }),
      });
      const data = await res.json();
      setAiSuggestion(data.suggestion || "");
    } catch {
      setAiSuggestion("Could not generate suggestion.");
    }
    setLoadingAI(false);
  }

  if (success) {
    return (
      <div className="max-w-lg mx-auto px-4 py-12">
        <Card className="text-center py-12 animate-fade-in">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-full bg-gold-500/20 flex items-center justify-center">
              <SendIcon size={32} className="text-gold-500" />
            </div>
          </div>
          <h2 className="text-xl font-bold mb-2 text-[var(--text-primary)]">Question sent!</h2>
          <p className="text-[var(--text-secondary)] mb-6">
            Your question has been sent to {recipientName}.
          </p>
          <div className="flex flex-col gap-3 items-center">
            <Button onClick={() => setSuccess(false)} variant="secondary">
              Ask another question
            </Button>
            {isLoggedIn && (
              <Button onClick={() => router.push("/")} variant="ghost">
                Back to feed
              </Button>
            )}
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto px-4 py-6">
      <Card className="animate-slide-up">
        <div className="flex items-center gap-3 mb-6">
          <Avatar name={recipientName} size="lg" />
          <div>
            <h2 className="font-semibold text-lg text-[var(--text-primary)]">{recipientName}</h2>
            <p className="text-sm text-[var(--text-muted)]">@{recipientUsername}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
              {error}
            </div>
          )}

          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder={`Ask ${recipientName} something...`}
            rows={4}
            required
          />

          {allowAnonymous && (
            <div className="flex items-center justify-between p-3 rounded-xl bg-[var(--bg-input)]">
              <div className="flex items-center gap-2">
                <AnonIcon size={18} className="text-gold-500" />
                <span className="text-sm text-[var(--text-secondary)]">Ask anonymously</span>
              </div>
              <Toggle checked={isAnonymous} onChange={setIsAnonymous} />
            </div>
          )}

          {aiSuggestion && (
            <div className="p-4 rounded-xl bg-gold-500/5 border border-gold-500/20">
              <div className="flex items-center gap-2 mb-2">
                <SparkleIcon size={16} className="text-gold-500" />
                <span className="text-sm font-medium text-gold-500">AI Suggestion</span>
              </div>
              <p className="text-sm text-[var(--text-secondary)]">{aiSuggestion}</p>
            </div>
          )}

          <div className="flex gap-3">
            <Button type="submit" className="flex-1" disabled={loading || !content.trim()}>
              <SendIcon size={16} className="mr-2" />
              {loading ? "Sending..." : "Send question"}
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={handleAISuggest}
              disabled={loadingAI || !content.trim()}
            >
              <SparkleIcon size={16} className={loadingAI ? "animate-spin" : ""} />
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
