export function Spinner({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className="animate-spin"
    >
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="3"
        strokeDasharray="31.4 31.4"
        strokeLinecap="round"
        className="opacity-20"
      />
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="3"
        strokeDasharray="31.4 31.4"
        strokeLinecap="round"
        strokeDashoffset="80"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          values="0 12 12;360 12 12"
          dur="1s"
          repeatCount="indefinite"
        />
      </circle>
    </svg>
  );
}
