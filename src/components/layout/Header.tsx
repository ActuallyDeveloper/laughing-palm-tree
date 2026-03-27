"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { useSyncExternalStore, useState } from "react";
import { MoonIcon, SunIcon, MenuIcon, CloseIcon, LogoIcon } from "@/components/icons";
import { Button } from "@/components/ui/Button";

function useMounted() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
}

interface HeaderProps {
  username?: string;
  onLogout?: () => void;
}

export function Header({ username, onLogout }: HeaderProps) {
  const { theme, setTheme } = useTheme();
  const mounted = useMounted();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="lg:hidden sticky top-0 z-40 bg-[var(--bg-primary)] border-b border-[var(--border-color)] glass-effect">
      <div className="flex items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2">
          <LogoIcon size={28} />
          <span className="text-lg font-bold gold-gradient-text">Exotic</span>
        </Link>

        <div className="flex items-center gap-2">
          {mounted && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-xl text-[var(--text-secondary)] hover:text-gold-500 hover:bg-gold-500/10 transition-all"
            >
              {theme === "dark" ? <SunIcon size={20} /> : <MoonIcon size={20} />}
            </button>
          )}

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 rounded-xl text-[var(--text-secondary)] hover:text-gold-500 hover:bg-gold-500/10 transition-all"
          >
            {menuOpen ? <CloseIcon size={20} /> : <MenuIcon size={20} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="absolute top-full left-0 right-0 bg-[var(--bg-primary)] border-b border-[var(--border-color)] p-4 animate-fade-in">
          <div className="space-y-2">
            {username ? (
              <>
                <Link href={`/profile/${username}`} className="block px-4 py-2 rounded-xl text-[var(--text-secondary)] hover:bg-[var(--bg-input)]" onClick={() => setMenuOpen(false)}>
                  Profile
                </Link>
                <Link href="/settings" className="block px-4 py-2 rounded-xl text-[var(--text-secondary)] hover:bg-[var(--bg-input)]" onClick={() => setMenuOpen(false)}>
                  Settings
                </Link>
                <button onClick={onLogout} className="w-full text-left px-4 py-2 rounded-xl text-red-400 hover:bg-red-500/10">
                  Log out
                </button>
              </>
            ) : (
              <Link href="/auth/login" onClick={() => setMenuOpen(false)}>
                <Button className="w-full">Sign in</Button>
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
