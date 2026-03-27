import { cn } from "@/lib/utils";
import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export function Input({ label, error, className, ...props }: InputProps) {
  return (
    <div className="space-y-1.5">
      {label && (
        <label className="block text-sm font-medium text-[var(--text-secondary)]">
          {label}
        </label>
      )}
      <input
        className={cn(
          "w-full px-4 py-3 rounded-xl border bg-[var(--bg-input)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] border-[var(--border-color)] transition-all duration-300 focus:outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20",
          error && "border-red-500 focus:border-red-500 focus:ring-red-500/20",
          className
        )}
        {...props}
      />
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}
