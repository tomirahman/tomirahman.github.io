import { useState, useRef, useEffect, ReactNode } from 'react';
import { motion } from 'framer-motion';

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
 * Masonry Layout Component
 * 
 * Creates a Pinterest-style masonry grid with CSS columns.
 * Features hover effects and smooth transitions.
 */
const Masonry = ({ data, columns = 3, gap = 12 }: MasonryProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [hoveredId, setHoveredId] = useState<number | null>(null);

    return (
        <div
            ref={containerRef}
            className="w-full h-full overflow-hidden"
            style={{
                columnCount: columns,
                columnGap: `${gap}px`,
            }}
        >
            {data.map((item, index) => (
                <motion.div
                    key={item.id}
                    className="relative mb-3 break-inside-avoid overflow-hidden rounded-lg cursor-pointer group"
                    style={{ height: item.height }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                        duration: 0.5,
                        delay: index * 0.05,
                        ease: [0.22, 1, 0.36, 1]
                    }}
                    onMouseEnter={() => setHoveredId(item.id)}
                    onMouseLeave={() => setHoveredId(null)}
                >
                    <motion.img
                        src={item.image}
                        alt={`Gallery image ${item.id}`}
                        className="w-full h-full object-cover"
                        animate={{
                            scale: hoveredId === item.id ? 1.08 : 1,
                            filter: hoveredId !== null && hoveredId !== item.id
                                ? 'brightness(0.6) saturate(0.8)'
                                : 'brightness(1) saturate(1)'
                        }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    />

                    {/* Hover overlay */}
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: hoveredId === item.id ? 1 : 0 }}
                        transition={{ duration: 0.3 }}
                    />
                </motion.div>
            ))}
        </div>
    );
};

export default Masonry;
