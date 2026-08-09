import { motion } from 'framer-motion';
import { ExternalLink, Link2 } from 'lucide-react';
import type { FeaturedInnovator } from '@/data/mockShowcase';

interface FeaturedInnovatorCardProps {
  innovator: FeaturedInnovator;
  index?: number;
}

const SocialIcon = ({ platform }: { platform: string }) => {
  if (platform === 'LinkedIn') return <Link2 size={14} />;
  if (platform === 'GitHub') return <Link2 size={14} />;
  return <ExternalLink size={14} />;
};

export const FeaturedInnovatorCard = ({ innovator, index = 0 }: FeaturedInnovatorCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.4, delay: (index % 4) * 0.07 }}
    whileHover={{ y: -4 }}
    className="group bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm hover:shadow-lg border border-gray-100 dark:border-gray-800 transition-all"
  >
    <div className="flex items-center gap-4 mb-4">
      <div className="relative flex-shrink-0">
        <img
          src={innovator.photo}
          alt={innovator.name}
          className="w-16 h-16 rounded-2xl object-cover border-2 border-[#0098c8]/30 shadow-sm"
        />
        {innovator.featured && (
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-[#0098c8] rounded-full flex items-center justify-center">
            <span className="text-white text-xs">✓</span>
          </div>
        )}
      </div>
      <div>
        <h3 className="font-black text-gray-900 dark:text-white text-sm group-hover:text-[#0098c8] transition-colors">{innovator.name}</h3>
        <p className="text-xs text-[#0098c8] font-bold">{innovator.title}</p>
        <p className="text-xs text-gray-400">{innovator.school.split('(')[1]?.replace(')', '') ?? innovator.school}</p>
      </div>
    </div>

    <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-3 mb-4">{innovator.bio}</p>

    <div className="mb-4">
      <p className="text-xs text-gray-400 mb-1">Key Achievement</p>
      <p className="text-xs font-bold text-gray-700 dark:text-gray-300 line-clamp-2">{innovator.achievements[0]}</p>
    </div>

    <div className="flex items-center gap-2 pt-3 border-t border-gray-100 dark:border-gray-700">
      {innovator.socialLinks.map(link => (
        <a
          key={link.platform}
          href={link.url}
          onClick={(e) => e.preventDefault()}
          aria-label={link.platform}
          className="p-1.5 rounded-lg text-gray-400 hover:text-[#0098c8] hover:bg-[#0098c8]/10 transition-colors"
        >
          <SocialIcon platform={link.platform} />
        </a>
      ))}
      <span className="ml-auto text-xs font-bold text-gray-400">{innovator.year}</span>
    </div>
  </motion.div>
);
