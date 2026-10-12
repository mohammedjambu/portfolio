import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionLabel from "../utils/SectionLabel";
import { Plus, Minus, Send, ArrowUpRight } from "lucide-react";
import MotionButton from "./Extras/MotionButton";

const FAQS = [
  {
    question: "What kind of projects do you work on?",
    answer:
      "I work on custom web experiences, landing pages, e-commerce platforms, business applications, CRM systems, and full-stack products. If it needs thoughtful design and solid engineering, I'm interested.",
  },
  {
    question: "How long does a project usually take?",
    answer:
      "It depends on the scope. A focused landing page may take a couple of weeks, while a larger application can take several weeks or more. After understanding the requirements, I’ll give you a realistic timeline before we start.",
  },
  {
    question: "Do you work with existing designs or products?",
    answer:
      "Absolutely. I can work from an existing design, improve an existing product, or take the project from a blank canvas. The goal is to meet the product where it is and move it forward.",
  },
  {
    question: "Do you offer post-launch support?",
    answer:
      "Yes. I provide 30 days of complimentary hyper-care to ensure everything runs smoothly. I also offer monthly retainers for scaling and continuous feature updates.",
  },
  {
    question: "How do we communicate during the project?",
    answer:
      "You’ll stay involved throughout the process. We’ll align on requirements early, share progress at key milestones, and keep communication clear so there are no surprises at the end.",
  },
];

const AccordionItem = ({ faq, isOpen, toggle, index }) => {
  const questionId = `faq-question-${index}`;
  const answerId = `faq-answer-${index}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 35, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: false, amount: 0.25, margin: "-30px" }}
      transition={{
        duration: 0.65,
        delay: index * 0.06,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="border-b border-border-subtle overflow-hidden transition-colors duration-700"
    >
      <button
        id={questionId}
        type="button"
        aria-expanded={isOpen}
        aria-controls={answerId}
        onClick={toggle}
        className="w-full py-5 sm:py-6 md:py-8 flex items-center justify-between text-left group transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-accent rounded-lg"
      >
        <h3
          className={`text-base sm:text-lg md:text-2xl font-display font-medium uppercase tracking-tight transition-colors duration-500 pr-4 ${
            isOpen ? "text-onyx" : "text-subtle group-hover:text-onyx"
          }`}
        >
          {faq.question}
        </h3>

        <div
          className={`shrink-0 ml-4 p-2 rounded-full border transition-all duration-500 ${
            isOpen
              ? "bg-onyx text-porcelain border-onyx rotate-90"
              : "bg-transparent text-subtle border-border-subtle group-hover:text-onyx group-hover:border-onyx"
          }`}
          aria-hidden="true"
        >
          {isOpen ? <Minus size={16} /> : <Plus size={16} />}
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={answerId}
            role="region"
            aria-labelledby={questionId}
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
          >
            <div className="pb-8 sm:pb-10 pr-4 sm:pr-8 md:pr-12">
              <p className="text-sm md:text-lg text-subtle font-normal leading-relaxed max-w-2xl transition-colors duration-700">
                {faq.answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);

  // Reusable Theme-Aware CTA Card
  const renderCtaCard = () => (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="p-6 sm:p-8 rounded-3xl lg:rounded-4xl bg-surface border border-border-subtle shadow-xl transition-all duration-700 flex flex-col gap-5 sm:gap-6"
    >
      <div className="flex flex-col gap-2">
        <div className="w-10 h-10 rounded-xl bg-accent/10 text-accent flex items-center justify-center transition-colors duration-700">
          <Send size={18} />
        </div>
        <h4 className="text-lg sm:text-xl font-medium text-onyx uppercase mt-4 sm:mt-2 transition-colors duration-700">
          Still have questions?
        </h4>
        <p className="text-xs sm:text-sm text-subtle leading-relaxed transition-colors duration-700">
          Tell me what you're trying to build, and we'll figure out
          the right way to approach it.
        </p>
      </div>

      <MotionButton
        variant="primary"
        size="full"
        href="#contact"
        className="rounded-2xl text-xs font-bold"
        icon={<ArrowUpRight className="w-3.5 h-3.5" />}
      >
        LET'S TALK
      </MotionButton>
    </motion.div>
  );

  return (
    <section
      id="faq"
      className="relative py-20 sm:py-28 md:py-36 bg-porcelain transition-colors duration-700"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-12 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-16 lg:gap-20 xl:gap-24">
          
          {/* LEFT COLUMN: Heading & Desktop Sticky CTA Card */}
          <div className="lg:col-span-4 flex flex-col">
            <div className="lg:sticky lg:top-28 xl:top-36">
              <SectionLabel number="07" title="FAQ" />
              
              <h2 className="text-3xl sm:text-4xl md:text-6xl font-display font-medium uppercase tracking-tight mt-4 sm:mt-6 leading-none text-onyx transition-colors duration-700">
                THE{" "}
                <span className="font-serif italic font-normal text-accent">
                  Details.
                </span>
              </h2>

              <p className="mt-4 sm:mt-6 lg:mt-8 text-xs md:text-base font-mono text-subtle leading-relaxed max-w-72 uppercase tracking-wider transition-colors duration-700">
                A few things worth knowing before we build together.
              </p>

              {/* [AUDIT FIX: DESKTOP ONLY CTA CARD] Hidden on mobile, sticky on desktop */}
              <div className="hidden lg:block mt-8 sm:mt-10 lg:mt-12">
                {renderCtaCard()}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: FAQ List + Mobile CTA Card */}
          <div className="lg:col-span-8 pt-2">
            <div className="border-t border-border-subtle transition-colors duration-700">
              {FAQS.map((faq, index) => (
                <AccordionItem
                  key={index}
                  index={index}
                  faq={faq}
                  isOpen={openIndex === index}
                  toggle={() => setOpenIndex(openIndex === index ? -1 : index)}
                />
              ))}
            </div>

            {/* 
              [AUDIT FIX: MOBILE ONLY CTA CARD]
              Rendered directly after the FAQ questions on mobile viewports (< lg).
            */}
            <div className="block lg:hidden mt-8 sm:mt-10">
              {renderCtaCard()}
            </div>

            {/* Background Watermark (Static fixed text as originally designed) */}
            <div
              aria-hidden="true"
              className="mt-8 sm:mt-10 opacity-[0.06] font-display text-[14vw] sm:text-[12vw] lg:text-[10vw] font-bold uppercase leading-none select-none pointer-events-none text-onyx transition-colors duration-700"
            >
              Questions
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}