import { DashboardCard } from '@/components/dashboard/widgets/DashboardCard';
import { MOCK_RECENT_ACTIVITIES } from '@/data/dashboardMockData';

export const Notifications = () => {
  return (
    <div className="py-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">Notifications</h1>
        <button className="text-sm font-bold text-[#0098c8] hover:text-[#0d2137]">Mark all as read</button>
      </div>
      
      <DashboardCard>
        <div className="space-y-2">
          {MOCK_RECENT_ACTIVITIES.map((activity) => (
            <div key={activity.id} className="p-4 rounded-xl border border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
              <div className="flex justify-between items-start">
                <h3 className="font-bold text-gray-900 dark:text-white">{activity.title}</h3>
                <span className="text-xs text-gray-500">{activity.time}</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{activity.description}</p>
            </div>
          ))}
        </div>
      </DashboardCard>
    </div>
  );
};
