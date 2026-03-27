import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  className,
  disabled,
  ...props
}: ButtonProps) {
  const base = "inline-flex items-center justify-center font-medium rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary: "bg-gradient-to-r from-gold-500 to-gold-400 text-black hover:from-gold-400 hover:to-gold-300 focus:ring-gold-500 shadow-lg shadow-gold-500/20 hover:shadow-gold-500/40",
    secondary: "border border-[var(--border-color)] text-[var(--text-primary)] bg-[var(--bg-card)] hover:bg-[var(--bg-input)] focus:ring-gold-500",
    ghost: "text-[var(--text-secondary)] hover:text-gold-500 hover:bg-gold-500/10 focus:ring-gold-500",
    danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2.5 text-sm",
    lg: "px-6 py-3 text-base",
  };

  return (
    <button
      className={cn(base, variants[variant], sizes[size], className)}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
