import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import HeroNameLoop from "./HeroNameLoop";

interface HeroContentProps {
  name: string;
  tagline: string;
  isVisible?: boolean;
}

/**
 * HERO LOCK SPEC - Final Layout
 * 
 * Layout: "Hi, I'm TOMI/RAHMAN" on single horizontal line
 * Container: max-width 760px, centered
 * Order: [Hi I'm + Name] → Tagline → Divider → Meta Info
 * Focus 100% on name, proper z-index layering
 * 
 * Scroll indicator: Shows gentle floating "Scroll" text
 * (no auto-scroll - now uses GSAP ScrollTrigger pull-up effect)
 */
const HeroContent = ({ name, tagline, isVisible = true }: HeroContentProps) => {
  const [animationReady, setAnimationReady] = useState(false);
  const [showScrollButton, setShowScrollButton] = useState(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    setPrefersReducedMotion(
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
  }, []);

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => setAnimationReady(true), 100);
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  // Listen for scroll to hide button
  useEffect(() => {
    const handleScroll = () => {
      // Hide scroll button after user scrolls past hero
      if (window.scrollY > window.innerHeight * 0.3) {
        setShowScrollButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const nameParts = name.split(" ");
  const firstName = nameParts[0] || "TOMI";
  const lastName = nameParts.slice(1).join(" ") || "RAHMAN";

  const fadeUpAnimation = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0 }
  };

  const easing: [number, number, number, number] = [0.22, 0.61, 0.36, 1];

  return (
    <div
      className="relative min-h-[85vh] flex flex-col justify-center"
      style={{ zIndex: 10, overflow: 'visible' }}
    >
      {/* Centered Container - max 760px, safe padding */}
      <div
        className="max-w-[760px] mx-auto px-6 text-center pt-[18vh] pb-[14vh] md:pt-[20vh] md:pb-[16vh]"
        style={{ overflow: 'visible' }}
      >

        {/* 1. "Hi, I'm" + Animated Name - HORIZONTAL LAYOUT */}
        <motion.div
          className="flex items-baseline justify-center gap-3 md:gap-4 mb-4"
          variants={fadeUpAnimation}
          initial="hidden"
          animate={animationReady ? "visible" : "hidden"}
          transition={{ duration: 0.7, ease: easing }}
          style={{
            position: 'relative',
            zIndex: 10,
            overflow: 'visible',
            minHeight: '100px' // Prevent clipping during animation
          }}
        >
          {/* Static "Hi, I'm" - aligned to baseline */}
          <span
            className="font-body text-lg md:text-xl text-muted-foreground/75 whitespace-nowrap"
            style={{ lineHeight: 1.05 }}
          >
            Hi, I'm
          </span>

          {/* Animated Name */}
          <div style={{ overflow: 'visible', minHeight: '1.2em' }}>
            <HeroNameLoop
              firstName={firstName}
              lastName={lastName}
              isVisible={animationReady}
            />
          </div>
        </motion.div>

        {/* 2. Tagline - Secondary, subtle */}
        <motion.p
          className="font-body text-base md:text-lg text-muted-foreground/70 max-w-[560px] mx-auto mt-6"
          variants={fadeUpAnimation}
          initial="hidden"
          animate={animationReady ? "visible" : "hidden"}
          transition={{ duration: 0.7, ease: easing, delay: 0.15 }}
          style={{ position: 'relative', zIndex: 10 }}
        >
          {tagline}
        </motion.p>

        {/* 3. Divider - Visual breathing */}
        <motion.div
          className="w-12 h-px bg-foreground/30 mx-auto mt-8 mb-8"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={animationReady ? { scaleX: 1, opacity: 0.3 } : {}}
          transition={{ duration: 0.6, ease: easing, delay: 0.25 }}
          style={{ transformOrigin: "center", position: 'relative', zIndex: 10 }}
        />

        {/* 4. Meta Info - Location / Role / Status */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-3"
          variants={fadeUpAnimation}
          initial="hidden"
          animate={animationReady ? "visible" : "hidden"}
          transition={{ duration: 0.7, ease: easing, delay: 0.35 }}
          style={{ position: 'relative', zIndex: 10 }}
        >
          <MetaBadge label="Indonesia" />
          <MetaBadge label="Infra & Community" />
          <MetaBadge label="Available" variant="status" />
        </motion.div>

        {/* Scroll Indicator - Visual cue only (GSAP handles actual scroll) */}
        <AnimatePresence>
          {showScrollButton && (
            <motion.div
              className="mt-20 flex flex-col items-center gap-2 px-6 py-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              style={{ position: 'relative', zIndex: 10 }}
            >
              <motion.span
                className="font-mono text-xs tracking-widest text-muted-foreground/70 uppercase"
                animate={prefersReducedMotion ? {} : { y: [0, 4, 0] }}
                transition={prefersReducedMotion ? undefined : {
                  repeat: Infinity,
                  duration: 1.8,
                  ease: "easeInOut"
                }}
              >
                Scroll ↓
              </motion.span>
              <motion.div
                className="w-px h-8 bg-gradient-to-b from-foreground/30 to-transparent"
                animate={prefersReducedMotion ? {} : {
                  scaleY: [1, 0.6, 1],
                  opacity: [0.4, 0.2, 0.4]
                }}
                transition={prefersReducedMotion ? undefined : {
                  repeat: Infinity,
                  duration: 1.8,
                  ease: "easeInOut"
                }}
                style={{ transformOrigin: "top" }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

// Meta Badge Component - Subtle, pill style
const MetaBadge = ({ label, variant = "default" }: { label: string; variant?: "default" | "status" }) => (
  <span
    className={`
      inline-flex px-4 py-2 rounded-full text-xs font-medium tracking-wide
      ${variant === "status"
        ? "border border-accent/40 text-accent/80 bg-transparent"
        : "bg-foreground/[0.06] text-foreground/75"
      }
    `}
    style={{ position: 'relative', zIndex: 10 }}
  >
    {label}
  </span>
);

export default HeroContent;
