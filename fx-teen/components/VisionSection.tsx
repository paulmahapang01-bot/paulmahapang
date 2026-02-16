import React from 'react';
import { motion } from 'framer-motion';
import ParticlesBackground from './ParticlesBackground';
import { Target, Zap, Globe } from 'lucide-react';

const MotionDiv = motion.div as any;

const VisionSection = () => {
  return (
    <section className="relative py-32 overflow-hidden">
      {/* 3D PARTICLE ENGINE RESTORED */}
      <ParticlesBackground />
      
      {/* Dark Overlay for Readability */}
      <div className="absolute inset-0 bg-navy-900/80 z-0" />

      <div className="container mx-auto px-6 relative z-10">
         <div className="max-w-4xl mx-auto text-center mb-16">
            <MotionDiv
               initial={{ opacity: 0, scale: 0.9 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
               className="inline-flex items-center justify-center p-3 mb-6 bg-neon-green/10 rounded-full border border-neon-green/30 text-neon-green"
            >
               <Target size={24} />
            </MotionDiv>
            <h2 className="text-4xl md:text-6xl font-grotesk font-bold text-white mb-6">
               THE <span className="text-neon-green">VISION</span>
            </h2>
            <p className="text-xl text-silver leading-relaxed">
               We are not just a signal group. We are building a global ecosystem of self-sufficient, wealthy teenagers who reject the 9-5 matrix. Institutional strategies, automated by discipline.
            </p>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <VisionCard 
               icon={Zap} 
               title="Speed & Precision" 
               desc="Executing trades with sniper-like accuracy using our proprietary entry models." 
            />
            <VisionCard 
               icon={Globe} 
               title="Global Domination" 
               desc="Connecting traders from every continent into a single, high-frequency hive mind." 
            />
            <VisionCard 
               icon={Target} 
               title="Financial Sovereignty" 
               desc="Total independence from traditional financial systems through mastered skill." 
            />
         </div>
      </div>
    </section>
  );
};

const VisionCard = ({ icon: Icon, title, desc }: any) => (
   <MotionDiv 
      whileHover={{ y: -10 }}
      className="bg-navy-800/50 backdrop-blur-md p-8 rounded-3xl border border-white/5 hover:border-neon-green transition-all duration-300"
   >
      <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center mb-6 text-neon-green">
         <Icon size={24} />
      </div>
      <h3 className="text-2xl font-bold text-white mb-3 font-grotesk">{title}</h3>
      <p className="text-silver text-sm leading-relaxed">{desc}</p>
   </MotionDiv>
);

export default VisionSection;