import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef, useEffect } from "react";
import { Server, Users, TrendingUp, FileText, Search, Share2 } from "lucide-react";
import FloatingCryptoIcons from "./FloatingCryptoIcons";
import MagicBento from "./ui/MagicBento";
import gsap from "@/lib/gsap-config";
import { ScrollTrigger } from "@/lib/gsap-config";

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
  const supportCardsRef = useRef<HTMLDivElement[]>([]);

  // Parallax for watermark
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  const watermarkX = useTransform(scrollYProgress, [0, 1], ["30%", "15%"]);
  const smoothWatermarkX = useSpring(watermarkX, { stiffness: 100, damping: 30 });

  // GSAP ScrollTrigger for supporting card animations
  useEffect(() => {
    const supportCards = supportCardsRef.current;

    // Animate supporting skill cards
    supportCards.forEach((card, index) => {
      if (!card) return;
      gsap.fromTo(card,
        {
          opacity: 0,
          x: index % 2 === 0 ? -40 : 40,
          scale: 0.95,
        },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            end: "top 65%",
            toggleActions: "play none none reverse",
          },
          delay: index * 0.08,
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (supportCards.includes(trigger.vars.trigger as HTMLDivElement)) {
          trigger.kill();
        }
      });
    };
  }, []);

  const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0 }
  };
  const easing: [number, number, number, number] = [0.22, 0.61, 0.36, 1];

  return (
    <div
      ref={sectionRef}
      className="min-h-screen py-24 md:py-32 px-6 bg-muted/30 relative overflow-hidden flex items-center"
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
              TECH
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
              STACK
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

          <div className="grid md:grid-cols-3 gap-4">
            {supportingSkills.map((skill, index) => (
              <div
                key={skill.title}
                ref={(el) => { if (el) supportCardsRef.current[index] = el; }}
                className="group"
              >
                <div className="bg-card/80 p-6 rounded-lg border border-border hover:border-primary/30 transition-all duration-200 h-full card-interactive">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="text-primary/70 p-2 bg-primary/5 rounded-lg">
                      {skill.icon}
                    </div>
                    <h4 className="font-display text-lg text-primary">
                      {skill.title}
                    </h4>
                  </div>
                  <p className="font-body text-muted-foreground text-sm leading-relaxed">
                    {skill.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillsSection;