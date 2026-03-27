"use client";

interface IconProps {
  className?: string;
  size?: number;
}

export function LogoIcon({ className, size = 32 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className}>
      <defs>
        <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#D4AF37" />
          <stop offset="50%" stopColor="#F5D060" />
          <stop offset="100%" stopColor="#D4AF37" />
        </linearGradient>
      </defs>
      <circle cx="16" cy="16" r="14" stroke="url(#goldGrad)" strokeWidth="2" fill="none" style={{ animation: "logoSpin 8s linear infinite" }}>
        <animate attributeName="stroke-dasharray" values="0 88;44 44;88 0;44 44;0 88" dur="4s" repeatCount="indefinite" />
      </circle>
      <text x="16" y="21" textAnchor="middle" fill="url(#goldGrad)" fontSize="14" fontWeight="bold" fontFamily="serif">E</text>
      <style>{`
        @keyframes logoSpin {
          from { transform-origin: center; transform: rotate(0deg); }
          to { transform-origin: center; transform: rotate(360deg); }
        }
      `}</style>
    </svg>
  );
}

export function HomeIcon({ className, size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" style={{ transition: "all 0.3s ease" }}>
        <animate attributeName="d" values="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z;M3 9l9-5 9 5v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z;M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" dur="2s" repeatCount="indefinite" />
      </path>
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

export function SearchIcon({ className, size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="11" cy="11" r="8" style={{ transition: "r 0.3s ease" }}>
        <animate attributeName="r" values="8;7;8" dur="2s" repeatCount="indefinite" />
      </circle>
      <line x1="21" y1="21" x2="16.65" y2="16.65" style={{ transition: "all 0.3s ease" }}>
        <animate attributeName="x2" values="16.65;17.65;16.65" dur="2s" repeatCount="indefinite" />
      </line>
    </svg>
  );
}

export function UserIcon({ className, size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4">
        <animate attributeName="r" values="4;3.5;4" dur="3s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
}

export function SettingsIcon({ className, size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={{ animation: "settingsRotate 8s linear infinite" }}>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
      <style>{`
        @keyframes settingsRotate {
          from { transform-origin: center; transform: rotate(0deg); }
          to { transform-origin: center; transform: rotate(360deg); }
        }
      `}</style>
    </svg>
  );
}

export function HeartIcon({ className, size = 24, filled = false }: IconProps & { filled?: boolean }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={{ transition: "transform 0.2s ease" }}>
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z">
        {filled && <animate attributeName="transform" values="scale(1);scale(1.15);scale(1)" dur="0.4s" repeatCount="1" />}
      </path>
    </svg>
  );
}

export function SendIcon({ className, size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <line x1="22" y1="2" x2="11" y2="13" style={{ transition: "all 0.3s ease" }}>
        <animate attributeName="x2" values="11;10;11" dur="1.5s" repeatCount="indefinite" />
      </line>
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  );
}

export function MoonIcon({ className, size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z">
        <animate attributeName="d" values="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z;M21 12.79A9 9 0 1 0 11.21 3 7 7 0 0 1 21 12.79z;M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" dur="4s" repeatCount="indefinite" />
      </path>
    </svg>
  );
}

export function SunIcon({ className, size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3"><animate attributeName="y1" values="1;0;1" dur="2s" repeatCount="indefinite" /></line>
      <line x1="12" y1="21" x2="12" y2="23"><animate attributeName="y2" values="23;24;23" dur="2s" repeatCount="indefinite" /></line>
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  );
}

export function QuestionIcon({ className, size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="10" />
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
      <line x1="12" y1="17" x2="12.01" y2="17">
        <animate attributeName="opacity" values="1;0.3;1" dur="2s" repeatCount="indefinite" />
      </line>
    </svg>
  );
}

export function AnswerIcon({ className, size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      <polyline points="8 9 12 13 16 9" style={{ animation: "answerBounce 1.5s ease infinite" }}>
        <animate attributeName="points" values="8 9 12 13 16 9;8 10 12 14 16 10;8 9 12 13 16 9" dur="1.5s" repeatCount="indefinite" />
      </polyline>
    </svg>
  );
}

export function AnonIcon({ className, size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
      <circle cx="12" cy="10" r="3" />
      <path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662" />
      <line x1="3" y1="3" x2="21" y2="21" strokeWidth="2.5" strokeDasharray="3 2">
        <animate attributeName="stroke-dashoffset" values="0;5" dur="1s" repeatCount="indefinite" />
      </line>
    </svg>
  );
}

export function LogoutIcon({ className, size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  );
}

export function SparkleIcon({ className, size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8z">
        <animate attributeName="transform" values="rotate(0 12 12);rotate(180 12 12);rotate(360 12 12)" dur="6s" repeatCount="indefinite" />
      </path>
    </svg>
  );
}

export function MenuIcon({ className, size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}

export function CloseIcon({ className, size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

export function CompassIcon({ className, size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="10" />
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" style={{ animation: "compassSpin 4s ease-in-out infinite", transformOrigin: "center" }}>
        <animate attributeName="transform" values="rotate(0 12 12);rotate(15 12 12);rotate(-15 12 12);rotate(0 12 12)" dur="4s" repeatCount="indefinite" />
      </polygon>
    </svg>
  );
}

export function BellIcon({ className, size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0">
        <animate attributeName="d" values="M13.73 21a2 2 0 0 1-3.46 0;M13.73 22a2 2 0 0 1-3.46 0;M13.73 21a2 2 0 0 1-3.46 0" dur="1s" repeatCount="indefinite" />
      </path>
    </svg>
  );
}
