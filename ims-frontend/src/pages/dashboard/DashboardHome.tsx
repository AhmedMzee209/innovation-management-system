import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { Rocket, ClipboardCheck, Trophy, Banknote, AlertCircle } from 'lucide-react';
import { StatCard } from '@/components/dashboard/widgets/StatCard';
import { ActivityCard } from '@/components/dashboard/widgets/ActivityCard';
import { ChartCard } from '@/components/dashboard/charts/ChartCard';
import { LineChartWidget } from '@/components/dashboard/charts/LineChartWidget';
import { DonutChartWidget } from '@/components/dashboard/charts/DonutChartWidget';
import { DataTable } from '@/components/dashboard/tables/DataTable';
import { DashboardCard } from '@/components/dashboard/widgets/DashboardCard';
import { createColumnHelper } from '@tanstack/react-table';
import { 
  MOCK_DASHBOARD_STATS, 
  MOCK_CHART_DATA, 
  MOCK_DONUT_DATA, 
  MOCK_TABLE_DATA 
} from '@/data/dashboardMockData';

const columnHelper = createColumnHelper<any>();

const columns = [
  columnHelper.accessor('id', {
    header: 'ID',
    cell: info => <span className="font-mono text-xs font-bold text-gray-500">{info.getValue()}</span>,
  }),
  columnHelper.accessor('title', {
    header: 'Innovation Title',
    cell: info => <span className="font-bold text-gray-900 dark:text-white">{info.getValue()}</span>,
  }),
  columnHelper.accessor('author', {
    header: 'Author',
  }),
  columnHelper.accessor('school', {
    header: 'School',
  }),
  columnHelper.accessor('status', {
    header: 'Status',
    cell: info => {
      const status = info.getValue();
      let color = 'bg-gray-100 text-gray-700';
      if (status === 'Approved') color = 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
      if (status === 'Under Review') color = 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400';
      if (status === 'Rejected') color = 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
      return (
        <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${color}`}>
          {status}
        </span>
      );
    }
  }),
  columnHelper.accessor('date', {
    header: 'Date',
  }),
];
export const DashboardHome = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  
  // Basic RBAC demonstration for the dashboard widgets
  const isInnovator = user?.role === 'ROLE_INNOVATOR';
  const isReviewer = user?.role === 'ROLE_REVIEWER';

  return (
    <div className="py-6 space-y-6">
      {/* Welcome Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">
            Welcome back, {user?.firstName || 'User'}! 👋
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {isInnovator 
              ? "Here's the status of your current innovation submissions." 
              : isReviewer 
                ? "You have pending innovations waiting for your review."
                : "Here's what's happening in the innovation ecosystem today."}
          </p>
        </div>
        <div className="flex space-x-3">
          <button className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm font-bold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 shadow-sm transition-colors">
            Generate Report
          </button>
        </div>
      </div>

      {/* Stats Row - Conditionally rendered based on role */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {!isInnovator && !isReviewer && MOCK_DASHBOARD_STATS.map((stat) => (
          <StatCard key={stat.id} {...stat} />
        ))}

        {isInnovator && (
          <>
            <StatCard id="s1" label="My Submissions" value="3" trend={{ value: 1, isPositive: true }} icon={Rocket} />
            <StatCard id="s2" label="Pending Review" value="1" trend={{ value: 0, isPositive: true }} icon={ClipboardCheck} />
            <StatCard id="s3" label="Approved" value="2" trend={{ value: 100, isPositive: true }} icon={Trophy} />
            <StatCard id="s4" label="Total Funding" value="$5,000" trend={{ value: 12, isPositive: true }} icon={Banknote} />
          </>
        )}

        {isReviewer && (
          <>
            <StatCard id="r1" label="Pending Reviews" value="12" trend={{ value: 4, isPositive: false }} icon={ClipboardCheck} />
            <StatCard id="r2" label="Completed Reviews" value="45" trend={{ value: 12, isPositive: true }} icon={ClipboardCheck} />
            <StatCard id="r3" label="Average Score" value="8.5/10" trend={{ value: 2, isPositive: true }} icon={Trophy} />
            <StatCard id="r4" label="Disputes" value="0" trend={{ value: 0, isPositive: true }} icon={AlertCircle} />
          </>
        )}
      </div>

      {/* Charts Row - Only show to admins/managers */}
      {!isInnovator && !isReviewer && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <ChartCard title="Ecosystem Growth Overview" subtitle="Submissions vs Startups formed over the last 6 months">
              <LineChartWidget data={MOCK_CHART_DATA} />
            </ChartCard>
          </div>
          <div className="lg:col-span-1">
            <ChartCard title="Innovations by Stage" subtitle="Distribution of current active projects">
              <DonutChartWidget data={MOCK_DONUT_DATA} />
            </ChartCard>
          </div>
        </div>
      )}

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <DashboardCard 
            title={isInnovator ? "My Recent Submissions" : isReviewer ? "Assigned for Review" : "Recent Submissions"} 
            action={<button className="text-sm font-bold text-[#0098c8]">View All</button>} 
            noPadding
          >
            <DataTable data={MOCK_TABLE_DATA} columns={columns} className="p-0 border-0" />
          </DashboardCard>
        </div>
        <div className="lg:col-span-1">
          <ActivityCard />
        </div>
      </div>
    </div>
  );
};
