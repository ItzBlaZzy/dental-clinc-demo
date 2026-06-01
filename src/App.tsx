/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import BeforeAfter from './components/BeforeAfter';
import WhyChooseUs from './components/WhyChooseUs';
import SmileQuiz from './components/SmileQuiz';
import VirtualSmile from './components/VirtualSmile';
import MeetDentists from './components/MeetDentists';
import MembershipPlans from './components/MembershipPlans';
import Testimonials from './components/Testimonials';
import PatientDashboard from './components/PatientDashboard';
import BookingForm from './components/BookingForm';
import Faq from './components/Faq';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AIChatbot from './components/AIChatbot';
import { Sparkles, ShieldAlert, Phone } from 'lucide-react';

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [preselectedService, setPreselectedService] = useState('');
  const [lastBookedTime, setLastBookedTime] = useState<string | null>(null);

  // Apply dark mode styling class dynamically to document tree
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleToggleTheme = () => {
    setDarkMode(!darkMode);
  };

  const handleExploreClick = () => {
    const section = document.getElementById('services');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handlePreselectService = (serviceName: string) => {
    setPreselectedService(serviceName);
    // Smooth scrolling down to appointment selector
    const section = document.getElementById('booking-section');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300 relative selection:bg-sky-502/30">
      
      {/* 1. Slim Premium Emergencystandby alerts banner */}
      <div className="bg-rose-600 dark:bg-rose-955 text-white py-2 px-4 text-center text-[10px] font-sans font-bold uppercase tracking-widest flex items-center justify-center space-x-2 relative z-50">
        <ShieldAlert className="w-4 h-4 animate-bounce-slow shrink-0" />
        <span>Priority Same-Day Urgent Dental Triage Standby desk active: </span>
        <a href="tel:+13105558890" className="underline hover:text-rose-200 transition-colors inline-flex items-center space-x-1">
          <Phone className="w-3.5 h-3.5 inline mr-1" />
          <span>Page Surgical On-call suite (+1 (310) 555-8890)</span>
        </a>
      </div>

      {/* 2. Primary Navigation Bar */}
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} onBookClick={() => handlePreselectService('')} />

      {/* 3. Luxury Hero Landing */}
      <Hero onBookClick={() => handlePreselectService('')} onExploreClick={handleExploreClick} />


      {/* 4. Luxury Clinic Insurance Partner Highlight strip */}
      <section className="py-8 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-850/50 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <span className="font-mono text-[9px] uppercase tracking-wider text-slate-400 font-extrabold shrink-0 block text-center md:text-left">
            PREMIER CLINICAL INSURANCE PARTNERS (OUT-OF-NETWORK MOCKS)
          </span>
          <div className="flex flex-wrap justify-center items-center gap-6 lg:gap-10 font-sans text-xs font-black uppercase tracking-wider text-slate-300 dark:text-slate-600">
            <span className="hover:text-slate-500 transition-colors cursor-default">Blue Cross Shield</span>
            <span className="hover:text-slate-500 transition-colors cursor-default">Delta Dental Premium</span>
            <span className="hover:text-slate-500 transition-colors cursor-default">Cigna Executive Club</span>
            <span className="hover:text-slate-500 transition-colors cursor-default">Aetna Serene Tier</span>
            <span className="hover:text-slate-500 transition-colors cursor-default">MetLife Care Plus</span>
          </div>
        </div>
      </section>

      {/* 5. Treatment Services grid & drawer */}
      <Services onBookClick={handlePreselectService} />

      {/* 6. Dynamic Smile Quiz Harmonizer Diagnostics */}
      <SmileQuiz onSelectedTreatment={handlePreselectService} />

      {/* 7. Smile Transformations slider */}
      <BeforeAfter />

      {/* 8. Virtual Studio AI Simulation diagnostics tool */}
      <VirtualSmile />

      {/* 9. Specialized Bento trust Pillars & Virtual Tour Walkthrough */}
      <WhyChooseUs />

      {/* 10. Doctors & specialist roster card block */}
      <MeetDentists onBookClick={() => handlePreselectService('')} />

      {/* 11. Dental Memberships Schemes & interactive Savings planner */}
      <MembershipPlans onBookClick={handlePreselectService} />

      {/* 12. Reviews carousel slider & media mockup player */}
      <Testimonials />

      {/* 13. Dynamic appointment scheduler with digital validation slots */}
      <BookingForm preselectedService={preselectedService} onBookingSuccess={(appt) => setLastBookedTime(appt.bookedAt)} />

      {/* 14. Active Patient Dashboard monitor portal */}
      <PatientDashboard />

      {/* 15. Accordion FAQs sheet */}
      <Faq />

      {/* 16. Contact Operations Desk, WhatsApp numbers & directional Map Mock */}
      <Contact />

      {/* 17. Footnote branding definitions & legal HIPAA warnings */}
      <Footer onBookClick={() => handlePreselectService('')} />

      {/* 18. Absolutes Concierge floating assistant */}
      <AIChatbot />

    </div>
  );
}

