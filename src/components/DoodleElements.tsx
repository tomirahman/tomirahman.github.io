import { motion } from "framer-motion";

interface DoodleProps {
  className?: string;
  opacity?: number;
}

// SVG Doodle Icons
const StarDoodle = ({ className = "", opacity = 0.08 }: DoodleProps) => (
  <svg 
    className={className} 
    style={{ opacity }} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

const WaveDoodle = ({ className = "", opacity = 0.08 }: DoodleProps) => (
  <svg 
    className={className} 
    style={{ opacity }} 
    viewBox="0 0 100 30" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2"
    strokeLinecap="round"
  >
    <path d="M0 15 Q 25 0, 50 15 T 100 15" />
  </svg>
);

const SparklesDoodle = ({ className = "", opacity = 0.08 }: DoodleProps) => (
  <svg 
    className={className} 
    style={{ opacity }} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2"
    strokeLinecap="round"
  >
    <path d="M12 3v4m0 10v4M3 12h4m10 0h4" />
    <path d="M5.6 5.6l2.8 2.8m7.2 7.2l2.8 2.8M5.6 18.4l2.8-2.8m7.2-7.2l2.8-2.8" />
  </svg>
);

const HeartDoodle = ({ className = "", opacity = 0.08 }: DoodleProps) => (
  <svg 
    className={className} 
    style={{ opacity }} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

const ArrowDoodle = ({ className = "", opacity = 0.08 }: DoodleProps) => (
  <svg 
    className={className} 
    style={{ opacity }} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

const CircleDoodle = ({ className = "", opacity = 0.08 }: DoodleProps) => (
  <svg 
    className={className} 
    style={{ opacity }} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2"
  >
    <circle cx="12" cy="12" r="10" strokeDasharray="4 4" />
  </svg>
);

const FlowerDoodle = ({ className = "", opacity = 0.08 }: DoodleProps) => (
  <svg 
    className={className} 
    style={{ opacity }} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="1.5"
  >
    <circle cx="12" cy="12" r="3" />
    <ellipse cx="12" cy="5" rx="2" ry="4" />
    <ellipse cx="12" cy="19" rx="2" ry="4" />
    <ellipse cx="5" cy="12" rx="4" ry="2" />
    <ellipse cx="19" cy="12" rx="4" ry="2" />
  </svg>
);

// Floating doodle component with animation
interface FloatingDoodleProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  x?: number;
  y?: number;
}

const FloatingDoodle = ({ 
  children, 
  delay = 0, 
  duration = 4, 
  x = 0, 
  y = 8 
}: FloatingDoodleProps) => (
  <motion.div
    animate={{ 
      y: [0, y, 0],
      x: [0, x, 0],
      rotate: [0, 3, -3, 0]
    }}
    transition={{ 
      duration,
      repeat: Infinity,
      ease: "easeInOut",
      delay
    }}
  >
    {children}
  </motion.div>
);

// Section separator with doodles
export const DoodleSeparator = ({ className = "" }: { className?: string }) => (
  <div className={`relative py-8 flex items-center justify-center ${className}`}>
    <motion.div 
      className="flex items-center gap-4 text-primary/20"
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <StarDoodle className="w-5 h-5" opacity={0.3} />
      <div className="w-16 h-px bg-primary/20" />
      <SparklesDoodle className="w-6 h-6" opacity={0.3} />
      <div className="w-16 h-px bg-primary/20" />
      <StarDoodle className="w-5 h-5" opacity={0.3} />
    </motion.div>
  </div>
);

// Background doodle pattern
export const DoodleBackground = ({ className = "" }: { className?: string }) => (
  <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
    {/* Top left cluster */}
    <FloatingDoodle delay={0} y={10}>
      <StarDoodle className="absolute top-[10%] left-[5%] w-8 h-8 text-blue-400" opacity={0.08} />
    </FloatingDoodle>
    <FloatingDoodle delay={0.5} y={-8} x={5}>
      <HeartDoodle className="absolute top-[20%] left-[12%] w-6 h-6 text-pink-400" opacity={0.06} />
    </FloatingDoodle>
    
    {/* Top right cluster */}
    <FloatingDoodle delay={1} y={12}>
      <SparklesDoodle className="absolute top-[15%] right-[8%] w-10 h-10 text-yellow-400" opacity={0.08} />
    </FloatingDoodle>
    <FloatingDoodle delay={0.7} y={-10}>
      <CircleDoodle className="absolute top-[25%] right-[15%] w-8 h-8 text-purple-400" opacity={0.06} />
    </FloatingDoodle>
    
    {/* Middle */}
    <FloatingDoodle delay={1.2} x={10} y={5}>
      <WaveDoodle className="absolute top-[45%] left-[3%] w-20 h-6 text-cyan-400" opacity={0.06} />
    </FloatingDoodle>
    <FloatingDoodle delay={0.3} y={8}>
      <FlowerDoodle className="absolute top-[50%] right-[5%] w-10 h-10 text-green-400" opacity={0.08} />
    </FloatingDoodle>
    
    {/* Bottom */}
    <FloatingDoodle delay={0.8} y={-12}>
      <ArrowDoodle className="absolute bottom-[20%] left-[10%] w-8 h-8 text-orange-400" opacity={0.06} />
    </FloatingDoodle>
    <FloatingDoodle delay={1.5} y={10} x={-5}>
      <StarDoodle className="absolute bottom-[15%] right-[12%] w-6 h-6 text-blue-400" opacity={0.08} />
    </FloatingDoodle>
    <FloatingDoodle delay={0.4} y={6}>
      <HeartDoodle className="absolute bottom-[30%] right-[25%] w-5 h-5 text-pink-400" opacity={0.05} />
    </FloatingDoodle>
  </div>
);

// Hero doodles - more prominent for the hero section
export const HeroDoodles = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden">
    <FloatingDoodle delay={0} duration={5} y={15}>
      <div className="absolute top-[8%] left-[8%] text-4xl opacity-20">✨</div>
    </FloatingDoodle>
    <FloatingDoodle delay={0.5} duration={4} y={-12}>
      <div className="absolute top-[15%] right-[10%] text-3xl opacity-15">⭐</div>
    </FloatingDoodle>
    <FloatingDoodle delay={1} duration={6} y={10} x={5}>
      <div className="absolute top-[35%] left-[5%] text-2xl opacity-20">💙</div>
    </FloatingDoodle>
    <FloatingDoodle delay={0.8} duration={4.5} y={-10}>
      <div className="absolute bottom-[25%] right-[8%] text-3xl opacity-15">🌸</div>
    </FloatingDoodle>
    <FloatingDoodle delay={1.2} duration={5.5} y={8}>
      <div className="absolute bottom-[35%] left-[12%] text-2xl opacity-20">💫</div>
    </FloatingDoodle>
    <FloatingDoodle delay={0.3} duration={7} y={-8} x={-5}>
      <div className="absolute top-[55%] right-[15%] text-2xl opacity-15">🔵</div>
    </FloatingDoodle>
  </div>
);

export {
  StarDoodle,
  WaveDoodle,
  SparklesDoodle,
  HeartDoodle,
  ArrowDoodle,
  CircleDoodle,
  FlowerDoodle,
  FloatingDoodle
};
