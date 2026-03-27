import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { LogoIcon, QuestionIcon, SparkleIcon, AnonIcon, HeartIcon } from "@/components/icons";

export function LandingContent() {
  return (
    <div className="min-h-screen bg-[var(--bg-primary)] flex flex-col">
      <header className="flex items-center justify-between px-6 py-4 border-b border-[var(--border-color)]">
        <div className="flex items-center gap-2">
          <LogoIcon size={32} />
          <span className="text-xl font-bold gold-gradient-text">Exotic</span>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/auth/login">
            <Button variant="ghost" size="sm">Log in</Button>
          </Link>
          <Link href="/auth/register">
            <Button size="sm">Get Started</Button>
          </Link>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-4">
        <div className="max-w-2xl mx-auto text-center animate-slide-up">
          <div className="mb-6 flex justify-center">
            <div className="relative">
              <LogoIcon size={80} />
              <div className="absolute -top-1 -right-1">
                <SparkleIcon size={20} className="text-gold-400" />
              </div>
            </div>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
            <span className="gold-gradient-text">Ask anything.</span>
            <br />
            <span className="text-[var(--text-primary)]">Stay anonymous.</span>
          </h1>

          <p className="text-lg text-[var(--text-secondary)] mb-8 max-w-md mx-auto">
            The AI-powered Q&A platform where you can ask and answer questions — anonymously or openly.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/auth/register">
              <Button size="lg" className="w-full sm:w-auto">
                Create your profile
              </Button>
            </Link>
            <Link href="/explore">
              <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                Explore Exotic
              </Button>
            </Link>
          </div>
        </div>

        <div className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl w-full px-4">
          <div className="text-center p-6 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <div className="flex justify-center mb-3">
              <AnonIcon size={32} className="text-gold-500" />
            </div>
            <h3 className="font-semibold mb-1 text-[var(--text-primary)]">Anonymous</h3>
            <p className="text-sm text-[var(--text-secondary)]">Ask questions without revealing your identity</p>
          </div>

          <div className="text-center p-6 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <div className="flex justify-center mb-3">
              <SparkleIcon size={32} className="text-gold-500" />
            </div>
            <h3 className="font-semibold mb-1 text-[var(--text-primary)]">AI-Powered</h3>
            <p className="text-sm text-[var(--text-secondary)]">Get smart answer suggestions powered by AI</p>
          </div>

          <div className="text-center p-6 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <div className="flex justify-center mb-3">
              <HeartIcon size={32} className="text-gold-500" />
            </div>
            <h3 className="font-semibold mb-1 text-[var(--text-primary)]">Social</h3>
            <p className="text-sm text-[var(--text-secondary)]">Like, follow, and discover interesting people</p>
          </div>
        </div>
      </main>

      <footer className="py-6 text-center text-sm text-[var(--text-muted)] border-t border-[var(--border-color)]">
        <span className="gold-gradient-text font-semibold">Exotic</span> — Ask anything, anonymously.
      </footer>
    </div>
  );
}
