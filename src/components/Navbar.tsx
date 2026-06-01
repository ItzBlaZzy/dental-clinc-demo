import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, Moon, Sun, Calendar, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

interface NavbarProps {
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  onBookClick: () => void;
}

export default function Navbar({ darkMode, setDarkMode, onBookClick }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Services', href: '#services' },
    { name: 'Smile Journey', href: '#journey' },
    { name: 'Why Us', href: '#whyus' },
    { name: 'Virtual Smile', href: '#virtual-smile' },
    { name: 'Specialists', href: '#dentists' },
    { name: 'Membership', href: '#plans' },
    { name: 'Testimonials', href: '#reviews' },
    { name: 'Patient Hub', href: '#dashboard' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-800/50 py-3 shadow-sm'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center space-x-2.5 group">
            <div className="relative flex items-center justify-center w-8 h-8 rounded bg-blue-600">
              <div className="w-3.5 h-3.5 border-2 border-white rounded-sm rotate-45"></div>
            </div>
            <div className="flex flex-col">
              <span className="font-sans font-bold text-lg leading-tight tracking-tight text-slate-900 dark:text-white uppercase">
                AETERNA <span className="text-blue-600 dark:text-blue-400">DENTAL</span>
              </span>
              <span className="font-mono text-[9px] tracking-[0.2em] font-medium text-slate-400 dark:text-slate-500 uppercase leading-none">
                Aeterna Experience
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-7">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="font-sans text-xs font-semibold text-slate-600 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400 transition-colors uppercase tracking-widest"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* CTA Group */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Theme Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors cursor-pointer"
              aria-label="Toggle theme"
            >
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Phone */}
            <a
              href="tel:+18005558662"
              className="hidden lg:flex items-center space-x-1.5 px-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span className="font-mono text-xs font-medium text-slate-600 dark:text-slate-400">+1 (800) 555-8662</span>
            </a>

            {/* Primary Booking Button */}
            <button
              onClick={onBookClick}
              className="px-6 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-950 text-xs font-bold uppercase tracking-widest rounded-full hover:bg-blue-600 dark:hover:bg-blue-400 transition-colors cursor-pointer"
            >
              Book Appointment
            </button>
          </div>

          {/* Mobile Toggles */}
          <div className="flex md:hidden items-center space-x-3">
            {/* Theme Toggle Mobile */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-950/90 text-slate-700 dark:text-slate-300"
            >
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <div
        className={`fixed inset-0 z-40 bg-slate-950/50 backdrop-blur-sm md:hidden transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
      >
        <div
          className={`absolute top-0 right-0 bottom-0 w-4/5 max-w-sm bg-white dark:bg-slate-950 px-6 py-20 flex flex-col justify-between shadow-2xl transition-transform duration-300 ease-out ${
            isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex flex-col space-y-5">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="font-sans text-base font-medium text-slate-850 dark:text-slate-250 border-b border-slate-100 dark:border-slate-905 pb-3 hover:text-sky-600 dark:hover:text-sky-400"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="flex flex-col space-y-4">
            <a
              href="tel:+18005558662"
              className="flex items-center justify-center space-x-2 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 font-mono text-sm font-semibold"
            >
              <Phone className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span>+1 (800) 555-8662</span>
            </a>
            <button
              onClick={() => {
                setIsOpen(false);
                onBookClick();
              }}
              className="w-full py-4 rounded-xl bg-blue-600 dark:bg-blue-500 text-white font-sans text-xs font-semibold uppercase tracking-widest text-center shadow-lg hover:bg-blue-700 active:scale-95 transition-all flex items-center justify-center space-x-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Instant Consult</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
