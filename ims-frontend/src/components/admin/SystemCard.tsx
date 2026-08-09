import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface SystemCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: ReactNode;
  iconBg?: string;
  trend?: string;
  trendUp?: boolean;
  progress?: number;
  progressColor?: string;
  index?: number;
}

export const SystemCard = ({ title, value, subtitle, icon, iconBg = 'bg-[#0098c8]', trend, trendUp, progress, progressColor = 'bg-[#0098c8]', index = 0 }: SystemCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.05 }}
    className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-all"
  >
    <div className="flex items-start justify-between mb-4">
      <div className={`w-12 h-12 rounded-xl ${iconBg} flex items-center justify-center text-white shadow-sm flex-shrink-0`}>
        {icon}
      </div>
      {trend && (
        <div className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-lg ${trendUp === false ? 'bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400' : trendUp === true ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400' : 'bg-gray-100 text-gray-500 dark:bg-gray-800'}`}>
          {trendUp === true ? <TrendingUp size={12} /> : trendUp === false ? <TrendingDown size={12} /> : <Minus size={12} />}
          {trend}
        </div>
      )}
    </div>
    <p className="text-3xl font-black text-gray-900 dark:text-white mb-0.5">{value}</p>
    <p className="text-sm font-semibold text-gray-500 dark:text-gray-400">{title}</p>
    {subtitle && <p className="text-xs text-gray-400 mt-0.5">{subtitle}</p>}
    {progress !== undefined && (
      <div className="mt-4">
        <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-1.5">
          <div className={`h-1.5 rounded-full ${progressColor} transition-all duration-700`} style={{ width: `${Math.min(100, progress)}%` }} />
        </div>
        <p className="text-xs text-gray-400 mt-1">{progress}% used</p>
      </div>
    )}
  </motion.div>
);
