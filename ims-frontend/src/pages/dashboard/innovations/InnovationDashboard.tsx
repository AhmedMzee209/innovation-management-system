import { LayoutDashboard, FileText, CheckCircle, Clock, Rocket, AlertCircle } from 'lucide-react';
import { StatCard } from '@/components/dashboard/widgets/StatCard';
import { MOCK_INNOVATIONS } from '@/data/mockInnovations';
import { InnovationCard } from '@/components/dashboard/innovations/cards/InnovationCard';

export const InnovationDashboard = () => {
  const total = MOCK_INNOVATIONS.length;
  const underReview = MOCK_INNOVATIONS.filter(i => i.stage === 'Under Review').length;
  const approved = MOCK_INNOVATIONS.filter(i => i.stage === 'Approved').length;
  const startups = MOCK_INNOVATIONS.filter(i => i.stage === 'Startup Formed').length;

  // Recent 4 innovations
  const recentInnovations = [...MOCK_INNOVATIONS]
    .sort((a, b) => new Date(b.submissionDate).getTime() - new Date(a.submissionDate).getTime())
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
        <StatCard id="i1" label="Total Submissions" value={total.toString()} trend={{ value: 12, isPositive: true }} icon={FileText} />
        <StatCard id="i2" label="Under Review" value={underReview.toString()} trend={{ value: 5, isPositive: false }} icon={Clock} />
        <StatCard id="i3" label="Approved" value={approved.toString()} trend={{ value: 8, isPositive: true }} icon={CheckCircle} />
        <StatCard id="i4" label="Startups Formed" value={startups.toString()} trend={{ value: 15, isPositive: true }} icon={Rocket} />
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
            <button className="w-full py-3 bg-white text-[#0098c8] font-bold rounded-lg shadow-md hover:shadow-lg hover:bg-gray-50 transition-all relative z-10">
              Submit Innovation
            </button>
          </div>

          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm p-6">
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-4 flex items-center">
              <AlertCircle size={16} className="mr-2" /> Action Needed
            </h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3 p-3 rounded-lg bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-100 dark:border-yellow-900/30">
                <div className="w-2 h-2 rounded-full bg-yellow-400 mt-1.5 shrink-0"></div>
                <div>
                  <p className="text-sm font-bold text-gray-900 dark:text-white">Review Pending</p>
                  <p className="text-xs text-gray-500 mt-0.5">3 innovations require your approval in the Blue Economy sector.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-3 rounded-lg bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30">
                <div className="w-2 h-2 rounded-full bg-blue-400 mt-1.5 shrink-0"></div>
                <div>
                  <p className="text-sm font-bold text-gray-900 dark:text-white">Mentor Assigned</p>
                  <p className="text-xs text-gray-500 mt-0.5">Dr. Khamis was assigned to INV-2024-1045.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
