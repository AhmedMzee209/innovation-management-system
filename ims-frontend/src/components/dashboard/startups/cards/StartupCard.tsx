import { Startup } from '@/data/mockStartups';
import { StageBadge, FundingBadge } from './StartupStatusBadge';
import { Building2, ArrowRight, Layers, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

export const StartupCard = ({ startup }: { startup: Startup }) => {
  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm hover:shadow-md transition-all flex flex-col group h-full">
      <div className="p-5 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-4">
          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-sm shrink-0">
            <Building2 size={24} className="text-white" />
          </div>
          <StageBadge stage={startup.stage} />
        </div>

        <h3 className="text-lg font-bold text-gray-900 dark:text-white leading-tight mb-1 line-clamp-1" title={startup.name}>
          {startup.name}
        </h3>
        <p className="text-sm text-gray-500 mb-4 line-clamp-2 min-h-[40px]">
          {startup.tagline}
        </p>
        
        <div className="space-y-2 mb-4 mt-auto">
          <div className="flex items-center text-xs text-gray-600 dark:text-gray-400">
            <Layers size={14} className="mr-2 text-gray-400 shrink-0" />
            <span className="truncate">{startup.industry}</span>
          </div>
          <div className="flex items-center text-xs text-gray-600 dark:text-gray-400">
            <Users size={14} className="mr-2 text-gray-400 shrink-0" />
            <span className="truncate">{startup.team.length} Team Members</span>
          </div>
        </div>

        <div className="pt-4 border-t border-gray-100 dark:border-gray-800 flex justify-between items-center">
          <FundingBadge status={startup.fundingStatus} />
          {startup.totalFundingRaised > 0 && (
            <span className="text-xs font-bold text-green-600 dark:text-green-500">
              ${(startup.totalFundingRaised / 1000).toFixed(0)}k Raised
            </span>
          )}
        </div>
      </div>

      <div className="px-5 py-3 border-t border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/20 flex justify-end">
        <Link 
          to={`/dashboard/startups/${startup.id}`}
          className="text-sm font-bold text-[#0098c8] flex items-center group-hover:underline"
        >
          View Profile
          <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
};
