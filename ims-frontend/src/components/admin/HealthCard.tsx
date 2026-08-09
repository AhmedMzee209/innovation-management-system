import { motion } from 'framer-motion';
import { Activity, Clock } from 'lucide-react';
import { StatusBadge } from './StatusBadge';
import type { ServiceHealth } from '@/data/mockAdmin';
import { format } from 'date-fns';

interface HealthCardProps {
  service: ServiceHealth;
  index?: number;
}

const statusProgress: Record<string, number> = {
  Online: 100, Degraded: 65, Offline: 0, Maintenance: 40,
};
const progressColors: Record<string, string> = {
  Online: 'bg-emerald-500', Degraded: 'bg-amber-500', Offline: 'bg-red-500', Maintenance: 'bg-purple-500',
};

export const HealthCard = ({ service, index = 0 }: HealthCardProps) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.97 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay: index * 0.04 }}
    className="bg-white dark:bg-gray-900 rounded-2xl p-5 border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-all"
  >
    <div className="flex items-start justify-between mb-3">
      <div>
        <p className="text-sm font-bold text-gray-900 dark:text-white">{service.name}</p>
        <p className="text-xs text-gray-400 mt-0.5">{service.description}</p>
      </div>
      <StatusBadge status={service.status} />
    </div>

    <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-1.5 mb-3">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${statusProgress[service.status] ?? 100}%` }}
        transition={{ duration: 0.7, delay: index * 0.05 }}
        className={`h-1.5 rounded-full ${progressColors[service.status] ?? 'bg-emerald-500'}`}
      />
    </div>

    <div className="flex items-center justify-between text-xs text-gray-400">
      <div className="flex items-center gap-1">
        <Activity size={12} className="text-[#0098c8]" />
        <span>{service.latencyMs > 0 ? `${service.latencyMs}ms` : 'N/A'}</span>
        <span className="mx-1">·</span>
        <span>Uptime: <strong className="text-gray-600 dark:text-gray-300">{service.uptime}</strong></span>
      </div>
      <div className="flex items-center gap-1">
        <Clock size={12} />
        <span>{format(new Date(service.lastCheck), 'HH:mm:ss')}</span>
      </div>
    </div>
  </motion.div>
);
