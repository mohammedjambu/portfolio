import React from 'react';
import { motion } from 'framer-motion';

export default function SectionLabel({ number = "01", title = "ABOUT ME", className = "" }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`inline-flex items-center gap-3 text-xs tracking-[0.2em] font-semibold text-subtle uppercase ${className}`}
    >
      <span className="text-[#111113] font-mono">{number}</span>
      <span className="w-6 h-px bg-[#111113]/20"></span>
      <span>{title}</span>
    </motion.div>
  );
}
