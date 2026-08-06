import { Building2, CheckCircle, TrendingUp, DollarSign, Users, AlertCircle } from 'lucide-react';
import { StatCard } from '@/components/dashboard/widgets/StatCard';
import { MOCK_STARTUPS } from '@/data/mockStartups';
import { StartupCard } from '@/components/dashboard/startups/cards/StartupCard';
import { Link } from 'react-router-dom';

export const StartupDashboard = () => {
  const total = MOCK_STARTUPS.length;
  const incubating = MOCK_STARTUPS.filter(s => s.incubationStatus === 'Active').length;
  const totalFunding = MOCK_STARTUPS.reduce((acc, curr) => acc + curr.totalFundingRaised, 0);
  
  const topStartups = [...MOCK_STARTUPS]
    .sort((a, b) => b.totalFundingRaised - a.totalFundingRaised)
    .slice(0, 3);

  const newStartups = [...MOCK_STARTUPS]
    .sort((a, b) => new Date(b.foundedDate).getTime() - new Date(a.foundedDate).getTime())
    .slice(0, 3);

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight flex items-center">
            <Building2 className="mr-3 text-[#0098c8]" size={28} />
            Startup Dashboard
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Monitor the ecosystem of university-backed startups and spin-offs.</p>
        </div>
        <Link 
          to="/dashboard/startups/new"
          className="px-5 py-2.5 bg-[#0098c8] text-white rounded-lg text-sm font-bold hover:bg-[#007aa3] transition-colors shadow-sm flex items-center"
        >
          <Building2 size={18} className="mr-2" /> Convert Innovation
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard id="s1" label="Total Startups" value={total.toString()} trend={{ value: 12, isPositive: true }} icon={Building2} />
        <StatCard id="s2" label="Active Incubation" value={incubating.toString()} trend={{ value: 5, isPositive: true }} icon={Users} />
        <StatCard id="s3" label="Total Funding Raised" value={`$${(totalFunding / 1000000).toFixed(1)}M`} trend={{ value: 8, isPositive: true }} icon={DollarSign} />
        <StatCard id="s4" label="Success Rate" value="68%" trend={{ value: 2, isPositive: true }} icon={CheckCircle} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center">
              <TrendingUp size={18} className="mr-2 text-green-500" /> Top Performing Startups
            </h2>
            <Link to="/dashboard/startups" className="text-sm text-[#0098c8] font-bold hover:underline">View All</Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {topStartups.map(startup => (
              <StartupCard key={startup.id} startup={startup} />
            ))}
          </div>
        </div>

        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm p-6">
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-4">Pipeline Metrics</h3>
            <div className="space-y-4">
              {['Idea', 'Prototype', 'MVP', 'Market Launch', 'Growth'].map((stage, idx) => {
                const count = MOCK_STARTUPS.filter(s => s.stage === stage).length;
                const percentage = (count / total) * 100;
                return (
                  <div key={stage}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600 dark:text-gray-400 font-medium">{stage}</span>
                      <span className="font-bold text-gray-900 dark:text-white">{count}</span>
                    </div>
                    <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-1.5">
                      <div 
                        className="bg-[#0098c8] h-1.5 rounded-full" 
                        style={{ width: `${percentage}%`, opacity: 1 - (idx * 0.15) }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          
          <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-900/30 rounded-xl p-5 flex items-start">
            <AlertCircle className="text-amber-600 dark:text-amber-400 mr-3 shrink-0 mt-0.5" size={20} />
            <div>
              <h4 className="text-sm font-bold text-amber-800 dark:text-amber-400 mb-1">Pending Milestones</h4>
              <p className="text-xs text-amber-700 dark:text-amber-500">14 startups have overdue milestones in their incubation program. Please review the pipeline.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
