import React, { useState, useEffect } from 'react';
import { Menu, X, Flame, Key, LayoutDashboard, Zap } from 'lucide-react';
import { Link, useNavigate, useLocation } from '../constants';
import Button from './Button';
import { AnimatePresence, motion } from 'framer-motion';
import { HypeManager, useHype } from './HypeManager';
import ChatBot from './ChatBot';
import { useEliteInteractions } from '../hooks/useEliteInteractions';

const MotionDiv = motion.div as any;

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { mode } = useHype();
  const navigate = useNavigate();
  const location = useLocation();
  const { triggerHaptic } = useEliteInteractions();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMobileToggle = () => {
    triggerHaptic('light');
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    // RULE 2: THE "Z-INDEX" FORTRESS
    <nav className={`fixed top-0 left-0 right-0 z-[9999] transition-all duration-500 ease-in-out ${
      isScrolled ? 'bg-navy-900/90 backdrop-blur-xl border-b border-white/5 py-5 shadow-lg' : 'bg-transparent py-8'
    }`}>
      <div className="container mx-auto px-6 flex items-center justify-between">
        
        {/* LOGO */}
        <a 
          href="#hero" // Safe Internal Anchor
          onClick={() => triggerHaptic('light')}
          className="text-4xl lg:text-5xl font-grotesk tracking-tighter relative group cursor-pointer hover:scale-105 transition-transform duration-300"
        >
          <GlitchLogo mode={mode} />
        </a>

        {/* CENTER MENU - RULE 1: STRICT INTERNAL ANCHORS */}
        <div className="hidden lg:flex items-center space-x-12">
          <NavLink href="#hero" label="Home" />
          <NavLink href="#academy" label="Academy" />
          <NavLink href="#testimonials" label="Wall of Wins" />
          <NavLink href="#contact" label="Contact" />
        </div>

        {/* RIGHT UTILITIES */}
        <div className="hidden lg:flex items-center space-x-8">
           
           {/* STREAK COUNTER (Restored) */}
           <div className="flex items-center gap-2 bg-black/40 px-4 py-2 rounded-full border border-white/10 group cursor-help relative hover:border-orange-500/50 transition-colors">
              <Flame size={18} className="text-orange-500 fill-orange-500 animate-pulse" />
              <span className="text-base font-bold font-mono text-white">3</span>
           </div>

          {/* DASHBOARD SHORTCUT */}
          <Link 
            to="/dashboard"
            onClick={() => triggerHaptic('medium')}
            className={`flex items-center gap-2 text-sm font-bold uppercase tracking-wide transition-colors ${location.pathname === '/dashboard' ? 'text-neon-green' : 'text-silver hover:text-white'}`}
          >
             <LayoutDashboard size={18} />
             Dashboard
          </Link>

          {/* LOG IN LINK */}
          <a 
            href="#login" // Safe Internal Anchor
            onClick={() => triggerHaptic('light')}
            className="text-sm font-bold uppercase tracking-wide text-silver hover:text-white transition-colors"
          >
             Log In
          </a>

          {/* GET ACCESS BUTTON - RULE 3: PULSE EFFECT */}
          <MotionDiv whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
             <a 
                href="#registration" // Safe Internal Anchor
                onClick={() => triggerHaptic('success')}
                className="px-8 py-3 bg-neon-green text-navy-900 font-grotesk font-bold uppercase tracking-wider rounded-xl shadow-[0_0_20px_rgba(0,255,163,0.4)] hover:shadow-[0_0_40px_rgba(0,255,163,0.6)] transition-all flex items-center justify-center cursor-pointer text-sm animate-pulse"
             >
                GET ACCESS
             </a>
          </MotionDiv>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="lg:hidden text-white hover:text-neon-green transition-colors"
          onClick={handleMobileToggle}
        >
          {mobileMenuOpen ? <X size={32} /> : <Menu size={32} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <MotionDiv
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-navy-800/95 border-t border-white/10 overflow-hidden absolute w-full backdrop-blur-xl shadow-2xl"
          >
            <div className="flex flex-col p-8 space-y-8 text-center">
              <MobileLink href="#hero" label="Home" onClick={() => { setMobileMenuOpen(false); triggerHaptic('light'); }} />
              <MobileLink href="#academy" label="Academy" onClick={() => { setMobileMenuOpen(false); triggerHaptic('light'); }} />
              <MobileLink href="#testimonials" label="Wall of Wins" onClick={() => { setMobileMenuOpen(false); triggerHaptic('light'); }} />
              <MobileLink href="#contact" label="Contact" onClick={() => { setMobileMenuOpen(false); triggerHaptic('light'); }} />
              
              <div className="h-px bg-white/10 w-full my-2"></div>
              
              <a href="#login" className="text-xl font-grotesk text-silver hover:text-white transition-colors" onClick={() => { setMobileMenuOpen(false); triggerHaptic('light'); }}>
                 Log In {/* // Safe Internal Anchor */}
              </a>
              
              {/* Mobile CTA */}
              <a 
                 href="#registration" // Safe Internal Anchor
                 onClick={() => { setMobileMenuOpen(false); triggerHaptic('success'); }}
                 className="w-full block"
              >
                  <Button fullWidth className="shadow-neon animate-pulse py-4 text-lg">GET ACCESS</Button>
              </a>
            </div>
          </MotionDiv>
        )}
      </AnimatePresence>
    </nav>
  );
};

