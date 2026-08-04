import { ButtonHTMLAttributes, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LoadingButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  children: ReactNode;
}

export const LoadingButton = ({ loading, children, className, disabled, ...props }: LoadingButtonProps) => {
  return (
    <button
      className={cn(
        "relative w-full flex justify-center py-2.5 px-4 border border-transparent rounded-xl text-sm font-bold text-white transition-all shadow-sm",
        "bg-[#0098c8] hover:bg-[#007aa3] focus:outline-none focus:ring-4 focus:ring-[#0098c8]/20",
        "disabled:opacity-70 disabled:cursor-not-allowed",
        className
      )}
      disabled={loading || disabled}
      {...props}
    >
      <div className="flex items-center space-x-2">
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="loader"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
            >
              <Loader2 className="animate-spin" size={18} />
            </motion.div>
          ) : null}
        </AnimatePresence>
        <span>{children}</span>
      </div>
    </button>
  );
};
