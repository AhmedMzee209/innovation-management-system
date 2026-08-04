import { motion } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
}

export const ErrorMessage = ({ message }: ErrorMessageProps) => {
  if (!message) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="p-4 rounded-xl bg-red-50 border border-red-200 dark:bg-red-900/20 dark:border-red-800 flex items-start space-x-3 shadow-sm"
    >
      <AlertTriangle className="text-red-500 shrink-0 mt-0.5" size={18} />
      <p className="text-sm font-medium text-red-800 dark:text-red-300 leading-tight">
        {message}
      </p>
    </motion.div>
  );
};
