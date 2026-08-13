import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Globe, MapPin, Users, Rocket, Lightbulb, Shield, Edit, Loader2 } from 'lucide-react';
import { useInnovationHub, useActiveManagersByHub } from '@/hooks/useOrganization';
import { UserAvatar } from '@/components/dashboard/users/UserAvatar';
import { HubModal } from '@/components/dashboard/organization/modals/HubModal';
import { useState } from 'react';
import { cn } from '@/lib/utils';

export const HubDetails = () => {
  const { id } = useParams();
  const { data: hub, isLoading: isLoadingHub } = useInnovationHub(id);
  const { data: activeManagers = [] } = useActiveManagersByHub(id);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const activeAssignment = activeManagers.length > 0 ? activeManagers[0] : null;
  const activeManager = activeAssignment?.manager;

  if (isLoadingHub) {
    return (
      <div className="flex flex-col items-center justify-center py-24">
        <Loader2 size={40} className="animate-spin text-[#0098c8] mb-3" />
        <p className="text-sm text-gray-500 font-medium">Loading innovation hub details...</p>
      </div>
    );
  }

  if (!hub) {
    return (
      <div className="p-8 text-center">
        <p className="text-lg text-gray-500">Innovation Hub not found.</p>
        <Link to="/dashboard/hubs" className="mt-4 inline-block text-[#0098c8] hover:underline text-sm font-medium">
          Back to Hubs
        </Link>
      </div>
    );
  }

  const isCentral = hub.code?.includes('CENTRAL');

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <Link to="/dashboard/hubs" className="flex items-center text-sm font-medium text-gray-500 hover:text-[#0098c8] transition-colors">
          <ArrowLeft size={16} className="mr-1.5" /> Back to Hubs
        </Link>
        <button onClick={() => setIsModalOpen(true)} className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors shadow-sm flex items-center">
          <Edit size={16} className="mr-2" /> Edit Hub
        </button>
      </div>

      {/* Hub Banner */}
      <div className={cn(
        "rounded-2xl shadow-sm overflow-hidden flex flex-col md:flex-row border",
        isCentral ? "bg-gradient-to-br from-[#0098c8] to-[#0d2137] border-[#0098c8] text-white" : "bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800"
      )}>
        <div className="p-8 md:w-2/3">
          <div className="flex items-center space-x-3 mb-4">
            <div className={cn(
              "w-10 h-10 rounded-lg flex items-center justify-center",
              isCentral ? "bg-white/20" : "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400"
            )}>
              <Globe size={20} />
            </div>
            <span className={cn(
              "text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full",
              isCentral ? "bg-yellow-400 text-yellow-900" : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
            )}>
              {isCentral ? 'Central Hub' : 'School Hub'}
            </span>
          </div>
          
          <h1 className={cn("text-3xl font-black leading-tight mb-2", !isCentral && "text-gray-900 dark:text-white")}>
            {hub.name}
          </h1>
          <div className="flex items-center space-x-4">
            <div className={cn("flex items-center text-sm font-medium", isCentral ? "text-blue-100" : "text-gray-500")}>
              <MapPin size={16} className="mr-1.5" /> {hub.officeLocation || 'Location N/A'}
            </div>
            {hub.school && (
              <div className={cn("flex items-center text-sm font-medium", isCentral ? "text-blue-100" : "text-gray-500")}>
                <Shield size={16} className="mr-1.5" /> {hub.school.name}
              </div>
            )}
          </div>
        </div>
        
        <div className={cn(
          "p-8 md:w-1/3 flex flex-col justify-center border-t md:border-t-0 md:border-l",
          isCentral ? "border-white/10 bg-black/10" : "border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50"
        )}>
          <h3 className={cn("text-xs font-bold uppercase tracking-wider mb-4", isCentral ? "text-blue-200" : "text-gray-400")}>Active Hub Manager</h3>
          {activeManager ? (
            <div className="flex items-center space-x-4">
              <UserAvatar firstName={activeManager.firstName} lastName={activeManager.lastName} size="lg" />
              <div>
                <p className={cn("font-bold", isCentral ? "text-white" : "text-gray-900 dark:text-white")}>{activeManager.firstName} {activeManager.lastName}</p>
                <p className={cn("text-sm", isCentral ? "text-blue-200" : "text-gray-500")}>{activeAssignment.roleTitle || 'Hub Manager'}</p>
              </div>
            </div>
          ) : (
            <p className="text-sm italic opacity-70">No active manager assigned</p>
          )}
        </div>
      </div>

      {/* Hub Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-6 rounded-xl shadow-sm flex items-center space-x-4">
          <div className="w-14 h-14 rounded-full bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 flex items-center justify-center">
            <Lightbulb size={24} />
          </div>
          <div>
            <p className="text-3xl font-black text-gray-900 dark:text-white">{hub.innovationsCount ?? 0}</p>
            <p className="text-xs font-bold uppercase text-gray-500 tracking-wider">Total Innovations</p>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-6 rounded-xl shadow-sm flex items-center space-x-4">
          <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400 flex items-center justify-center">
            <Rocket size={24} />
          </div>
          <div>
            <p className="text-3xl font-black text-gray-900 dark:text-white">{hub.startupsCount ?? 0}</p>
            <p className="text-xs font-bold uppercase text-gray-500 tracking-wider">Startups Formed</p>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-6 rounded-xl shadow-sm flex items-center space-x-4">
          <div className="w-14 h-14 rounded-full bg-purple-50 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400 flex items-center justify-center">
            <Users size={24} />
          </div>
          <div>
            <p className="text-3xl font-black text-gray-900 dark:text-white">{hub.mentorsCount ?? 0}</p>
            <p className="text-xs font-bold uppercase text-gray-500 tracking-wider">Active Mentors</p>
          </div>
        </div>
      </div>

      <HubModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} hub={hub} />
    </div>
  );
};
