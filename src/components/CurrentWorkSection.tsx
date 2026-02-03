import { motion } from "framer-motion";
import { useRef } from "react";
import { Server, Users, Zap } from "lucide-react";
import FloatingCryptoIcons from "./FloatingCryptoIcons";
import { AnimatedShinyText } from "./ui/animated-shiny-text";
import Ripple from "./ui/ripple";
import BorderBeam from "./ui/border-beam";

interface CurrentWork {
  icon: React.ReactNode;
  title: string;
  description: string;
  status: string;
}

const currentWork: CurrentWork[] = [
  {
    icon: <Server className="w-6 h-6" />,
    title: "Aztec Node",
    description: "Running validator node on Aztec's privacy-first L2",
    status: "Active"
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: "Validator Operations",
    description: "Maintaining infrastructure across multiple networks",
    status: "Ongoing"
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "Community Building",
    description: "Growing Manta Network's global & Indonesia communities",
    status: "Active"
  }
];

/**
 * Current Work section with clean, neutral background.
 * Grid layout for work items.
 * Animation: fade + translateY with stagger.
 */
const CurrentWorkSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0 }
  };
  const easing: [number, number, number, number] = [0.22, 0.61, 0.36, 1];

  return (
    <div
      ref={sectionRef}
      className="min-h-svh py-[clamp(3rem,8vh,6rem)] px-[clamp(1rem,5vw,3rem)] bg-muted/20 relative overflow-hidden flex items-center"
    >
      {/* Ripple Background Effect */}
      <Ripple mainCircleSize={300} mainCircleOpacity={0.15} numCircles={8} />

      {/* Floating CryptoIcons */}
      <FloatingCryptoIcons section="projects" />

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
              // CURRENT WORK
            </span>
          </div>
        </motion.div>

        {/* Title */}
        <div className="overflow-hidden">
          <motion.h2
            className="font-display text-3xl md:text-4xl lg:text-5xl text-center text-primary mb-4"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: easing, delay: 0.1 }}
          >
            <AnimatedShinyText className="inline-block" shimmerWidth={100}>What I'm Working On</AnimatedShinyText>
          </motion.h2>
        </div>

        <motion.div
          className="flex justify-center mb-12"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: easing, delay: 0.15 }}
        >
          <span className="font-mono text-xs text-muted-foreground px-3 py-1 bg-muted rounded-full">
            January 2026
          </span>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {currentWork.map((work, index) => (
            <motion.div
              key={work.title}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.6,
                delay: 0.2 + index * 0.1,
                ease: easing
              }}
            >
              <div className="bg-card p-6 rounded-xl border border-border hover:border-primary/40 transition-all duration-200 relative overflow-hidden h-full card-interactive group">
                {/* Border Beam - ONLY for Active/Ongoing items if requested, but user implied all 3 */}
                <BorderBeam duration={8} size={100} />

                {/* Number indicator */}
                <span className="absolute top-4 right-4 font-mono text-xs text-muted-foreground/50">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <div className="flex items-center justify-between mb-4">
                  <div className="p-2.5 bg-primary/10 rounded-lg text-primary">
                    {work.icon}
                  </div>
                  <span className="font-body text-xs tracking-wider uppercase px-2.5 py-1 bg-accent-green/10 text-accent-green rounded-full flex items-center gap-1.5">
                    <motion.span
                      className="w-1.5 h-1.5 rounded-full bg-current"
                      animate={{ opacity: [1, 0.4, 1] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                    />
                    {work.status}
                  </span>
                </div>
                <h3 className="font-display text-lg text-primary mb-2">
                  {work.title}
                </h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">
                  {work.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom quote */}
        <motion.div
          className="mt-12 text-center"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5, ease: easing }}
        >
          <p className="font-body text-sm text-muted-foreground/60 italic">
            Always building, always learning
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default CurrentWorkSection;