import { useEffect, useState, useRef, useCallback } from "react";

interface UseRevealAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

interface RevealAnimationResult {
  ref: React.RefObject<HTMLElement>;
  isVisible: boolean;
  hasAnimated: boolean;
}

export const useRevealAnimation = (
  options: UseRevealAnimationOptions = {}
): RevealAnimationResult => {
  const { threshold = 0.1, rootMargin = "0px", triggerOnce = true } = options;
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      setIsVisible(true);
      setHasAnimated(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (triggerOnce) {
            setHasAnimated(true);
            observer.disconnect();
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold, rootMargin, triggerOnce]);

  return { ref, isVisible, hasAnimated };
};

// Hook for staggered children animations
export const useStaggeredReveal = (
  itemCount: number,
  options: UseRevealAnimationOptions = {}
) => {
  const { ref, isVisible, hasAnimated } = useRevealAnimation(options);
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  // Timing based on specs
  const staggerDelay = isMobile ? 60 : 80; // ms
  const baseDuration = isMobile ? 360 : 420; // ms
  const translateX = isMobile ? 16 : 24; // px

  const getItemStyle = useCallback(
    (index: number): React.CSSProperties => {
      const prefersReducedMotion =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (prefersReducedMotion) {
        return { opacity: 1, transform: "none" };
      }

      return {
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateX(0)" : `translateX(${translateX}px)`,
        transition: `opacity ${baseDuration}ms cubic-bezier(0.22, 1, 0.36, 1), transform ${baseDuration}ms cubic-bezier(0.22, 1, 0.36, 1)`,
        transitionDelay: `${index * staggerDelay}ms`,
      };
    },
    [isVisible, staggerDelay, baseDuration, translateX]
  );

  const getEntryStyle = useCallback(
    (index: number): React.CSSProperties => {
      const prefersReducedMotion =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (prefersReducedMotion) {
        return { opacity: 1, transform: "none" };
      }

      return {
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(16px)",
        transition: `opacity 380ms cubic-bezier(0.22, 1, 0.36, 1), transform 380ms cubic-bezier(0.22, 1, 0.36, 1)`,
        transitionDelay: `${index * staggerDelay}ms`,
      };
    },
    [isVisible, staggerDelay]
  );

  return {
    ref,
    isVisible,
    hasAnimated,
    getItemStyle,
    getEntryStyle,
  };
};

// Hover animation hook (desktop only)
export const useHoverAnimation = () => {
  const [isHovered, setIsHovered] = useState(false);
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  const hoverProps = {
    onMouseEnter: () => !isMobile && setIsHovered(true),
    onMouseLeave: () => !isMobile && setIsHovered(false),
  };

  const hoverStyle: React.CSSProperties = isMobile
    ? {}
    : {
        transform: isHovered ? "translateY(-4px)" : "translateY(0)",
        transition: "transform 180ms ease-out, box-shadow 180ms ease-out",
      };

  return { isHovered, hoverProps, hoverStyle };
};
