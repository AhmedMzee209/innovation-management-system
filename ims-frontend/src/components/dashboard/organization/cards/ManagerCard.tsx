import { HubManagerAssignmentResponse } from '@/types/organization';
import { Mail, Shield, UserMinus, Eye, Edit3, Trash2 } from 'lucide-react';
import { UserAvatar } from '@/components/dashboard/users/UserAvatar';

interface ManagerCardProps {
  assignment: HubManagerAssignmentResponse | any;
  hubName?: string;
  onViewDetails?: (manager: any, assignment: any) => void;
  onEdit?: (manager: any) => void;
  onDelete?: (id: string) => void;
  onUnassign?: (assignmentId: string) => void;
}

export const ManagerCard = ({
  assignment,
  hubName,
  onViewDetails,
  onEdit,
  onDelete,
  onUnassign,
}: ManagerCardProps) => {
  const manager = assignment.manager || assignment;
  const hub = assignment.hub;
  const displayHub = hubName || hub?.name || 'SUZA Innovation Ecosystem';
  const roleTitle = assignment.roleTitle || assignment.role || 'Hub Manager';
  const isActive = assignment.active ?? (assignment.status === 'Active' || (manager?.enabled ?? true));

  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow p-5 flex flex-col relative group">
      
      {/* Top right quick actions */}
      <div className="absolute top-4 right-4 flex items-center space-x-1">
        {onEdit && (
          <button
            onClick={() => onEdit(manager)}
            className="p-1.5 text-gray-400 hover:text-[#0098c8] hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
            title="Edit Manager Profile"
          >
            <Edit3 size={15} />
          </button>
        )}
        {onDelete && manager?.id && (
          <button
            onClick={() => onDelete(manager.id)}
            className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg transition-colors"
            title="Delete Manager Account"
          >
            <Trash2 size={15} />
          </button>
        )}
      </div>

      {/* Avatar & Basic Info */}
      <div className="flex flex-col items-center text-center mb-4 relative pt-2">
        <UserAvatar 
          firstName={manager.firstName} 
          lastName={manager.lastName} 
          imageUrl={manager.profilePhoto || manager.avatarUrl}
          size="lg" 
          status={isActive ? 'Active' : 'Inactive'}
          className="mb-3"
        />
        <h3 className="text-base font-bold text-gray-900 dark:text-white leading-tight">
          {manager.firstName} {manager.lastName}
        </h3>
        <p className="text-xs font-bold text-[#0098c8] mt-1 line-clamp-1">{roleTitle}</p>
      </div>

      {/* Assigned Hub */}
      <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-2.5 mb-4 text-center border border-gray-100 dark:border-gray-800">
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">Assigned Hub</p>
        <p className="text-xs font-bold text-gray-900 dark:text-white line-clamp-1" title={displayHub}>{displayHub}</p>
      </div>

      {/* Contact & Date Info */}
      <div className="space-y-2 mb-5">
        <div className="flex items-center text-xs text-gray-600 dark:text-gray-400">
          <Mail size={13} className="mr-2 text-[#0098c8] shrink-0" />
          <span className="truncate">{manager.email || 'N/A'}</span>
        </div>
        {assignment.startDate && (
          <div className="flex items-center text-xs text-gray-600 dark:text-gray-400">
            <Shield size={13} className="mr-2 text-amber-500 shrink-0" />
            <span>Since {new Date(assignment.startDate).toLocaleDateString()}</span>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="mt-auto space-y-2 pt-2 border-t border-gray-100 dark:border-gray-800">
        <button 
          onClick={() => onViewDetails && onViewDetails(manager, assignment)}
          className="w-full py-1.5 bg-gray-50 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 rounded-lg text-xs font-semibold hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center justify-center space-x-1.5"
        >
          <Eye size={14} />
          <span>View Details</span>
        </button>

        {onUnassign && assignment.id && isActive && (
          <button 
            onClick={() => onUnassign(assignment.id)}
            className="w-full py-1.5 bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400 border border-red-100 dark:border-red-800/50 rounded-lg text-xs font-semibold hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors flex items-center justify-center space-x-1.5"
          >
            <UserMinus size={14} />
            <span>Remove from Hub</span>
          </button>
        )}
      </div>

    </div>
  );
};
