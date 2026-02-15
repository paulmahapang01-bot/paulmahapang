import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Send, X, Bot, Sparkles, ChevronDown } from 'lucide-react';
import { GoogleGenAI, Chat } from "@google/genai";

interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'init',
      role: 'model',
      text: "Market open. I'm the FX Teen AI. Ready to analyze structure, psychology, or risk?",
      timestamp: new Date()
    }
  ]);
  const [isThinking, setIsThinking] = useState(false);
  const chatRef = useRef<Chat | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isThinking, isOpen]);

  // Initialize Gemini Chat
  useEffect(() => {
     try {
         const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
         chatRef.current = ai.chats.create({
             model: 'gemini-3-pro-preview',
             config: {
                 systemInstruction: `You are the FX TEEN AI, an elite trading assistant.
                 
                 Persona:
                 - Tone: Professional, direct, "New Elite" mindset.
                 - Vocabulary: Use institutional trading terms (Order blocks, FVG, liquidity, bias).
                 - Strict Rule: NEVER give financial advice. Do not say "Buy EURUSD". Instead say "EURUSD is approaching a demand zone...".
                 - Emphasize: Risk management and psychology.
                 
                 Formatting:
                 - Keep it concise.
                 - Use bullet points for steps.`,
             }
         });
     } catch (error) {
         console.error("Failed to initialize AI", error);
     }
  }, []);

  const handleSend = async (e?: React.FormEvent) => {
      e?.preventDefault();
      if (!input.trim() || !chatRef.current) return;

      const userText = input.trim();
      setInput('');
      
      const userMsg: Message = {
          id: Date.now().toString(),
          role: 'user',
          text: userText,
          timestamp: new Date()
      };

      setMessages(prev => [...prev, userMsg]);
      setIsThinking(true);

      try {
          const result = await chatRef.current.sendMessage({ message: userText });
          const responseText = result.text;
          
          const botMsg: Message = {
              id: (Date.now() + 1).toString(),
              role: 'model',
              text: responseText,
              timestamp: new Date()
          };
          setMessages(prev => [...prev, botMsg]);
      } catch (error) {
          console.error("Error generating response", error);
          setMessages(prev => [...prev, {
              id: Date.now().toString(),
              role: 'model',
              text: "Signal interference. Please retry.",
              timestamp: new Date()
          }]);
      } finally {
          setIsThinking(false);
      }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end pointer-events-none">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="pointer-events-auto mb-4 w-[350px] md:w-[400px] max-h-[600px] h-[70vh] bg-navy-900 border border-neon-green/30 rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.5)] flex flex-col overflow-hidden backdrop-blur-xl"
          >
            {/* Header */}
            <div className="p-4 border-b border-white/10 bg-navy-800 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-neon-green/10 flex items-center justify-center border border-neon-green/50">
                   <Bot size={16} className="text-neon-green" />
                </div>
                <div>
                   <h3 className="text-white font-bold font-grotesk text-sm">FX TEEN <span className="text-neon-green">AI</span></h3>
                   <div className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-neon-green animate-pulse" />
                      <span className="text-[10px] text-silver font-mono">ONLINE</span>
                   </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-silver hover:text-white transition-colors p-1"
              >
                <ChevronDown size={20} />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth">
              {messages.map((msg) => (
                <div 
                  key={msg.id} 
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                      msg.role === 'user' 
                        ? 'bg-neon-green text-navy-900 font-medium rounded-br-none shadow-neon' 
                        : 'bg-navy-800 text-silver border border-white/10 rounded-bl-none'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              
              {isThinking && (
                <div className="flex justify-start">
                  <div className="bg-navy-800 border border-white/10 p-3 rounded-2xl rounded-bl-none flex items-center gap-2">
                    <Sparkles size={14} className="text-neon-green animate-spin-slow" />
                    <span className="text-xs text-silver font-mono animate-pulse">ANALYZING...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <form onSubmit={handleSend} className="p-4 bg-navy-800 border-t border-white/10 shrink-0 flex gap-2">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about market structure..."
                className="flex-1 bg-navy-900 border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-neon-green transition-colors"
              />
              <button 
                type="submit"
                disabled={!input.trim() || isThinking}
                className="bg-neon-green text-navy-900 p-2 rounded-xl hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send size={18} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="pointer-events-auto w-14 h-14 rounded-full bg-neon-green text-navy-900 flex items-center justify-center shadow-[0_0_20px_rgba(0,255,163,0.4)] hover:shadow-[0_0_30px_rgba(0,255,163,0.6)] transition-all z-[100]"
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} fill="currentColor" />}
      </motion.button>
    </div>
  );
};

export default ChatBot;