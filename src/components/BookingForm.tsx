import React, { useState, useEffect } from 'react';
import { CLINIC_SERVICES } from '../data';
import { SavedAppointment } from '../types';
import { 
  Calendar as CalendarIcon, Clock, HeartHandshake, ShieldAlert, Sparkles, 
  CheckCircle, RefreshCw, Smartphone, User, ArrowRight 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface BookingFormProps {
  preselectedService?: string;
  onBookingSuccess: (appt: SavedAppointment) => void;
}

export default function BookingForm({ preselectedService, onBookingSuccess }: BookingFormProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState('Porcelain Smile Redesign');
  const [isEmergency, setIsEmergency] = useState(false);
  const [prefDate, setPrefDate] = useState('');
  const [selectedSlot, setSelectedSlot] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [latestAppointment, setLatestAppointment] = useState<SavedAppointment | null>(null);

  useEffect(() => {
    if (preselectedService) {
      setService(preselectedService);
      // Automatically focus or scroll to booking form container
      const container = document.getElementById('booking-section');
      if (container) {
        container.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [preselectedService]);

  const slots = isEmergency 
    ? ['Immediate Priority Slot 1 (Sameday)', 'Immediate Priority Slot 2 (Sameday)', 'On-call Surgeon Slot']
    : ['09:00 AM (Serenity Slot)', '10:30 AM', '11:45 AM', '01:30 PM', '03:00 PM', '04:15 PM (Relaxing sunset)'];

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !prefDate || !selectedSlot) return;

    setSubmitting(true);
    
    setTimeout(() => {
      const appt: SavedAppointment = {
        name,
        phone,
        service,
        preferredDate: prefDate,
        timeSlot: selectedSlot,
        isEmergency,
        message,
        bookedAt: new Date().toISOString()
      };

      // Save to localStorage so dashboard can pick up
      const oldList = JSON.parse(localStorage.getItem('aeterna_appts') || localStorage.getItem('lumina_appts') || '[]');
      localStorage.setItem('aeterna_appts', JSON.stringify([appt, ...oldList]));

      setLatestAppointment(appt);
      setSubmitting(false);
      setIsSubmitted(true);
      onBookingSuccess(appt);
    }, 1500);
  };

  const handleReset = () => {
    setName('');
    setPhone('');
    setIsEmergency(false);
    setPrefDate('');
    setSelectedSlot('');
    setMessage('');
    setIsSubmitted(false);
  };

  return (
    <section id="booking-section" className="py-24 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-850/50 transition-colors duration-300 text-left relative">
      <div className="absolute top-1/3 left-1/4 w-[450px] h-[450px] bg-blue-200/5 dark:bg-blue-400/5 blur-3xl rounded-full" />
      
      <div className="max-w-6xl mx-auto px-6 relative z-10 animate-fade-in">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Form Briefing RHS Info */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div className="space-y-6">
              <div className="inline-flex items-center space-x-2 px-4 py-1.5 bg-blue-50 text-blue-700 text-[10px] font-bold uppercase tracking-widest rounded-full border border-blue-100 dark:bg-blue-900/20 dark:border-blue-900/40 dark:text-blue-400">
                <CalendarIcon className="w-3.5 h-3.5" />
                <span className="tracking-widest font-semibold">
                  Priority Placement Desk
                </span>
              </div>
              
              <h2 className="font-serif text-4xl sm:text-5xl font-normal tracking-tight text-slate-900 dark:text-white leading-tight">
                Instantly Reserve <br />
                Your Clinical Slot
              </h2>
              
              <p className="font-sans text-slate-500 dark:text-slate-400 text-sm leading-relaxed font-light">
                Choose your ideal treatment and coordinate your preferred date slot. Once filed, our Luxury Patient Concierge team will reach out within 15 minutes to confirm details and accommodate any custom clinical suites demands.
              </p>
            </div>

            {/* Micro details on pain-free commitment */}
            <div className="space-y-4 pt-6 border-t border-slate-100 dark:border-slate-800">
              <div className="flex items-start space-x-3 text-slate-605 dark:text-slate-350">
                <div className="p-2 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-xl mt-0.5">
                  <CheckCircle className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-sans text-xs font-bold uppercase tracking-wide text-slate-800 dark:text-slate-200">
                    Complimentary 3D Intraoral Diagnostics
                  </h4>
                  <p className="font-sans text-xs text-slate-500 dark:text-slate-500 mt-0.5 leading-relaxed font-light">
                    Every luxury primary booking includes full digital panoramas with zero billing markup.
                  </p>
                </div>
              </div>

              {/* Emergency info overlay */}
              <div className="flex items-start space-x-3 text-slate-605 dark:text-slate-350">
                <div className="p-2 bg-rose-500/10 text-rose-600 rounded-xl mt-0.5">
                  <ShieldAlert className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-sans text-xs font-bold uppercase tracking-wide text-rose-600">
                    Acute Pain triage priority
                  </h4>
                  <p className="font-sans text-xs text-slate-500 dark:text-slate-500 mt-0.5 leading-relaxed font-light">
                    Toggling Emergency places your request directly on Dr. Mercer’s emergency surgical pager for immediate same-day relief.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Form Component (LHS) */}
          <div className="lg:col-span-7 bg-slate-50 dark:bg-slate-950 rounded-[2rem] border border-slate-200/40 dark:border-slate-800/40 p-6 sm:p-8 relative overflow-hidden min-h-[500px] flex items-stretch">
            
            <AnimatePresence mode="wait">
              {isSubmitted && latestAppointment ? (
                /* Confirmation Screen animation */
                <motion.div
                  key="confirm"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex-1 flex flex-col justify-between text-center items-center py-6"
                >
                  <div className="space-y-4 max-w-md">
                    <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center border border-emerald-500/30 mx-auto">
                      <CheckCircle className="w-8 h-8 animate-pulse" />
                    </div>
                    <div>
                      <span className="font-mono text-[9px] uppercase tracking-widest text-emerald-600 font-extrabold block">
                        Schedule Confirmed
                      </span>
                      <h3 className="font-sans text-2xl font-bold text-slate-903 dark:text-white mt-1">
                        Your Smile Slot is Secured!
                      </h3>
                      <p className="font-sans text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                        Thank you, **{latestAppointment.name}**. We have securely registered your upcoming **{latestAppointment.service}** consultation on our clinical calendar.
                      </p>
                    </div>
                  </div>

                  {/* appointment metrics card */}
                  <div className="w-full max-w-sm rounded-[1.5rem] bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-850 p-5 space-y-4 text-left shadow-sm">
                    <span className="font-mono text-[8px] uppercase tracking-[0.25em] text-slate-400 dark:text-slate-500 block">
                      AURA APPOINTMENT RECEIPT
                    </span>
                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between">
                        <span className="text-slate-400 font-sans">Patient:</span>
                        <span className="text-slate-900 dark:text-white font-extrabold">{latestAppointment.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400 font-sans">Contact:</span>
                        <span className="text-slate-900 dark:text-white font-mono">{latestAppointment.phone}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400 font-sans">Specialist Focus:</span>
                        <span className="text-sky-606 dark:text-sky-405 font-sans font-bold">{latestAppointment.service}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400 font-sans">Reserved Date:</span>
                        <span className="text-slate-900 dark:text-white font-sans font-bold">{latestAppointment.preferredDate}</span>
                      </div>
                      <div className="flex justify-between font-bold">
                        <span className="text-slate-400 font-sans font-medium">Curated Slot:</span>
                        <span className="text-slate-900 dark:text-white font-sans">{latestAppointment.timeSlot}</span>
                      </div>
                    </div>
                  </div>

                  <p className="font-sans text-[10px] text-slate-400 dark:text-slate-500 max-w-xs leading-relaxed">
                    A digital calendar invite and SMS map will be pushed to **{latestAppointment.phone}** shortly. Explore your curated **Patient Hub** below to track alignment therapies!
                  </p>

                  <button
                    onClick={handleReset}
                    className="mt-4 px-6 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-[10px] uppercase font-mono tracking-wider font-extrabold text-slate-505 hover:text-slate-800 transition"
                  >
                    Set Another Appointment
                  </button>
                </motion.div>
              ) : (
                /* Primary Interactive Form */
                <motion.form
                  key="form"
                  onSubmit={handleBooking}
                  className="flex-1 flex flex-col justify-between"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="space-y-5">
                    
                    {/* Emergency priority switch banner */}
                    <div className={`p-3.5 rounded-2xl flex items-center justify-between border transition-all ${
                      isEmergency
                        ? 'bg-rose-500/10 border-rose-500/30 text-rose-550'
                        : 'bg-white dark:bg-slate-900 border-slate-205 dark:border-slate-805 text-slate-500'
                    }`}>
                      <div className="flex items-center space-x-2.5">
                        <ShieldAlert className={`w-4 h-4 shrink-0 ${isEmergency ? 'text-rose-500 animate-bounce-slow' : 'text-slate-450'}`} />
                        <span className="font-sans text-[11px] font-bold uppercase tracking-wider">
                          Is this an urgent dental emergency?
                        </span>
                      </div>
                      <input
                        type="checkbox"
                        checked={isEmergency}
                        onChange={(e) => setIsEmergency(e.target.checked)}
                        className="w-4.5 h-4.5 accent-rose-500 rounded cursor-pointer"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Name input */}
                      <div className="space-y-1.5">
                        <label className="font-sans text-[9px] font-extrabold uppercase tracking-widest text-slate-450 dark:text-slate-500">
                          Complete Name
                        </label>
                        <div className="relative">
                          <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                          <input
                            type="text"
                            required
                            placeholder="e.g. Christian Sterling"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 rounded-xl text-xs font-sans bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-850 text-slate-800 dark:text-slate-205 outline-none focus:border-sky-505"
                          />
                        </div>
                      </div>

                      {/* Phone Input */}
                      <div className="space-y-1.5">
                        <label className="font-sans text-[9px] font-extrabold uppercase tracking-widest text-slate-450 dark:text-slate-500">
                          Mobile Contact
                        </label>
                        <div className="relative">
                          <Smartphone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                          <input
                            type="tel"
                            required
                            placeholder="e.g. +1 (555) 0192-882"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 rounded-xl text-xs font-sans bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-850 text-slate-800 dark:text-slate-205 outline-none focus:border-sky-505"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Treatment picker */}
                      <div className="space-y-1.5">
                        <label className="font-sans text-[9px] font-extrabold uppercase tracking-widest text-slate-450 dark:text-slate-500">
                          Desired Treatment Range
                        </label>
                        <select
                          value={service}
                          onChange={(e) => setService(e.target.value)}
                          className="w-full p-3.5 rounded-xl text-xs font-sans bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-850 text-slate-800 dark:text-slate-250 outline-none focus:border-sky-505 font-medium cursor-pointer"
                        >
                          {CLINIC_SERVICES.map((s) => (
                            <option key={s.id} value={s.name}>
                              {s.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Date selection input */}
                      <div className="space-y-1.5">
                        <label className="font-sans text-[9px] font-extrabold uppercase tracking-widest text-slate-450 dark:text-slate-500">
                          Preferred Reservation Date
                        </label>
                        <input
                          type="date"
                          required
                          min={new Date().toISOString().split('T')[0]}
                          value={prefDate}
                          onChange={(e) => setPrefDate(e.target.value)}
                          className="w-full p-3.5 rounded-xl text-xs font-sans bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-850 text-slate-800 dark:text-slate-250 outline-none focus:border-sky-505 font-medium cursor-pointer"
                        />
                      </div>
                    </div>

                    {/* Curated Active Slots selection */}
                    <div className="space-y-2">
                      <span className="font-sans text-[9px] font-extrabold uppercase tracking-widest text-slate-450 dark:text-slate-500 block leading-none">
                        Curated Available Slots ({prefDate ? prefDate : 'Select Date Above'})
                      </span>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                        {slots.map((slot) => (
                          <button
                            key={slot}
                            type="button"
                            onClick={() => setSelectedSlot(slot)}
                            className={`py-2 px-1 text-center font-sans text-[9px] rounded-lg border transition ${
                              selectedSlot === slot
                                ? 'bg-slate-900 border-slate-900 text-white dark:bg-white dark:text-slate-950 font-bold shadow-md scale-102 font-bold'
                                : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-505 hover:bg-slate-100 dark:hover:bg-slate-800'
                            }`}
                          >
                            {slot}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Messages */}
                    <div className="space-y-1.5">
                      <label className="font-sans text-[9px] font-extrabold uppercase tracking-widest text-slate-450 dark:text-slate-500">
                        Custom Clinical suite Instructions (Optional)
                      </label>
                      <textarea
                        rows={2}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="e.g. Please accommodate dental anxiety suites, noise-cancel headset configuration..."
                        className="w-full p-3.5 rounded-xl text-xs font-sans bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-850 text-slate-800 dark:text-slate-200 outline-none focus:border-sky-505 resize-none leading-relaxed"
                      />
                    </div>

                  </div>

                  {/* Register scheduling submit trigger */}
                  <div className="pt-6 border-t border-slate-200/50 dark:border-slate-800/80 mt-6">
                    <button
                      type="submit"
                      disabled={submitting || !selectedSlot}
                      className={`w-full py-4 rounded-xl text-white font-sans text-xs font-bold uppercase tracking-widest shadow-lg transition flex items-center justify-center space-x-2 ${
                        isEmergency
                          ? 'bg-rose-600 hover:bg-rose-700 active:scale-98'
                          : 'bg-sky-600 hover:bg-sky-700 active:scale-98 disabled:bg-slate-300 dark:disabled:bg-slate-810 disabled:text-slate-450'
                      }`}
                    >
                      {submitting ? (
                        <>
                          <RefreshCw className="w-4 h-4 animate-spin" />
                          <span>Preamble Scheduling confirmation...</span>
                        </>
                      ) : (
                        <>
                          <span>File Secure Consultation Scheduler</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>

                </motion.form>
              )}
            </AnimatePresence>

          </div>

        </div>
      </div>
    </section>
  );
}
