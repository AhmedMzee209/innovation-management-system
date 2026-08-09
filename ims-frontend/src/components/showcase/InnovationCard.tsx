import { motion } from 'framer-motion';
import { Heart, Eye, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { ShowcaseInnovation } from '@/data/mockShowcase';
import { CATEGORY_COLORS } from './CategoryFilter';

interface InnovationCardProps {
  innovation: ShowcaseInnovation;
  index?: number;
}

export const InnovationCard = ({ innovation, index = 0 }: InnovationCardProps) => {
  const stageColors: Record<string, string> = {
    Concept: 'bg-gray-100 text-gray-600',
    Prototype: 'bg-blue-100 text-blue-700',
    Pilot: 'bg-amber-100 text-amber-700',
    Deployed: 'bg-emerald-100 text-emerald-700',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: (index % 6) * 0.05 }}
      whileHover={{ y: -4 }}
      className="group bg-white dark:bg-gray-900 rounded-2xl shadow-sm hover:shadow-xl border border-gray-100 dark:border-gray-800 overflow-hidden transition-all duration-300"
    >
      <Link to={`/showcase/innovations/${innovation.id}`}>
        <div className="relative h-48 overflow-hidden">
          <img
            src={innovation.coverImage}
            alt={innovation.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          {innovation.featured && (
            <span className="absolute top-3 left-3 px-2 py-1 bg-[#0098c8] text-white text-xs font-bold rounded-lg">
              ⭐ Featured
            </span>
          )}
          <span className={`absolute top-3 right-3 px-2 py-1 text-xs font-bold rounded-lg ${stageColors[innovation.stage] ?? ''}`}>
            {innovation.stage}
          </span>
          <div className="absolute bottom-3 left-3 flex gap-2">
            <span className={`px-2 py-0.5 text-xs font-bold rounded-full border ${CATEGORY_COLORS[innovation.category] ?? 'bg-white text-gray-700'}`}>
              {innovation.category}
            </span>
          </div>
        </div>

        <div className="p-5">
          <h3 className="font-bold text-gray-900 dark:text-white text-sm leading-tight mb-1 line-clamp-2 group-hover:text-[#0098c8] transition-colors">
            {innovation.title}
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 mb-4">
            {innovation.tagline}
          </p>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img src={innovation.teamLeadAvatar} alt={innovation.teamLead} className="w-7 h-7 rounded-full object-cover" />
              <div>
                <p className="text-xs font-bold text-gray-700 dark:text-gray-300 leading-tight">{innovation.teamLead}</p>
                <p className="text-xs text-gray-400">{innovation.school.split('(')[1]?.replace(')', '') ?? innovation.school}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-gray-400">
              <span className="flex items-center gap-1 text-xs"><Heart size={12} /> {innovation.likes}</span>
              <span className="flex items-center gap-1 text-xs"><Eye size={12} /> {innovation.views}</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};
