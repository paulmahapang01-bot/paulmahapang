import React, { useState, useEffect, createContext, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift, X, AlertTriangle } from 'lucide-react';
import Button from './Button';

const MotionDiv = motion.div as any;
const MotionButton = motion.button as any;

// 1. Context to expose control if needed
type AdMode = 'PASSIVE' | 'CODE_RED';

interface HypeContextType {
  mode: AdMode;
  setMode: (mode: AdMode) => void;
}

const HypeContext = createContext<HypeContextType>({ mode: 'PASSIVE', setMode: () => {} });

export const useHype = () => useContext(HypeContext);

// 2. Main Manager Component
export const HypeManager: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mode, setMode] = useState<AdMode>('PASSIVE');

  // Dev toggle: shift + H to toggle mode
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.shiftKey && e.key === 'H') {
        setMode(prev => prev === 'PASSIVE' ? 'CODE_RED' : 'PASSIVE');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <HypeContext.Provider value={{ mode, setMode }}>
      {/* PROTOCOL 3: SYSTEM STATUS PANEL (DEBUG TOGGLE) */}
      <div 
        onClick={() => setMode(mode === 'PASSIVE' ? 'CODE_RED' : 'PASSIVE')}
        className="fixed bottom-4 left-4 z-[10000] cursor-pointer group"
        title={`System Status: ${mode}`}
      >
        <div className={`w-3 h-3 rounded-full transition-all duration-300 ${mode === 'PASSIVE' ? 'bg-green-500 shadow-[0_0_10px_#22c55e]' : 'bg-red-500 shadow-[0_0_10px_#ef4444] animate-pulse'}`} />
        <span className="absolute left-full ml-2 top-1/2 -translate-y-1/2 text-[10px] font-mono text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap bg-black/50 px-2 py-1 rounded backdrop-blur">
          DEV_MODE: {mode}
        </span>
      </div>

      {/* PASSIVE MODE ELEMENTS */}
      <AnimatePresence>
        {mode === 'PASSIVE' && <PassiveElements />}
      </AnimatePresence>

      {/* CODE RED MODE ELEMENTS */}
      <AnimatePresence>
        {mode === 'CODE_RED' && <CodeRedOverlay />}
      </AnimatePresence>

      {/* Main App Content */}
      <div className={mode === 'CODE_RED' ? 'brightness-75 transition-all duration-1000' : 'transition-all duration-1000'}>
         {children}
      </div>

    </HypeContext.Provider>
  );
};

// 3. Passive Mode Components
const PassiveElements = () => {
   const [giftOpen, setGiftOpen] = useState(false);

   return (
      <>
         {/* Top Ticker - Level 4 equivalent for passive */}
         <MotionDiv 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-black border-b border-neon-green/20 py-1 overflow-hidden relative z-[60]"
         >
            <div className="flex whitespace-nowrap animate-marquee">
               <span className="text-[10px] font-mono text-neon-green mx-4 uppercase tracking-wider">
                  BREAKING: CPI DATA RELEASED - MARKET VOLATILITY EXPECTED // NEW ACADEMY MODULE: "THE SNIPER ENTRY" DROPS FRIDAY // 
                  BREAKING: CPI DATA RELEASED - MARKET VOLATILITY EXPECTED // NEW ACADEMY MODULE: "THE SNIPER ENTRY" DROPS FRIDAY // 
               </span>
            </div>
         </MotionDiv>

         {/* Floating Gift - Level 4 - MOVED TO BOTTOM-24 to make room for ChatBot */}
         <MotionDiv 
            className="fixed bottom-24 right-6 z-50"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
         >
            <AnimatePresence>
               {giftOpen && (
                  <MotionDiv 
                     initial={{ opacity: 0, y: 10, scale: 0.9 }}
                     animate={{ opacity: 1, y: 0, scale: 1 }}
                     exit={{ opacity: 0, y: 10, scale: 0.9 }}
                     className="absolute bottom-16 right-0 w-72 bg-navy-800 border border-neon-green rounded-xl p-6 shadow-[0_0_30px_rgba(0,255,163,0.2)] mb-2 origin-bottom-right"
                  >
                     <button onClick={() => setGiftOpen(false)} className="absolute top-2 right-2 text-silver hover:text-white"><X size={14}/></button>
                     <h4 className="font-bold text-white mb-2">Claim Your Free PDF</h4>
                     <p className="text-xs text-silver mb-4">"The 3-Candle Reversal Strategy" sent to your inbox.</p>
                     <input type="email" placeholder="Email Address" className="w-full bg-navy-900 border border-white/10 rounded px-3 py-2 text-xs text-white mb-2" />
                     <Button fullWidth className="py-2 text-xs">Unlock Now</Button>
                  </MotionDiv>
               )}
            </AnimatePresence>
            
            <button 
               onClick={() => setGiftOpen(!giftOpen)}
               className="w-12 h-12 rounded-full bg-navy-800 border border-neon-green text-neon-green flex items-center justify-center shadow-neon hover:bg-neon-green hover:text-navy-900 transition-all hover:scale-110"
            >
               {giftOpen ? <X size={20} /> : <Gift size={20} />}
            </button>
         </MotionDiv>
      </>
   );
};

// 4. Code Red Mode Components
const CodeRedOverlay = () => {
   return (
      <>
         {/* PROTOCOL 2: THE GHOST LAYER
             Level 3: The Takeover (Background Dim & Effects) 
             CRITICAL: pointer-events-none ensures clicks pass through to content if not blocked by higher layers.
             z-50 ensures it's above content but BELOW navigation (z-9999).
         */}
         <MotionDiv 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 pointer-events-none mix-blend-overlay overflow-hidden"
         >
            {/* Rotating Warning Light Effect */}
            <MotionDiv 
               animate={{ rotate: 360 }}
               transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
               className="w-[200vw] h-[200vw] absolute top-[-50vw] left-[-50vw] bg-[conic-gradient(from_0deg_at_50%_50%,rgba(255,0,0,0)_0deg,rgba(255,0,0,0.15)_60deg,rgba(255,0,0,0)_90deg)] opacity-50"
            />
         </MotionDiv>

         {/* Level 4: Interactive Popups (Sticky Bar) 
             z-51 ensures it's above the red background.
             pointer-events-auto ensures buttons inside are clickable.
         */}
         <MotionDiv 
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            className="fixed bottom-0 left-0 right-0 bg-red-600 z-[51] py-3 px-6 shadow-[0_-10px_40px_rgba(255,0,0,0.4)] border-t-2 border-white/20 pointer-events-auto"
         >
            <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
               <div className="flex items-center gap-3 mb-2 md:mb-0">
                  <AlertTriangle className="text-white animate-pulse" fill="white" stroke="red" />
                  <span className="font-black italic uppercase text-white tracking-widest text-lg md:text-xl">
                     DOORS CLOSING: NFP SNIPER EVENT
                  </span>
               </div>
               
               <div className="flex items-center gap-6">
                  <div className="font-mono text-2xl font-bold text-white bg-black/20 px-3 py-1 rounded">
                     04:22:10
                  </div>
                  <Button className="bg-white text-red-600 hover:bg-gray-100 shadow-none border-none py-2 px-6">
                     CLAIM SPOT
                  </Button>
               </div>
            </div>
         </MotionDiv>
      </>
   );
};