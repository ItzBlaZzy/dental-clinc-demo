import { SPECIALIST_DENTISTS } from '../data';
import { Mail, GraduationCap, Award, ShieldCheck, Heart } from 'lucide-react';
import { motion } from 'motion/react';

const doctorMercerImg = '/src/assets/images/smart_dentist_doctor_1779977374707.png';


interface MeetDentistsProps {
  onBookClick: () => void;
}

export default function MeetDentists({ onBookClick }: MeetDentistsProps) {
  return (
    <section id="dentists" className="py-24 bg-white dark:bg-slate-950 border-b border-slate-100 dark:border-slate-850/50 transition-colors duration-300 overflow-hidden text-left">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 bg-blue-50 text-blue-700 text-[10px] font-bold uppercase tracking-widest rounded-full border border-blue-100 dark:bg-blue-900/20 dark:border-blue-900/40 dark:text-blue-400">
            <Award className="w-3.5 h-3.5" />
            <span className="tracking-widest font-semibold font-sans">Specialist Roster</span>
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl font-normal tracking-tight text-slate-900 dark:text-white leading-tight">
            Meet Our Specialists
          </h2>
          <p className="font-sans text-slate-500 dark:text-slate-400 text-base max-w-lg mx-auto font-light leading-relaxed">
            Our surgical and prosthetic experts represent centuries of combined academic and clinical study. We collaborate dynamically to craft your perfect restoration.
          </p>
        </div>

        {/* Dentists Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {SPECIALIST_DENTISTS.map((dentist, idx) => {
            // Map the custom generated image to Mercer
            const finalImage = dentist.id === 'mercer' ? doctorMercerImg : dentist.image;

            return (
              <motion.div
                key={dentist.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="group flex flex-col justify-between rounded-[2rem] bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 hover:shadow-lg transition-all h-full overflow-hidden"
              >
                {/* Photo Header */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
                  <img
                    src={finalImage}
                    alt={dentist.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4 bg-slate-950/70 backdrop-blur-md px-3.5 py-1 rounded-full border border-white/10 text-white font-sans text-[8px] uppercase tracking-wider font-bold">
                    {dentist.experience}
                  </div>
                </div>

                <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-6">
                  {/* Name and Designation */}
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <h3 className="font-sans text-lg font-semibold text-slate-900 dark:text-white">
                        {dentist.name}
                      </h3>
                      <p className="font-sans text-xs font-semibold text-blue-600 dark:text-blue-400 leading-tight">
                        {dentist.role}
                      </p>
                    </div>

                    <p className="font-sans text-xs text-slate-500 dark:text-slate-400 leading-relaxed italic font-light">
                      &ldquo;{dentist.bio}&rdquo;
                    </p>

                    {/* Specialties */}
                    <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800/80">
                      <h4 className="font-sans text-[9px] uppercase tracking-wider text-slate-400 dark:text-slate-500 font-bold">
                        Core Aesthetic Domains
                      </h4>
                      <div className="flex flex-wrap gap-1.5">
                        {dentist.specialties.map((specialty, i) => (
                           <span
                            key={i}
                            className="px-2.5 py-1 rounded bg-white dark:bg-slate-800 text-[10px] font-sans font-medium text-slate-650 dark:text-slate-350 border border-slate-100 dark:border-slate-800"
                          >
                            {specialty}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Credentials / Education */}
                    <div className="space-y-2 pt-2">
                      <h4 className="font-sans text-[9px] uppercase tracking-wider text-slate-400 dark:text-slate-500 font-bold">
                        Professional Credentials
                      </h4>
                      <ul className="space-y-1.5">
                        {dentist.credentials.map((cred, i) => (
                          <li key={i} className="flex items-start space-x-2 text-[10px] text-slate-600 dark:text-slate-400 font-sans font-light">
                            <GraduationCap className="w-3.5 h-3.5 text-blue-500 mt-0.5 shrink-0" />
                            <span>{cred}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Connect Trigger */}
                  <div className="pt-4 border-t border-slate-100 dark:border-slate-800/60 flex items-center gap-3">
                    <button
                      onClick={onBookClick}
                      className="flex-1 py-3 px-4 rounded-xl font-sans text-[10px] font-bold text-center bg-blue-600 border border-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:border-blue-500 dark:text-white dark:hover:bg-blue-600 text-white uppercase tracking-wider shadow-md hover:scale-[1.02] transition-all flex items-center justify-center space-x-1.5 cursor-pointer"
                    >
                      <Heart className="w-3.5 h-3.5" />
                      <span>Request Consult</span>
                    </button>
                    <a
                      href="mailto:operations@aeternadental.com"
                      className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 dark:hover:bg-slate-800 hover:bg-slate-100 text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-colors"
                      title="Send inquiries"
                    >
                      <Mail className="w-4 h-4" />
                    </a>
                  </div>

                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
