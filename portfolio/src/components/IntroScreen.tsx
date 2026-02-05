import { useEffect, useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

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

const statusMessages = [
  { threshold: 0, text: "INITIALIZING..." },
  { threshold: 30, text: "LOADING ASSETS..." },
  { threshold: 60, text: "PREPARING INTERFACE..." },
  { threshold: 90, text: "ALMOST READY..." },
];

/**
 * Full-screen intro with greeting sequence + percentage loader animation.
 * 
 * Flow:
 * 1. Full viewport screen with greeting text cycling at top
 * 2. Large percentage counter (0-100%) in center
 * 3. Status text cycling based on percentage
 * 4. Fade out transition to reveal content
 * 
 * Performance:
 * - Plays once per session (sessionStorage)
 * - Skippable via click
 * - Respects prefers-reduced-motion
 */
const IntroScreen = ({ onComplete }: IntroScreenProps) => {
  const [percentage, setPercentage] = useState(0);
  const [greetingIndex, setGreetingIndex] = useState(0);
  const [statusText, setStatusText] = useState(statusMessages[0].text);
  const [isComplete, setIsComplete] = useState(false);
  const [shouldSkip, setShouldSkip] = useState(false);
  const animationRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  // Smooth easing function
  const easeOutQuart = (t: number): number => {
    return 1 - Math.pow(1 - t, 4);
  };

  // Animation easings
  const easing: [number, number, number, number] = [0.22, 0.61, 0.36, 1];
  const easingInOut: [number, number, number, number] = [0.45, 0, 0.55, 1];

  // Duration in milliseconds
  const ANIMATION_DURATION = 3000;

  // Check if intro should be skipped
  useEffect(() => {
    const hasSeenIntro = sessionStorage.getItem("hasSeenIntro");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (hasSeenIntro || reducedMotion) {
      setShouldSkip(true);
      onComplete();
    }
  }, [onComplete]);

  // Cycle through greetings
  useEffect(() => {
    if (shouldSkip || isComplete) return;

    const interval = setInterval(() => {
      setGreetingIndex(prev => (prev + 1) % greetings.length);
    }, 500);

    return () => clearInterval(interval);
  }, [shouldSkip, isComplete]);

  // Update status text based on percentage
  useEffect(() => {
    const currentStatus = [...statusMessages]
      .reverse()
      .find(s => percentage >= s.threshold);
    if (currentStatus) {
      setStatusText(currentStatus.text);
    }
  }, [percentage]);

  // Animate percentage counter
  useEffect(() => {
    if (shouldSkip || isComplete) return;

    const animate = (timestamp: number) => {
      if (!startTimeRef.current) {
        startTimeRef.current = timestamp;
      }

      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(elapsed / ANIMATION_DURATION, 1);
      const easedProgress = easeOutQuart(progress);
      const currentPercentage = Math.round(easedProgress * 100);

      setPercentage(currentPercentage);

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        // Animation complete
        setTimeout(() => {
          sessionStorage.setItem("hasSeenIntro", "true");
          setIsComplete(true);
        }, 400);
      }
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [shouldSkip, isComplete]);

  // Complete animation after fade out
  useEffect(() => {
    if (isComplete) {
      const timer = setTimeout(() => {
        onComplete();
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [isComplete, onComplete]);

  // Skip handler
  const handleSkip = useCallback(() => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    sessionStorage.setItem("hasSeenIntro", "true");
    setPercentage(100);
    setStatusText("ALMOST READY...");
    setTimeout(() => {
      setIsComplete(true);
    }, 200);
  }, []);

  if (shouldSkip) return null;

  return (
    <AnimatePresence>
      {!isComplete ? (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center cursor-pointer"
          style={{ backgroundColor: 'hsl(var(--background))' }}
          onClick={handleSkip}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 0.8,
            ease: easingInOut
          }}
        >
          {/* Greeting text cycling at top */}
          <div className="absolute top-[25vh] left-0 right-0 flex justify-center h-16 sm:h-20">
            <AnimatePresence mode="wait">
              <motion.h1
                key={greetingIndex}
                className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-primary"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2, ease: easing }}
              >
                {greetings[greetingIndex].text}
              </motion.h1>
            </AnimatePresence>
          </div>

          {/* Center content - Name and Counter */}
          <motion.span
            className="text-[10px] sm:text-xs tracking-[0.3em] text-muted-foreground uppercase font-light"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            TOMI RAHMAN
          </motion.span>

          {/* Divider line */}
          <motion.div
            className="w-6 sm:w-8 h-px bg-muted-foreground/30 my-4 sm:my-6"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          />

          {/* Large percentage counter */}
          <motion.div
            className="relative flex items-baseline"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <span
              className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-extralight text-foreground tabular-nums"
              style={{ fontVariantNumeric: 'tabular-nums' }}
            >
              {percentage}
            </span>
            <span className="text-xl sm:text-2xl md:text-3xl font-extralight text-foreground/70 ml-1">
              %
            </span>
          </motion.div>

          {/* Status text */}
          <motion.div
            className="mt-6 sm:mt-8 h-4 overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={statusText}
                className="block text-[10px] sm:text-xs tracking-[0.2em] text-muted-foreground/60 uppercase font-light"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
              >
                {statusText}
              </motion.span>
            </AnimatePresence>
          </motion.div>

          {/* Skip hint */}
          <motion.p
            className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground/40 text-[10px] tracking-widest uppercase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.4 }}
          >
            tap to skip
          </motion.p>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

export default IntroScreen;
