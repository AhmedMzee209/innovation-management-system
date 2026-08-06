import { Link } from 'react-router-dom';
import { Bookmark, MapPin, Clock, Briefcase, GraduationCap } from 'lucide-react';
import { Opportunity, MOCK_PROVIDERS, OPPORTUNITY_CATEGORIES } from '@/data/mockOpportunities';
import { formatDistanceToNow, isPast } from 'date-fns';
import { useDispatch, useSelector } from 'react-redux';
import { toggleBookmark } from '@/store/slices/opportunitySlice';
import { RootState } from '@/store';
import { cn } from '@/lib/utils';

export const OpportunityCard = ({ opportunity }: { opportunity: Opportunity }) => {
  const provider = MOCK_PROVIDERS.find(p => p.id === opportunity.providerId);
  const category = OPPORTUNITY_CATEGORIES.find(c => c.id === opportunity.categoryId);
  const dispatch = useDispatch();
  const isBookmarked = useSelector((state: RootState) => state.opportunity.bookmarkedIds.includes(opportunity.id));

  const deadlineDate = new Date(opportunity.deadline);
  const isExpired = isPast(deadlineDate);

  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition-shadow group flex flex-col h-full relative">
      
      {/* Banner */}
      <div className={cn("h-24 bg-gradient-to-r", opportunity.bannerColor, "relative")}>
        <div className="absolute top-3 right-3 flex gap-2">
          {opportunity.status === 'Draft' && (
            <span className="px-2.5 py-1 bg-white/20 backdrop-blur text-white text-[10px] font-bold uppercase rounded">Draft</span>
          )}
          <button 
            onClick={(e) => { e.preventDefault(); dispatch(toggleBookmark(opportunity.id)); }}
            className="w-8 h-8 bg-white/20 backdrop-blur hover:bg-white/40 rounded-full flex items-center justify-center text-white transition-colors"
          >
            <Bookmark size={14} className={isBookmarked ? 'fill-current' : ''} />
          </button>
        </div>
      </div>
      
      {/* Avatar */}
      <div className="px-5 relative">
        <img src={provider?.logo} alt={provider?.name} className="w-16 h-16 rounded-xl border-4 border-white dark:border-gray-900 absolute -top-8 bg-white object-cover" />
      </div>

      {/* Content */}
      <div className="p-5 pt-10 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <Link to={`/dashboard/opportunities/${opportunity.id}`} className="group-hover:text-[#0098c8] transition-colors">
            <h3 className="font-bold text-gray-900 dark:text-white line-clamp-2 leading-tight">{opportunity.title}</h3>
          </Link>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{provider?.name}</p>

        <div className="space-y-2 mb-6">
          <div className="flex items-center text-xs text-gray-600 dark:text-gray-400">
            <MapPin size={14} className="mr-2 text-gray-400" />
            <span className="truncate">{opportunity.location}</span>
          </div>
          <div className="flex items-center text-xs text-gray-600 dark:text-gray-400">
            <Briefcase size={14} className="mr-2 text-gray-400" />
            <span>{opportunity.type}</span>
          </div>
          <div className="flex items-center text-xs text-gray-600 dark:text-gray-400">
            <GraduationCap size={14} className="mr-2 text-gray-400" />
            <span className="truncate">{opportunity.eligibleSchools.join(', ')}</span>
          </div>
        </div>

        <div className="mt-auto">
          <div className="flex flex-wrap gap-1.5 mb-4">
            {opportunity.requiredSkills.slice(0, 3).map(skill => (
              <span key={skill} className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded text-[10px] font-bold">
                {skill}
              </span>
            ))}
            {opportunity.requiredSkills.length > 3 && (
              <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded text-[10px] font-bold">
                +{opportunity.requiredSkills.length - 3}
              </span>
            )}
          </div>

          <div className="flex items-center justify-between border-t border-gray-100 dark:border-gray-800 pt-4">
            <div className={cn("text-xs font-bold flex items-center", isExpired ? "text-red-500" : "text-emerald-600")}>
              <Clock size={14} className="mr-1.5" />
              {isExpired ? 'Expired' : `${formatDistanceToNow(deadlineDate)} left`}
            </div>
            
            <Link to={`/dashboard/opportunities/${opportunity.id}`} className="text-[#0098c8] text-xs font-bold hover:underline">
              View Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
