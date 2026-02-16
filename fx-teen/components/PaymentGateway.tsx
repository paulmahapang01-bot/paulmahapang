import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CreditCard, Lock, ShieldCheck, Smartphone, Check, Wifi, ScanFace } from 'lucide-react';
import Button from './Button';

const MotionDiv = motion.div as any;

// Custom Apple Icon SVG
const AppleIcon = ({ size = 24, className = "" }: { size?: number, className?: string }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path d="M17.0075 17.5316C16.4866 18.2868 15.9135 19.0182 15.071 19.0346C14.2486 19.051 13.9781 18.5529 13.0232 18.5529C12.0683 18.5529 11.7801 19.0346 10.9886 19.051C10.1741 19.0674 9.5391 18.269 9.0135 17.5056C7.942 15.9529 7.1265 13.1116 8.223 11.2066C8.766 10.2581 9.7386 9.6622 10.8166 9.6455C11.6066 9.6288 12.1591 10.1743 12.6451 10.1743C13.1311 10.1743 13.8726 9.5785 14.7866 9.6121C15.1246 9.6288 16.0716 9.7378 16.6851 10.6356C16.6356 10.6691 15.0166 11.6091 15.0331 13.4976C15.0496 15.3861 16.5946 16.4098 16.6521 16.4516C16.6111 16.5776 16.1576 17.8831 15.7296 18.5209L17.0075 17.5316ZM14.5136 8.1821C14.8841 7.7286 15.1311 7.0991 15.0651 6.4696C14.5306 6.4948 13.8881 6.8222 13.5011 7.2838C13.1631 7.6783 12.8666 8.3331 12.9406 8.9461C13.5336 8.9878 14.1431 8.6353 14.5136 8.1821Z"/>
  </svg>
);

interface PaymentGatewayProps {
  planName: string;
  amount: string;
  onSuccess: () => void;
  onBack: () => void;
}

