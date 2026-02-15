import React from 'react';
import { motion } from 'framer-motion';
import { TICKER_DATA } from '../constants';

const Ticker = () => {
  return (
    <div className="w-full bg-[#05070A] py-3 border-y border-white/5 overflow-hidden flex relative z-10">
      <div className="absolute top-0 bottom-0 left-0 w-20 bg-gradient-to-r from-[#05070A] to-transparent z-10" />
      <div className="absolute top-0 bottom-0 right-0 w-20 bg-gradient-to-l from-[#05070A] to-transparent z-10" />
      
      <motion.div 
        className="flex whitespace-nowrap"
        animate={{ x: [0, -1000] }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: 30, // Adjust speed
        }}
      >
        {/* Repeat list multiple times to ensure smooth loop without gaps */}
        {[...Array(6)].map((_, i) => (
          <div key={i} className="flex">
            {TICKER_DATA.map((item, index) => (
              <div key={`${i}-${index}`} className="flex items-center mx-8 font-mono text-sm tracking-tight">
                <span className="text-white font-bold mr-3">{item.symbol}</span>
                <span className={item.change === 'up' ? 'text-neon-green' : 'text-alert'}>
                  {item.change === 'up' ? '▲' : '▼'} {item.price}
                </span>
              </div>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default Ticker;