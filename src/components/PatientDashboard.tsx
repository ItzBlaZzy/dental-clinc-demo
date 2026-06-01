import { useState, useEffect } from 'react';
import { SavedAppointment } from '../types';
import { TREAT_FLOW } from '../data';
import { 
  User, Activity, FileText, Calendar, Bell, ShieldCheck, 
  Trash2, Plus, Sparkles, Smile, RefreshCw, Key, Image
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function PatientDashboard() {
  const [appointments, setAppointments] = useState<SavedAppointment[]>([]);
  const [activeTab, setActiveTab ] = useState<'appointments' | 'treatment' | 'records'>('appointments');
  const [activeStep, setActiveStep] = useState(2); // Current milestone under progress

  const loadAppointments = () => {
    const list = JSON.parse(localStorage.getItem('aeterna_appts') || localStorage.getItem('lumina_appts') || '[]');
    setAppointments(list);
  };

  useEffect(() => {
    loadAppointments();
    
    // Listen for custom trigger to reload when list is edited downstream
    window.addEventListener('storage', loadAppointments);
    const interval = setInterval(loadAppointments, 2000); // Poll as a reliable fallback

    return () => {
      window.removeEventListener('storage', loadAppointments);
      clearInterval(interval);
    };
  }, []);

  const handleCancelAppointment = (idx: number) => {
    const list = [...appointments];
    list.splice(idx, 1);
    localStorage.setItem('aeterna_appts', JSON.stringify(list));
    setAppointments(list);
  };

  const mockReminders = [
    { text: 'Invisalign Trays Change: Progress to Aligner Set 12', type: 'ortho', date: 'In 2 days' },
    { text: 'Teeth Whitening Touch-up: Apply evening desensitizer tray', type: 'hygiene', date: 'Tonight, 10 PM' },
    { text: 'Comprehensive Clinical Clean: Scheduled slot reference', type: 'clinic', date: 'Nov 12, 10:30 AM' }
  ];

  const mockRecords = [
    { title: 'Panoramic 3D Digital Scan Sweep', date: 'May 28, 2026', size: '14.2 MB', doc: 'X-Ray Map' },
    { title: 'Porcelain Shade Contour Design File', date: 'May 15, 2026', size: '4.8 MB', doc: 'CAD Model' },
    { title: 'AACD Clinical Aesthetic Diagnosis Note', date: 'May 10, 2026', size: '120 KB', doc: 'PDF Diagnostic' }
  ];

  return (
    <section id="dashboard" className="py-24 bg-slate-50 dark:bg-slate-950 transition-colors duration-300 relative text-left">
      <div className="absolute top-1/2 right-10 w-80 h-80 bg-blue-200/5 dark:bg-blue-400/5 blur-3xl rounded-full" />
      
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div className="space-y-4">
            <div className="inline-flex items-center space-x-2 px-4 py-1.5 bg-blue-50 text-blue-700 text-[10px] font-bold uppercase tracking-widest rounded-full border border-blue-100 dark:bg-blue-900/20 dark:border-blue-900/40 dark:text-blue-400">
              <User className="w-3.5 h-3.5 text-blue-600" />
              <span className="tracking-widest font-semibold font-sans">Active Client Portal</span>
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl font-normal tracking-tight text-slate-900 dark:text-white leading-tight">
              Aeterna Patient Portal
            </h2>
            <p className="font-sans text-slate-500 dark:text-slate-400 text-base max-w-lg font-light leading-relaxed">
              Track upcoming sessions in real-time, review CAD/CAM diagnostic files, and follow your customized cosmetic treatment progress directly.
            </p>
          </div>

          {/* Quick Hub Stats */}
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-150 shadow-sm flex items-center space-x-4 max-w-xs shrink-0 self-start md:self-auto">
            <div className="p-2.5 rounded-xl bg-blue-50 text-blue-650 dark:bg-blue-900/20">
              <ShieldCheck className="w-5 h-5 animate-pulse" />
            </div>
            <div className="leading-none text-left">
              <span className="font-mono text-[9px] text-slate-400 uppercase tracking-widest block font-bold">Health Standing</span>
              <span className="font-sans text-xs font-bold text-slate-900 mt-1 dark:text-slate-200 block uppercase">Pristine Aesthetic (100)</span>
            </div>
          </div>
        </div>

        {/* Dashboard Grid Controller */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Main Workspace Frame Left side (8 cols) */}
          <div className="lg:col-span-8 flex flex-col justify-between p-6 sm:p-8 rounded-[2rem] bg-white dark:bg-slate-900 border border-slate-150 shadow-sm">
            
            {/* Nav Headers within Workspace */}
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800/80 mb-6 flex-wrap gap-4">
                <div className="flex items-center space-x-2">
                  <Activity className="w-4.5 h-4.5 text-blue-600" />
                  <span className="font-sans text-xs font-bold uppercase tracking-wider text-slate-650 dark:text-slate-350">
                    Workspace Monitor
                  </span>
                </div>

                <div className="flex space-x-1.5">
                  {(['appointments', 'treatment', 'records'] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-3.5 py-1.5 rounded-lg font-sans text-[10px] font-bold uppercase tracking-widest transition-all cursor-pointer ${
                        activeTab === tab
                          ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white'
                          : 'text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>

              {/* Dynamic Tabs Content wrapper */}
              <div className="min-h-[280px]">
                
                 {/* 1. Appointments list Tab */}
                {activeTab === 'appointments' && (
                  <div className="space-y-4">
                    {appointments.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {appointments.map((appt, i) => (
                          <div
                            key={i}
                            className={`p-5 rounded-2xl border flex flex-col justify-between ${
                              appt.isEmergency 
                                ? 'bg-rose-500/5 border-rose-500/20 text-rose-805' 
                                : 'bg-slate-50 border-slate-200/40 dark:bg-slate-950 dark:border-slate-805'
                            }`}
                          >
                            <div className="space-y-3 text-left">
                              <div className="flex justify-between items-start">
                                <span className={`px-2.5 py-1 rounded text-[8px] font-sans uppercase tracking-wider font-bold ${
                                  appt.isEmergency ? 'bg-rose-50 border border-rose-500/30 text-rose-500' : 'bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-400'
                                }`}>
                                  {appt.isEmergency ? 'Emergency Paging' : 'Standard Booking'}
                                </span>
                                <button
                                  onClick={() => handleCancelAppointment(i)}
                                  className="text-slate-450 hover:text-rose-500 transition-colors p-1 cursor-pointer"
                                  title="Cancel Appointment"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>

                              <div>
                                <h4 className="font-sans text-sm font-semibold text-slate-900 dark:text-white">
                                  {appt.service}
                                </h4>
                                <p className="font-sans text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 font-light">
                                  Patient Ref: **{appt.name}**
                                </p>
                              </div>
                            </div>

                            <div className="mt-4 pt-3.5 border-t border-slate-200/40 dark:border-slate-800 flex justify-between items-baseline font-mono text-[9px] text-slate-405">
                              <span className="font-sans font-semibold text-slate-800 dark:text-slate-300">
                                {appt.preferredDate}
                              </span>
                              <span className="font-bold text-slate-800 dark:text-slate-300">
                                {appt.timeSlot}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center text-center py-12 space-y-3">
                        <div className="p-3.5 rounded-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-400">
                          <Calendar className="w-6 h-6 animate-pulse" />
                        </div>
                        <div>
                          <h4 className="font-sans text-xs font-bold text-slate-800 dark:text-white uppercase tracking-wide">
                            No active consultations booked
                          </h4>
                          <p className="font-sans text-slate-400 dark:text-slate-500 text-[11px] max-w-xs mt-1 leading-normal font-light">
                            You have no pending consultations mapped. Use our priority instant scheduler in the booking section to secure your slot!
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* 2. Custom treatment Flow timeline tab */}
                {activeTab === 'treatment' && (
                  <div className="space-y-6">
                    <p className="font-mono text-[9px] uppercase tracking-wider text-slate-400 dark:text-slate-500 font-bold max-w-xl mb-4">
                      Active Cosmetic Makeover Process Profile (Sophia Veneers Template)
                    </p>

                    <div className="relative py-2">
                      {/* Timeline center line */}
                      <div className="absolute inset-y-0 left-[15px] w-[2px] bg-slate-200 dark:bg-slate-800 pointer-events-none" />

                      <div className="space-y-6">
                        {TREAT_FLOW.map((step, i) => {
                          const isCompleted = i < activeStep;
                          const isCurrent = i === activeStep;

                          return (
                            <div key={step.step} className="flex space-x-4 items-start relative text-left">
                              {/* Indicator dot */}
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 z-10 transition-colors border-2 ${
                                isCompleted
                                  ? 'bg-blue-605 bg-[#2563eb] border-blue-600 text-white'
                                  : isCurrent
                                  ? 'bg-blue-605 bg-[#2563eb] border-blue-600 text-white animate-pulse'
                                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-400'
                              }`}>
                                <span className="font-mono text-[10px] font-bold">{step.step}</span>
                              </div>

                              <div className="space-y-1">
                                <div className="flex items-baseline space-x-2.5">
                                  <h4 className={`font-sans text-xs font-bold ${isCurrent ? 'text-blue-600 dark:text-blue-400' : 'text-slate-800 dark:text-slate-200'}`}>
                                    {step.title}
                                  </h4>
                                  <span className="font-mono text-[8px] uppercase px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-400">
                                    {step.duration}
                                  </span>
                                </div>
                                <p className="font-sans text-[11px] font-bold text-slate-400 dark:text-slate-500">
                                  Value: {step.achievement}
                                </p>
                                <p className="font-sans text-[11px] text-slate-500 dark:text-slate-400 max-w-xl leading-relaxed font-light">
                                  {step.description}
                                </p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}

                {/* 3. Records lists */}
                {activeTab === 'records' && (
                  <div className="space-y-3 text-left">
                    {mockRecords.map((record, i) => (
                      <div
                        key={i}
                        className="p-4 rounded-xl border border-slate-200/50 dark:border-slate-800/80 bg-slate-50 dark:bg-slate-950 flex items-center justify-between"
                      >
                        <div className="flex items-center space-x-3.5">
                          <div className="p-2.5 rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400 border border-blue-100 dark:border-blue-900 shrink-0">
                            <FileText className="w-4 h-4" />
                          </div>
                          <div>
                            <h4 className="font-sans text-xs font-semibold text-slate-900 dark:text-white leading-none">
                              {record.title}
                            </h4>
                            <span className="font-mono text-[9px] text-slate-400 mt-1 block">
                              Diagnostic File &bull; {record.date}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center space-x-3 text-right">
                          <span className="font-mono text-[9px] text-slate-400">
                            {record.size}
                          </span>
                          <span className="p-1 px-2 text-[8px] font-mono font-extrabold uppercase bg-slate-200 dark:bg-slate-850 rounded text-slate-600 dark:text-slate-350">
                            {record.doc}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

              </div>
            </div>

            {/* Disclaimer disclaimer */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 mt-6 flex items-center justify-between text-[10px] font-mono text-slate-400">
              <span>Security Access: Micro-Profile Vault active</span>
              <span>Ref: AETERNA-CLI-VIP</span>
            </div>

          </div>

          {/* Right sidebar panel (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* 1. Dental Care Reminders panel */}
            <div className="p-6 rounded-[2rem] bg-slate-950 text-white border border-slate-900 shadow-sm flex flex-col justify-between h-auto text-left">
              <div>
                <div className="flex items-center space-x-2.5 mb-5 mb-4">
                  <Bell className="w-4 h-4 text-blue-400 animate-bounce-slow" />
                  <h3 className="font-sans text-sm font-bold uppercase tracking-wider text-slate-300">
                    Active Care Notifications
                  </h3>
                </div>

                <div className="space-y-4">
                  {mockReminders.map((rem, i) => (
                    <div
                      key={i}
                      className="p-3.5 rounded-xl bg-slate-900 border border-slate-850 flex flex-col justify-between leading-normal text-left"
                    >
                      <h4 className="font-sans text-xs text-slate-200 leading-normal font-light">
                        {rem.text}
                      </h4>
                      <span className="font-mono text-[9px] mt-2 inline-block font-bold text-blue-400 tracking-wider uppercase leading-none">
                        Ref &bull; {rem.date}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-850 mt-6 flex justify-between items-baseline font-mono text-[8px] text-slate-500">
                <span>Auto-pushed at 12H intervals</span>
                <span>Active</span>
              </div>
            </div>

            {/* 2. Dental teeth charts simulation area */}
            <div className="p-6 rounded-[2rem] bg-white dark:bg-slate-900 border border-slate-150 shadow-sm text-left">
              <div className="flex items-center space-x-2 mb-4">
                <Smile className="w-4.5 h-4.5 text-blue-600" />
                <h3 className="font-sans text-sm font-semibold text-slate-905 dark:text-white">
                  3D Anatomical Arch Blueprint
                </h3>
              </div>

              <p className="font-sans text-[11px] text-slate-500 leading-relaxed mb-4 font-light">
                Clinical illustration representing a microscopic panoramic bite outline. Our specialists operate with micron exactness.
              </p>

              {/* Tooth Chart simulation grids visual rendering */}
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200/50 dark:border-slate-850 text-center font-mono text-[9px] text-slate-400 space-y-3 select-none">
                <span className="block uppercase tracking-widest font-bold text-slate-400 mb-1 text-[8px]">Maxillary teeth row (Upper)</span>
                <div className="flex justify-between px-2 gap-1.5">
                  {[18, 17, 16, 15, 14, 13, 12, 11].map((tooth) => (
                    <div
                      key={tooth}
                      className={`w-5 py-1 text-center font-bold text-[9px] rounded-lg border ${
                        tooth === 11 || tooth === 12
                          ? 'bg-blue-500/10 border-blue-400 text-blue-600 font-bold'
                          : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800'
                      }`}
                      title={`Tooth ${tooth} Status Profile`}
                    >
                      {tooth - 10}
                    </div>
                  ))}
                </div>

                <div className="flex justify-between px-2 gap-1.5 pt-1.5 border-t border-slate-200/40 dark:border-slate-800">
                  {[21, 22, 23, 24, 25, 26, 27, 28].map((tooth) => (
                    <div
                      key={tooth}
                      className="w-5 py-1 text-center font-bold text-[9px] rounded-lg border bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800"
                      title={`Tooth ${tooth} Status Profile`}
                    >
                      {tooth - 10}
                    </div>
                  ))}
                </div>
                <span className="block uppercase tracking-widest font-bold text-slate-400 text-[8px]">Mandibular teeth row (Lower)</span>
              </div>

              <div className="mt-4 pt-3.5 border-t border-slate-100 dark:border-slate-855 text-center flex justify-between items-baseline font-mono text-[9px] text-slate-400">
                <span className="flex items-center space-x-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 inline-block shrink-0" />
                  <span>Veneers shade treatment</span>
                </span>
                <span>Active</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
