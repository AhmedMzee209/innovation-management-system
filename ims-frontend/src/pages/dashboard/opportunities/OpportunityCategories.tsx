import { useState } from 'react';
import { OPPORTUNITY_CATEGORIES, MOCK_OPPORTUNITIES } from '@/data/mockOpportunities';
import { Layers, Search, Briefcase, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const OpportunityCategories = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCategories = OPPORTUNITY_CATEGORIES.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    c.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0 mb-8">
        <div>
          <h1 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight flex items-center">
            <Layers className="mr-3 text-purple-600" size={28} />
            Opportunity Categories
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Browse opportunities by industry sector, field of study, or technical domain.</p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 p-2 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search categories..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-transparent text-sm font-medium outline-none dark:text-white"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredCategories.map(category => {
          const count = MOCK_OPPORTUNITIES.filter(o => o.categoryId === category.id && o.status === 'Published').length;
          
          return (
            <Link 
              key={category.id} 
              to={`/dashboard/opportunities/marketplace`} 
              className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all group flex flex-col h-full"
            >
              <div className="w-12 h-12 rounded-xl bg-purple-50 dark:bg-purple-900/20 text-purple-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Layers size={24} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-purple-600 transition-colors">{category.name}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 flex-1">{category.description}</p>
              
              <div className="flex items-center justify-between border-t border-gray-100 dark:border-gray-800 pt-4 mt-auto">
                <div className="flex items-center text-xs font-bold text-gray-500">
                  <Briefcase size={14} className="mr-1.5" />
                  {count} Active
                </div>
                <ArrowRight size={16} className="text-gray-400 group-hover:text-purple-600 transition-colors" />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
