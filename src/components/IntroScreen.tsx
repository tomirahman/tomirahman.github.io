import { useEffect, useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "@/lib/gsap-config";

interface IntroScreenProps {
  onComplete: () => void;
}

const greetings = [
  { text: "Welcome", lang: "en" },
  { text: "Selamat Datang", lang: "id" },
  { text: "ようこそ", lang: "ja" },
  { text: "Bienvenue", lang: "fr" },
  { text: "Hola", lang: "es" },
];

/**
 * Full-screen intro with GSAP-powered welcome animation.
 * 
 * Flow:
 * 1. Full viewport blank screen (theme-aware)
 * 2. Welcome text sequence (~1s each, GSAP timeline)
 * 3. Curtain opens (screen slides up) revealing content
 * 
 * Performance:
 * - Plays once per session (sessionStorage)
 * - Skippable via click
 * - Max duration: 6 seconds
 */
const IntroScreen = ({ onComplete }: IntroScreenProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTextPhase, setIsTextPhase] = useState(true);
  const [isRevealing, setIsRevealing] = useState(false);
  const [shouldSkip, setShouldSkip] = useState(false);
  const textRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  // Power2.inOut for curtain
  const easingInOut: [number, number, number, number] = [0.45, 0, 0.55, 1];

  // Check if intro should be skipped
  useEffect(() => {
    const hasSeenIntro = sessionStorage.getItem("hasSeenIntro");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (hasSeenIntro || reducedMotion) {
      setShouldSkip(true);
      onComplete();
    }
  }, [onComplete]);

  // GSAP Timeline for greeting sequence
  useEffect(() => {
    if (shouldSkip || !isTextPhase) return;

    const tl = gsap.timeline({
      onComplete: () => {
        sessionStorage.setItem("hasSeenIntro", "true");
        setIsTextPhase(false);
        setIsRevealing(true);
      }
    });

    timelineRef.current = tl;

    // Animate through greetings (~0.6s each = 3s total, then 0.5s exit = ~4s max)
    greetings.forEach((_, index) => {
      tl.to({}, {
        duration: 0.6, // Time to show each greeting (faster)
        onStart: () => setCurrentIndex(index),
      });
    });

    // Small pause before reveal
    tl.to({}, { duration: 0.3 });

    return () => {
      tl.kill();
    };
  }, [shouldSkip, isTextPhase]);

  // Skip handler
  const handleSkip = useCallback(() => {
    if (timelineRef.current) {
      timelineRef.current.kill();
    }
    sessionStorage.setItem("hasSeenIntro", "true");
    setIsTextPhase(false);
    setIsRevealing(true);
  }, []);

  // Complete animation after reveal
  useEffect(() => {
    if (isRevealing) {
      const timer = setTimeout(() => {
        onComplete();
      }, 900);
      return () => clearTimeout(timer);
    }
  }, [isRevealing, onComplete]);

  if (shouldSkip) return null;

  return (
    <motion.div
      ref={containerRef}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center cursor-pointer"
      style={{ backgroundColor: '#0a0a0a' }}
      onClick={!isRevealing ? handleSkip : undefined}
      initial={{ y: 0, opacity: 1 }}
      animate={{
        y: isRevealing ? '-100vh' : 0,
        opacity: isRevealing ? 0 : 1
      }}
      transition={{
        duration: 0.9,
        ease: easingInOut
      }}
    >
      {/* Welcome text - centered */}
      <div ref={textRef} className="relative h-24 flex items-center justify-center overflow-hidden">
        <AnimatePresence mode="wait">
          {isTextPhase && (
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 40, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -30, scale: 0.95 }}
              transition={{
                duration: 0.4,
                ease: [0.22, 1, 0.36, 1]
              }}
              className="absolute text-center"
            >
              <h1
                className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold"
                style={{
                  color: '#ffffff',
                  textShadow: '0 2px 20px rgba(0,0,0,0.5), 0 0 60px rgba(255,255,255,0.3)'
                }}
              >
                {greetings[currentIndex]?.text}
              </h1>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Progress indicator */}
      <motion.div
        className="absolute bottom-12 flex gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ delay: 0.5 }}
      >
        {greetings.map((_, index) => (
          <motion.div
            key={index}
            className="w-2 h-2 rounded-full"
            animate={{
              backgroundColor: index <= currentIndex
                ? 'hsl(var(--primary))'
                : 'hsl(var(--muted-foreground))',
              scale: index === currentIndex ? 1.2 : 1
            }}
            transition={{ duration: 0.3 }}
          />
        ))}
      </motion.div>

      {/* Skip hint */}
      {isTextPhase && (
        <motion.p
          className="absolute bottom-6 text-muted-foreground text-xs font-mono tracking-wider uppercase"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ delay: 1.5, duration: 0.4 }}
        >
          tap to skip
        </motion.p>
      )}
    </motion.div>
  );
};

export default IntroScreen;
