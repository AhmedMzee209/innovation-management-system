import { useState } from 'react';
import { MOCK_ACTION_PLANS, ActionPlanStatus, ActionPlanPriority } from '@/data/mockMentorship';
import { MOCK_STARTUPS } from '@/data/mockStartups';
import { ActionPlanStatusBadge, PriorityBadge } from '@/components/dashboard/mentorship/cards/SessionStatusBadge';
import { Activity, Search, Filter, Calendar, CheckSquare, Clock, AlertTriangle, ListTodo } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

export const ActionPlans = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<ActionPlanStatus | 'All'>('All');

  const filteredTasks = MOCK_ACTION_PLANS.filter(task => {
    const startup = MOCK_STARTUPS.find(s => s.id === task.startupId);
    const matchesSearch = task.taskTitle.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (startup?.name.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesStatus = statusFilter === 'All' ? true : task.status === statusFilter;

    return matchesSearch && matchesStatus;
  }).sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());

  const getPriorityColor = (priority: ActionPlanPriority) => {
    switch (priority) {
      case 'Critical': return 'border-l-4 border-l-red-500';
      case 'High': return 'border-l-4 border-l-amber-500';
      case 'Medium': return 'border-l-4 border-l-blue-500';
      case 'Low': return 'border-l-4 border-l-gray-300 dark:border-l-gray-600';
      default: return 'border-l-4 border-l-gray-300';
    }
  };

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight flex items-center">
            <ListTodo className="mr-3 text-[#0098c8]" size={28} />
            Action Plans
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Track and manage homework and milestones assigned during mentoring sessions.</p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 p-4 border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search tasks or startups..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-sm bg-gray-50 dark:bg-gray-800/50 focus:outline-none focus:ring-2 focus:ring-[#0098c8] dark:text-white transition-shadow"
          />
        </div>
        
        <div className="flex items-center space-x-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-hide">
          {['All', 'Pending', 'In Progress', 'Completed', 'Blocked'].map(status => (
            <button 
              key={status}
              onClick={() => setStatusFilter(status as any)}
              className={cn(
                "px-4 py-2 border rounded-lg text-sm font-medium transition-colors whitespace-nowrap shadow-sm",
                statusFilter === status 
                  ? "bg-[#0098c8] text-white border-[#0098c8]" 
                  : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
              )}
            >
              {status}
            </button>
          ))}
          <button className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors shadow-sm flex items-center shrink-0">
            <Filter size={16} className="mr-2 text-gray-400" /> Filters
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm overflow-hidden flex flex-col">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/50">
                <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider w-1/2">Task</th>
                <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Startup</th>
                <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Due Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredTasks.map(task => {
                const startup = MOCK_STARTUPS.find(s => s.id === task.startupId);
                const isOverdue = new Date(task.dueDate) < new Date() && task.status !== 'Completed';
                
                return (
                  <tr key={task.id} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                    <td className="p-4">
                      <div className={cn("pl-3 py-1", getPriorityColor(task.priority))}>
                        <h4 className="font-bold text-gray-900 dark:text-white mb-1 line-clamp-1">{task.taskTitle}</h4>
                        <p className="text-xs text-gray-500 line-clamp-1">{task.description}</p>
                      </div>
                    </td>
                    <td className="p-4">
                      {startup ? (
                        <Link to={`/dashboard/startups/${startup.id}`} className="font-bold text-[#0098c8] hover:underline text-sm">
                          {startup.name}
                        </Link>
                      ) : (
                        <span className="text-gray-400 text-sm">Unknown</span>
                      )}
                    </td>
                    <td className="p-4">
                      <ActionPlanStatusBadge status={task.status} />
                    </td>
                    <td className="p-4">
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-gray-900 dark:text-gray-300">
                          {format(parseISO(task.dueDate), 'MMM d, yyyy')}
                        </span>
                        {isOverdue && (
                          <span className="text-[10px] font-bold text-red-600 flex items-center mt-1">
                            <AlertTriangle size={10} className="mr-1" /> Overdue
                          </span>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
              {filteredTasks.length === 0 && (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-gray-500">
                    No action plans found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        <div className="p-4 border-t border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900 flex items-center justify-between">
          <div className="text-sm text-gray-500">
            Showing <span className="font-bold text-gray-900 dark:text-white">{filteredTasks.length}</span> action items
          </div>
        </div>
      </div>
    </div>
  );
};
