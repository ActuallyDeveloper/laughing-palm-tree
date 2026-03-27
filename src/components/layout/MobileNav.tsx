"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  HomeIcon,
  CompassIcon,
  QuestionIcon,
  UserIcon,
  LogoIcon,
} from "@/components/icons";

interface MobileNavProps {
  username?: string;
}

export function MobileNav({ username }: MobileNavProps) {
  const pathname = usePathname();

  const items = [
    { href: "/", icon: HomeIcon, label: "Feed" },
    { href: "/explore", icon: CompassIcon, label: "Explore" },
    { href: "/inbox", icon: QuestionIcon, label: "Inbox" },
    ...(username
      ? [{ href: `/profile/${username}`, icon: UserIcon, label: "Profile" }]
      : []),
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-[var(--bg-primary)] border-t border-[var(--border-color)] glass-effect">
      <div className="flex items-center justify-around px-2 py-2">
        {items.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl transition-all duration-200 min-w-[60px]",
                isActive
                  ? "text-gold-500"
                  : "text-[var(--text-muted)]"
              )}
            >
              <item.icon size={22} />
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
