
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface CardSwapProps {
    frontContent: React.ReactNode;
    backContent: React.ReactNode;
    className?: string;
    onClick?: () => void;
}

export const CardSwap = ({ frontContent, backContent, className = "", onClick }: CardSwapProps) => {
    const [isFlipped, setIsFlipped] = useState(false);

    return (
        <div
            className={`relative w-full h-full cursor-pointer ${className}`}
            onMouseEnter={() => setIsFlipped(true)}
            onMouseLeave={() => setIsFlipped(false)}
            onClick={onClick}
            style={{ perspective: "1000px" }}
        >
            <motion.div
                className="relative w-full h-full"
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
                style={{ transformStyle: "preserve-3d" }}
            >
                {/* Front */}
                <div
                    className="absolute inset-0 w-full h-full"
                    style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
                >
                    {frontContent}
                </div>

                {/* Back */}
                <div
                    className="absolute inset-0 w-full h-full bg-card rounded-xl overflow-hidden border border-border/50 shadow-xl"
                    style={{
                        transform: "rotateY(180deg)",
                        backfaceVisibility: "hidden",
                        WebkitBackfaceVisibility: "hidden"
                    }}
                >
                    {backContent}
                </div>
            </motion.div>
        </div>
    );

};

export default CardSwap;
