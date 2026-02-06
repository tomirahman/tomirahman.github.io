"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useMemo } from "react";
import Image from "next/image";

// Import all crypto icons
import bnbIcon from "@/assets/icons/bnb.svg";
import cardanoIcon from "@/assets/icons/cardano.png";
import chartIcon from "@/assets/icons/chart.png";
import mantaIcon from "@/assets/icons/manta.png";
import solanaIcon from "@/assets/icons/solana.png";
import tetherIcon from "@/assets/icons/tether.png";
import ethereumIcon from "@/assets/icons/ethereum.png";
import tronIcon from "@/assets/icons/tron.png";
import moneroIcon from "@/assets/icons/monero.png";

interface FloatingIconProps {
  src: string;
  alt: string;
  position: { top?: string; bottom?: string; left?: string; right?: string };
  floatY: number;
  floatX: number;
  duration: number;
  delay: number;
  size: number;
  opacity: number;
}

const FloatingIcon = ({
  src,
  alt,
  position,
  floatY,
  floatX,
  duration,
  delay,
  size,
  opacity
}: FloatingIconProps) => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className="absolute will-change-transform pointer-events-none"
      style={{
        ...position,
        width: size,
        height: size,
      }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{
        opacity: opacity,
        scale: 1,
        x: prefersReducedMotion ? 0 : [0, floatX, 0],
        y: prefersReducedMotion ? 0 : [0, floatY, 0],
      }}
      transition={{
        opacity: { duration: 1, delay },
        scale: { duration: 1, delay },
        x: {
          duration,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
          delay,
        },
        y: {
          duration: duration * 0.85,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
          delay: delay + 0.3,
        },
      }}
    >
      <Image
        src={src}
        alt={alt}
        className="w-full h-full object-contain"
        fill
        sizes="(max-width: 768px) 100vw, 100px" // Estimate size
      />
    </motion.div>
  );
};

interface FloatingCryptoIconsProps {
  section: 'about' | 'experience' | 'skills' | 'projects' | 'events' | 'footer';
}

/**
 * Floating crypto icons distributed across sections (NOT hero).
 * 
 * UPDATED SPECS:
 * - Size: 48-72px (2x previous)
 * - Opacity: 0.85 (increased visibility)
 * - Floating animation: translateY ±12px, translateX ±6px
 * - Duration: 6-8s each
 * - Different timing per icon (no sync)
 * - Disabled if prefers-reduced-motion
 */
const FloatingCryptoIcons = ({ section }: FloatingCryptoIconsProps) => {
  const allIcons = [
    { src: bnbIcon, alt: "BNB" },
    { src: cardanoIcon, alt: "Cardano" },
    { src: chartIcon, alt: "Chart" },
    { src: mantaIcon, alt: "Manta" },
    { src: solanaIcon, alt: "Solana" },
    { src: tetherIcon, alt: "Tether" },
    { src: ethereumIcon, alt: "Ethereum" },
    { src: tronIcon, alt: "Tron" },
    { src: moneroIcon, alt: "Monero" },
  ];

  // Different icon positions per section - placed at edges, outside text column
  const sectionConfigs: Record<string, { positions: Array<{ top?: string; bottom?: string; left?: string; right?: string }>; iconIndices: number[] }> = {
    about: {
      positions: [
        { top: '10%', left: '2%' },
        { top: '60%', right: '3%' },
        { bottom: '15%', left: '4%' },
      ],
      iconIndices: [0, 4, 7]
    },
    experience: {
      positions: [
        { top: '8%', right: '2%' },
        { top: '28%', left: '1%' },
        { top: '48%', right: '2%' },
        { top: '68%', left: '2%' },
        { bottom: '10%', right: '3%' },
      ],
      iconIndices: [1, 3, 5, 6, 8]
    },
    skills: {
      positions: [
        { top: '12%', left: '2%' },
        { top: '50%', right: '2%' },
        { bottom: '12%', left: '3%' },
      ],
      iconIndices: [2, 4, 0]
    },
    projects: {
      positions: [
        { top: '15%', right: '3%' },
        { top: '65%', left: '2%' },
      ],
      iconIndices: [5, 1]
    },
    events: {
      positions: [
        { top: '10%', left: '1%' },
        { top: '40%', right: '2%' },
        { bottom: '12%', left: '3%' },
      ],
      iconIndices: [6, 2, 3]
    },
    footer: {
      positions: [
        { top: '25%', left: '3%' },
        { top: '35%', right: '4%' },
      ],
      iconIndices: [7, 8]
    }
  };

  const icons = useMemo(() => {
    const config = sectionConfigs[section] || sectionConfigs.about;

    return config.iconIndices.map((iconIndex, i) => {
      const icon = allIcons[iconIndex];
      return {
        ...icon,
        position: config.positions[i],
        // Float movement: ±12px Y, ±6px X
        floatY: (i % 2 === 0 ? 1 : -1) * (8 + Math.random() * 4), // 8-12px
        floatX: (i % 2 === 0 ? 1 : -1) * (3 + Math.random() * 3), // 3-6px
        // Duration: 6-8s (slow, ambient)
        duration: 6 + Math.random() * 2,
        delay: i * 0.3 + Math.random() * 0.4,
        // Size: 48-72px (2x previous)
        size: 48 + Math.random() * 24,
        // Opacity: 0.85 (strong visibility)
        opacity: 0.85,
      };
    });
  }, [section]);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {icons.map((icon, index) => (
        <FloatingIcon key={`${section}-${index}`} {...icon} />
      ))}
    </div>
  );
};

export default FloatingCryptoIcons;
