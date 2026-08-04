import { Department } from '@/data/mockOrganization';
import { Building2, BookOpen, MoreVertical, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

export const DepartmentCard = ({ dept, schoolName }: { dept: Department, schoolName: string }) => {
  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow p-5 flex flex-col relative group">
      <div className="absolute top-4 right-4">
        <button className="text-gray-400 hover:text-gray-600 transition-colors">
          <MoreVertical size={18} />
        </button>
      </div>

      <div className="flex items-start space-x-4 mb-4 pr-6">
        <div className="w-12 h-12 rounded-lg bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400 flex items-center justify-center shrink-0">
          <BookOpen size={24} />
        </div>
        <div>
          <h3 className="text-base font-bold text-gray-900 dark:text-white leading-tight line-clamp-2" title={dept.name}>
            {dept.name}
          </h3>
          <p className="text-xs font-medium text-gray-500 mt-1 line-clamp-1">{schoolName}</p>
        </div>
      </div>

      <div className="mb-5 flex-1">
        <p className="text-xs text-gray-500 mb-1 uppercase font-bold tracking-wider">Head of Department</p>
        <p className="text-sm font-medium text-gray-900 dark:text-white">{dept.headName}</p>
        <p className="text-xs text-gray-500 truncate">{dept.headEmail}</p>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-800">
        <div className="flex items-center space-x-2">
          <span className={cn(
            "w-2 h-2 rounded-full",
            dept.status === 'Active' ? "bg-green-500" : "bg-gray-400"
          )} />
          <span className="text-xs font-medium text-gray-600 dark:text-gray-400">{dept.status}</span>
        </div>
        
        <div className="flex items-center space-x-1.5 text-sm font-bold text-[#0098c8]">
          <Building2 size={16} />
          <span>{dept.innovationsCount}</span>
        </div>
      </div>
    </div>
  );
};
