import { motion } from 'framer-motion';
import { Trophy, Medal, Award } from 'lucide-react';
import { COMPETITION_WINNERS } from '@/data/mockShowcase';

const positionColors = {
  Winner: { bg: 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800', icon: Trophy, iconColor: 'text-amber-500' },
  'Runner-up': { bg: 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700', icon: Medal, iconColor: 'text-gray-500' },
  '2nd Runner-up': { bg: 'bg-amber-50/50 dark:bg-amber-900/10 border-amber-100 dark:border-amber-900', icon: Award, iconColor: 'text-amber-700 dark:text-amber-600' },
};

export const CompetitionWinners = () => (
  <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
    <div className="bg-gradient-to-r from-amber-500 to-orange-500 py-16 px-6 text-center">
      <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl font-black text-white mb-3">🏆 Competition Winners</motion.h1>
      <p className="text-white/80">Celebrating our champions across all competitions</p>
    </div>

    <div className="max-w-5xl mx-auto px-6 py-12">
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
        <div className="grid grid-cols-5 bg-gray-50 dark:bg-gray-800 px-6 py-3 text-xs font-black uppercase tracking-widest text-gray-500">
          <span>Position</span>
          <span>Winner</span>
          <span>Competition</span>
          <span>Innovation</span>
          <span>Prize</span>
        </div>
        {COMPETITION_WINNERS.slice(0, 30).map((winner, i) => {
          const { bg, icon: Icon, iconColor } = positionColors[winner.position];
          return (
            <motion.div
              key={winner.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.03 }}
              className={`grid grid-cols-5 px-6 py-4 items-center border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors ${i === 0 ? 'border-t' : ''}`}
            >
              <div className="flex items-center gap-2">
                <Icon size={18} className={iconColor} />
                <span className="text-xs font-bold text-gray-700 dark:text-gray-300">{winner.position}</span>
              </div>
              <div className="flex items-center gap-2">
                <img src={winner.winnerAvatar} alt={winner.winner} className="w-8 h-8 rounded-full flex-shrink-0" />
                <div>
                  <p className="text-xs font-bold text-gray-900 dark:text-white leading-tight">{winner.winner}</p>
                  <p className="text-xs text-gray-400">{winner.year}</p>
                </div>
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-1">{winner.competition}</p>
              <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2">{winner.innovation}</p>
              <span className="text-xs font-bold text-emerald-600">{winner.prize}</span>
            </motion.div>
          );
        })}
      </div>
    </div>
  </div>
);
