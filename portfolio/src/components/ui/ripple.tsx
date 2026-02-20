
import React, { CSSProperties } from "react";

import { cn } from "@/lib/utils";

interface RippleProps {
    mainCircleSize?: number;
    mainCircleOpacity?: number;
    numCircles?: number;
    className?: string;
}

export const Ripple = React.memo(
    ({
        mainCircleSize = 210,
        mainCircleOpacity = 0.24,
        numCircles = 8,
        className,
    }: RippleProps) => {
        return (
            <div
                className={cn(
                    "absolute inset-0 flex items-center justify-center bg-white/5 [mask-image:linear-gradient(to_bottom,white,transparent)] z-[-1]",
                    className,
                )}
            >
                {Array.from({ length: numCircles }).map((_, i) => (
                    <div
                        key={i}
                        className="absolute animate-ripple rounded-full bg-foreground/25 shadow-xl border border-white/5 top-1/2 left-1/2 translate-x-1/2 translate-y-1/2"
                        style={
                            {
                                width: mainCircleSize + i * 70,
                                height: mainCircleSize + i * 70,
                                opacity: mainCircleOpacity - i * 0.03,
                                animationDelay: `${i * 0.06}s`,
                                "--i": i,
                            } as CSSProperties
                        }
                    ></div>
                ))}
            </div>
        );
    },
);

Ripple.displayName = "Ripple";

export default Ripple;
