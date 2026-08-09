import { Calendar, Filter } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { setFilter } from '@/store/slices/analyticsSlice';

export const FilterToolbar = () => {
  const dispatch = useDispatch();
  const filters = useSelector((state: RootState) => state.analytics);

  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-4 shadow-sm flex flex-col md:flex-row gap-4 items-start md:items-center justify-between mb-8">
      
      <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
        <div className="flex items-center text-gray-500 mr-2 shrink-0">
          <Filter size={16} className="mr-1.5" />
          <span className="text-xs font-bold uppercase tracking-wider">Filters:</span>
        </div>
        
        <select 
          value={filters.school}
          onChange={(e) => dispatch(setFilter({ school: e.target.value }))}
          className="px-3 py-1.5 bg-gray-50 dark:bg-gray-800 border-none rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 focus:ring-2 focus:ring-[#0098c8] outline-none shrink-0"
        >
          <option value="All Schools">All Schools</option>
          <option value="SoC">School of Computing</option>
          <option value="SoB">School of Business</option>
          <option value="SoE">School of Education</option>
        </select>
        
        <select 
          value={filters.category}
          onChange={(e) => dispatch(setFilter({ category: e.target.value }))}
          className="px-3 py-1.5 bg-gray-50 dark:bg-gray-800 border-none rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 focus:ring-2 focus:ring-[#0098c8] outline-none shrink-0"
        >
          <option value="All Categories">All Categories</option>
          <option value="Agriculture">Agriculture Tech</option>
          <option value="EduTech">EduTech</option>
          <option value="FinTech">FinTech</option>
        </select>
      </div>

      <div className="flex items-center gap-2 shrink-0 ml-auto md:ml-0">
        <div className="flex bg-gray-50 dark:bg-gray-800 p-1 rounded-xl">
          {[
            { id: '7d', label: '7D' },
            { id: '30d', label: '30D' },
            { id: '90d', label: '90D' },
            { id: '1y', label: '1Y' },
            { id: 'all', label: 'All' }
          ].map(opt => (
            <button
              key={opt.id}
              onClick={() => dispatch(setFilter({ dateRange: opt.id as any }))}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors ${
                filters.dateRange === opt.id 
                  ? 'bg-white dark:bg-gray-700 text-[#0098c8] shadow-sm' 
                  : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

    </div>
  );
};
