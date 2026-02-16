import React from 'react';
import { motion } from 'framer-motion';
import Layout from '../components/Layout';
import { TEAM_MEMBERS } from '../constants';
import { Twitter, Instagram, Zap, BookOpen, Users, Mic } from 'lucide-react';

const MotionDiv = motion.div as any;

const About = () => {
  return (
    <Layout>
      <div className="min-h-screen bg-navy-900 overflow-hidden">
        
        {/* SECTION 1: ECOSYSTEM MAP */}
        <section className="relative py-20 lg:py-32 px-6 container mx-auto text-center">
           <MotionDiv
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-16 relative z-10"
           >
              <h1 className="text-4xl md:text-6xl font-grotesk font-bold text-white mb-4">THE FX TEEN <span className="text-neon-blue">ECOSYSTEM</span></h1>
              <p className="text-silver text-lg max-w-2xl mx-auto">More than just signals. It's a complete operating system for your financial freedom.</p>
           </MotionDiv>

           {/* Interactive Network Map Visualization */}
           <div className="relative h-[600px] w-full max-w-5xl mx-auto mb-20 perspective-1000">
              
              {/* Background Glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-neon-blue/5 rounded-full blur-3xl pointer-events-none" />

              {/* Connecting Lines Layer (SVG) */}
              <svg className="absolute inset-0 w-full h-full z-0 pointer-events-none overflow-visible">
                {/* Connection to Live Signals (20%, 20%) */}
                <ConnectionLine x1="50%" y1="50%" x2="20%" y2="20%" color="#3B82F6" />
                
                {/* Connection to Academy (80%, 20%) */}
                <ConnectionLine x1="50%" y1="50%" x2="80%" y2="20%" color="#A855F7" />

                {/* Connection to Squad (20%, 80%) */}
                <ConnectionLine x1="50%" y1="50%" x2="20%" y2="80%" color="#F97316" />

                {/* Connection to Mentorship (80%, 80%) */}
                <ConnectionLine x1="50%" y1="50%" x2="80%" y2="80%" color="#EC4899" />
              </svg>

              {/* Central Node */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                <MotionDiv
                    animate={{ scale: [1, 1.05, 1], boxShadow: ['0 0 30px rgba(0,255,163,0.3)', '0 0 60px rgba(0,255,163,0.6)', '0 0 30px rgba(0,255,163,0.3)'] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    className="w-40 h-40 md:w-48 md:h-48 bg-navy-900 border-2 border-neon-green rounded-full flex flex-col items-center justify-center relative group cursor-pointer hover:bg-navy-800 transition-colors z-30"
                >
                     {/* Inner Ping Animation */}
                     <div className="absolute inset-0 rounded-full border border-neon-green/30 animate-ping opacity-20 pointer-events-none"></div>
                     
                     <div className="text-neon-green font-grotesk font-bold text-2xl md:text-3xl relative z-10">YOU</div>
                     <div className="text-xs text-silver mt-2 font-mono bg-white/5 px-2 py-1 rounded relative z-10">Student Success</div>
                </MotionDiv>
              </div>

              {/* Orbiting Nodes */}
              <SatelliteNode 
                  label="LIVE SIGNALS" 
                  description="85% Win Rate"
                  x="20%" y="20%" 
                  icon={Zap}
                  color="text-neon-blue border-neon-blue shadow-[0_0_20px_rgba(59,130,246,0.3)]" 
                  delay={0} 
              />
              <SatelliteNode 
                  label="ACADEMY" 
                  description="Master the Skill"
                  x="80%" y="20%" 
                  icon={BookOpen}
                  color="text-purple-500 border-purple-500 shadow-[0_0_20px_rgba(168,85,247,0.3)]" 
                  delay={1} 
              />
              <SatelliteNode 
                  label="24/7 SQUAD" 
                  description="Never Trade Alone"
                  x="20%" y="80%" 
                  icon={Users}
                  color="text-orange-500 border-orange-500 shadow-[0_0_20px_rgba(249,115,22,0.3)]" 
                  delay={2} 
              />
              <SatelliteNode 
                  label="MENTORSHIP" 
                  description="Weekly Live Calls"
                  x="80%" y="80%" 
                  icon={Mic}
                  color="text-pink-500 border-pink-500 shadow-[0_0_20px_rgba(236,72,153,0.3)]" 
                  delay={3} 
              />
           </div>

           {/* SECTION 2: HARD STATS STRIP */}
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-12 border-y border-white/5 bg-navy-800/30 backdrop-blur-sm">
              <StatBlock number="5,000+" label="Active Members" />
              <StatBlock number="85%+" label="Signal Win Rate" />
              <StatBlock number="$2M+" label="Student Profits Verified" />
           </div>
        </section>

        {/* SECTION 3: THE SQUAD */}
        <section className="py-24 px-6 container mx-auto">
           <div className="text-center mb-16">
              <h2 className="text-4xl font-grotesk font-bold text-white mb-2">MEET THE <span className="text-neon-green">UNTOUCHABLES</span></h2>
              <p className="text-silver">The minds behind the charts.</p>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {TEAM_MEMBERS.map((member) => (
                 <div key={member.id} className="group relative h-[500px] rounded-2xl overflow-hidden bg-navy-800 border border-white/5 hover:border-neon-green transition-colors duration-300">
                    {/* Placeholder for Hologram Video */}
                    <div className="absolute inset-0 bg-black/50 group-hover:bg-black/20 transition-all duration-500">
                       <div className="w-full h-full flex items-center justify-center bg-[url('https://www.transparenttextures.com/patterns/diagmonds-light.png')] opacity-20"></div>
                       {/* Animated Scan Line */}
                       <div className="absolute top-0 left-0 w-full h-1 bg-neon-green/50 shadow-[0_0_20px_#00FFA3] animate-scan" style={{ animationDuration: '3s', animationIterationCount: 'infinite', animationName: 'scan' }}></div>
                       
                       {/* Fake Hologram Graphic */}
                       <div className="absolute inset-0 flex flex-col items-center justify-end pb-24 opacity-80 group-hover:opacity-100 transition-opacity">
                          <div className="w-48 h-64 bg-gradient-to-t from-neon-green/20 to-transparent clip-path-polygon flex items-end justify-center">
                             <span className="text-xs text-neon-green font-mono mb-4 animate-pulse">{member.imagePlaceholder}</span>
                          </div>
                       </div>
                    </div>

                    {/* Content Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-navy-900 via-navy-900/90 to-transparent translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                       <h3 className="text-2xl font-grotesk font-bold text-white uppercase">{member.name}</h3>
                       <p className="text-neon-green font-mono text-xs tracking-widest mb-4">{member.role}</p>
                       
                       {/* Socials Slide Up */}
                       <div className="flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                          {member.socials.twitter && (
                             <a href="#" className="p-2 bg-white/5 rounded-full hover:bg-neon-green hover:text-navy-900 transition-colors">
                                <Twitter size={18} />
                             </a>
                          )}
                          {member.socials.instagram && (
                             <a href="#" className="p-2 bg-white/5 rounded-full hover:bg-neon-green hover:text-navy-900 transition-colors">
                                <Instagram size={18} />
                             </a>
                          )}
                       </div>
                    </div>
                 </div>
              ))}
           </div>
        </section>
      </div>

      <style>{`
        @keyframes scan {
          0% { top: 0%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
      `}</style>
    </Layout>
  );
};

const SatelliteNode = ({ label, description, x, y, icon: Icon, color, delay }: any) => (
   <MotionDiv 
      className={`absolute w-32 h-32 md:w-40 md:h-40 bg-navy-900/80 backdrop-blur-md rounded-2xl border flex flex-col items-center justify-center z-20 group cursor-pointer ${color}`}
      style={{ left: x, top: y, transform: 'translate(-50%, -50%)' }}
      animate={{ y: [0, -15, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: delay }}
      whileHover={{ scale: 1.1, zIndex: 50 }}
   >
      <div className={`p-3 rounded-full bg-white/5 mb-3 group-hover:bg-white/10 transition-colors ${color.split(' ')[0]}`}>
        <Icon size={24} />
      </div>
      <span className="font-grotesk font-bold text-sm text-center px-2 text-white">{label}</span>
      <span className="text-[10px] text-silver text-center mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute -bottom-4 w-full">{description}</span>
      
      {/* Glow Effect on Hover */}
      <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 bg-current`} />
   </MotionDiv>
);

const ConnectionLine = ({ x1, y1, x2, y2, color }: { x1: string, y1: string, x2: string, y2: string, color: string }) => (
    <g>
        {/* Base Dashed Line */}
        <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth="1" strokeOpacity="0.2" strokeDasharray="5,5" />
        
        {/* Stream 1: Fast Outbound (Neon Green) - 1.2s Duration */}
        <circle r="2" fill="#00FFA3" filter="drop-shadow(0 0 5px #00FFA3)">
             <animate attributeName="cx" from={x1} to={x2} dur="1.2s" repeatCount="indefinite" />
             <animate attributeName="cy" from={y1} to={y2} dur="1.2s" repeatCount="indefinite" />
             <animate attributeName="opacity" values="0;1;0" dur="1.2s" repeatCount="indefinite" />
        </circle>

        {/* Stream 2: Fast Outbound Delayed (Neon Green) - Higher Density */}
        <circle r="2" fill="#00FFA3" filter="drop-shadow(0 0 5px #00FFA3)">
             <animate attributeName="cx" from={x1} to={x2} dur="1.2s" begin="0.6s" repeatCount="indefinite" />
             <animate attributeName="cy" from={y1} to={y2} dur="1.2s" begin="0.6s" repeatCount="indefinite" />
             <animate attributeName="opacity" values="0;1;0" dur="1.2s" begin="0.6s" repeatCount="indefinite" />
        </circle>

        {/* Stream 3: Heavy Inbound (Category Color) - Slower Pulse (2s) */}
        <circle r="3" fill={color} filter={`drop-shadow(0 0 8px ${color})`}>
             <animate attributeName="cx" from={x2} to={x1} dur="2s" begin="0s" repeatCount="indefinite" />
             <animate attributeName="cy" from={y2} to={y1} dur="2s" begin="0s" repeatCount="indefinite" />
             <animate attributeName="opacity" values="0;1;0" dur="2s" repeatCount="indefinite" />
        </circle>
    </g>
);

const StatBlock = ({ number, label }: { number: string, label: string }) => (
   <div className="text-center">
      <div className="text-4xl md:text-5xl font-mono font-bold text-neon-green mb-2">{number}</div>
      <div className="text-silver uppercase tracking-wider text-xs md:text-sm">{label}</div>
   </div>
);

export default About;