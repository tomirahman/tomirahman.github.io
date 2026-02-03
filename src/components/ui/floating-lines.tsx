"use client";

import { useEffect, useRef } from "react";

interface FloatingLinesProps {
    className?: string;
    lineColor?: string;
    backgroundColor?: string;
    count?: number;
    minWidth?: number;
    maxWidth?: number;
}

export const FloatingLines = ({
    className = "",
    lineColor = "rgba(255, 255, 255, 0.1)",
    backgroundColor = "transparent",
    count = 20,
    minWidth = 0.5,
    maxWidth = 2.5,
}: FloatingLinesProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        try {
            const ctx = canvas.getContext("2d");
            if (!ctx) return;

            let width = (canvas.width = canvas.offsetWidth || 300); // Fallback width
            let height = (canvas.height = canvas.offsetHeight || 150); // Fallback height

            const lines: Array<{
                x: number;
                y: number;
                length: number;
                angle: number;
                speed: number;
                width: number;
            }> = [];

            for (let i = 0; i < count; i++) {
                lines.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    length: Math.random() * 200 + 100,
                    angle: Math.random() * Math.PI * 2,
                    speed: Math.random() * 0.5 + 0.1,
                    width: Math.random() * (maxWidth - minWidth) + minWidth,
                });
            }

            let animationFrameId: number;
            let isMounted = true;

            const render = () => {
                if (!isMounted || !ctx || !canvas) return;

                ctx.fillStyle = backgroundColor;
                ctx.clearRect(0, 0, width, height);

                lines.forEach((line) => {
                    // Update position
                    line.x += Math.cos(line.angle) * line.speed;
                    line.y += Math.sin(line.angle) * line.speed;

                    // Wrap around
                    if (line.x < -line.length) line.x = width + line.length;
                    if (line.x > width + line.length) line.x = -line.length;
                    if (line.y < -line.length) line.y = height + line.length;
                    if (line.y > height + line.length) line.y = -line.length;

                    // Draw
                    ctx.beginPath();
                    const endX = line.x + Math.cos(line.angle) * line.length;
                    const endY = line.y + Math.sin(line.angle) * line.length;

                    const gradient = ctx.createLinearGradient(line.x, line.y, endX, endY);
                    gradient.addColorStop(0, "transparent");
                    gradient.addColorStop(0.5, lineColor);
                    gradient.addColorStop(1, "transparent");

                    ctx.strokeStyle = gradient;
                    ctx.lineWidth = line.width;
                    ctx.moveTo(line.x, line.y);
                    ctx.lineTo(endX, endY);
                    ctx.stroke();
                });

                animationFrameId = requestAnimationFrame(render);
            };

            if (width > 0 && height > 0) {
                render();
            }

            const handleResize = () => {
                if (!canvas) return;
                width = canvas.width = canvas.offsetWidth;
                height = canvas.height = canvas.offsetHeight;
            };

            window.addEventListener("resize", handleResize);
            return () => {
                isMounted = false;
                cancelAnimationFrame(animationFrameId);
                window.removeEventListener("resize", handleResize);
            };
        } catch (e) {
            console.warn("FloatingLines error:", e);
        }
    }, [lineColor, backgroundColor, count, minWidth, maxWidth]);

    return <canvas ref={canvasRef} className={`absolute inset-0 w-full h-full pointer-events-none ${className}`} />;
};

export default FloatingLines;
