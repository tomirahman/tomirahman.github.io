import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface WelcomeAnimationProps {
  onComplete: () => void;
}

const greetings = [
  { text: "Welcome", lang: "en" },
  { text: "Selamat Datang", lang: "id" },
  { text: "ようこそ", lang: "ja" },
  { text: "Bienvenue", lang: "fr" },
  { text: "Hola", lang: "es" },
];

const WelcomeAnimation = ({ onComplete }: WelcomeAnimationProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  // Check if animation should be skipped
  useEffect(() => {
    const hasSeenWelcome = sessionStorage.getItem("hasSeenWelcome");
    if (hasSeenWelcome) {
      onComplete();
      setIsVisible(false);
      return;
    }

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      sessionStorage.setItem("hasSeenWelcome", "true");
      onComplete();
      setIsVisible(false);
      return;
    }
  }, [onComplete]);

  // Progress through greetings
  useEffect(() => {
    if (!isVisible) return;

    if (currentIndex < greetings.length) {
      // Total per word: 0.5s fade in + 0.7s hold + 0.4s fade out ≈ 1.6s
      const timer = setTimeout(() => {
        setCurrentIndex(prev => prev + 1);
      }, 1600);
      return () => clearTimeout(timer);
    } else {
      // Animation complete
      const timer = setTimeout(() => {
        sessionStorage.setItem("hasSeenWelcome", "true");
        setIsVisible(false);
        onComplete();
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [currentIndex, isVisible, onComplete]);

  // Skip on click or scroll
  const handleSkip = () => {
    sessionStorage.setItem("hasSeenWelcome", "true");
    setIsVisible(false);
    onComplete();
  };

  useEffect(() => {
    if (!isVisible) return;

    const handleScroll = () => handleSkip();
    window.addEventListener("scroll", handleScroll, { once: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] bg-background cursor-pointer"
        onClick={handleSkip}
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Doodle decorations */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Floating doodles */}
          <motion.div
            className="absolute top-[20%] left-[15%] text-4xl"
            animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            ✨
          </motion.div>
          <motion.div
            className="absolute top-[30%] right-[20%] text-3xl"
            animate={{ y: [0, 8, 0], rotate: [0, -5, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          >
            ⭐
          </motion.div>
          <motion.div
            className="absolute bottom-[25%] left-[25%] text-3xl"
            animate={{ y: [0, -8, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
          >
            💫
          </motion.div>
          <motion.div
            className="absolute bottom-[35%] right-[15%] text-4xl"
            animate={{ y: [0, 10, 0], rotate: [0, 10, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.7 }}
          >
            🌸
          </motion.div>
          <motion.div
            className="absolute top-[50%] left-[10%] text-2xl"
            animate={{ x: [0, 5, 0], y: [0, -5, 0] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
          >
            💙
          </motion.div>
          <motion.div
            className="absolute top-[15%] right-[30%] text-2xl"
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          >
            🔵
          </motion.div>
        </div>

        {/* Greeting text - positioned slightly above center */}
        <div 
          className="absolute left-1/2 -translate-x-1/2"
          style={{ top: '42%', transform: 'translate(-50%, -50%)' }}
        >
          <AnimatePresence mode="wait">
            {currentIndex < greetings.length && (
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ 
                  duration: 0.5, 
                  ease: [0.22, 1, 0.36, 1] 
                }}
                className="text-center"
              >
                <h1 
                  className="font-display text-foreground"
                  style={{ 
                    fontSize: 'clamp(1.9rem, 6.5vw, 3.2rem)',
                    fontWeight: 500,
                    letterSpacing: '0.04em'
                  }}
                >
                  {greetings[currentIndex].text}
                </h1>
                <motion.div 
                  className="h-0.5 bg-foreground/20 rounded-full mt-4 mx-auto"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Skip hint */}
        <motion.p
          className="absolute bottom-8 text-muted-foreground text-sm font-mono"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ delay: 1 }}
        >
          Click or scroll to skip
        </motion.p>
      </motion.div>
    </AnimatePresence>
  );
};

export default WelcomeAnimation;
