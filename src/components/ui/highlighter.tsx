"use client";

import { useMotionTemplate, useMotionValue, motion } from "framer-motion";
import React from "react";
import { cn } from "@/lib/utils";

export const HighlightGroup = ({
    children,
    className,
    refresh = false,
}: {
    children: React.ReactNode;
    className?: string;
    refresh?: boolean;
}) => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function onMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    return (
        <div
            className={cn("group relative", className)}
            onMouseMove={onMouseMove}
        >
            {children}
        </div>
    );
};

export const HighlighterItem = ({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) => {
    return (
        <div
            className={cn(
                "relative overflow-hidden rounded-3xl",
                className
            )}
        >
            <div className="pointer-events-none absolute inset-0 -z-10 rounded-3xl transition duration-300 group-hover:opacity-100 opacity-0"
                style={{
                    background: "radial-gradient(600px circle at var(--x) var(--y), rgba(255,255,255,0.1), transparent 40%)"
                }}
            />
            {children}
        </div>
    );
};

export const Highlighter = ({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function handleMouseMove({
        currentTarget,
        clientX,
        clientY,
    }: React.MouseEvent) {
        let { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    return (
        <div
            className={cn("relative group", className)}
            onMouseMove={handleMouseMove}
        >
            <motion.div
                className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
                style={{
                    background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(255,255,255,0.15),
              transparent 80%
            )
          `,
                }}
            />

            <div className="relative h-full">{children}</div>
        </div>
    );
};

export default Highlighter;
