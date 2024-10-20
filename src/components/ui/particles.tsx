"use client";

import React, { useRef, useEffect, useState } from "react";
import { useMousePosition } from "@/utils/mouse";

interface ParticlesProps {
	className?: string;
	quantity?: number;
	staticity?: number;
	ease?: number;
	refresh?: boolean;
}

export default function Particles({
	className = "",
	quantity = 30,
	staticity = 50,
	ease = 50,
	refresh = false,
}: ParticlesProps) {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const canvasContainerRef = useRef<HTMLDivElement>(null);
	const context = useRef<CanvasRenderingContext2D | null>(null);
	const circles = useRef<any[]>([]);
	const mousePosition = useMousePosition();
	const mouse = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
	const canvasSize = useRef<{ w: number; h: number }>({ w: 0, h: 0 });
	const dpr = typeof window !== "undefined" ? window.devicePixelRatio : 1;

	useEffect(() => {
		if (canvasRef.current) {
			context.current = canvasRef.current.getContext("2d");
		}
		initCanvas();
		animate();
		window.addEventListener("resize", initCanvas);

		return () => {
			window.removeEventListener("resize", initCanvas);
		};
	}, []);

	useEffect(() => {
		onMouseMove();
	}, [mousePosition.x, mousePosition.y]);

	useEffect(() => {
		initCanvas();
	}, [refresh]);

	const initCanvas = () => {
		resizeCanvas();
		drawParticles();
	};

	const onMouseMove = () => {
		if (canvasRef.current) {
			const rect = canvasRef.current.getBoundingClientRect();
			const { w, h } = canvasSize.current;
			const x = mousePosition.x - rect.left - w / 2;
			const y = mousePosition.y - rect.top - h / 2;
			const inside = x < w / 2 && x > -w / 2 && y < h / 2 && y > -h / 2;
			if (inside) {
				mouse.current.x = x;
				mouse.current.y = y;
			}
		}
	};

	type Particle = {
		x: number;
		y: number;
		translateX: number;
		translateY: number;
		size: number;
		shape: string;
		alpha: number;
		targetAlpha: number;
		dx: number;
		dy: number;
		magnetism: number;
	};

	const resizeCanvas = () => {
		if (canvasContainerRef.current && canvasRef.current && context.current) {
			circles.current.length = 0;
			canvasSize.current.w = canvasContainerRef.current.offsetWidth;
			canvasSize.current.h = canvasContainerRef.current.offsetHeight;
			canvasRef.current.width = canvasSize.current.w * dpr;
			canvasRef.current.height = canvasSize.current.h * dpr;
			canvasRef.current.style.width = `${canvasSize.current.w}px`;
			canvasRef.current.style.height = `${canvasSize.current.h}px`;
			context.current.scale(dpr, dpr);
		}
	};

	const particleParams = (): Particle => {
		const x = Math.floor(Math.random() * canvasSize.current.w);
		const y = Math.floor(Math.random() * canvasSize.current.h);
		const translateX = 0;
		const translateY = 0;
		const size = Math.floor(Math.random() * 8) + 2; // Increase particle size
		const alpha = 0;
		const targetAlpha = parseFloat((Math.random() * 0.6 + 0.1).toFixed(1));
		const dx = (Math.random() - 0.5) * 0.2;
		const dy = (Math.random() - 0.5) * 0.2;
		const magnetism = 0.1 + Math.random() * 4;
		const shape = Math.random() < 0.5 ? "circle" : "rectangle"; // Random shapes
		return {
			x,
			y,
			translateX,
			translateY,
			size,
			shape,
			alpha,
			targetAlpha,
			dx,
			dy,
			magnetism,
		};
	};

	const drawParticle = (particle: Particle, update = false) => {
		if (context.current) {
			const { x, y, translateX, translateY, size, alpha, shape } = particle;
			context.current.translate(translateX, translateY);
			context.current.beginPath();

			// Draw shapes
			if (shape === "circle") {
				context.current.arc(x, y, size, 0, 3 * Math.PI);
			} else {
				context.current.rect(x - size / 2, y - size / 2, size, size);
			}

			context.current.fillStyle = `rgba(173, 216, 230, ${alpha})`; // Light blue color
			context.current.fill();
			context.current.setTransform(dpr, 0, 0, dpr, 0, 0);

			if (!update) {
				circles.current.push(particle);
			}
		}
	};

	const clearContext = () => {
		if (context.current) {
			context.current.clearRect(
				0,
				0,
				canvasSize.current.w,
				canvasSize.current.h,
			);
		}
	};

	const drawParticles = () => {
		clearContext();
		const particleCount = quantity;
		for (let i = 0; i < particleCount; i++) {
			const particle = particleParams();
			drawParticle(particle);
		}
	};

	const remapValue = (
		value: number,
		start1: number,
		end1: number,
		start2: number,
		end2: number,
	): number => {
		const remapped =
			((value - start1) * (end2 - start2)) / (end1 - start1) + start2;
		return remapped > 0 ? remapped : 0;
	};

	const animate = () => {
		clearContext();
		circles.current.forEach((particle: Particle, i: number) => {
			// Handle the alpha value
			const edge = [
				particle.x + particle.translateX - particle.size, // distance from left edge
				canvasSize.current.w - particle.x - particle.translateX - particle.size, // distance from right edge
				particle.y + particle.translateY - particle.size, // distance from top edge
				canvasSize.current.h - particle.y - particle.translateY - particle.size, // distance from bottom edge
			];
			const closestEdge = edge.reduce((a, b) => Math.min(a, b));
			const remapClosestEdge = parseFloat(
				remapValue(closestEdge, 0, 20, 0, 1).toFixed(2),
			);
			if (remapClosestEdge > 1) {
				particle.alpha += 0.02;
				if (particle.alpha > particle.targetAlpha) {
					particle.alpha = particle.targetAlpha;
				}
			} else {
				particle.alpha = particle.targetAlpha * remapClosestEdge;
			}
			particle.x += particle.dx;
			particle.y += particle.dy;
			particle.translateX +=
				(mouse.current.x / (staticity / particle.magnetism) - particle.translateX) /
				ease;
			particle.translateY +=
				(mouse.current.y / (staticity / particle.magnetism) - particle.translateY) /
				ease;
			// particle gets out of the canvas
			if (
				particle.x < -particle.size ||
				particle.x > canvasSize.current.w + particle.size ||
				particle.y < -particle.size ||
				particle.y > canvasSize.current.h + particle.size
			) {
				// remove the particle from the array
				circles.current.splice(i, 1);
				// create a new particle
				const newParticle = particleParams();
				drawParticle(newParticle);
				// update the particle position
			} else {
				drawParticle(
					{
						...particle,
						x: particle.x,
						y: particle.y,
						translateX: particle.translateX,
						translateY: particle.translateY,
						alpha: particle.alpha,
					},
					true,
				);
			}
		});
		window.requestAnimationFrame(animate);
	};

	return (
		<div className={className} ref={canvasContainerRef} aria-hidden="true">
			<canvas ref={canvasRef} />
		</div>
	);
}
