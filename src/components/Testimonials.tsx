import { useState, useEffect } from 'react';
import { PATIENT_REFLECTIONS } from '../data';
import { Star, ChevronLeft, ChevronRight, Play, X, Heart, Award, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeVideoModal, setActiveVideoModal] = useState<string | null>(null);

  const prevSlide = () => {
    setActiveIndex((prev) => (prev === 0 ? PATIENT_REFLECTIONS.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setActiveIndex((prev) => (prev === PATIENT_REFLECTIONS.length - 1 ? 0 : prev + 1));
  };

  // Video Mock data
  const videoTestimonials = [
    {
      id: 'v-1',
      patient: 'Gabriella Thorne',
      treatment: 'Veneers Smile Makeover',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop',
      duration: '1:45',
      quote: 'How Dr. Mercer designed my dream smile in 2 visits without pain.'
    },
    {
      id: 'v-2',
        patient: 'Julian Sterling',
        treatment: 'Pain-Free Root Canal',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop',
        duration: '2:10',
        quote: 'My extreme dental phobia completely vanished at Aeterna.'
      }
    ];
  
    return (
      <section id="reviews" className="py-24 bg-slate-50 dark:bg-slate-950 transition-colors duration-300 overflow-hidden text-left relative">
        <div className="absolute top-1/2 left-10 w-96 h-96 bg-blue-200/5 dark:bg-blue-400/5 blur-3xl rounded-full" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          
          {/* Section Heading */}
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <div className="inline-flex items-center space-x-2 px-4 py-1.5 bg-blue-50 text-blue-700 text-[10px] font-bold uppercase tracking-widest rounded-full border border-blue-100 dark:bg-blue-900/20 dark:border-blue-900/40 dark:text-blue-400">
              <Heart className="w-3.5 h-3.5 text-blue-600" />
              <span className="font-sans tracking-widest font-semibold">Verified Smiles</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-normal tracking-tight text-slate-900 dark:text-white leading-tight">
              Patient Transformations
            </h2>
            <p className="font-sans text-slate-500 dark:text-slate-400 text-sm leading-relaxed font-light">
              Real stories from real patients whose clinical expectations were exceeded. Discover how complete comfort changes aesthetic outcomes.
            </p>
          </div>
  
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Main Carousel Reviews (LHS) */}
            <div className="lg:col-span-12 xl:col-span-7 flex flex-col justify-between space-y-6">
              <div className="relative bg-white dark:bg-slate-900 border border-slate-150 rounded-[2rem] p-8 shadow-sm min-h-[300px] flex flex-col justify-between">
                
                {/* Review and Stars */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                    <span className="font-mono text-[10px] text-slate-400 dark:text-slate-500 font-bold ml-1.5 uppercase tracking-wider">
                      5.0 Clinical Rating
                    </span>
                  </div>
  
                  <p className="font-sans text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed italic font-light">
                    &ldquo;{PATIENT_REFLECTIONS[activeIndex].review}&rdquo;
                  </p>
                </div>
  
                {/* Patient Badge info */}
                <div className="pt-6 border-t border-slate-100 dark:border-slate-850 flex items-center justify-between">
                  <div className="flex items-center space-x-3.5">
                    <img
                      src={PATIENT_REFLECTIONS[activeIndex].image}
                      alt={PATIENT_REFLECTIONS[activeIndex].patientName}
                      className="w-11 h-11 rounded-full object-cover border-2 border-slate-100 dark:border-slate-800 shadow shadow-sm"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <h4 className="font-sans text-xs font-semibold text-slate-900 dark:text-white leading-none">
                        {PATIENT_REFLECTIONS[activeIndex].patientName}
                      </h4>
                      <span className="font-mono text-[9px] text-blue-600 dark:text-blue-400 font-semibold inline-block mt-1">
                        {PATIENT_REFLECTIONS[activeIndex].treatmentReceived}
                      </span>
                    </div>
                  </div>
  
                  <div className="flex items-center space-x-1.5">
                    <span className="font-mono text-[9px] text-slate-405">
                      {PATIENT_REFLECTIONS[activeIndex].date}
                    </span>
                  </div>
                </div>
  
              </div>
  
              {/* Slider Navigation Buttons */}
              <div className="flex items-center space-x-3 self-end pr-3">
                <button
                  onClick={prevSlide}
                  className="p-3 rounded-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition cursor-pointer"
                  aria-label="Previous review"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={nextSlide}
                  className="p-3 rounded-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition cursor-pointer"
                  aria-label="Next review"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
  
            {/* Video Testimonials Showcase (RHS) */}
            <div className="lg:col-span-12 xl:col-span-5 space-y-6">
              <div>
                <span className="font-mono text-[9px] uppercase tracking-widest text-blue-600 dark:text-blue-400 font-bold block mb-1">
                  Video Testimonials
                </span>
                <h3 className="font-serif text-2xl font-normal text-slate-900 dark:text-white leading-tight">
                  Patient Journeys on Video
                </h3>
              </div>
  
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {videoTestimonials.map((v) => (
                  <div
                    key={v.id}
                    onClick={() => setActiveVideoModal(v.id)}
                    className="group relative rounded-2xl overflow-hidden aspect-[12/9] border-4 border-slate-100 dark:border-slate-900 shadow-sm cursor-pointer hover:shadow-lg transition"
                  >
                    <img
                      src={v.image}
                      alt={v.patient}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition duration-500"
                      referrerPolicy="no-referrer"
                    />
                    {/* Glass tint dark veneer overlay */}
                    <div className="absolute inset-0 bg-slate-950/40 group-hover:bg-slate-950/30 transition-colors pointer-events-none" />
                    
                    {/* Play circle trigger overlay */}
                    <div className="absolute inset-0 m-auto w-11 h-11 rounded-full bg-white/95 group-hover:bg-blue-600 text-slate-900 group-hover:text-white flex items-center justify-center shadow transition-all duration-300 group-hover:scale-110">
                      <Play className="w-4.5 h-4.5 fill-current ml-0.5" />
                    </div>
  
                    <div className="absolute left-3 bottom-3 right-3 text-white leading-tight text-left z-10 pointer-events-none">
                      <span className="inline-block px-1.5 py-0.5 rounded bg-slate-900/60 backdrop-blur-md text-[8px] font-mono uppercase tracking-wide">
                        {v.treatment}
                      </span>
                      <h4 className="font-sans text-xs font-semibold leading-none mt-1.5">
                        {v.patient} &bull; {v.duration}
                      </h4>
                    </div>
                  </div>
                ))}
              </div>
            </div>
  
          </div>
  
        </div>
  
        {/* Video Simulated Modal dialog */}
        <AnimatePresence>
          {activeVideoModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setActiveVideoModal(null)}
                className="absolute inset-0 bg-slate-950/60 backdrop-blur-md"
              />
  
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="relative w-full max-w-2xl aspect-video rounded-3xl overflow-hidden bg-slate-950 border-4 border-slate-900 shadow-2xl z-10 p-2 flex flex-col justify-end"
              >
                {/* Simulated Screen with actual video aesthetics */}
                <div className="absolute inset-0 w-full h-full bg-slate-900 flex flex-col items-center justify-center text-slate-300">
                  
                  {/* Simulated close action */}
                  <button
                    onClick={() => setActiveVideoModal(null)}
                    className="absolute top-4 right-4 p-2 rounded-full bg-slate-950/55 hover:bg-slate-950 border border-white/10 text-white z-30 cursor-pointer"
                    aria-label="Close video player"
                  >
                    <X className="w-4 h-4" />
                  </button>
  
                  {/* Simulated playback visual stream */}
                  <div className="p-8 text-center space-y-4 max-w-md">
                    <div className="w-16 h-16 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-500 mx-auto flex items-center justify-center relative">
                      <Play className="w-6 h-6 fill-blue-500 animate-ping absolute opacity-30" />
                      <Play className="w-6 h-6 fill-blue-500 ml-1" />
                    </div>
                    <div>
                      <h4 className="font-sans text-sm font-semibold text-white uppercase tracking-wider">
                        {videoTestimonials.find((v) => v.id === activeVideoModal)?.patient}&rsquo;s Smile Session
                      </h4>
                      <p className="font-sans text-slate-400 text-xs italic mt-2">
                        &ldquo;{videoTestimonials.find((v) => v.id === activeVideoModal)?.quote}&rdquo;
                      </p>
                    </div>
                    <div className="flex items-center justify-center space-x-3.5 pt-4 text-[10px] font-mono text-slate-400/80">
                      <span className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800">1080P PRORES</span>
                      <span className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800">AAC STEREO</span>
                    </div>
                  </div>
  
                  {/* Progress bar stream mockup */}
                  <div className="absolute bottom-6 left-6 right-6 flex items-center gap-3">
                    <span className="font-mono text-[9px]">0:12</span>
                    <div className="flex-1 h-1.5 bg-slate-800 rounded-full overflow-hidden relative">
                      <div className="absolute inset-y-0 left-0 bg-blue-600 w-[15%]" />
                    </div>
                    <span className="font-mono text-[9px]">{videoTestimonials.find((v) => v.id === activeVideoModal)?.duration}</span>
                  </div>
  
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </section>
  );
}
