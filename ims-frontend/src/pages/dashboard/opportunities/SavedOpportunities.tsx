import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { MOCK_OPPORTUNITIES } from '@/data/mockOpportunities';
import { OpportunityCard } from '@/components/dashboard/opportunities/cards/OpportunityCard';
import { Bookmark, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export const SavedOpportunities = () => {
  const bookmarkedIds = useSelector((state: RootState) => state.opportunity.bookmarkedIds);
  const savedOpps = MOCK_OPPORTUNITIES.filter(o => bookmarkedIds.includes(o.id));

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      
      <div className="mb-8">
        <Link to="/dashboard/opportunities/marketplace" className="text-sm font-medium text-gray-500 hover:text-[#0098c8] flex items-center transition-colors mb-4">
          <ArrowLeft size={16} className="mr-1" /> Back to Marketplace
        </Link>
        <h1 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight flex items-center mb-2">
          <Bookmark className="mr-3 text-amber-500" size={28} />
          Saved Opportunities
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">Review and apply to opportunities you've bookmarked.</p>
      </div>

      {savedOpps.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedOpps.map(opp => (
            <OpportunityCard key={opp.id} opportunity={opp} />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm">
          <Bookmark size={48} className="mx-auto text-gray-300 dark:text-gray-700 mb-4" />
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No saved opportunities</h3>
          <p className="text-gray-500 dark:text-gray-400 mb-6">You haven't bookmarked any opportunities yet.</p>
          <Link to="/dashboard/opportunities/marketplace" className="px-5 py-2.5 bg-[#0098c8] text-white rounded-xl text-sm font-bold hover:bg-[#007ba1] transition-colors shadow-sm inline-flex items-center">
            Explore Marketplace
          </Link>
        </div>
      )}

    </div>
  );
};
