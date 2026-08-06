import { useState } from 'react';
import { MOCK_PROVIDERS, MOCK_OPPORTUNITIES } from '@/data/mockOpportunities';
import { Building2, Search, Filter, MapPin, ExternalLink, Briefcase } from 'lucide-react';
import { Link } from 'react-router-dom';

export const OpportunityProviders = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProviders = MOCK_PROVIDERS.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.country.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0 mb-8">
        <div>
          <h1 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight flex items-center">
            <Building2 className="mr-3 text-emerald-600" size={28} />
            Opportunity Providers
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Discover organizations, universities, and VC firms offering opportunities.</p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 p-2 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm mb-6 flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search providers by name or country..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-transparent text-sm font-medium outline-none dark:text-white"
          />
        </div>
        <div className="w-full md:w-px h-px md:h-8 bg-gray-200 dark:bg-gray-800" />
        <button className="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white flex items-center shrink-0">
          <Filter size={16} className="mr-2" /> Filters
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProviders.map(provider => {
          const count = MOCK_OPPORTUNITIES.filter(o => o.providerId === provider.id && o.status === 'Published').length;
          
          return (
            <div 
              key={provider.id} 
              className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow group flex flex-col h-full relative"
            >
              <div className="flex items-start justify-between mb-4">
                <img src={provider.logo} alt={provider.name} className="w-16 h-16 rounded-xl border border-gray-100 dark:border-gray-800 object-cover" />
                <span className="px-2.5 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 text-[10px] font-bold uppercase rounded-lg">
                  {provider.type}
                </span>
              </div>
              
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1 group-hover:text-emerald-600 transition-colors">{provider.name}</h3>
              <div className="flex items-center text-xs font-medium text-gray-500 dark:text-gray-400 mb-4">
                <MapPin size={14} className="mr-1" /> {provider.country}
              </div>
              
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-6 flex-1 line-clamp-3">{provider.description}</p>
              
              <div className="flex items-center justify-between border-t border-gray-100 dark:border-gray-800 pt-4 mt-auto">
                <div className="flex items-center text-xs font-bold text-gray-900 dark:text-white">
                  <Briefcase size={14} className="mr-1.5 text-emerald-500" />
                  {count} Opportunities
                </div>
                <a href={provider.website} target="_blank" rel="noreferrer" className="text-[#0098c8] text-xs font-bold hover:underline flex items-center">
                  Visit <ExternalLink size={12} className="ml-1" />
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
