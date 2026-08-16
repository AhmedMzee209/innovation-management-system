import { ReviewAssignmentResponse } from '@/services/api/reviewService';
import { ReviewStatusBadge } from './ReviewStatusBadge';
import { Calendar, ChevronRight, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { format, isPast, parseISO } from 'date-fns';
import { cn } from '@/lib/utils';

export const ReviewCard = ({ review }: { review: ReviewAssignmentResponse }) => {
  const isOverdue = review.status !== 'COMPLETED' && isPast(parseISO(review.deadline));

  return (
    <div className={cn(
      "bg-white dark:bg-gray-900 border rounded-xl shadow-sm hover:shadow-md transition-all flex flex-col group h-full",
      isOverdue ? "border-red-200 dark:border-red-900/50" : "border-gray-200 dark:border-gray-800"
    )}>
      <div className="p-5 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-4">
          <span className="text-xs font-mono font-bold text-gray-500 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
            {review.innovationCode}
          </span>
          <ReviewStatusBadge status={isOverdue ? 'Overdue' : review.status} />
        </div>

        <h3 className="text-lg font-bold text-gray-900 dark:text-white leading-tight mb-2 line-clamp-2" title={review.innovationTitle}>
          {review.innovationTitle}
        </h3>
        
        <div className="space-y-2 mb-4 mt-auto">
          <div className={cn("flex items-center text-xs font-medium", isOverdue ? "text-red-600 dark:text-red-400" : "text-gray-600 dark:text-gray-400")}>
            {isOverdue ? <AlertTriangle size={14} className="mr-2 shrink-0" /> : <Calendar size={14} className="mr-2 text-gray-400 shrink-0" />}
            <span>Due {format(parseISO(review.deadline), 'MMM d, yyyy')}</span>
          </div>
        </div>
      </div>

      <div className="px-5 py-3 border-t border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/20 flex justify-end">
        <Link 
          to={review.status === 'COMPLETED' ? `/dashboard/reviews/${review.innovationId}` : `/dashboard/reviews/evaluate/${review.innovationId}`}
          className="text-sm font-bold text-[#0098c8] flex items-center group-hover:underline"
        >
          {review.status === 'COMPLETED' ? 'View Evaluation' : 'Start Review'}
          <ChevronRight size={16} className="ml-0.5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
};
