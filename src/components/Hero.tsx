import { Calendar, Compass, Shield, Award, Sparkles, AlertCircle, Heart } from 'lucide-react';
import { motion } from 'motion/react';

const lobbyImg = '/src/assets/images/premium_dental_lobby_1779977330172.png';


interface HeroProps {
  onBookClick: () => void;
  onExploreClick: () => void;
}

export default function Hero({ onBookClick, onExploreClick }: HeroProps) {
  const stats = [
    { value: '15+', label: 'Years Excellence', icon: Shield },
    { value: '8,000+', label: 'Radiant Smiles', icon: Award },
    { value: '100%', label: 'Painless Focus', icon: Heart },
    { value: '24/7', label: 'Emergency Desks', icon: AlertCircle },
  ];

  return (
    <section className="relative min-h-screen pt-28 pb-16 flex items-center overflow-hidden bg-[#F8FAFC] dark:bg-slate-950 transition-colors duration-300">
      {/* Background visual graphics */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-br from-blue-500/10 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-1/4 h-1/4 bg-blue-500/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Content Column */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-7 text-left">
            
            {/* Elegant luxury badge prefix */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center space-x-2 self-start px-4 py-1.5 bg-blue-50 text-blue-700 text-[10px] font-bold uppercase tracking-widest rounded-full border border-blue-100 dark:bg-blue-900/20 dark:border-blue-900/40 dark:text-blue-400"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span className="tracking-widest font-semibold">
                Redefining Cosmetic Excellence
              </span>
            </motion.div>

            {/* Display Typography Heading */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="space-y-4"
            >
              <h1 className="font-serif text-5xl sm:text-6xl lg:text-[64px] leading-[1.1] text-slate-900 dark:text-white font-normal">
                Confident Smiles <br />
                <span className="italic text-blue-600 dark:text-blue-400">
                  Begin in Serenity.
                </span>
              </h1>
              <p className="font-sans text-slate-500 dark:text-slate-400 text-base lg:text-lg max-w-xl font-light leading-relaxed">
                Welcome to Aeterna Premium Dental — where advanced global cosmetic orthodontics merges with micro-precise painless clinical techniques. We have completely redesigned the dental journey to offer complete comfort, transparent pricing, and world-class beauty.
              </p>
            </motion.div>

            {/* Premium CTA Hooks */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex flex-col sm:flex-row sm:items-center gap-4 pt-2"
            >
              <button
                onClick={onBookClick}
                className="px-8 py-4 bg-blue-600 text-white rounded-2xl font-semibold shadow-lg shadow-blue-200 dark:shadow-none hover:scale-[1.02] active:scale-98 transition-all flex items-center justify-center space-x-2.5 cursor-pointer text-sm"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Priority Consult</span>
              </button>

              <button
                onClick={onExploreClick}
                className="px-8 py-4 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 border border-slate-250 dark:border-slate-800 rounded-2xl font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 hover:scale-[1.02] active:scale-98 transition-all flex items-center justify-center space-x-2 cursor-pointer text-sm"
              >
                <Compass className="w-4 h-4 text-slate-400" />
                <span>Explore Smile Suite</span>
              </button>
            </motion.div>

            {/* Custom Static Metrics Group */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.45 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-6 border-t border-slate-100 dark:border-slate-800/80"
            >
              {stats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div key={stat.label} className="space-y-1">
                    <div className="flex items-center space-x-1.5">
                      <Icon className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      <span className="font-sans text-xl font-bold text-slate-900 dark:text-white">
                        {stat.value}
                      </span>
                    </div>
                    <p className="font-sans text-[10px] text-slate-400 dark:text-slate-500 uppercase tracking-wider font-semibold">
                      {stat.label}
                    </p>
                  </div>
                );
              })}
            </motion.div>

          </div>

          {/* Luxury Frame Image Column */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="lg:col-span-5 relative"
          >
            {/* Visual Glassmorphism Border */}
            <div className="relative rounded-[2.5rem] overflow-hidden border-[8px] border-white dark:border-slate-900 shadow-xl shadow-slate-200/50 dark:shadow-none">
              <img
                src={lobbyImg}
                alt="Aeterna Luxury Lobby"
                className="w-full h-[32rem] sm:h-[36rem] object-cover hover:scale-[1.03] transition-transform duration-1000"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Hovering Glass Overlay Metric: Certified */}
            <div className="absolute -bottom-4 -left-4 bg-white/90 dark:bg-slate-950/90 backdrop-blur-md p-4 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-md flex items-center space-x-3 max-w-[15rem]">
              <div className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 flex-shrink-0">
                <Shield className="w-5 h-5" />
              </div>
              <div className="flex flex-col text-left leading-none">
                <span className="font-sans text-xs font-bold text-slate-900 dark:text-white uppercase tracking-tight">
                  Premium Standard
                </span>
                <span className="font-sans text-[10px] text-slate-400 mt-1.5 dark:text-slate-400 leading-tight">
                  ADA & AACD Clinical Certifications
                </span>
              </div>
            </div>

            {/* Hovering Glass Overlay Metric: Emergency */}
            <div className="absolute -top-4 -right-4 bg-white/90 dark:bg-slate-950/90 backdrop-blur-md p-4 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-md flex items-center space-x-3 max-w-[15rem]">
              <div className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 flex-shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div className="flex flex-col text-left leading-none">
                <span className="font-sans text-xs font-bold text-slate-900 dark:text-white uppercase tracking-tight">
                  VIP Concierge
                </span>
                <span className="font-sans text-[10px] text-slate-400 mt-1.5 dark:text-slate-400 leading-tight">
                  Private single-patient clinical suites
                </span>
              </div>
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
}
