import { motion } from 'framer-motion';
import { Globe, ExternalLink } from 'lucide-react';
import type { ShowcasePartner } from '@/data/mockShowcase';

interface PartnerCardProps {
  partner: ShowcasePartner;
  index?: number;
}

const typeColors: Record<string, string> = {
  Academic: 'text-blue-600 bg-blue-50 dark:bg-blue-900/20',
  Corporate: 'text-purple-600 bg-purple-50 dark:bg-purple-900/20',
  Government: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20',
  NGO: 'text-amber-600 bg-amber-50 dark:bg-amber-900/20',
  International: 'text-[#0098c8] bg-[#0098c8]/10',
};

export const PartnerCard = ({ partner, index = 0 }: PartnerCardProps) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.35, delay: (index % 6) * 0.05 }}
    whileHover={{ y: -4 }}
    className="group bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm hover:shadow-lg border border-gray-100 dark:border-gray-800 transition-all text-center"
  >
    <div className="w-16 h-16 rounded-2xl mx-auto mb-4 overflow-hidden border-2 border-gray-100 dark:border-gray-700 shadow-sm">
      <img src={partner.logo} alt={partner.name} className="w-full h-full object-cover" />
    </div>

    <h3 className="font-bold text-gray-900 dark:text-white text-sm mb-1 group-hover:text-[#0098c8] transition-colors">{partner.name}</h3>

    <div className="flex items-center justify-center gap-1 text-xs text-gray-400 mb-3">
      <Globe size={12} /> {partner.country}
    </div>

    <span className={`inline-block px-2 py-1 text-xs font-bold rounded-lg mb-4 ${typeColors[partner.type]}`}>{partner.type}</span>

    <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-3 mb-4">{partner.description}</p>

    <a
      href={partner.website}
      onClick={(e) => e.preventDefault()}
      className="inline-flex items-center gap-1 text-xs font-bold text-[#0098c8] hover:underline"
    >
      Visit Website <ExternalLink size={12} />
    </a>
  </motion.div>
);
