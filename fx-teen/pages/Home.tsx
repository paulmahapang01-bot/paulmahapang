import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FEATURES, PRICING_PLANS, TESTIMONIALS, COURSES } from '../constants';
import Button from '../components/Button';
import Ticker from '../components/Ticker';
import EventsRail from '../components/EventsRail';
import ParticlesBackground from '../components/ParticlesBackground';
import { ArrowRight, Check, Zap, BookOpen, Users, Mic, Twitter, Instagram, MessageSquare, PlayCircle, Clock, Phone, Mail, X, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

// --- DATA CONFIGURATION: LEADERSHIP ---
const LEADERSHIP_DATA = [
  {
    id: 'founder',
    name: 'ABUBAKR (FLURRY)',
    role: 'FX TEEN FOUNDER',
    badge: 'THE ARCHITECT',
    bio: 'The visionary behind FX Teen. Transforming the landscape of retail trading with institutional precision and unyielding discipline. Leading the new wave of profitable traders.',
    visual: 'Founders Hologram',
    contact: [
      { type: 'whatsapp', url: 'https://wa.me/27733760734', icon: Phone, colorClass: 'hover:text-[#25D366] hover:drop-shadow-[0_0_10px_#25D366]' },
      { type: 'instagram', url: 'https://instagram.com/alwaysflyflurry', icon: Instagram, colorClass: 'hover:text-[#E1306C] hover:drop-shadow-[0_0_10px_#E1306C]' }
    ]
  },
  {
    id: 'rep',
    name: 'ORATILE JAMES RAQASHILE',
    role: 'OFFICIAL REPRESENTATIVE',
    badge: 'TEAM LEAD',
    bio: 'Head of operations and student success. Dedicated to ensuring integrity within the FX Teen ecosystem and guiding new members to profitability.',
    visual: 'Rep Hologram',
    contact: [
      { type: 'whatsapp', url: 'https://wa.me/27655017977', icon: Phone, colorClass: 'hover:text-[#25D366] hover:drop-shadow-[0_0_10px_#25D366]' },
      { type: 'instagram', url: 'https://instagram.com/o._r_james', icon: Instagram, colorClass: 'hover:text-[#E1306C] hover:drop-shadow-[0_0_10px_#E1306C]' },
      { type: 'email', url: 'mailto:orjamestrading@gmail.com', icon: Mail, colorClass: 'hover:text-white hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]' }
    ]
  }
];

// --- SUB-COMPONENTS FOR HOME PAGE COMPOSITION ---

const ConnectionLine = ({ x1, y1, x2, y2, color }: { x1: string, y1: string, x2: string, y2: string, color: string }) => (
    <g>
        <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth="1" strokeOpacity="0.2" strokeDasharray="5,5" />
        <circle r="2" fill="#00FFA3" filter="drop-shadow(0 0 5px #00FFA3)">
             <animate attributeName="cx" from={x1} to={x2} dur="1.2s" repeatCount="indefinite" />
             <animate attributeName="cy" from={y1} to={y2} dur="1.2s" repeatCount="indefinite" />
             <animate attributeName="opacity" values="0;1;0" dur="1.2s" repeatCount="indefinite" />
        </circle>
        <circle r="2" fill="#00FFA3" filter="drop-shadow(0 0 5px #00FFA3)">
             <animate attributeName="cx" from={x1} to={x2} dur="1.2s" begin="0.6s" repeatCount="indefinite" />
             <animate attributeName="cy" from={y1} to={y2} dur="1.2s" begin="0.6s" repeatCount="indefinite" />
             <animate attributeName="opacity" values="0;1;0" dur="1.2s" begin="0.6s" repeatCount="indefinite" />
        </circle>
    </g>
);

const SatelliteNode = ({ label, description, x, y, icon: Icon, color, delay }: any) => (
   <motion.div 
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
      <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 bg-current`} />
   </motion.div>
);

const TestimonialCard = ({ item }: { item: any }) => (
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
      <p className="text-gray-300 text-sm mb-4 leading-relaxed">"{item.content}"</p>
      <div className="w-full h-32 bg-black/40 rounded-lg border border-white/5 flex items-center justify-center overflow-hidden relative group-hover:border-neon-green/20 transition-colors">
         <div className="text-xs text-silver font-mono">{item.profitScreenshot}</div>
         <div className="absolute inset-0 bg-gradient-to-tr from-neon-green/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
   </div>
);

const InfiniteColumn = ({ items, speed, className = "" }: { items: any[], speed: number, className?: string }) => (
   <div className={`flex-col gap-6 ${className}`}>
      <motion.div
         animate={{ y: [0, -1000] }}
         transition={{ repeat: Infinity, ease: "linear", duration: speed }}
         className="flex flex-col gap-6 pb-6"
      >
         {items.map((item, idx) => (
            <TestimonialCard key={`${item.id}-${idx}`} item={item} />
         ))}
      </motion.div>
   </div>
);


// --- MAIN MASTER HOME COMPONENT ---

const Home = () => {
  const [selectedMember, setSelectedMember] = useState<any>(null);

  return (
    <div className="flex flex-col relative w-full overflow-hidden">
      {/* Z-0: ATMOSPHERE */}
      <ParticlesBackground />

      {/* SECTION 1: HERO (Anchor: #hero) */}
      <section id="hero" className="relative px-6 pb-20 pt-10 md:pt-20 lg:pb-32 container mx-auto z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left Column: Text */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-block px-4 py-2 rounded-full border border-neon-green/30 bg-neon-green/5 text-neon-green font-mono text-xs uppercase tracking-widest mb-8">
              Join The New Elite
            </div>
            <h1 className="text-5xl md:text-7xl font-grotesk font-bold leading-[0.95] tracking-tight mb-8">
              YOUR FREEDOM <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-silver">STARTS HERE.</span>
            </h1>
            <p className="text-silver font-inter text-lg md:text-xl leading-relaxed max-w-lg mb-10">
              The 9-5 is broken. Trading is the escape. Master the markets and reclaim your time with institutional strategies.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/register">
                 <Button className="w-full sm:w-auto shadow-neon">Start Trading</Button>
              </Link>
              <Link to="/dashboard">
                 <Button variant="outline" className="w-full sm:w-auto">View Courses</Button>
              </Link>
            </div>
          </motion.div>

          {/* Right Column: Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-square md:aspect-[4/3] rounded-2xl border-2 border-dashed border-neon-green/30 bg-navy-800/50 backdrop-blur-sm flex items-center justify-center relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-tr from-neon-green/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="text-center p-8">
                <div className="text-6xl mb-4 animate-bounce">🐂 🐻</div>
                <p className="font-mono text-neon-green text-sm uppercase tracking-widest animate-pulse">3D Visual Placeholder</p>
                <p className="text-silver text-xs mt-2">Looping Bull & Bear Animation</p>
              </div>
              
              {/* Fake UI Elements */}
              <div className="absolute top-4 left-4 w-2 h-2 bg-neon-green rounded-full shadow-neon" />
              <div className="absolute top-4 right-4 font-mono text-xs text-neon-green">LIVE_FEED_01</div>
              <div className="absolute bottom-4 left-4 font-mono text-xs text-silver">HEDGE_MODE: ON</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 2: TICKER & EVENTS */}
      <Ticker />
      <EventsRail />

      {/* SECTION 3: ECOSYSTEM MAP (Re-Integrated from About) */}
      <section id="ecosystem" className="relative py-24 px-6 container mx-auto text-center overflow-hidden">
           <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-16 relative z-10"
           >
              <h2 className="text-3xl md:text-5xl font-grotesk font-bold text-white mb-4">THE FX TEEN <span className="text-neon-blue">ECOSYSTEM</span></h2>
              <p className="text-silver text-lg max-w-2xl mx-auto">More than just signals. It's a complete operating system.</p>
           </motion.div>

           <div className="relative h-[600px] w-full max-w-5xl mx-auto mb-20">
              {/* Background Glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-neon-blue/5 rounded-full blur-3xl pointer-events-none" />

              {/* Connecting Lines */}
              <svg className="absolute inset-0 w-full h-full z-0 pointer-events-none overflow-visible">
                <ConnectionLine x1="50%" y1="50%" x2="20%" y2="20%" color="#3B82F6" />
                <ConnectionLine x1="50%" y1="50%" x2="80%" y2="20%" color="#A855F7" />
                <ConnectionLine x1="50%" y1="50%" x2="20%" y2="80%" color="#F97316" />
                <ConnectionLine x1="50%" y1="50%" x2="80%" y2="80%" color="#EC4899" />
              </svg>

              {/* Central Node */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                <motion.div
                    animate={{ scale: [1, 1.05, 1], boxShadow: ['0 0 30px rgba(0,255,163,0.3)', '0 0 60px rgba(0,255,163,0.6)', '0 0 30px rgba(0,255,163,0.3)'] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    className="w-40 h-40 md:w-48 md:h-48 bg-navy-900 border-2 border-neon-green rounded-full flex flex-col items-center justify-center relative group cursor-pointer hover:bg-navy-800 transition-colors z-30"
                >
                     <div className="absolute inset-0 rounded-full border border-neon-green/30 animate-ping opacity-20 pointer-events-none"></div>
                     <div className="text-neon-green font-grotesk font-bold text-2xl md:text-3xl relative z-10">YOU</div>
                </motion.div>
              </div>

              {/* Nodes */}
              <SatelliteNode label="LIVE SIGNALS" description="85% Win Rate" x="20%" y="20%" icon={Zap} color="text-neon-blue border-neon-blue shadow-[0_0_20px_rgba(59,130,246,0.3)]" delay={0} />
              <SatelliteNode label="ACADEMY" description="Master the Skill" x="80%" y="20%" icon={BookOpen} color="text-purple-500 border-purple-500 shadow-[0_0_20px_rgba(168,85,247,0.3)]" delay={1} />
              <SatelliteNode label="24/7 SQUAD" description="Never Trade Alone" x="20%" y="80%" icon={Users} color="text-orange-500 border-orange-500 shadow-[0_0_20px_rgba(249,115,22,0.3)]" delay={2} />
              <SatelliteNode label="MENTORSHIP" description="Weekly Live Calls" x="80%" y="80%" icon={Mic} color="text-pink-500 border-pink-500 shadow-[0_0_20px_rgba(236,72,153,0.3)]" delay={3} />
           </div>
      </section>

      {/* SECTION 4: THE SQUAD (REMASTERED) */}
      <section id="squad" className="py-24 px-6 container mx-auto relative">
           <div className="absolute inset-0 bg-navy-800/20 -skew-y-3 z-0 pointer-events-none transform origin-left" />
           <motion.div 
             initial={{ opacity: 0, y: 50 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true, margin: "-100px" }}
             className="text-center mb-16 relative z-10"
           >
              <h2 className="text-4xl font-grotesk font-bold text-white mb-2">MEET THE <span className="text-neon-green">UNTOUCHABLES</span></h2>
              <p className="text-silver">The minds behind the charts.</p>
           </motion.div>
           
           <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto relative z-10">
              {LEADERSHIP_DATA.map((member, index) => (
                 <motion.div 
                    layoutId={`card-${member.id}`}
                    key={member.id} 
                    onClick={() => setSelectedMember(member)}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                    whileHover={{ y: -10 }}
                    className="group relative h-[450px] rounded-3xl overflow-hidden bg-navy-900 border border-white/5 hover:border-neon-green hover:shadow-neon transition-all duration-300 cursor-pointer"
                  >
                    {/* Visual Layer */}
                    <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-all duration-500">
                       <div className="absolute top-0 left-0 w-full h-1 bg-neon-green/50 shadow-[0_0_20px_#00FFA3] animate-scan" style={{ animationDuration: '3s', animationIterationCount: 'infinite', animationName: 'scan' }}></div>
                       
                       {/* Hologram Placeholder */}
                       <div className="absolute inset-0 flex flex-col items-center justify-end pb-28 opacity-80 group-hover:opacity-100 transition-opacity">
                          <div className="w-full h-3/4 bg-gradient-to-t from-neon-green/10 to-transparent flex items-center justify-center">
                             <span className="text-sm text-neon-green font-mono uppercase tracking-widest animate-pulse border border-neon-green/30 px-4 py-2 rounded">
                                [ {member.visual} ]
                             </span>
                          </div>
                       </div>
                    </div>

                    {/* Content Layer */}
                    <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-navy-900 via-navy-900/95 to-transparent">
                       <div className="inline-block px-2 py-1 mb-2 rounded bg-neon-green/20 border border-neon-green/30 text-[10px] font-bold text-neon-green uppercase tracking-wider">
                          {member.badge}
                       </div>
                       <h3 className="text-3xl font-grotesk font-bold text-white uppercase mb-1 leading-none">{member.name}</h3>
                       <p className="text-silver font-mono text-xs tracking-widest mb-6">{member.role}</p>
                       
                       {/* Smart Social Dock */}
                       <div className="flex items-center gap-3 relative z-20">
                          {member.contact.map((item, i) => (
                             <a 
                               key={i} 
                               href={item.url} 
                               target="_blank" 
                               rel="noopener noreferrer"
                               onClick={(e) => e.stopPropagation()}
                               className="p-3 bg-white/5 rounded-xl border border-white/5 transition-all duration-300 group/icon hover:bg-white/10"
                             >
                                <item.icon 
                                  size={20} 
                                  className={`text-silver transition-all duration-300 ${item.colorClass}`} 
                                />
                             </a>
                          ))}
                          <div className="ml-auto text-xs text-neon-green font-bold flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
                             View Dossier <ArrowRight size={12} className="ml-1" />
                          </div>
                       </div>
                    </div>
                 </motion.div>
              ))}
           </div>
      </section>

      {/* DEEP DIVE MODAL */}
      <AnimatePresence>
        {selectedMember && (
           <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4">
              {/* Backdrop */}
              <motion.div 
                 initial={{ opacity: 0 }} 
                 animate={{ opacity: 1 }} 
                 exit={{ opacity: 0 }}
                 onClick={() => setSelectedMember(null)}
                 className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              />
              
              {/* Modal Card */}
              <motion.div 
                 layoutId={`card-${selectedMember.id}`}
                 className="relative w-full max-w-2xl bg-navy-900 border border-neon-green rounded-3xl overflow-hidden shadow-[0_0_100px_rgba(0,255,163,0.2)]"
              >
                 <button 
                    onClick={() => setSelectedMember(null)}
                    className="absolute top-4 right-4 p-2 bg-black/40 rounded-full text-white hover:text-red-500 transition-colors z-50"
                 >
                    <X size={24} />
                 </button>

                 <div className="grid grid-cols-1 md:grid-cols-2 h-full">
                    {/* Visual Side */}
                    <div className="h-64 md:h-auto bg-navy-800 relative overflow-hidden flex items-center justify-center">
                       <div className="absolute inset-0 bg-gradient-to-tr from-neon-green/20 to-transparent" />
                       <span className="text-neon-green font-mono uppercase tracking-widest border border-neon-green/50 px-6 py-3 rounded animate-pulse bg-black/20 backdrop-blur">
                          {selectedMember.visual}
                       </span>
                    </div>

                    {/* Info Side */}
                    <div className="p-8 md:p-10 flex flex-col justify-center">
                       <div className="mb-6">
                          <div className="inline-block px-3 py-1 mb-3 rounded-full bg-neon-green text-navy-900 text-xs font-bold uppercase tracking-wider">
                             {selectedMember.badge}
                          </div>
                          <h2 className="text-4xl font-grotesk font-bold text-white leading-none mb-2">{selectedMember.name}</h2>
                          <p className="text-silver font-mono text-sm tracking-widest">{selectedMember.role}</p>
                       </div>

                       <div className="mb-8">
                          <p className="text-gray-300 leading-relaxed text-sm border-l-2 border-neon-green/50 pl-4">
                             {selectedMember.bio}
                          </p>
                       </div>

                       <div className="space-y-3">
                          <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-2">Direct Contact Channels</h4>
                          {selectedMember.contact.map((item: any, i: number) => (
                             <a 
                               key={i} 
                               href={item.url} 
                               target="_blank" 
                               rel="noopener noreferrer"
                               className="flex items-center justify-between p-4 bg-navy-800 rounded-xl border border-white/5 hover:border-neon-green/50 transition-all group/link"
                             >
                                <div className="flex items-center gap-4">
                                   <item.icon size={20} className={`text-silver transition-all duration-300 ${item.colorClass.replace('hover:', 'group-hover/link:')}`} />
                                   <span className="text-sm text-white font-medium uppercase">{item.type}</span>
                                </div>
                                <ExternalLink size={16} className="text-silver opacity-50 group-hover/link:opacity-100 group-hover/link:text-neon-green" />
                             </a>
                          ))}
                       </div>
                    </div>
                 </div>
              </motion.div>
           </div>
        )}
      </AnimatePresence>

      {/* SECTION 5: WALL OF WINS (Re-Integrated from Testimonials) */}
      <section id="testimonials" className="py-24 px-6 relative overflow-hidden">
         <motion.div 
           initial={{ opacity: 0, y: 50 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true, margin: "-100px" }}
           transition={{ duration: 0.8 }}
           className="container mx-auto text-center mb-16 relative z-10"
         >
            <h2 className="text-4xl md:text-6xl font-grotesk font-bold text-white mb-6">WALL OF <span className="text-neon-green">WINS</span></h2>
            <p className="text-silver text-xl">Real people. Real profits.</p>
         </motion.div>
         <motion.div 
           initial={{ opacity: 0, y: 50 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true, margin: "-50px" }}
           transition={{ duration: 0.8, delay: 0.2 }}
           className="relative h-[600px] overflow-hidden container mx-auto px-4 md:px-6 z-10"
         >
            <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-navy-900 to-transparent z-10" />
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-navy-900 to-transparent z-10" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 h-full">
               <InfiniteColumn items={[...TESTIMONIALS, ...TESTIMONIALS]} speed={25} />
               <InfiniteColumn items={[...TESTIMONIALS, ...TESTIMONIALS]} speed={35} className="hidden md:flex" />
               <InfiniteColumn items={[...TESTIMONIALS, ...TESTIMONIALS]} speed={30} className="hidden lg:flex" />
            </div>
         </motion.div>
      </section>

      {/* SECTION 6: ACADEMY PREVIEW */}
      <section id="academy" className="py-24 px-6 container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-grotesk font-bold text-white mt-2">
            The <span className="text-neon-green">Academy</span>
          </h2>
          <p className="text-silver mt-4">Preview the curriculum.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {COURSES.slice(0, 3).map((course, index) => (
            <Link to="/dashboard" key={course.id}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-navy-800 rounded-2xl overflow-hidden border border-white/5 hover:border-neon-green/50 transition-all duration-300 group cursor-pointer"
              >
                <div className="relative aspect-video bg-navy-900 overflow-hidden">
                  <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                      <PlayCircle className="text-white opacity-80 group-hover:text-neon-green group-hover:scale-110 transition-all" size={48} />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-grotesk font-bold text-white mb-2">{course.title}</h3>
                  <div className="text-xs text-silver font-mono">{course.duration} • {course.level}</div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </section>

      {/* SECTION 7: PRICING & CTA */}
      <section id="pricing" className="py-24 px-6 bg-[#080B12]">
         <div className="container mx-auto">
           <div className="text-center mb-16">
              <h2 className="text-4xl font-grotesk font-bold text-white uppercase tracking-tight">Simple Pricing</h2>
           </div>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-20">
             {PRICING_PLANS.map((plan, idx) => (
               <motion.div
                 key={idx}
                 whileHover={{ y: -10 }}
                 className={`relative p-8 md:p-12 rounded-3xl border ${plan.highlighted ? 'bg-navy-800 border-neon-green shadow-neon' : 'bg-navy-800/50 border-white/5'}`}
               >
                 <h3 className="text-xl font-inter font-medium text-silver mb-2">{plan.name}</h3>
                 <div className="flex items-baseline mb-8">
                   <span className={`text-4xl font-mono font-bold ${plan.highlighted ? 'text-neon-green' : 'text-white'}`}>{plan.price}</span>
                 </div>
                 
                 {/* Updated Button Logic */}
                 {plan.external ? (
                    <a href={plan.link} target="_blank" rel="noopener noreferrer" className="block w-full">
                       <Button fullWidth variant={plan.highlighted ? 'primary' : 'outline'}>{plan.cta}</Button>
                    </a>
                 ) : (
                    <Link to={plan.link || '#'} className="block w-full">
                       <Button fullWidth variant={plan.highlighted ? 'primary' : 'outline'}>{plan.cta}</Button>
                    </Link>
                 )}
                 
               </motion.div>
             ))}
           </div>
           
           {/* FINAL CTA */}
           <div className="max-w-3xl mx-auto p-12 rounded-3xl bg-gradient-to-b from-navy-800 to-navy-900 border border-white/10 relative overflow-hidden text-center">
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-neon-green/10 blur-[100px] rounded-full pointer-events-none"></div>
             <h2 className="text-3xl md:text-5xl font-grotesk font-bold text-white mb-6 relative z-10">Stop Watching. Start Earning.</h2>
             <Link to="/register" className="relative z-10">
                <Button className="px-10 py-4 text-lg">Join The Squad <ArrowRight className="ml-2" size={20}/></Button>
             </Link>
           </div>
        </div>
      </section>

      <div id="login" className="h-1" />
      
      <style>{`
        @keyframes scan {
          0% { top: 0%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default Home;