import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

// Common easing presets
export const easings = {
    smooth: 'power2.out',
    snappy: 'power3.out',
    bounce: 'elastic.out(1, 0.5)',
    default: 'power1.out',
};

// Animation duration presets
export const durations = {
    fast: 0.3,
    normal: 0.5,
    slow: 0.8,
    verySlow: 1.2,
};

// Stagger presets
export const staggers = {
    fast: 0.05,
    normal: 0.1,
    slow: 0.15,
};

// Helper to create fade-up animation
export const createFadeUp = (
    element: gsap.TweenTarget,
    options?: {
        y?: number;
        duration?: number;
        delay?: number;
        ease?: string;
    }
) => {
    const { y = 30, duration = durations.normal, delay = 0, ease = easings.smooth } = options || {};

    return gsap.fromTo(
        element,
        { opacity: 0, y },
        { opacity: 1, y: 0, duration, delay, ease }
    );
};

// Helper to create horizontal scroll timeline
export const createHorizontalScroll = (
    container: HTMLElement,
    content: HTMLElement,
    options?: {
        ease?: string;
        scrub?: number | boolean;
        pin?: boolean;
    }
) => {
    const { ease = 'none', scrub = 1, pin = true } = options || {};

    const scrollWidth = content.scrollWidth - container.offsetWidth;

    return gsap.to(content, {
        x: -scrollWidth,
        ease,
        scrollTrigger: {
            trigger: container,
            start: 'top top',
            end: () => `+=${scrollWidth}`,
            scrub,
            pin,
            anticipatePin: 1,
        },
    });
};

// Export ScrollTrigger for direct use
export { ScrollTrigger };
export default gsap;
