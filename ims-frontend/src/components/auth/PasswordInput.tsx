import { InputHTMLAttributes, forwardRef, useState } from 'react';
import { Lock, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface PasswordInputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  label?: string;
}

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, error, label = "Password", ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
      <div className="w-full relative space-y-1.5">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
            <Lock size={18} />
          </div>
          <input
            ref={ref}
            type={showPassword ? 'text' : 'password'}
            className={cn(
              "block w-full pl-10 pr-10 py-2.5 sm:text-sm rounded-xl transition-all duration-200 outline-none border",
              error 
                ? "border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-500/10 text-red-900 placeholder-red-300"
                : "border-gray-200 focus:border-[#0098c8] focus:ring-4 focus:ring-[#0098c8]/10 text-gray-900 bg-gray-50/50 hover:bg-gray-50 focus:bg-white dark:border-gray-700 dark:bg-gray-800/50 dark:text-white dark:focus:bg-gray-800",
              className
            )}
            {...props}
          />
          
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none transition-colors"
            onClick={() => setShowPassword(!showPassword)}
            tabIndex={-1} // Prevent tabbing to the eye icon for quicker form fills
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>

          {error && !showPassword && (
            <div className="absolute inset-y-0 right-8 pr-1 flex items-center pointer-events-none">
              <AlertCircle size={16} className="text-red-500" />
            </div>
          )}
        </div>
        <AnimatePresence>
          {error && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-xs text-red-500 mt-1 pl-1"
            >
              {error}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    );
  }
);
PasswordInput.displayName = 'PasswordInput';
