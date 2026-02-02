import { useEffect, useRef } from 'react';
import { PARTICLE_CONFIG } from '../config/particleConfig';

export function SwirlAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    interface Particle {
      x: number;
      y: number;
      radius: number;
      velocityY: number;
      velocityX: number;
      opacity: number;
      fadePhase: number;
    }

    const particles: Particle[] = [];
    const config = PARTICLE_CONFIG;

    // Create particles using shared configuration
    for (let i = 0; i < config.particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height * config.spawnBelowCanvas,
        radius: Math.random() * (config.maxRadius - config.minRadius) + config.minRadius,
        velocityY: -(Math.random() * (config.maxVelocityY - config.minVelocityY) + config.minVelocityY),
        velocityX: (Math.random() - 0.5) * config.horizontalDriftSpeed,
        opacity: Math.random() * (config.maxOpacity - config.minOpacity) + config.minOpacity,
        fadePhase: Math.random() * Math.PI * 2
      });
    }

    let animationId: number;
    let time = 0;

    const animate = () => {
      // Clear canvas completely each frame for clean look
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      time += config.timeIncrement;

      particles.forEach((particle) => {
        // Update position - gentle upward drift
        particle.y += particle.velocityY;
        particle.x += particle.velocityX + Math.sin(time + particle.fadePhase) * config.swaySpeed;

        // Reset particle when it goes above screen
        if (particle.y < -10) {
          particle.y = canvas.height + 10;
          particle.x = Math.random() * canvas.width;
        }

        // Wrap horizontally
        if (particle.x < -10) particle.x = canvas.width + 10;
        if (particle.x > canvas.width + 10) particle.x = -10;

        // Gentle opacity pulsing
        const currentOpacity = particle.opacity + Math.sin(time * config.pulseSpeed + particle.fadePhase) * config.pulseAmount;

        // Draw very subtle glow
        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particle.radius * config.glowRadiusMultiplier
        );
        const { r, g, b } = config.particleColor;
        gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${currentOpacity})`);
        gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius * config.glowRadiusMultiplier, 0, Math.PI * 2);
        ctx.fill();

        // Draw particle core
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${currentOpacity * config.coreOpacityMultiplier})`;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.6 }}
    />
  );
}