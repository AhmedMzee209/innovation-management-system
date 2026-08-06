import { ActionPlan } from '@/data/mockMentorship';
import { ActionPlanStatusBadge, PriorityBadge } from './SessionStatusBadge';
import { Calendar, CheckSquare, Clock } from 'lucide-react';
import { format, parseISO } from 'date-fns';

export const ActionPlanCard = ({ task }: { task: ActionPlan }) => {
  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow flex flex-col">
      <div className="flex justify-between items-start mb-2">
        <PriorityBadge priority={task.priority} />
        <ActionPlanStatusBadge status={task.status} />
      </div>
      
      <h3 className="font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">
        {task.taskTitle}
      </h3>
      <p className="text-sm text-gray-500 mb-4 line-clamp-2 flex-1">
        {task.description}
      </p>

      <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-800">
        <div className="flex items-center text-xs text-gray-500 font-medium">
          <Calendar size={12} className="mr-1 text-gray-400" />
          Due {format(parseISO(task.dueDate), 'MMM d')}
        </div>
        {task.status === 'Completed' && task.completedDate && (
          <div className="flex items-center text-xs text-green-600 font-bold bg-green-50 px-2 py-0.5 rounded">
            <CheckSquare size={12} className="mr-1" />
            Done
          </div>
        )}
      </div>
    </div>
  );
};
