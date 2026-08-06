import { FileText, Download, Building, Users } from 'lucide-react';
import { MOCK_PROVIDERS, MOCK_OPPORTUNITIES, MOCK_APPLICATIONS } from '@/data/mockOpportunities';

export const OpportunityReports = () => {
  const topProviders = MOCK_PROVIDERS.map(p => {
    const count = MOCK_OPPORTUNITIES.filter(o => o.providerId === p.id).length;
    return { ...p, count };
  }).sort((a, b) => b.count - a.count).slice(0, 5);

  const totalOpps = MOCK_OPPORTUNITIES.length;
  const totalApps = MOCK_APPLICATIONS.length;
  const acceptanceRate = ((MOCK_APPLICATIONS.filter(a => a.status === 'Accepted').length / totalApps) * 100).toFixed(1);

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0 mb-8">
        <div>
          <h1 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight flex items-center">
            <FileText className="mr-3 text-purple-600" size={28} />
            Opportunity Reports
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Generate and view detailed reports on opportunity engagement.</p>
        </div>
        <button className="px-4 py-2 bg-[#0098c8] text-white rounded-xl text-sm font-bold shadow-sm hover:bg-[#007ba1] flex items-center transition-colors">
          <Download size={16} className="mr-2" /> Generate Report
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Summary Card */}
        <div className="bg-gradient-to-br from-[#0098c8] to-blue-800 rounded-2xl p-8 text-white shadow-sm flex flex-col justify-center">
          <h3 className="text-lg font-bold mb-6 opacity-90">System Overview</h3>
          <div className="space-y-6">
            <div>
              <p className="text-sm opacity-75 mb-1 font-medium">Total Opportunities</p>
              <p className="text-4xl font-black">{totalOpps}</p>
            </div>
            <div>
              <p className="text-sm opacity-75 mb-1 font-medium">Total Applications</p>
              <p className="text-4xl font-black">{totalApps}</p>
            </div>
            <div>
              <p className="text-sm opacity-75 mb-1 font-medium">Acceptance Rate</p>
              <p className="text-4xl font-black">{acceptanceRate}%</p>
            </div>
          </div>
        </div>

        {/* Top Providers */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center">
            <Building size={18} className="mr-2 text-emerald-500" /> Top Providers
          </h3>
          <div className="space-y-4">
            {topProviders.map((provider, i) => (
              <div key={provider.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-100 dark:border-gray-800">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center font-bold text-gray-600 dark:text-gray-300 text-sm">
                    {i + 1}
                  </div>
                  <img src={provider.logo} alt={provider.name} className="w-10 h-10 rounded-lg object-cover" />
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white text-sm">{provider.name}</h4>
                    <p className="text-xs text-gray-500">{provider.type}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-black text-[#0098c8] text-lg">{provider.count}</p>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Posts</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
