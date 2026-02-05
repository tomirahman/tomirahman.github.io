import { useEffect, useCallback, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";
import { pauseBackgroundMusic, resumeBackgroundMusic } from "@/hooks/useGlobalAudio";

interface MediaItem {
  id: number | string;
  src: string;
  alt?: string;
  caption?: string;
  quote?: string;
  poster?: string;
  type: "photo" | "video";
}

interface CinematicViewerProps {
  items: MediaItem[];
  currentIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

// GSAP-style easing - using as const for proper typing
const GSAP_EASE = [0.22, 0.61, 0.36, 1] as const;
const ANIMATION_DURATION = 0.3;

// Position configs for 3-item carousel
const POSITIONS = {
  previous: { x: "-40%", scale: 0.92, opacity: 0.25, blur: 8, zIndex: 1 },
  active: { x: "0%", scale: 1, opacity: 1, blur: 0, zIndex: 10 },
  next: { x: "40%", scale: 0.92, opacity: 0.25, blur: 8, zIndex: 1 },
  hidden: { x: "-80%", scale: 0.85, opacity: 0, blur: 12, zIndex: 0 },
  hiddenRight: { x: "80%", scale: 0.85, opacity: 0, blur: 12, zIndex: 0 },
};

const CinematicViewer = ({
  items,
  currentIndex,
  onClose,
  onNavigate,
}: CinematicViewerProps) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchStartY, setTouchStartY] = useState(0);
  const activeVideoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentItem = items[currentIndex];
  const isVideo = currentItem?.type === "video";

  // Get indices for 3-item carousel
  const getVisibleIndices = useCallback(() => {
    const prev = (currentIndex - 1 + items.length) % items.length;
    const next = (currentIndex + 1) % items.length;
    return { prev, active: currentIndex, next };
  }, [currentIndex, items.length]);

  const { prev, active, next } = getVisibleIndices();

  // Navigation with animation lock
  const navigate = useCallback((direction: "next" | "prev") => {
    if (isAnimating || items.length <= 1) return;
    
    setIsAnimating(true);
    
    const newIndex = direction === "next"
      ? (currentIndex + 1) % items.length
      : (currentIndex - 1 + items.length) % items.length;
    
    onNavigate(newIndex);
    
    // Animation lock release
    setTimeout(() => setIsAnimating(false), ANIMATION_DURATION * 1000 + 50);
  }, [currentIndex, items.length, onNavigate, isAnimating]);

  const goNext = useCallback(() => navigate("next"), [navigate]);
  const goPrev = useCallback(() => navigate("prev"), [navigate]);

  const togglePlay = useCallback(() => {
    if (!activeVideoRef.current) return;
    if (activeVideoRef.current.paused) {
      activeVideoRef.current.play();
      setIsPlaying(true);
    } else {
      activeVideoRef.current.pause();
      setIsPlaying(false);
    }
  }, []);

  // Audio management for videos
  useEffect(() => {
    if (isVideo) {
      pauseBackgroundMusic();
      if (activeVideoRef.current) {
        activeVideoRef.current.volume = 0.55;
        activeVideoRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch(() => {
          setIsPlaying(false);
        });
      }
    } else {
      // For photos, keep background music
    }
    
    return () => {
      if (isVideo) {
        resumeBackgroundMusic();
      }
    };
  }, [isVideo, currentIndex]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "Escape":
          onClose();
          break;
        case "ArrowRight":
          goNext();
          break;
        case "ArrowLeft":
          goPrev();
          break;
        case " ":
          if (isVideo) {
            e.preventDefault();
            togglePlay();
          }
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose, goNext, goPrev, togglePlay, isVideo]);

  // Touch/swipe handling with gesture rules
  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      setTouchStartX(e.changedTouches[0].screenX);
      setTouchStartY(e.changedTouches[0].screenY);
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const touchEndX = e.changedTouches[0].screenX;
      const touchEndY = e.changedTouches[0].screenY;
      const diffX = touchStartX - touchEndX;
      const diffY = touchStartY - touchEndY;

      // Minimum 40px swipe distance
      if (Math.abs(diffX) < 40) return;
      
      // Ignore diagonal gestures (ratio check)
      if (Math.abs(diffY) > Math.abs(diffX) * 0.5) return;

      if (diffX > 0) {
        goNext();
      } else {
        goPrev();
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("touchstart", handleTouchStart, { passive: true });
      container.addEventListener("touchend", handleTouchEnd, { passive: true });
    }

    return () => {
      if (container) {
        container.removeEventListener("touchstart", handleTouchStart);
        container.removeEventListener("touchend", handleTouchEnd);
      }
    };
  }, [goNext, goPrev, touchStartX, touchStartY]);

  // Get position for an item based on its index
  const getItemPosition = (itemIndex: number) => {
    if (itemIndex === active) return POSITIONS.active;
    if (itemIndex === prev) return POSITIONS.previous;
    if (itemIndex === next) return POSITIONS.next;
    return POSITIONS.hidden;
  };

  // Render media item
  const renderMedia = (item: MediaItem, isActiveItem: boolean) => {
    if (item.type === "video") {
      return (
        <video
          ref={isActiveItem ? activeVideoRef : undefined}
          src={item.src}
          poster={item.poster}
          className="w-full h-full object-contain"
          playsInline
          loop
          muted={!isActiveItem}
          autoPlay={isActiveItem}
        />
      );
    }
    return (
      <img
        src={item.src}
        alt={item.alt || ""}
        className="w-full h-full object-contain"
        draggable={false}
      />
    );
  };

  // Get visible items (prev, active, next)
  const visibleItems = [
    { index: prev, item: items[prev] },
    { index: active, item: items[active] },
    { index: next, item: items[next] },
  ].filter((v, i, arr) => {
    // Remove duplicates for small arrays
    return arr.findIndex(x => x.index === v.index) === i;
  });

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 bg-black overflow-hidden select-none"
    >
      {/* Close button */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1, duration: 0.2 }}
        onClick={onClose}
        className="absolute top-4 right-4 z-30 w-12 h-12 rounded-full 
                   bg-white/10 backdrop-blur-sm flex items-center justify-center
                   hover:bg-white/20 transition-colors"
        aria-label="Close"
      >
        <X className="w-6 h-6 text-white" />
      </motion.button>

      {/* Navigation buttons - Desktop */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.15, duration: 0.25 }}
        onClick={goPrev}
        className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 z-30 
                   w-14 h-14 rounded-full bg-white/10 backdrop-blur-sm 
                   items-center justify-center hover:bg-white/20 transition-colors"
        aria-label="Previous"
      >
        <ChevronLeft className="w-7 h-7 text-white" />
      </motion.button>
      <motion.button
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.15, duration: 0.25 }}
        onClick={goNext}
        className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 z-30 
                   w-14 h-14 rounded-full bg-white/10 backdrop-blur-sm 
                   items-center justify-center hover:bg-white/20 transition-colors"
        aria-label="Next"
      >
        <ChevronRight className="w-7 h-7 text-white" />
      </motion.button>

      {/* 3-Item Carousel Container */}
      <div className="absolute inset-0 flex items-center justify-center">
        <AnimatePresence mode="sync">
          {visibleItems.map(({ index, item }) => {
            const position = getItemPosition(index);
            const isActiveItem = index === active;

            return (
              <motion.div
                key={`${item.id}-${index}`}
                initial={position}
                animate={{
                  x: position.x,
                  scale: position.scale,
                  opacity: position.opacity,
                  filter: `blur(${position.blur}px)`,
                  zIndex: position.zIndex,
                }}
                transition={{
                  duration: ANIMATION_DURATION,
                  ease: [0.22, 0.61, 0.36, 1],
                }}
                className="absolute w-[70vw] h-[70vh] md:w-[60vw] md:h-[75vh] flex items-center justify-center"
                style={{ 
                  transformOrigin: "center center",
                  pointerEvents: isActiveItem ? "auto" : "none",
                }}
                onClick={isActiveItem && isVideo ? togglePlay : undefined}
              >
                <div className="relative w-full h-full flex items-center justify-center rounded-lg overflow-hidden">
                  {renderMedia(item, isActiveItem)}
                  
                  {/* Video play overlay */}
                  {isActiveItem && isVideo && !isPlaying && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="absolute inset-0 flex items-center justify-center pointer-events-none"
                    >
                      <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm 
                                      flex items-center justify-center">
                        <Play className="w-10 h-10 text-white ml-1" fill="white" />
                      </div>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Bottom info panel */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.3, ease: [0.22, 0.61, 0.36, 1] }}
        className="absolute bottom-0 left-0 right-0 p-6 
                   bg-gradient-to-t from-black/80 via-black/40 to-transparent z-20"
      >
        <div className="max-w-2xl mx-auto text-center">
          {/* Video controls */}
          {isVideo && (
            <div className="flex justify-center mb-4">
              <button
                onClick={togglePlay}
                className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm 
                           flex items-center justify-center hover:bg-white/30 transition-colors"
                aria-label={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? (
                  <Pause className="w-5 h-5 text-white" fill="white" />
                ) : (
                  <Play className="w-5 h-5 text-white ml-0.5" fill="white" />
                )}
              </button>
            </div>
          )}

          {/* Caption */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {currentItem?.caption && (
                <p className="text-white text-lg md:text-xl font-display mb-2">
                  {currentItem.caption}
                </p>
              )}
              {currentItem?.quote && (
                <p className="text-white/70 text-sm md:text-base font-body italic">
                  "{currentItem.quote}"
                </p>
              )}
            </motion.div>
          </AnimatePresence>
          
          {/* Progress dots */}
          <div className="flex justify-center gap-1.5 mt-4">
            {items.map((_, idx) => (
              <button
                key={idx}
                onClick={() => !isAnimating && onNavigate(idx)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  idx === currentIndex 
                    ? "bg-white w-6" 
                    : "bg-white/40 hover:bg-white/60 w-2"
                }`}
                aria-label={`Go to item ${idx + 1}`}
              />
            ))}
          </div>
          
          {/* Counter */}
          <p className="text-white/50 text-xs mt-3">
            {currentIndex + 1} / {items.length}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default CinematicViewer;
