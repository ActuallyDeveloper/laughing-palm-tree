"use client";

import { Sidebar } from "./Sidebar";
import { MobileNav } from "./MobileNav";
import { Header } from "./Header";
import { logoutAction } from "@/lib/actions";
import { useRouter } from "next/navigation";

interface AppShellProps {
  children: React.ReactNode;
  username?: string;
}

export function AppShell({ children, username }: AppShellProps) {
  const router = useRouter();

  async function handleLogout() {
    await logoutAction();
    router.push("/auth/login");
    router.refresh();
  }

  return (
    <div className="flex min-h-screen bg-[var(--bg-primary)]">
      <Sidebar username={username} />
      <div className="flex-1 flex flex-col min-h-screen">
        <Header username={username} onLogout={handleLogout} />
        <main className="flex-1 pb-20 lg:pb-0">
          {children}
        </main>
      </div>
      <MobileNav username={username} />
    </div>
  );
}
