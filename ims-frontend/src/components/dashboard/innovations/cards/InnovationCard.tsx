import { Innovation } from '@/data/mockInnovations';
import { StatusBadge } from './StatusBadge';
import { Building2, Calendar, FileText, ChevronRight } from 'lucide-react';
import { MOCK_SCHOOLS } from '@/data/mockOrganization';
import { MOCK_USERS } from '@/data/mockUsers';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

export const InnovationCard = ({ innovation }: { innovation: Innovation }) => {
  const school = MOCK_SCHOOLS.find(s => s.id === innovation.schoolId);
  const owner = MOCK_USERS[innovation.ownerId] || Object.values(MOCK_USERS)[0]; // Fallback for dummy data

  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow flex flex-col group h-full">
      <div className="p-5 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-4">
          <span className="text-xs font-mono font-bold text-gray-500 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
            {innovation.code}
          </span>
          <StatusBadge stage={innovation.stage} />
        </div>

        <h3 className="text-lg font-bold text-gray-900 dark:text-white leading-tight mb-2 line-clamp-2" title={innovation.title}>
          {innovation.title}
        </h3>
        
        <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-4 flex-1">
          {innovation.shortDescription}
        </p>

        <div className="space-y-2 mb-4">
          <div className="flex items-center text-xs text-gray-600 dark:text-gray-400">
            <Building2 size={14} className="mr-2 text-gray-400 shrink-0" />
            <span className="truncate">{school?.shortName} - {innovation.categoryId}</span>
          </div>
          <div className="flex items-center text-xs text-gray-600 dark:text-gray-400">
            <Calendar size={14} className="mr-2 text-gray-400 shrink-0" />
            <span>Submitted {format(new Date(innovation.submissionDate), 'MMM d, yyyy')}</span>
          </div>
          <div className="flex items-center text-xs text-gray-600 dark:text-gray-400">
            <FileText size={14} className="mr-2 text-gray-400 shrink-0" />
            <span>{innovation.documents.length} Documents</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-auto">
          <div className="flex justify-between text-xs mb-1.5">
            <span className="font-medium text-gray-500">Progress</span>
            <span className="font-bold text-[#0098c8]">{innovation.progress}%</span>
          </div>
          <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-1.5 overflow-hidden">
            <div 
              className="bg-[#0098c8] h-1.5 rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${innovation.progress}%` }}
            ></div>
          </div>
        </div>
      </div>

      <div className="px-5 py-3 border-t border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/20 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 rounded-full bg-[#0098c8] text-white flex items-center justify-center text-xs font-bold shrink-0">
            {owner.firstName[0]}{owner.lastName[0]}
          </div>
          <span className="text-xs font-medium text-gray-700 dark:text-gray-300 truncate w-24">
            {owner.firstName} {owner.lastName}
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
