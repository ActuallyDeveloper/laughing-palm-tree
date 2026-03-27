"use client";

import { useState, useSyncExternalStore } from "react";
import { updateProfileAction, logoutAction } from "@/lib/actions";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Toggle } from "@/components/ui/Toggle";
import { useTheme } from "next-themes";
import { MoonIcon, SunIcon, LogoutIcon, UserIcon, AnonIcon } from "@/components/icons";

function useMounted() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
}

interface SettingsUser {
  id: number;
  username: string;
  displayName: string;
  email: string;
  bio: string | null;
  avatarUrl: string | null;
  allowAnonymous: boolean | null;
}

export function SettingsContent({ user }: { user: SettingsUser }) {
  const { theme, setTheme } = useTheme();
  const mounted = useMounted();
  const [displayName, setDisplayName] = useState(user.displayName);
  const [bio, setBio] = useState(user.bio || "");
  const [allowAnonymous, setAllowAnonymous] = useState(user.allowAnonymous ?? true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleSave() {
    setSaving(true);
    setSuccess(false);
    const formData = new FormData();
    formData.set("displayName", displayName);
    formData.set("bio", bio);
    formData.set("allowAnonymous", String(allowAnonymous));
    await updateProfileAction(formData);
    setSaving(false);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  }

  async function handleLogout() {
    await logoutAction();
    window.location.href = "/auth/login";
  }

  return (
    <div className="max-w-lg mx-auto px-4 py-6 space-y-6">
      <h1 className="text-2xl font-bold">
        <span className="gold-gradient-text">Settings</span>
      </h1>

      <Card className="animate-fade-in">
        <div className="flex items-center gap-2 mb-4">
          <UserIcon size={20} className="text-gold-500" />
          <h2 className="font-semibold text-[var(--text-primary)]">Profile</h2>
        </div>

        <div className="space-y-4">
          <Input
            label="Display Name"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
          />

          <Input
            label="Username"
            value={user.username}
            disabled
            className="opacity-60"
          />

          <Input
            label="Email"
            value={user.email}
            disabled
            className="opacity-60"
          />

          <Textarea
            label="Bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Tell people about yourself..."
            rows={3}
          />

          <div className="flex items-center justify-between p-3 rounded-xl bg-[var(--bg-input)]">
            <div className="flex items-center gap-2">
              <AnonIcon size={18} className="text-gold-500" />
              <div>
                <span className="text-sm font-medium text-[var(--text-primary)]">Anonymous questions</span>
                <p className="text-xs text-[var(--text-muted)]">Allow others to ask you anonymously</p>
              </div>
            </div>
            <Toggle checked={allowAnonymous} onChange={setAllowAnonymous} />
          </div>

          <Button onClick={handleSave} disabled={saving} className="w-full">
            {saving ? "Saving..." : "Save changes"}
          </Button>

          {success && (
            <p className="text-sm text-gold-500 text-center animate-fade-in">
              Profile updated successfully!
            </p>
          )}
        </div>
      </Card>

      <Card className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
        <div className="flex items-center gap-2 mb-4">
          {mounted && (theme === "dark" ? <MoonIcon size={20} className="text-gold-500" /> : <SunIcon size={20} className="text-gold-500" />)}
          <h2 className="font-semibold text-[var(--text-primary)]">Appearance</h2>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => setTheme("dark")}
            className={`flex-1 p-4 rounded-xl border-2 transition-all ${
              theme === "dark"
                ? "border-gold-500 bg-gold-500/5"
                : "border-[var(--border-color)] hover:border-gold-500/50"
            }`}
          >
            <div className="w-full h-12 rounded-lg bg-black mb-2 border border-gray-800" />
            <span className="text-sm font-medium text-[var(--text-primary)]">Dark</span>
          </button>

          <button
            onClick={() => setTheme("light")}
            className={`flex-1 p-4 rounded-xl border-2 transition-all ${
              theme === "light"
                ? "border-gold-500 bg-gold-500/5"
                : "border-[var(--border-color)] hover:border-gold-500/50"
            }`}
          >
            <div className="w-full h-12 rounded-lg bg-white mb-2 border border-gray-200" />
            <span className="text-sm font-medium text-[var(--text-primary)]">Light</span>
          </button>
        </div>
      </Card>

      <Card className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
        <div className="flex items-center gap-2 mb-4">
          <LogoutIcon size={20} className="text-red-400" />
          <h2 className="font-semibold text-[var(--text-primary)]">Account</h2>
        </div>

        <Button variant="danger" onClick={handleLogout} className="w-full">
          <LogoutIcon size={16} className="mr-2" />
          Log out
        </Button>
      </Card>
    </div>
  );
}
