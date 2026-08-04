import { Layers, Search } from 'lucide-react';
import { INNOVATION_CATEGORIES, MOCK_INNOVATIONS } from '@/data/mockInnovations';
import { CategoryCard } from '@/components/dashboard/innovations/cards/CategoryCard';
import { useState } from 'react';

export const Categories = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCategories = INNOVATION_CATEGORIES.filter(c => 
    c.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
    c.desc.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getCount = (categoryId: string) => MOCK_INNOVATIONS.filter(i => i.categoryId === categoryId).length;

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight flex items-center">
            <Layers className="mr-3 text-[#0098c8]" size={28} />
            Innovation Categories
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Browse the diverse domains of research and innovation across the university.</p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 p-4 border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search categories by name or description..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-sm bg-gray-50 dark:bg-gray-800/50 focus:outline-none focus:ring-2 focus:ring-[#0098c8] dark:text-white transition-shadow"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredCategories.map(cat => (
          <CategoryCard key={cat.id} category={cat} count={getCount(cat.id)} />
        ))}
      </div>
    </div>
  );
};
