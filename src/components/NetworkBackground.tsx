"use client";

import React, { useEffect, useRef } from "react";

class Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseColor: string;
  glow: number;

  constructor(width: number, height: number) {
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.vx = (Math.random() - 0.5) * 0.5; // Muy lento para ser elegante
    this.vy = (Math.random() - 0.5) * 0.5;
    this.radius = Math.random() * 2 + 1; // 1px a 3px
    this.baseColor = Math.random() > 0.8 ? "rgba(211, 28, 45, " : "rgba(64, 153, 255, "; // 80% azul cyber, 20% rojo Minaer
    this.glow = Math.random() * 0.5 + 0.5;
  }

  update(width: number, height: number) {
    this.x += this.vx;
    this.y += this.vy;

    // Rebote suave en los bordes
    if (this.x <= 0 || this.x >= width) this.vx *= -1;
    if (this.y <= 0 || this.y >= height) this.vy *= -1;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = `${this.baseColor}${this.glow})`;
    ctx.fill();

    // Glow matemático
    ctx.shadowBlur = 15;
    ctx.shadowColor = `${this.baseColor}1)`;
    ctx.fill();
    ctx.shadowBlur = 0; // reset
  }
}

export default function NetworkBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let particles: Particle[] = [];
    const particleCount = Math.min(Math.floor((width * height) / 10000), 150); // Densidad controlada

    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle(width, height));
    }

    let mouse = { x: -1000, y: -1000 };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      particles = [];
      const newCount = Math.min(Math.floor((width * height) / 10000), 150);
      for (let i = 0; i < newCount; i++) {
          particles.push(new Particle(width, height));
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("resize", handleResize);

    // Animación de los haces de luz en las líneas
    let lightTime = 0;

    const animate = () => {
      if (!ctx) return;
      // Fondo transparente para que interactúe perfectamente en modo claro y oscuro
      ctx.clearRect(0, 0, width, height);

      lightTime += 0.02;

      // Actualizar nodos
      for (let i = 0; i < particles.length; i++) {
        particles[i].update(width, height);
        particles[i].draw(ctx);
      }

      // Conexiones matemáticas (La Red)
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          // Si están cerca, trazar línea
          if (distance < 160) {
            const opacity = 1 - distance / 160;
            
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);

            // Efecto de pulso viajero a través de la línea usando el tiempo y un seno
            const lineID = (i * 13) + (j * 7); // PseudoID único para la línea
            const isLightingUp = Math.sin(lightTime + lineID * 0.1) > 0.8;

            if (isLightingUp) {
                // Haz de luz pasando (más fuerte para atravesar el blur)
                ctx.strokeStyle = `rgba(64, 153, 255, ${opacity * 1})`;
                ctx.lineWidth = 3.5;
            } else {
                // Estado inactivo (más visible)
                ctx.strokeStyle = `rgba(40, 60, 90, ${Math.max(opacity * 0.4, 0.1)})`;
                ctx.lineWidth = 1;
            }

            ctx.stroke();
          }
        }

        // Interacción con Mouse (El cursor ilumina la red local)
        const dxMouse = particles[i].x - mouse.x;
        const dyMouse = particles[i].y - mouse.y;
        const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);

        if (distMouse < 200) {
           const opacity = 1 - distMouse / 200;
           ctx.beginPath();
           ctx.moveTo(particles[i].x, particles[i].y);
           ctx.lineTo(mouse.x, mouse.y);
           ctx.strokeStyle = `rgba(211, 28, 45, ${opacity * 0.5})`; // Conecta en rojo hacia el cursor
           ctx.lineWidth = 1;
           ctx.stroke();
           
           // Efecto gravedad/repulsión súper suave
           particles[i].x += dxMouse * 0.005;
           particles[i].y += dyMouse * 0.005;
        }
      }

      requestAnimationFrame(animate);
    };

    const animId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full -z-20 bg-transparent pointer-events-auto"
      style={{ display: "block" }}
    />
  );
}
