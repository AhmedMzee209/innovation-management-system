import { ReviewStatus } from '@/data/mockReviews';
import { cn } from '@/lib/utils';
import { Clock, PlayCircle, CheckCircle2, AlertCircle } from 'lucide-react';

interface ReviewStatusBadgeProps {
  status: ReviewStatus;
  className?: string;
}

export const ReviewStatusBadge = ({ status, className }: ReviewStatusBadgeProps) => {
  let color = 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300';
  let Icon = Clock;

  switch (status) {
    case 'Pending':
      color = 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400';
      Icon = Clock;
      break;
    case 'In Progress':
      color = 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
      Icon = PlayCircle;
      break;
    case 'Evaluated':
      color = 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400';
      Icon = CheckCircle2;
      break;
    case 'Overdue':
      color = 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
      Icon = AlertCircle;
      break;
  }

  return (
    <span className={cn("inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold tracking-wide", color, className)}>
      <Icon size={12} className="mr-1.5 shrink-0" />
      {status}
    </span>
  );
};
