import { motion } from 'framer-motion';
import { SHOWCASE_STORIES } from '@/data/mockShowcase';
import { StoryCard } from '@/components/showcase/StoryCard';

export const SuccessStories = () => (
  <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
    <div className="bg-gradient-to-r from-purple-600 to-violet-600 py-16 px-6 text-center">
      <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl font-black text-white mb-3">Success Stories</motion.h1>
      <p className="text-white/70">Real journeys of innovation, perseverance, and impact from SUZA</p>
    </div>
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {SHOWCASE_STORIES.map((story, i) => <StoryCard key={story.id} story={story} index={i} />)}
      </div>
    </div>
  </div>
);
