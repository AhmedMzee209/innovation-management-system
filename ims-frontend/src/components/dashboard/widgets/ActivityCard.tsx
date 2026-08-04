import { DashboardCard } from './DashboardCard';
import { MOCK_RECENT_ACTIVITIES } from '@/data/dashboardMockData';
import { Lightbulb, Banknote, Rocket, Settings } from 'lucide-react';

const getIconForType = (type: string) => {
  switch (type) {
    case 'innovation': return <Lightbulb size={16} className="text-yellow-500" />;
    case 'funding': return <Banknote size={16} className="text-green-500" />;
    case 'startup': return <Rocket size={16} className="text-[#0098c8]" />;
    case 'system': return <Settings size={16} className="text-gray-500" />;
    default: return <Settings size={16} className="text-gray-500" />;
  }
};

const getBgForType = (type: string) => {
  switch (type) {
    case 'innovation': return 'bg-yellow-100 dark:bg-yellow-900/30';
    case 'funding': return 'bg-green-100 dark:bg-green-900/30';
    case 'startup': return 'bg-[#0098c8]/10 dark:bg-[#0098c8]/20';
    case 'system': return 'bg-gray-100 dark:bg-gray-800';
    default: return 'bg-gray-100 dark:bg-gray-800';
  }
};

export const ActivityCard = () => {
  return (
    <DashboardCard title="Recent Activities" action={<button className="text-sm font-bold text-[#0098c8] hover:text-[#0d2137]">View All</button>}>
      <div className="space-y-6">
        {MOCK_RECENT_ACTIVITIES.map((activity, index) => (
          <div key={activity.id} className="relative flex items-start space-x-4">
            {/* Timeline connector */}
            {index !== MOCK_RECENT_ACTIVITIES.length - 1 && (
              <div className="absolute left-5 top-10 bottom-[-24px] w-px bg-gray-200 dark:bg-gray-800" />
            )}
            
            <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 z-10 ${getBgForType(activity.type)}`}>
              {getIconForType(activity.type)}
            </div>
            
            <div className="flex-1 pt-1">
              <div className="flex justify-between items-start">
                <p className="text-sm font-bold text-gray-900 dark:text-white">{activity.title}</p>
                <span className="text-xs text-gray-400 whitespace-nowrap ml-2">{activity.time}</span>
              </div>
              <p className="text-sm text-gray-500 mt-0.5">{activity.description}</p>
            </div>
          </div>
        ))}
      </div>
    </DashboardCard>
  );
};