// Helper for Desktop Links
const NavLink: React.FC<{ href: string, label: string }> = ({ href, label }) => {
  const { triggerHaptic } = useEliteInteractions();
  return (
    <a 
      href={href} // Safe Internal Anchor
      onMouseEnter={() => triggerHaptic('light')}
      className="group relative text-sm font-inter uppercase tracking-widest font-bold py-2 text-silver hover:text-white transition-colors"
    >
      {label}
      {/* Glowing Dot Underline Effect */}
      <span className="absolute bottom-0 left-1/2 w-1.5 h-1.5 bg-neon-green rounded-full -translate-x-1/2 shadow-[0_0_10px_#00FFA3] transition-all duration-300 transform scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100"></span>
    </a>
  );
};

// Helper for Mobile Links
const MobileLink: React.FC<{ href: string, label: string, onClick: () => void }> = ({ href, label, onClick }) => (
  <a 
    href={href} // Safe Internal Anchor
    onClick={onClick}
    className="text-2xl font-grotesk font-bold text-white hover:text-neon-green transition-colors tracking-tight"
  >
    {label}
  </a>
);

// Glitch Logo Component
const GlitchLogo = ({ mode }: { mode: 'PASSIVE' | 'CODE_RED' }) => {
   return (
      <div className="relative select-none">
         <span className="relative z-10 flex items-center gap-2">
            <span className="text-white font-black tracking-tighter drop-shadow-md">FX</span>
            <span className="text-neon-green font-black tracking-tighter drop-shadow-[0_0_20px_rgba(0,255,163,0.6)]">TEEN</span>
         </span>
         
         {/* Glitch Layers only visible in CODE RED */}
         {mode === 'CODE_RED' && (
            <>
               <span className="absolute top-0 left-0 text-red-500 opacity-70 animate-pulse translate-x-[2px] font-black tracking-tighter flex gap-2"><span>FX</span><span>TEEN</span></span>
               <span className="absolute top-0 left-0 text-blue-500 opacity-70 animate-pulse -translate-x-[2px] font-black tracking-tighter flex gap-2"><span>FX</span><span>TEEN</span></span>
            </>
         )}
      </div>
   )
}

