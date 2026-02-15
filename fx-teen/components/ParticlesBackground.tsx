import React from 'react';
import { motion } from 'framer-motion';

const ParticlesBackground = () => {
  // Generate a fixed set of particles to avoid hydration mismatches
  const particles = Array.from({ length: 20 }).map((_, i) => ({
    id: i,
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    size: Math.random() * 4 + 1,
    duration: Math.random() * 10 + 10,
    delay: Math.random() * 5
  }));

  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-neon-green/30 blur-[1px]"
          style={{
            top: particle.top,
            left: particle.left,
            width: particle.size,
            height: particle.size,
          }}
          animate={{
            y: [0, -100, 0],
            opacity: [0, 0.5, 0],
            scale: [1, 1.5, 1]
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "linear"
          }}
        />
      ))}
      {/* Subtle Fog Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-transparent to-navy-900 opacity-80" />
    </div>
  );
};

export default ParticlesBackground;