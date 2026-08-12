import { useState, useEffect } from 'react';
import { ArrowRight, ArrowLeft, Volume2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

export const Hero = () => {
  const [current, setCurrent] = useState(0);
  const { t } = useLanguage();

  // Reset slider when language changes
  useEffect(() => { setCurrent(0); }, [t.lang]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % t.slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [t.slides.length]);

  const prev = () => setCurrent((c) => (c - 1 + t.slides.length) % t.slides.length);
  const next = () => setCurrent((c) => (c + 1) % t.slides.length);

  const slideImages = [
    'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=1920',
    'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=1920',
    'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=1920',
  ];

  return (
    <section className="pt-[148px]">
      {/* ── Full-width Image Slider ── */}
      <div className="relative w-full overflow-hidden" style={{ height: '480px' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7 }}
            className="absolute inset-0"
          >
            <img
              src={slideImages[current]}
              alt={t.slides[current].title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(13,33,55,0.85) 0%, rgba(13,33,55,0.3) 60%, transparent 100%)' }} />
          </motion.div>
        </AnimatePresence>

        {/* Slide Text */}
        <div className="absolute bottom-20 left-0 right-0 text-center px-4 z-10">
          <motion.div
            key={`text-${current}-${t.lang}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="max-w-3xl mx-auto bg-black/30 backdrop-blur-sm rounded-xl px-8 py-5"
          >
            <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-2 uppercase tracking-wide">
              {t.slides[current].title}
            </h2>
            <p className="text-blue-100 text-sm md:text-base">{t.slides[current].subtitle}</p>
          </motion.div>
        </div>

        {/* Prev/Next Controls */}
        <button
          onClick={prev}
          aria-label="Previous slide"
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/40 transition-all"
        >
          <ArrowLeft size={18} />
        </button>
        <button
          onClick={next}
          aria-label="Next slide"
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/40 transition-all"
        >
          <ArrowRight size={18} />
        </button>

        {/* Dot Indicators */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
          {t.slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Slide ${i + 1}`}
              className="w-3 h-3 rounded-full transition-all"
              style={{ backgroundColor: i === current ? '#e8b800' : 'rgba(255,255,255,0.5)' }}
            />
          ))}
        </div>
      </div>

      {/* ── Announcement Cards ── */}
      <div style={{ backgroundColor: '#f0f4f8' }} className="py-6 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-5">
          {t.announcements.map((ann, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 relative overflow-hidden hover:shadow-md transition-all"
            >
              {/* Badge */}
              <span
                className="absolute top-3 right-3 text-[10px] font-black px-2 py-0.5 rounded text-white"
                style={{ backgroundColor: '#0098c8' }}
              >
                {ann.badge}
              </span>

              <div className="flex items-start space-x-3 mb-3">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                  style={{ backgroundColor: '#e5f6fb' }}
                >
                  <Volume2 size={16} style={{ color: '#0098c8' }} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm leading-tight">{ann.title}</h4>
                </div>
              </div>

              <p className="text-xs text-gray-500 mb-4 leading-relaxed pl-11">{ann.description}</p>

              <button
                className="ml-11 flex items-center space-x-1 text-xs font-bold py-1.5 px-4 rounded transition-all text-white"
                style={{ backgroundColor: '#0098c8' }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.backgroundColor = '#007aa3')}
                onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.backgroundColor = '#0098c8')}
              >
                <span>{ann.action}</span>
                <ArrowRight size={12} />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
