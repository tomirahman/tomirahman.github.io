import { motion, useTransform, useSpring, useScroll } from "framer-motion";
import { ReactNode, useRef } from "react";

interface SmoothSectionProps {
  children: ReactNode;
  className?: string;
  parallaxSpeed?: number;
  fadeIn?: boolean;
  scaleIn?: boolean;
}

// Section wrapper with smooth scroll-based animations
export const SmoothSection = ({ 
  children, 
  className = "", 
  parallaxSpeed = 0,
  fadeIn = true,
  scaleIn = false
}: SmoothSectionProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Smooth spring physics
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Parallax effect
  const y = useTransform(smoothProgress, [0, 1], [parallaxSpeed * 50, parallaxSpeed * -50]);

  // Opacity fade (starts visible when section is 20% in view)
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0.8]);

  // Scale effect
  const scale = useTransform(scrollYProgress, [0, 0.2], [0.95, 1]);

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        y: parallaxSpeed !== 0 ? y : 0,
        opacity: fadeIn ? opacity : 1,
        scale: scaleIn ? scale : 1
      }}
    >
      {children}
    </motion.div>
  );
};

// Horizontal scroll section (pinned)
interface HorizontalScrollSectionProps {
  children: ReactNode;
  className?: string;
  itemClassName?: string;
}

export const HorizontalScrollSection = ({ 
  children, 
  className = "",
  itemClassName = ""
}: HorizontalScrollSectionProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-66.666%"]);
  const smoothX = useSpring(x, { stiffness: 100, damping: 30 });

  return (
    <div ref={containerRef} className={`relative h-[300vh] ${className}`}>
      <div className="sticky top-0 h-screen overflow-hidden flex items-center">
        <motion.div 
          className={`flex gap-8 ${itemClassName}`}
          style={{ x: smoothX }}
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
};

// Progress-based reveal wrapper
interface ProgressRevealProps {
  children: ReactNode;
  className?: string;
  threshold?: number; // 0-1, when to start revealing
}

export const ProgressReveal = ({ 
  children, 
  className = "",
  threshold = 0.3
}: ProgressRevealProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"]
  });

  const opacity = useTransform(scrollYProgress, [0, threshold], [0, 1]);
  const y = useTransform(scrollYProgress, [0, threshold], [60, 0]);
  
  const smoothOpacity = useSpring(opacity, { stiffness: 100, damping: 30 });
  const smoothY = useSpring(y, { stiffness: 100, damping: 30 });

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ opacity: smoothOpacity, y: smoothY }}
    >
      {children}
    </motion.div>
  );
};
