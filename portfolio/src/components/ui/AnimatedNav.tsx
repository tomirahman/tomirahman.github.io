import { useState, useRef, useEffect, ReactNode } from 'react';
import { motion } from 'framer-motion';

interface NavItem {
    label: string;
    href: string;
    icon?: ReactNode;
}

interface AnimatedNavProps {
    items: NavItem[];
    activeIndex?: number;
    onItemClick?: (index: number, href: string) => void;
    className?: string;
}

/**
 * AnimatedNav - React Bits inspired animated navigation
 * 
 * Features:
 * - Sliding pill indicator that follows hover/active state
 * - Smooth GSAP-like transitions
 * - Supports icons and text labels
 */
const AnimatedNav = ({
    items,
    activeIndex = 0,
    onItemClick,
    className = ''
}: AnimatedNavProps) => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });
    const navRef = useRef<HTMLDivElement>(null);
    const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);

    // Update indicator position based on hover or active state
    useEffect(() => {
        const targetIndex = hoveredIndex !== null ? hoveredIndex : activeIndex;
        const targetElement = itemRefs.current[targetIndex];

        if (targetElement && navRef.current) {
            const navRect = navRef.current.getBoundingClientRect();
            const itemRect = targetElement.getBoundingClientRect();

            setIndicatorStyle({
                left: itemRect.left - navRect.left,
                width: itemRect.width,
            });
        }
    }, [hoveredIndex, activeIndex]);

    // Initialize on mount
    useEffect(() => {
        const timer = setTimeout(() => {
            const targetElement = itemRefs.current[activeIndex];
            if (targetElement && navRef.current) {
                const navRect = navRef.current.getBoundingClientRect();
                const itemRect = targetElement.getBoundingClientRect();
                setIndicatorStyle({
                    left: itemRect.left - navRect.left,
                    width: itemRect.width,
                });
            }
        }, 100);
        return () => clearTimeout(timer);
    }, [activeIndex]);

    const handleClick = (index: number, href: string) => {
        if (onItemClick) {
            onItemClick(index, href);
        }
    };

    return (
        <div
            ref={navRef}
            className={`relative inline-flex items-center gap-1 p-1 rounded-full bg-card/90 backdrop-blur-md border border-border shadow-soft ${className}`}
        >
            {/* Sliding Pill Indicator */}
            <motion.div
                className="absolute top-1 bottom-1 rounded-full bg-primary/10 border border-primary/20"
                initial={false}
                animate={{
                    left: indicatorStyle.left,
                    width: indicatorStyle.width,
                }}
                transition={{
                    type: 'spring',
                    stiffness: 400,
                    damping: 30,
                }}
            />

            {/* Navigation Items */}
            {items.map((item, index) => (
                <button
                    key={item.href}
                    ref={(el) => { itemRefs.current[index] = el; }}
                    onClick={() => handleClick(index, item.href)}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    className={`
            relative z-10 flex items-center gap-2 px-4 py-2 rounded-full
            font-body text-xs tracking-wider uppercase
            transition-colors duration-200
            ${activeIndex === index
                            ? 'text-primary font-medium'
                            : 'text-muted-foreground hover:text-foreground'
                        }
          `}
                >
                    {item.icon && (
                        <span className="w-3.5 h-3.5">{item.icon}</span>
                    )}
                    <span>{item.label}</span>
                </button>
            ))}
        </div>
    );
};

export default AnimatedNav;
