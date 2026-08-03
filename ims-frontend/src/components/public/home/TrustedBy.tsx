import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import suzaLogo from '@/assets/images/suza-logo.png';

export const TrustedBy = () => {
  const partners = [
    { name: 'State University of Zanzibar (SUZA)', logo: suzaLogo },
    { name: 'Ministry of Education', logo: 'https://via.placeholder.com/150x150?text=Gov' },
    { name: 'Blue Economy', logo: 'https://via.placeholder.com/150x150?text=Blue' },
    { name: 'Tech Innovators', logo: 'https://via.placeholder.com/150x150?text=Tech' },
    { name: 'Global VC', logo: 'https://via.placeholder.com/150x150?text=VC' },
    { name: 'Research Institute', logo: 'https://via.placeholder.com/150x150?text=Research' },
  ];

  // For responsive slider grouping
  const getItemsPerSlide = () => (window.innerWidth < 768 ? 1 : window.innerWidth < 1024 ? 2 : 3);
  const [itemsPerSlide, setItemsPerSlide] = useState(3);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const updateSize = () => setItemsPerSlide(getItemsPerSlide());
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  const totalSlides = Math.ceil(partners.length / itemsPerSlide);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 5000);
    return () => clearInterval(timer);
  }, [totalSlides]);

  const prev = () => setCurrentSlide((c) => (c - 1 + totalSlides) % totalSlides);
  const next = () => setCurrentSlide((c) => (c + 1) % totalSlides);

  // Group partners into slides
  const slides = Array.from({ length: totalSlides }, (_, i) =>
    partners.slice(i * itemsPerSlide, i * itemsPerSlide + itemsPerSlide)
  );

  return (
    <section className="py-16" style={{ backgroundColor: '#f0f4f8' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* NACTVET-style Header & Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 space-y-6 md:space-y-0">
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-1 h-8 rounded-sm" style={{ backgroundColor: '#0098c8' }} />
              <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900">Trusted by leading organizations</h2>
            </div>
            <p className="text-sm text-gray-500 ml-5 max-w-2xl">
              Collaborating with leading organizations to advance innovation, research, and technical excellence across Tanzania and beyond.
            </p>
          </div>

          {/* Nav Arrows */}
          <div className="flex items-center space-x-3 pr-2">
            <button 
              onClick={prev}
              className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:text-gray-900 hover:shadow-md transition-all"
            >
              <ChevronLeft size={20} />
            </button>
            <button 
              onClick={next}
              className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:text-gray-900 hover:shadow-md transition-all"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Slider Track */}
        <div className="relative overflow-hidden w-full pb-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {slides[currentSlide]?.map((partner, idx) => (
                <div 
                  key={idx}
                  className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex items-center space-x-5 hover:shadow-md transition-all duration-300"
                >
                  {/* Logo Container */}
                  <div className="w-16 h-16 shrink-0 flex items-center justify-center">
                    <img 
                      src={partner.logo} 
                      alt={partner.name} 
                      className="max-h-16 max-w-16 object-contain"
                    />
                  </div>
                  {/* Organization Name */}
                  <div className="flex-1">
                    <h3 className="text-sm font-bold text-gray-900 leading-tight">
                      {partner.name}
                    </h3>
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* NACTVET-style Dots */}
        <div className="flex justify-center items-center space-x-2 mt-4">
          {Array.from({ length: totalSlides }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className="h-2 rounded-full transition-all duration-300"
              style={{ 
                width: i === currentSlide ? '24px' : '8px',
                backgroundColor: i === currentSlide ? '#0098c8' : '#cbd5e1'
              }}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
        
      </div>
    </section>
  );
};
