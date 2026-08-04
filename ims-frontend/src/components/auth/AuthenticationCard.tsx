import { ReactNode } from 'react';
import { motion } from 'framer-motion';

export const AuthenticationCard = ({ children, title, subtitle }: { children: ReactNode; title?: string; subtitle?: string }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="bg-white dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] border border-gray-100 dark:border-gray-700/50 p-8 sm:p-10 w-full max-w-md relative z-10"
    >
      {(title || subtitle) && (
        <div className="mb-8">
          {title && <h2 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">{title}</h2>}
          {subtitle && <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">{subtitle}</p>}
        </div>
      )}
      {children}
    </motion.div>
  );
};
