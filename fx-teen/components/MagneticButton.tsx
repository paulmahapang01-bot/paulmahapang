import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

const MotionDiv = motion.div as any;

interface MagneticButtonProps {
  children: React.ReactNode;
  strength?: number; // How far it moves (default 30)
  className?: string;
}

const MagneticButton: React.FC<MagneticButtonProps> = ({ 
  children, 
  strength = 30,
  className = "" 
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    // @ts-ignore
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    
    // Calculate distance from center
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);

    // Update position with strength factor
    setPosition({ x: middleX * 0.5, y: middleY * 0.5 });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const { x, y } = position;

  return (
    <MotionDiv
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x, y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={`inline-block ${className}`}
    >
      {children}
    </MotionDiv>
  );
};

export default MagneticButton;