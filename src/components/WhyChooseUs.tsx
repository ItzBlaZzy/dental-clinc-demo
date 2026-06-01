import { useState } from 'react';
import { COMFORT_EQUIPMENT, VIRTUAL_ROOMS } from '../data';
import { ShieldCheck, Heart, Cpu, Sparkles, Navigation } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function WhyChooseUs() {
  const [activeRoomIdx, setActiveRoomIdx] = useState(0);

  const pillars = [
    {
      title: 'Aesthetic Masters',
      desc: 'Our clinicians are globally accredited by cosmetic academies, sculpting teeth as architectural art structures.',
      icon: Sparkles,
      color: 'text-amber-500'
    },
    {
      title: 'Pain-Free Sedation Suites',
      desc: 'Computerized local injections and twilight sedation eliminate dental phobias entirely.',
      icon: Heart,
      color: 'text-rose-500 font-bold'
    },
    {
      title: 'Next-Gen 3D Technologies',
      desc: 'From intraoral scans to hydro-lasers that replace legacy grinding drills, we operate at clinical limits.',
      icon: Cpu,
      color: 'text-sky-505'
    },
    {
      title: 'Ultra-Sterile Safety standard',
      desc: 'Class-B double vacuum autoclave sterilization and advanced clean air systems validate patient security.',
      icon: ShieldCheck,
      color: 'text-emerald-500'
    }
  ];

  return (
    <section id="whyus" className="py-24 bg-white dark:bg-slate-900 transition-colors duration-300 relative">
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-blue-200/5 dark:bg-blue-400/5 blur-3xl rounded-full" />
      
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-end mb-16">
          <div className="text-left space-y-4">
            <div className="inline-flex items-center space-x-2 px-4 py-1.5 bg-blue-50 text-blue-700 text-[10px] font-bold uppercase tracking-widest rounded-full border border-blue-100 dark:bg-blue-900/20 dark:border-blue-900/40 dark:text-blue-400">
              <Cpu className="w-3.5 h-3.5 text-blue-600" />
              <span className="tracking-widest font-semibold">Excellence Pillars</span>
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl font-normal tracking-tight text-slate-900 dark:text-white leading-[1.15]">
              The Gold Standard <br />of Modern Dentistry
            </h2>
          </div>
          <p className="font-sans text-slate-500 dark:text-slate-400 text-base max-w-lg lg:justify-self-end text-left leading-relaxed font-light">
            Legacy dental clinics provoke anxiety with loud drill sounds, cold metal tools, and slow turnarounds. Aeterna was created because we believe medical mastery deserves an ultra-luxurious, calming architectural environment.
          </p>
        </div>

        {/* Bento Trust Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800/80 text-left cursor-default hover:bg-slate-100/50 dark:hover:bg-slate-900/40 transition-colors"
                id={`pillar-${idx}`}
              >
                <div className={`p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 text-blue-600 dark:text-blue-400 inline-block mb-4 shadow-sm`}>
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-sans text-base font-semibold text-slate-900 dark:text-white mb-2">
                  {pillar.title}
                </h3>
                <p className="font-sans text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-light">
                  {pillar.desc}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* 3D Walkthrough Showcase & Tech Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start pt-12 border-t border-slate-100 dark:border-slate-850">
          
          {/* Interactive Room Tour (LHS) */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div>
              <span className="font-mono text-[9px] uppercase tracking-widest text-blue-650 dark:text-blue-400 font-bold block mb-1">
                Virtual Walkthrough
              </span>
              <h3 className="font-serif text-2xl font-normal text-slate-900 dark:text-white">
                Step Inside our Sanctuary
              </h3>
            </div>

            {/* Tour Tabs Selection */}
            <div className="flex flex-wrap gap-2.5">
              {VIRTUAL_ROOMS.map((room, i) => (
                <button
                  key={room.id}
                  onClick={() => setActiveRoomIdx(i)}
                  className={`px-4 py-2 rounded-xl font-sans text-[10px] font-bold uppercase tracking-wider transition-all border ${
                    activeRoomIdx === i
                      ? 'bg-slate-900 border-slate-900 dark:bg-white dark:border-white text-white dark:text-slate-950 font-bold shadow-md'
                      : 'border-slate-200 hover:bg-slate-100 bg-white text-slate-500 dark:bg-slate-950 dark:border-slate-800 dark:hover:bg-slate-900'
                  }`}
                >
                  {room.name.split('The ')[1] || room.name}
                </button>
              ))}
            </div>

            {/* Active Room details */}
            <div className="relative rounded-3xl overflow-hidden aspect-[16/9] border-4 border-slate-50 dark:border-slate-933 shadow-lg group">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeRoomIdx}
                  src={VIRTUAL_ROOMS[activeRoomIdx].image}
                  alt={VIRTUAL_ROOMS[activeRoomIdx].name}
                  initial={{ opacity: 0, scale: 1.02 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </AnimatePresence>
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent p-6 text-white text-left z-20">
                <span className="inline-flex items-center space-x-1.5 px-2 py-0.5 rounded bg-blue-600/20 backdrop-blur-md border border-blue-500/30 font-mono text-[9px] uppercase tracking-wide text-blue-300 font-bold mb-1.5">
                  <Navigation className="w-2.5 h-2.5 fill-blue-400 text-blue-400" />
                  <span>{VIRTUAL_ROOMS[activeRoomIdx].highlight}</span>
                </span>
                <p className="font-sans text-xs text-slate-200 mt-1 leading-relaxed max-w-xl font-light">
                  {VIRTUAL_ROOMS[activeRoomIdx].description}
                </p>
              </div>
            </div>
          </div>

          {/* Micro equipment focus (RHS) */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <div>
              <span className="font-mono text-[9px] uppercase tracking-widest text-blue-600 dark:text-blue-400 font-bold block mb-1">
                Precision Equipment
              </span>
              <h3 className="font-serif text-2xl font-normal text-slate-900 dark:text-white">
                Anxiety-Free Ecosystem
              </h3>
            </div>

            <div className="space-y-4">
              {COMFORT_EQUIPMENT.map((tech) => (
                <div 
                  key={tech.name}
                  className="p-4 rounded-3xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800/80 flex flex-col justify-between"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-sans text-sm font-semibold text-slate-900 dark:text-white">
                        {tech.name}
                      </h4>
                      <p className="font-mono text-[9px] uppercase tracking-wide text-blue-600 dark:text-blue-400 font-bold leading-tight mt-0.5">
                        {tech.role}
                      </p>
                    </div>
                  </div>
                  <p className="font-sans text-slate-500 dark:text-slate-400 text-xs mt-2 leading-relaxed font-light">
                    {tech.details}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
