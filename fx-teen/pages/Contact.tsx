import React from 'react';
import Layout from '../components/Layout';
import Button from '../components/Button';
import { Mail, MessageCircle, MapPin, Phone, Instagram, Send, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

const Contact = () => {
  return (
    <Layout>
      <div className="container mx-auto px-6 pb-20">
         <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
               <h1 className="text-5xl font-grotesk font-bold text-white mb-4">GET IN <span className="text-neon-green">TOUCH</span></h1>
               <p className="text-silver text-lg">Have questions about the academy or signals? We're here 24/7.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
               <div className="space-y-8">
                  <div className="bg-navy-800 p-8 rounded-2xl border border-white/5">
                     <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                        <MessageCircle className="text-neon-green mr-3" /> Support Channels
                     </h3>
                     <div className="space-y-4">
                        <div className="flex items-start">
                           <div className="bg-white/5 p-2 rounded-lg mr-4"><Mail size={20} className="text-silver"/></div>
                           <div>
                              <p className="text-sm text-silver uppercase tracking-wider font-bold">Email</p>
                              <p className="text-white">support@fxteen.com</p>
                           </div>
                        </div>
                        <div className="flex items-start">
                           <div className="bg-white/5 p-2 rounded-lg mr-4"><MapPin size={20} className="text-silver"/></div>
                           <div>
                              <p className="text-sm text-silver uppercase tracking-wider font-bold">HQ</p>
                              <p className="text-white">Dubai Silicon Oasis, UAE</p>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>

               <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid grid-cols-2 gap-4">
                     <input type="text" placeholder="Name" className="w-full bg-navy-800 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-neon-green transition-all" />
                     <input type="email" placeholder="Email" className="w-full bg-navy-800 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-neon-green transition-all" />
                  </div>
                  <input type="text" placeholder="Subject" className="w-full bg-navy-800 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-neon-green transition-all" />
                  <textarea rows={5} placeholder="How can we help?" className="w-full bg-navy-800 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-neon-green transition-all"></textarea>
                  <Button fullWidth>Send Message</Button>
               </form>
            </div>

            {/* NEW LEADERSHIP & CONTACT SECTION */}
            <section className="border-t border-white/5 pt-16">
               <div className="text-center mb-12">
                  <h2 className="text-3xl font-grotesk font-bold text-white mb-4">LEADERSHIP <span className="text-neon-green">&</span> DIRECT CONTACT</h2>
                  <p className="text-silver">Connect directly with the team leadership.</p>
               </div>
               
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* CARD 1: THE FOUNDER */}
                  <LeadershipCard 
                     name="Founder" 
                     role="FX TEEN FOUNDER" 
                     badge="THE ARCHITECT"
                     socials={[
                        { type: 'whatsapp', value: '+27 73 376 0734', link: 'https://wa.me/27733760734' },
                        { type: 'instagram', value: '@alwaysflyflurry', link: 'https://instagram.com/alwaysflyflurry' }
                     ]}
                  />

                  {/* CARD 2: THE REPRESENTATIVE */}
                  <LeadershipCard 
                     name="Oratile James Raqashile" 
                     role="OFFICIAL REPRESENTATIVE" 
                     badge="TEAM LEAD"
                     socials={[
                        { type: 'whatsapp', value: '+27 65 501 7977', link: 'https://wa.me/27655017977' },
                        { type: 'email', value: 'orjamestrading@gmail.com', link: 'mailto:orjamestrading@gmail.com' },
                        { type: 'instagram', value: '@o._r_james', link: 'https://instagram.com/o._r_james' }
                     ]}
                  />
               </div>
            </section>
         </div>
      </div>
    </Layout>
  );
};

// Sub-component for Leadership Cards
const LeadershipCard = ({ name, role, badge, socials }: any) => (
   <motion.div 
      whileHover={{ y: -5 }}
      className="bg-navy-800/50 backdrop-blur-md p-8 rounded-3xl border border-neon-green/30 relative overflow-hidden group hover:border-neon-green transition-all duration-300 shadow-lg"
   >
      {/* Background Gradient */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-neon-green/10 blur-[50px] rounded-full pointer-events-none group-hover:bg-neon-green/20 transition-colors" />
      
      <div className="relative z-10">
         <div className="flex justify-between items-start mb-6">
            <div className="inline-block px-3 py-1 bg-neon-green/10 border border-neon-green/20 rounded-full text-[10px] font-mono font-bold text-neon-green uppercase tracking-wider">
               {badge}
            </div>
            {/* Decoration */}
            <div className="flex gap-1">
               <div className="w-1 h-1 bg-white/20 rounded-full" />
               <div className="w-1 h-1 bg-white/20 rounded-full" />
               <div className="w-1 h-1 bg-white/20 rounded-full" />
            </div>
         </div>

         <h3 className="text-2xl font-grotesk font-bold text-white mb-1">{name}</h3>
         <p className="text-sm text-silver font-mono mb-8 uppercase tracking-tight">{role}</p>

         <div className="space-y-3">
            {socials.map((social: any, idx: number) => (
               <a 
                  key={idx} 
                  href={social.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 bg-navy-900/50 rounded-xl border border-white/5 hover:border-white/20 hover:bg-white/5 transition-all group/item"
               >
                  <div className="flex items-center gap-3">
                     <div className={`
                        w-8 h-8 rounded-full flex items-center justify-center 
                        ${social.type === 'whatsapp' ? 'bg-green-500/20 text-green-500' : 
                          social.type === 'instagram' ? 'bg-purple-500/20 text-purple-400' : 
                          'bg-blue-500/20 text-blue-400'}
                     `}>
                        {social.type === 'whatsapp' && <Phone size={14} />}
                        {social.type === 'instagram' && <Instagram size={14} />}
                        {social.type === 'email' && <Mail size={14} />}
                     </div>
                     <span className="text-sm text-gray-300 font-medium group-hover/item:text-white transition-colors">{social.value}</span>
                  </div>
                  <ExternalLink size={14} className="text-silver opacity-0 group-hover/item:opacity-100 transition-opacity" />
               </a>
            ))}
         </div>
      </div>
   </motion.div>
);

export default Contact;