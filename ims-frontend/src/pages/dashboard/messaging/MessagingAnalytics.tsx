import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, AreaChart, Area } from 'recharts';
import { Activity, MessageSquare, Bell, Users, Download } from 'lucide-react';
import { MOCK_MESSAGES, MOCK_NOTIFICATIONS } from '@/data/mockMessaging';
import { format, subDays } from 'date-fns';

export const MessagingAnalytics = () => {
  
  // Generate dummy chart data for past 7 days
  const activityData = Array.from({ length: 7 }).map((_, i) => {
    const d = subDays(new Date(), 6 - i);
    return {
      date: format(d, 'MMM dd'),
      messages: Math.floor(Math.random() * 500) + 100,
      notifications: Math.floor(Math.random() * 200) + 50,
    };
  });

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight flex items-center">
            <Activity className="mr-3 text-purple-600" size={28} />
            Communication Analytics
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Insights into platform engagement and message volume.</p>
        </div>
        <button className="px-4 py-2 bg-[#0098c8] text-white rounded-xl text-sm font-bold shadow-sm hover:bg-[#007ba1] flex items-center transition-colors">
          <Download size={16} className="mr-2" /> Export Report
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-900/20 text-blue-500 flex items-center justify-center">
              <MessageSquare size={24} />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Total Messages</p>
              <h3 className="text-2xl font-black text-gray-900 dark:text-white">{MOCK_MESSAGES.length.toLocaleString()}</h3>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 text-emerald-500 flex items-center justify-center">
              <Users size={24} />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Active Chat Users</p>
              <h3 className="text-2xl font-black text-gray-900 dark:text-white">1,204</h3>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-xl bg-amber-50 dark:bg-amber-900/20 text-amber-500 flex items-center justify-center">
              <Bell size={24} />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Notifications Sent</p>
              <h3 className="text-2xl font-black text-gray-900 dark:text-white">{MOCK_NOTIFICATIONS.length.toLocaleString()}</h3>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-xl bg-purple-50 dark:bg-purple-900/20 text-purple-500 flex items-center justify-center">
              <Activity size={24} />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Avg Read Rate</p>
              <h3 className="text-2xl font-black text-gray-900 dark:text-white">78%</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-6 uppercase tracking-wider">Message Volume (Past 7 Days)</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={activityData}>
                <defs>
                  <linearGradient id="colorMsgs" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0098c8" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#0098c8" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Area type="monotone" dataKey="messages" stroke="#0098c8" strokeWidth={3} fillOpacity={1} fill="url(#colorMsgs)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-6 uppercase tracking-wider">System Alerts vs Messages</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={activityData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} />
                <Tooltip 
                  cursor={{ fill: '#f3f4f6' }}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="messages" fill="#0098c8" radius={[4, 4, 0, 0]} barSize={20} />
                <Bar dataKey="notifications" fill="#f59e0b" radius={[4, 4, 0, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
};
