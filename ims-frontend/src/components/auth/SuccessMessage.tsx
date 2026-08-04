import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

interface SuccessMessageProps {
  message: string;
}

export const SuccessMessage = ({ message }: SuccessMessageProps) => {
  if (!message) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-4 rounded-xl bg-green-50/50 border border-green-200 dark:bg-green-900/20 dark:border-green-800 flex items-start space-x-3"
    >
      <CheckCircle2 className="text-green-500 shrink-0 mt-0.5" size={18} />
      <p className="text-sm font-medium text-green-800 dark:text-green-300 leading-tight">
        {message}
      </p>
    </motion.div>
  );
};
