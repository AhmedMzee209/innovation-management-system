import { motion } from 'framer-motion';
import { TrendingUp, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { ShowcaseStartup } from '@/data/mockShowcase';

interface StartupCardProps {
  startup: ShowcaseStartup;
  index?: number;
}

const stageColors: Record<string, string> = {
  Ideation: 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400',
  Prototype: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  MVP: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
  'Early Revenue': 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
  Growth: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
  'Scale-up': 'bg-[#0098c8]/10 text-[#0098c8] dark:bg-blue-900/20 dark:text-blue-400',
};

export const StartupCard = ({ startup, index = 0 }: StartupCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.4, delay: (index % 6) * 0.05 }}
    whileHover={{ y: -4 }}
    className="group bg-white dark:bg-gray-900 rounded-2xl shadow-sm hover:shadow-xl border border-gray-100 dark:border-gray-800 overflow-hidden transition-all duration-300"
  >
    <Link to={`/showcase/startups/${startup.id}`}>
      <div className="relative h-36 overflow-hidden">
        <img src={startup.coverImage} alt={startup.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        {startup.featured && (
          <span className="absolute top-3 left-3 px-2 py-1 bg-amber-400 text-amber-900 text-xs font-bold rounded-lg">🔥 Hot</span>
        )}
      </div>

      <div className="p-5">
        <div className="flex items-center gap-3 mb-3">
          <img src={startup.logo} alt={startup.name} className="w-12 h-12 rounded-xl border-2 border-white dark:border-gray-800 shadow-md object-cover flex-shrink-0" />
          <div>
            <h3 className="font-black text-gray-900 dark:text-white text-sm group-hover:text-[#0098c8] transition-colors">{startup.name}</h3>
            <span className={`px-2 py-0.5 text-xs font-bold rounded-full ${stageColors[startup.stage]}`}>{startup.stage}</span>
          </div>
        </div>

        <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 mb-4">{startup.tagline}</p>

        <div className="flex items-center justify-between text-xs text-gray-400">
          <div className="flex items-center gap-1.5">
            <img src={startup.founderAvatar} alt={startup.founder} className="w-5 h-5 rounded-full" />
            <span className="font-semibold text-gray-600 dark:text-gray-300">{startup.founder}</span>
          </div>
          <div className="flex items-center gap-3">
            {startup.fundingReceived > 0 && (
              <span className="flex items-center gap-1 text-emerald-600 font-bold">
                <TrendingUp size={12} /> ${(startup.fundingReceived / 1000).toFixed(0)}K
              </span>
            )}
            <span className="flex items-center gap-1"><Users size={12} /> {startup.teamSize}</span>
          </div>
        </div>
      </div>
    </Link>
  </motion.div>
);
