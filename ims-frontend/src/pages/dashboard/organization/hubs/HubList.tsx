import { Globe, Plus, Search, Filter } from 'lucide-react';
import { MOCK_HUBS } from '@/data/mockOrganization';
import { HubCard } from '@/components/dashboard/organization/cards/HubCard';
import { useState } from 'react';

export const HubList = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredHubs = MOCK_HUBS.filter(hub => 
    hub.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    hub.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const centralHubs = filteredHubs.filter(h => h.type === 'Central');
  const schoolHubs = filteredHubs.filter(h => h.type === 'School');

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight flex items-center">
            <Globe className="mr-3 text-[#0098c8]" size={28} />
            Innovation Hubs
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Manage Central and School-level innovation hubs.</p>
        </div>
        <button className="px-4 py-2 bg-[#0098c8] hover:bg-[#007aa3] text-white rounded-lg text-sm font-medium transition-colors shadow-sm flex items-center">
          <Plus size={16} className="mr-2" /> Add Hub
        </button>
      </div>

      {/* Toolbar */}
      <div className="bg-white dark:bg-gray-900 p-4 border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search hubs..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-sm bg-gray-50 dark:bg-gray-800/50 focus:outline-none focus:ring-2 focus:ring-[#0098c8] dark:text-white transition-shadow"
          />
        </div>
      </div>

      {/* Central Hubs Section */}
      {centralHubs.length > 0 && (
        <div>
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Central Hubs</h2>
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {centralHubs.map(hub => (
              <div key={hub.id} className="xl:col-span-2">
                <HubCard hub={hub} />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* School Hubs Section */}
      {schoolHubs.length > 0 && (
        <div className="pt-4">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">School Hubs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {schoolHubs.map(hub => (
              <HubCard key={hub.id} hub={hub} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
