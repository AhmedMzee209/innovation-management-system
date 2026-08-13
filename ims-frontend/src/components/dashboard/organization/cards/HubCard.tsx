import { InnovationHubResponse } from '@/types/organization';
import { Globe, Rocket, Lightbulb, Users, ArrowRight, Edit, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface HubCardProps {
  hub: InnovationHubResponse | any;
  onEdit?: (hub: InnovationHubResponse | any) => void;
  onDelete?: (id: string) => void;
}

export const HubCard = ({ hub, onEdit, onDelete }: HubCardProps) => {
  const isCentral = hub.code?.includes('CENTRAL') || hub.type === 'Central';
  
  return (
    <div className={cn(
      "border rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col group relative",
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
          <div className="flex items-center space-x-2">
            <span className={cn(
              "text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full",
              isCentral ? "bg-yellow-400 text-yellow-900" : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300"
            )}>
              {isCentral ? 'Central Hub' : 'School Hub'}
            </span>
            {onEdit && (
              <button onClick={() => onEdit(hub)} className={cn("p-1 transition-colors", isCentral ? "text-white/70 hover:text-white" : "text-gray-400 hover:text-[#0098c8]")} title="Edit Hub">
                <Edit size={14} />
              </button>
            )}
            {onDelete && (
              <button onClick={() => onDelete(hub.id)} className={cn("p-1 transition-colors", isCentral ? "text-white/70 hover:text-red-300" : "text-gray-400 hover:text-red-500")} title="Delete Hub">
                <Trash2 size={14} />
              </button>
            )}
          </div>
        </div>

        <h3 className={cn("text-xl font-black leading-tight mb-2", isCentral ? "text-white" : "text-gray-900 dark:text-white")}>
          {hub.name}
        </h3>
        <p className={cn("text-sm font-medium mb-6", isCentral ? "text-blue-100" : "text-gray-500")}>
          {hub.officeLocation || hub.school?.name || 'SUZA Innovation Ecosystem'}
        </p>

        <div className="grid grid-cols-3 gap-3">
          <div className={cn("p-3 rounded-lg flex flex-col items-center justify-center text-center", isCentral ? "bg-white/10" : "bg-gray-50 dark:bg-gray-800/50")}>
            <Lightbulb size={16} className={cn("mb-1", isCentral ? "text-yellow-300" : "text-[#0098c8]")} />
            <span className={cn("text-lg font-black", isCentral ? "text-white" : "text-gray-900 dark:text-white")}>{hub.innovationsCount ?? 0}</span>
          </div>
          <div className={cn("p-3 rounded-lg flex flex-col items-center justify-center text-center", isCentral ? "bg-white/10" : "bg-gray-50 dark:bg-gray-800/50")}>
            <Rocket size={16} className={cn("mb-1", isCentral ? "text-green-300" : "text-emerald-500")} />
            <span className={cn("text-lg font-black", isCentral ? "text-white" : "text-gray-900 dark:text-white")}>{hub.startupsCount ?? 0}</span>
          </div>
          <div className={cn("p-3 rounded-lg flex flex-col items-center justify-center text-center", isCentral ? "bg-white/10" : "bg-gray-50 dark:bg-gray-800/50")}>
            <Users size={16} className={cn("mb-1", isCentral ? "text-purple-300" : "text-purple-500")} />
            <span className={cn("text-lg font-black", isCentral ? "text-white" : "text-gray-900 dark:text-white")}>{hub.mentorsCount ?? 0}</span>
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
