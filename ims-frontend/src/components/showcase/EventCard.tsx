import { motion } from 'framer-motion';
import { Calendar, MapPin, Users } from 'lucide-react';
import type { ShowcaseEvent } from '@/data/mockShowcase';
import { format } from 'date-fns';

interface EventCardProps {
  event: ShowcaseEvent;
  index?: number;
}

const typeColors: Record<string, string> = {
  Hackathon: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
  Bootcamp: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  'Demo Day': 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
  Seminar: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
  Conference: 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400',
  Training: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400',
};

export const EventCard = ({ event, index = 0 }: EventCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.4, delay: (index % 4) * 0.06 }}
    whileHover={{ y: -4 }}
    className="group bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg border border-gray-100 dark:border-gray-800 transition-all"
  >
    <div className="relative h-40 overflow-hidden">
      <img src={event.coverImage} alt={event.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
      {event.upcoming && (
        <span className="absolute top-3 left-3 px-2 py-1 bg-emerald-500 text-white text-xs font-bold rounded-lg animate-pulse">🔴 Upcoming</span>
      )}
      <span className={`absolute top-3 right-3 px-2 py-1 text-xs font-bold rounded-lg ${typeColors[event.type]}`}>{event.type}</span>
    </div>

    <div className="p-5">
      <h3 className="font-bold text-gray-900 dark:text-white text-sm mb-3 line-clamp-2 group-hover:text-[#0098c8] transition-colors">{event.name}</h3>

      <div className="space-y-1.5 mb-3 text-xs text-gray-500 dark:text-gray-400">
        <div className="flex items-center gap-2">
          <Calendar size={13} className="text-[#0098c8] flex-shrink-0" />
          <span>{format(new Date(event.date), 'MMM d, yyyy')}</span>
        </div>
        <div className="flex items-center gap-2">
          <MapPin size={13} className="text-[#0098c8] flex-shrink-0" />
          <span className="truncate">{event.location}</span>
        </div>
        <div className="flex items-center gap-2">
          <Users size={13} className="text-[#0098c8] flex-shrink-0" />
          <span>{event.participants} participants</span>
        </div>
      </div>
    </div>
  </motion.div>
);
