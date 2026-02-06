"use client";

import { motion, useScroll, useSpring } from 'framer-motion';

/**
 * Scroll Progress Indicator
 * 
 * Fixed thin progress bar at top of viewport showing scroll position.
 * Inspired by fadilfahrudin.my.id reference.
 */
const ScrollProgress = () => {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <motion.div
            className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-primary via-sky-400 to-primary z-50 origin-left"
            style={{ scaleX }}
        />
    );
};

export default ScrollProgress;
