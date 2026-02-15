import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const AuthLayout: React.FC<{ children: React.ReactNode; title: string }> = ({ children, title }) => {
  return (
    <div className="min-h-screen bg-navy-900 flex overflow-hidden">
      {/* Left Side - Visual */}
      <div className="hidden lg:flex w-1/2 relative items-center justify-center bg-navy-900 overflow-hidden">
        {/* Radial Glow */}
        <div className="absolute inset-0 bg-radial-gradient from-neon-green/10 via-navy-900 to-navy-900 pointer-events-none" />
        
        {/* Animated Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>

        <motion.div 
           initial={{ opacity: 0, scale: 0.9, rotateX: 10 }}
           animate={{ opacity: 1, scale: 1, rotateX: 0 }}
           transition={{ duration: 1, ease: "easeOut" }}
           className="relative z-10 w-[400px] aspect-[3/4] rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl shadow-neon-green/20 p-8 flex flex-col justify-between"
           style={{ transformStyle: 'preserve-3d', transform: 'perspective(1000px)' }}
        >
           <div>
              <div className="flex justify-between items-center mb-8">
                 <div className="text-xs font-mono text-silver">PnL_TODAY</div>
                 <div className="w-2 h-2 rounded-full bg-neon-green animate-pulse"></div>
              </div>
              <div className="text-6xl font-mono font-bold text-neon-green tracking-tighter mb-2">+450%</div>
              <div className="text-sm text-white/60 font-inter">Total Profit Generated</div>
           </div>

           <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                 <div key={i} className="h-2 bg-white/10 rounded-full w-full overflow-hidden">
                    <motion.div 
                       initial={{ width: 0 }}
                       animate={{ width: `${60 + (i * 10)}%` }}
                       transition={{ duration: 1.5, delay: 0.5 + (i * 0.2) }}
                       className="h-full bg-neon-green"
                    />
                 </div>
              ))}
           </div>

           <div className="mt-8 pt-8 border-t border-white/10">
              <p className="text-2xl font-grotesk font-bold text-white leading-tight">"The only bad trade is the one you didn't take."</p>
           </div>
        </motion.div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex flex-col p-8 md:p-16 overflow-y-auto">
        <Link to="/" className="flex items-center text-silver hover:text-white transition-colors mb-12 w-fit group">
           <ArrowLeft size={20} className="mr-2 group-hover:-translate-x-1 transition-transform" /> Back to Home
        </Link>

        <div className="max-w-md w-full mx-auto my-auto">
           <h2 className="text-4xl font-grotesk font-bold text-white mb-2">{title}</h2>
           <p className="text-silver mb-8">Welcome back to the elite circle.</p>
           
           {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;