import { motion } from "framer-motion";
import { ReactNode } from "react";

interface SectionLabelProps {
  children: ReactNode;
  className?: string;
}

// Section label like "// ABOUT"
export const SectionTag = ({ children, className = "" }: SectionLabelProps) => (
  <motion.div 
    className={`flex items-center justify-center gap-3 mb-6 ${className}`}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
  >
    <span className="font-mono text-xs tracking-wider text-muted-foreground">
      // {children}
    </span>
  </motion.div>
);

// Large section title with split animation
interface SectionTitleProps {
  children: string;
  className?: string;
  splitWords?: boolean;
}

export const SectionTitle = ({ children, className = "", splitWords = true }: SectionTitleProps) => {
  const words = children.split(" ");
  
  if (!splitWords) {
    return (
      <motion.h2 
        className={`font-display text-5xl md:text-6xl lg:text-7xl font-bold text-primary tracking-tight leading-none ${className}`}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.h2>
    );
  }
  
  return (
    <div className={`${className}`}>
      {words.map((word, idx) => (
        <motion.h2 
          key={idx}
          className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-primary tracking-tight leading-none"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ 
            duration: 0.6, 
            delay: idx * 0.1,
            ease: [0.22, 1, 0.36, 1] 
          }}
        >
          {word}
        </motion.h2>
      ))}
    </div>
  );
};

// Numbered section indicator
interface NumberedSectionProps {
  number: number;
  className?: string;
}

export const NumberedSection = ({ number, className = "" }: NumberedSectionProps) => (
  <motion.span 
    className={`font-mono text-xs text-muted-foreground/50 ${className}`}
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.4 }}
  >
    {number.toString().padStart(2, "0")}
  </motion.span>
);

// Scroll to explore indicator
interface ScrollIndicatorProps {
  className?: string;
}

export const ScrollIndicator = ({ className = "" }: ScrollIndicatorProps) => (
  <motion.div 
    className={`flex flex-col items-center gap-2 ${className}`}
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 1, duration: 0.6 }}
  >
    <span className="font-mono text-xs tracking-wider text-muted-foreground uppercase">
      Scroll to explore
    </span>
    <motion.span 
      className="text-muted-foreground"
      animate={{ y: [0, 8, 0] }}
      transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
    >
      ↓
    </motion.span>
  </motion.div>
);

// Animated line divider
interface AnimatedDividerProps {
  className?: string;
}

export const AnimatedDivider = ({ className = "" }: AnimatedDividerProps) => (
  <motion.div 
    className={`h-px bg-gradient-to-r from-transparent via-border to-transparent ${className}`}
    initial={{ scaleX: 0 }}
    whileInView={{ scaleX: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
  />
);
