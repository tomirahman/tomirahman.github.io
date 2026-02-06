"use client";

import { useEffect, useRef, ReactNode } from 'react';
import Lenis from '@studio-freight/lenis';
import gsap from '@/lib/gsap-config';
import { ScrollTrigger } from '@/lib/gsap-config';

interface LenisProviderProps {
    children: ReactNode;
}

/**
 * Lenis Smooth Scroll Provider
 * 
 * Provides buttery smooth momentum-based scrolling across the site.
 * Syncs with GSAP ScrollTrigger for animation compatibility.
 */
const LenisProvider = ({ children }: LenisProviderProps) => {
    const lenisRef = useRef<Lenis | null>(null);
    const rafRef = useRef<number | null>(null);

    useEffect(() => {
        // Initialize Lenis with smooth scroll settings
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            wheelMultiplier: 1,
            touchMultiplier: 2,
            infinite: false,
        });

        lenisRef.current = lenis;

        // Sync Lenis with GSAP ScrollTrigger
        lenis.on('scroll', ScrollTrigger.update);

        // Use requestAnimationFrame for proper animation loop
        function raf(time: number) {
            lenis.raf(time);
            rafRef.current = requestAnimationFrame(raf);
        }

        rafRef.current = requestAnimationFrame(raf);

        // Cleanup
        return () => {
            if (rafRef.current) {
                cancelAnimationFrame(rafRef.current);
            }
            lenis.destroy();
        };
    }, []);

    return <>{children}</>;
};

export default LenisProvider;