const PaymentGateway: React.FC<PaymentGatewayProps> = ({ planName, amount, onSuccess, onBack }) => {
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [isFlipped, setIsFlipped] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'gpay' | 'apple'>('card');

  // Format Card Number (groups of 4)
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 16);
    setCardNumber(value.replace(/(\d{4})(?=\d)/g, '$1 '));
  };

  // Format Expiry (MM/YY)
  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 4);
    if (value.length >= 2) {
       setExpiry(`${value.slice(0, 2)}/${value.slice(2)}`);
    } else {
       setExpiry(value);
    }
  };

  const handlePay = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    // Simulate network request
    await new Promise(resolve => setTimeout(resolve, 2500));
    setIsProcessing(false);
    onSuccess();
  };

  return (
    <MotionDiv 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full max-w-md mx-auto"
    >
      <div className="bg-navy-800 border border-white/10 rounded-3xl overflow-hidden shadow-2xl relative">
         {/* Trust Header */}
         <div className="bg-[#0f131f] border-b border-white/5 p-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
               <ShieldCheck size={16} className="text-neon-green" />
               <span className="text-xs font-bold text-white uppercase tracking-wider">FX Secure Gateway</span>
            </div>
            <div className="flex items-center gap-2 opacity-50">
               <Lock size={12} className="text-silver" />
               <span className="text-[10px] text-silver font-mono">256-BIT ENCRYPTION</span>
            </div>
         </div>

         <div className="p-6 md:p-8">
            {/* Amount Display */}
            <div className="text-center mb-8">
               <div className="text-silver text-xs uppercase mb-1">Processing Payment For</div>
               <div className="text-white font-bold text-lg">{planName} Access</div>
               <div className="text-4xl font-mono font-bold text-neon-green mt-2">{amount}</div>
            </div>

            {/* Payment Methods */}
            <div className="grid grid-cols-3 gap-2 mb-8 bg-black/20 p-1 rounded-xl">
               <button 
                  onClick={() => setPaymentMethod('card')}
                  className={`py-3 rounded-lg flex items-center justify-center gap-2 transition-all text-xs font-bold ${paymentMethod === 'card' ? 'bg-white/10 text-white shadow-sm' : 'text-silver hover:bg-white/5'}`}
               >
                  <CreditCard size={16} /> Card
               </button>
               <button 
                  onClick={() => setPaymentMethod('gpay')}
                  className={`py-3 rounded-lg flex items-center justify-center gap-2 transition-all text-xs font-bold ${paymentMethod === 'gpay' ? 'bg-white/10 text-white shadow-sm' : 'text-silver hover:bg-white/5'}`}
               >
                  <Smartphone size={16} /> G-Pay
               </button>
               <button 
                  onClick={() => setPaymentMethod('apple')}
                  className={`py-3 rounded-lg flex items-center justify-center gap-2 transition-all text-xs font-bold ${paymentMethod === 'apple' ? 'bg-white/10 text-white shadow-sm' : 'text-silver hover:bg-white/5'}`}
               >
                  <AppleIcon size={16} /> Apple
               </button>
            </div>

            {/* CARD PAYMENT */}
            {paymentMethod === 'card' && (
               <form onSubmit={handlePay} className="space-y-6">
                  {/* 3D Card Visual */}
                  <div className="perspective-1000 h-48 w-full mb-8 relative cursor-pointer" onClick={() => setIsFlipped(!isFlipped)}>
                     <MotionDiv 
                        className="w-full h-full relative preserve-3d transition-all duration-700"
                        animate={{ rotateY: isFlipped ? 180 : 0 }}
                        style={{ transformStyle: 'preserve-3d' }}
                     >
                        {/* Front */}
                        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black rounded-2xl p-6 border border-white/10 shadow-xl backface-hidden flex flex-col justify-between overflow-hidden">
                           <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-30"></div>
                           <div className="absolute top-0 right-0 w-32 h-32 bg-neon-green/20 blur-[50px] rounded-full"></div>
                           
                           <div className="flex justify-between items-start relative z-10">
                              <Wifi size={24} className="text-white/50 rotate-90" />
                              <span className="font-bold text-white italic">VISA</span>
                           </div>
                           
                           <div className="relative z-10">
                              <div className="text-white/80 font-mono text-xl tracking-widest mb-4 shadow-black drop-shadow-md">
                                 {cardNumber || '•••• •••• •••• ••••'}
                              </div>
                              <div className="flex justify-between">
                                 <div>
                                    <div className="text-[8px] text-silver uppercase">Card Holder</div>
                                    <div className="text-white text-sm font-medium uppercase">{cardName || 'YOUR NAME'}</div>
                                 </div>
                                 <div>
                                    <div className="text-[8px] text-silver uppercase">Expires</div>
                                    <div className="text-white text-sm font-medium">{expiry || 'MM/YY'}</div>
                                 </div>
                              </div>
                           </div>
                        </div>

                        {/* Back */}
                        <div 
                           className="absolute inset-0 bg-gradient-to-bl from-gray-800 to-black rounded-2xl border border-white/10 shadow-xl backface-hidden flex flex-col pt-6 overflow-hidden"
                           style={{ transform: 'rotateY(180deg)' }}
                        >
                           <div className="w-full h-10 bg-black mb-4"></div>
                           <div className="px-6">
                              <div className="text-[8px] text-silver uppercase mb-1 text-right">CVC</div>
                              <div className="w-full bg-white h-8 rounded flex items-center justify-end px-3 font-mono text-black font-bold">
                                 {cvc || '•••'}
                              </div>
                           </div>
                           <div className="mt-auto p-4 flex justify-center">
                               <ShieldCheck size={32} className="text-white/20" />
                           </div>
                        </div>
                     </MotionDiv>
                  </div>

                  {/* Inputs */}
                  <div className="space-y-4">
                     <div>
                        <input 
                           type="text" 
                           placeholder="Card Number"
                           value={cardNumber}
                           onChange={handleCardNumberChange}
                           onFocus={() => setIsFlipped(false)}
                           className="w-full bg-navy-900 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-neon-green transition-colors font-mono"
                           required
                        />
                     </div>
                     <div>
                        <input 
                           type="text" 
                           placeholder="Cardholder Name"
                           value={cardName}
                           onChange={(e) => setCardName(e.target.value)}
                           onFocus={() => setIsFlipped(false)}
                           className="w-full bg-navy-900 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-neon-green transition-colors"
                           required
                        />
                     </div>
                     <div className="flex gap-4">
                        <input 
                           type="text" 
                           placeholder="MM/YY"
                           value={expiry}
                           onChange={handleExpiryChange}
                           onFocus={() => setIsFlipped(false)}
                           className="w-1/2 bg-navy-900 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-neon-green transition-colors text-center"
                           required
                        />
                        <input 
                           type="text" 
                           placeholder="CVC"
                           value={cvc}
                           maxLength={3}
                           onChange={(e) => setCvc(e.target.value)}
                           onFocus={() => setIsFlipped(true)}
                           className="w-1/2 bg-navy-900 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-neon-green transition-colors text-center"
                           required
                        />
                     </div>
                  </div>

                  <div className="flex gap-3 pt-4">
                     <Button type="button" variant="ghost" onClick={onBack} disabled={isProcessing}>Back</Button>
                     <Button type="submit" fullWidth disabled={isProcessing} className={isProcessing ? "opacity-80" : "shadow-neon"}>
                        {isProcessing ? (
                           <span className="flex items-center gap-2">
                              <span className="w-4 h-4 border-2 border-navy-900 border-t-transparent rounded-full animate-spin"></span>
                              Processing...
                           </span>
                        ) : (
                           `Pay ${amount}`
                        )}
                     </Button>
                  </div>
               </form>
            )}
            
            {/* GOOGLE PAY */}
            {paymentMethod === 'gpay' && (
               <div className="text-center py-12 space-y-6">
                  <div className="w-20 h-20 bg-white/5 rounded-full mx-auto flex items-center justify-center animate-pulse">
                     <Smartphone size={40} className="text-white" />
                  </div>
                  <div>
                     <p className="text-white font-bold mb-2">Connecting to Google Pay...</p>
                     <p className="text-silver text-xs max-w-xs mx-auto">A secure window will open to authenticate your device payment method.</p>
                  </div>
                  <Button onClick={handlePay} fullWidth className="bg-white text-black hover:bg-gray-200 border-none shadow-none h-12">
                     <div className="flex items-center justify-center gap-2 font-bold text-lg">
                        <span className="text-blue-500 font-bold">G</span> Pay
                     </div>
                  </Button>
                  <Button type="button" variant="ghost" onClick={onBack}>Cancel</Button>
               </div>
            )}

            {/* APPLE PAY */}
            {paymentMethod === 'apple' && (
               <div className="text-center py-12 space-y-6">
                  <div className="w-20 h-20 bg-white/5 rounded-full mx-auto flex items-center justify-center relative">
                     <div className="absolute inset-0 rounded-full border border-white/20 animate-ping opacity-20"></div>
                     <ScanFace size={40} className="text-white" />
                  </div>
                  <div>
                     <p className="text-white font-bold mb-2">Face ID Authentication</p>
                     <p className="text-silver text-xs max-w-xs mx-auto">Double-click side button to confirm payment on your Apple device.</p>
                  </div>
                  <Button onClick={handlePay} fullWidth className="bg-black text-white hover:bg-gray-900 border border-white/10 shadow-none h-12">
                     <div className="flex items-center justify-center gap-2 font-medium text-lg">
                        <AppleIcon size={18} className="mb-1" /> Pay
                     </div>
                  </Button>
                  <Button type="button" variant="ghost" onClick={onBack}>Cancel</Button>
               </div>
            )}
         </div>
      </div>
      
      <p className="text-center text-[10px] text-gray-500 mt-6 flex items-center justify-center gap-2">
         <Lock size={10} /> Payments processed securely directly to FX Teen Treasury via Stripe Encryption.
      </p>
    </MotionDiv>
  );
};

export default PaymentGateway;