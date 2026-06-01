import { useState, useRef, useEffect } from 'react';
import { ArrowLeftRight, Sparkles, Smile, ZoomIn } from 'lucide-react';
import { motion } from 'motion/react';

const smileAfterImg = '/src/assets/images/smile_transformation_after_1779977350242.png';


export default function BeforeAfter() {
  const [sliderPosition, setSliderPosition] = useState(50); // percentage (0 - 100)
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    handleMove(e.clientX);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging]);

  return (
    <section id="journey" className="py-24 bg-[#F8FAFC] dark:bg-slate-950 transition-colors duration-300 overflow-hidden relative">
      <div className="absolute right-10 bottom-10 w-96 h-96 bg-blue-200/5 dark:bg-blue-400/5 blur-3xl rounded-full" />
      
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Info Side */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <div className="inline-flex items-center space-x-2 px-4 py-1.5 bg-blue-50 text-blue-700 text-[10px] font-bold uppercase tracking-widest rounded-full border border-blue-100 dark:bg-blue-900/20 dark:border-blue-900/40 dark:text-blue-400">
              <Sparkles className="w-3.5 h-3.5" />
              <span className="tracking-widest font-semibold">Smile Makeover Registry</span>
            </div>
            
            <h2 className="font-serif text-4xl sm:text-5xl font-normal tracking-tight text-slate-900 dark:text-white leading-tight">
              Dynamic Smile <br />
              Transformations
            </h2>
            
            <p className="font-sans text-slate-500 dark:text-slate-400 text-sm leading-relaxed font-light">
              Drag or glide the interactive separator slider to witness a real-world cosmetic shift. At Aeterna, our custom dental laminates and precision bleaching therapies are designed to fit your unique oral composition, restoring total confidence.
            </p>

            <div className="space-y-4 pt-2">
              <div className="p-4 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800/80 shadow-sm flex items-start space-x-3">
                <div className="p-2 bg-amber-500/10 text-amber-600 dark:text-amber-400 rounded-xl shrink-0 mt-0.5">
                  <Smile className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-sans text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wide">
                    Baseline Discoloration (Left)
                  </h4>
                  <p className="font-sans text-xs text-slate-400 dark:text-slate-500 mt-1 leading-relaxed">
                    Organic discoloration, uneven alignment, and chemical stains before custom restorations.
                  </p>
                </div>
              </div>

              <div className="p-4 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800/80 shadow-sm flex items-start space-x-3">
                <div className="p-2 bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400 rounded-xl shrink-0 mt-0.5">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-sans text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wide">
                    Aeterna Natural Radiance (Right)
                  </h4>
                  <p className="font-sans text-xs text-slate-400 dark:text-slate-500 mt-1 leading-relaxed">
                    Completed Swiss E.max ultra-thin ceramic micro-bonding, engineered for lifetime durability.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Slider Box */}
          <div className="lg:col-span-7 flex flex-col items-center justify-center">
            
            <div 
              ref={containerRef}
              className="relative w-full max-w-[550px] aspect-[4/3] rounded-[2rem] overflow-hidden border-8 border-white dark:border-slate-900 shadow-lg cursor-ew-resize select-none"
              onMouseDown={() => setIsDragging(true)}
              onTouchStart={() => setIsDragging(true)}
            >
              {/* After Image / Right-side Underlay */}
              <img 
                src={smileAfterImg}
                alt="Smile Makeover Radiance"
                className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                referrerPolicy="no-referrer"
              />
              <div className="absolute right-4 bottom-4 px-3 py-1.5 bg-blue-600/90 text-white font-sans text-[9px] uppercase tracking-wider font-bold rounded-md z-20 shadow-sm">
                Aeterna Shade
              </div>

              {/* Before Image / Left-side Overlay */}
              <div 
                className="absolute inset-y-0 left-0 overflow-hidden" 
                style={{ width: `${sliderPosition}%` }}
              >
                <div className="absolute inset-0 w-[550px] aspect-[4/3] pointer-events-none">
                  <img 
                    src={smileAfterImg} 
                    alt="Smile Makeover Stained" 
                    className="w-full h-full object-cover select-none"
                    style={{ filter: 'sepia(0.65) saturate(1.3) brightness(0.85)' }}
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
              <div className="absolute left-4 bottom-4 px-3 py-1.5 bg-amber-500/90 text-white font-sans text-[9px] uppercase tracking-wider font-bold rounded-md z-20 shadow-sm">
                Active Staining
              </div>

              {/* Center Slider Separator Bar */}
              <div 
                className="absolute inset-y-0 w-1 bg-white cursor-ew-resize z-30"
                style={{ left: `${sliderPosition}%` }}
              >
                {/* Separator Dial */}
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-slate-900 border-4 border-white text-white flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-transform">
                  <ArrowLeftRight className="w-4 h-4" />
                </div>
              </div>
            </div>

            {/* Micro Interaction Tooltip Hint */}
            <div className="flex items-center space-x-2 mt-4 text-slate-400 dark:text-slate-500">
              <ZoomIn className="w-3.5 h-3.5 text-blue-600" />
              <span className="font-sans text-[10px] uppercase tracking-widest">
                Drag the separator dial across the smile spectrum
              </span>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
