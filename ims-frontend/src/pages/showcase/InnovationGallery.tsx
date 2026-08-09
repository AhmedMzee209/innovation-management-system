import { useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { Grid3X3, List, SlidersHorizontal, Search, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { RootState } from '@/store';
import { setPage, setViewMode, setSortBy, setSearchQuery } from '@/store/slices/showcaseSlice';
import { SHOWCASE_INNOVATIONS } from '@/data/mockShowcase';
import { InnovationCard } from '@/components/showcase/InnovationCard';
import { CategoryFilter } from '@/components/showcase/CategoryFilter';

const SCHOOLS = ['All Schools', 'School of Computing (SoC)', 'School of Business (SoB)', 'School of Education (SoE)', 'School of Natural Sciences (SoNS)', 'School of Arts (SoA)', 'School of Engineering (SoEng)'];
const STAGES = ['All Stages', 'Concept', 'Prototype', 'Pilot', 'Deployed'];

export const InnovationGallery = () => {
  const dispatch = useDispatch();
  const { searchQuery, activeCategory, sortBy, currentPage, pageSize, viewMode } = useSelector((s: RootState) => s.showcase);
  const [school, setSchool] = useState('All Schools');
  const [stage, setStage] = useState('All Stages');
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    let data = [...SHOWCASE_INNOVATIONS];
    if (activeCategory !== 'All') data = data.filter(i => i.category === activeCategory);
    if (school !== 'All Schools') data = data.filter(i => i.school === school);
    if (stage !== 'All Stages') data = data.filter(i => i.stage === stage);
    if (searchQuery) data = data.filter(i => i.title.toLowerCase().includes(searchQuery.toLowerCase()) || i.tagline.toLowerCase().includes(searchQuery.toLowerCase()));
    if (sortBy === 'popular') data.sort((a, b) => b.likes - a.likes);
    else if (sortBy === 'trending') data.sort((a, b) => b.views - a.views);
    else data.sort((a, b) => b.year - a.year);
    return data;
  }, [activeCategory, school, stage, searchQuery, sortBy]);

  const totalPages = Math.ceil(filtered.length / pageSize);
  const paginated = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0098c8] to-[#005f8a] py-16 px-6 text-center">
        <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl font-black text-white mb-3">
          Innovation Gallery
        </motion.h1>
        <p className="text-white/70 max-w-xl mx-auto mb-8">Explore {SHOWCASE_INNOVATIONS.length}+ innovations from SUZA's brightest minds</p>
        <div className="relative max-w-xl mx-auto">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50" size={18} />
          <input
            value={searchQuery}
            onChange={(e) => { dispatch(setSearchQuery(e.target.value)); dispatch(setPage(1)); }}
            placeholder="Search innovations..."
            className="w-full pl-12 pr-10 py-3.5 bg-white/10 border border-white/30 text-white placeholder-white/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-white/40 backdrop-blur"
          />
          {searchQuery && <button onClick={() => dispatch(setSearchQuery(''))} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white"><X size={16} /></button>}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Filters bar */}
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between mb-6">
          <div className="overflow-x-auto pb-1 scrollbar-hide w-full md:w-auto">
            <CategoryFilter />
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            <button onClick={() => setShowFilters(!showFilters)} className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-sm font-bold text-gray-600 dark:text-gray-400 hover:border-[#0098c8] transition-colors">
              <SlidersHorizontal size={16} /> Filters
            </button>
            <select value={sortBy} onChange={(e) => dispatch(setSortBy(e.target.value as any))} className="px-3 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-sm font-bold text-gray-600 dark:text-gray-400 outline-none">
              <option value="latest">Latest</option>
              <option value="popular">Most Liked</option>
              <option value="trending">Most Viewed</option>
            </select>
            <div className="flex items-center bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-1">
              <button onClick={() => dispatch(setViewMode('grid'))} className={`p-1.5 rounded-lg ${viewMode === 'grid' ? 'bg-[#0098c8] text-white' : 'text-gray-400'}`}><Grid3X3 size={16} /></button>
              <button onClick={() => dispatch(setViewMode('list'))} className={`p-1.5 rounded-lg ${viewMode === 'list' ? 'bg-[#0098c8] text-white' : 'text-gray-400'}`}><List size={16} /></button>
            </div>
          </div>
        </div>

        {/* Advanced Filters Panel */}
        {showFilters && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 mb-6 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-500 mb-1 uppercase tracking-wider">School</label>
              <select value={school} onChange={e => { setSchool(e.target.value); dispatch(setPage(1)); }} className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border-none rounded-xl text-sm text-gray-700 dark:text-gray-300 outline-none">
                {SCHOOLS.map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 mb-1 uppercase tracking-wider">Stage</label>
              <select value={stage} onChange={e => { setStage(e.target.value); dispatch(setPage(1)); }} className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border-none rounded-xl text-sm text-gray-700 dark:text-gray-300 outline-none">
                {STAGES.map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
          </motion.div>
        )}

        <p className="text-sm text-gray-500 mb-6">{filtered.length} innovations found</p>

        {paginated.length === 0 ? (
          <div className="py-24 text-center">
            <p className="text-4xl mb-4">🔍</p>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">No Results Found</h3>
            <p className="text-gray-500 text-sm">Try adjusting your filters or search terms.</p>
          </div>
        ) : (
          <div className={viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6' : 'flex flex-col gap-4'}>
            {paginated.map((inn, i) => <InnovationCard key={inn.id} innovation={inn} index={i} />)}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-12">
            <button onClick={() => dispatch(setPage(Math.max(1, currentPage - 1)))} disabled={currentPage === 1} className="p-2 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-[#0098c8] disabled:opacity-40 transition-colors text-gray-600 dark:text-gray-400">
              <ChevronLeft size={18} />
            </button>
            {Array.from({ length: Math.min(7, totalPages) }, (_, i) => {
              const page = i + 1;
              return (
                <button key={page} onClick={() => dispatch(setPage(page))} className={`w-10 h-10 rounded-xl text-sm font-bold border transition-colors ${currentPage === page ? 'bg-[#0098c8] text-white border-[#0098c8]' : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-[#0098c8]'}`}>
                  {page}
                </button>
              );
            })}
            {totalPages > 7 && <span className="text-gray-400 text-sm font-bold">... {totalPages}</span>}
            <button onClick={() => dispatch(setPage(Math.min(totalPages, currentPage + 1)))} disabled={currentPage === totalPages} className="p-2 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-[#0098c8] disabled:opacity-40 transition-colors text-gray-600 dark:text-gray-400">
              <ChevronRight size={18} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
