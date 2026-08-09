import { motion } from 'framer-motion';
import { BookOpen, FileText, Award } from 'lucide-react';
import type { ResearchProject } from '@/data/mockShowcase';

interface ResearchCardProps {
  research: ResearchProject;
  index?: number;
}

const statusColors: Record<string, string> = {
  Ongoing: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
  Completed: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
  Published: 'bg-[#0098c8]/10 text-[#0098c8]',
};

export const ResearchCard = ({ research, index = 0 }: ResearchCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.4, delay: (index % 4) * 0.06 }}
    whileHover={{ y: -3 }}
    className="group bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm hover:shadow-lg border border-gray-100 dark:border-gray-800 transition-all"
  >
    <div className="flex items-start justify-between mb-4">
      <div className="w-10 h-10 rounded-xl bg-[#0098c8]/10 flex items-center justify-center text-[#0098c8] flex-shrink-0">
        <BookOpen size={20} />
      </div>
      <span className={`px-2 py-1 text-xs font-bold rounded-lg ${statusColors[research.status]}`}>{research.status}</span>
    </div>

    <h3 className="font-bold text-gray-900 dark:text-white text-sm leading-snug mb-2 line-clamp-3 group-hover:text-[#0098c8] transition-colors">
      {research.title}
    </h3>

    <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 mb-4">{research.abstract}</p>

    <div className="flex items-center gap-2 mb-4">
      <img src={research.leadResearcherAvatar} alt={research.leadResearcher} className="w-7 h-7 rounded-full" />
      <div>
        <p className="text-xs font-bold text-gray-700 dark:text-gray-300">{research.leadResearcher}</p>
        <p className="text-xs text-gray-400">{research.school.split('(')[1]?.replace(')', '') ?? research.school}</p>
      </div>
    </div>

    <div className="flex items-center gap-4 pt-3 border-t border-gray-100 dark:border-gray-700 text-xs text-gray-400">
      <span className="flex items-center gap-1"><FileText size={12} /> {research.publications} publications</span>
      <span className="flex items-center gap-1"><Award size={12} /> {research.patents} patents</span>
      <span className="ml-auto font-bold text-gray-600 dark:text-gray-300">{research.year}</span>
    </div>
  </motion.div>
);
