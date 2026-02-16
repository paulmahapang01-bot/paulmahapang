import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, Flame, ArrowRight, Target, Phone, Mail, Instagram } from 'lucide-react';
import { Link as RouterLink } from '../constants'; 

// --- 1. HARD-CODED DATA (The "Untouchables" Restoration) ---
const TEAM_MEMBERS = [
  {
    id: 1,
    name: "Flurry",
    role: "FX TEEN FOUNDER",
    image: "/founder-flurry.jpg", 
    whatsapp: "https://wa.me/27733760734",
    instagram: "https://instagram.com/alwaysflyflurry",
    email: "mailto:malgasabubakr@icloud.com"
  },
  {
    id: 2,
    name: "Oratile James Raqashile",
    role: "OFFICIAL REPRESENTATIVE",
    image: "/rep-oratile.jpg",
    whatsapp: "https://wa.me/27655017977",
    instagram: "https://instagram.com/o._r_james",
    email: "mailto:orjamestrading@gmail.com"
  },
  {
    id: 3,
    name: "Nkosi Nomandla",
    role: "OFFICIAL REPRESENTATIVE",
    image: "/rep-nkosi.jpg",
    whatsapp: "https://wa.me/27735855354",
    email: "mailto:snomandlha@icloud.com"
  },
  {
    id: 4,
    name: "Bongani Makhabani",
    role: "OFFICIAL REPRESENTATIVE",
    image: "/rep-bongani.jpg",
    whatsapp: "https://wa.me/27610968415",
    email: "mailto:bonganiforbes4@gmail.com",
    instagram: "https://web.whatsapp.com/"
  }
];

// --- UTILITIES ---
const triggerHaptic = () => {
  if (typeof navigator !== 'undefined' && navigator.vibrate) {
    try {
      navigator.vibrate(10);
    } catch (e) {
      // Ignore on unsupported devices
    }
  }
};

const MagneticButton = ({ children, className = "", onClick }: any) => {
    return (
        <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClick}
            className={`transition-transform duration-200 inline-block ${className}`}
        >
            {children}
        </motion.button>
    );
};

// --- COMPONENTS ---

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`fixed top-0 left-0 right-0 z-[9999] transition-all duration-300 ${isScrolled ? 'bg-[#0B0F19]/90 backdrop-blur-xl border-b border-white/5 py-4 shadow-lg' : 'bg-transparent py-6'}`}>
            <div className="container mx-auto px-6 flex items-center justify-between">
                <a href="#hero" className="text-3xl font-bold font-sans tracking-tighter text-white" onClick={triggerHaptic}>
                    FX <span className="text-[#00FFA3]">TEEN</span>
                </a>

                {/* Desktop Menu */}
                <div className="hidden lg:flex items-center space-x-8">
                    <a href="#hero" className="text-sm font-bold text-gray-400 hover:text-white uppercase tracking-widest transition-colors">Home</a>
                    <a href="#vision" className="text-sm font-bold text-gray-400 hover:text-white uppercase tracking-widest transition-colors">Vision</a>
                    <a href="#squad" className="text-sm font-bold text-gray-400 hover:text-white uppercase tracking-widest transition-colors">The Squad</a>
                    <a href="#contact" className="text-sm font-bold text-gray-400 hover:text-white uppercase tracking-widest transition-colors">Contact</a>
                </div>

                <div className="hidden lg:flex items-center space-x-6">
                    <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10">
                        <Flame size={16} className="text-orange-500 animate-pulse" />
                        <span className="text-xs font-mono font-bold text-white">STREAK: 3</span>
                    </div>
                    
                    <MagneticButton onClick={() => triggerHaptic()}>
                        <RouterLink to="/register" className="px-6 py-2 bg-[#00FFA3] text-black font-bold uppercase tracking-wider rounded-lg shadow-[0_0_20px_rgba(0,255,163,0.4)] hover:shadow-[0_0_30px_rgba(0,255,163,0.6)] text-sm flex items-center justify-center">
                            GET ACCESS
                        </RouterLink>
                    </MagneticButton>
                </div>

                {/* Mobile Toggle */}
                <button className="lg:hidden text-white hover:text-[#00FFA3] transition-colors" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                    {mobileMenuOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="absolute top-full left-0 w-full bg-[#0B0F19] border-b border-white/10 p-6 flex flex-col gap-4 lg:hidden shadow-2xl animate-in slide-in-from-top-5">
                    <a href="#hero" onClick={() => setMobileMenuOpen(false)} className="text-lg font-bold text-white p-2">Home</a>
                    <a href="#vision" onClick={() => setMobileMenuOpen(false)} className="text-lg font-bold text-white p-2">Vision</a>
                    <a href="#squad" onClick={() => setMobileMenuOpen(false)} className="text-lg font-bold text-white p-2">The Squad</a>
                    <RouterLink to="/register" onClick={() => setMobileMenuOpen(false)} className="w-full py-4 bg-[#00FFA3] text-black font-bold text-center rounded-xl shadow-[0_0_20px_rgba(0,255,163,0.3)] mt-4">
                        GET ACCESS
                    </RouterLink>
                </div>
            )}
        </nav>
    );
};

