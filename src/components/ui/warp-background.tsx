"use client";

import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";

export const WarpBackground = ({
    children,
    className,
    perspective = 100,
    beams = 10,
    ...props
}: {
    children?: React.ReactNode;
    className?: string;
    perspective?: number;
    beams?: number;
} & React.HTMLAttributes<HTMLDivElement>) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationFrameId: number;
        let w = (canvas.width = canvas.parentElement?.offsetWidth || 0);
        let h = (canvas.height = canvas.parentElement?.offsetHeight || 0);
        const center = { x: w / 2, y: h / 2 };

        // Get primary color from CSS variable
        const computedStyle = getComputedStyle(document.documentElement);
        const primaryColorHSL = computedStyle.getPropertyValue("--primary");
        // HSL parsing or simple usage. 
        // Canvas mostly needs rgb/hex strings. 
        // Let's rely on standard grey/white beams for neutrality or try to parse.
        // Simpler: use the theme's text color which is usually readable.

        class Beam {
            z: number;
            x: number;
            y: number;
            speed: number;
            color: string;

            constructor() {
                this.z = Math.random() * perspective;
                this.x = (Math.random() - 0.5) * w * 2;
                this.y = (Math.random() - 0.5) * h * 2;
                // Speed proportional to distance for parallax feel
                this.speed = Math.random() * 0.5 + 0.2;

                // Random opacity for twinkle
                const alpha = Math.random() * 0.5 + 0.1;
                this.color = `rgba(120, 120, 120, ${alpha})`; // Neutral grey beams
            }

            update() {
                this.z -= this.speed;
                if (this.z <= 0) {
                    this.z = perspective;
                    this.x = (Math.random() - 0.5) * w * 2;
                    this.y = (Math.random() - 0.5) * h * 2;
                }
            }

            draw() {
                const xProj = (this.x / this.z) * perspective + center.x;
                const yProj = (this.y / this.z) * perspective + center.y;

                const prevZ = this.z + this.speed * 4; // Length of trail
                const prevXProj = (this.x / prevZ) * perspective + center.x;
                const prevYProj = (this.y / prevZ) * perspective + center.y;

                // Size scaling
                const size = (1 - this.z / perspective) * 1.5;

                ctx.strokeStyle = this.color;
                ctx.lineWidth = size > 0 ? size : 0.1;
                ctx.beginPath();
                ctx.moveTo(prevXProj, prevYProj);
                ctx.lineTo(xProj, yProj);
                ctx.stroke();
            }
        }

        const beamArray = Array.from({ length: beams }, () => new Beam());

        const render = () => {
            ctx.clearRect(0, 0, w, h);

            beamArray.forEach(beam => {
                beam.update();
                beam.draw();
            });
            animationFrameId = requestAnimationFrame(render);
        };

        render();

        const handleResize = () => {
            w = canvas.width = canvas.parentElement?.offsetWidth || 0;
            h = canvas.height = canvas.parentElement?.offsetHeight || 0;
            center.x = w / 2;
            center.y = h / 2;
        };
        window.addEventListener("resize", handleResize);

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener("resize", handleResize);
        };
    }, [perspective, beams]);

    return (
        <div className={cn("relative overflow-hidden group", className)} {...props}>
            <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none opacity-40 mix-blend-overlay" />
            <div className="relative z-10 h-full">{children}</div>
        </div>
    );
};

export default WarpBackground;
