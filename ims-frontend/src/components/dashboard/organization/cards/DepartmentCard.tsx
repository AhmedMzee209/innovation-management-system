import { DepartmentResponse } from '@/types/organization';
import { Building2, BookOpen, Edit, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DepartmentCardProps {
  dept: DepartmentResponse | any;
  schoolName?: string;
  onEdit?: (dept: DepartmentResponse | any) => void;
  onDelete?: (id: string) => void;
}

export const DepartmentCard = ({ dept, schoolName, onEdit, onDelete }: DepartmentCardProps) => {
  const status = dept.status || 'ACTIVE';
  const displaySchool = schoolName || dept.school?.name || 'School N/A';

  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow p-5 flex flex-col relative group">
      <div className="absolute top-4 right-4 flex items-center space-x-1">
        {onEdit && (
          <button onClick={() => onEdit(dept)} className="p-1 text-gray-400 hover:text-[#0098c8] transition-colors" title="Edit Department">
            <Edit size={16} />
          </button>
        )}
        {onDelete && (
          <button onClick={() => onDelete(dept.id)} className="p-1 text-gray-400 hover:text-red-500 transition-colors" title="Delete Department">
            <Trash2 size={16} />
          </button>
        )}
      </div>

      <div className="flex items-start space-x-4 mb-4 pr-12">
        <div className="w-12 h-12 rounded-lg bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400 flex items-center justify-center shrink-0">
          <BookOpen size={24} />
        </div>
        <div>
          <h3 className="text-base font-bold text-gray-900 dark:text-white leading-tight line-clamp-2" title={dept.name}>
            {dept.name}
          </h3>
          <p className="text-xs font-medium text-gray-500 mt-1 line-clamp-1">{displaySchool}</p>
        </div>
      </div>

      <div className="mb-5 flex-1">
        <p className="text-xs text-gray-500 mb-1 uppercase font-bold tracking-wider">Department Details</p>
        <p className="text-sm font-medium text-gray-900 dark:text-white">Code: {dept.code}</p>
        <p className="text-xs text-gray-500 truncate">{dept.email || dept.officeLocation || 'Location N/A'}</p>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-800">
        <div className="flex items-center space-x-2">
          <span className={cn(
            "w-2 h-2 rounded-full",
            status === 'ACTIVE' || status === 'Active' ? "bg-green-500" : "bg-gray-400"
          )} />
          <span className="text-xs font-medium text-gray-600 dark:text-gray-400">{status}</span>
        </div>
        
        <div className="flex items-center space-x-1.5 text-sm font-bold text-[#0098c8]">
          <Building2 size={16} />
          <span>{dept.innovationsCount ?? 0}</span>
        </div>
      </div>
    </div>
  );
};
