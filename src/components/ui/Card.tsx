import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  style?: React.CSSProperties;
}

export function Card({ children, className, hover = false, style }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] p-5",
        hover && "card-hover cursor-pointer",
        className
      )}
      style={style}
    >
      {children}
    </div>
  );
}
