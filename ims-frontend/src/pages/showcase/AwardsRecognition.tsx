import { useState } from 'react';
import { motion } from 'framer-motion';
import { SHOWCASE_AWARDS } from '@/data/mockShowcase';
import { AwardCard } from '@/components/showcase/AwardCard';

const TYPES = ['All', 'Innovation', 'Startup', 'Competition', 'Research', 'Special'];

export const AwardsRecognition = () => {
  const [type, setType] = useState('All');
  const filtered = type === 'All' ? SHOWCASE_AWARDS : SHOWCASE_AWARDS.filter(a => a.type === type);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="bg-gradient-to-r from-amber-500 to-yellow-500 py-16 px-6 text-center">
        <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl font-black text-white mb-3">🏆 Awards & Recognition</motion.h1>
        <p className="text-white/80">Celebrating excellence in innovation across SUZA</p>
      </div>
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-wrap gap-2 mb-8">
          {TYPES.map(t => (
            <button key={t} onClick={() => setType(t)} className={`px-4 py-1.5 rounded-full text-xs font-bold border transition-all ${type === t ? 'bg-amber-500 text-white border-amber-500 scale-105' : 'bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-700 hover:border-amber-400'}`}>{t}</button>
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {filtered.map((a, i) => <AwardCard key={a.id} award={a} index={i} />)}
        </div>
      </div>
    </div>
  );
};