const HeroSection = () => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center container mx-auto px-6">
            <div className="space-y-8 pt-10 lg:pt-0">
                <div className="inline-block px-3 py-1 rounded-full border border-[#00FFA3]/30 bg-[#00FFA3]/5 text-[#00FFA3] text-xs font-mono uppercase tracking-widest">
                    Join The New Elite
                </div>
                <h1 className="text-5xl md:text-7xl font-bold leading-tight tracking-tighter text-white">
                    YOUR FREEDOM <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">STARTS HERE.</span>
                </h1>
                <p className="text-gray-400 text-lg max-w-lg leading-relaxed">
                    The 9-5 is broken. Trading is the escape. Master the markets and reclaim your time with institutional strategies.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                    <MagneticButton onClick={triggerHaptic}>
                        <RouterLink to="/register" className="px-8 py-4 bg-[#00FFA3] text-black font-bold uppercase tracking-wider rounded-xl shadow-[0_0_20px_rgba(0,255,163,0.4)] flex items-center justify-center gap-2 w-full sm:w-auto">
                            Start Trading <ArrowRight size={20} />
                        </RouterLink>
                    </MagneticButton>
                    <MagneticButton>
                        <RouterLink to="/dashboard" className="px-8 py-4 border border-white/10 hover:bg-white/5 text-white font-bold uppercase tracking-wider rounded-xl transition-colors w-full sm:w-auto flex items-center justify-center">
                            View Courses
                        </RouterLink>
                    </MagneticButton>
                </div>
            </div>

            {/* Visual Placeholder (Neon Gradient Box) */}
            <div className="hero-visual-placeholder relative aspect-square md:aspect-[4/3] rounded-3xl overflow-hidden border border-white/10 bg-[#111625] flex items-center justify-center group mt-8 lg:mt-0">
                <div className="absolute inset-0 bg-gradient-to-tr from-[#00FFA3]/10 via-transparent to-blue-500/10 opacity-50 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="relative z-10 text-center space-y-4">
                    <div className="text-6xl animate-bounce">🚀</div>
                    <div className="text-[#00FFA3] font-mono text-sm uppercase tracking-widest animate-pulse">
                        SYSTEM ONLINE
                    </div>
                </div>
                {/* Decorative Grid */}
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 mix-blend-overlay"></div>
            </div>
        </div>
    );
};

