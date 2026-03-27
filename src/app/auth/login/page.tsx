"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { loginAction } from "@/lib/actions";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";
import { LogoIcon, SparkleIcon } from "@/components/icons";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const result = await loginAction(formData);

    if (result.error) {
      setError(result.error);
      setLoading(false);
    } else {
      router.push("/");
      router.refresh();
    }
  }

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-sm animate-slide-up">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <LogoIcon size={48} />
          </div>
          <h1 className="text-2xl font-bold">
            <span className="gold-gradient-text">Welcome back</span>
          </h1>
          <p className="text-[var(--text-secondary)] mt-1">Sign in to your Exotic account</p>
        </div>

        <Card>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
                {error}
              </div>
            )}

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
            />

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Signing in..." : "Sign in"}
            </Button>
          </form>

          <div className="mt-4 text-center text-sm text-[var(--text-secondary)]">
            Don&apos;t have an account?{" "}
            <Link href="/auth/register" className="text-gold-500 hover:text-gold-400 font-medium">
              Sign up
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}
