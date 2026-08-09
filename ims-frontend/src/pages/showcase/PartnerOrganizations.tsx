import { useState } from 'react';
import { motion } from 'framer-motion';
import { SHOWCASE_PARTNERS } from '@/data/mockShowcase';
import { PartnerCard } from '@/components/showcase/PartnerCard';

const TYPES = ['All', 'Academic', 'Corporate', 'Government', 'NGO', 'International'];

export const PartnerOrganizations = () => {
  const [type, setType] = useState('All');
  const filtered = type === 'All' ? SHOWCASE_PARTNERS : SHOWCASE_PARTNERS.filter(p => p.type === type);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="bg-gradient-to-r from-slate-700 to-slate-900 py-16 px-6 text-center">
        <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl font-black text-white mb-3">Partner Organizations</motion.h1>
        <p className="text-white/70">Our global network of partners empowering innovation at SUZA</p>
      </div>
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-wrap gap-2 mb-8">
          {TYPES.map(t => (
            <button key={t} onClick={() => setType(t)} className={`px-4 py-1.5 rounded-full text-xs font-bold border transition-all ${type === t ? 'bg-slate-800 text-white border-slate-800 scale-105' : 'bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-700 hover:border-slate-600'}`}>{t}</button>
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filtered.map((p, i) => <PartnerCard key={p.id} partner={p} index={i} />)}
        </div>
      </div>
    </div>
  );
};
