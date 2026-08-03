import { useState, useEffect } from 'react';
import { ArrowRight, ArrowLeft, Volume2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const slides = [
  {
    id: 1,
    title: 'SUZA Innovation Management System',
    subtitle: 'Transforming Ideas into National Impact',
    image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=1920',
  },
  {
    id: 2,
    title: 'Empowering the Next Generation of Innovators',
    subtitle: 'From Idea to Startup — We Support Every Step',
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=1920',
  },
  {
    id: 3,
    title: 'Innovation Hubs Across All Schools',
    subtitle: 'Collaborate, Build, and Scale with SUZA',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=1920',
  },
];

const announcements = [
  {
    id: 1,
    badge: 'NEW',
    title: 'Innovation Grant 2026 Open',
    description: 'Apply now for the SUZA Innovation Grant. Funding up to TZS 5,000,000 for approved projects.',
    action: 'Apply Now',
  },
  {
    id: 2,
    badge: 'NEW',
    title: 'Annual Hackathon Registration',
    description: 'SUZA Annual Hackathon 2026 — Register your team before October 1st.',
    action: 'Register',
  },
  {
    id: 3,
    badge: 'NEW',
    title: 'CAS Student Innovation Results',
    description: 'Open to view the approved innovations from the latest review cycle.',
    action: 'View Results',
  },
];

export const Hero = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const prev = () => setCurrent((c) => (c - 1 + slides.length) % slides.length);
  const next = () => setCurrent((c) => (c + 1) % slides.length);

  return (
    <section className="pt-[148px]">
      {/* ── Full-width Image Slider ── */}
      <div className="relative w-full overflow-hidden" style={{ height: '480px' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={slides[current].id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7 }}
            className="absolute inset-0"
          >
            <img
              src={slides[current].image}
              alt={slides[current].title}
              className="w-full h-full object-cover"
            />
            {/* Dark overlay */}
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(13,33,55,0.85) 0%, rgba(13,33,55,0.3) 60%, transparent 100%)' }} />
          </motion.div>
        </AnimatePresence>

        {/* Slide Text */}
        <div className="absolute bottom-20 left-0 right-0 text-center px-4 z-10">
          <motion.div
            key={`text-${current}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="max-w-3xl mx-auto bg-black/30 backdrop-blur-sm rounded-xl px-8 py-5"
          >
            <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-2 uppercase tracking-wide">
              {slides[current].title}
            </h2>
            <p className="text-blue-100 text-sm md:text-base">{slides[current].subtitle}</p>
          </motion.div>
        </div>

        {/* Prev/Next Controls */}
        <button
          onClick={prev}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/40 transition-all"
        >
          <ArrowLeft size={18} />
        </button>
        <button
          onClick={next}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/40 transition-all"
        >
          <ArrowRight size={18} />
        </button>

        {/* Dot Indicators */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className="w-3 h-3 rounded-full transition-all"
              style={{ backgroundColor: i === current ? '#e8b800' : 'rgba(255,255,255,0.5)' }}
            />
          ))}
        </div>
      </div>

      {/* ── Announcement Cards ── */}
      <div style={{ backgroundColor: '#f0f4f8' }} className="py-6 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-5">
          {announcements.map((ann, i) => (
            <motion.div
              key={ann.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 relative overflow-hidden hover:shadow-md transition-all"
            >
              {/* NEW badge */}
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
