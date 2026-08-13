import { SchoolResponse } from '@/types/organization';
import { Building2, GraduationCap, ArrowRight, Edit, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface SchoolCardProps {
  school: SchoolResponse | any;
  onEdit?: (school: SchoolResponse | any) => void;
  onDelete?: (id: string) => void;
}

export const SchoolCard = ({ school, onEdit, onDelete }: SchoolCardProps) => {
  const status = school.status || 'ACTIVE';

  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col group relative">
      <div className="h-16 w-full bg-gradient-to-r from-[#0098c8] to-[#0d2137]"></div>
      
      <div className="px-5 pt-0 pb-5 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-3">
          <div className="bg-white dark:bg-gray-900 p-2 rounded-xl border border-gray-200 dark:border-gray-800 -mt-8 shadow-sm">
            <Building2 size={32} className="text-[#0098c8]" />
          </div>
          <div className="flex items-center space-x-2 mt-3">
            <span className={cn(
              "text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full",
              status === 'ACTIVE' || status === 'Active' ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400"
            )}>
              {status}
            </span>
            {onEdit && (
              <button onClick={() => onEdit(school)} className="p-1 text-gray-400 hover:text-[#0098c8] transition-colors" title="Edit School">
                <Edit size={14} />
              </button>
            )}
            {onDelete && (
              <button onClick={() => onDelete(school.id)} className="p-1 text-gray-400 hover:text-red-500 transition-colors" title="Delete School">
                <Trash2 size={14} />
              </button>
            )}
          </div>
        </div>
        
        <div className="mb-4">
          <div className="flex items-center space-x-2 mb-1">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white leading-tight">{school.shortName || school.code}</h3>
            {school.physicalAddress && (
              <>
                <span className="text-xs text-gray-400">•</span>
                <span className="text-xs font-medium text-gray-500">{school.physicalAddress}</span>
              </>
            )}
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-1" title={school.name}>{school.name}</p>
        </div>

        <div className="mb-4">
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-1">
            <GraduationCap size={14} className="mr-2 text-gray-400" />
            <span className="font-medium">{school.email || 'N/A'}</span>
          </div>
          <p className="text-xs text-gray-500 pl-6">{school.phoneNumber || 'Contact N/A'}</p>
        </div>

        <div className="mt-auto grid grid-cols-3 gap-2 border-t border-gray-100 dark:border-gray-800 pt-4">
          <div className="text-center">
            <p className="text-xl font-black text-gray-900 dark:text-white">{school.departmentsCount ?? 0}</p>
            <p className="text-[10px] font-bold uppercase text-gray-500 mt-0.5">Depts</p>
          </div>
          <div className="text-center border-x border-gray-100 dark:border-gray-800">
            <p className="text-xl font-black text-[#0098c8]">{school.innovationsCount ?? 0}</p>
            <p className="text-[10px] font-bold uppercase text-gray-500 mt-0.5">Innovations</p>
          </div>
          <div className="text-center">
            <p className="text-xl font-black text-emerald-600 dark:text-emerald-500">{school.startupsCount ?? 0}</p>
            <p className="text-[10px] font-bold uppercase text-gray-500 mt-0.5">Startups</p>
          </div>
        </div>
      </div>

      <Link 
        to={`/dashboard/schools/${school.id}`}
        className="px-5 py-3 bg-gray-50 dark:bg-gray-800/50 text-sm font-medium text-[#0098c8] flex items-center justify-between group-hover:bg-[#0098c8] group-hover:text-white transition-colors border-t border-gray-200 dark:border-gray-800"
      >
        <span>View Details</span>
        <ArrowRight size={16} />
      </Link>
    </div>
  );
};
