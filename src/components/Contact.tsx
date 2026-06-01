import { useState } from 'react';
import { Mail, Phone, Calendar, Clock, MapPin, Compass, ShieldAlert, Sparkles, MessageSquare, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';

export default function Contact() {
  const [activeOffice, setActiveOffice] = useState<'beverly' | 'tribeca'>('beverly');
  const [emergencyPaged, setEmergencyPaged] = useState(false);

  const locations = {
    beverly: {
      address: '9432 Wilshire Blvd, Suite 400, Beverly Hills, CA 90212',
      phone: '+1 (310) 555-8890',
      hours: [
        { days: 'Monday – Friday', hours: '08:00 AM – 06:00 PM' },
        { days: 'Saturday Session', hours: '09:00 AM – 03:00 PM' },
        { days: 'Sunday Callouts', hours: 'Emergency Surgery Line On-Call Only' }
      ],
      pager: 'PAGER-BH-90212'
    },
    tribeca: {
      address: '22 Greenwich St, Fifth Floor, New York, NY 10013',
      phone: '+1 (212) 555-9012',
      hours: [
        { days: 'Monday – Friday', hours: '08:00 AM – 06:00 PM' },
        { days: 'Saturday Session', hours: '09:00 AM – 04:00 PM' },
        { days: 'Sunday Callouts', hours: 'Emergency Surgery Line On-Call Only' }
      ],
      pager: 'PAGER-NY-10013'
    }
  };

  const activeLoc = locations[activeOffice];

  const triggerEmergencyPage = () => {
    setEmergencyPaged(true);
    setTimeout(() => {
      setEmergencyPaged(false);
    }, 6000);
  };

  return (
    <section id="contact" className="py-24 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-850/50 transition-colors duration-300 relative text-left">
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-blue-200/5 dark:bg-blue-400/5 blur-3xl rounded-full" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10 animate-fade-in">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 bg-blue-50 text-blue-700 text-[10px] font-bold uppercase tracking-widest rounded-full border border-blue-100 dark:bg-blue-900/20 dark:border-blue-900/40 dark:text-blue-400">
            <MapPin className="w-3.5 h-3.5 text-blue-600" />
            <span className="font-sans tracking-widest font-semibold">
              Operations Center
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-normal tracking-tight text-slate-900 dark:text-white leading-tight">
            Connect with our Operations Desk
          </h2>
          <p className="font-sans text-slate-500 dark:text-slate-400 text-sm leading-relaxed text-center font-light">
            Coordinate luxury private transport, verify private dental insurance pre-approvals, or request immediate emergency surgical pages instantly.
          </p>
        </div>

        {/* Operating hours & Map Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Working Details side LHS */}
          <div className="lg:col-span-5 flex flex-col justify-between p-6 sm:p-8 rounded-[2rem] bg-slate-50 dark:bg-slate-950 border border-slate-150">
            
            <div className="space-y-6">
              {/* Branch Selector buttons */}
              <div className="flex gap-2">
                {(['beverly', 'tribeca'] as const).map((branch) => (
                  <button
                    key={branch}
                    onClick={() => setActiveOffice(branch)}
                    className={`py-2 px-4 rounded-xl font-sans text-[10px] font-bold uppercase tracking-widest border transition cursor-pointer ${
                      activeOffice === branch
                        ? 'bg-blue-600 border-blue-600 text-white font-bold shadow-sm'
                        : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    {branch === 'beverly' ? 'Beverly Hills Suite' : 'Tribeca Studio'}
                  </button>
                ))}
              </div>

              {/* Physical details block */}
              <div className="space-y-4">
                <div className="flex items-start space-x-3 text-slate-700 dark:text-slate-200">
                  <MapPin className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
                  <div>
                    <h4 className="font-sans text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                      Physical Address
                    </h4>
                    <p className="font-sans text-sm mt-1 leading-relaxed font-light">
                      {activeLoc.address}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 text-slate-700 dark:text-slate-200">
                  <Phone className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
                  <div>
                    <h4 className="font-sans text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                      Operations Dial
                    </h4>
                    <a
                      href={`tel:${activeLoc.phone.replace(/[^0-9+]/g, '')}`}
                      className="font-mono text-sm mt-1 block font-bold text-slate-900 dark:text-slate-100 hover:text-blue-600 transition-colors"
                    >
                      {activeLoc.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-3 text-slate-700 dark:text-slate-200">
                  <Clock className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
                  <div>
                    <h4 className="font-sans text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                      Clinical Operational Schedule
                    </h4>
                    <ul className="space-y-2 mt-2">
                      {activeLoc.hours.map((scheme, i) => (
                        <li key={i} className="flex justify-between gap-4 text-xs font-sans leading-none pb-2 border-b border-slate-200/50 dark:border-slate-800/60 last:border-0 last:pb-0">
                          <span className="text-slate-400 font-light">{scheme.days}</span>
                          <span className="font-semibold text-slate-800 dark:text-slate-300">{scheme.hours}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick action triggers */}
            <div className="pt-6 border-t border-slate-205 dark:border-slate-800 mt-8 space-y-4">
              <div className="flex flex-col sm:flex-row gap-3">
                {/* direct dial */}
                <a
                  href="https://wa.me/18005558662"
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 py-3.5 rounded-xl border border-emerald-500 text-emerald-600 hover:bg-emerald-500/5 dark:text-emerald-400 font-sans text-[10px] font-bold uppercase tracking-wider text-center transition flex items-center justify-center space-x-2"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Priority WhatsApp</span>
                </a>

                {/* Emergency pager */}
                <button
                  onClick={triggerEmergencyPage}
                  className="flex-1 py-3.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-sans text-[10px] font-bold uppercase tracking-wider text-center transition shadow-md flex items-center justify-center space-x-2 border-none outline-none cursor-pointer"
                >
                  <ShieldAlert className="w-3.5 h-3.5 animate-pulse" />
                  <span>Page Emergency Unit</span>
                </button>
              </div>

              {emergencyPaged && (
                <div className="p-3 bg-rose-50 border border-rose-200/40 rounded-xl text-rose-800 flex items-center space-x-2 text-xs">
                  <CheckCircle2 className="w-4 h-4 text-rose-600 shrink-0" />
                  <p className="font-sans font-light">
                    Direct signal dispatched to <strong>{activeLoc.pager}</strong>. An on-call critical care advisor will connect in &lt; 5 mins.
                  </p>
                </div>
              )}
            </div>

          </div>

          {/* Interactive Geographic Map Mock RHS */}
          <div className="lg:col-span-7 bg-slate-50 dark:bg-slate-950 rounded-[2rem] border border-slate-150 overflow-hidden min-h-[400px] relative flex flex-col justify-between">
            <div className="absolute top-4 left-4 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-slate-100 dark:border-slate-800 font-mono text-[9px] uppercase tracking-wider text-slate-500 dark:text-slate-400 font-bold z-20 flex items-center space-x-1.5 shadow-sm">
              <Compass className="w-3 h-3 text-blue-600 animate-spin-slow" />
              <span>Interactive Clinical Road Map</span>
            </div>

            {/* Vector Map Illustration representing clinical intersection */}
            <div className="flex-1 w-full bg-slate-200 dark:bg-slate-900 flex items-center justify-center relative min-h-[300px]">
              
              {/* Abstract cross-streets grid layout */}
              <div className="absolute inset-0 z-0 opacity-40 dark:opacity-20 flex flex-col justify-between py-6">
                <div className="h-0.5 bg-slate-405 dark:bg-slate-700 w-full" />
                <div className="h-0.5 bg-slate-405 dark:bg-slate-700 w-full" />
                <div className="h-0.5 bg-slate-405 dark:bg-slate-700 w-full" />
              </div>
              
              <div className="absolute inset-0 z-0 opacity-40 dark:opacity-20 flex justify-between px-12">
                <div className="w-0.5 bg-slate-405 dark:bg-slate-700 h-full" />
                <div className="w-0.5 bg-slate-405 dark:bg-slate-705 h-full" />
                <div className="w-0.5 bg-slate-405 dark:bg-slate-705 h-full" />
              </div>

              {/* Geographic Compass Mock */}
              <div className="absolute bottom-4 left-4 p-2 bg-white/80 dark:bg-slate-900/85 backdrop-blur-sm border border-slate-100 dark:border-slate-800 rounded-lg text-slate-400">
                <span className="font-mono text-[8px] uppercase font-bold block text-center">N</span>
                <div className="w-6 h-6 border-2 border-slate-300 dark:border-slate-750 rounded-full flex items-center justify-center">
                  <div className="w-3 h-3 bg-blue-600 rounded-full" />
                </div>
              </div>

              {/* Locator beacons relative to active branch selection */}
              <div className="relative z-10">
                <div className="relative flex items-center justify-center w-12 h-12 bg-blue-500/15 text-blue-600 dark:text-blue-450 rounded-full border border-blue-500/30">
                  <div className="absolute w-20 h-20 bg-blue-500/5 rounded-full animate-ping pointer-events-none" />
                  <div className="absolute w-12 h-12 bg-blue-500/20 rounded-full animate-pulse pointer-events-none" />
                  <MapPin className="w-6 h-6 shrink-0 relative transition-transform animate-bounce-slow" />
                </div>
                
                {/* Visual Label tag on the map */}
                <div className="absolute top-14 left-1/2 -translate-x-1/2 bg-slate-950/90 backdrop-blur-md text-white px-3 py-1 text-center leading-none rounded-lg border border-white/10 shadow-md font-sans text-[10px] font-bold uppercase tracking-wider whitespace-nowrap z-20">
                  Aeterna &bull; {activeOffice === 'beverly' ? 'Beverly Hills' : 'Tribeca Office'}
                </div>
              </div>
            </div>

            {/* Map footer directions */}
            <div className="p-4 bg-white dark:bg-slate-950 border-t border-slate-100 dark:border-slate-850 flex justify-between items-baseline font-mono text-[9px] text-slate-400 z-10">
              <span>Directions: Pre-arranged luxury valet concierge present</span>
              <span>Online Status: Verified</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
