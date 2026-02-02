import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

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
 * Full-screen intro with curtain reveal animation.
 * 
 * Flow:
 * 1. Full viewport blank screen (theme-aware)
 * 2. Welcome text sequence at bottom center
 * 3. Curtain opens (screen slides up) revealing content
 * 
 * Performance:
 * - Plays once per session (sessionStorage)
 * - Skippable via click/scroll
 * - Respects prefers-reduced-motion
 */
const IntroScreen = ({ onComplete }: IntroScreenProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTextPhase, setIsTextPhase] = useState(true);
  const [isRevealing, setIsRevealing] = useState(false);
  const [shouldSkip, setShouldSkip] = useState(false);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Power2.out equivalent easing
  const easing: [number, number, number, number] = [0.22, 0.61, 0.36, 1];
  // Power2.inOut for curtain
  const easingInOut: [number, number, number, number] = [0.45, 0, 0.55, 1];

  // Check if intro should be skipped
  useEffect(() => {
    const hasSeenIntro = sessionStorage.getItem("hasSeenIntro");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setPrefersReducedMotion(reducedMotion);

    if (hasSeenIntro || reducedMotion) {
      setShouldSkip(true);
      onComplete();
    }
  }, [onComplete]);

  // Show scroll button after first greeting appears
  useEffect(() => {
    if (shouldSkip || hasScrolled) return;

    const timer = setTimeout(() => {
      setShowScrollButton(true);
    }, 800); // Show after first word starts fading in

    return () => clearTimeout(timer);
  }, [shouldSkip, hasScrolled]);

  // Listen for manual scroll to hide button
  useEffect(() => {
    if (shouldSkip || isRevealing) return;

    const handleScroll = () => {
      setHasScrolled(true);
      setShowScrollButton(false);
    };

    window.addEventListener("scroll", handleScroll, { once: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [shouldSkip, isRevealing]);

  // Skip handler
  const handleSkip = useCallback(() => {
    sessionStorage.setItem("hasSeenIntro", "true");
    setIsTextPhase(false);
    setIsRevealing(true);
    setShowScrollButton(false);
  }, []);

  // Auto scroll handler
  const handleAutoScroll = useCallback(() => {
    setShowScrollButton(false);
    handleSkip();
  }, [handleSkip]);

  // Progress through greetings (0.45-0.55s per greeting)
  useEffect(() => {
    if (shouldSkip || !isTextPhase) return;

    if (currentIndex < greetings.length) {
      const timer = setTimeout(() => {
        setCurrentIndex(prev => prev + 1);
      }, 500); // 0.5s per greeting
      return () => clearTimeout(timer);
    } else {
      // Text phase complete, start reveal
      const timer = setTimeout(() => {
        sessionStorage.setItem("hasSeenIntro", "true");
        setIsTextPhase(false);
        setIsRevealing(true);
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [currentIndex, isTextPhase, shouldSkip]);

  // Complete animation after reveal
  useEffect(() => {
    if (isRevealing) {
      const timer = setTimeout(() => {
        onComplete();
      }, 1000); // Match curtain duration
      return () => clearTimeout(timer);
    }
  }, [isRevealing, onComplete]);

  if (shouldSkip) return null;
  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-end cursor-pointer"
      style={{ backgroundColor: 'hsl(var(--background))' }}
      onClick={!isRevealing ? handleSkip : undefined}
      initial={{ y: 0 }}
      animate={{ y: isRevealing ? '-100vh' : 0 }}
      transition={{
        duration: 1.0,
        ease: easingInOut
      }}
    >
      {/* Welcome text - positioned at bottom center */}
      <div className="absolute bottom-[10vh] left-0 right-0 flex justify-center">
        <AnimatePresence mode="wait">
          {isTextPhase && currentIndex < greetings.length && (
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 0.25,
                ease: easing
              }}
              className="text-center"
            >
              <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-primary">
                {greetings[currentIndex].text}
              </h1>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Skip hint */}
      {isTextPhase && (
        <motion.p
          className="absolute bottom-6 left-1/2 -translate-x-1/2 text-muted-foreground text-xs font-mono tracking-wider uppercase"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ delay: 1, duration: 0.4 }}
        >
          tap to skip
        </motion.p>
      )}

      {/* Auto Scroll Button */}
      <AnimatePresence>
        {showScrollButton && !isRevealing && (
          <motion.button
            className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-foreground/60 hover:text-foreground transition-colors duration-300 cursor-pointer px-4 py-3 z-10"
            style={{ bottom: '7vh' }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.5, ease: easing }}
            whileHover={prefersReducedMotion ? undefined : { y: 4, opacity: 1 }}
            onClick={(e) => {
              e.stopPropagation();
              handleAutoScroll();
            }}
            aria-label="Scroll to explore"
          >
            <motion.div
              animate={prefersReducedMotion ? undefined : { y: [0, 8, 0] }}
              transition={prefersReducedMotion ? undefined : {
                duration: 1.8,
                repeat: Infinity,
                ease: "easeInOut" as const
              }}
            >
              <ChevronDown className="w-5 h-5" strokeWidth={1.5} />
            </motion.div>
            <span
              className="text-xs font-medium tracking-widest uppercase"
              style={{ fontSize: '11px', letterSpacing: '0.1em' }}
            >
              Explore
            </span>
          </motion.button>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default IntroScreen;
