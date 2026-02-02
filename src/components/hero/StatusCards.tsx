interface StatusCardProps {
  label: string;
  value: string;
  variant?: "default" | "accent";
}

const StatusCard = ({ label, value, variant = "default" }: StatusCardProps) => (
  <div
    className={`px-6 py-4 rounded-lg backdrop-blur-sm border transition-all duration-300 hover:scale-105 ${
      variant === "accent"
        ? "bg-accent/90 dark:bg-accent/80 border-accent text-accent-foreground"
        : "bg-card/80 dark:bg-card/60 border-border/50"
    }`}
  >
    <span className="block font-body text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-1">
      {label}
    </span>
    <span className={`block font-display text-lg font-semibold ${
      variant === "accent" ? "text-accent-foreground" : "text-primary"
    }`}>
      {value}
    </span>
  </div>
);

interface StatusCardsProps {
  location: string;
  role: string;
  status: string;
  className?: string;
}

const StatusCards = ({ location, role, status, className = "" }: StatusCardsProps) => {
  return (
    <div className={`flex flex-wrap items-center justify-center md:justify-start gap-3 ${className}`}>
      <StatusCard label="Location" value={location} />
      <StatusCard label="Current Role" value={role} />
      <StatusCard label="Status" value={status} variant="accent" />
    </div>
  );
};

export default StatusCards;
