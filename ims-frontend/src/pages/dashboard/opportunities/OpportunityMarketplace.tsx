import { useState, useMemo } from 'react';
import { Search, Filter, Grid, List, Briefcase, Bookmark as BookmarkIcon, ChevronDown, Check } from 'lucide-react';
import { MOCK_OPPORTUNITIES, OPPORTUNITY_CATEGORIES } from '@/data/mockOpportunities';
import { OpportunityCard } from '@/components/dashboard/opportunities/cards/OpportunityCard';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { setSearchQuery, setSelectedCategory, setSelectedType } from '@/store/slices/opportunitySlice';
import { Link } from 'react-router-dom';

export const OpportunityMarketplace = () => {
  const dispatch = useDispatch();
  const { searchQuery, selectedCategory, selectedType, bookmarkedIds } = useSelector((state: RootState) => state.opportunity);
  
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const activeOpportunities = useMemo(() => {
    return MOCK_OPPORTUNITIES.filter(o => o.status === 'Published');
  }, []);

  const filteredOpps = useMemo(() => {
    return activeOpportunities.filter(opp => {
      const matchesSearch = opp.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            opp.location.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || opp.categoryId === selectedCategory;
      const matchesType = selectedType === 'All' || opp.type === selectedType;
      
      return matchesSearch && matchesCategory && matchesType;
    });
  }, [activeOpportunities, searchQuery, selectedCategory, selectedType]);

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight flex items-center">
            <Briefcase className="mr-3 text-[#0098c8]" size={28} />
            Opportunity Marketplace
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Discover grants, internships, and accelerator programs tailored for you.</p>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/dashboard/opportunities/saved" className="px-4 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 rounded-xl text-sm font-bold shadow-sm hover:bg-gray-50 dark:hover:bg-gray-800 flex items-center transition-colors">
            <BookmarkIcon size={16} className="mr-2 text-gray-400" /> Saved ({bookmarkedIds.length})
          </Link>
          <Link to="/dashboard/opportunities/new" className="px-4 py-2 bg-[#0098c8] text-white rounded-xl text-sm font-bold shadow-sm hover:bg-[#007ba1] transition-colors">
            Post Opportunity
          </Link>
        </div>
      </div>

      {/* Categories */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        <button
          onClick={() => dispatch(setSelectedCategory('All'))}
          className={`px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-colors ${
            selectedCategory === 'All' 
              ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900' 
              : 'bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
          }`}
        >
          All Categories
        </button>
        {OPPORTUNITY_CATEGORIES.map(cat => (
          <button
            key={cat.id}
            onClick={() => dispatch(setSelectedCategory(cat.id))}
            className={`px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-colors flex items-center ${
              selectedCategory === cat.id 
                ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900' 
                : 'bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Toolbar */}
      <div className="bg-white dark:bg-gray-900 p-2 pl-4 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm flex flex-col md:flex-row items-center gap-4">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search opportunities, roles, or locations..." 
            value={searchQuery}
            onChange={(e) => dispatch(setSearchQuery(e.target.value))}
            className="w-full pl-8 pr-4 py-2 bg-transparent text-sm font-medium outline-none dark:text-white"
          />
        </div>
        
        <div className="w-full md:w-px h-px md:h-8 bg-gray-200 dark:bg-gray-800" />
        
        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto">
          <div className="relative">
            <select
              value={selectedType}
              onChange={(e) => dispatch(setSelectedType(e.target.value as any))}
              className="appearance-none pl-4 pr-10 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm font-bold text-gray-700 dark:text-gray-300 outline-none focus:ring-2 focus:ring-[#0098c8]"
            >
              <option value="All">All Types</option>
              <option value="Grant">Grants</option>
              <option value="Internship">Internships</option>
              <option value="Scholarship">Scholarships</option>
              <option value="Accelerator">Accelerators</option>
            </select>
            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
          </div>

          <button 
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className={`p-2 border rounded-xl transition-colors ${
              isFilterOpen 
                ? 'bg-blue-50 border-blue-200 text-blue-700 dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-400' 
                : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}
          >
            <Filter size={18} />
          </button>
          
          <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-xl p-1 shrink-0">
            <button 
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-white dark:bg-gray-700 shadow-sm text-gray-900 dark:text-white' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
            >
              <Grid size={16} />
            </button>
            <button 
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-white dark:bg-gray-700 shadow-sm text-gray-900 dark:text-white' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
            >
              <List size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredOpps.map(opp => (
          <OpportunityCard key={opp.id} opportunity={opp} />
        ))}
      </div>

      {filteredOpps.length === 0 && (
        <div className="py-20 text-center">
          <Briefcase size={48} className="mx-auto text-gray-300 dark:text-gray-700 mb-4" />
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No opportunities found</h3>
          <p className="text-gray-500 dark:text-gray-400">Try adjusting your search or filters to find what you're looking for.</p>
        </div>
      )}

    </div>
  );
};
