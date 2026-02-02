import { useEffect, useCallback, useRef, useState } from "react";
import { X, ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";

interface Video {
  id: number | string;
  src: string;
  poster?: string;
  caption?: string;
}

interface FullscreenVideoViewerProps {
  videos: Video[];
  currentIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
  onOpen?: () => void;
}

const FullscreenVideoViewer = ({
  videos,
  currentIndex,
  onClose,
  onNavigate,
  onOpen,
}: FullscreenVideoViewerProps) => {
  const currentVideo = videos[currentIndex];
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [touchStartY, setTouchStartY] = useState(0);

  const goNext = useCallback(() => {
    onNavigate((currentIndex + 1) % videos.length);
  }, [currentIndex, videos.length, onNavigate]);

  const goPrev = useCallback(() => {
    onNavigate((currentIndex - 1 + videos.length) % videos.length);
  }, [currentIndex, videos.length, onNavigate]);

  const togglePlay = useCallback(() => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  }, []);

  // Notify parent when opened (for audio management)
  useEffect(() => {
    onOpen?.();
  }, [onOpen]);

  // Auto-play with sound when video changes
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        setIsPlaying(false);
      });
    }
  }, [currentIndex]);

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
          e.preventDefault();
          togglePlay();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose, goNext, goPrev, togglePlay]);

  // Touch/swipe handling
  useEffect(() => {
    let touchStartX = 0;
    let touchEndX = 0;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX = e.changedTouches[0].screenX;
      setTouchStartY(e.changedTouches[0].screenY);
    };

    const handleTouchEnd = (e: TouchEvent) => {
      touchEndX = e.changedTouches[0].screenX;
      const touchEndY = e.changedTouches[0].screenY;
      const diffX = touchStartX - touchEndX;
      const diffY = touchStartY - touchEndY;

      // Swipe down to close
      if (diffY < -100 && Math.abs(diffX) < 50) {
        onClose();
        return;
      }
      
      // Swipe left/right to navigate
      if (Math.abs(diffX) > 50) {
        if (diffX > 0) {
          goNext();
        } else {
          goPrev();
        }
      }
    };

    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchend", handleTouchEnd);

    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [goNext, goPrev, onClose, touchStartY]);

  return (
    <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 w-12 h-12 rounded-full 
                   bg-white/10 backdrop-blur-sm flex items-center justify-center
                   hover:bg-white/20 transition-colors"
        aria-label="Close"
      >
        <X className="w-6 h-6 text-white" />
      </button>

      {/* Navigation buttons - Desktop */}
      <button
        onClick={goPrev}
        className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 z-10 
                   w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm 
                   items-center justify-center hover:bg-white/20 transition-colors"
        aria-label="Previous video"
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>
      <button
        onClick={goNext}
        className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 z-10 
                   w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm 
                   items-center justify-center hover:bg-white/20 transition-colors"
        aria-label="Next video"
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </button>

      {/* Video */}
      <div 
        className="w-full h-full flex items-center justify-center p-4 md:p-12"
        onClick={togglePlay}
      >
        <video
          ref={videoRef}
          src={currentVideo.src}
          poster={currentVideo.poster}
          className="max-w-full max-h-full object-contain"
          playsInline
          loop
        />

        {/* Play/Pause overlay */}
        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm 
                            flex items-center justify-center">
              <Play className="w-10 h-10 text-white ml-1" fill="white" />
            </div>
          </div>
        )}
      </div>

      {/* Bottom controls */}
      <div className="absolute bottom-0 left-0 right-0 p-6 
                      bg-gradient-to-t from-black/80 via-black/40 to-transparent">
        <div className="max-w-2xl mx-auto">
          {/* Play/Pause button */}
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

          {/* Caption */}
          {currentVideo.caption && (
            <p className="text-white text-center text-lg font-display mb-4">
              {currentVideo.caption}
            </p>
          )}
          
          {/* Progress indicator */}
          <div className="flex justify-center gap-1.5">
            {videos.map((_, idx) => (
              <button
                key={idx}
                onClick={(e) => {
                  e.stopPropagation();
                  onNavigate(idx);
                }}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  idx === currentIndex 
                    ? "bg-white w-6" 
                    : "bg-white/40 hover:bg-white/60"
                }`}
                aria-label={`Go to video ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FullscreenVideoViewer;
