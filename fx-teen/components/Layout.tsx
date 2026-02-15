import React, { useState, useEffect } from 'react';
import { Menu, X, Flame, Key, LayoutDashboard } from 'lucide-react';
import { NAV_LINKS } from '../constants';
import Button from './Button';
import { AnimatePresence, motion } from 'framer-motion';
import { HypeManager, useHype } from './HypeManager';
import ChatBot from './ChatBot';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { mode } = useHype(); // Consume Ad Mode to glitch logo
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // INTELLIGENT NAVIGATION HANDLER
  // Handles both scroll anchors (#section) and page routes (/path)
  const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    
    if (path.startsWith('#')) {
      // If we are not on home, go home first then scroll
      if (location.pathname !== '/' && path !== '#contact') {
         navigate('/');
         setTimeout(() => {
            const element = document.querySelector(path);
            if (element) element.scrollIntoView({ behavior: 'smooth' });
         }, 100);
      } else {
         const element = document.querySelector(path);
         if (element) element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate(path);
      window.scrollTo(0, 0);
    }
    setMobileMenuOpen(false);
  };

  return (
    // Z-INDEX SUPREMACY: 9999
    <nav className={`fixed top-0 left-0 right-0 z-[9999] transition-all duration-300 ${
      isScrolled ? 'bg-navy-900/80 backdrop-blur-xl border-b border-white/5 py-4' : 'bg-transparent py-6'
    }`}>
      <div className="container mx-auto px-6 flex items-center justify-between">
        
        {/* 1. LEFT: LOGO */}
        <Link 
          to="/" 
          onClick={() => window.scrollTo(0, 0)}
          className="text-2xl font-grotesk tracking-tighter relative group cursor-pointer"
        >
          <GlitchLogo mode={mode} />
        </Link>

        {/* 2. CENTER: THE MENU (Hidden on Mobile) */}
        <div className="hidden md:flex items-center space-x-8">
          {NAV_LINKS.map((link) => (
             <NavLink 
               key={link.label} 
               href={link.path} 
               label={link.label} 
               onClick={handleNavigation} 
               isActive={location.pathname === link.path}
             />
          ))}
        </div>

        {/* 3. RIGHT: THE UTILITIES */}
        <div className="hidden md:flex items-center space-x-6">
           
           {/* STREAK COUNTER */}
           <div className="flex items-center gap-2 bg-black/40 px-4 py-2 rounded-full border border-white/10 group cursor-help relative hover:border-orange-500/50 transition-colors">
              <Flame size={16} className="text-orange-500 fill-orange-500 animate-pulse" />
              <span className="text-sm font-bold font-mono text-white">3</span>
              
              {/* Tooltip */}
              <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 w-40 bg-black border border-white/20 p-2 rounded text-[10px] text-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                 Day 3 Streak - Keep it up!
              </div>
           </div>

          {/* DASHBOARD LINK (New Requirement) */}
          <Link 
            to="/dashboard"
            className={`flex items-center gap-2 text-sm font-bold uppercase tracking-wide transition-colors ${location.pathname === '/dashboard' ? 'text-neon-green' : 'text-silver hover:text-white'}`}
          >
             <LayoutDashboard size={16} />
             Dashboard
          </Link>

          {/* CTA BUTTON */}
          <motion.div whileHover={{ scale: 1.05 }}>
             <Link 
                to="/register"
                className="px-6 py-3 bg-neon-green text-navy-900 font-grotesk font-bold uppercase tracking-wider rounded-xl shadow-neon hover:shadow-[0_0_30px_rgba(0,255,163,0.6)] transition-all flex items-center justify-center cursor-pointer"
             >
                GET ACCESS
             </Link>
          </motion.div>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-navy-800 border-t border-white/10 overflow-hidden absolute w-full backdrop-blur-xl"
          >
            <div className="flex flex-col p-6 space-y-6 text-center">
              {NAV_LINKS.map((link) => (
                 <MobileLink key={link.label} href={link.path} label={link.label} onClick={handleNavigation} />
              ))}
              
              <div className="h-px bg-white/10 w-full my-2"></div>
              
              <Link to="/dashboard" className="text-lg font-grotesk text-white hover:text-neon-green transition-colors" onClick={() => setMobileMenuOpen(false)}>
                 Dashboard
              </Link>
              <Link to="/login" className="text-lg font-grotesk text-silver hover:text-white transition-colors" onClick={() => setMobileMenuOpen(false)}>
                 Log In
              </Link>
              
              {/* Mobile CTA */}
              <Link 
                 to="/register"
                 onClick={() => setMobileMenuOpen(false)}
                 className="w-full"
              >
                  <Button fullWidth className="shadow-neon animate-pulse">GET ACCESS</Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

// Helper for Desktop Links with Hover State
const NavLink = ({ href, label, onClick, isActive }: { href: string, label: string, onClick: any, isActive: boolean }) => (
  <a 
    href={href} 
    onClick={(e) => onClick(e, href)}
    className={`group relative text-sm font-inter uppercase tracking-wide font-medium py-2 transition-colors ${isActive ? 'text-neon-green' : 'text-silver hover:text-neon-green'}`}
  >
    {label}
    {/* Glowing Dot Underline Effect */}
    <span className={`absolute bottom-0 left-1/2 w-1 h-1 bg-neon-green rounded-full -translate-x-1/2 shadow-[0_0_10px_#00FFA3] transition-all duration-300 transform ${isActive ? 'scale-100 opacity-100' : 'scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100'}`}></span>
  </a>
);

// Helper for Mobile Links
const MobileLink = ({ href, label, onClick }: { href: string, label: string, onClick: any }) => (
  <a 
    href={href}
    onClick={(e) => onClick(e, href)}
    className="text-lg font-grotesk text-white hover:text-neon-green transition-colors"
  >
    {label}
  </a>
);

// Glitch Logo Component
const GlitchLogo = ({ mode }: { mode: 'PASSIVE' | 'CODE_RED' }) => {
   return (
      <div className="relative">
         <span className="relative z-10 flex">
            <span className="text-white font-bold">FX</span>
            <span className="text-neon-green font-normal">TEEN</span>
         </span>
         
         {/* Glitch Layers only visible in CODE RED */}
         {mode === 'CODE_RED' && (
            <>
               <span className="absolute top-0 left-0 text-red-500 opacity-70 animate-pulse translate-x-[2px]">FX TEEN</span>
               <span className="absolute top-0 left-0 text-blue-500 opacity-70 animate-pulse -translate-x-[2px]">FX TEEN</span>
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
     <footer id="contact" className="bg-navy-900 border-t border-white/5 py-12 md:py-20 relative z-10">
       <div className="container mx-auto px-6">
         <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
           <div>
             <h3 
                className="text-2xl font-grotesk font-bold text-white mb-4 cursor-pointer select-none"
                onDoubleClick={handleKillSwitch}
                title="Double click to reset UI"
             >
                FX <span className="text-neon-green">TEEN</span>
             </h3>
             <p className="text-silver font-inter text-sm leading-relaxed max-w-xs">
               Empowering the next generation of traders with institutional-grade strategies and a winning mindset.
             </p>
           </div>
           <div>
             <h4 className="text-white font-grotesk font-bold uppercase mb-6">Platform</h4>
             <ul className="space-y-3">
               <li><Link to="/dashboard" className="text-silver hover:text-neon-green transition-colors text-sm">Course Interface</Link></li>
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
            <motion.div 
               initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
               className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
               onClick={() => setVaultOpen(false)}
            >
               <motion.div 
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
               </motion.div>
            </motion.div>
         )}
       </AnimatePresence>
     </footer>
   );
};

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <HypeManager>
      <div className="min-h-screen flex flex-col bg-navy-900 text-white overflow-x-hidden">
        <Navbar />
        {/* Main Content - Level 2 (Implicit z-auto or z-10) */}
        <main className="flex-grow pt-24 md:pt-32 relative z-10">
          {children}
        </main>
        <Footer />
        <ChatBot />
      </div>
    </HypeManager>
  );
};

export default Layout;