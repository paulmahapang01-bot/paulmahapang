import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: 'primary' | 'outline' | 'ghost';
  fullWidth?: boolean;
}

const MotionButton = motion.button as any;

const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  fullWidth = false, 
  className = '', 
  ...props 
}) => {
  const baseStyles = "px-6 py-3 rounded-xl font-grotesk font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-center";
  
  const variants = {
    primary: "bg-neon-green text-navy-900 shadow-neon hover:shadow-[0_0_30px_rgba(0,255,163,0.6)] hover:scale-105",
    outline: "border border-neon-green text-neon-green hover:bg-neon-green/10",
    ghost: "text-silver hover:text-white hover:bg-white/5",
  };

  return (
    <MotionButton
      whileTap={{ scale: 0.95 }}
      className={`${baseStyles} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {children}
    </MotionButton>
  );
};

export default Button;