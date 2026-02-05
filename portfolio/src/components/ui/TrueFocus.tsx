import { useRef, useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TrueFocusProps {
    sentence?: string;
    manualMode?: boolean;
    blurAmount?: number;
    borderColor?: string;
    glowColor?: string;
    animationDuration?: number;
    pauseBetweenAnimations?: number;
    className?: string;
}

/**
 * TrueFocus - Text animation that highlights words one by one
 * Based on react-bits/TrueFocus concept
 */
const TrueFocus = ({
    sentence = "True Focus",
    manualMode = false,
    blurAmount = 5,
    borderColor = "hsl(var(--primary))",
    glowColor = "hsl(var(--primary) / 0.6)",
    animationDuration = 0.5,
    pauseBetweenAnimations = 1,
    className = "",
}: TrueFocusProps) => {
    const words = sentence.split(' ');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);

    // Auto-cycle through words
    useEffect(() => {
        if (manualMode) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % words.length);
        }, (animationDuration + pauseBetweenAnimations) * 1000);

        return () => clearInterval(interval);
    }, [words.length, animationDuration, pauseBetweenAnimations, manualMode]);

    // Handle manual hover
    const handleWordHover = useCallback((index: number) => {
        if (manualMode) {
            setCurrentIndex(index);
        }
    }, [manualMode]);

    return (
        <div
            ref={containerRef}
            className={`relative inline-flex flex-wrap justify-center gap-x-3 gap-y-2 ${className}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {words.map((word, index) => {
                const isActive = index === currentIndex;

                return (
                    <motion.span
                        key={`${word}-${index}`}
                        ref={(el) => { wordRefs.current[index] = el; }}
                        className="relative cursor-default select-none"
                        onMouseEnter={() => handleWordHover(index)}
                        animate={{
                            filter: isActive ? 'blur(0px)' : `blur(${blurAmount}px)`,
                            opacity: isActive ? 1 : 0.5,
                        }}
                        transition={{
                            duration: animationDuration,
                            ease: [0.22, 1, 0.36, 1],
                        }}
                    >
                        {/* Word text */}
                        <span className="relative z-10">{word}</span>

                        {/* Focus border animation */}
                        <AnimatePresence>
                            {isActive && (
                                <>
                                    {/* Top border */}
                                    <motion.span
                                        className="absolute -top-1 left-0 h-0.5 rounded-full"
                                        style={{
                                            backgroundColor: borderColor,
                                            boxShadow: `0 0 8px 2px ${glowColor}`,
                                        }}
                                        initial={{ width: 0, opacity: 0 }}
                                        animate={{ width: '100%', opacity: 1 }}
                                        exit={{ width: 0, opacity: 0 }}
                                        transition={{ duration: animationDuration * 0.6, ease: 'easeOut' }}
                                    />
                                    {/* Bottom border */}
                                    <motion.span
                                        className="absolute -bottom-1 right-0 h-0.5 rounded-full"
                                        style={{
                                            backgroundColor: borderColor,
                                            boxShadow: `0 0 8px 2px ${glowColor}`,
                                        }}
                                        initial={{ width: 0, opacity: 0 }}
                                        animate={{ width: '100%', opacity: 1 }}
                                        exit={{ width: 0, opacity: 0 }}
                                        transition={{ duration: animationDuration * 0.6, delay: 0.1, ease: 'easeOut' }}
                                    />
                                    {/* Left border */}
                                    <motion.span
                                        className="absolute top-0 -left-1 w-0.5 rounded-full"
                                        style={{
                                            backgroundColor: borderColor,
                                            boxShadow: `0 0 8px 2px ${glowColor}`,
                                        }}
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: '100%', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: animationDuration * 0.6, delay: 0.05, ease: 'easeOut' }}
                                    />
                                    {/* Right border */}
                                    <motion.span
                                        className="absolute bottom-0 -right-1 w-0.5 rounded-full"
                                        style={{
                                            backgroundColor: borderColor,
                                            boxShadow: `0 0 8px 2px ${glowColor}`,
                                        }}
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: '100%', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: animationDuration * 0.6, delay: 0.15, ease: 'easeOut' }}
                                    />
                                </>
                            )}
                        </AnimatePresence>
                    </motion.span>
                );
            })}
        </div>
    );
};

export default TrueFocus;
