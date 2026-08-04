import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface DashboardCardProps {
  title?: string;
  subtitle?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
  contentClassName?: string;
  noPadding?: boolean;
}

export const DashboardCard = ({
  title,
  subtitle,
  action,
  children,
  className,
  contentClassName,
  noPadding = false,
}: DashboardCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className={cn(
        "bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm overflow-hidden",
        className
      )}
    >
      {(title || action) && (
        <div className="px-5 py-4 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
          <div>
            {title && <h3 className="text-base font-bold text-gray-900 dark:text-white leading-none">{title}</h3>}
            {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
          </div>
          {action && <div>{action}</div>}
        </div>
      )}
      <div className={cn(noPadding ? "" : "p-5", contentClassName)}>
        {children}
      </div>
    </motion.div>
  );
};
