import { Bell, MessageSquare, Megaphone, TrendingUp, Users } from 'lucide-react';
import { MOCK_NOTIFICATIONS, MOCK_MESSAGES, MOCK_ANNOUNCEMENTS } from '@/data/mockMessaging';
import { Link } from 'react-router-dom';

export const NotificationDashboard = () => {
  const unreadNotifs = MOCK_NOTIFICATIONS.filter(n => !n.isRead).length;
  const unreadMessages = MOCK_MESSAGES.filter(m => !m.isRead).length;
  const activeAnnouncements = MOCK_ANNOUNCEMENTS.length; // Assume all active for mock

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight flex items-center">
            <Bell className="mr-3 text-[#0098c8]" size={28} />
            Communication Hub
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Manage your notifications, messages, and campus announcements.</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard 
          title="Unread Notifications" 
          value={unreadNotifs} 
          icon={<Bell size={24} className="text-red-500" />} 
          trend="+12% this week"
          bgClass="bg-red-50 dark:bg-red-900/10"
          href="/dashboard/notifications/center"
        />
        <StatCard 
          title="Unread Messages" 
          value={unreadMessages} 
          icon={<MessageSquare size={24} className="text-blue-500" />} 
          trend="5 recent conversations"
          bgClass="bg-blue-50 dark:bg-blue-900/10"
          href="/dashboard/messages"
        />
        <StatCard 
          title="Active Announcements" 
          value={activeAnnouncements} 
          icon={<Megaphone size={24} className="text-amber-500" />} 
          trend="2 priority alerts"
          bgClass="bg-amber-50 dark:bg-amber-900/10"
          href="/dashboard/announcements"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        {/* Recent Notifications Widget */}
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center">
              <Bell size={18} className="mr-2 text-[#0098c8]" /> Recent Alerts
            </h3>
            <Link to="/dashboard/notifications/center" className="text-sm font-bold text-[#0098c8] hover:underline">View All</Link>
          </div>
          <div className="space-y-4 flex-1">
            {MOCK_NOTIFICATIONS.slice(0, 5).map(n => (
              <div key={n.id} className="flex items-start gap-3 p-3 hover:bg-gray-50 dark:hover:bg-gray-800/50 rounded-xl transition-colors group cursor-pointer border border-transparent hover:border-gray-100 dark:hover:border-gray-800">
                <div className={`w-2 h-2 rounded-full mt-2 shrink-0 ${!n.isRead ? 'bg-[#0098c8]' : 'bg-transparent'}`}></div>
                <div>
                  <h4 className={`text-sm ${!n.isRead ? 'font-bold text-gray-900 dark:text-white' : 'font-medium text-gray-700 dark:text-gray-300'}`}>{n.title}</h4>
                  <p className="text-xs text-gray-500 line-clamp-1 mt-0.5">{n.message}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions & Activity */}
        <div className="space-y-6 flex flex-col">
          <div className="bg-gradient-to-br from-indigo-900 to-[#0098c8] rounded-2xl p-6 text-white shadow-sm">
            <h3 className="text-lg font-bold mb-4 flex items-center">
              <TrendingUp size={18} className="mr-2" /> Quick Actions
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <Link to="/dashboard/announcements/new" className="bg-white/10 hover:bg-white/20 transition-colors p-4 rounded-xl backdrop-blur-sm border border-white/10 text-center flex flex-col items-center justify-center group">
                <Megaphone size={24} className="mb-2 text-blue-200 group-hover:text-white transition-colors" />
                <span className="text-sm font-bold">New Announcement</span>
              </Link>
              <Link to="/dashboard/messages" className="bg-white/10 hover:bg-white/20 transition-colors p-4 rounded-xl backdrop-blur-sm border border-white/10 text-center flex flex-col items-center justify-center group">
                <MessageSquare size={24} className="mb-2 text-emerald-200 group-hover:text-white transition-colors" />
                <span className="text-sm font-bold">Compose Message</span>
              </Link>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm flex-1">
             <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center mb-6">
              <Users size={18} className="mr-2 text-emerald-500" /> Active Hubs
            </h3>
            <div className="flex flex-wrap gap-2">
              {['Mentorship Team', 'Funding Committee', 'Startup Cohort', 'System Admins', 'Event Organizers'].map(tag => (
                <span key={tag} className="px-3 py-1.5 bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 text-sm font-medium text-gray-600 dark:text-gray-300 rounded-lg">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon, trend, bgClass, href }: any) => (
  <Link to={href} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all group flex flex-col justify-between">
    <div className="flex justify-between items-start mb-4">
      <div>
        <p className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-1">{title}</p>
        <h3 className="text-3xl font-black text-gray-900 dark:text-white">{value}</h3>
      </div>
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-110 ${bgClass}`}>
        {icon}
      </div>
    </div>
    <div className="flex items-center text-xs font-medium text-gray-500">
      {trend}
    </div>
  </Link>
);
