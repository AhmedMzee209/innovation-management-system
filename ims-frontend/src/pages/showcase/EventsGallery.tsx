import { useState } from 'react';
import { motion } from 'framer-motion';
import { SHOWCASE_EVENTS } from '@/data/mockShowcase';
import { EventCard } from '@/components/showcase/EventCard';

const TYPES = ['All', 'Hackathon', 'Bootcamp', 'Demo Day', 'Seminar', 'Conference', 'Training'];

export const EventsGallery = () => {
  const [type, setType] = useState('All');
  const [tab, setTab] = useState<'upcoming' | 'past'>('upcoming');

  const filtered = SHOWCASE_EVENTS
    .filter(e => type === 'All' || e.type === type)
    .filter(e => tab === 'upcoming' ? e.upcoming : !e.upcoming);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="bg-gradient-to-r from-rose-600 to-pink-600 py-16 px-6 text-center">
        <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl font-black text-white mb-3">Events Gallery</motion.h1>
        <p className="text-white/70">Hackathons, bootcamps, demo days and more from SUZA</p>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex items-center gap-4 mb-6">
          <div className="flex bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-1">
            {(['upcoming', 'past'] as const).map(t => (
              <button key={t} onClick={() => setTab(t)} className={`px-5 py-2 rounded-lg text-sm font-bold transition-colors capitalize ${tab === t ? 'bg-rose-500 text-white shadow' : 'text-gray-500'}`}>{t}</button>
            ))}
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mb-8">
          {TYPES.map(t => (
            <button key={t} onClick={() => setType(t)} className={`px-4 py-1.5 rounded-full text-xs font-bold border transition-all ${type === t ? 'bg-rose-500 text-white border-rose-500 scale-105' : 'bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-700 hover:border-rose-400'}`}>{t}</button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="py-24 text-center"><p className="text-4xl mb-4">📅</p><h3 className="text-lg font-bold text-gray-900 dark:text-white">No Events Found</h3></div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((e, i) => <EventCard key={e.id} event={e} index={i} />)}
          </div>
        )}
      </div>
    </div>
  );
};
