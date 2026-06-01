import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Sparkles, User, ShieldCheck, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content: 'Greetings. I am your **Aeterna Dental Concierge**, an elite clinical assistant. How may I help design your smile restoration path or clear dental treatment anxieties today?'
    }
  ]);
  const [inputMsg, setInputMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const lastMsgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (lastMsgRef.current) {
      lastMsgRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, loading]);

  const suggestOptions = [
    'Do veneers require drilling?',
    'How long does Invisalign take?',
    'Do you accept premier insurance?',
    'Acute dental emergency care'
  ];

  const handleSendMessage = async (msgText: string) => {
    if (!msgText.trim()) return;

    const userMsg: ChatMessage = { role: 'user', content: msgText };
    setMessages((prev) => [...prev, userMsg]);
    setInputMsg('');
    setLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: msgText,
          history: messages,
        }),
      });
      const data = await response.json();
      setMessages((prev) => [...prev, { role: 'assistant', content: data.reply }]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: 'My apologies. The Aeterna operations server is experiencing momentary heavy call volume. Please dial our Beverly Hills desk at **+1 (310) 555-8890** immediately.'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Beautiful in-chat formatting parser
  const renderMessageContent = (text: string) => {
    return text.split('\n').map((paragraph, idx) => {
      const trimmed = paragraph.trim();
      if (!trimmed) return <div key={idx} className="h-1.5" />;

      let content: React.ReactNode = trimmed;
      if (trimmed.includes('**')) {
        const parts = trimmed.split('**');
        content = parts.map((part, i) => i % 2 === 1 ? <strong key={i} className="font-semibold text-slate-900 dark:text-white">{part}</strong> : part);
      }

      if (trimmed.startsWith('-') || trimmed.startsWith('*')) {
        return (
          <div key={idx} className="flex items-start space-x-1.5 my-1 pl-1">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0 mt-1.5" />
            <p className="font-sans text-slate-705 dark:text-slate-300 font-light">{trimmed.replace(/^[-\*\s]+/, '').trim()}</p>
          </div>
        );
      }

      return (
        <p key={idx} className="font-sans leading-relaxed font-light">
          {content}
        </p>
      );
    });
  };

  return (
    <>
      {/* Floating Sparkly bubble trigger */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
        <AnimatePresence>
          {!isOpen && (
            <motion.button
              onClick={() => setIsOpen(true)}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="p-4 rounded-full bg-slate-950 dark:bg-slate-950 text-white shadow-2xl relative border border-slate-900 dark:border-blue-500/30 group hover:bg-blue-600 dark:hover:bg-blue-500 hover:scale-105 active:scale-95 transition-all outline-none cursor-pointer animate-none"
              aria-label="Connect to Aeterna Concierge AI"
            >
              <MessageSquare className="w-6 h-6 shrink-0 relative" />
              <Sparkles className="absolute -top-1 -right-1 w-4 h-4 text-blue-400 fill-blue-400 group-hover:rotate-12 transition-transform animate-pulse" />
              <div className="absolute top-0 right-0 w-3 h-3 bg-teal-500 rounded-full border-2 border-slate-950 animate-ping pointer-events-none" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Main floating chatbot panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ type: 'spring', damping: 20, stiffness: 220 }}
            className="fixed bottom-6 right-6 z-50 w-full max-w-[360px] sm:max-w-[400px] h-[550px] rounded-3xl bg-white dark:bg-slate-950 border border-slate-150 dark:border-slate-800 shadow-[0_24px_48px_rgba(15,23,42,0.15)] flex flex-col justify-between overflow-hidden text-left font-sans"
          >
            {/* Header section */}
            <div className="p-4 bg-slate-950 text-white flex items-center justify-between border-b border-slate-900 shrink-0">
              <div className="flex items-center space-x-2.5">
                <div className="relative flex items-center justify-center w-8.5 h-8.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400">
                  <Sparkles className="w-4 h-4" />
                  <div className="absolute top-0 right-0 w-2 h-2 bg-emerald-500 rounded-full border border-slate-950" />
                </div>
                <div className="leading-none text-left">
                  <span className="font-sans text-xs font-bold tracking-wide uppercase block">
                    Aeterna Concierge
                  </span>
                  <span className="font-mono text-[8px] text-slate-400 uppercase tracking-widest block font-extrabold mt-0.5">
                    Aeterna Clinical Officer
                  </span>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="p-1 px-[7px] rounded-lg bg-slate-900 border border-slate-850 hover:bg-slate-800 text-slate-400 hover:text-white cursor-pointer"
                aria-label="Close chatbot panel"
              >
                <X className="w-4 h-4 font-bold" />
              </button>
            </div>

            {/* Chat Messages Log */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-50/50 dark:bg-slate-950/20 custom-scrollbar">
              {messages.map((m, i) => {
                const isAssistant = m.role === 'assistant';
                return (
                  <div key={i} className={`flex items-start space-x-2.5 ${!isAssistant ? 'flex-row-reverse space-x-reverse' : ''} text-left`}>
                    
                    {/* Role Avatar icon */}
                    <div className={`p-1.5 rounded-lg border flex-shrink-0 mt-0.5 ${
                      isAssistant 
                        ? 'bg-slate-950 border-slate-900 text-blue-400 dark:bg-slate-900 dark:border-slate-800' 
                        : 'bg-blue-600 border-blue-650 text-white'
                    }`}>
                      {isAssistant ? <Sparkles className="w-3.5 h-3.5" /> : <User className="w-3.5 h-3.5" />}
                    </div>

                    {/* Chat text box */}
                    <div className={`p-3.5 rounded-2xl max-w-[80%] text-[11px] leading-relaxed relative ${
                      isAssistant
                        ? 'bg-white dark:bg-slate-900/50 border border-slate-150 dark:border-slate-800 text-slate-800 dark:text-slate-200 shadow-sm font-light'
                        : 'bg-blue-600 dark:bg-blue-500 text-white rounded-tr-none shadow-sm font-light'
                    }`}>
                      {renderMessageContent(m.content)}
                    </div>

                  </div>
                );
              })}

              {/* Streaming loading skeleton */}
              {loading && (
                <div className="flex items-start space-x-2.5 text-left">
                  <div className="p-1.5 rounded-lg bg-slate-950 text-blue-400 dark:bg-slate-900 border border-slate-800 shrink-0">
                    <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                  </div>
                  <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 flex items-center space-x-1.5 text-slate-400 shadow-sm animate-pulse">
                    <RefreshCw className="w-3 h-3 animate-spin text-blue-600" />
                    <span className="font-mono text-[9px] uppercase tracking-wider font-semibold">Tuning medical guidance...</span>
                  </div>
                </div>
              )}

              <div ref={lastMsgRef} />
            </div>

            {/* Quick Suggest Option Pills */}
            <div className="p-3 bg-white dark:bg-slate-950 border-t border-slate-100 dark:border-slate-850 shrink-0 flex flex-wrap gap-1.5">
              {messages.length === 1 && suggestOptions.map((opt) => (
                <button
                  key={opt}
                  onClick={() => handleSendMessage(opt)}
                  className="p-1.5 px-2.5 rounded-lg border border-slate-150 hover:bg-slate-50 bg-white text-[9px] font-sans font-bold text-slate-600 dark:bg-slate-900 dark:border-slate-800 dark:hover:bg-slate-800 dark:text-slate-350 hover:border-slate-300 transition uppercase tracking-wider cursor-pointer"
                >
                  {opt}
                </button>
              ))}
            </div>

            {/* Input fields */}
            <div className="p-3 bg-slate-50 dark:bg-slate-950 border-t border-slate-100 dark:border-slate-850 flex items-center gap-2.5 shrink-0">
              <input
                type="text"
                value={inputMsg}
                onChange={(e) => setInputMsg(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSendMessage(inputMsg);
                }}
                disabled={loading}
                placeholder="Direct clinical / scheduling inquiries..."
                className="flex-1 p-2.5 px-3.5 rounded-xl text-xs font-sans bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-850 text-slate-800 dark:text-slate-200 outline-none focus:border-blue-500 disabled:bg-slate-100 dark:disabled:bg-slate-800 font-light"
              />
              <button
                onClick={() => handleSendMessage(inputMsg)}
                disabled={loading || !inputMsg.trim()}
                className="p-2.5 rounded-xl bg-slate-950 text-blue-400 border border-slate-900 hover:bg-blue-600 hover:border-blue-600 hover:text-white dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 transition shadow disabled:bg-slate-200 dark:disabled:bg-slate-800 disabled:text-slate-400 outline-none cursor-pointer"
                aria-label="Send messenger message"
              >
                <Send className="w-4 h-4 shrink-0" />
              </button>
            </div>

            {/* Regulatory disclaimer */}
            <div className="py-1.5 px-4 bg-slate-50 border-t border-slate-100 dark:bg-slate-950 dark:border-slate-850 text-center flex items-center justify-center space-x-1 font-mono text-[8px] text-slate-400 select-none">
              <ShieldCheck className="w-3 h-3 text-emerald-500" />
              <span>Medical Security SSL active</span>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
