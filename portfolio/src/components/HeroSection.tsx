"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import HeroBackground from "./hero/HeroBackground";
import HeroContent from "./hero/HeroContent";
import Meteors from "./ui/meteors";

interface HeroSectionProps {
  name: string;
  tagline: string;
  introComplete?: boolean;
}

/**
 * HERO LOCK SPEC - Clean & Minimal with Parallax + Meteors
 * 
 * - Solid background with meteor shower effect
 * - Large "TOMI" parallax background text
 * - NO floating logos in hero (they go to other sections)
 * - Focus 100% on name
 * - Calm, confident, modern with dynamic visual flair
 */
const HeroSection = ({ name, tagline, introComplete = true }: HeroSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const easing: [number, number, number, number] = [0.22, 0.61, 0.36, 1];

  // Parallax effect for background text
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });

  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const smoothParallaxY = useSpring(parallaxY, { stiffness: 100, damping: 30 });
  const bgOpacity = useTransform(scrollYProgress, [0, 0.5], [0.06, 0]);

  return (
    <motion.div
      ref={sectionRef}
      className="relative min-h-svh bg-background w-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: introComplete ? 1 : 0 }}
      transition={{ duration: 0.8, ease: easing }}
      style={{ overflow: 'hidden' }}
    >
      {/* Meteor Shower Effect - z-index: 0 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
        <Meteors number={25} />
      </div>

      {/* Clean Background - z-index: 1 */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <HeroBackground />
      </div>

      {/* Large Parallax Background Text */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none whitespace-nowrap"
        style={{
          y: smoothParallaxY,
          opacity: bgOpacity,
          zIndex: 2
        }}
      >
        <span className="font-display text-[30vw] font-bold text-foreground tracking-tighter">
          TOMI
        </span>
      </motion.div>

      {/* NO floating logos in hero - they are in other sections */}

      {/* Hero Content - z-index: 10 (always above) */}
      <div style={{ position: 'relative', zIndex: 10, overflow: 'visible' }}>
        <HeroContent
          name={name}
          tagline={tagline}
          isVisible={introComplete}
        />
      </div>
    </motion.div>
  );
};

export default HeroSection;

