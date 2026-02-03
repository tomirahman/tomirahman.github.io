"use client";

import { useEffect, useRef } from "react";

interface DitherProps {
    className?: string;
    waveSpeed?: number;
    waveFrequency?: number;
    waveAmplitude?: number;
    waveColor?: [number, number, number];
    colorNum?: number;
    pixelSize?: number;
    disableAnimation?: boolean;
    enableMouseInteraction?: boolean;
    mouseRadius?: number;
}

export const Dither = ({
    className,
    waveSpeed = 0.05,
    waveFrequency = 3,
    waveAmplitude = 0.3,
    waveColor = [0.5, 0.5, 0.5],
    colorNum = 4,
    pixelSize = 3,
    disableAnimation = false,
    enableMouseInteraction = true,
    mouseRadius = 1,
}: DitherProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const gl = canvas.getContext("webgl");
        if (!gl) return;

        let width = canvas.width = canvas.parentElement?.offsetWidth || 0;
        let height = canvas.height = canvas.parentElement?.offsetHeight || 0;

        // Vertex Shader
        const vertShaderSource = `
      attribute vec2 a_position;
      varying vec2 v_uv;
      void main() {
        v_uv = a_position * 0.5 + 0.5;
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;

        // Fragment Shader
        const fragShaderSource = `
      precision mediump float;
      varying vec2 v_uv;
      uniform float u_time;
      uniform vec2 u_resolution;
      uniform vec2 u_mouse;
      uniform float u_waveSpeed;
      uniform float u_waveFrequency;
      uniform float u_waveAmplitude;
      uniform vec3 u_waveColor; // Pass as uniform
      uniform float u_colorNum;
      uniform float u_pixelSize;
      uniform bool u_enableMouse;
      uniform float u_mouseRadius;

      // Ordered dithering matrix (Bayer matrix 4x4)
      const mat4 bayerMatrix = mat4(
        0.0/16.0, 8.0/16.0, 2.0/16.0, 10.0/16.0,
        12.0/16.0, 4.0/16.0, 14.0/16.0, 6.0/16.0,
        3.0/16.0, 11.0/16.0, 1.0/16.0, 9.0/16.0,
        15.0/16.0, 7.0/16.0, 13.0/16.0, 5.0/16.0
      );

      void main() {
        vec2 uv = v_uv;
        
        // Pixelate
        vec2 grid = vec2(u_resolution.x / u_pixelSize, u_resolution.y / u_pixelSize);
        uv = floor(uv * grid) / grid;

        // Wave deformation
        float wave = sin(uv.x * u_waveFrequency + u_time * u_waveSpeed) * u_waveAmplitude;
        
        // Mouse interaction
        if (u_enableMouse) {
            float dist = distance(uv, u_mouse);
            float mouseEffect = smoothstep(u_mouseRadius, 0.0, dist);
            wave += mouseEffect * 0.5 * sin(u_time * 2.0);
        }
        
        // Base color generation
        // Mixing a gradient with the wave
        vec3 color = vec3(uv.y + wave);
        
        // Tint with waveColor
        color *= u_waveColor;

        // Dithering
        vec2 ditherCoord = gl_FragCoord.xy / u_pixelSize;
        int x = int(mod(ditherCoord.x, 4.0));
        int y = int(mod(ditherCoord.y, 4.0));
        
        // Manual matrix access because GLSL ES 1.0 doesn't support dynamic indexing of matrices well
        float threshold = 0.0;
        if (x == 0) {
            if (y == 0) threshold = 0.0/16.0; else if (y == 1) threshold = 12.0/16.0; else if (y == 2) threshold = 3.0/16.0; else threshold = 15.0/16.0;
        } else if (x == 1) {
            if (y == 0) threshold = 8.0/16.0; else if (y == 1) threshold = 4.0/16.0; else if (y == 2) threshold = 11.0/16.0; else threshold = 7.0/16.0;
        } else if (x == 2) {
             if (y == 0) threshold = 2.0/16.0; else if (y == 1) threshold = 14.0/16.0; else if (y == 2) threshold = 1.0/16.0; else threshold = 13.0/16.0;
        } else { // x == 3
             if (y == 0) threshold = 10.0/16.0; else if (y == 1) threshold = 6.0/16.0; else if (y == 2) threshold = 9.0/16.0; else threshold = 5.0/16.0;
        }

        // Posterize (quantize colors)
        float value = length(color);
        value = value + (threshold - 0.5) / u_colorNum;
        
        // Quantize
        value = floor(value * (u_colorNum - 1.0) + 0.5) / (u_colorNum - 1.0);
        
        // Map back to color
        gl_FragColor = vec4(vec3(value) * u_waveColor, 1.0);
      }
    `;

        // Compile Shader Function
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

        const vertShader = compileShader(gl.VERTEX_SHADER, vertShaderSource);
        const fragShader = compileShader(gl.FRAGMENT_SHADER, fragShaderSource);

        if (!vertShader || !fragShader) return;

        const program = gl.createProgram();
        if (!program) return;
        gl.attachShader(program, vertShader);
        gl.attachShader(program, fragShader);
        gl.linkProgram(program);

        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            console.error(gl.getProgramInfoLog(program));
            return;
        }

        gl.useProgram(program);

        // Buffer setup
        const positionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        const positions = new Float32Array([
            -1, -1,
            1, -1,
            -1, 1,
            -1, 1,
            1, -1,
            1, 1,
        ]);
        gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

        const positionAttributeLocation = gl.getAttribLocation(program, "a_position");
        gl.enableVertexAttribArray(positionAttributeLocation);
        gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0);

        // Uniform locations
        const timeLocation = gl.getUniformLocation(program, "u_time");
        const resolutionLocation = gl.getUniformLocation(program, "u_resolution");
        const mouseLocation = gl.getUniformLocation(program, "u_mouse");
        const waveSpeedLocation = gl.getUniformLocation(program, "u_waveSpeed");
        const waveFrequencyLocation = gl.getUniformLocation(program, "u_waveFrequency");
        const waveAmplitudeLocation = gl.getUniformLocation(program, "u_waveAmplitude");
        const waveColorLocation = gl.getUniformLocation(program, "u_waveColor");
        const colorNumLocation = gl.getUniformLocation(program, "u_colorNum");
        const pixelSizeLocation = gl.getUniformLocation(program, "u_pixelSize");
        const enableMouseLocation = gl.getUniformLocation(program, "u_enableMouse");
        const mouseRadiusLocation = gl.getUniformLocation(program, "u_mouseRadius");

        let animationFrameId: number;
        let startTime = performance.now();
        let mouseX = 0;
        let mouseY = 0;

        const render = (time: number) => {
            if (!canvas) return;
            gl.viewport(0, 0, gl.canvas.width, gl.canvas.height); // Correct viewport usage

            const currentTime = (time - startTime) * 0.001;

            gl.uniform1f(timeLocation, currentTime);
            gl.uniform2f(resolutionLocation, width, height);
            gl.uniform2f(mouseLocation, mouseX / width, 1.0 - mouseY / height); // Normalize and flip Y
            gl.uniform1f(waveSpeedLocation, waveSpeed);
            gl.uniform1f(waveFrequencyLocation, waveFrequency);
            gl.uniform1f(waveAmplitudeLocation, waveAmplitude);
            gl.uniform3fv(waveColorLocation, waveColor);
            gl.uniform1f(colorNumLocation, colorNum);
            gl.uniform1f(pixelSizeLocation, pixelSize);
            gl.uniform1i(enableMouseLocation, enableMouseInteraction ? 1 : 0);
            gl.uniform1f(mouseRadiusLocation, mouseRadius);

            if (!disableAnimation) {
                gl.uniform1f(timeLocation, currentTime);
            } else {
                gl.uniform1f(timeLocation, 0);
            }

            gl.drawArrays(gl.TRIANGLES, 0, 6);
            animationFrameId = requestAnimationFrame(render);
        };

        render(performance.now());

        const handleResize = () => {
            width = canvas.width = canvas.parentElement?.offsetWidth || 0;
            height = canvas.height = canvas.parentElement?.offsetHeight || 0;
        };
        window.addEventListener("resize", handleResize);

        const handleMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            mouseX = e.clientX - rect.left;
            mouseY = e.clientY - rect.top;
        };
        if (enableMouseInteraction) {
            window.addEventListener("mousemove", handleMouseMove);
        }

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener("resize", handleResize);
            if (enableMouseInteraction) {
                window.removeEventListener("mousemove", handleMouseMove);
            }
            gl.deleteProgram(program);
        };
    }, [waveSpeed, waveFrequency, waveAmplitude, waveColor, colorNum, pixelSize, disableAnimation, enableMouseInteraction, mouseRadius]);

    return <canvas ref={canvasRef} className={className} />;
};

export default Dither;
