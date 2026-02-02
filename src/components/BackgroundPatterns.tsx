// Reusable background pattern components

export const GridPattern = ({ opacity = 0.03, size = 60 }: { opacity?: number; size?: number }) => (
  <div 
    className="absolute inset-0 pointer-events-none"
    style={{
      opacity,
      backgroundImage: `linear-gradient(hsl(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)`,
      backgroundSize: `${size}px ${size}px`
    }}
  />
);

export const CircuitPattern = ({ opacity = 0.025 }: { opacity?: number }) => (
  <div className="absolute inset-0 pointer-events-none" style={{ opacity }}>
    <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="circuit" width="80" height="80" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 40 30 M 40 50 L 40 80 M 0 40 L 30 40 M 50 40 L 80 40" stroke="currentColor" strokeWidth="1" fill="none"/>
          <circle cx="40" cy="40" r="4" fill="none" stroke="currentColor" strokeWidth="1"/>
          <circle cx="40" cy="40" r="2" fill="currentColor"/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#circuit)" className="text-primary"/>
    </svg>
  </div>
);

export const NodesPattern = ({ opacity = 0.04 }: { opacity?: number }) => (
  <div className="absolute inset-0 pointer-events-none" style={{ opacity }}>
    <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="nodes" width="100" height="100" patternUnits="userSpaceOnUse">
          <line x1="0" y1="50" x2="100" y2="50" stroke="currentColor" strokeWidth="0.5" />
          <line x1="50" y1="0" x2="50" y2="100" stroke="currentColor" strokeWidth="0.5" />
          <line x1="0" y1="0" x2="100" y2="100" stroke="currentColor" strokeWidth="0.3" />
          <line x1="100" y1="0" x2="0" y2="100" stroke="currentColor" strokeWidth="0.3" />
          <circle cx="50" cy="50" r="3" fill="currentColor" />
          <circle cx="0" cy="0" r="2" fill="currentColor" />
          <circle cx="100" cy="0" r="2" fill="currentColor" />
          <circle cx="0" cy="100" r="2" fill="currentColor" />
          <circle cx="100" cy="100" r="2" fill="currentColor" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#nodes)" className="text-primary"/>
    </svg>
  </div>
);

export const FlowPattern = ({ opacity = 0.03 }: { opacity?: number }) => (
  <div className="absolute inset-0 pointer-events-none" style={{ opacity }}>
    <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="flow" width="120" height="60" patternUnits="userSpaceOnUse">
          <path 
            d="M 0 30 Q 30 0 60 30 T 120 30" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="1"
          />
          <circle cx="60" cy="30" r="2" fill="currentColor" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#flow)" className="text-primary"/>
    </svg>
  </div>
);

export const DiagonalPattern = ({ opacity = 0.02 }: { opacity?: number }) => (
  <div className="absolute inset-0 pointer-events-none" style={{ opacity }}>
    <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="diagonals" width="40" height="40" patternUnits="userSpaceOnUse">
          <line x1="0" y1="0" x2="40" y2="40" stroke="currentColor" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#diagonals)" className="text-primary"/>
    </svg>
  </div>
);

export const VerticalGuide = ({ position = "left" }: { position?: "left" | "right" }) => (
  <div 
    className={`absolute top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-border/50 to-transparent ${
      position === "left" ? "left-8 md:left-16" : "right-8 md:right-16"
    }`}
  />
);

export const CornerAccent = ({ position = "top-left" }: { position?: "top-left" | "top-right" | "bottom-left" | "bottom-right" }) => {
  const positionClasses = {
    "top-left": "top-4 left-4",
    "top-right": "top-4 right-4 rotate-90",
    "bottom-left": "bottom-4 left-4 -rotate-90",
    "bottom-right": "bottom-4 right-4 rotate-180"
  };

  return (
    <div className={`absolute ${positionClasses[position]} w-16 h-16 pointer-events-none opacity-10`}>
      <svg viewBox="0 0 64 64" className="w-full h-full text-primary">
        <path d="M 0 32 L 0 0 L 32 0" fill="none" stroke="currentColor" strokeWidth="1" />
        <circle cx="0" cy="0" r="3" fill="currentColor" />
      </svg>
    </div>
  );
};