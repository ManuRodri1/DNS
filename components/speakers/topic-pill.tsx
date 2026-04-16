// components/speakers/topic-pill.tsx
// Reusable topic / tag pill — black bg, coral outline, coral text

interface TopicPillProps {
  label: string
  /** If true, use a filled coral style (for active filters) */
  active?: boolean
  onClick?: () => void
  className?: string
}

export function TopicPill({ label, active = false, onClick, className = "" }: TopicPillProps) {
  const base =
    "inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold tracking-wide transition-all duration-200 select-none"

  const style = active
    ? "bg-[#FF5757] text-white border border-[#FF5757]"
    : "bg-transparent text-[#FF5757] border border-[#FF5757]/50 hover:border-[#FF5757] hover:bg-[#FF5757]/10"

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={`${base} ${style} cursor-pointer ${className}`}
      >
        {label}
      </button>
    )
  }

  return (
    <span className={`${base} ${style} ${className}`}>
      {label}
    </span>
  )
}
