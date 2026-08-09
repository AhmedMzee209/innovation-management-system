import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, Lightbulb, Rocket, BookOpen, Calendar, Trophy, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SHOWCASE_INNOVATIONS, SHOWCASE_STARTUPS, SHOWCASE_RESEARCH, SHOWCASE_EVENTS, SHOWCASE_AWARDS, SHOWCASE_INNOVATORS } from '@/data/mockShowcase';

type SearchTab = 'innovations' | 'startups' | 'research' | 'events' | 'awards' | 'innovators';

const TABS: { id: SearchTab; label: string; icon: typeof Lightbulb; color: string }[] = [
  { id: 'innovations', label: 'Innovations', icon: Lightbulb, color: 'text-[#0098c8]' },
  { id: 'startups', label: 'Startups', icon: Rocket, color: 'text-amber-500' },
  { id: 'research', label: 'Research', icon: BookOpen, color: 'text-emerald-500' },
  { id: 'events', label: 'Events', icon: Calendar, color: 'text-rose-500' },
  { id: 'awards', label: 'Awards', icon: Trophy, color: 'text-amber-600' },
  { id: 'innovators', label: 'Innovators', icon: Users, color: 'text-indigo-500' },
];

export const PublicSearch = () => {
  const [query, setQuery] = useState('');
  const [activeTab, setActiveTab] = useState<SearchTab>('innovations');

  const results = useMemo(() => {
    const q = query.toLowerCase();
    if (!q) return [];
    switch (activeTab) {
      case 'innovations': return SHOWCASE_INNOVATIONS.filter(i => i.title.toLowerCase().includes(q) || i.category.toLowerCase().includes(q)).slice(0, 12);
      case 'startups': return SHOWCASE_STARTUPS.filter(s => s.name.toLowerCase().includes(q) || s.industry.toLowerCase().includes(q)).slice(0, 12);
      case 'research': return SHOWCASE_RESEARCH.filter(r => r.title.toLowerCase().includes(q)).slice(0, 12);
      case 'events': return SHOWCASE_EVENTS.filter(e => e.name.toLowerCase().includes(q)).slice(0, 12);
      case 'awards': return SHOWCASE_AWARDS.filter(a => a.name.toLowerCase().includes(q)).slice(0, 12);
      case 'innovators': return SHOWCASE_INNOVATORS.filter(i => i.name.toLowerCase().includes(q)).slice(0, 12);
      default: return [];
    }
  }, [query, activeTab]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="bg-gradient-to-br from-[#0098c8] to-[#003f5c] py-20 px-6 text-center">
        <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl font-black text-white mb-3">Search the Showcase</motion.h1>
        <p className="text-white/70 mb-8">Find innovations, startups, research, events, awards and innovators</p>
        <div className="relative max-w-2xl mx-auto">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-white/50" size={22} />
          <input
            autoFocus
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Type to search..."
            className="w-full pl-14 pr-6 py-5 bg-white/10 border border-white/30 text-white placeholder-white/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-white/40 text-lg backdrop-blur"
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Tab selector */}
        <div className="flex overflow-x-auto scrollbar-hide gap-2 mb-8">
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap border transition-all flex-shrink-0 ${activeTab === tab.id ? `bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 ${tab.color} shadow-sm` : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
            >
              <tab.icon size={16} className={activeTab === tab.id ? tab.color : ''} /> {tab.label}
            </button>
          ))}
        </div>

        {!query ? (
          <div className="py-24 text-center">
            <Search size={48} className="text-gray-200 dark:text-gray-700 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Start Searching</h3>
            <p className="text-gray-500 text-sm">Enter a keyword above to search across {activeTab}</p>
          </div>
        ) : results.length === 0 ? (
          <div className="py-24 text-center">
            <p className="text-4xl mb-4">🔍</p>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">No Results for "{query}"</h3>
            <p className="text-gray-500 text-sm">Try a different keyword or switch tabs.</p>
          </div>
        ) : (
          <>
            <p className="text-sm text-gray-500 mb-6">{results.length} results for "{query}"</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {results.map((item: any, i: number) => (
                <motion.div key={item.id ?? i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}
                  className="bg-white dark:bg-gray-900 rounded-2xl p-5 border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-all group"
                >
                  <div className="flex items-start gap-4">
                    {(item.coverImage || item.logo || item.photo) && (
                      <img src={item.coverImage ?? item.logo ?? item.photo} alt={item.title ?? item.name} className="w-14 h-14 rounded-xl object-cover flex-shrink-0 border border-gray-100 dark:border-gray-700" />
                    )}
                    <div>
                      <h3 className="font-bold text-gray-900 dark:text-white text-sm group-hover:text-[#0098c8] transition-colors leading-tight mb-1 line-clamp-2">
                        {item.title ?? item.name}
                      </h3>
                      <p className="text-xs text-gray-400">{item.category ?? item.type ?? item.area ?? item.industry ?? item.school ?? ''}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
