import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { SHOWCASE_RESEARCH } from '@/data/mockShowcase';
import { ResearchCard } from '@/components/showcase/ResearchCard';

export const ResearchShowcase = () => {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('All');

  const filtered = useMemo(() => {
    let data = [...SHOWCASE_RESEARCH];
    if (status !== 'All') data = data.filter(r => r.status === status);
    if (query) data = data.filter(r => r.title.toLowerCase().includes(query.toLowerCase()));
    return data;
  }, [query, status]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 py-16 px-6 text-center">
        <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl font-black text-white mb-3">Research Showcase</motion.h1>
        <p className="text-white/70 mb-8">Explore {SHOWCASE_RESEARCH.length} cutting-edge research projects from SUZA</p>
        <div className="relative max-w-xl mx-auto">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50" size={18} />
          <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search research projects..." className="w-full pl-12 py-3.5 bg-white/10 border border-white/30 text-white placeholder-white/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-white/40 backdrop-blur" />
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex gap-2 mb-6">
          {['All', 'Ongoing', 'Completed', 'Published'].map(s => (
            <button key={s} onClick={() => setStatus(s)} className={`px-4 py-1.5 rounded-full text-xs font-bold border transition-all ${status === s ? 'bg-emerald-500 text-white border-emerald-500 scale-105' : 'bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-700 hover:border-emerald-400'}`}>{s}</button>
          ))}
        </div>
        <p className="text-sm text-gray-500 mb-6">{filtered.length} projects found</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.slice(0, 24).map((r, i) => <ResearchCard key={r.id} research={r} index={i} />)}
        </div>
      </div>
    </div>
  );
};
