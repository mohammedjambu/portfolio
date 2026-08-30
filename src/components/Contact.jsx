import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import SectionLabel from './SectionLabel';
// Use Lucide for UI actions only
import { Send, Globe, ArrowUpRight } from 'lucide-react';
// Use Si (Simple Icons) for Brand Logotypes
import { SiGithub, SiLinktree, SiLinux } from 'react-icons/si';

const SOCIAL_LINKS = [
  { icon: SiGithub, href: 'https://github.com/mohammedjambu', label: 'GitHub' },
  { icon: SiLinktree, href: 'https://linkedin.com/in/', label: 'LinkedIn' },
  { icon: SiLinux, href: 'https://twitter.com/', label: 'Twitter' },
];

export default function Contact() {
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <section id="contact" className="relative py-24 md:py-40 bg-porcelain overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-125 h-125 bg-accent/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          
          {/* --- LEFT COLUMN: INFO --- */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="lg:col-span-5 flex flex-col"
          >
            <SectionLabel number="08" title="CONTACT" />
            
            <motion.h2 variants={itemVariants} className="text-5xl md:text-7xl font-display font-medium uppercase tracking-tighter mt-8 leading-[0.85] text-onyx">
              READY TO <br />
              <span className="text-accent font-serif italic font-normal">BUILD?</span>
            </motion.h2>

            <motion.p variants={itemVariants} className="mt-8 text-lg text-zinc-700 font-medium leading-relaxed max-w-sm">
              Have an idea worth building?
              <span className="text-zinc-600">I turn it into a polished, scalable digital product — from first screen to final deployment.</span>
            </motion.p>

            <motion.div variants={itemVariants} className="mt-12 flex items-center gap-4">
               <div className="relative flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-emerald-500 animate-ping absolute" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500 relative" />
               </div>
               <span className="text-xs font-bold font-mono uppercase tracking-[0.2em] text-onyx">
                 Available for freelance work
               </span>
            </motion.div>

            <motion.div variants={itemVariants} className="mt-auto pt-16 border-t border-black/5 grid grid-cols-2 gap-8">
              <div>
                <h4 className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-2">Current Time</h4>
                <p className="text-sm font-mono text-onyx">{time} GMT+5:30</p>
              </div>
              <div>
                <h4 className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-2">Based in</h4>
                <p className="text-sm font-mono text-onyx">India, Remote</p>
              </div>
            </motion.div>
          </motion.div>

          {/* --- RIGHT COLUMN: FORM --- */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 bg-white rounded-[2.5rem] p-8 md:p-12 shadow-2xl shadow-black/3 border border-black/2"
          >
            <form className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 ml-2">Your Name</label>
                <input type="text" placeholder="Name" className="bg-porcelain/50 border border-black/5 rounded-2xl px-6 py-4 outline-none focus:border-accent focus:ring-4 focus:ring-accent/5 transition-all" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 ml-2">Email Address</label>
                <input type="email" placeholder="Email" className="bg-porcelain/50 border border-black/5 rounded-2xl px-6 py-4 outline-none focus:border-accent focus:ring-4 focus:ring-accent/5 transition-all" />
              </div>
              
              <div className="md:col-span-2 flex flex-col gap-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 ml-2">Your Message</label>
                <textarea rows="4" placeholder="Tell me about your vision..." className="bg-porcelain/50 border border-black/5 rounded-2xl px-6 py-4 outline-none focus:border-accent focus:ring-4 focus:ring-accent/5 transition-all resize-none" />
              </div>
              <div className="md:col-span-2 pt-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-5 bg-onyx text-white rounded-2xl font-display font-bold uppercase tracking-[0.2em] text-xs shadow-xl flex items-center justify-center gap-3 hover:bg-accent transition-colors"
                >
                  Send Inquiry <Send size={14} />
                </motion.button>
              </div>
            </form>

            {/* FIXED SOCIAL LINKS ROW */}
            <div className="mt-12 pt-8 border-t border-black/5 flex flex-wrap items-center justify-between gap-6">
               <span className="text-[10px] font-bold font-mono text-zinc-400 uppercase tracking-widest">Connect Elsewhere:</span>
               <div className="flex gap-6">
                  {SOCIAL_LINKS.map((social, i) => (
                    <motion.a 
                      key={i} 
                      href={social.href} 
                      target="_blank"
                      rel="noreferrer"
                      whileHover={{ y: -3, color: 'var(--color-accent)' }}
                      className="text-zinc-400 transition-colors flex items-center gap-2"
                      title={social.label}
                    >
                      <social.icon size={20} />
                    </motion.a>
                  ))}
               </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}