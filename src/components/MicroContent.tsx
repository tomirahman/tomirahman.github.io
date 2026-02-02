interface MicroContentProps {
  text: string;
  variant?: "caption" | "status" | "quote" | "label";
  className?: string;
}

export const MicroContent = ({ text, variant = "caption", className = "" }: MicroContentProps) => {
  const baseClasses = "font-body text-xs tracking-wider";
  
  const variantClasses = {
    caption: "text-muted-foreground/60 uppercase",
    status: "text-primary/60 flex items-center gap-2",
    quote: "text-muted-foreground/50 italic",
    label: "text-primary/40 uppercase font-medium"
  };

  if (variant === "status") {
    return (
      <div className={`${baseClasses} ${variantClasses[variant]} ${className}`}>
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
        <span>{text}</span>
      </div>
    );
  }

  return (
    <span className={`${baseClasses} ${variantClasses[variant]} ${className}`}>
      {text}
    </span>
  );
};

export const SectionCaption = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <p className={`font-body text-sm text-muted-foreground/70 text-center max-w-md mx-auto mb-4 ${className}`}>
    {children}
  </p>
);

export const SectionLabel = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`flex items-center justify-center gap-3 mb-4 ${className}`}>
    <div className="h-px w-8 bg-primary/20" />
    <span className="font-body text-xs tracking-[0.2em] uppercase text-primary/50">
      {children}
    </span>
    <div className="h-px w-8 bg-primary/20" />
  </div>
);

export const TitleUnderline = ({ width = "w-16" }: { width?: string }) => (
  <div className="flex justify-center mt-4 mb-8">
    <div className={`${width} h-0.5 bg-gradient-to-r from-transparent via-primary/30 to-transparent`} />
  </div>
);