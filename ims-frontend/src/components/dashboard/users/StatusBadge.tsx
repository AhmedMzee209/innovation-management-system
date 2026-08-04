import { cn } from '@/lib/utils';
import { UserStatus } from '@/data/mockUsers';
import { CheckCircle2, XCircle, Clock, AlertCircle } from 'lucide-react';

interface StatusBadgeProps {
  status: UserStatus;
  className?: string;
}

export const StatusBadge = ({ status, className }: StatusBadgeProps) => {
  const getStatusStyles = () => {
    switch (status) {
      case 'Active':
        return {
          bg: 'bg-green-100 dark:bg-green-500/10',
          text: 'text-green-700 dark:text-green-400',
          icon: <CheckCircle2 size={12} className="mr-1" />,
        };
      case 'Inactive':
        return {
          bg: 'bg-gray-100 dark:bg-gray-800',
          text: 'text-gray-700 dark:text-gray-300',
          icon: <XCircle size={12} className="mr-1" />,
        };
      case 'Pending':
        return {
          bg: 'bg-yellow-100 dark:bg-yellow-500/10',
          text: 'text-yellow-700 dark:text-yellow-400',
          icon: <Clock size={12} className="mr-1" />,
        };
      case 'Suspended':
        return {
          bg: 'bg-red-100 dark:bg-red-500/10',
          text: 'text-red-700 dark:text-red-400',
          icon: <AlertCircle size={12} className="mr-1" />,
        };
      default:
        return {
          bg: 'bg-gray-100',
          text: 'text-gray-700',
          icon: null,
        };
    }
  };

  const styles = getStatusStyles();

  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold",
        styles.bg,
        styles.text,
        className
      )}
    >
      {styles.icon}
      {status}
    </span>
  );
};
