import React, { useState } from 'react';
import { Sparkles, Calendar, Heart, Mail, Shield, ShieldAlert } from 'lucide-react';


interface FooterProps {
  onBookClick: () => void;
}

export default function Footer({ onBookClick }: FooterProps) {
  const [emailMsg, setEmailMsg] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailMsg.trim()) return;
    setSubscribed(true);
    setTimeout(() => {
      setEmailMsg('');
    }, 2000);
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 text-white pt-20 pb-8 border-t border-slate-900 transition-colors duration-300 text-left">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Main Footer Links grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-16 pb-16 border-b border-slate-900">
          
          {/* Brand block (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <a href="#" className="flex items-center space-x-2.5">
              <div className="relative flex items-center justify-center w-10 h-10 rounded-full bg-slate-900 hover:rotate-12 transition-transform border border-blue-500/30">
                <Sparkles className="w-5 h-5 text-blue-400" />
              </div>
              <div className="flex flex-col">
                <span className="font-sans font-extrabold text-lg tracking-tight uppercase leading-none">
                  Aeterna
                </span>
                <span className="font-mono text-[9px] tracking-[0.25em] font-bold text-blue-454 uppercase leading-none mt-1">
                  Premium Dental
                </span>
              </div>
            </a>

            <p className="font-sans text-slate-400 text-xs leading-relaxed max-w-sm font-light">
              Aeterna Premium Dental belongs to the elite network of modern cosmetic health clinics. We merge master craftsmanship with 3D precision imaging to map healthy, brilliant smiles in absolute calmness.
            </p>

            {/* ADA Credentials Mock up Logos */}
            <div className="pt-2">
              <span className="font-mono text-[8px] uppercase tracking-wider text-slate-500 block mb-3 font-extrabold">
                AFFILIATED CLINICAL COUNCILS
              </span>
              <div className="flex items-center gap-4 flex-wrap text-slate-500 font-mono text-[8px] uppercase font-bold">
                <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-850">American Dental Academy (ADA)</span>
                <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-850">AACD Accredited specialists</span>
                <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-850">iTero Certified Center</span>
              </div>
            </div>
          </div>

          {/* Quick links block (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-400 font-extrabold">
              Smile Suite Suites
            </h4>
            <ul className="space-y-2.5 text-xs font-sans text-slate-400 font-light">
              <li><a href="#services" className="hover:text-blue-400 transition-colors">Precision Teeth Whitening</a></li>
              <li><a href="#services" className="hover:text-blue-400 transition-colors">Signature Porcelain Veneers</a></li>
              <li><a href="#services" className="hover:text-blue-400 transition-colors">Invisalign® Clear Aligners</a></li>
              <li><a href="#services" className="hover:text-blue-400 transition-colors">Digital Implant Reconstruction</a></li>
              <li><a href="#services" className="hover:text-blue-400 transition-colors">Gentle Laser Endodontics</a></li>
            </ul>
          </div>

          {/* Newsletter / Signup (4 cols) */}
          <div className="lg:col-span-4 space-y-5">
            <h4 className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-400 font-extrabold">
              Elite Wellness Journal
            </h4>
            <p className="font-sans text-slate-400 text-xs leading-relaxed font-light">
              Register to receive Dr. Alexander Mercer&rsquo;s quarterly guide on dental hygiene, smile trends, and exclusive member campaigns.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-3.5">
              <div className="flex items-center gap-2.5">
                <input
                  type="email"
                  required
                  placeholder="e.g. christopher@sterling.com"
                  value={emailMsg}
                  onChange={(e) => setEmailMsg(e.target.value)}
                  className="flex-1 p-3 rounded-lg text-xs font-sans bg-slate-900 text-white border border-slate-850 outline-none focus:border-blue-500"
                />
                <button
                  type="submit"
                  className="p-3 rounded-lg bg-white text-slate-950 hover:bg-blue-600 hover:text-white transition shadow text-xs font-sans font-bold uppercase tracking-wider shrink-0 cursor-pointer"
                >
                  Join
                </button>
              </div>

              {subscribed && (
                <span className="font-sans text-[10px] text-emerald-450 block leading-none">
                  Thank you! You are registered on our priority distribution list.
                </span>
              )}
            </form>
          </div>

        </div>

        {/* Legal disclosure row */}
        <div className="pt-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6 font-sans text-[11px] text-slate-550">
          
          <div className="flex gap-4 flex-wrap leading-none">
            <span>&copy; {currentYear} Aeterna Premium Dental. All assets reserved.</span>
            <span className="w-1 h-3 border-r border-slate-800 hidden md:block" />
            <a href="#" className="hover:text-white transition-colors">ADA Standards Compliance</a>
            <span className="w-1 h-3 border-r border-slate-800 hidden md:block" />
            <a href="#" className="hover:text-white transition-colors">Privacy Charter</a>
            <span className="w-1 h-3 border-r border-slate-800 hidden md:block" />
            <a href="#" className="hover:text-white transition-colors">HIPAA Compliance Disclosure</a>
          </div>

          <div className="flex items-center space-x-1.5 font-mono text-[9px] uppercase tracking-wide">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full inline-block shrink-0 animate-pulse" />
            <span>VIP SECURE PLATFORM ACTIVE</span>
          </div>

        </div>

      </div>
    </footer>
  );
}
