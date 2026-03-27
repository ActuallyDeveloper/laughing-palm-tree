import { cn } from "@/lib/utils";

interface AvatarProps {
  src?: string;
  name: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

const sizes = {
  sm: "w-8 h-8 text-xs",
  md: "w-10 h-10 text-sm",
  lg: "w-14 h-14 text-lg",
  xl: "w-20 h-20 text-2xl",
};

function getInitials(name: string) {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function getColorFromName(name: string) {
  const colors = [
    "from-gold-500 to-gold-300",
    "from-amber-500 to-orange-400",
    "from-yellow-500 to-amber-400",
    "from-gold-600 to-yellow-400",
  ];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
}

export function Avatar({ src, name, size = "md", className }: AvatarProps) {
  if (src) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={name} className={cn("rounded-full object-cover ring-2 ring-gold-500/30", sizes[size], className)} />;
  }

  return (
    <div
      className={cn(
        "rounded-full bg-gradient-to-br flex items-center justify-center font-semibold text-white",
        getColorFromName(name),
        sizes[size],
        className
      )}
    >
      {getInitials(name)}
    </div>
  );
}
