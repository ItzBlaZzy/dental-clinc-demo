import React, { useState } from 'react';
import { CLINIC_SERVICES } from '../data';
import { ServiceItem } from '../types';
import { 
  Sparkles, Award, Layers, Activity, ShieldAlert, Sun, Smile, 
  HeartHandshake, ChevronRight, X, Clock, Banknote, ShieldCheck 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const ICON_MAP: Record<string, React.ComponentType<any>> = {
  Sparkles: Sparkles,
  Award: Award,
  Layers: Layers,
  Activity: Activity,
  ShieldAlert: ShieldAlert,
  Sun: Sun,
  Smile: Smile,
  HeartHandshake: HeartHandshake,
};

interface ServicesProps {
  onBookClick: (preselectedService?: string) => void;
}

export default function Services({ onBookClick }: ServicesProps) {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  return (
    <section id="services" className="py-24 bg-white dark:bg-slate-900 transition-colors duration-300 relative">
      <div className="absolute top-10 left-10 w-96 h-96 bg-blue-200/5 dark:bg-blue-550/5 blur-3xl rounded-full" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 bg-blue-50 text-blue-700 text-[10px] font-bold uppercase tracking-widest rounded-full border border-blue-100 dark:bg-blue-900/20 dark:border-blue-900/40 dark:text-blue-400">
            <Award className="w-3.5 h-3.5" />
            <span className="font-sans text-[10px] uppercase tracking-wider font-semibold">Specialized Clinicians</span>
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl font-normal tracking-tight text-slate-900 dark:text-white">
            Our Specialties
          </h2>
          <p className="font-sans text-slate-550 dark:text-slate-400 text-base max-w-lg mx-auto font-light leading-relaxed">
            Every smile has its own unique biology and aesthetic character. We employ advanced micro-prosthetics and dental lasers to deliver pristine dental restoration.
          </p>
        </div>

        {/* Services Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {CLINIC_SERVICES.map((service, idx) => {
            const IconComponent = ICON_MAP[service.icon] || Sparkles;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className="group relative flex flex-col justify-between p-6 rounded-3xl bg-slate-50 dark:bg-slate-950 border border-slate-200/40 dark:border-slate-800/40 hover:border-blue-500/30 hover:shadow-lg transition-all h-full"
              >
                <div>
                  {/* Category Badge & Icon */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/55 text-blue-600 dark:text-blue-400 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <span className="font-mono text-[8px] uppercase tracking-widest px-2.5 py-1 rounded-md bg-slate-200/50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 font-semibold font-mono">
                      {service.category}
                    </span>
                  </div>

                  {/* Service Text */}
                  <h3 className="font-sans text-base font-semibold text-slate-850 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {service.name}
                  </h3>
                  <p className="font-sans text-slate-500 dark:text-slate-400 text-xs mt-2 line-clamp-3 leading-relaxed">
                    {service.description}
                  </p>
                </div>

                {/* Footer specs of the card */}
                <div className="mt-6 pt-4 border-t border-slate-200/50 dark:border-slate-800/50 flex flex-col space-y-3.5">
                  <div className="flex items-center justify-between text-[11px] text-slate-400 dark:text-slate-500 font-sans">
                    <span className="flex items-center space-x-1">
                      <Clock className="w-3 h-3 text-blue-555" />
                      <span>{service.duration}</span>
                    </span>
                    <span className="flex items-center space-x-1 font-semibold text-slate-600 dark:text-slate-400">
                      <span>from {service.startingPrice}</span>
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-2.5">
                    <button
                      onClick={() => setSelectedService(service)}
                      className="flex-1 py-2 px-3 rounded-xl text-center font-sans text-[10px] font-bold text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-850 transition-colors text-left uppercase tracking-wider flex items-center justify-between cursor-pointer"
                    >
                      <span>Treatment Info</span>
                      <ChevronRight className="w-3.5 h-3.5 text-blue-600" />
                    </button>
                    <button
                      onClick={() => onBookClick(service.name)}
                      className="p-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white transition-colors cursor-pointer"
                      aria-label={`Book ${service.name} directly`}
                    >
                      <Clock className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Details drawer model */}
      <AnimatePresence>
        {selectedService && (
          <div className="fixed inset-0 z-50 flex items-center justify-end">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedService(null)}
              className="absolute inset-0 bg-slate-950/40 backdrop-blur-sm"
            />

            {/* Slider Sheet */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 24, stiffness: 180 }}
              className="relative w-full max-w-lg h-full bg-white dark:bg-slate-950 shadow-2xl p-8 flex flex-col justify-between overflow-y-auto"
            >
              <div>
                {/* Header info */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-850 mb-6">
                  <span className="font-mono text-[9px] uppercase tracking-[0.2em] font-bold text-blue-600 dark:text-blue-400">
                    Clinical Insights
                  </span>
                  <button
                    onClick={() => setSelectedService(null)}
                    className="p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-900 text-slate-400 dark:text-slate-500"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Main Body */}
                <div className="space-y-6">
                  <h3 className="font-serif text-2xl font-normal text-slate-900 dark:text-white">
                    {selectedService.name}
                  </h3>

                  <div className="flex gap-4 font-mono text-[11px] bg-slate-50 dark:bg-slate-900 p-3.5 rounded-xl border border-slate-100 dark:border-slate-850">
                    <div className="space-y-1">
                      <span className="text-slate-400 block uppercase tracking-wide">Estimate Time</span>
                      <span className="text-slate-800 dark:text-slate-200 font-bold flex items-center space-x-1.5">
                        <Clock className="w-3.5 h-3.5 text-blue-600" />
                        <span>{selectedService.duration}</span>
                      </span>
                    </div>
                    <div className="w-px bg-slate-200 dark:bg-slate-800" />
                    <div className="space-y-1">
                      <span className="text-slate-400 block uppercase tracking-wide">Base Price</span>
                      <span className="text-slate-850 dark:text-slate-200 font-bold flex items-center space-x-1.5">
                        <Banknote className="w-3.5 h-3.5 text-emerald-500" />
                        <span>{selectedService.startingPrice} onwards</span>
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-sans text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                      Medical Classification
                    </h4>
                    <p className="font-sans text-sm text-slate-605 dark:text-slate-305 leading-relaxed">
                      {selectedService.longDescription}
                    </p>
                  </div>

                  {/* Highlights Bullet-list */}
                  <div className="space-y-3 pt-2">
                    <h4 className="font-sans text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                      Key Clinical Deliverables
                    </h4>
                    <ul className="space-y-2">
                      {selectedService.benefits.map((benefit, i) => (
                        <li key={i} className="flex items-start space-x-2.5">
                          <div className="p-1 rounded-full bg-emerald-500/10 text-emerald-500 flex-shrink-0 mt-0.5">
                            <ShieldCheck className="w-3.5 h-3.5" />
                          </div>
                          <span className="font-sans text-xs text-slate-600 dark:text-slate-350">
                            {benefit}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Action Trigger in Drawer */}
              <div className="pt-6 border-t border-slate-100 dark:border-slate-855 mt-10">
                <button
                  onClick={() => {
                    const serName = selectedService.name;
                    setSelectedService(null);
                    onBookClick(serName);
                  }}
                  className="w-full py-4 rounded-xl bg-blue-600 border border-blue-600 hover:bg-blue-700 hover:border-blue-750 text-white font-sans text-xs font-bold uppercase tracking-widest text-center transition-all flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <Clock className="w-4 h-4" />
                  <span>Reserve Treatment Spot</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
