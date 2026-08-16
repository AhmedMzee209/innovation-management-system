import { ClipboardCheck, CheckCircle, Clock } from 'lucide-react';
import { StatCard } from '@/components/dashboard/widgets/StatCard';
import { useMyAssignments } from '@/hooks/useReview';
import { Loader2 } from 'lucide-react';
import { ReviewCard } from '@/components/dashboard/reviews/cards/ReviewCard';
import { isPast, parseISO } from 'date-fns';

export const ReviewDashboard = () => {
  const { data: assignments = [], isLoading } = useMyAssignments();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[50vh]">
        <Loader2 className="w-8 h-8 text-[#0098c8] animate-spin" />
      </div>
    );
  }

  const total = assignments.length;
  const pending = assignments.filter(r => r.status === 'PENDING' || r.status === 'IN_PROGRESS').length;
  const completed = assignments.filter(r => r.status === 'COMPLETED').length;
  const overdue = assignments.filter(r => r.status !== 'COMPLETED' && isPast(parseISO(r.deadline))).length;

  const urgentReviews = [...assignments]
    .filter(r => r.status !== 'COMPLETED')
    .sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime())
    .slice(0, 4);

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight flex items-center">
            <ClipboardCheck className="mr-3 text-[#0098c8]" size={28} />
            Review Dashboard
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Manage and track innovation evaluations across the ecosystem.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Assigned" value={total} trend={5} icon="FileText" />
        <StatCard title="Pending / In Progress" value={pending} trend={-2} icon="Clock" />
        <StatCard title="Evaluated" value={completed} trend={12} icon="CheckCircle" />
        <StatCard title="Overdue" value={overdue} trend={-overdue} icon="AlertCircle" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center">
              <Clock size={18} className="mr-2 text-amber-500" /> Urgent & Upcoming Deadlines
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {urgentReviews.map(rev => (
              <ReviewCard key={rev.id} review={rev} />
            ))}
          </div>
        </div>

        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm p-6">
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-4">Your Performance</h3>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600 dark:text-gray-400">Completion Rate</span>
                  <span className="font-bold text-gray-900 dark:text-white">85%</span>
                </div>
                <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-blue-50 dark:bg-blue-900/10 rounded-lg border border-blue-100 dark:border-blue-900/30">
                <div>
                  <p className="text-xs font-bold uppercase text-blue-600 dark:text-blue-400 mb-1">Avg Score Given</p>
                  <p className="text-2xl font-black text-gray-900 dark:text-white">72<span className="text-sm font-medium text-gray-500">/100</span></p>
                </div>
                <div className="w-12 h-12 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center text-blue-500 shadow-sm border border-blue-100 dark:border-blue-900/30">
                  <CheckCircle size={24} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
