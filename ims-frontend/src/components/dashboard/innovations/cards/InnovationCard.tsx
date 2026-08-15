import { StatusBadge } from './StatusBadge';
import { Building2, Calendar, ChevronRight, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { InnovationSummary } from '@/services/api/innovationService';

export const InnovationCard = ({ innovation }: { innovation: InnovationSummary }) => {
  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow flex flex-col group h-full">
      <div className="p-5 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-4">
          <span className="text-xs font-mono font-bold text-gray-500 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
            {innovation.innovationCode || 'PENDING'}
          </span>
          <StatusBadge stage={innovation.currentStatus} />
        </div>

        <h3 className="text-lg font-bold text-gray-900 dark:text-white leading-tight mb-2 line-clamp-2" title={innovation.title}>
          {innovation.title}
        </h3>
        
        <div className="space-y-2 mt-4 mb-4">
          <div className="flex items-center text-xs text-gray-600 dark:text-gray-400">
            <Building2 size={14} className="mr-2 text-gray-400 shrink-0" />
            <span className="truncate">{innovation.schoolName || 'N/A'} - {innovation.categoryName || 'Uncategorized'}</span>
          </div>
          <div className="flex items-center text-xs text-gray-600 dark:text-gray-400">
            <Tag size={14} className="mr-2 text-gray-400 shrink-0" />
            <span className="truncate">{innovation.innovationType} • {innovation.innovationLevel}</span>
          </div>
          <div className="flex items-center text-xs text-gray-600 dark:text-gray-400">
            <Calendar size={14} className="mr-2 text-gray-400 shrink-0" />
            <span>Submitted {innovation.submissionDate ? format(new Date(innovation.submissionDate), 'MMM d, yyyy') : 'N/A'}</span>
          </div>
        </div>

      </div>

      <div className="px-5 py-3 border-t border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/20 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 rounded-full bg-[#0098c8] text-white flex items-center justify-center text-xs font-bold shrink-0">
            {innovation.ownerName ? innovation.ownerName.charAt(0) : '?'}
          </div>
          <span className="text-xs font-medium text-gray-700 dark:text-gray-300 truncate w-24">
            {innovation.ownerName || 'Unknown'}
          </span>
        </div>
        
        <Link 
          to={`/dashboard/innovations/${innovation.id}`}
          className="text-sm font-bold text-[#0098c8] flex items-center group-hover:underline"
        >
          View Details
          <ChevronRight size={16} className="ml-0.5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
};
