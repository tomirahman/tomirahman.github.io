import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import { Server, Users, TrendingUp, FileText, Search, Share2 } from "lucide-react";
import FloatingCryptoIcons from "./FloatingCryptoIcons";
import MagicBento from "./ui/MagicBento";
import { AnimatedShinyText } from "./ui/animated-shiny-text";

interface Skill {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const coreSkills: Skill[] = [
  {
    icon: <Server className="w-8 h-8" />,
    title: "Node & Validator Operations",
    description: "Running and maintaining validator nodes on Aztec, SSV.Network, SQD.ai, and Ethereum-based systems with focus on performance and reliability."
  },
  {
    icon: <Users className="w-8 h-8" />,
    title: "Community Moderation",
    description: "Managing global and regional Web3 communities across Telegram, Discord, and Twitter/X with expertise in user support and sentiment management."
  },
  {
    icon: <TrendingUp className="w-8 h-8" />,
    title: "Ecosystem Growth",
    description: "Driving adoption through educational threads, AMAs, community programs, and regional engagement strategies, particularly in Indonesia."
  }
];

const supportingSkills: Skill[] = [
  {
    icon: <FileText className="w-6 h-6" />,
    title: "Content Writing",
    description: "Creating clear community updates, guides, and announcements that translate technical concepts into accessible language."
  },
  {
    icon: <Search className="w-6 h-6" />,
    title: "Research & Analysis",
    description: "Monitoring protocol upgrades and translating technical updates into understandable insights."
  },
  {
    icon: <Share2 className="w-6 h-6" />,
    title: "Social Media Management",
    description: "Managing Web3 project presence across multiple social platforms with engagement strategies."
  }
];

/**
 * Skills section with clean, neutral background.
 * Grid layout: 3-4 columns desktop, 2 columns mobile.
 * Animation: GSAP ScrollTrigger for enhanced staggered reveal.
 */
const SkillsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  // Parallax for watermark
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  const watermarkX = useTransform(scrollYProgress, [0, 1], ["30%", "15%"]);
  const smoothWatermarkX = useSpring(watermarkX, { stiffness: 100, damping: 30 });

  const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0 }
  };
  const easing: [number, number, number, number] = [0.22, 0.61, 0.36, 1];

  return (
    <div
      ref={sectionRef}
      className="min-h-svh py-[clamp(3rem,8vh,6rem)] px-[clamp(1rem,5vw,3rem)] bg-muted/30 relative overflow-hidden flex items-center"
    >
      {/* Giant Watermark Background with Parallax */}
      <motion.div
        className="absolute top-1/2 right-0 -translate-y-1/2 pointer-events-none select-none z-0 whitespace-nowrap"
        style={{ x: smoothWatermarkX }}
      >
        <span className="font-display text-[30vw] font-bold text-foreground/[0.03] tracking-tight watermark-text">
          TOOLS
        </span>
      </motion.div>

      {/* Floating Crypto Icons */}
      <FloatingCryptoIcons section="skills" />

      <div className="max-w-6xl mx-auto relative z-10">
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
              // TOOLKIT
            </span>
          </div>
        </motion.div>

        {/* Title */}
        <div className="text-center mb-4">
          <div className="overflow-hidden inline-block">
            <motion.h2
              className="font-display text-4xl md:text-5xl lg:text-6xl text-primary inline tracking-display"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: easing, delay: 0.1 }}
            >
              <AnimatedShinyText className="inline-block" shimmerWidth={100}>
                TECH
              </AnimatedShinyText>
            </motion.h2>
          </div>
          <div className="overflow-hidden inline-block ml-3">
            <motion.span
              className="font-display text-4xl md:text-5xl lg:text-6xl text-muted-foreground inline-block tracking-display"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2, ease: easing }}
            >
              <AnimatedShinyText className="inline-block" shimmerWidth={100}>
                STACK
              </AnimatedShinyText>
            </motion.span>
          </div>
        </div>

        <motion.p
          className="font-body text-muted-foreground max-w-2xl mx-auto text-center mb-12"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: easing, delay: 0.25 }}
        >
          A curated collection of skills and technologies I use to build robust, scalable Web3 infrastructure and thriving communities.
        </motion.p>

        {/* Core Expertise with MagicBento */}
        <div className="mb-16">
          <motion.h3
            className="font-display text-2xl md:text-3xl text-center text-primary/80 mb-8"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: easing, delay: 0.3 }}
          >
            Core Expertise
          </motion.h3>

          <MagicBento
            cards={coreSkills.map((skill, index) => ({
              icon: skill.icon,
              title: skill.title,
              description: skill.description,
              label: String(index + 1).padStart(2, "0")
            }))}
            enableStars={true}
            enableSpotlight={true}
            enableBorderGlow={true}
            enableTilt={true}
            clickEffect={true}
            enableMagnetism={true}
            glowColor="132, 0, 255"
            particleCount={8}
          />
        </div>

        {/* Simple divider */}
        <div className="flex justify-center py-8">
          <div className="w-16 h-px bg-border" />
        </div>

        {/* Supporting Skills */}
        <div>
          <motion.h3
            className="font-display text-2xl md:text-3xl text-center text-primary/80 mb-8"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: easing, delay: 0.4 }}
          >
            Supporting Skills
          </motion.h3>

          <MagicBento
            cards={supportingSkills.map((skill, index) => ({
              icon: skill.icon,
              title: skill.title,
              description: skill.description,
              label: String(index + 1).padStart(2, "0")
            }))}
            enableStars={true}
            enableSpotlight={true}
            enableBorderGlow={true}
            enableTilt={true}
            clickEffect={true}
            enableMagnetism={true}
            glowColor="56, 189, 248"
            particleCount={6}
          />
        </div>
      </div>
    </div>
  );
};

export default SkillsSection;