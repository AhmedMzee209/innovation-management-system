import { motion } from 'framer-motion';
import { SHOWCASE_INNOVATORS } from '@/data/mockShowcase';
import { FeaturedInnovatorCard } from '@/components/showcase/FeaturedInnovatorCard';

export const FeaturedInnovators = () => (
  <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
    <div className="bg-gradient-to-r from-indigo-600 to-violet-600 py-16 px-6 text-center">
      <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl font-black text-white mb-3">Featured Innovators</motion.h1>
      <p className="text-white/70">Meet the brilliant minds behind SUZA's innovations</p>
    </div>
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {SHOWCASE_INNOVATORS.map((inn, i) => <FeaturedInnovatorCard key={inn.id} innovator={inn} index={i} />)}
      </div>
    </div>
  </div>
);
