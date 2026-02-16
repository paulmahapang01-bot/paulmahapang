import React from 'react';
import { motion } from 'framer-motion';
import Layout from '../components/Layout';
import { TESTIMONIALS } from '../constants';
import { Twitter, MessageSquare } from 'lucide-react';

const MotionDiv = motion.div as any;

const Testimonials = () => {
  // Duplicate testimonials to create enough content for infinite scroll
  const items = [...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS];
  const col1 = items.filter((_, i) => i % 3 === 0);
  const col2 = items.filter((_, i) => i % 3 === 1);
  const col3 = items.filter((_, i) => i % 3 === 2);

  return (
    <Layout>
      <div className="min-h-screen bg-navy-900 relative">
         <div className="py-20 px-6 container mx-auto text-center relative z-20">
            <h1 className="text-5xl md:text-7xl font-grotesk font-bold text-white mb-6">WALL OF <span className="text-neon-green">WINS</span></h1>
            <p className="text-silver text-xl max-w-2xl mx-auto mb-12">Don't trust us. Trust the results. Real people, real profits.</p>
         </div>

         {/* Masonry Grid with Gradient Masks for Scroll Effect */}
         <div className="relative h-[800px] overflow-hidden container mx-auto px-4 md:px-6">
            <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-navy-900 to-transparent z-10" />
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-navy-900 to-transparent z-10" />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 h-full">
               <InfiniteColumn items={col1} speed={25} />
               <InfiniteColumn items={col2} speed={35} className="hidden md:flex" />
               <InfiniteColumn items={col3} speed={30} className="hidden lg:flex" />
            </div>
         </div>

         <div className="py-20 text-center relative z-20">
            <h2 className="text-2xl font-bold text-white mb-6">Ready to post your own win?</h2>
            <button className="px-8 py-4 bg-neon-green text-navy-900 font-bold rounded-xl hover:shadow-neon transition-all hover:scale-105">
               Start Trading Today
            </button>
         </div>
      </div>
    </Layout>
  );
};

const InfiniteColumn = ({ items, speed, className = "" }: { items: any[], speed: number, className?: string }) => (
   <div className={`flex-col gap-6 ${className}`}>
      <MotionDiv
         animate={{ y: [0, -1000] }}
         transition={{ repeat: Infinity, ease: "linear", duration: speed }}
         className="flex flex-col gap-6 pb-6"
      >
         {items.map((item, idx) => (
            <TestimonialCard key={`${item.id}-${idx}`} item={item} />
         ))}
      </MotionDiv>
   </div>
);

const TestimonialCard: React.FC<{ item: any }> = ({ item }) => (
   <div className="bg-[#111625]/90 backdrop-blur-md border border-white/5 p-6 rounded-2xl break-inside-avoid hover:border-neon-green/50 transition-colors duration-300 group">
      <div className="flex items-center justify-between mb-4">
         <div className="flex items-center gap-3">
            <img src={item.avatar} alt={item.handle} className="w-10 h-10 rounded-full bg-navy-800" />
            <div>
               <div className="text-white font-bold text-sm">{item.handle}</div>
               <div className="text-silver text-xs flex items-center gap-1">
                  {item.platform === 'twitter' ? <Twitter size={10} /> : <MessageSquare size={10} />}
                  {item.platform === 'twitter' ? 'Twitter' : 'Discord'}
               </div>
            </div>
         </div>
         {item.winAmount && (
            <div className="bg-neon-green/10 text-neon-green px-2 py-1 rounded text-xs font-mono font-bold">
               {item.winAmount}
            </div>
         )}
      </div>
      
      <p className="text-gray-300 text-sm mb-4 leading-relaxed">
         "{item.content}"
      </p>

      {/* Screenshot Placeholder */}
      <div className="w-full h-32 bg-black/40 rounded-lg border border-white/5 flex items-center justify-center overflow-hidden relative group-hover:border-neon-green/20 transition-colors">
         <div className="text-xs text-silver font-mono">{item.profitScreenshot}</div>
         <div className="absolute inset-0 bg-gradient-to-tr from-neon-green/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
   </div>
);

export default Testimonials;