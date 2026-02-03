import { motion } from "framer-motion";
import { useRef } from "react";
import { CheckCircle } from "lucide-react";
import FloatingCryptoIcons from "./FloatingCryptoIcons";
import { AnimatedShinyText } from "./ui/animated-shiny-text";
import Particles from "./ui/particles";
import TextReveal from "./ui/text-reveal";

interface AboutSectionProps {
  stats?: { label: string; value: string }[];
}

/**
 * About section with fade-in animations.
 */
const AboutSection = ({ stats }: AboutSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);

  const differentiators = [
    "Hands-on experience running validator nodes on Ethereum L2s",
    "Global and Indonesia-focused community expertise",
    "Bridge between technical infrastructure and community education"
  ];

  // Unified animation config
  const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0 }
  };
  const easing: [number, number, number, number] = [0.22, 0.61, 0.36, 1];


  return (
    <div
      ref={sectionRef}
      className="min-h-svh py-[clamp(3rem,8vh,6rem)] relative flex flex-col items-center"
      style={{ backgroundColor: '#84CFFC' }}
    >
      {/* Background with overflow hidden for particles/watermark */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Giant Watermark Background */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none z-0 whitespace-nowrap"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: easing }}
        >
          <span className="font-display text-[25vw] font-bold text-foreground/[0.03] tracking-tight">
            ABOUT ME
          </span>
        </motion.div>

        {/* Floating Crypto Icons */}
        <FloatingCryptoIcons section="about" />

        {/* Interactive Particles Background */}
        <Particles
          className="absolute inset-0 z-[1]"
          quantity={80}
          staticity={30}
          ease={80}
          size={0.5}
          color="#ffffff"
          vx={0}
          vy={0}
        />
      </div>

      {/* Main Content */}
      <div className="w-full max-w-4xl mx-auto relative z-10 px-[clamp(1rem,5vw,3rem)]">
        {/* Section Label */}
        <motion.div
          className="mb-6 text-center"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: easing }}
        >
          <div className="flex items-center justify-center gap-3">
            <span className="font-mono text-xs tracking-wider text-muted-foreground">
              // ABOUT
            </span>
          </div>
        </motion.div>

        {/* Title with ShinyText */}
        <div className="text-center mb-8">
          <div className="overflow-hidden">
            <motion.h2
              className="font-display text-4xl md:text-5xl lg:text-6xl inline tracking-display"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: easing, delay: 0.1 }}
            >
              <AnimatedShinyText className="inline-block" shimmerWidth={100}>
                PASSIONATE
              </AnimatedShinyText>
            </motion.h2>
          </div>
          <div className="overflow-hidden inline-block ml-3">
            <motion.span
              className="font-display text-4xl md:text-5xl lg:text-6xl inline-block tracking-display"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2, ease: easing }}
            >
              <AnimatedShinyText className="inline-block text-muted-foreground" shimmerWidth={100}>
                BUILDER
              </AnimatedShinyText>
            </motion.span>
          </div>
        </div>

        {/* Decorative line */}
        <motion.div
          className="mx-auto max-w-[120px] h-px bg-border mb-8"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: easing, delay: 0.25 }}
        />
      </div>

      {/* Text Reveal - Replaces the static paragraph, stats, and lists */}
      <div className="w-full relative z-10">
        <TextReveal
          text="I am a Web3 infrastructure and community professional operating validator nodes across Ethereum L2s. I bridge the gap between technical infrastructure and human communities. I bring hands-on experience running validator nodes, global and Indonesia-focused community expertise, and over 5+ years in Web3 Infrastructure. I have moderated 10+ communities and operated 5+ networks, focusing on Global and Indonesian regions."
          className="h-[300vh]"
        />
      </div>

      <div className="w-full max-w-4xl mx-auto relative z-10 px-[clamp(1rem,5vw,3rem)]">
        {/* Bottom quote */}
        <motion.div
          className="mt-16 text-center"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.7, ease: easing }}
        >
          <p className="font-body text-sm text-muted-foreground italic">
            "Building bridges between technical infrastructure and human communities"
          </p>
        </motion.div>
      </div>
    </div >
  );
};

export default AboutSection;