const VisionSection = () => {
    // Particle Logic
    const [particles, setParticles] = useState<any[]>([]);
    
    useEffect(() => {
        const isMobile = window.innerWidth < 768;
        const count = isMobile ? 15 : 40;
        const newParticles = Array.from({ length: count }).map((_, i) => ({
            id: i,
            left: Math.random() * 100,
            top: Math.random() * 100,
            size: Math.random() * 3 + 1,
            duration: Math.random() * 5 + 5
        }));
        setParticles(newParticles);
    }, []);

    return (
        <div className="container mx-auto px-6 relative z-10">
            {/* Particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10 h-full w-full">
                {particles.map((p) => (
                    <motion.div
                        key={p.id}
                        className="absolute bg-[#00FFA3]/20 rounded-full blur-[1px]"
                        style={{
                            left: `${p.left}%`,
                            top: `${p.top}%`,
                            width: p.size,
                            height: p.size
                        }}
                        animate={{ y: [0, -100, 0], opacity: [0, 0.5, 0] }}
                        transition={{ duration: p.duration, repeat: Infinity, ease: "linear" }}
                    />
                ))}
            </div>

            <div className="text-center max-w-3xl mx-auto mb-16">
                 <div className="inline-flex items-center justify-center p-3 mb-6 bg-[#00FFA3]/10 rounded-full text-[#00FFA3]">
                    <Target size={24} />
                 </div>
                 <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">THE <span className="text-[#00FFA3]">VISION</span></h2>
                 <p className="text-gray-400 text-lg">
                    We are building a global ecosystem of self-sufficient traders who reject the 9-5 matrix. Institutional strategies, automated by discipline.
                 </p>
            </div>
        </div>
    );
};

const TheSquad = () => {
    return (
        <div className="container mx-auto px-6">
            <div className="text-center mb-16">
                <h2 className="text-4xl font-bold mb-4 text-white">MEET THE <span className="text-[#00FFA3]">UNTOUCHABLES</span></h2>
                <p className="text-gray-400">The leadership defining the new standard.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {TEAM_MEMBERS.map((member) => (
                    <div key={member.id} className="group relative bg-[#111625] rounded-3xl overflow-hidden border border-white/5 hover:border-[#00FFA3] transition-all duration-300">
                        {/* Image / Skeleton Area */}
                        <div className="aspect-[3/4] bg-gray-900 relative overflow-hidden">
                             {/* Skeleton Pulse (Always behind image, visible if image fails or loading) */}
                             <div className="absolute inset-0 bg-gray-800 animate-pulse z-0" />
                             
                             <img 
                                src={member.image} 
                                alt={member.name}
                                className="w-full h-full object-cover relative z-10 hover:scale-110 transition-transform duration-500"
                                onError={(e) => {
                                    (e.target as HTMLImageElement).style.display = 'none'; // Hide broken image to show skeleton
                                }}
                             />
                             
                             <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19] via-transparent to-transparent z-20" />
                        </div>

                        {/* Content */}
                        <div className="absolute bottom-0 left-0 right-0 p-6 z-30">
                            <div className="inline-block px-2 py-1 bg-[#00FFA3]/10 text-[#00FFA3] text-[10px] font-bold uppercase rounded mb-2">
                                {member.role}
                            </div>
                            <h3 className="text-xl font-bold text-white uppercase leading-none mb-4">{member.name}</h3>
                            
                            {/* Social Dock */}
                            <div className="flex gap-2">
                                {member.whatsapp && (
                                    <a href={member.whatsapp} target="_blank" rel="noreferrer" className="p-3 bg-white/10 rounded-xl hover:bg-[#25D366] hover:text-white transition-colors">
                                        <Phone size={18} className="text-gray-300 hover:text-white" />
                                    </a>
                                )}
                                {member.instagram && (
                                    <a href={member.instagram} target="_blank" rel="noreferrer" className="p-3 bg-white/10 rounded-xl hover:bg-[#E1306C] hover:text-white transition-colors">
                                        <Instagram size={18} className="text-gray-300 hover:text-white" />
                                    </a>
                                )}
                                {member.email && (
                                    <a href={member.email} className="p-3 bg-white/10 rounded-xl hover:bg-white hover:text-black transition-colors">
                                        <Mail size={18} className="text-gray-300 hover:text-black" />
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// --- MAIN PAGE COMPONENT (The Grand Monolith) ---
const Home = () => {
  return (
    <div className="bg-[#0B0F19] min-h-screen text-white overflow-x-hidden font-sans selection:bg-[#00FFA3] selection:text-black">
      <Navbar />
      
      <main className="relative z-10">
        <section id="hero" className="min-h-screen flex items-center pt-20">
           <HeroSection />
        </section>
  
        <section id="vision" className="py-20 relative">
           <VisionSection />
        </section>
  
        <section id="squad" className="py-20 px-6">
           <TheSquad />
        </section>
      </main>
  
      {/* The 'Code Red' Overlay (Hidden by default, structure ready) */}
      <div className="fixed inset-0 pointer-events-none z-0 bg-gradient-to-b from-transparent to-[#00FFA3]/5 opacity-20" />
    </div>
  );
};

export default Home;