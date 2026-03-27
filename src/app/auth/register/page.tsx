"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { registerAction } from "@/lib/actions";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";
import { LogoIcon } from "@/components/icons";

export default function RegisterPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      const result = await registerAction(formData);

      if (result.error) {
        setError(result.error);
        setLoading(false);
      } else {
        window.location.href = "/";
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] flex flex-col items-center justify-center px-4 py-8">
      <div className="w-full max-w-sm animate-slide-up">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <LogoIcon size={48} />
          </div>
          <h1 className="text-2xl font-bold">
            <span className="gold-gradient-text">Join Exotic</span>
          </h1>
          <p className="text-[var(--text-secondary)] mt-1">Create your profile and start asking</p>
        </div>

        <Card>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
                {error}
              </div>
            )}

            <Input
              name="displayName"
              type="text"
              label="Display Name"
              placeholder="Your name"
              required
            />

            <Input
              name="username"
              type="text"
              label="Username"
              placeholder="yourname"
              required
              pattern="[a-zA-Z0-9_]+"
              title="Only letters, numbers, and underscores"
            />

            <Input
              name="email"
              type="email"
              label="Email"
              placeholder="you@example.com"
              required
            />

            <Input
              name="password"
              type="password"
              label="Password"
              placeholder="••••••••"
              required
              minLength={6}
            />

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Creating account..." : "Create account"}
            </Button>
          </form>

          <div className="mt-4 text-center text-sm text-[var(--text-secondary)]">
            Already have an account?{" "}
            <Link href="/auth/login" className="text-gold-500 hover:text-gold-400 font-medium">
              Sign in
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}
