import { useMemo } from 'react';
import zxcvbn from 'zxcvbn';
import { motion } from 'framer-motion';

interface PasswordStrengthProps {
  password?: string;
}

export const PasswordStrength = ({ password }: PasswordStrengthProps) => {
  const score = useMemo(() => {
    if (!password) return -1;
    const result = zxcvbn(password);
    return result.score; // 0 to 4
  }, [password]);

  const getStrengthData = () => {
    switch (score) {
      case 0: return { label: 'Very Weak', color: 'bg-red-500', text: 'text-red-500' };
      case 1: return { label: 'Weak', color: 'bg-orange-500', text: 'text-orange-500' };
      case 2: return { label: 'Fair', color: 'bg-yellow-500', text: 'text-yellow-500' };
      case 3: return { label: 'Good', color: 'bg-blue-500', text: 'text-blue-500' };
      case 4: return { label: 'Strong', color: 'bg-green-500', text: 'text-green-500' };
      default: return { label: '', color: 'bg-gray-200 dark:bg-gray-700', text: 'text-gray-400' };
    }
  };

  const { label, color, text } = getStrengthData();
  const bars = Array.from({ length: 4 });

  if (score === -1) return null; // Don't show if empty

  return (
    <div className="w-full mt-2">
      <div className="flex space-x-1.5 h-1.5 w-full">
        {bars.map((_, index) => (
          <div key={index} className="h-full flex-1 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: index <= score || (index === 0 && score === 0) ? '100%' : '0%' }}
              className={`h-full ${color}`}
              transition={{ duration: 0.3 }}
            />
          </div>
        ))}
      </div>
      <div className="mt-1 text-[11px] font-medium flex justify-between">
        <span className="text-gray-500">Password strength:</span>
        <span className={text}>{label}</span>
      </div>
    </div>
  );
};
