import { useState } from 'react';
import { Sparkles, HelpCircle, ArrowRight, ShieldCheck, Heart, Clock, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface SmileQuizProps {
  onSelectedTreatment: (treatName: string) => void;
}

export default function SmileQuiz({ onSelectedTreatment }: SmileQuizProps) {
  const [activeStep, setActiveStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [finished, setFinished] = useState(false);

  const questions = [
    {
      id: 'target',
      question: 'What is your absolute highest priority smile objective?',
      options: [
        { label: 'Brilliant shade whitening', value: 'whitening', desc: 'Lighten years of organic mineral staining' },
        { label: 'Aligned orthodontic symmetry', value: 'aligners', desc: 'Adjust overlapping teeth or closing spacing gaps' },
        { label: 'Reshape chipped or worn teeth', value: 'veneers', desc: 'Apply hand-milled Swiss porcelain veneers' },
        { label: 'Safe dental pain alleviation', value: 'emergency', desc: 'Triage active toothaches or old damage' }
      ]
    },
    {
      id: 'comfort',
      question: 'Define your personal clinical dental comfort preference:',
      options: [
        { label: 'VIP Lounge serenity & aromatherapy', value: 'relax', desc: 'Standard clinical care surrounded by luxury environment' },
        { label: 'Conscious laughing-gas sedation', value: 'sedation', desc: 'Gentle nitrous oxide to soothe baseline dental anxiety' },
        { label: 'Comprehensive sleep twilight sedation', value: 'sleep', desc: 'Full intravenous clinical sleep' }
      ]
    },
    {
      id: 'timeline',
      question: 'What is your desired cosmetic turnaround timeline?',
      options: [
        { label: 'Immediate radiance (Single Session)', value: 'fast', desc: 'Teeth whitening or minor bonding' },
        { label: 'Premium results in 2 visits (10 days)', value: 'mid', desc: 'Signature Porcelain Veneers masterwork' },
        { label: 'Gradual, invisible alignment (6-12 months)', value: 'long', desc: 'Custom clear Invisalign aligner therapy' }
      ]
    }
  ];

  const handleSelectOption = (value: string) => {
    const activeQ = questions[activeStep];
    setAnswers((prev) => ({ ...prev, [activeQ.id]: value }));

    if (activeStep < questions.length - 1) {
      setActiveStep((prev) => prev + 1);
    } else {
      setFinished(true);
    }
  };

  const getCalculationResult = () => {
    const targetObj = answers['target'];
    const timelineObj = answers['timeline'];

    if (targetObj === 'emergency') {
      return {
        name: 'Priority Emergency Dental Care',
        match: 'Priority Same-day Triage',
        why: 'Based on active discomfort indicators, we recommend direct emergency mapping. Dr. Marcus Vance will immediately diagnose and contain pain within minutes of arrival.'
      };
    }

    if (targetObj === 'whitening' || timelineObj === 'fast') {
      return {
        name: 'Precision Teeth Whitening',
        match: 'Laser teeth whitening',
        why: 'To achieve immediate, stunning shade brightness safely in under an hour, our signature Accel-Laser bleaching overlay is your perfect treatment pathway.'
      };
    }

    if (targetObj === 'aligners' || timelineObj === 'long') {
      return {
        name: 'Invisalign® Clear Aligners',
        match: 'Progressive Clear Orthodontics',
        why: 'To adjust spacing gaps and overlapping dental arches invisibly without metal brackets, our Invisalign polymer aligner track coordinates with your luxury active schedule.'
      };
    }

    return {
      name: 'Signature Porcelain Veneers',
      match: 'porcelain veneers',
      why: 'To reshape chip errors, internal discoloration, and misalignment completely in under 10 days, Dr. Alexander Mercer&rsquo;s custom E.max porcelain veneers deliver your ultimate smile target.'
    };
  };

  const recommendation = finished ? getCalculationResult() : null;

  const handleResetQuiz = () => {
    setAnswers({});
    setActiveStep(0);
    setFinished(false);
  };

  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-950 border-t border-slate-100 dark:border-slate-850/50 transition-colors duration-300 text-left">
      <div className="max-w-4xl mx-auto px-6">
        
        {/* Card wrapper */}
        <div className="p-8 sm:p-10 rounded-[2.5rem] bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800/80 shadow-sm relative overflow-hidden min-h-[450px] flex flex-col justify-between">
          
          <AnimatePresence mode="wait">
            {!finished ? (
              /* Questions Loop animation */
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6 flex-1 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-sans text-[10px] uppercase tracking-widest text-blue-600 dark:text-blue-400 font-bold">
                      Smile Harmonization Diagnosis
                    </span>
                    <span className="font-mono text-[9px] text-slate-400">
                      Step {activeStep + 1} of {questions.length}
                    </span>
                  </div>

                  <h3 className="font-serif text-2xl font-normal text-slate-900 dark:text-white leading-tight">
                    {questions[activeStep].question}
                  </h3>

                  {/* Options List */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    {questions[activeStep].options.map((opt) => (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => handleSelectOption(opt.value)}
                        className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200/40 dark:border-slate-800/40 text-left hover:border-blue-500 hover:shadow-md transition duration-300 flex flex-col justify-between group outline-none cursor-pointer"
                      >
                        <span className="font-sans text-xs font-semibold text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">
                          {opt.label}
                        </span>
                        <span className="font-sans text-[10px] text-slate-400 dark:text-slate-500 mt-1 lines-clamp-2 leading-relaxed font-light">
                          {opt.desc}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Bottom step gauges */}
                <div className="pt-6 border-t border-slate-100 dark:border-slate-850 flex items-center justify-between text-slate-400 font-mono text-[9px] mt-6">
                  <span>Privacy Charter protected</span>
                  <div className="flex space-x-1.5 font-sans font-light">
                    {[...Array(questions.length)].map((_, i) => (
                      <div
                        key={i}
                        className={`w-4 h-1.5 rounded transition ${
                          i === activeStep ? 'bg-blue-600' : 'bg-slate-200 dark:bg-slate-800'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            ) : (
              /* Recommendation Screen */
              <motion.div
                key="finished"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-6 text-center flex-1 flex flex-col justify-between items-center py-4"
              >
                <div className="space-y-3 max-w-md">
                  <div className="w-12 h-12 rounded-full bg-blue-550/10 text-blue-600 flex items-center justify-center mx-auto border border-blue-500/20">
                    <CheckCircle className="w-6 h-6 animate-pulse" />
                  </div>
                  <div>
                    <span className="font-sans text-[10px] uppercase tracking-widest text-emerald-600 font-bold block">
                      Aesthetic Diagnostic complete
                    </span>
                    <h3 className="font-serif text-3xl font-normal text-slate-900 dark:text-white mt-1">
                      Your Customized Treatment Route
                    </h3>
                  </div>
                </div>

                {/* Result Recommendation Badge card */}
                <div className="w-full max-w-xl rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200/40 p-6 space-y-4 text-left shadow-sm">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[8px] uppercase tracking-[0.25em] text-slate-400 font-bold">
                      AURA CLINICAL MATCH
                    </span>
                    <span className="inline-flex items-center space-x-1 font-mono text-[9px] uppercase tracking-wider font-bold text-blue-600 dark:text-blue-400">
                      <Sparkles className="w-3 h-3" />
                      <span>98% Compatibility</span>
                    </span>
                  </div>

                  <div>
                    <h4 className="font-sans text-sm font-semibold text-slate-900 dark:text-white">
                      {recommendation?.name}
                    </h4>
                    <p className="font-sans text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed font-light">
                      {recommendation?.why}
                    </p>
                  </div>
                </div>

                {/* CTAs trigger */}
                <div className="flex flex-col sm:flex-row gap-3 w-full max-w-md pt-4">
                  <button
                    onClick={() => onSelectedTreatment(recommendation?.name || '')}
                    className="flex-1 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-sans text-xs font-bold uppercase tracking-widest transition flex items-center justify-center space-x-2 shadow-md hover:scale-[1.02] cursor-pointer"
                  >
                    <span>Adopt Match & Book Slot</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={handleResetQuiz}
                    className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 font-sans text-xs font-bold uppercase tracking-widest transition hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                  >
                    Retake Quiz
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>
    </section>
  );
}
