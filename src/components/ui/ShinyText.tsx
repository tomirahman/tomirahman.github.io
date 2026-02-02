import { ReactNode } from "react";
import "./ShinyText.css";

interface ShinyTextProps {
  children: ReactNode;
  className?: string;
  shimmerWidth?: number;
  speed?: number;
  disabled?: boolean;
}

/**
 * ShinyText Component
 * 
 * Adds a shimmering gradient effect to text.
 * Based on react-bits ShinyText pattern.
 */
const ShinyText = ({
  children,
  className = "",
  shimmerWidth = 100,
  speed = 3,
  disabled = false,
}: ShinyTextProps) => {
  return (
    <span
      className={`shiny-text ${disabled ? "shiny-text--disabled" : ""} ${className}`}
      style={
        {
          "--shimmer-width": `${shimmerWidth}px`,
          "--animation-speed": `${speed}s`,
        } as React.CSSProperties
      }
    >
      {children}
    </span>
  );
};

export default ShinyText;
