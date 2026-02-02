# Dreamy Bokeh Animation (Saved Version)

This is the psychedelic dreamy animation with bokeh effects and many particles. Saved for potential future use.

```tsx
import { useEffect, useRef } from 'react';

export function SwirlAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();

    // Particle class for more control
    class Particle {
      x!: number;
      y!: number;
      size!: number;
      speedX!: number;
      speedY!: number;
      color!: string;
      opacity!: number;
      fadeSpeed!: number;
      angle!: number;
      wobbleSpeed!: number;
      wobbleAmount!: number;
      glowIntensity!: number;

      constructor() {
        this.reset();
        // Start particles at random positions
        this.y = Math.random() * canvas.height;
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height + Math.random() * 100;
        this.size = Math.random() * 3 + 1;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = -Math.random() * 1.5 - 0.5; // Always float upward
        this.opacity = Math.random() * 0.5 + 0.3;
        this.fadeSpeed = Math.random() * 0.002 + 0.001;
        this.angle = Math.random() * Math.PI * 2;
        this.wobbleSpeed = Math.random() * 0.02 + 0.01;
        this.wobbleAmount = Math.random() * 30 + 10;
        this.glowIntensity = Math.random() * 20 + 10;
        
        // Dreamy color palette
        const colors = [
          '#87CEEB', // Sky blue
          '#B19CD9', // Light purple
          '#FFE4E1', // Misty rose
          '#E0FFFF', // Light cyan
          '#F0E68C', // Khaki (soft yellow)
          '#DDA0DD', // Plum
          '#98FB98', // Pale green
          '#FFA07A', // Light salmon
          '#AFEEEE', // Pale turquoise
        ];
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      update() {
        // Wobble effect for dreamy movement
        this.angle += this.wobbleSpeed;
        this.x += this.speedX + Math.sin(this.angle) * this.wobbleAmount * 0.01;
        this.y += this.speedY;

        // Gentle opacity pulsing
        this.opacity += Math.sin(this.angle * 2) * this.fadeSpeed;
        this.opacity = Math.max(0.1, Math.min(0.6, this.opacity));

        // Reset when particle goes off screen
        if (this.y < -50 || this.x < -50 || this.x > canvas.width + 50) {
          this.reset();
        }
      }

      draw() {
        // Draw glowing effect
        const gradient = ctx.createRadialGradient(
          this.x, this.y, 0,
          this.x, this.y, this.glowIntensity
        );
        
        gradient.addColorStop(0, this.color + Math.floor(this.opacity * 255).toString(16).padStart(2, '0'));
        gradient.addColorStop(0.3, this.color + Math.floor(this.opacity * 150).toString(16).padStart(2, '0'));
        gradient.addColorStop(0.6, this.color + Math.floor(this.opacity * 50).toString(16).padStart(2, '0'));
        gradient.addColorStop(1, this.color + '00');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.glowIntensity, 0, Math.PI * 2);
        ctx.fill();

        // Draw solid center
        ctx.fillStyle = this.color + Math.floor(this.opacity * 255).toString(16).padStart(2, '0'));
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Create larger particles (orbs) for dreamy bokeh effect
    class DreamOrb {
      x: number;
      y: number;
      size: number;
      speedY: number;
      color: string;
      opacity: number;
      pulsePhase: number;

      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 40 + 20;
        this.speedY = -Math.random() * 0.3 - 0.1;
        this.opacity = Math.random() * 0.08 + 0.02;
        this.pulsePhase = Math.random() * Math.PI * 2;
        
        const orbColors = [
          '#87CEEB', // Sky blue
          '#DDA0DD', // Plum
          '#98FB98', // Pale green
          '#FFE4E1', // Misty rose
        ];
        this.color = orbColors[Math.floor(Math.random() * orbColors.length)];
      }

      update(time: number) {
        this.y += this.speedY;
        
        // Gentle pulsing
        const pulseFactor = Math.sin(time * 0.001 + this.pulsePhase) * 0.3 + 1;
        const currentSize = this.size * pulseFactor;

        if (this.y < -this.size) {
          this.y = canvas.height + this.size;
          this.x = Math.random() * canvas.width;
        }

        return currentSize;
      }

      draw(currentSize: number) {
        // Draw soft bokeh orb
        const gradient = ctx.createRadialGradient(
          this.x, this.y, 0,
          this.x, this.y, currentSize
        );
        
        gradient.addColorStop(0, this.color + Math.floor(this.opacity * 255).toString(16).padStart(2, '0'));
        gradient.addColorStop(0.4, this.color + Math.floor(this.opacity * 100).toString(16).padStart(2, '0'));
        gradient.addColorStop(0.7, this.color + Math.floor(this.opacity * 30).toString(16).padStart(2, '0'));
        gradient.addColorStop(1, this.color + '00');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, currentSize, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Create particles
    const particles: Particle[] = [];
    const orbs: DreamOrb[] = [];
    
    // More particles for richer effect
    for (let i = 0; i < 150; i++) {
      particles.push(new Particle());
    }

    // Add dreamy orbs
    for (let i = 0; i < 8; i++) {
      orbs.push(new DreamOrb());
    }

    let animationId: number;
    let time = 0;

    const animate = () => {
      time++;

      // Very subtle fade for trail effect
      ctx.fillStyle = 'rgba(0, 51, 102, 0.01)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw and update dream orbs (background layer)
      orbs.forEach(orb => {
        const currentSize = orb.update(time);
        orb.draw(currentSize);
      });

      // Draw connections between nearby particles
      particles.forEach((particle, i) => {
        particles.slice(i + 1).forEach(other => {
          const dx = particle.x - other.x;
          const dy = particle.y - other.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            const opacity = (1 - distance / 100) * 0.1;
            ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(other.x, other.y);
            ctx.stroke();
          }
        });
      });

      // Draw and update particles
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    // Handle resize
    window.addEventListener('resize', resizeCanvas);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.7 }}
    />
  );
}
```