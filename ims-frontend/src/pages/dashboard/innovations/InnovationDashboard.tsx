import { LayoutDashboard, Rocket, AlertCircle, Loader2 } from 'lucide-react';
import { StatCard } from '@/components/dashboard/widgets/StatCard';
import { InnovationCard } from '@/components/dashboard/innovations/cards/InnovationCard';
import { useInnovations } from '@/hooks/useInnovation';
import { Link } from 'react-router-dom';

export const InnovationDashboard = () => {
  const { data: innovations = [], isLoading, isError } = useInnovations();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="w-8 h-8 text-[#0098c8] animate-spin" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center h-96 text-red-500">
        Failed to load dashboard data. Please try again.
      </div>
    );
  }

  const total = innovations.length;
  const underReview = innovations.filter(i => i.currentStatus === 'UNDER_REVIEW').length;
  const approved = innovations.filter(i => i.currentStatus === 'APPROVED').length;
  const startups = innovations.filter(i => i.currentStatus === 'STARTUP_FORMED').length;

  // Recent 4 innovations
  const recentInnovations = [...innovations]
    .sort((a, b) => {
      const aDate = a.submissionDate ? new Date(a.submissionDate).getTime() : 0;
      const bDate = b.submissionDate ? new Date(b.submissionDate).getTime() : 0;
      return bDate - aDate;
    })
    .slice(0, 4);

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight flex items-center">
            <LayoutDashboard className="mr-3 text-[#0098c8]" size={28} />
            Innovation Dashboard
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Real-time metrics on the SUZA innovation lifecycle.</p>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Submissions" value={total} trend={12} icon="FileText" />
        <StatCard title="Under Review" value={underReview} trend={-5} icon="Clock" />
        <StatCard title="Approved" value={approved} trend={8} icon="CheckCircle" />
        <StatCard title="Startups Formed" value={startups} trend={15} icon="Rocket" />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Col - Recent */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">Recent Submissions</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {recentInnovations.map(inv => (
              <InnovationCard key={inv.id} innovation={inv} />
            ))}
            {recentInnovations.length === 0 && (
              <div className="col-span-full p-8 text-center text-gray-500 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800">
                No recent submissions found.
              </div>
            )}
          </div>
        </div>

        {/* Right Col - Activities/Action */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-gradient-to-br from-[#0098c8] to-[#0d2137] rounded-xl p-6 text-white shadow-lg border border-[#0098c8]/30 relative overflow-hidden group">
            <div className="absolute -right-10 -bottom-10 opacity-10 group-hover:scale-110 transition-transform duration-700">
              <Rocket size={200} />
            </div>
            <h3 className="text-xl font-black mb-2 relative z-10">Have an Idea?</h3>
            <p className="text-sm text-blue-100 mb-6 relative z-10">Start the submission process and turn your concept into reality with SUZA IMS.</p>
            <Link to="/dashboard/innovations/new" className="block text-center w-full py-3 bg-white text-[#0098c8] font-bold rounded-lg shadow-md hover:shadow-lg hover:bg-gray-50 transition-all relative z-10">
              Submit Innovation
            </Link>
          </div>

          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm p-6">
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-4 flex items-center">
              <AlertCircle size={16} className="mr-2" /> Action Needed
            </h3>
            <div className="space-y-4">
              {underReview > 0 ? (
                <div className="flex items-start space-x-3 p-3 rounded-lg bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-100 dark:border-yellow-900/30">
                  <div className="w-2 h-2 rounded-full bg-yellow-400 mt-1.5 shrink-0"></div>
                  <div>
                    <p className="text-sm font-bold text-gray-900 dark:text-white">Review Pending</p>
                    <p className="text-xs text-gray-500 mt-0.5">{underReview} innovations require your attention.</p>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-gray-500">You're all caught up!</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
