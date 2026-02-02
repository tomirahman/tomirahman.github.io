import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

interface HeroNameLoopProps {
  firstName: string;
  lastName: string;
  isVisible?: boolean;
}

/**
 * HERO NAME ANIMATION – GSAP Typography Style
 * 
 * Animation: Vertical translateY + opacity (NO rotation)
 * - TOMI enters from below (y: 16 → 0)
 * - Hold 1.2s
 * - TOMI exits up (y: 0 → -16, opacity → 0)
 * - RAHMAN enters from below (y: 16 → 0)
 * - Loop infinitely
 * 
 * Total loop: ~3.5s
 */
const HeroNameLoop = ({ firstName, lastName, isVisible = true }: HeroNameLoopProps) => {
  const [showFirst, setShowFirst] = useState(true);
  const prefersReducedMotion = useReducedMotion();

  const easing: [number, number, number, number] = [0.16, 1, 0.3, 1]; // power3.out equivalent

  useEffect(() => {
    if (!isVisible || prefersReducedMotion) return;

    // Total cycle: 0.5s enter + 1.2s hold + 0.4s exit ≈ 2.1s per word
    const interval = setInterval(() => {
      setShowFirst(prev => !prev);
    }, 2400);

    return () => clearInterval(interval);
  }, [isVisible, prefersReducedMotion]);

  if (prefersReducedMotion) {
    return (
      <h1
        className="font-display text-[48px] md:text-[64px] lg:text-[72px] font-bold text-foreground tracking-[-0.02em] leading-[1.05]"
        style={{ lineHeight: 1.05, textShadow: '0 2px 12px rgba(0,0,0,0.08)' }}
      >
        {firstName}
      </h1>
    );
  }

  return (
    <div
      className="relative inline-flex items-baseline"
      style={{
        minWidth: '200px',
        height: '1.15em',
        overflow: 'visible',
        zIndex: 10
      }}
    >
      <AnimatePresence mode="wait">
        <motion.h1
          key={showFirst ? 'first' : 'last'}
          className="font-display text-[48px] md:text-[64px] lg:text-[72px] font-bold text-foreground tracking-[-0.02em] whitespace-nowrap"
          style={{
            lineHeight: 1.05,
            willChange: 'transform, opacity',
            textShadow: '0 2px 12px rgba(0,0,0,0.08)',
          }}
          initial={{
            y: 20,
            opacity: 0,
          }}
          animate={{
            y: 0,
            opacity: 1,
          }}
          exit={{
            y: -20,
            opacity: 0,
          }}
          transition={{
            duration: 0.5,
            ease: easing
          }}
        >
          {showFirst ? firstName : lastName}
        </motion.h1>
      </AnimatePresence>
    </div>
  );
};

export default HeroNameLoop;
