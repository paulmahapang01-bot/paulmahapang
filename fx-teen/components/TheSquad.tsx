import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, Instagram, ExternalLink } from 'lucide-react';
import { useEliteInteractions } from '../hooks/useEliteInteractions';

const MotionDiv = motion.div as any;

// STRICT DATA SOURCE AS REQUESTED
const TEAM_MEMBERS = [
  {
    id: 1,
    name: "Flurry",
    role: "FX TEEN FOUNDER",
    // Using a high-quality placeholder that matches the 'founder' vibe. Replace with /founder-flurry.jpg
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1000&auto=format&fit=crop", 
    whatsapp: "https://wa.me/27733760734",
    instagram: "https://instagram.com/alwaysflyflurry",
    email: "mailto:malgasabubakr@icloud.com"
  },
  {
    id: 2,
    name: "Oratile James Raqashile",
    role: "OFFICIAL REPRESENTATIVE",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop",
    whatsapp: "https://wa.me/27655017977",
    instagram: "https://instagram.com/o._r_james",
    email: "mailto:orjamestrading@gmail.com"
  },
  {
    id: 3,
    name: "Nkosi Nomandla",
    role: "OFFICIAL REPRESENTATIVE",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1000&auto=format&fit=crop",
    whatsapp: "https://wa.me/27735855354", 
    email: "mailto:snomandlha@icloud.com"
  },
  {
    id: 4,
    name: "Bongani Makhabani",
    role: "OFFICIAL REPRESENTATIVE",
    image: "https://images.unsplash.com/photo-1534308143481-c55f00be8bd7?q=80&w=1000&auto=format&fit=crop",
    whatsapp: "https://wa.me/27610968415",
    email: "mailto:bonganiforbes4@gmail.com",
    instagram: "https://web.whatsapp.com/" // As per provided data
  }
];

const TheSquad = () => {
  const { triggerHaptic } = useEliteInteractions();

  return (
    <section id="squad" className="py-24 px-6 container mx-auto relative z-10 snap-start">
      <div className="text-center mb-16">
         <h2 className="text-4xl md:text-5xl font-grotesk font-bold text-white mb-4">
            MEET THE <span className="text-neon-green">UNTOUCHABLES</span>
         </h2>
         <p className="text-silver text-lg">The leadership defining the new standard.</p>
      </div>

      {/* THE "UNTOUCHABLES" MOBILE STACK: grid-cols-1 on mobile, extra breathing room gap-8 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
         {TEAM_MEMBERS.map((member, index) => (
            <MotionDiv
               key={member.id}
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: index * 0.1 }}
               whileHover={{ y: -10 }}
               className="group relative bg-navy-800 rounded-3xl overflow-hidden border border-white/5 hover:border-neon-green transition-all duration-300 shadow-lg hover:shadow-[0_0_30px_rgba(0,255,163,0.3)]"
            >
               {/* Image Container with Holographic Effect */}
               <div className="relative h-[350px] overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-transparent to-transparent z-10" />
                  <img 
                     src={member.image} 
                     alt={member.name} 
                     className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 scale-100 group-hover:scale-110" 
                  />
                  {/* Hologram Scan Line */}
                  <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(transparent_0%,rgba(0,255,163,0.1)_50%,transparent_100%)] bg-[length:100%_200%] animate-scan opacity-0 group-hover:opacity-100 pointer-events-none" />
               </div>

               {/* Content */}
               <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                  <div className="mb-4">
                     <span className="inline-block px-2 py-1 bg-neon-green/10 border border-neon-green/30 text-neon-green text-[10px] font-bold uppercase tracking-wider rounded mb-2">
                        {member.role === "FX TEEN FOUNDER" ? "ARCHITECT" : "LEADERSHIP"}
                     </span>
                     <h3 className="text-xl font-bold text-white font-grotesk leading-none">{member.name}</h3>
                     <p className="text-xs text-silver font-mono mt-1 opacity-80">{member.role}</p>
                  </div>

                  {/* Contact Dock - Optimized for Touch (Larger padding) */}
                  <div className="flex gap-2">
                     {member.whatsapp && (
                        <a 
                           href={member.whatsapp} 
                           target="_blank" 
                           rel="noreferrer"
                           onClick={() => triggerHaptic('medium')}
                           className="p-3 bg-white/5 rounded-xl hover:bg-[#25D366] hover:text-white text-silver transition-colors"
                        >
                           <Phone size={18} />
                        </a>
                     )}
                     {member.instagram && (
                        <a 
                           href={member.instagram} 
                           target="_blank" 
                           rel="noreferrer"
                           onClick={() => triggerHaptic('medium')}
                           className="p-3 bg-white/5 rounded-xl hover:bg-[#E1306C] hover:text-white text-silver transition-colors"
                        >
                           <Instagram size={18} />
                        </a>
                     )}
                     {member.email && (
                        <a 
                           href={member.email} 
                           onClick={() => triggerHaptic('medium')}
                           className="p-3 bg-white/5 rounded-xl hover:bg-white hover:text-navy-900 text-silver transition-colors"
                        >
                           <Mail size={18} />
                        </a>
                     )}
                  </div>
               </div>
            </MotionDiv>
         ))}
      </div>
      <style>{`
         @keyframes scan {
            0% { background-position: 0% 0%; }
            100% { background-position: 0% 200%; }
         }
         .animate-scan {
            animation: scan 2s linear infinite;
         }
      `}</style>
    </section>
  );
};

export default TheSquad;