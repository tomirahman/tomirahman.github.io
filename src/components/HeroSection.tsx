import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import HeroBackground from "./hero/HeroBackground";
import HeroContent from "./hero/HeroContent";

interface HeroSectionProps {
  name: string;
  tagline: string;
  introComplete?: boolean;
}

/**
 * HERO LOCK SPEC - Clean & Minimal with Parallax
 * 
 * - Solid background (no doodle)
 * - Large "TOMI" parallax background text
 * - NO floating logos in hero (they go to other sections)
 * - Focus 100% on name
 * - Calm, confident, modern
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
      className="relative min-h-screen bg-background w-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: introComplete ? 1 : 0 }}
      transition={{ duration: 0.8, ease: easing }}
      style={{ overflow: 'hidden' }}
    >
      {/* Clean Background - z-index: 0 */}
      <div style={{ position: 'relative', zIndex: 0 }}>
        <HeroBackground />
      </div>

      {/* Large Parallax Background Text */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none whitespace-nowrap"
        style={{
          y: smoothParallaxY,
          opacity: bgOpacity,
          zIndex: 1
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
