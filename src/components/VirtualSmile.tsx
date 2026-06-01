import React, { useState } from 'react';
import { Sparkles, Cpu, Upload, ClipboardCheck, ArrowRight, ShieldCheck, RefreshCw } from 'lucide-react';
import { motion } from 'motion/react';

export default function VirtualSmile() {
  const [concern, setConcern] = useState('Mild discoloration from coffee & slightly overlapping front incisors');
  const [outcome, setOutcome] = useState('Perfect pearlescent white shade & completely aligned symmetry');
  const [treatment, setTreatment] = useState('Porcelain Veneers');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const sampleConcerns = [
    { label: 'Uneven Gaps', interest: 'Invisalign Aligners', desc: 'Spacing issues on upper row', out: 'Zero gaps' },
    { label: 'Organic Tint', interest: 'Precision Teeth Whitening', desc: 'Dark yellow enamel stains', out: 'Immediate shade improvement' },
    { label: 'Chipped Incisor', interest: 'Porcelain Veneers', desc: 'A worn down, chipped left incisor', out: 'Symmetric hand-milled smile' },
  ];

  const handleRunAnalysis = async () => {
    if (!concern || !outcome) return;
    setLoading(true);
    setResult(null);

    try {
      const response = await fetch('/api/smile-analysis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          concern: concern,
          desiredOutcome: outcome,
          treatmentPreference: treatment,
        }),
      });
      const data = await response.json();
      setResult(data.analysis || data.error);
    } catch (e) {
      console.error(e);
      setResult("### Standard Consultation Recommendation\nWe recommend booking a live diagnostics session. Dr. Alexander Mercer will craft a real-time digital blueprint of your teeth, mapping exact orthodontic parameters.");
    } finally {
      setLoading(false);
    }
  };

  const applySample = (sample: typeof sampleConcerns[0]) => {
    setConcern(sample.desc);
    setOutcome(sample.out);
    setTreatment(sample.interest);
    setResult(null);
  };

  // Safe and beautiful markdown formatter to prevent typography library crashes
  const renderFormattedReport = (rawText: string) => {
    return rawText.split('\n').map((paragraph, idx) => {
      const trimmed = paragraph.trim();
      if (!trimmed) return <div key={idx} className="h-2" />;
      
      if (trimmed.startsWith('###') || trimmed.startsWith('##') || trimmed.startsWith('1.') || trimmed.startsWith('2.') || trimmed.startsWith('3.')) {
        return (
          <h4 key={idx} className="font-sans text-xs font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400 mt-6 mb-2 border-b border-slate-100 dark:border-slate-800 pb-1.5 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-500 shrink-0" />
            <span>{trimmed.replace(/[#*123.]/g, '').trim()}</span>
          </h4>
        );
      }
      
      if (trimmed.startsWith('-') || trimmed.startsWith('*')) {
        return (
          <div key={idx} className="flex items-start space-x-2.5 my-1.5 pl-2 leading-relaxed">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-505 shrink-0 mt-2" />
            <p className="font-sans text-xs text-slate-650 dark:text-slate-350">{trimmed.replace(/^[-\*\s]+/, '').trim()}</p>
          </div>
        );
      }

      // Handle bold words
      let content: React.ReactNode = trimmed;
      if (trimmed.includes('**')) {
        const parts = trimmed.split('**');
        content = parts.map((part, i) => i % 2 === 1 ? <strong key={i} className="font-bold text-slate-900 dark:text-white">{part}</strong> : part);
      }

      return (
        <p key={idx} className="font-sans text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-3">
          {content}
        </p>
      );
    });
  };

  return (
    <section id="virtual-smile" className="py-24 bg-white dark:bg-slate-900 border-y border-slate-100 dark:border-slate-850/50 transition-colors duration-300 overflow-hidden relative">
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-blue-400/5 dark:bg-blue-500/5 blur-3xl rounded-full" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 bg-blue-50 text-blue-700 text-[10px] font-bold uppercase tracking-widest rounded-full border border-blue-100 dark:bg-blue-900/20 dark:border-blue-900/40 dark:text-blue-400">
            <Cpu className="w-3.5 h-3.5 text-blue-600" />
            <span className="tracking-widest font-semibold font-sans">AI Medical Simulation</span>
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl font-normal tracking-tight text-slate-900 dark:text-white leading-tight">
            Virtual Smile Studio
          </h2>
          <p className="font-sans text-slate-500 dark:text-slate-400 text-base max-w-lg mx-auto font-light leading-relaxed">
            Get instant dental advice directly from Dr. Mercer’s AI counterpart. Highlight your cosmetic targets and receive a personalized restyling blueprint instantly.
          </p>
        </div>

        {/* Dynamic Studio Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Controls Side (LHS) */}
          <div className="lg:col-span-6 p-6 sm:p-8 rounded-[2rem] bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800/80 flex flex-col justify-between text-left">
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="font-sans text-xs font-bold uppercase tracking-wider text-slate-500">
                  Configure Smile Objectives
                </span>
                <span className="inline-flex items-center space-x-1 font-mono text-[9px] text-blue-600 uppercase tracking-widest font-bold">
                  <Sparkles className="w-3 h-3 animate-spin-slow" />
                  <span>Gemini 3.5 Engine</span>
                </span>
              </div>

              {/* Sample Quick-starts */}
              <div className="space-y-2 mb-6">
                <p className="font-sans text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                  Pre-load Clinical Scenarios
                </p>
                <div className="flex flex-wrap gap-2">
                  {sampleConcerns.map((sample) => (
                    <button
                      key={sample.label}
                      onClick={() => applySample(sample)}
                      className="px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 bg-white text-[10px] font-sans font-medium text-slate-700 hover:border-slate-300 dark:bg-slate-900 dark:border-slate-800 dark:hover:bg-slate-800 dark:text-slate-300 dark:hover:border-slate-700 transition cursor-pointer"
                    >
                      {sample.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Treatment Type Picker */}
              <div className="space-y-2 mb-4">
                <label className="font-sans text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                  Target Cosmetic Therapy
                </label>
                <select
                  value={treatment}
                  onChange={(e) => setTreatment(e.target.value)}
                  className="w-full p-3 rounded-lg text-xs font-sans font-bold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 outline-none focus:border-blue-500 cursor-pointer"
                >
                  <option value="Porcelain Veneers">Porcelain Veneers</option>
                  <option value="Invisalign Aligners">Invisalign® Aligners</option>
                  <option value="Precision Teeth Whitening">Precision Teeth Whitening</option>
                  <option value="Aesthetic Bonding">Aesthetic Resin Bonding</option>
                </select>
              </div>

              {/* Current Dental Concern */}
              <div className="space-y-2 mb-4">
                <label className="font-sans text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                  Clinical Concern / Discontent
                </label>
                <textarea
                  rows={3}
                  value={concern}
                  onChange={(e) => setConcern(e.target.value)}
                  placeholder="Describe teeth alignment, gaps, chips, or discoloration..."
                  className="w-full p-3.5 rounded-xl text-xs font-sans bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-850 text-slate-800 dark:text-slate-200 outline-none focus:border-blue-500 leading-relaxed resize-none"
                />
              </div>

              {/* Desired Smile Outcome */}
              <div className="space-y-2 mb-6">
                <label className="font-sans text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                  Ideal Aesthetic Outcome Target
                </label>
                <input
                  type="text"
                  value={outcome}
                  onChange={(e) => setOutcome(e.target.value)}
                  placeholder="e.g. Natural white symmetry, closure of gap..."
                  className="w-full p-3.5 rounded-xl text-xs font-sans bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-850 text-slate-800 dark:text-slate-200 outline-none focus:border-blue-500"
                />
              </div>
            </div>

            {/* Submit Trigger */}
            <button
              onClick={handleRunAnalysis}
              disabled={loading}
              className="w-full py-4 rounded-xl bg-blue-600 hover:bg-blue-700 outline-none text-white font-sans text-xs font-bold uppercase tracking-widest transition shadow-lg flex items-center justify-center space-x-2.5 disabled:bg-slate-300 dark:disabled:bg-slate-800 disabled:text-slate-500 active:scale-98 cursor-pointer"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Structuring Custom Radiance Blueprint...</span>
                </>
              ) : (
                <>
                  <ClipboardCheck className="w-4 h-4" />
                  <span>Run AI Smile Blueprint Analysis</span>
                </>
              )}
            </button>
          </div>

          {/* Results Side (RHS) */}
          <div className="lg:col-span-6 p-6 sm:p-8 rounded-[2rem] bg-white dark:bg-slate-950 border border-slate-200/50 dark:border-slate-800/40 shadow-sm flex flex-col justify-between items-stretch relative min-h-[350px]">
            {loading ? (
              <div className="flex-1 flex flex-col items-center justify-center space-y-4">
                <div className="relative">
                  <div className="w-12 h-12 border-4 border-blue-200 dark:border-blue-900 border-t-blue-600 rounded-full animate-spin" />
                  <Cpu className="absolute inset-0 m-auto w-5 h-5 text-blue-600 animate-pulse" />
                </div>
                <div className="text-center space-y-1">
                  <p className="font-sans text-xs font-bold text-slate-800 dark:text-slate-200">
                    Consulting Dr. Mercer’s Aesthetic Logic...
                  </p>
                  <p className="font-mono text-[9px] text-slate-400 uppercase tracking-widest">
                    Analyzing bite geometry & shade overlays
                  </p>
                </div>
              </div>
            ) : result ? (
              <div className="flex-1 flex flex-col justify-between text-left">
                {/* Dynamic Content */}
                <div className="mb-6 max-w-full overflow-hidden">
                  <div className="flex items-center space-x-2 mb-4 px-3 py-1.5 rounded-lg bg-blue-500/5 border border-blue-400/10 inline-flex">
                    <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                    <span className="font-mono text-[9px] uppercase tracking-widest font-extrabold text-blue-700 dark:text-blue-400">
                      Bespoke Strategic Assessment
                    </span>
                  </div>
                  <div className="space-y-1 pr-1 max-h-[380px] overflow-y-auto custom-scrollbar">
                    {renderFormattedReport(result)}
                  </div>
                </div>

                {/* Reset Trigger */}
                <div className="pt-4 border-t border-slate-100 dark:border-slate-850 flex items-center justify-between">
                  <span className="font-mono text-[9px] text-slate-400">
                    Outcome simulated on real diagnostic specs.
                  </span>
                  <button
                    onClick={() => setResult(null)}
                    className="p-1 px-3.5 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900 border border-slate-200/50 dark:border-slate-800 text-[10px] font-sans font-bold text-slate-500 hover:text-slate-800 uppercase tracking-wider flex items-center space-x-1.5 transition cursor-pointer"
                  >
                    <span>Reset Analyzer</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4 px-6">
                <div className="p-4 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800">
                  <Cpu className="w-8 h-8 text-slate-400 dark:text-slate-500" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-sans text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                    Diagnostic Model Awaiting Input
                  </h3>
                  <p className="font-sans text-slate-400 dark:text-slate-500 text-xs max-w-sm leading-relaxed font-light">
                    Select a treatment, define your dental concerns on the left controller, and click &ldquo;Run AI Smile Blueprint&rdquo; to model your transformation strategy.
                  </p>
                </div>
                
                {/* Visual Bullet indicators of safety */}
                <div className="grid grid-cols-2 gap-3 w-full max-w-sm pt-4 border-t border-slate-100 dark:border-slate-850">
                  <div className="flex items-center space-x-1.5 text-slate-400">
                    <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                    <span className="font-sans text-[8px] uppercase font-bold tracking-wider">Secure Mapping</span>
                  </div>
                  <div className="flex items-center space-x-1.5 text-slate-400">
                    <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                    <span className="font-sans text-[8px] uppercase font-bold tracking-wider">Clinical Guidance</span>
                  </div>
                </div>
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
