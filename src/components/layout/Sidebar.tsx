"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  HomeIcon,
  CompassIcon,
  QuestionIcon,
  UserIcon,
  SettingsIcon,
  LogoIcon,
  BellIcon,
} from "@/components/icons";

const navItems = [
  { href: "/", icon: HomeIcon, label: "Feed" },
  { href: "/explore", icon: CompassIcon, label: "Explore" },
  { href: "/inbox", icon: QuestionIcon, label: "Inbox" },
  { href: "/notifications", icon: BellIcon, label: "Notifications" },
];

interface SidebarProps {
  username?: string;
}

export function Sidebar({ username }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex flex-col w-64 h-screen sticky top-0 border-r border-[var(--border-color)] bg-[var(--bg-primary)] p-4">
      <Link href="/" className="flex items-center gap-3 px-3 py-4 mb-4">
        <LogoIcon size={36} />
        <span className="text-xl font-bold gold-gradient-text">Exotic</span>
      </Link>

      <nav className="flex-1 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl text-[15px] font-medium transition-all duration-200",
                isActive
                  ? "bg-gold-500/10 text-gold-500"
                  : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-input)]"
              )}
            >
              <item.icon size={22} />
              <span>{item.label}</span>
            </Link>
          );
        })}

        {username && (
          <Link
            href={`/profile/${username}`}
            className={cn(
              "flex items-center gap-3 px-4 py-3 rounded-xl text-[15px] font-medium transition-all duration-200",
              pathname.startsWith("/profile")
                ? "bg-gold-500/10 text-gold-500"
                : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-input)]"
            )}
          >
            <UserIcon size={22} />
            <span>Profile</span>
          </Link>
        )}

        <Link
          href="/settings"
          className={cn(
            "flex items-center gap-3 px-4 py-3 rounded-xl text-[15px] font-medium transition-all duration-200",
            pathname === "/settings"
              ? "bg-gold-500/10 text-gold-500"
              : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-input)]"
          )}
        >
          <SettingsIcon size={22} />
          <span>Settings</span>
        </Link>
      </nav>
    </aside>
  );
}
