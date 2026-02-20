
import { useEffect, useRef } from "react";

interface PrismProps {
    className?: string;
    color?: string; // Hex color for tint
    speed?: number;
}

export const Prism = ({ className = "", color = "#ffffff", speed = 1.0 }: PrismProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const gl = canvas.getContext("webgl");
        if (!gl) return;

        let width = (canvas.width = canvas.offsetWidth);
        let height = (canvas.height = canvas.offsetHeight);

        const vertShader = `
      attribute vec2 position;
      void main() {
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `;

        const fragShader = `
      precision highp float;
      uniform float time;
      uniform vec2 resolution;
      
      void main() {
        vec2 uv = gl_FragCoord.xy / resolution.xy;
        
        float t = time * 0.5;
        
        // Simulating prism refraction effect using sine waves overlapping
        float r = sin(uv.x * 10.0 + t + uv.y * 5.0) * 0.5 + 0.5;
        float g = sin(uv.x * 12.0 + t * 1.2 - uv.y * 6.0 + 2.0) * 0.5 + 0.5;
        float b = sin(uv.x * 8.0 + t * 0.8 + uv.y * 4.0 + 4.0) * 0.5 + 0.5;
        
        // Add some noise/grain if desired, but keeping it smooth for Prism
        
        // Soft gradient background
        vec3 col = vec3(r, g, b);
        
        // Create diamond/prism-like caustics
        float c1 = sin(uv.x * 20.0 + t) + cos(uv.y * 20.0 + t);
        float c2 = sin(uv.x * 30.0 - t) + cos(uv.y * 10.0 + t);
        float c = (c1 + c2) * 0.1;
        
        col += vec3(c);
        
        // Fade out edges
        col *= 0.15; // Make it subtle/darker overall to be a background
        
        gl_FragColor = vec4(col, 1.0);
      }
    `;

        // Compile Shader Function (same as Dither)
        const compileShader = (type: number, source: string) => {
            const shader = gl.createShader(type);
            if (!shader) return null;
            gl.shaderSource(shader, source);
            gl.compileShader(shader);
            if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
                console.error(gl.getShaderInfoLog(shader));
                gl.deleteShader(shader);
                return null;
            }
            return shader;
        };

        const vs = compileShader(gl.VERTEX_SHADER, vertShader);
        const fs = compileShader(gl.FRAGMENT_SHADER, fragShader);

        if (!vs || !fs) return;

        const program = gl.createProgram();
        if (!program) return;
        gl.attachShader(program, vs);
        gl.attachShader(program, fs);
        gl.linkProgram(program);
        gl.useProgram(program);

        const positionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]), gl.STATIC_DRAW);

        const positionLoc = gl.getAttribLocation(program, "position");
        gl.enableVertexAttribArray(positionLoc);
        gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);

        const timeLoc = gl.getUniformLocation(program, "time");
        const resLoc = gl.getUniformLocation(program, "resolution");

        let startTime = performance.now();
        let animationFrame: number;

        const render = () => {
            if (!canvas) return;
            gl.viewport(0, 0, width, height);
            gl.uniform1f(timeLoc, (performance.now() - startTime) * 0.001 * speed);
            gl.uniform2f(resLoc, width, height);
            gl.drawArrays(gl.TRIANGLES, 0, 6);
            animationFrame = requestAnimationFrame(render);
        };

        render();

        const handleResize = () => {
            width = (canvas.width = canvas.offsetWidth);
            height = (canvas.height = canvas.offsetHeight);
        };
        window.addEventListener("resize", handleResize);

        return () => {
            cancelAnimationFrame(animationFrame);
            window.removeEventListener("resize", handleResize);
            gl.deleteProgram(program);
        };
    }, [speed]);

    return <canvas ref={canvasRef} className={`absolute inset-0 w-full h-full pointer-events-none ${className}`} />;
};

export default Prism;
