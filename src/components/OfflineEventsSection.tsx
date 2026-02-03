import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Calendar, MapPin } from "lucide-react";
import { NodesPattern, CornerAccent, VerticalGuide } from "./BackgroundPatterns";
import { MaskReveal, ScrollFade, LineDraw } from "./ui/GSAPAnimations";
import SectionDivider from "./SectionDivider";
import FloatingCryptoIcons from "./FloatingCryptoIcons";
import Masonry from "./ui/Masonry";
import TrueFocus from "./ui/TrueFocus";

// Import event photos
import coinfest1 from "@/assets/events/coinfest-1.jpg";
import coinfest2 from "@/assets/events/coinfest-2.jpg";
import coinfest3 from "@/assets/events/coinfest-3.jpg";
import hackerhouse1 from "@/assets/events/hackerhouse-1.jpg";
import hackerhouse2 from "@/assets/events/hackerhouse-2.jpg";
import hackerhouse3 from "@/assets/events/hackerhouse-3.jpg";
import bandung1 from "@/assets/events/bandung-1.jpg";
import bandung2 from "@/assets/events/bandung-2.jpg";
import bandung3 from "@/assets/events/bandung-3.jpg";
import ibw1 from "@/assets/events/ibw-1.jpg";
import ibw2 from "@/assets/events/ibw-2.jpg";
import ibw3 from "@/assets/events/ibw-3.jpg";
import coinfest2024_1 from "@/assets/events/coinfest2024-1.jpg";
import coinfest2024_2 from "@/assets/events/coinfest2024-2.jpg";
import coinfest2024_3 from "@/assets/events/coinfest2024-3.jpg";
import coinfest2025_1 from "@/assets/events/coinfest2025-1.jpg";
import coinfest2025_2 from "@/assets/events/coinfest2025-2.jpg";
import coinfest2025_3 from "@/assets/events/coinfest2025-3.jpg";
import web3bandung1 from "@/assets/events/web3bandung-1.jpg";
import web3bandung2 from "@/assets/events/web3bandung-2.jpg";
import web3bandung3 from "@/assets/events/web3bandung-3.jpg";
import hackerhousemanta1 from "@/assets/events/hackerhousemanta-1.jpg";
import hackerhousemanta2 from "@/assets/events/hackerhousemanta-2.jpg";
import hackerhousemanta3 from "@/assets/events/hackerhousemanta-3.jpg";

interface Event {
  name: string;
  date: string;
  location: string;
  focus: string;
  photos: string[];
  sortDate: number;
}

const events: Event[] = [
  {
    name: "Web3 Bandung Community Meetup",
    date: "December 2025",
    location: "Bandung, Indonesia",
    focus: "Opening honest, relevant, and grounded conversations about careers, ecosystem, and Web3 realities in Indonesia — strengthening local ecosystem collaboration.",
    photos: [web3bandung1, web3bandung2, web3bandung3, bandung1, bandung2, bandung3],
    sortDate: 202512
  },
  {
    name: "Coinfest Asia 2025",
    date: "August 2025",
    location: "Bali, Indonesia",
    focus: "Asia's largest Web3 festival — networking, education, and celebration of the Web3 ecosystem.",
    photos: [coinfest2025_1, coinfest2025_2, coinfest2025_3, coinfest1, coinfest2, coinfest3],
    sortDate: 202508
  },
  {
    name: "Hacker House Manta",
    date: "February 2025",
    location: "Jakarta, Indonesia",
    focus: "Hackathon for builders — driving innovation and product development within the Manta Network ecosystem.",
    photos: [hackerhousemanta1, hackerhousemanta2, hackerhousemanta3, hackerhouse1, hackerhouse2, hackerhouse3],
    sortDate: 202502
  },
  {
    name: "Indonesia Blockchain Week 2024",
    date: "November 2024",
    location: "Jakarta, Indonesia",
    focus: "Indonesia's largest blockchain conference — bringing together industry leaders, regulators, and communities to discuss the future of Web3.",
    photos: [ibw1, ibw2, ibw3],
    sortDate: 202411
  },
  {
    name: "Coinfest Asia 2024",
    date: "August 2024",
    location: "Bali, Indonesia",
    focus: "Asia's Web3 festival — networking, education, and celebration of the Web3 ecosystem with the global community.",
    photos: [coinfest2024_1, coinfest2024_2, coinfest2024_3],
    sortDate: 202408
  }
].sort((a, b) => b.sortDate - a.sortDate);

const OfflineEventsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const bgY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const smoothBgY = useSpring(bgY, { stiffness: 100, damping: 30 });

  return (
    <div
      ref={sectionRef}
      className="min-h-screen py-20 md:py-28 px-6 bg-secondary/30 relative overflow-hidden"
    >
      {/* Floating Crypto Icons */}
      <FloatingCryptoIcons section="events" />

      {/* Layer 1: Nodes pattern with parallax */}
      <motion.div style={{ y: smoothBgY }}>
        <NodesPattern opacity={0.04} />
      </motion.div>

      {/* Layer 2: Gradient overlays */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-background/50 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background/50 to-transparent pointer-events-none" />

      {/* Layer 3: Corner accents */}
      <CornerAccent position="top-left" />
      <CornerAccent position="bottom-right" />

      {/* Layer 4: Vertical guides */}
      <VerticalGuide position="left" />
      <VerticalGuide position="right" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Label */}
        <MaskReveal className="mb-6">
          <div className="flex items-center justify-center gap-3">
            <span className="font-mono text-xs tracking-wider text-muted-foreground">
              // REAL WORLD IMPACT
            </span>
          </div>
        </MaskReveal>

        {/* Title with TrueFocus effect */}
        <div className="overflow-hidden mb-4">
          <motion.h2
            className="font-display text-4xl md:text-5xl lg:text-6xl text-center text-primary"
            initial={{ y: "100%" }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <TrueFocus
              sentence="Offline Events & Community"
              blurAmount={4}
              animationDuration={0.6}
              pauseBetweenAnimations={1.5}
              borderColor="hsl(var(--primary))"
              glowColor="hsl(var(--primary) / 0.5)"
            />
          </motion.h2>
        </div>

        <LineDraw className="mx-auto max-w-[120px] mb-4" delay={0.2} />

        <ScrollFade className="mb-4">
          <p className="font-body text-center text-muted-foreground max-w-2xl mx-auto">
            I actively initiate and participate in offline Web3 events, focusing on education, onboarding, and long-term community growth through real-world interaction.
          </p>
        </ScrollFade>

        {/* Micro content */}
        <ScrollFade className="flex justify-center mb-16">
          <span className="font-mono text-xs text-muted-foreground px-3 py-1 bg-muted rounded-full">
            {events.length} events • Indonesia & Southeast Asia
          </span>
        </ScrollFade>

        <div className="space-y-20">
          {events.map((event, eventIndex) => (
            <motion.div
              key={event.name}
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{
                duration: 0.8,
                delay: eventIndex * 0.1,
                ease: [0.22, 1, 0.36, 1]
              }}
            >
              {/* Event Header */}
              <div className="mb-8">
                {/* Event number indicator */}
                <motion.div
                  className="flex items-center gap-3 mb-4"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                >
                  <span className="font-display text-4xl text-primary/10">
                    {String(eventIndex + 1).padStart(2, '0')}
                  </span>
                  <motion.div
                    className="h-px flex-1 bg-gradient-to-r from-border to-transparent"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    style={{ transformOrigin: "left" }}
                  />
                </motion.div>

                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-4">
                  <motion.h3
                    className="font-display text-2xl md:text-3xl text-primary"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {event.name}
                  </motion.h3>

                  <motion.div
                    className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div className="flex items-center gap-1.5 px-3 py-1 bg-primary/5 rounded-full">
                      <Calendar className="w-4 h-4" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-1.5 px-3 py-1 bg-primary/5 rounded-full">
                      <MapPin className="w-4 h-4" />
                      <span>{event.location}</span>
                    </div>
                  </motion.div>
                </div>

                <motion.p
                  className="font-body text-muted-foreground max-w-2xl leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  {event.focus}
                </motion.p>
              </div>

              {/* Replace Photo Grid with Masonry */}
              <div className="w-full h-[500px] md:h-[600px] rounded-2xl overflow-hidden bg-background/50 border border-border/50 shadow-inner p-4">
                <Masonry
                  data={event.photos.map((photo, i) => ({
                    id: eventIndex * 100 + i,
                    image: photo,
                    height: i % 3 === 0 ? 280 : i % 2 === 0 ? 200 : 240
                  }))}
                  columns={event.photos.length > 3 ? 3 : event.photos.length}
                  gap={12}
                />
              </div>

              {/* Divider between events */}
              {eventIndex < events.length - 1 && (
                <SectionDivider variant="dots" className="mt-20" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OfflineEventsSection;
