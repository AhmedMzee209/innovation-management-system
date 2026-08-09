import { useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { Search, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { RootState } from '@/store';
import { setPage, setSearchQuery } from '@/store/slices/showcaseSlice';
import { SHOWCASE_STARTUPS } from '@/data/mockShowcase';
import { StartupCard } from '@/components/showcase/StartupCard';

const STAGES = ['All', 'Ideation', 'Prototype', 'MVP', 'Early Revenue', 'Growth', 'Scale-up'];
const INDUSTRIES = ['All', 'AgriTech', 'EduTech', 'FinTech', 'HealthTech', 'GreenTech', 'AI & ML', 'IoT'];

export const StartupShowcase = () => {
  const dispatch = useDispatch();
  const { searchQuery, currentPage, pageSize } = useSelector((s: RootState) => s.showcase);
  const [stage, setStage] = useState('All');
  const [industry, setIndustry] = useState('All');

  const filtered = useMemo(() => {
    let data = [...SHOWCASE_STARTUPS];
    if (stage !== 'All') data = data.filter(s => s.stage === stage);
    if (industry !== 'All') data = data.filter(s => s.industry === industry);
    if (searchQuery) data = data.filter(s => s.name.toLowerCase().includes(searchQuery.toLowerCase()) || s.tagline.toLowerCase().includes(searchQuery.toLowerCase()));
    return data;
  }, [stage, industry, searchQuery]);

  const totalPages = Math.ceil(filtered.length / pageSize);
  const paginated = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="bg-gradient-to-r from-amber-500 to-orange-500 py-16 px-6 text-center">
        <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl font-black text-white mb-3">Startup Showcase</motion.h1>
        <p className="text-white/70 mb-8">Discover {SHOWCASE_STARTUPS.length} innovative startups from SUZA</p>
        <div className="relative max-w-xl mx-auto">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50" size={18} />
          <input value={searchQuery} onChange={e => { dispatch(setSearchQuery(e.target.value)); dispatch(setPage(1)); }} placeholder="Search startups..." className="w-full pl-12 pr-10 py-3.5 bg-white/10 border border-white/30 text-white placeholder-white/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-white/40 backdrop-blur" />
          {searchQuery && <button onClick={() => dispatch(setSearchQuery(''))} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white"><X size={16} /></button>}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Filter pills */}
        <div className="flex flex-wrap gap-2 mb-6">
          {STAGES.map(s => (
            <button key={s} onClick={() => { setStage(s); dispatch(setPage(1)); }} className={`px-4 py-1.5 rounded-full text-xs font-bold border transition-all ${stage === s ? 'bg-amber-500 text-white border-amber-500 scale-105' : 'bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-700 hover:border-amber-400'}`}>{s}</button>
          ))}
        </div>
        <p className="text-sm text-gray-500 mb-6">{filtered.length} startups found</p>

        {paginated.length === 0 ? (
          <div className="py-24 text-center"><p className="text-4xl mb-4">🚀</p><h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">No Startups Found</h3></div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {paginated.map((s, i) => <StartupCard key={s.id} startup={s} index={i} />)}
          </div>
        )}

        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-12">
            <button onClick={() => dispatch(setPage(Math.max(1, currentPage - 1)))} disabled={currentPage === 1} className="p-2 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-amber-400 disabled:opacity-40 text-gray-600"><ChevronLeft size={18} /></button>
            {Array.from({ length: Math.min(7, totalPages) }, (_, i) => (
              <button key={i + 1} onClick={() => dispatch(setPage(i + 1))} className={`w-10 h-10 rounded-xl text-sm font-bold border transition-colors ${currentPage === i + 1 ? 'bg-amber-500 text-white border-amber-500' : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-amber-400'}`}>{i + 1}</button>
            ))}
            <button onClick={() => dispatch(setPage(Math.min(totalPages, currentPage + 1)))} disabled={currentPage === totalPages} className="p-2 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-amber-400 disabled:opacity-40 text-gray-600"><ChevronRight size={18} /></button>
          </div>
        )}
      </div>
    </div>
  );
};
