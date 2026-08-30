import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionLabel from './SectionLabel';
import { Plus, Minus, Send, ArrowUpRight } from 'lucide-react';

const FAQS = [
  {
    question: "What kind of projects do you work on?",
    answer: "I work on custom web experiences, landing pages, e-commerce platforms, business applications, CRM systems, and full-stack products. If it needs thoughtful design and solid engineering, I'm interested."

  },
  {
    question: "How long does a project usually take?",
    answer: "It depends on the scope. A focused landing page may take a couple of weeks, while a larger application can take several weeks or more. After understanding the requirements, I’ll give you a realistic timeline before we start."
  },
  {
    question: "Do you work with existing designs or products?",
    answer: "Absolutely. I can work from an existing design, improve an existing product, or take the project from a blank canvas. The goal is to meet the product where it is and move it forward."
  },
  {
    question: "Do you offer post-launch support?",
    answer: "Yes. I provide 30 days of complimentary hyper-care to ensure everything runs smoothly. I also offer monthly retainers for scaling and continuous feature updates."
  },
  {
    question: "How do we communicate during the project?",
    answer: "You’ll stay involved throughout the process. We’ll align on requirements early, share progress at key milestones, and keep communication clear so there are no surprises at the end."
  }
];

const AccordionItem = ({ faq, isOpen, toggle }) => {
  return (
    <div className="border-b border-black/5 overflow-hidden">
      <button
        onClick={toggle}
        className="w-full py-6 md:py-8 flex items-center justify-between text-left group outline-none"
      >
        <h3 className={`text-lg md:text-2xl font-display font-bold uppercase tracking-tight transition-colors duration-500 ${isOpen ? 'text-onyx' : 'text-zinc-400 group-hover:text-onyx'}`}>
          {faq.question}
        </h3>
        
        <div className={`shrink-0 ml-4 p-2 rounded-full border transition-all duration-500 ${isOpen ? 'bg-onyx text-white border-onyx rotate-90' : 'bg-transparent text-zinc-300 border-black/10 group-hover:text-onyx'}`}>
          {isOpen ? <Minus size={16} /> : <Plus size={16} />}
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
          >
            <div className="pb-10 pr-12">
              <p className="text-sm md:text-lg text-zinc-500 font-medium leading-relaxed max-w-2xl">
                {faq.answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="relative py-24 md:py-40 bg-porcelain-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          
          {/* LEFT COLUMN: Heading & Moved CTA Card */}
          <div className="lg:col-span-4 flex flex-col">
            <div className="sticky top-40">
                <SectionLabel number="07" title="FAQ" />
                <h2 className="text-4xl md:text-6xl font-display font-medium uppercase tracking-tighter mt-6 leading-none text-onyx">
                  THE <span className="font-serif italic font-normal text-accent">Details.</span>
                </h2>
                <p className="mt-8 text-xs md:text-sm font-medium text-zinc-400 leading-relaxed max-w-70 uppercase tracking-widest">
                  A few things worth knowing before we build together.
                </p>

                {/* MOVED CTA CARD: Vertical Layout */}
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="mt-12 p-8 rounded-4xl bg-white border border-black/3 shadow-xl shadow-black/2 flex flex-col gap-6"
                >
                  <div className="flex flex-col gap-2">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-accent flex items-center justify-center">
                        <Send size={18} />
                    </div>
                    <h4 className="text-base font-bold text-onyx uppercase tracking-tight mt-2">Still have questions?</h4>
                    <p className="text-xs text-zinc-400 leading-relaxed">
                        Tell me what you're trying to build, and we'll figure out the right way to approach it.
                    </p>
                  </div>
                  
                  <a 
                    href="mailto:mohammed@example.com"
                    className="w-full py-4 bg-onyx text-white rounded-full text-[10px] font-bold uppercase tracking-[0.2em] text-center hover:bg-accent transition-all shadow-lg active:scale-95"
                  >
                    LET'S TALK<ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </motion.div>
            </div>
          </div>

          {/* RIGHT COLUMN: FAQ List */}
          <div className="lg:col-span-8 pt-2">
            <div className="border-t border-black/5">
              {FAQS.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  faq={faq} 
                  isOpen={openIndex === index}
                  toggle={() => setOpenIndex(openIndex === index ? -1 : index)}
                />
              ))}
            </div>

            {/* Bottom visual filler to balance the left sticky column */}
            <div className="mt-10 opacity-[0.06] font-display text-[10vw] font-bold uppercase leading-none select-none pointer-events-none">
                Questions
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}