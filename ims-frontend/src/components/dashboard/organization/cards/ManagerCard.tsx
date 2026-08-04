import { InnovationManager } from '@/data/mockOrganization';
import { Mail, Phone, Shield, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { UserAvatar } from '@/components/dashboard/users/UserAvatar';
import { cn } from '@/lib/utils';

export const ManagerCard = ({ manager, hubName }: { manager: InnovationManager, hubName: string }) => {
  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow p-6 flex flex-col relative group">
      
      <div className="flex flex-col items-center text-center mb-5 relative">
        <UserAvatar 
          firstName={manager.firstName} 
          lastName={manager.lastName} 
          imageUrl={manager.avatarUrl} 
          size="lg" 
          status={manager.status}
          className="mb-3"
        />
        <h3 className="text-lg font-bold text-gray-900 dark:text-white leading-tight">
          {manager.firstName} {manager.lastName}
        </h3>
        <p className="text-xs font-bold text-[#0098c8] mt-1">{manager.role}</p>
      </div>

      <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-3 mb-5 text-center">
        <p className="text-xs font-medium text-gray-500 uppercase mb-1">Assigned Hub</p>
        <p className="text-sm font-bold text-gray-900 dark:text-white line-clamp-1">{hubName}</p>
      </div>

      <div className="space-y-3 mb-6">
        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
          <Mail size={14} className="mr-3 text-gray-400" />
          <span className="truncate">{manager.email}</span>
        </div>
        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
          <Phone size={14} className="mr-3 text-gray-400" />
          <span>{manager.phone}</span>
        </div>
      </div>

      <Link 
        to={`/dashboard/managers/${manager.id}`}
        className="mt-auto w-full py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors shadow-sm flex items-center justify-center"
      >
        View Profile
      </Link>
    </div>
  );
};
