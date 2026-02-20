
import { motion, useTransform, useSpring, Variants } from "framer-motion";
import { ReactNode, useRef } from "react";
import { useSectionScroll, splitTextToChars, splitTextToWords } from "@/hooks/useGSAPAnimations";

// ============================================
// TEXT REVEAL ANIMATIONS
// ============================================

interface TextRevealProps {
  children: string;
  className?: string;
  delay?: number;
  type?: "chars" | "words" | "lines";
  staggerDelay?: number;
}

// Character-by-character reveal (like GSAP SplitText)
export const TextReveal = ({
  children,
  className = "",
  delay = 0,
  type = "chars",
  staggerDelay = 0.02
}: TextRevealProps) => {
  const items = type === "chars" ? splitTextToChars(children) : splitTextToWords(children);

  return (
    <motion.span
      className={`inline-flex flex-wrap ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
    >
      {items.map((item, index) => (
        <motion.span
          key={index}
          className="inline-block overflow-hidden"
          style={{ marginRight: type === "words" ? "0.25em" : undefined }}
        >
          <motion.span
            className="inline-block"
            variants={{
              hidden: { y: "100%", opacity: 0 },
              visible: {
                y: 0,
                opacity: 1,
                transition: {
                  duration: 0.5,
                  delay: delay + (index * staggerDelay),
                  ease: [0.22, 1, 0.36, 1]
                }
              }
            }}
          >
            {item === " " ? "\u00A0" : item}
          </motion.span>
        </motion.span>
      ))}
    </motion.span>
  );
};

// Mask reveal animation (text slides up behind mask)
interface MaskRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export const MaskReveal = ({ children, className = "", delay = 0 }: MaskRevealProps) => (
  <div className={`overflow-hidden ${className}`}>
    <motion.div
      initial={{ y: "100%" }}
      whileInView={{ y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.22, 1, 0.36, 1]
      }}
    >
      {children}
    </motion.div>
  </div>
);

// Clip reveal animation (reveals from bottom to top with clip-path)
export const ClipReveal = ({ children, className = "", delay = 0 }: MaskRevealProps) => (
  <motion.div
    className={className}
    initial={{ clipPath: "inset(100% 0 0 0)" }}
    whileInView={{ clipPath: "inset(0% 0 0 0)" }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{
      duration: 1,
      delay,
      ease: [0.22, 1, 0.36, 1]
    }}
  >
    {children}
  </motion.div>
);

// ============================================
// SCROLL-TRIGGERED ANIMATIONS
// ============================================

interface ScrollFadeProps {
  children: ReactNode;
  className?: string;
  direction?: "up" | "down" | "left" | "right";
  distance?: number;
}

export const ScrollFade = ({
  children,
  className = "",
  direction = "up",
  distance = 60
}: ScrollFadeProps) => {
  const getInitialPosition = () => {
    switch (direction) {
      case "up": return { y: distance, x: 0 };
      case "down": return { y: -distance, x: 0 };
      case "left": return { x: distance, y: 0 };
      case "right": return { x: -distance, y: 0 };
    }
  };

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, ...getInitialPosition() }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1]
      }}
    >
      {children}
    </motion.div>
  );
};

// Parallax scroll element
interface ParallaxScrollProps {
  children: ReactNode;
  className?: string;
  speed?: number; // -1 to 1, negative = opposite direction
}

export const ParallaxScroll = ({ children, className = "", speed = 0.5 }: ParallaxScrollProps) => {
  const { ref, progress } = useSectionScroll();
  const y = useTransform(progress, [0, 1], [speed * -100, speed * 100]);
  const smoothY = useSpring(y, { stiffness: 100, damping: 30 });

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ y: smoothY }}
    >
      {children}
    </motion.div>
  );
};

// ============================================
// STAGGER ANIMATIONS
// ============================================

interface StaggerRevealProps {
  children: ReactNode[];
  className?: string;
  staggerDelay?: number;
  containerDelay?: number;
}

export const StaggerReveal = ({
  children,
  className = "",
  staggerDelay = 0.1,
  containerDelay = 0
}: StaggerRevealProps) => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: containerDelay
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={containerVariants}
    >
      {children.map((child, index) => (
        <motion.div key={index} variants={itemVariants}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
};

// ============================================
// MAGNETIC BUTTON
// ============================================

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  strength?: number;
}

export const MagneticButton = ({ children, className = "", strength = 0.4 }: MagneticButtonProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    ref.current.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
  };

  const handleMouseLeave = () => {
    if (!ref.current) return;
    ref.current.style.transform = "translate(0, 0)";
  };

  return (
    <motion.div
      ref={ref}
      className={`transition-transform duration-300 ease-out ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.div>
  );
};

// ============================================
// ANIMATED COUNTER
// ============================================

interface AnimatedCounterProps {
  value: string;
  className?: string;
  duration?: number;
}

export const AnimatedCounter = ({ value, className = "", duration = 2 }: AnimatedCounterProps) => {
  const numericValue = parseInt(value.replace(/\D/g, "")) || 0;
  const suffix = value.replace(/[0-9]/g, "");

  return (
    <motion.span
      className={className}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <motion.span
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        {value}
      </motion.span>
    </motion.span>
  );
};

// ============================================
// LINE DRAW ANIMATION
// ============================================

interface LineDrawProps {
  className?: string;
  direction?: "horizontal" | "vertical";
  delay?: number;
}

export const LineDraw = ({ className = "", direction = "horizontal", delay = 0 }: LineDrawProps) => (
  <motion.div
    className={`bg-border ${direction === "horizontal" ? "h-px w-full" : "w-px h-full"} ${className}`}
    initial={{ scaleX: direction === "horizontal" ? 0 : 1, scaleY: direction === "vertical" ? 0 : 1 }}
    whileInView={{ scaleX: 1, scaleY: 1 }}
    viewport={{ once: true }}
    transition={{
      duration: 1,
      delay,
      ease: [0.22, 1, 0.36, 1]
    }}
    style={{
      transformOrigin: direction === "horizontal" ? "left" : "top"
    }}
  />
);

// ============================================
// ROTATE IN ANIMATION
// ============================================

interface RotateInProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  rotation?: number;
}

export const RotateIn = ({ children, className = "", delay = 0, rotation = 10 }: RotateInProps) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, rotate: rotation, y: 30 }}
    whileInView={{ opacity: 1, rotate: 0, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{
      duration: 0.8,
      delay,
      ease: [0.22, 1, 0.36, 1]
    }}
  >
    {children}
  </motion.div>
);

// ============================================
// SCALE REVEAL
// ============================================

interface ScaleRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export const ScaleReveal = ({ children, className = "", delay = 0 }: ScaleRevealProps) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, scale: 0.8 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{
      duration: 0.6,
      delay,
      ease: [0.22, 1, 0.36, 1]
    }}
  >
    {children}
  </motion.div>
);

// ============================================
// BLUR REVEAL
// ============================================

interface BlurRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export const BlurReveal = ({ children, className = "", delay = 0 }: BlurRevealProps) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, filter: "blur(10px)" }}
    whileInView={{ opacity: 1, filter: "blur(0px)" }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{
      duration: 0.8,
      delay,
      ease: [0.22, 1, 0.36, 1]
    }}
  >
    {children}
  </motion.div>
);
