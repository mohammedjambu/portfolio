import React from 'react';
import { motion } from 'framer-motion';

export default function SectionLabel({ number = "01", title = "ABOUT ME", className = "" }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`inline-flex items-center gap-3 text-[12px] tracking-[0.3em] font-bold text-subtle uppercase transition-colors duration-700 ${className}`}
    >
      <span className="text-onyx font-mono">{number}</span>
      <span className="w-6 h-px bg-onyx/40"></span>
      <span>{title}</span>
    </motion.div>
  );
}