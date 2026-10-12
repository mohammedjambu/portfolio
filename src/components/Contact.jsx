import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import SectionLabel from '../utils/SectionLabel';
import { Send, ArrowUpRight, Phone, Building2, User, MessageSquare, CheckCircle2, PhoneCall } from 'lucide-react';
import { SiGithub, SiX } from 'react-icons/si';
import { FaLinkedin } from 'react-icons/fa';

import MotionButton from './Extras/MotionButton';

const SOCIAL_LINKS = [
  { icon: SiGithub, href: 'https://github.com/mohammedjambu', label: 'GitHub Profile' },
  { icon: FaLinkedin, href: 'https://linkedin.com/in/mohammedjambu', label: 'LinkedIn Profile' },
  { icon: SiX, href: 'https://twitter.com/', label: 'Twitter / X Profile' },
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
  const errorId = `${name}-error`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col gap-1.5 relative group"
    >
      <div className="flex items-center justify-between ml-1">
        <label 
          htmlFor={name}
          className={`text-[10px] font-bold uppercase tracking-[0.2em] transition-colors duration-300 ${
            error ? 'text-rose-500' : isFocused ? 'text-accent' : 'text-subtle'
          }`}
        >
          {label}
        </label>
        {error && (
          <span id={errorId} role="alert" className="text-[10px] font-semibold text-rose-500 animate-fadeIn">
            {error}
          </span>
        )}
      </div>

      <div className="relative">
        <div 
          className={`absolute left-4 sm:left-5 top-1/2 -translate-y-1/2 transition-colors duration-300 pointer-events-none ${
            error ? 'text-rose-500' : isFocused ? 'text-accent' : 'text-subtle/40'
          }`}
          aria-hidden="true"
        >
          <Icon size={16} />
        </div>

        {isTextArea ? (
          <textarea
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            onFocus={() => setIsFocused(true)}
            onBlur={(e) => {
              setIsFocused(false);
              if (onBlur) onBlur(e);
            }}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? errorId : undefined}
            rows="4"
            placeholder={placeholder}
            className={`w-full bg-porcelain border rounded-2xl pl-11 sm:pl-12 pr-4 sm:pr-6 py-3.5 sm:py-4 outline-none transition-all duration-300 text-onyx font-medium placeholder:text-subtle/35 resize-none shadow-xs text-base sm:text-sm ${
              error
                ? 'border-rose-400 focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10'
                : 'border-border-subtle focus:bg-surface focus:border-accent/30 focus:ring-4 focus:ring-accent/5'
            }`}
          />
        ) : (
          <input
            id={name}
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            onFocus={() => setIsFocused(true)}
            onBlur={(e) => {
              setIsFocused(false);
              if (onBlur) onBlur(e);
            }}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? errorId : undefined}
            placeholder={placeholder}
            className={`w-full bg-porcelain border rounded-2xl pl-11 sm:pl-12 pr-4 sm:pr-6 py-3.5 sm:py-4 outline-none transition-all duration-300 text-onyx font-medium placeholder:text-subtle/35 shadow-xs text-base sm:text-sm ${
              error
                ? 'border-rose-400 focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10'
                : 'border-border-subtle focus:bg-surface focus:border-accent/30 focus:ring-4 focus:ring-accent/5'
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

  // Live Clock for Indian Standard Time (IST - UTC+5:30)
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
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');

    setTimeout(() => {
      setIsSubmitted(false);
    }, 6000);
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  // Reusable Call Action Card + Time/Location Component
  const renderCallAndMetadata = () => (
    <>
      {/* Book a Call Action Card */}
      <motion.a
        href="https://wa.me/919106310886?text=Hi%20Mohammed,%20I'd%20like%20to%20book%20a%2015-minute%20free%20introductory%20call."
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Book a 15-minute free introductory call via WhatsApp"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        whileHover={{ scale: 1.015, y: -2 }}
        whileTap={{ scale: 0.98 }}
        className="p-5 sm:p-6 rounded-3xl bg-surface border border-border-subtle hover:border-accent/40 shadow-lg transition-all duration-300 flex items-center justify-between group cursor-pointer focus-visible:outline-2 focus-visible:outline-accent"
      >
        <div className="flex items-center gap-3.5 sm:gap-4">
          <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-accent/10 text-accent flex items-center justify-center transition-colors duration-300 group-hover:bg-accent group-hover:text-porcelain shrink-0">
            <PhoneCall size={19} />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-accent">
              15 Minutes • Free Intro Call
            </span>
            <h4 className="text-base sm:text-lg md:text-xl font-display font-medium uppercase tracking-tight text-onyx mt-0.5">
              Book A Call
            </h4>
          </div>
        </div>

        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-border-subtle bg-onyx text-porcelain flex items-center justify-center group-hover:bg-accent group-hover:border-accent transition-colors duration-300 shrink-0 ml-2">
          <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
      </motion.a>

      {/* Time & Location Metadata */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
        className="grid grid-cols-2 gap-6 sm:gap-8 border-t border-border-subtle pt-6 sm:pt-8"
      >
        <div>
          <h4 className="text-[10px] font-bold uppercase tracking-widest text-subtle mb-1.5">Current Time</h4>
          <p className="text-xs sm:text-sm font-mono text-onyx font-bold uppercase tracking-wider">{indianTime || '12:00 PM'} IST</p>
        </div>
        <div>
          <h4 className="text-[10px] font-bold uppercase tracking-widest text-subtle mb-1.5">Based in</h4>
          <p className="text-xs sm:text-sm font-mono text-onyx font-bold uppercase tracking-wider transition-colors duration-700">Dahod, Gujarat — India</p>
        </div>
      </motion.div>
    </>
  );

  return (
    <section 
      id="contact" 
      className="relative py-20 sm:py-24 md:py-36 lg:py-44 bg-porcelain overflow-hidden transition-colors duration-700 scroll-mt-24 border-t border-border-subtle"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-12 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-16 lg:gap-20 xl:gap-24 items-start">
          
          {/* LEFT COLUMN: Narrative & Info */}
          <div className="lg:col-span-5 flex flex-col">
            <SectionLabel number="08" title="CONTACT" />
            
            <motion.h2 
              initial={{ opacity: 0, x: -25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-medium tracking-tight mt-4 sm:mt-6 leading-[0.9] text-onyx uppercase"
            >
              READY TO <br />
              <span className="text-accent font-serif italic font-normal leading-normal">scale?</span>
            </motion.h2>

            <motion.p 
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg text-onyx font-medium leading-relaxed max-w-md"
            >
              Have an idea worth building?
              <span className="text-subtle font-normal"> I turn it into a polished, scalable digital product — from first screen to final deployment.</span>
            </motion.p>

            {/* Freelance Availability Status */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="mt-6 sm:mt-8 flex items-center gap-3"
            >
              <div className="relative flex items-center justify-center">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping absolute" />
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 relative" />
              </div>
              <span className="text-[11px] sm:text-xs font-bold font-mono uppercase tracking-widest text-onyx transition-colors duration-700">
                Available for freelance work
              </span>
            </motion.div>

            {/* [AUDIT FIX: DESKTOP ONLY CALL CARD & METADATA] Hidden on mobile */}
            <div className="hidden lg:flex flex-col gap-6 sm:gap-8 mt-8">
              {renderCallAndMetadata()}
            </div>
          </div>

          {/* RIGHT COLUMN: Form Card */}
          <div className="lg:col-span-7 flex flex-col gap-8 w-full">
            <motion.div 
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="bg-surface rounded-3xl sm:rounded-[2.5rem] lg:rounded-[3rem] p-5 sm:p-7 md:p-10 lg:p-12 shadow-xl border border-border-subtle transition-colors duration-700 w-full"
            >
              <form onSubmit={handleSubmit} noValidate className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
                <FormField
                  label="Your Name"
                  name="name"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.name}
                  icon={User}
                  delay={0.05}
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
                  delay={0.1}
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
                    delay={0.15}
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
                    delay={0.2}
                  />
                </div>

                {isSubmitted && (
                  <div 
                    role="status" 
                    aria-live="polite"
                    className="md:col-span-2 p-3.5 sm:p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-semibold flex items-center gap-2"
                  >
                    <CheckCircle2 size={16} className="shrink-0" />
                    <span>Opening WhatsApp with your inquiry details...</span>
                  </div>
                )}

                <div className="md:col-span-2 pt-1">
                  <MotionButton
                    type="submit"
                    variant="primary"
                    size="full"
                    className="py-4 sm:py-4.5 rounded-2xl text-xs font-bold"
                    icon={<Send size={14} />}
                  >
                    Send Inquiry via WhatsApp
                  </MotionButton>
                </div>
              </form>

              {/* Social Links Footer */}
              <div className="mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-border-subtle flex items-center justify-between gap-3">
                <span className="text-[10px] font-bold font-mono text-subtle uppercase tracking-widest transition-colors duration-700">
                  Connect Elsewhere:
                </span>
                <div className="flex items-center gap-4 sm:gap-5">
                  {SOCIAL_LINKS.map((s, i) => (
                    <a
                      key={i}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      className="text-subtle hover:text-accent transition-colors duration-300 p-1 focus-visible:outline-2 focus-visible:outline-accent rounded-md"
                    >
                      <s.icon size={19} />
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* 
              [AUDIT FIX: MOBILE ONLY CALL CARD & METADATA]
              Rendered directly below the form card on mobile viewports (< lg).
            */}
            <div className="flex lg:hidden flex-col gap-6 sm:gap-8 mt-2">
              {renderCallAndMetadata()}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}