import { Users, Plus, Search, Filter } from 'lucide-react';
import { MOCK_MANAGERS, MOCK_HUBS } from '@/data/mockOrganization';
import { ManagerCard } from '@/components/dashboard/organization/cards/ManagerCard';
import { useState } from 'react';

export const ManagerList = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredManagers = MOCK_MANAGERS.filter(mgr => 
    (mgr.firstName + ' ' + mgr.lastName).toLowerCase().includes(searchQuery.toLowerCase()) || 
    mgr.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getHubName = (hubId: string) => MOCK_HUBS.find(h => h.id === hubId)?.name || 'Unknown Hub';

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight flex items-center">
            <Users className="mr-3 text-[#0098c8]" size={28} />
            Innovation Managers
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Manage personnel overseeing hubs across the ecosystem.</p>
        </div>
        <button className="px-4 py-2 bg-[#0098c8] hover:bg-[#007aa3] text-white rounded-lg text-sm font-medium transition-colors shadow-sm flex items-center">
          <Plus size={16} className="mr-2" /> Assign Manager
        </button>
      </div>

      {/* Toolbar */}
      <div className="bg-white dark:bg-gray-900 p-4 border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search managers..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-sm bg-gray-50 dark:bg-gray-800/50 focus:outline-none focus:ring-2 focus:ring-[#0098c8] dark:text-white transition-shadow"
          />
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredManagers.map(mgr => (
          <ManagerCard key={mgr.id} manager={mgr} hubName={getHubName(mgr.hubId)} />
        ))}
      </div>
    </div>
  );
};
