"use client";

import { useEffect, useState } from "react";

interface ParallaxLayerProps {
  children: React.ReactNode;
  speed: number; // 0 = no movement, 1 = full scroll speed
  className?: string;
}

const ParallaxLayer = ({ children, speed, className = "" }: ParallaxLayerProps) => {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setOffset(window.scrollY * speed);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [speed]);

  return (
    <div
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{ transform: `translateY(${offset}px)` }}
    >
      {children}
    </div>
  );
};

export default ParallaxLayer;
