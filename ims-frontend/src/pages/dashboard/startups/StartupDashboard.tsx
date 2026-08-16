import { Building2, CheckCircle, TrendingUp, DollarSign, Users, AlertCircle, Loader2 } from 'lucide-react';
import { StatCard } from '@/components/dashboard/widgets/StatCard';
import { useStartups } from '@/hooks/useStartup';
import { StartupCard } from '@/components/dashboard/startups/cards/StartupCard';
import { Link } from 'react-router-dom';

export const StartupDashboard = () => {
  const { data: startups = [], isLoading } = useStartups();

  const total = startups.length;
  const active = startups.filter(s => s.status === 'ACTIVE').length;
  
  // Funding is not explicitly provided in StartupSummaryResponse so we'll mock the funding stat or hide it.
  // We'll show Hub count instead or active vs graduated.
  const topStartups = [...startups]
    .slice(0, 3);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="animate-spin h-8 w-8 text-[#0098c8]" />
      </div>
    );
  }

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
        <StatCard title="Total Startups" value={total} trend={12} icon="Building2" />
        <StatCard title="Active Incubation" value={active} trend={5} icon="Users" />
        <StatCard title="Graduated" value={startups.filter(s => s.status === 'GRADUATED').length} trend={8} icon="DollarSign" />
        <StatCard title="Success Rate" value={68} trend={2} icon="CheckCircle" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center">
              <TrendingUp size={18} className="mr-2 text-green-500" /> Recent Startups
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
              {['Idea Stage', 'MVP / Prototype', 'Pre-Seed', 'Seed', 'Growth / Scale'].map((stage, idx) => {
                const count = startups.filter(s => s.stageName === stage).length;
                const percentage = total === 0 ? 0 : (count / total) * 100;
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
              <h4 className="text-sm font-bold text-amber-800 dark:text-amber-400 mb-1">Pipeline Review</h4>
              <p className="text-xs text-amber-700 dark:text-amber-500">Ensure to regularly update the progression metrics of the startups listed above.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
