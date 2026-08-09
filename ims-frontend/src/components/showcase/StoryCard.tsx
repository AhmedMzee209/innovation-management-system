import { motion } from 'framer-motion';
import { Quote, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { SuccessStory } from '@/data/mockShowcase';

interface StoryCardProps {
  story: SuccessStory;
  index?: number;
}

export const StoryCard = ({ story, index = 0 }: StoryCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.4, delay: (index % 4) * 0.08 }}
    whileHover={{ y: -4 }}
    className="group bg-white dark:bg-gray-900 rounded-2xl shadow-sm hover:shadow-xl border border-gray-100 dark:border-gray-800 overflow-hidden transition-all"
  >
    <Link to="/showcase/success-stories">
      <div className="relative h-44 overflow-hidden">
        <img src={story.coverImage} alt={story.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        {story.featured && (
          <span className="absolute top-3 left-3 px-2 py-1 bg-[#0098c8] text-white text-xs font-bold rounded-lg">✨ Featured Story</span>
        )}
        <div className="absolute bottom-3 left-4 right-4">
          <p className="text-white text-sm font-bold leading-tight line-clamp-2">{story.title}</p>
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-center gap-3 mb-4">
          <img src={story.innovatorAvatar} alt={story.innovator} className="w-10 h-10 rounded-full border-2 border-[#0098c8]/30 flex-shrink-0" />
          <div>
            <p className="text-sm font-bold text-gray-900 dark:text-white">{story.innovator}</p>
            <p className="text-xs text-gray-500">{story.school.split('(')[1]?.replace(')', '') ?? story.school} · {story.year}</p>
          </div>
        </div>

        <div className="relative pl-4 border-l-2 border-[#0098c8]/30 mb-4">
          <Quote size={14} className="text-[#0098c8] mb-1" />
          <p className="text-xs text-gray-500 dark:text-gray-400 italic line-clamp-3">{story.summary}</p>
        </div>

        <div className="flex items-center text-xs text-[#0098c8] font-bold group-hover:gap-2 gap-1 transition-all">
          Read Story <ArrowRight size={14} />
        </div>
      </div>
    </Link>
  </motion.div>
);