const Footer = () => {
   const [vaultOpen, setVaultOpen] = useState(false);
   const { setMode } = useHype(); 

   const handleKillSwitch = () => {
     console.log("Kill Switch Activated: Passive Mode Engaged");
     setMode('PASSIVE');
   };

   return (
     <footer id="contact" className="bg-navy-900 border-t border-white/5 py-12 md:py-20 relative z-10 snap-start">
       <div className="container mx-auto px-6">
         <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
           <div>
             <h3 
                className="text-3xl font-grotesk font-bold text-white mb-4 cursor-pointer select-none tracking-tighter"
                onDoubleClick={handleKillSwitch}
                title="Double click to reset UI"
             >
                FX <span className="text-neon-green drop-shadow-[0_0_10px_rgba(0,255,163,0.5)]">TEEN</span>
             </h3>
             <p className="text-silver font-inter text-sm leading-relaxed max-w-xs">
               Empowering the next generation of traders with institutional-grade strategies and a winning mindset.
             </p>
           </div>
           <div>
             <h4 className="text-white font-grotesk font-bold uppercase mb-6">Platform</h4>
             <ul className="space-y-3">
               <li><a href="#academy" className="text-silver hover:text-neon-green transition-colors text-sm">Academy</a></li>
               <li><a href="#ecosystem" className="text-silver hover:text-neon-green transition-colors text-sm">Ecosystem</a></li>
               <li><a href="#testimonials" className="text-silver hover:text-neon-green transition-colors text-sm">Wall of Wins</a></li>
             </ul>
           </div>
           <div>
             <h4 className="text-white font-grotesk font-bold uppercase mb-6">Legal</h4>
             <ul className="space-y-3">
               <li><a href="#" className="text-silver hover:text-neon-green transition-colors text-sm">Terms of Service</a></li>
               <li><a href="#" className="text-silver hover:text-neon-green transition-colors text-sm">Privacy Policy</a></li>
               <li><a href="#" className="text-silver hover:text-neon-green transition-colors text-sm">Risk Disclosure</a></li>
             </ul>
           </div>
         </div>
         <div className="pt-8 border-t border-white/5 text-center md:text-left flex flex-col md:flex-row justify-between items-center">
           <div className="text-left">
             <p className="text-[10px] text-gray-600 font-inter leading-relaxed max-w-2xl">
               RISK DISCLAIMER: Trading foreign exchange on margin carries a high level of risk...
             </p>
             <p className="text-gray-600 text-xs mt-4">© {new Date().getFullYear()} FX TEEN. All rights reserved.</p>
           </div>
           
           <button 
             onClick={() => setVaultOpen(true)}
             className="mt-4 md:mt-0 p-2 text-white/5 hover:text-white/20 transition-colors" 
             aria-label="Secret Vault"
           >
             <Key size={16} />
           </button>
         </div>
       </div>

       <AnimatePresence>
         {vaultOpen && (
            <MotionDiv 
               initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
               className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
               onClick={() => setVaultOpen(false)}
            >
               <MotionDiv 
                  initial={{ scale: 0.8 }} animate={{ scale: 1 }} exit={{ scale: 0.8 }}
                  className="bg-navy-800 border border-neon-green p-8 rounded-2xl max-w-sm w-full text-center relative shadow-[0_0_50px_rgba(0,255,163,0.3)]"
                  onClick={e => e.stopPropagation()}
               >
                  <Key size={48} className="text-neon-green mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-white mb-2">SECRET VAULT UNLOCKED</h3>
                  <p className="text-silver mb-6">You found the easter egg. Here is 10% off your first month of VIP.</p>
                  <div className="bg-black/40 border border-white/10 p-3 rounded mb-6 font-mono text-xl text-neon-green tracking-widest select-all">
                     HUNT3R_10
                  </div>
                  <Button fullWidth onClick={() => setVaultOpen(false)}>Claim Reward</Button>
               </MotionDiv>
            </MotionDiv>
         )}
       </AnimatePresence>
     </footer>
   );
};

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { triggerHaptic } = useEliteInteractions();

  return (
    <HypeManager>
      <div className="min-h-screen flex flex-col bg-navy-900 text-white overflow-x-hidden">
        <Navbar />
        {/* Main Content - Level 2 (Implicit z-auto or z-10) */}
        <main className="flex-grow pt-24 md:pt-32 relative z-10">
          {children}
        </main>
        
        {/* THE "THUMB ZONE" NAVIGATION - FAB */}
        <Link 
          to="/register" 
          onClick={() => triggerHaptic('success')}
          className="lg:hidden fixed bottom-6 right-6 z-50 w-16 h-16 bg-neon-green text-navy-900 rounded-full shadow-[0_0_20px_rgba(0,255,163,0.6)] flex items-center justify-center animate-pulse hover:scale-110 transition-transform"
        >
          <Zap size={28} fill="currentColor" />
        </Link>

        <Footer />
        <ChatBot />
      </div>
    </HypeManager>
  );
};

export default Layout;