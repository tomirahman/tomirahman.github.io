import { motion } from "framer-motion";
import { useRef } from "react";
import { CheckCircle } from "lucide-react";
import FloatingCryptoIcons from "./FloatingCryptoIcons";
import ShinyText from "./ui/ShinyText";

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
      className="min-h-screen py-24 md:py-32 px-6 relative overflow-hidden flex items-center"
      style={{ backgroundColor: '#84CFFC' }}
    >
      {/* Curtain removed - section now shows content directly */}

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

      {/* Main Content */}
      <div className="max-w-4xl mx-auto relative z-10">
        {/* Section Label */}
        <motion.div
          className="mb-6"
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
              <ShinyText speed={4} shimmerWidth={120}>
                PASSIONATE
              </ShinyText>
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
              <ShinyText speed={4.5} shimmerWidth={100} className="text-muted-foreground">
                BUILDER
              </ShinyText>
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

        {/* Who I am */}
        <motion.div
          className="text-center mb-8"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: easing, delay: 0.3 }}
        >
          <p className="font-body text-lg md:text-xl leading-relaxed text-foreground/90 mb-4">
            I'm a <span className="font-semibold text-primary underline decoration-accent/50 decoration-2 underline-offset-4">Web3 infrastructure and community professional</span> with experience operating validator nodes across Ethereum-based networks.
          </p>
          <p className="font-body text-lg md:text-xl leading-relaxed text-foreground/80">
            I actively moderate global and regional Web3 communities, translating complex technical updates into clear, actionable insights.
          </p>
        </motion.div>

        {/* What makes me different */}
        <motion.div
          className="mb-16"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: easing, delay: 0.4 }}
        >
          <div className="bg-card rounded-xl p-6 md:p-8 border border-border shadow-soft">
            <div className="flex flex-col items-center gap-4">
              {differentiators.map((item, index) => (
                <motion.div
                  key={index}
                  className="flex items-center gap-3 text-foreground/90"
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.5 + index * 0.1, ease: easing }}
                >
                  <CheckCircle className="w-5 h-5 flex-shrink-0 text-primary" />
                  <span className="font-body text-base md:text-lg">{item}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        {stats && stats.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: 0.6 + index * 0.08,
                  ease: easing
                }}
              >
                <div className="font-display text-4xl md:text-5xl mb-2 text-primary">
                  {stat.value}
                </div>
                <div className="font-body text-sm tracking-display uppercase text-slate-700">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        )}

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
