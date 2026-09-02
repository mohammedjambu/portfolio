import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import SectionLabel from '../utils/SectionLabel';
import { Send, ArrowUpRight, Phone, Building2, User, MessageSquare, CheckCircle2, PhoneCall } from 'lucide-react';
import { SiGithub, SiLinktree, SiX } from 'react-icons/si';
import { FaLinkedin } from 'react-icons/fa';

import MotionButton from './Extras/MotionButton';

const SOCIAL_LINKS = [
  { icon: SiGithub, href: 'https://github.com/mohammedjambu', label: 'GitHub' },
  { icon: FaLinkedin, href: 'https://linkedin.com/in/mohammedjambu', label: 'LinkedIn' },
  { icon: SiX, href: 'https://twitter.com/', label: 'Twitter' },
];

const FormField = ({
  label,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  icon: Icon,
  isTextArea = false,
  delay = 0,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col gap-1.5 relative group"
    >
      <div className="flex items-center justify-between ml-1">
        <label className={`text-[10px] font-bold uppercase tracking-[0.2em] transition-colors duration-300 ${error ? 'text-rose-500' : isFocused ? 'text-accent' : 'text-subtle'}`}>
          {label}
        </label>
        {error && (
          <span className="text-[10px] font-semibold text-rose-500 animate-fadeIn">
            {error}
          </span>
        )}
      </div>

      <div className="relative">
        <div className={`absolute left-5 top-1/2 -translate-y-1/2 transition-colors duration-300 ${error ? 'text-rose-500' : isFocused ? 'text-accent' : 'text-subtle/40'}`}>
          <Icon size={16} />
        </div>

        {isTextArea ? (
          <textarea
            name={name}
            value={value}
            onChange={onChange}
            onFocus={() => setIsFocused(true)}
            onBlur={(e) => {
              setIsFocused(false);
              if (onBlur) onBlur(e);
            }}
            rows="4"
            placeholder={placeholder}
            className={`w-full bg-porcelain border rounded-2xl pl-12 pr-6 py-4 outline-none transition-all duration-500 text-onyx font-medium placeholder:text-subtle/30 resize-none shadow-sm ${
              error
                ? 'border-rose-400 focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10'
                : 'border-border-subtle focus:bg-surface focus:border-accent/20 focus:ring-4 focus:ring-accent/5'
            }`}
          />
        ) : (
          <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            onFocus={() => setIsFocused(true)}
            onBlur={(e) => {
              setIsFocused(false);
              if (onBlur) onBlur(e);
            }}
            placeholder={placeholder}
            className={`w-full bg-porcelain border rounded-2xl pl-12 pr-6 py-4 outline-none transition-all duration-500 text-onyx font-medium placeholder:text-subtle/30 shadow-sm ${
              error
                ? 'border-rose-400 focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10'
                : 'border-border-subtle focus:bg-surface focus:border-accent/20 focus:ring-4 focus:ring-accent/5'
            }`}
          />
        )}
      </div>
    </motion.div>
  );
};

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    company: '',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [indianTime, setIndianTime] = useState('');

  // Live Clock for Indian Time (IST - GMT+5:30)
  useEffect(() => {
    const updateTime = () => {
      const timeStr = new Date().toLocaleTimeString('en-US', {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      });
      setIndianTime(timeStr);
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);


  const validateField = (name, value) => {
    let error = '';
    const trimmed = (value || '').trim();

    if (name === 'name') {
      if (!trimmed) {
        error = 'Name is required';
      } else if (trimmed.length < 2) {
        error = 'Must be at least 2 characters';
      }
    } else if (name === 'phone') {
      const phoneRegex = /^[+\d\s()-]{10,16}$/;
      const digitsOnly = trimmed.replace(/\D/g, '');
      if (!trimmed) {
        error = 'Mobile number is required';
      } else if (digitsOnly.length < 10 || !phoneRegex.test(trimmed)) {
        error = 'Enter a valid 10-digit number';
      }
    } else if (name === 'company') {
      if (trimmed && trimmed.length < 2) {
        error = 'Must be at least 2 characters';
      }
    } else if (name === 'message') {
      if (!trimmed) {
        error = 'Project details required';
      } else if (trimmed.length < 10) {
        error = 'Must be at least 10 characters';
      }
    }
    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      const fieldError = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: fieldError }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const fieldError = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: fieldError }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {
      name: validateField('name', formData.name),
      phone: validateField('phone', formData.phone),
      company: validateField('company', formData.company),
      message: validateField('message', formData.message),
    };

    const activeErrors = Object.fromEntries(
      Object.entries(newErrors).filter(([_, err]) => Boolean(err))
    );

    if (Object.keys(activeErrors).length > 0) {
      setErrors(activeErrors);
      return;
    }

    const formattedMessage = `Hi Mohammed,

I'd like to inquire about a project:

👤 *Name*: ${formData.name.trim()}
📞 *Phone*: ${formData.phone.trim()}
🏢 *Company*: ${formData.company.trim() || 'N/A'}

💬 *Project Details*:
${formData.message.trim()}`;

    const whatsappUrl = `https://wa.me/919106310886?text=${encodeURIComponent(formattedMessage)}`;

    setIsSubmitted(true);
    window.open(whatsappUrl, '_blank');

    setTimeout(() => {
      setIsSubmitted(false);
    }, 6000);
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <section id="contact" className="relative py-24 md:py-48 bg-porcelain overflow-hidden transition-colors duration-700">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
          
          {/* LEFT COLUMN */}
          <div className="lg:col-span-5 flex flex-col">
            <SectionLabel number="08" title="CONTACT" />
            <motion.h2 
               initial={{ opacity: 0, x: -30 }}
               whileInView={{ opacity: 1, x: 0 }}
               className="text-5xl md:text-7xl font-display font-medium tracking-tighter mt-8 leading-[0.8] text-onyx uppercase"
            >
              READY TO <br />
              <span className="text-accent font-serif italic font-normal leading-normal">scale?</span>
            </motion.h2>

            <motion.p variants={itemVariants} className="mt-2 text-base md:text-lg text-onyx font-medium leading-relaxed max-w-md">
              Have an idea worth building?
              <span className="text-onyx/70"> I turn it into a polished, scalable digital product — from first screen to final deployment.</span>
            </motion.p>

            <div className="mt-8 flex items-center gap-4">
               <div className="relative">
                  <div className="w-3 h-3 rounded-full bg-emerald-500 animate-ping absolute" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500 relative" />
               </div>
               <span className="text-xs font-bold font-mono uppercase tracking-widest text-onyx transition-colors duration-700">
                 Available for freelance work
               </span>
            </div>

            {/* PREMIUM ATTRACTIVE BOOK A CALL CARD */}
            <motion.a
              href="https://wa.me/919106310886?text=Hi%20Mohammed,%20I'd%20like%20to%20book%20a%2015-minute%20free%20introductory%20call."
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="mt-8 p-6 rounded-3xl bg-surface border border-border-subtle hover:border-accent/40 shadow-xl transition-all duration-500 flex items-center justify-between group cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-accent/10 text-accent flex items-center justify-center transition-colors duration-500 group-hover:bg-accent group-hover:text-porcelain">
                  <PhoneCall size={20} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-accent">
                    15 Minutes • Free Intro Call
                  </span>
                  <h4 className="text-lg md:text-xl font-display font-medium uppercase tracking-tight text-onyx mt-0.5">
                    Book A Call
                  </h4>
                </div>
              </div>

              <div className="w-10 h-10 rounded-full border border-border-subtle bg-onyx text-porcelain flex items-center justify-center group-hover:bg-accent group-hover:border-accent transition-colors duration-500">
                <ArrowUpRight size={18} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </motion.a>

            {/* TIME & LOCATION CONTENT */}
            <div className="mt-8 grid grid-cols-2 gap-8 border-t border-border-subtle pt-8">
               <div>
                 <h4 className="text-[10px] font-bold uppercase tracking-widest text-subtle mb-2">Current Time</h4>
                 <p className="text-sm font-mono text-onyx font-bold uppercase tracking-wider">{indianTime || '12:00 PM'} IST </p>
               </div>
               <div>
                 <h4 className="text-[10px] font-bold uppercase tracking-widest text-subtle mb-2">Based in</h4>
                 <p className="text-sm font-mono text-onyx font-bold uppercase tracking-wider transition-colors duration-700">Dahod, Gujarat — India</p>
               </div>
            </div>
          </div>


          {/* RIGHT COLUMN: FORM */}
          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7 bg-surface rounded-[3rem] p-8 md:p-12 shadow-2xl border border-border-subtle transition-all duration-700"
          >
            <form onSubmit={handleSubmit} noValidate className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                label="Your Name"
                name="name"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.name}
                icon={User}
                delay={0.1}
              />
              <FormField
                label="Mobile Number"
                name="phone"
                type="tel"
                placeholder="+91 91573 02004"
                value={formData.phone}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.phone}
                icon={Phone}
                delay={0.2}
              />
              <div className="md:col-span-2">
                <FormField
                  label="Company Name (Optional)"
                  name="company"
                  placeholder="e.g. Acme Studio"
                  value={formData.company}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.company}
                  icon={Building2}
                  delay={0.3}
                />
              </div>
              <div className="md:col-span-2">
                <FormField
                  label="Project Details"
                  name="message"
                  isTextArea={true}
                  placeholder="Tell me about your vision, goals, and timeline..."
                  value={formData.message}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.message}
                  icon={MessageSquare}
                  delay={0.4}
                />
              </div>

              {isSubmitted && (
                <div className="md:col-span-2 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-semibold flex items-center gap-2">
                  <CheckCircle2 size={16} />
                  <span>Opening WhatsApp with your inquiry details...</span>
                </div>
              )}

              <div className="md:col-span-2">
                <MotionButton
                  type="submit"
                  variant="primary"
                  size="full"
                  className="py-5 rounded-2xl text-xs font-bold"
                  icon={<Send size={14} />}
                >
                  Send Inquiry via WhatsApp
                </MotionButton>
              </div>
            </form>

            <div className="mt-8 pt-6 border-t border-border-subtle flex items-center justify-between">
               <span className="text-[10px] font-bold font-mono text-subtle uppercase tracking-widest transition-colors duration-700">Connect Elsewhere:</span>
               <div className="flex gap-6">
                  {SOCIAL_LINKS.map((s, i) => (
                    <a key={i} href={s.href} target="_blank" rel="noopener noreferrer" className="text-subtle hover:text-accent transition-colors duration-300">
                       <s.icon size={20} />
                    </a>
                  ))}
               </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
