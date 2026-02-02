import { motion, useReducedMotion } from "framer-motion";
import { useMemo } from "react";

// Import all logos
import mantaLogo from "@/assets/logos/manta.png";
import ssvLogo from "@/assets/logos/ssv.jpg";
import clipperLogo from "@/assets/logos/clipper.jpg";
import sqdLogo from "@/assets/logos/sqd.jpg";
import aztecLogo from "@/assets/logos/aztec.jpg";
import junkfunLogo from "@/assets/logos/junkfun.jpg";
import superfortuneLogo from "@/assets/logos/superfortune.jpg";

interface FloatingLogoProps {
  src: string;
  alt: string;
  position: { top?: string; bottom?: string; left?: string; right?: string };
  floatY: number;
  floatX: number;
  duration: number;
  delay: number;
  size?: 'sm' | 'md' | 'lg';
}

const FloatingLogo = ({ 
  src, 
  alt, 
  position, 
  floatY, 
  floatX, 
  duration, 
  delay,
  size = 'md'
}: FloatingLogoProps) => {
  const prefersReducedMotion = useReducedMotion();
  
  const sizeClasses = {
    sm: 'w-8 h-8 md:w-10 md:h-10',
    md: 'w-10 h-10 md:w-12 md:h-12',
    lg: 'w-12 h-12 md:w-14 md:h-14'
  };

  return (
    <motion.div
      className={`absolute ${sizeClasses[size]} rounded-lg overflow-hidden will-change-transform`}
      style={{
        ...position,
      }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ 
        opacity: size === 'sm' ? 0.3 : 0.5, // Hero logos more subtle
        scale: 1,
        x: prefersReducedMotion ? 0 : [0, floatX, 0],
        y: prefersReducedMotion ? 0 : [0, floatY, 0],
      }}
      transition={{
        opacity: { duration: 0.6, delay },
        scale: { duration: 0.6, delay },
        x: {
          duration,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
          delay,
        },
        y: {
          duration: duration * 0.8,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
          delay: delay + 0.5,
        },
      }}
    >
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        loading="lazy"
        decoding="async"
      />
    </motion.div>
  );
};

interface FloatingLogosProps {
  section?: 'hero' | 'experience';
}

/**
 * Floating logos scattered around hero/experience sections.
 * 
 * Rules:
 * - Size: small-medium
 * - Opacity: 0.6-0.8
 * - No shadows, no borders
 * - Floating animation: translateY ±12px, translateX ±6px
 * - Duration: 6-10s each, random delay
 * - Different timing per logo (no sync)
 * - Disabled if prefers-reduced-motion
 */
const FloatingLogos = ({ section = 'hero' }: FloatingLogosProps) => {
  // Generate random but consistent values per logo
  const logos = useMemo(() => {
    const baseLogos = [
      { src: mantaLogo, alt: "Manta Network" },
      { src: ssvLogo, alt: "SSV Network" },
      { src: clipperLogo, alt: "Clipper Exchange" },
      { src: sqdLogo, alt: "SQD" },
      { src: aztecLogo, alt: "Aztec Network" },
      { src: junkfunLogo, alt: "Junk.fun" },
      { src: superfortuneLogo, alt: "Superfortune" },
    ];

    // Hero: only 2-3 logos, far from center, very subtle
    // Experience: all logos with stronger presence
    const heroPositions = [
      { top: '20%', left: '3%' },
      { top: '70%', right: '4%' },
      { bottom: '25%', left: '5%' },
    ];

    const experiencePositions = [
      { top: '5%', left: '2%' },
      { top: '10%', right: '3%' },
      { top: '30%', left: '1%' },
      { top: '35%', right: '2%' },
      { top: '55%', left: '3%' },
      { top: '60%', right: '1%' },
      { top: '80%', left: '2%' },
    ];

    // Hero gets only first 3 logos, Experience gets all
    const selectedLogos = section === 'hero' ? baseLogos.slice(0, 3) : baseLogos;
    const positions = section === 'hero' ? heroPositions : experiencePositions;

    return selectedLogos.map((logo, i) => ({
      ...logo,
      position: positions[i],
      floatY: Math.random() * 8 - 4 + (i % 2 === 0 ? 6 : -6),
      floatX: Math.random() * 4 - 2 + (i % 2 === 0 ? 3 : -3),
      // Hero: slower, more subtle
      duration: section === 'hero' ? 10 + Math.random() * 4 : 6 + Math.random() * 4,
      delay: i * 0.5,
      size: section === 'hero' ? 'sm' as const : (['sm', 'md', 'lg'][i % 3] as 'sm' | 'md' | 'lg'),
    }));
  }, [section]);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {logos.map((logo, index) => (
        <FloatingLogo key={index} {...logo} />
      ))}
    </div>
  );
};

export default FloatingLogos;
