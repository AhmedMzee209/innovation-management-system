import { Hub } from '@/data/mockOrganization';
import { Globe, Rocket, Lightbulb, Users, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

export const HubCard = ({ hub }: { hub: Hub }) => {
  const isCentral = hub.type === 'Central';
  
  return (
    <div className={cn(
      "border rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col group",
      isCentral ? "bg-gradient-to-br from-[#0098c8] to-[#0d2137] border-[#0098c8]" : "bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800"
    )}>
      <div className="p-6 flex-1">
        <div className="flex justify-between items-start mb-6">
          <div className={cn(
            "w-12 h-12 rounded-xl flex items-center justify-center",
            isCentral ? "bg-white/10 text-white" : "bg-purple-50 text-purple-600 dark:bg-purple-500/10 dark:text-purple-400"
          )}>
            <Globe size={24} />
          </div>
          <span className={cn(
            "text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full",
            isCentral ? "bg-yellow-400 text-yellow-900" : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300"
          )}>
            {hub.type} Hub
          </span>
        </div>

        <h3 className={cn("text-xl font-black leading-tight mb-2", isCentral ? "text-white" : "text-gray-900 dark:text-white")}>
          {hub.name}
        </h3>
        <p className={cn("text-sm font-medium mb-6", isCentral ? "text-blue-100" : "text-gray-500")}>
          {hub.location}
        </p>

        <div className="grid grid-cols-3 gap-3">
          <div className={cn("p-3 rounded-lg flex flex-col items-center justify-center text-center", isCentral ? "bg-white/10" : "bg-gray-50 dark:bg-gray-800/50")}>
            <Lightbulb size={16} className={cn("mb-1", isCentral ? "text-yellow-300" : "text-[#0098c8]")} />
            <span className={cn("text-lg font-black", isCentral ? "text-white" : "text-gray-900 dark:text-white")}>{hub.innovationsCount}</span>
          </div>
          <div className={cn("p-3 rounded-lg flex flex-col items-center justify-center text-center", isCentral ? "bg-white/10" : "bg-gray-50 dark:bg-gray-800/50")}>
            <Rocket size={16} className={cn("mb-1", isCentral ? "text-green-300" : "text-emerald-500")} />
            <span className={cn("text-lg font-black", isCentral ? "text-white" : "text-gray-900 dark:text-white")}>{hub.startupsCount}</span>
          </div>
          <div className={cn("p-3 rounded-lg flex flex-col items-center justify-center text-center", isCentral ? "bg-white/10" : "bg-gray-50 dark:bg-gray-800/50")}>
            <Users size={16} className={cn("mb-1", isCentral ? "text-purple-300" : "text-purple-500")} />
            <span className={cn("text-lg font-black", isCentral ? "text-white" : "text-gray-900 dark:text-white")}>{hub.mentorsCount}</span>
          </div>
        </div>
      </div>

      <Link 
        to={`/dashboard/hubs/${hub.id}`}
        className={cn(
          "px-6 py-3.5 text-sm font-bold flex items-center justify-between transition-colors",
          isCentral ? "bg-white/10 text-white hover:bg-white/20" : "bg-gray-50 dark:bg-gray-800/50 text-[#0098c8] border-t border-gray-200 dark:border-gray-800 hover:bg-[#0098c8] hover:text-white"
        )}
      >
        <span>Manage Hub</span>
        <ArrowRight size={16} />
      </Link>
    </div>
  );
};
