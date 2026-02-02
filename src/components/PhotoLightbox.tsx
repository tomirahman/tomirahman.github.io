import { useEffect, useState, useCallback, useRef } from "react";
import { createPortal } from "react-dom";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { useTheme } from "next-themes";

interface Photo {
  id: number | string;
  src: string;
  alt: string;
  caption?: string;
  quote?: string;
}

interface PhotoLightboxProps {
  photos: Photo[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

const PhotoLightbox = ({ photos, currentIndex, isOpen, onClose, onNavigate }: PhotoLightboxProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [mounted, setMounted] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const { resolvedTheme } = useTheme();

  const currentPhoto = photos[currentIndex];
  const isDark = resolvedTheme === "dark";

  useEffect(() => {
    setMounted(true);
  }, []);

  const goToPrevious = useCallback(() => {
    if (currentIndex > 0) {
      setImageLoaded(false);
      onNavigate(currentIndex - 1);
    }
  }, [currentIndex, onNavigate]);

  const goToNext = useCallback(() => {
    if (currentIndex < photos.length - 1) {
      setImageLoaded(false);
      onNavigate(currentIndex + 1);
    }
  }, [currentIndex, photos.length, onNavigate]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        goToPrevious();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        goToNext();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
      setImageLoaded(false);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose, goToPrevious, goToNext]);

  // Swipe handling for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchEndX.current = null;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return;

    const diff = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 50;

    if (Math.abs(diff) > minSwipeDistance) {
      if (diff > 0) {
        goToNext();
      } else {
        goToPrevious();
      }
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  // Don't render if not open or no photo data
  if (!mounted || !isOpen || !currentPhoto) return null;

  const hasPrevious = currentIndex > 0;
  const hasNext = currentIndex < photos.length - 1;

  // Explicit colors to avoid CSS variable inheritance issues in portal
  const colors = isDark
    ? {
        bg: "hsl(222 47% 6% / 0.98)",
        bgSolid: "hsl(222 47% 6%)",
        secondary: "hsl(220 30% 12% / 0.9)",
        secondaryHover: "hsl(220 30% 15%)",
        text: "hsl(0 0% 98%)",
        textMuted: "hsl(220 15% 65%)",
        border: "hsl(220 20% 15%)",
      }
    : {
        bg: "hsl(0 0% 100% / 0.98)",
        bgSolid: "hsl(0 0% 100%)",
        secondary: "hsl(220 30% 96% / 0.9)",
        secondaryHover: "hsl(220 30% 92%)",
        text: "hsl(222 47% 11%)",
        textMuted: "hsl(222 20% 45%)",
        border: "hsl(220 20% 90%)",
      };

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.bg,
        backdropFilter: "blur(12px)",
        animation: "fade-in 200ms ease-out forwards",
      }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Close button */}
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onClose();
        }}
        style={{
          position: "absolute",
          top: "1rem",
          right: "1rem",
          padding: "0.75rem",
          borderRadius: "9999px",
          backgroundColor: colors.secondary,
          border: "none",
          cursor: "pointer",
          zIndex: 20,
          transition: "background-color 200ms",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = colors.secondaryHover)}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = colors.secondary)}
        aria-label="Close"
      >
        <X style={{ width: 20, height: 20, color: colors.text }} />
      </button>

      {/* Previous button */}
      {hasPrevious && (
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            goToPrevious();
          }}
          style={{
            position: "absolute",
            left: "0.5rem",
            top: "50%",
            transform: "translateY(-50%)",
            padding: "0.75rem",
            borderRadius: "9999px",
            backgroundColor: colors.secondary,
            border: "none",
            cursor: "pointer",
            zIndex: 20,
            transition: "background-color 200ms",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = colors.secondaryHover)}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = colors.secondary)}
          aria-label="Previous photo"
        >
          <ChevronLeft style={{ width: 28, height: 28, color: colors.text }} />
        </button>
      )}

      {/* Next button */}
      {hasNext && (
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            goToNext();
          }}
          style={{
            position: "absolute",
            right: "0.5rem",
            top: "50%",
            transform: "translateY(-50%)",
            padding: "0.75rem",
            borderRadius: "9999px",
            backgroundColor: colors.secondary,
            border: "none",
            cursor: "pointer",
            zIndex: 20,
            transition: "background-color 200ms",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = colors.secondaryHover)}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = colors.secondary)}
          aria-label="Next photo"
        >
          <ChevronRight style={{ width: 28, height: 28, color: colors.text }} />
        </button>
      )}

      {/* Photo counter */}
      <div
        style={{
          position: "absolute",
          top: "1rem",
          left: "1rem",
          fontSize: "0.875rem",
          color: colors.textMuted,
          zIndex: 20,
        }}
      >
        {currentIndex + 1} / {photos.length}
      </div>

      {/* Main content area - click backdrop to close */}
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "4rem 1rem",
        }}
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            onClose();
          }
        }}
      >
        {/* Image container */}
        <div
          style={{
            position: "relative",
            flex: 1,
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: 0,
          }}
        >
          {!imageLoaded && (
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  width: 32,
                  height: 32,
                  border: `2px solid ${colors.text}`,
                  borderTopColor: "transparent",
                  borderRadius: "50%",
                  animation: "spin 1s linear infinite",
                }}
              />
            </div>
          )}
          <img
            src={currentPhoto.src}
            alt={currentPhoto.alt}
            onLoad={() => setImageLoaded(true)}
            style={{
              maxWidth: "100%",
              maxHeight: "100%",
              objectFit: "contain",
              opacity: imageLoaded ? 1 : 0,
              transition: "opacity 300ms",
              userSelect: "none",
            }}
            draggable={false}
          />
        </div>

        {/* Caption & Quote */}
        {(currentPhoto.caption || currentPhoto.quote) && (
          <div
            style={{
              width: "100%",
              maxWidth: 672,
              textAlign: "center",
              paddingTop: "1rem",
              flexShrink: 0,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {currentPhoto.caption && (
              <h3
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "1.5rem",
                  color: colors.text,
                  marginBottom: "0.5rem",
                }}
              >
                {currentPhoto.caption}
              </h3>
            )}
            {currentPhoto.quote && (
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "1rem",
                  color: colors.textMuted,
                  fontStyle: "italic",
                  lineHeight: 1.6,
                }}
              >
                &quot;{currentPhoto.quote}&quot;
              </p>
            )}
          </div>
        )}
      </div>

      {/* Swipe hint for mobile */}
      <div
        style={{
          position: "absolute",
          bottom: "1rem",
          left: "50%",
          transform: "translateX(-50%)",
          fontSize: "0.75rem",
          color: colors.textMuted,
          opacity: 0.6,
        }}
        className="md:hidden"
      >
        Swipe to navigate
      </div>

      {/* Inline keyframes for spin animation */}
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>,
    document.body
  );
};

export default PhotoLightbox;
