import { useState, useRef, useCallback, useEffect } from "react";

interface PhotoCardProps {
  src: string;
  alt: string;
  caption?: string;
  quote?: string;
  delay?: number;
  onOpen?: () => void;
}

const PhotoCard = ({ src, alt, caption, quote, delay = 0, onOpen }: PhotoCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Lazy load with Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "100px", threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePosition({ x, y });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setMousePosition({ x: 0, y: 0 });
  };

  // Single click/tap opens the lightbox - unified for desktop and mobile
  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      onOpen?.();
    },
    [onOpen]
  );

  return (
    <div
      ref={cardRef}
      className="group relative overflow-hidden rounded-lg cursor-pointer animate-reveal-up touch-manipulation 
        bg-card/50 dark:bg-transparent 
        shadow-soft dark:shadow-none
        border border-border/30 dark:border-transparent"
      style={{
        animationDelay: `${delay}ms`,
        transform: isHovered
          ? `perspective(1000px) rotateY(${mousePosition.x * 10}deg) rotateX(${-mousePosition.y * 10}deg) scale(1.02)`
          : "perspective(1000px) rotateY(0deg) rotateX(0deg) scale(1)",
        transition: "transform 0.3s cubic-bezier(0.23, 1, 0.32, 1), box-shadow 0.3s ease",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      onDoubleClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      {/* Image - Dark mode: subtle vignette overlay to soften edges */}
      <div className="aspect-[4/5] overflow-hidden relative bg-muted">
        {/* Loading skeleton */}
        {!isLoaded && (
          <div className="absolute inset-0 bg-muted animate-pulse" />
        )}
        {isInView && (
          <img
            src={src}
            alt={alt}
            loading="lazy"
            onLoad={() => setIsLoaded(true)}
            className={`w-full h-full object-cover transition-all duration-700 ease-gentle group-hover:scale-110 select-none pointer-events-none ${
              isLoaded ? "opacity-100" : "opacity-0"
            }`}
            draggable={false}
          />
        )}
        {/* Dark mode vignette - subtle edge softening */}
        <div className="absolute inset-0 pointer-events-none hidden dark:block opacity-40"
          style={{
            background: "radial-gradient(ellipse at center, transparent 50%, hsl(222 47% 6%) 100%)",
          }}
        />
      </div>

      {/* Overlay - different for light/dark */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-gentle pointer-events-none
          bg-gradient-to-t from-primary/80 via-primary/20 to-transparent
          dark:from-black/70 dark:via-black/30 dark:to-transparent"
      />

      {/* Caption & Quote */}
      {(caption || quote) && (
        <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-gentle pointer-events-none">
          {caption && (
            <p className="font-display text-lg text-primary-foreground dark:text-white tracking-wide mb-2">
              {caption}
            </p>
          )}
          {quote && (
            <p className="font-body text-sm text-primary-foreground/80 dark:text-white/70 italic leading-relaxed">
              &quot;{quote}&quot;
            </p>
          )}
        </div>
      )}

      {/* Hint for interaction - desktop only */}
      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none hidden md:block">
        <span className="text-xs text-primary-foreground/60 dark:text-white/60 bg-primary/40 dark:bg-black/50 px-2 py-1 rounded backdrop-blur-sm">
          Click to expand
        </span>
      </div>

      {/* Shine effect */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${(mousePosition.x + 0.5) * 100}% ${(mousePosition.y + 0.5) * 100}%, rgba(255,255,255,0.3) 0%, transparent 50%)`,
        }}
      />
    </div>
  );
};

export default PhotoCard;
