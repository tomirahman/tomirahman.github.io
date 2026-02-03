import { useRef, useEffect } from "react";
import { ExternalLink } from "lucide-react";
import gsap from "@/lib/gsap-config";
import { ScrollTrigger } from "@/lib/gsap-config";
import ShinyText from "./ui/ShinyText";

// Import logos
import mantaLogo from "@/assets/logos/manta.png";
import ssvLogo from "@/assets/logos/ssv.jpg";
import clipperLogo from "@/assets/logos/clipper.jpg";
import sqdLogo from "@/assets/logos/sqd.jpg";
import aztecLogo from "@/assets/logos/aztec.jpg";
import junkfunLogo from "@/assets/logos/junkfun.jpg";
import superfortuneLogo from "@/assets/logos/superfortune.jpg";

interface Experience {
  role: string;
  company: string;
  period: string;
  description: string;
  focus: string;
  logo: string;
  url: string;
}

const experiences: Experience[] = [
  {
    role: "Moderator",
    company: "Junk.fun",
    period: "Nov 2025 – Present",
    description: "Moderator for Junk.fun, a Web3 platform focused on giving dead memecoins a second chance. Powered by BONK and incubated by Manta Network.",
    focus: "Community moderation and scam prevention",
    logo: junkfunLogo,
    url: "https://www.junk.fun/"
  },
  {
    role: "Moderator",
    company: "Superfortune",
    period: "Aug 2025 – Present",
    description: "Moderator for Superfortune, a leading AI-powered metaphysics dApp on BNB Chain.",
    focus: "User education and community engagement",
    logo: superfortuneLogo,
    url: "https://www.superfortune.xyz/"
  },
  {
    role: "Worker Node",
    company: "Aztec Network",
    period: "May 2025 – Present",
    description: "Operate as a validator node on Aztec, a privacy-first Layer 2 on Ethereum.",
    focus: "Validator operations and network reliability",
    logo: aztecLogo,
    url: "https://aztec.network/"
  },
  {
    role: "Moderator",
    company: "Manta Network",
    period: "Oct 2023 – Present",
    description: "Serve as Global and Indonesia Community Moderator for Manta Network, the largest modular Layer 2 ecosystem.",
    focus: "Global & Indonesia community management",
    logo: mantaLogo,
    url: "https://manta.network/"
  },
  {
    role: "Worker Node & Ambassador",
    company: "sqd.ai",
    period: "Aug 2022 – Oct 2023",
    description: "Operated as a worker node enabling decentralized data access for next-generation Web3 applications.",
    focus: "Data infrastructure and ecosystem growth",
    logo: sqdLogo,
    url: "https://www.sqd.ai/"
  },
  {
    role: "Moderator",
    company: "Clipper.Exchange",
    period: "Mar 2022 – Aug 2023",
    description: "Served as a Moderator for Clipper.Exchange, a blue-chip decentralized exchange with a no-impermanent-loss model.",
    focus: "Community discussions and user support",
    logo: clipperLogo,
    url: "https://clipper.exchange/"
  },
  {
    role: "Worker Node",
    company: "ssv.network",
    period: "Apr 2021 – Apr 2022",
    description: "Operated as a validator node on ssv.network, contributing to the SSV 2.0 protocol.",
    focus: "Validator operations on Ethereum",
    logo: ssvLogo,
    url: "https://ssv.network/"
  }
];

/**
 * Experience section with horizontal scroll timeline.
 * Uses GSAP ScrollTrigger for pinning and horizontal scroll.
 * Inspired by Alangrun portfolio reference.
 */
const ExperienceSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const watermarkRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const container = containerRef.current;
    const track = trackRef.current;
    const cards = cardsRef.current;
    const watermark = watermarkRef.current;

    if (!section || !container || !track || cards.length === 0) return;

    // Calculate scroll distance
    const scrollWidth = track.scrollWidth - container.offsetWidth;

    // Create main horizontal scroll timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: () => `+=${scrollWidth + window.innerHeight}`,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
      }
    });

    // Horizontal scroll animation
    tl.to(track, {
      x: -scrollWidth,
      ease: "none",
    });

    // Watermark parallax (moves slower than content)
    if (watermark) {
      gsap.to(watermark, {
        x: -scrollWidth * 0.3,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${scrollWidth + window.innerHeight}`,
          scrub: 1.5,
        }
      });
    }

    // Card entrance animations
    cards.forEach((card, index) => {
      gsap.fromTo(card,
        {
          opacity: 0.3,
          scale: 0.9,
          rotateY: index % 2 === 0 ? -5 : 5,
        },
        {
          opacity: 1,
          scale: 1,
          rotateY: 0,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            containerAnimation: tl,
            start: "left 80%",
            end: "left 30%",
            scrub: true,
          }
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const handleCardClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      ref={sectionRef}
      className="relative bg-gradient-to-b from-sky-100 via-sky-50 to-white overflow-hidden"
    >
      {/* Giant Watermark Background */}
      <div
        ref={watermarkRef}
        className="absolute top-1/2 -translate-y-1/2 left-0 pointer-events-none select-none z-0 whitespace-nowrap"
      >
        <span className="font-display text-[20vw] font-bold text-sky-200/30 tracking-tight watermark-text">
          JOURNEY
        </span>
      </div>

      {/* Section Header - Fixed at left */}
      <div className="absolute top-8 left-8 z-20">
        <span className="font-mono text-xs tracking-wider text-muted-foreground">
          // EXPERIENCE
        </span>
      </div>

      {/* Main Content Container */}
      <div
        ref={containerRef}
        className="h-screen flex items-center overflow-hidden"
      >
        {/* Horizontal Scroll Track */}
        <div
          ref={trackRef}
          className="flex items-center gap-8 pl-[15vw] pr-[30vw] h-full"
          style={{ willChange: 'transform' }}
        >
          {/* Title Card */}
          <div className="flex-shrink-0 w-[300px] md:w-[400px]">
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground mb-4">
              <ShinyText speed={4}>MY</ShinyText>
            </h2>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-sky-500 mb-6">
              <ShinyText speed={4}>JOURNEY</ShinyText>
            </h2>
            <p className="font-body text-muted-foreground max-w-xs">
              Hands-on experience across Web3 infrastructure, validator operations, and community management.
            </p>
            <p className="font-mono text-xs text-muted-foreground mt-4">
              {experiences.length} roles • {new Set(experiences.map(e => e.company)).size} projects
            </p>
          </div>

          {/* Vertical Timeline Line */}
          <div className="flex-shrink-0 w-px h-[60%] bg-gradient-to-b from-transparent via-border to-transparent" />

          {/* Experience Cards */}
          {experiences.map((exp, index) => (
            <div
              key={`${exp.company}-${exp.period}`}
              ref={(el) => { if (el) cardsRef.current[index] = el; }}
              onClick={() => handleCardClick(exp.url)}
              className="flex-shrink-0 w-[320px] md:w-[400px] cursor-pointer group perspective-1000"
              style={{ marginRight: '40px' }}
            >
              <div className="relative bg-card backdrop-blur-sm rounded-2xl border border-border/60 p-6
                            shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:shadow-[0_16px_40px_rgba(0,0,0,0.12)]
                            transition-all duration-300 hover:-translate-y-2 transform-gpu"
              >
                {/* Number Badge */}
                <div className="absolute -top-3 -left-3 w-12 h-12 rounded-full bg-gradient-to-br from-sky-400 to-sky-600 text-white 
                              flex items-center justify-center font-mono text-base font-bold shadow-lg
                              ring-4 ring-white">
                  {String(index + 1).padStart(2, "0")}
                </div>

                {/* Period Badge */}
                <div className="absolute -top-3 right-4 px-3 py-1 bg-background border border-border 
                              rounded-full text-xs font-mono text-muted-foreground">
                  {exp.period}
                </div>

                {/* Logo and Role */}
                <div className="flex items-start gap-4 mt-4 mb-4">
                  <div className="w-14 h-14 rounded-xl overflow-hidden border border-border/50 flex-shrink-0 shadow-sm">
                    <img
                      src={exp.logo}
                      alt={`${exp.company} logo`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-display text-lg text-foreground leading-tight mb-1">
                      {exp.role}
                    </h3>
                    <p className="font-body text-sm text-sky-600 font-medium">
                      {exp.company}
                    </p>
                  </div>
                </div>

                {/* Focus Tag */}
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-sky-100 rounded-full mb-4">
                  <div className="w-1.5 h-1.5 rounded-full bg-sky-500" />
                  <p className="font-body text-xs text-sky-700 uppercase tracking-display">
                    {exp.focus}
                  </p>
                </div>

                {/* Description */}
                <p className="font-body text-sm text-muted-foreground leading-relaxed mb-4">
                  {exp.description}
                </p>

                {/* Visit Link */}
                <div className="pt-4 border-t border-border/50 flex items-center justify-between">
                  <span className="font-mono text-xs text-muted-foreground/50 group-hover:text-sky-500 transition-colors">
                    Visit project
                  </span>
                  <ExternalLink className="w-4 h-4 text-muted-foreground/30 group-hover:text-sky-500 transition-colors" />
                </div>
              </div>
            </div>
          ))}

          {/* End Marker */}
          <div className="flex-shrink-0 flex flex-col items-center justify-center w-[200px]">
            <div className="w-12 h-12 rounded-full bg-sky-500/20 flex items-center justify-center mb-4">
              <div className="w-4 h-4 rounded-full bg-sky-500" />
            </div>
            <p className="font-mono text-xs text-muted-foreground text-center">
              More adventures<br />coming soon...
            </p>
          </div>
        </div>
      </div>

      {/* Scroll Hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 text-muted-foreground z-20">
        <span className="font-mono text-xs">Scroll to explore</span>
        <div className="w-6 h-6 border border-current rounded-full flex items-center justify-center animate-bounce">
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default ExperienceSection;
