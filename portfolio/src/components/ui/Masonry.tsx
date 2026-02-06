"use client";

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { animate, stagger } from 'animejs';

interface MasonryProps {
    data: Array<{
        id: number;
        image: string;
        height: number;
    }>;
    columns?: number;
    gap?: number;
}

/**
 * Masonry Layout Component with Anime.js v4 animations
 * 
 * Creates a Pinterest-style masonry grid with CSS columns.
 * Features stagger entrance animation and hover effects using anime.js.
 */
const Masonry = ({ data, columns = 3, gap = 12 }: MasonryProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
    const [hoveredId, setHoveredId] = useState<number | null>(null);
    const [isVisible, setIsVisible] = useState(false);
    const animatedRef = useRef(false);

    // Intersection Observer for triggering animation when in viewport
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && !animatedRef.current) {
                        setIsVisible(true);
                        animatedRef.current = true;
                    }
                });
            },
            { threshold: 0.1 }
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => observer.disconnect();
    }, []);

    // Anime.js v4 stagger entrance animation
    useEffect(() => {
        if (!isVisible) return;

        const items = itemsRef.current.filter(Boolean) as HTMLDivElement[];
        if (items.length === 0) return;

        // Set initial state
        items.forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(60px) scale(0.9) rotateX(15deg)';
        });

        // Stagger animation entrance using animate from anime.js v4
        animate(items, {
            opacity: [0, 1],
            translateY: [60, 0],
            scale: [0.9, 1],
            rotateX: [15, 0],
            duration: 800,
            delay: stagger(80, { start: 100 }),
            easing: 'outExpo',
        });
    }, [isVisible]);

    // Hover animation handler
    const handleMouseEnter = (id: number, index: number) => {
        setHoveredId(id);
        const item = itemsRef.current[index];
        const img = item?.querySelector('img');

        if (img) {
            animate(img, {
                scale: 1.1,
                duration: 400,
                easing: 'outCubic',
            });
        }

        // Dim other items
        itemsRef.current.forEach((el, i) => {
            if (i !== index && el) {
                const otherImg = el.querySelector('img');
                if (otherImg) {
                    animate(otherImg, {
                        filter: 'brightness(0.5) saturate(0.7)',
                        duration: 300,
                        easing: 'outCubic',
                    });
                }
            }
        });
    };

    const handleMouseLeave = () => {
        setHoveredId(null);

        // Reset all items
        itemsRef.current.forEach((el) => {
            if (el) {
                const img = el.querySelector('img');
                if (img) {
                    animate(img, {
                        scale: 1,
                        filter: 'brightness(1) saturate(1)',
                        duration: 400,
                        easing: 'outCubic',
                    });
                }
            }
        });
    };

    return (
        <div
            ref={containerRef}
            className="w-full h-full overflow-hidden"
            style={{
                columnCount: columns,
                columnGap: `${gap}px`,
                perspective: '1000px',
            }}
        >
            {data.map((item, index) => (
                <div
                    key={item.id}
                    ref={(el) => { itemsRef.current[index] = el; }}
                    className="relative mb-3 break-inside-avoid overflow-hidden rounded-lg cursor-pointer group"
                    style={{
                        height: item.height,
                        opacity: 0,
                        transformStyle: 'preserve-3d',
                    }}
                    onMouseEnter={() => handleMouseEnter(item.id, index)}
                    onMouseLeave={handleMouseLeave}
                >
                    <Image
                        src={item.image}
                        alt={`Gallery image ${item.id}`}
                        className="object-cover transition-[filter] duration-300"
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                    />

                    {/* Hover overlay with gradient */}
                    <div
                        className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent transition-opacity duration-300 ${hoveredId === item.id ? 'opacity-100' : 'opacity-0'
                            }`}
                    />

                    {/* Hover border glow effect */}
                    <div
                        className={`absolute inset-0 rounded-lg transition-all duration-300 ${hoveredId === item.id
                            ? 'ring-2 ring-primary/50 shadow-lg shadow-primary/20'
                            : ''
                            }`}
                    />
                </div>
            ))}
        </div>
    );
};

export default Masonry;
