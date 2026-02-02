// Shared particle animation configuration for consistent animations across pages
export const PARTICLE_CONFIG = {
  // Number of particles
  particleCount: 42,
  
  // Particle size range
  minRadius: 1.2,
  maxRadius: 4.4,
  
  // Movement speeds
  minVelocityY: 0.048,  // Minimum upward speed
  maxVelocityY: 0.096,  // Maximum upward speed
  horizontalDriftSpeed: 0.048,  // Side-to-side drift speed
  swaySpeed: 0.024,  // Sinusoidal sway amount
  
  // Opacity settings
  minOpacity: 0.1,
  maxOpacity: 0.3,
  
  // Animation settings
  timeIncrement: 0.01,
  pulseSpeed: 2,
  pulseAmount: 0.1,
  
  // Particle spawn settings
  spawnBelowCanvas: 1.2,  // Multiplier for initial Y position
  
  // Glow effect
  glowRadiusMultiplier: 3,
  coreOpacityMultiplier: 0.8,
  
  // Colors
  particleColor: {
    r: 255,
    g: 255,
    b: 255
  }
};

// Export a description for documentation
export const PARTICLE_DESCRIPTION = {
  effect: "Subtle upward-drifting particles",
  appearance: "Like ashes or snow drifting gently upward",
  performance: "Lightweight, 42 particles with minimal CPU usage",
  colors: "White particles with soft glow",
  movement: "Ultra-slow drift with gentle horizontal sway"
};