import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from '../constants';
import Button from '../components/Button';
import PaymentGateway from '../components/PaymentGateway';
import { ArrowLeft, CheckCircle, ChevronRight, Terminal, Trophy, Users, Zap, Star } from 'lucide-react';
import { PRICING_PLANS } from '../constants';

const MotionDiv = motion.div as any;

const Register = () => {
  const [step, setStep] = useState(1);
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);
  const [selectedAvatar, setSelectedAvatar] = useState<number | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const navigate = useNavigate();

  // If VIP is selected, we have 4 steps (Info -> Goal -> Plan -> Payment -> Success)
  // If Free is selected, we have 4 steps (Info -> Goal -> Plan -> Success)
  
  const handlePlanSelect = (planName: string) => {
    setSelectedPlan(planName);
    
    // Auto-advance logic for better UX "As soon as you choose... initiate payment"
    setTimeout(() => {
        if (planName === 'VIP Access') {
            setStep(4); // Go to payment
        } else {
            setStep(5); // Skip payment, go to success
        }
    }, 400); // Small delay for visual feedback
  };

  const handleNext = () => {
    if (step === 3) {
      // Logic if user clicks Next instead of auto-advance (fallback)
      if (selectedPlan === 'VIP Access') {
         setStep(4); 
      } else {
         setStep(5); 
      }
    } else {
      setStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    setStep(prev => prev - 1);
  };

  const handlePaymentSuccess = () => {
     setStep(5);
  };

  const handleLaunch = () => {
     navigate('/dashboard');
  };

  const progress = (step / 5) * 100;

  return (
    <div className="min-h-screen bg-navy-900 flex overflow-hidden font-inter text-white">
      {/* LEFT COLUMN: THE HYPE VISUAL (Desktop Only) */}
      <div className="hidden lg:flex w-1/2 relative items-center justify-center bg-[#05070A] overflow-hidden perspective-1000">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-navy-800 via-navy-900 to-[#000000]"></div>
        
        {/* Floating Background Elements */}
        <MotionDiv 
          animate={{ rotate: 360 }}
          transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
          className="absolute w-[800px] h-[800px] border border-white/5 rounded-full border-dashed opacity-20"
        />
        <MotionDiv 
           animate={{ rotate: -360 }}
           transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
           className="absolute w-[600px] h-[600px] border border-neon-green/10 rounded-full opacity-30"
        />

        {/* 3D Phone Container */}
        <MotionDiv
          initial={{ y: 20, rotateY: -15, rotateX: 10 }}
          animate={{ y: -20, rotateY: -5, rotateX: 5 }}
          transition={{ repeat: Infinity, repeatType: "mirror", duration: 6, ease: "easeInOut" }}
          className="relative z-10 w-[320px] h-[640px] bg-black rounded-[3rem] border-[8px] border-gray-800 shadow-2xl flex flex-col overflow-hidden"
          style={{ transformStyle: 'preserve-3d', boxShadow: '0 0 50px rgba(0, 255, 163, 0.2)' }}
        >
          {/* Phone Screen Content */}
          <div className="flex-1 bg-navy-900 relative p-6 flex flex-col">
            <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-neon-green/20 to-transparent pointer-events-none" />
            
            <div className="mt-8 mb-6">
              <div className="text-xs text-silver font-mono uppercase">Total Balance</div>
              <div className="text-4xl font-mono font-bold text-white">$14,230.50</div>
              <div className="inline-flex items-center px-2 py-1 bg-neon-green/10 rounded text-neon-green text-xs font-bold mt-2">
                <TrendingUpIcon size={12} className="mr-1"/> +12.5% Today
              </div>
            </div>

            {/* Notification Pop */}
            <MotionDiv 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 bg-navy-800/90 backdrop-blur-md border border-neon-green/50 p-4 rounded-xl shadow-neon text-center z-20"
            >
              <div className="text-neon-green mb-1 flex justify-center"><CheckCircle size={32} /></div>
              <div className="text-white font-bold text-lg">PROFIT HIT</div>
              <div className="text-2xl font-mono text-neon-green">+$450.00</div>
            </MotionDiv>

            {/* Chart Graphic Placeholder */}
            <div className="mt-auto h-32 w-full bg-gradient-to-t from-neon-green/10 to-transparent rounded-t-xl relative overflow-hidden">
               <svg className="absolute bottom-0 left-0 right-0" viewBox="0 0 100 20" preserveAspectRatio="none">
                 <path d="M0 20 L0 15 L10 12 L20 16 L30 10 L40 14 L50 5 L60 8 L70 2 L80 6 L90 3 L100 0 L100 20 Z" fill="rgba(0, 255, 163, 0.2)" />
                 <path d="M0 15 L10 12 L20 16 L30 10 L40 14 L50 5 L60 8 L70 2 L80 6 L90 3 L100 0" fill="none" stroke="#00FFA3" strokeWidth="1" />
               </svg>
            </div>
          </div>
        </MotionDiv>

        {/* Floating Widgets */}
        <MotionDiv 
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 4, repeat: Infinity, delay: 1 }}
          className="absolute right-20 top-1/4 bg-navy-800/80 backdrop-blur border border-white/10 p-4 rounded-xl shadow-lg"
        >
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-500"><Terminal size={16} /></div>
             <div>
               <div className="text-xs text-silver">Signal Accuracy</div>
               <div className="text-sm font-bold text-white">87.4%</div>
             </div>
          </div>
        </MotionDiv>

        <MotionDiv 
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 5, repeat: Infinity, delay: 0.5 }}
          className="absolute left-20 bottom-1/3 bg-navy-800/80 backdrop-blur border border-white/10 p-4 rounded-xl shadow-lg"
        >
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-500"><Users size={16} /></div>
             <div>
               <div className="text-xs text-silver">Active Traders</div>
               <div className="text-sm font-bold text-white">5,241</div>
             </div>
          </div>
        </MotionDiv>
      </div>

      {/* RIGHT COLUMN: THE FORM */}
      <div className="w-full lg:w-1/2 flex flex-col p-6 md:p-12 lg:p-20 relative bg-navy-900 overflow-y-auto">
        <div className="max-w-md w-full mx-auto flex flex-col h-full justify-center py-12">
          
          {/* Header */}
          <div className="mb-8">
             <Link to="/" className="inline-flex items-center text-silver hover:text-white transition-colors mb-6 text-sm">
               <ArrowLeft size={16} className="mr-2" /> Back to Base
             </Link>
             <h1 className="text-3xl md:text-4xl font-grotesk font-bold text-white mb-2">INITIALIZE JOURNEY</h1>
             <p className="text-silver">Step {step}: {
               step === 1 ? 'Identity' : step === 2 ? 'Objectives' : step === 3 ? 'Select Plan' : step === 4 ? 'Secure Payment' : 'Launch'
             }</p>
          </div>

          {/* Progress Bar */}
          <div className="mb-10">
            <div className="h-1 bg-navy-800 rounded-full overflow-hidden">
               <MotionDiv 
                 initial={{ width: 0 }}
                 animate={{ width: `${progress}%` }}
                 className="h-full bg-neon-green shadow-[0_0_10px_#00FFA3]"
               />
            </div>
          </div>

          {/* Form Steps */}
          <div className="flex-1 flex flex-col">
            <AnimatePresence mode="wait">
              
              {/* STEP 1: IDENTITY */}
              {step === 1 && (
                <MotionDiv
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-2 gap-4">
                    <InputGroup label="First Name" placeholder="Jane" />
                    <InputGroup label="Last Name" placeholder="Doe" />
                  </div>
                  <InputGroup label="Email Access" placeholder="trader@fxteen.com" type="email" />
                  <InputGroup label="Secure Password" placeholder="••••••••" type="password" />
                  
                  <div className="pt-4">
                    <label className="text-sm font-medium text-silver mb-4 block">Choose Your Avatar</label>
                    <div className="flex gap-4 justify-start">
                       {[1, 2, 3, 4].map((i) => (
                         <button 
                           key={i} 
                           type="button" 
                           onClick={() => setSelectedAvatar(i)}
                           className={`w-14 h-14 rounded-full border-2 transition-all duration-300 flex items-center justify-center overflow-hidden relative group ${
                             selectedAvatar === i 
                             ? 'border-neon-green shadow-[0_0_20px_rgba(0,255,163,0.5)] scale-110' 
                             : 'border-white/10 hover:border-neon-green/50 hover:scale-105 bg-navy-800'
                           }`}
                         >
                           <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i * 123}`} alt="avatar" className="w-full h-full object-cover" />
                         </button>
                       ))}
                    </div>
                  </div>
                </MotionDiv>
              )}

              {/* STEP 2: OBJECTIVES */}
              {step === 2 && (
                <MotionDiv
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <h3 className="text-xl font-bold text-white">What's your main objective?</h3>
                  <div className="grid grid-cols-1 gap-3">
                    {['Financial Freedom', 'Side Hustle Income', 'Learn the Skill', 'Full-time Career'].map((goal) => (
                      <button
                        key={goal}
                        type="button"
                        onClick={() => setSelectedGoal(goal)}
                        className={`p-4 rounded-xl border text-left transition-all duration-300 flex items-center justify-between group relative overflow-hidden ${
                          selectedGoal === goal 
                          ? 'bg-neon-green/10 border-neon-green text-white shadow-[0_0_15px_rgba(0,255,163,0.2)] translate-x-2' 
                          : 'bg-navy-800 border-white/5 text-silver hover:bg-navy-800/80 hover:border-neon-green/30 hover:text-white'
                        }`}
                      >
                        <span className="font-medium relative z-10">{goal}</span>
                        {selectedGoal === goal && <CheckCircle size={20} className="text-neon-green" />}
                      </button>
                    ))}
                  </div>
                </MotionDiv>
              )}

              {/* STEP 3: PLAN SELECTION */}
              {step === 3 && (
                <MotionDiv
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <h3 className="text-xl font-bold text-white">Select Access Level</h3>
                  <div className="grid grid-cols-1 gap-4">
                    {PRICING_PLANS.map((plan, idx) => (
                      <button
                        key={idx}
                        onClick={() => handlePlanSelect(plan.name)}
                        className={`p-6 rounded-2xl border text-left transition-all duration-300 relative overflow-hidden group ${
                          selectedPlan === plan.name
                            ? 'bg-navy-800 border-neon-green shadow-[0_0_20px_rgba(0,255,163,0.15)] transform scale-102'
                            : 'bg-navy-900 border-white/10 hover:border-white/30'
                        }`}
                      >
                         <div className="flex justify-between items-center mb-2">
                            <span className={`font-bold text-lg ${plan.highlighted ? 'text-neon-green' : 'text-white'}`}>{plan.name}</span>
                            <span className="font-mono text-xl text-white">{plan.price}</span>
                         </div>
                         <ul className="space-y-2 mb-4">
                            {plan.features.slice(0, 3).map((feat, i) => (
                               <li key={i} className="text-xs text-silver flex items-center gap-2">
                                  <div className="w-1 h-1 bg-white/50 rounded-full" /> {feat}
                               </li>
                            ))}
                         </ul>
                         <div className={`w-4 h-4 rounded-full border border-white/30 absolute top-6 right-6 flex items-center justify-center ${selectedPlan === plan.name ? 'bg-neon-green border-neon-green' : ''}`}>
                            {selectedPlan === plan.name && <CheckCircle size={12} className="text-navy-900" />}
                         </div>
                      </button>
                    ))}
                  </div>
                </MotionDiv>
              )}

              {/* STEP 4: PAYMENT (VIP ONLY) */}
              {step === 4 && (
                <PaymentGateway 
                   planName={selectedPlan || 'VIP Access'} 
                   amount="$49.00" 
                   onSuccess={handlePaymentSuccess} 
                   onBack={handleBack} 
                />
              )}

              {/* STEP 5: SUCCESS */}
              {step === 5 && (
                <MotionDiv
                  key="step5"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="space-y-6 text-center py-8"
                >
                   <MotionDiv 
                     initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200, damping: 15 }}
                     className="w-24 h-24 bg-neon-green/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-neon-green/30 shadow-[0_0_30px_rgba(0,255,163,0.2)]"
                   >
                      <Trophy size={48} className="text-neon-green" />
                   </MotionDiv>
                   <h3 className="text-2xl font-bold text-white">Access Granted.</h3>
                   <p className="text-silver">Your terminal is configured and ready for deployment.</p>
                   
                   <div className="bg-navy-800/50 p-4 rounded-lg border border-white/5 text-left text-sm font-mono text-gray-400 mt-8">
                      <div className="flex justify-between mb-2"><span>MEMBERSHIP:</span> <span className="text-white font-bold">{selectedPlan || 'COMMUNITY'}</span></div>
                      <div className="flex justify-between mb-2"><span>STATUS:</span> <span className="text-neon-green animate-pulse">ONLINE ●</span></div>
                      <div className="flex justify-between"><span>SERVER:</span> <span>EU_WEST_1</span></div>
                   </div>
                   
                   <Button onClick={handleLaunch} fullWidth className="mt-8 shadow-neon animate-pulse">
                      LAUNCH DASHBOARD
                   </Button>
                </MotionDiv>
              )}
            </AnimatePresence>

            {/* Navigation Buttons (Hidden on Payment/Success Steps) */}
            {step !== 4 && step !== 5 && (
               <div className="mt-8 flex gap-4">
                  {step > 1 && (
                    <Button type="button" variant="ghost" onClick={handleBack} className="flex-1">Back</Button>
                  )}
                  {/* Hide Next button on Step 3 since we auto-advance, unless no plan is selected yet */}
                  {step !== 3 && (
                     <Button type="button" onClick={handleNext} fullWidth className="flex-1">
                        Next Step <ChevronRight size={16} className="ml-2" />
                     </Button>
                  )}
                  {/* Step 3 Fallback/Confirmation logic if needed, but we auto-advance now. 
                      Let's leave a manual button just in case, but styled subtly or removed. 
                      Actually, keeping it hidden if step === 3 creates a clean auto-flow.
                  */}
               </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const InputGroup = ({ label, type = "text", placeholder }: { label: string, type?: string, placeholder?: string }) => (
  <div className="space-y-2 group">
    <label className="text-sm font-medium text-silver group-focus-within:text-neon-green transition-colors duration-300">{label}</label>
    <input 
      type={type} 
      placeholder={placeholder}
      className="w-full bg-navy-800 border border-white/10 rounded-xl px-4 py-3 text-white transition-all duration-300
      focus:outline-none focus:border-neon-green focus:shadow-[0_0_20px_rgba(0,255,163,0.25)] 
      placeholder:text-gray-600 hover:border-white/20 font-inter"
    />
  </div>
);

const TrendingUpIcon = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
    <polyline points="17 6 23 6 23 12"></polyline>
  </svg>
);

export default Register;