import { useState } from 'react';
import { CLINIC_FAQS } from '../data';
import { HelpCircle, ChevronDown, ChevronUp, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Faq() {
  const [openFaqId, setOpenFaqId] = useState<string | null>('faq-1');

  const toggleFaq = (id: string) => {
    setOpenFaqId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-950 transition-colors duration-300 relative text-left">
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-blue-200/5 dark:bg-blue-400/5 blur-3xl rounded-full" />
      
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 bg-blue-50 text-blue-700 text-[10px] font-bold uppercase tracking-widest rounded-full border border-blue-100 dark:bg-blue-900/20 dark:border-blue-900/40 dark:text-blue-400">
            <HelpCircle className="w-3.5 h-3.5 text-blue-600" />
            <span className="font-sans tracking-widest font-semibold">
              Information Directory
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-normal tracking-tight text-slate-900 dark:text-white leading-tight">
            Frequently Asked Questions
          </h2>
          <p className="font-sans text-slate-500 dark:text-slate-400 text-sm leading-relaxed text-center font-light">
            Transparency is central to our clinical ethos. Review common questions regarding pricing, materials, comfort, and insurance.
          </p>
        </div>

        {/* Faq List */}
        <div className="space-y-4">
          {CLINIC_FAQS.map((faq) => {
            const isOpen = openFaqId === faq.id;
            return (
              <div
                key={faq.id}
                className="rounded-2xl border border-slate-150 bg-white dark:bg-slate-900/55 shadow-sm transition overflow-hidden"
              >
                {/* Accordion header item */}
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full p-5 sm:p-6 text-left font-sans text-xs sm:text-sm font-semibold text-slate-900 dark:text-white flex justify-between items-center space-x-4 outline-none hover:bg-slate-50/50 dark:hover:bg-slate-900/40 cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="leading-snug">{faq.question}</span>
                  <span className="p-1 px-2.5 rounded-md font-mono text-[9px] uppercase tracking-wide font-extrabold text-blue-600 shrink-0 bg-blue-50 border border-blue-100 dark:bg-blue-950 dark:text-blue-400">
                    {isOpen ? 'Collapse' : 'Expand'}
                  </span>
                </button>

                {/* Animated Accordion contents */}
                {isOpen && (
                  <div className="p-5 sm:p-6 pt-0 border-t border-slate-100 dark:border-slate-850">
                    <p className="font-sans text-xs text-slate-500 dark:text-slate-400 leading-relaxed pt-4 font-light">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Supporting FAQ chatbot hint */}
        <div className="mt-8 p-4 rounded-2xl bg-blue-500/5 border border-blue-400/10 flex items-center justify-between gap-4 flex-col sm:flex-row">
          <div className="flex items-center space-x-3 text-left">
            <div className="p-2 rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400 shrink-0">
              <MessageSquare className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h4 className="font-sans text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider leading-none">
                Have a highly unique clinical inquiry?
              </h4>
              <p className="font-sans text-[11px] text-slate-500 mt-1 font-light">
                Aeterna AI Consultant operates 24/7 on the bottom right corner of this screen to help clear dental goals.
              </p>
            </div>
          </div>
          <span className="font-mono text-[9px] px-3 py-1 uppercase rounded bg-blue-600 dark:bg-blue-500 text-white font-extrabold shrink-0 shadow-sm leading-none">
            AI Assistant Available
          </span>
        </div>

      </div>
    </section>
  );
}
