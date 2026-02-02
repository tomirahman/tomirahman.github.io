import { useEffect, useCallback } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface Photo {
  id: number | string;
  src: string;
  alt: string;
  caption?: string;
  quote?: string;
}

interface FullscreenPhotoViewerProps {
  photos: Photo[];
  currentIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

const FullscreenPhotoViewer = ({
  photos,
  currentIndex,
  onClose,
  onNavigate,
}: FullscreenPhotoViewerProps) => {
  const currentPhoto = photos[currentIndex];

  const goNext = useCallback(() => {
    onNavigate((currentIndex + 1) % photos.length);
  }, [currentIndex, photos.length, onNavigate]);

  const goPrev = useCallback(() => {
    onNavigate((currentIndex - 1 + photos.length) % photos.length);
  }, [currentIndex, photos.length, onNavigate]);

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
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose, goNext, goPrev]);

  // Touch/swipe handling
  useEffect(() => {
    let touchStartX = 0;
    let touchEndX = 0;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX = e.changedTouches[0].screenX;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      touchEndX = e.changedTouches[0].screenX;
      const diff = touchStartX - touchEndX;
      
      if (Math.abs(diff) > 50) {
        if (diff > 0) {
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
  }, [goNext, goPrev]);

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
        aria-label="Previous photo"
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>
      <button
        onClick={goNext}
        className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 z-10 
                   w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm 
                   items-center justify-center hover:bg-white/20 transition-colors"
        aria-label="Next photo"
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </button>

      {/* Photo */}
      <div className="w-full h-full flex items-center justify-center p-4 md:p-12">
        <img
          src={currentPhoto.src}
          alt={currentPhoto.alt}
          className="max-w-full max-h-full object-contain"
        />
      </div>

      {/* Caption & Quote */}
      <div className="absolute bottom-0 left-0 right-0 p-6 
                      bg-gradient-to-t from-black/80 via-black/40 to-transparent">
        <div className="max-w-2xl mx-auto text-center">
          {currentPhoto.caption && (
            <p className="text-white text-lg md:text-xl font-display mb-2">
              {currentPhoto.caption}
            </p>
          )}
          {currentPhoto.quote && (
            <p className="text-white/70 text-sm md:text-base font-body italic">
              "{currentPhoto.quote}"
            </p>
          )}
        </div>
        
        {/* Progress indicator */}
        <div className="flex justify-center gap-1.5 mt-4">
          {photos.map((_, idx) => (
            <button
              key={idx}
              onClick={() => onNavigate(idx)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                idx === currentIndex 
                  ? "bg-white w-6" 
                  : "bg-white/40 hover:bg-white/60"
              }`}
              aria-label={`Go to photo ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FullscreenPhotoViewer;
