interface SectionDividerProps {
  variant?: "gradient" | "line" | "dots" | "wave";
  className?: string;
}

const SectionDivider = ({ variant = "gradient", className = "" }: SectionDividerProps) => {
  if (variant === "gradient") {
    return (
      <div className={`relative h-px ${className}`}>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-border to-transparent" />
        <div className="absolute left-1/2 -translate-x-1/2 -top-1 w-2 h-2 rounded-full bg-primary/20" />
      </div>
    );
  }

  if (variant === "line") {
    return (
      <div className={`flex items-center justify-center gap-4 py-2 ${className}`}>
        <div className="flex-1 h-px bg-gradient-to-r from-transparent to-border" />
        <div className="w-1.5 h-1.5 rounded-full bg-primary/30" />
        <div className="w-1 h-1 rounded-full bg-primary/20" />
        <div className="w-1.5 h-1.5 rounded-full bg-primary/30" />
        <div className="flex-1 h-px bg-gradient-to-l from-transparent to-border" />
      </div>
    );
  }

  if (variant === "dots") {
    return (
      <div className={`flex items-center justify-center gap-2 py-4 ${className}`}>
        {[...Array(5)].map((_, i) => (
          <div 
            key={i} 
            className="w-1 h-1 rounded-full bg-primary/20"
            style={{ opacity: i === 2 ? 0.5 : 0.2 }}
          />
        ))}
      </div>
    );
  }

  if (variant === "wave") {
    return (
      <div className={`relative h-8 overflow-hidden ${className}`}>
        <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 1200 32">
          <path
            d="M0 16 Q 150 32 300 16 T 600 16 T 900 16 T 1200 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            className="text-border"
          />
        </svg>
      </div>
    );
  }

  return null;
};

export default SectionDivider;