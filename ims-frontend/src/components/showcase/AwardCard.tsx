import { motion } from 'framer-motion';
import { Trophy, Star } from 'lucide-react';
import type { ShowcaseAward } from '@/data/mockShowcase';

interface AwardCardProps {
  award: ShowcaseAward;
  index?: number;
}

const typeColors: Record<string, string> = {
  Innovation: 'bg-blue-50 border-blue-200 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400',
  Startup: 'bg-amber-50 border-amber-200 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400',
  Competition: 'bg-purple-50 border-purple-200 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400',
  Research: 'bg-emerald-50 border-emerald-200 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400',
  Special: 'bg-rose-50 border-rose-200 text-rose-700 dark:bg-rose-900/20 dark:text-rose-400',
};

const trophyColor: Record<string, string> = {
  Innovation: 'text-blue-500', Startup: 'text-amber-500',
  Competition: 'text-purple-500', Research: 'text-emerald-500', Special: 'text-rose-500',
};

export const AwardCard = ({ award, index = 0 }: AwardCardProps) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.35, delay: (index % 4) * 0.07 }}
    whileHover={{ y: -4 }}
    className={`group bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm hover:shadow-lg border transition-all ${typeColors[award.type] ?? ''}`}
  >
    <div className="flex items-start justify-between mb-4">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-white dark:bg-gray-800 shadow-sm ${trophyColor[award.type]}`}>
        <Trophy size={24} />
      </div>
      <span className="text-xs font-bold text-gray-400">{award.year}</span>
    </div>

    <h3 className="font-black text-gray-900 dark:text-white text-sm mb-2 leading-tight">{award.name}</h3>
    <p className="text-xs text-gray-500 dark:text-gray-400 mb-4 line-clamp-2">{award.description}</p>

    <div className="flex items-center gap-2 mb-3">
      <img src={award.winnerAvatar} alt={award.winner} className="w-7 h-7 rounded-full" />
      <div>
        <p className="text-xs font-bold text-gray-800 dark:text-gray-200">{award.winner}</p>
        <p className="text-xs text-gray-400">{award.school.split('(')[1]?.replace(')', '') ?? award.school}</p>
      </div>
    </div>

    <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-700">
      <span className={`px-2 py-1 text-xs font-bold rounded-lg border ${typeColors[award.type]}`}>{award.type}</span>
      <span className="text-xs font-bold text-gray-700 dark:text-gray-300 flex items-center gap-1">
        <Star size={12} className="text-amber-400" fill="currentColor" /> {award.prize}
      </span>
    </div>
  </motion.div>
);
