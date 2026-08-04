import { motion, useSpring, useTransform } from 'framer-motion';
import { useEffect } from 'react';
import { cn } from '@/lib/utils';
import * as Icons from 'lucide-react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: number;
  trend: number; // positive or negative percentage
  icon: string;
  prefix?: string;
  suffix?: string;
  format?: 'number' | 'currency';
  className?: string;
}

export const StatCard = ({
  title,
  value,
  trend,
  icon,
  prefix = '',
  suffix = '',
  format = 'number',
  className,
}: StatCardProps) => {
  // @ts-ignore - dynamic icon access
  const IconComponent = Icons[icon] as any;
  const isPositive = trend >= 0;

  const animatedValue = useSpring(0, { stiffness: 50, damping: 20 });
  
  useEffect(() => {
    animatedValue.set(value);
  }, [value, animatedValue]);

  const displayValue = useTransform(animatedValue, (current) => {
    if (format === 'currency') {
      // Very basic formatting for currency
      if (current >= 1000000) {
        return `${prefix}${(current / 1000000).toFixed(1)}M${suffix}`;
      }
      return `${prefix}${Math.round(current).toLocaleString()}${suffix}`;
    }
    return `${prefix}${Math.round(current).toLocaleString()}${suffix}`;
  });

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={cn(
        "bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-5 shadow-sm relative overflow-hidden group",
        className
      )}
    >
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">{title}</p>
          <motion.h3 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">
            {displayValue}
          </motion.h3>
        </div>
        
        <div className="w-12 h-12 rounded-xl bg-gray-50 dark:bg-gray-800 flex items-center justify-center text-gray-400 group-hover:bg-[#0098c8]/10 group-hover:text-[#0098c8] transition-colors">
          {IconComponent && <IconComponent size={24} />}
        </div>
      </div>

      <div className="mt-4 flex items-center space-x-2">
        <div className={cn(
          "flex items-center text-xs font-bold px-2 py-1 rounded-full",
          isPositive ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
        )}>
          {isPositive ? <TrendingUp size={12} className="mr-1" /> : <TrendingDown size={12} className="mr-1" />}
          {Math.abs(trend)}%
        </div>
        <span className="text-xs font-medium text-gray-400">vs last month</span>
      </div>

      {/* Decorative background glow */}
      <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-gradient-to-br from-transparent to-[#0098c8] opacity-0 group-hover:opacity-5 transition-opacity rounded-full blur-2xl" />
    </motion.div>
  );
};
