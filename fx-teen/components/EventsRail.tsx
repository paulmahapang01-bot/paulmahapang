import React from 'react';
import { motion } from 'framer-motion';
import { EVENTS } from '../constants';
import { Radio, Calendar, PlayCircle } from 'lucide-react';
import Button from './Button';

const EventsRail = () => {
  return (
    <section className="py-12 border-b border-white/5 bg-navy-900 relative overflow-hidden">
      <div className="container mx-auto px-6 mb-8 flex justify-between items-end">
         <div>
            <div className="text-neon-green font-mono text-xs uppercase tracking-widest mb-2 flex items-center">
               <span className="w-2 h-2 bg-neon-green rounded-full mr-2 animate-pulse"></span>
               Operations Timeline
            </div>
            <h2 className="text-3xl md:text-4xl font-grotesk font-bold text-white">THE LIVE <span className="text-white/50">TRADING FLOOR</span></h2>
         </div>
      </div>

      {/* Horizontal Scroll Rail */}
      <div className="flex overflow-x-auto pb-8 px-6 space-x-6 no-scrollbar snap-x snap-mandatory">
         {EVENTS.map((event) => (
            <div key={event.id} className="snap-center shrink-0">
               <EventCard event={event} />
            </div>
         ))}
         {/* Spacer for right padding */}
         <div className="w-6 shrink-0" />
      </div>
      
      {/* Right Fade Gradient */}
      <div className="absolute top-0 bottom-0 right-0 w-32 bg-gradient-to-l from-navy-900 to-transparent pointer-events-none" />
    </section>
  );
};

const EventCard = ({ event }: { event: any }) => {
   const isLive = event.status === 'LIVE';
   const isExpired = event.status === 'EXPIRED';

   return (
      <motion.div 
         whileHover={!isExpired ? { y: -5 } : {}}
         className={`
            relative w-[350px] md:w-[400px] bg-navy-800 rounded-xl overflow-hidden flex flex-col
            border border-white/10 transition-all duration-300
            ${isLive ? 'shadow-[0_0_30px_rgba(255,59,59,0.2)] border-red-500/50' : ''}
            ${isExpired ? 'opacity-60 grayscale' : ''}
         `}
      >
         {/* Live Indicator Pulse */}
         {isLive && (
            <div className="absolute inset-0 z-0 pointer-events-none">
               <div className="absolute top-0 right-0 w-full h-full bg-red-500/5 animate-pulse" />
            </div>
         )}

         <div className="p-6 relative z-10 flex flex-col h-full">
            {/* Header / Status */}
            <div className="flex justify-between items-start mb-4">
               <div className={`
                  px-3 py-1 rounded text-[10px] font-bold uppercase tracking-wider flex items-center gap-2
                  ${isLive ? 'bg-red-500 text-white animate-pulse' : isExpired ? 'bg-gray-700 text-gray-400' : 'bg-neon-green/10 text-neon-green border border-neon-green/30'}
               `}>
                  {isLive && <Radio size={12} />}
                  {isLive ? 'LIVE NOW' : isExpired ? 'EXPIRED' : 'UPCOMING'}
               </div>
               <div className="font-mono text-xs text-silver">{event.date.split('@')[0]}</div>
            </div>

            {/* Content */}
            <h3 className="text-xl font-bold text-white mb-2 leading-tight uppercase font-grotesk">{event.title}</h3>
            <p className="text-sm text-silver mb-6 leading-relaxed">{event.description}</p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
               {event.tags.map((tag: string) => (
                  <span key={tag} className="text-[10px] font-mono text-white/40">{tag}</span>
               ))}
            </div>

            {/* Action */}
            <div className="mt-auto">
               <Button 
                  fullWidth 
                  variant={isLive ? 'primary' : 'outline'}
                  className={`
                     py-2 text-sm 
                     ${isLive ? 'bg-red-600 hover:bg-red-500 border-none shadow-[0_0_15px_rgba(220,38,38,0.5)] text-white' : ''}
                     ${isExpired ? 'border-gray-700 text-gray-500 hover:bg-transparent cursor-not-allowed' : ''}
                  `}
                  disabled={isExpired}
               >
                  {isLive ? 'JOIN ROOM NOW' : isExpired ? 'RECORDING LOCKED' : 'RESERVE SEAT'}
               </Button>
            </div>
         </div>

         {/* Perforated Edge Effect (Left Border) */}
         <div className="absolute top-0 bottom-0 left-0 w-[4px] flex flex-col justify-between py-1">
             {[...Array(20)].map((_, i) => (
                <div key={i} className="w-[2px] h-[2px] rounded-full bg-navy-900 mb-1 ml-[1px]" />
             ))}
         </div>
         <div className="absolute top-0 bottom-0 left-0 border-l-2 border-dashed border-white/10 pointer-events-none" />
      </motion.div>
   );
};

export default EventsRail;