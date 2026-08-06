import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, PieChart as PieChartIcon, Activity, Star } from 'lucide-react';

const mockSessionTrend = [
  { month: 'Jan', completed: 15, cancelled: 2 },
  { month: 'Feb', completed: 22, cancelled: 4 },
  { month: 'Mar', completed: 28, cancelled: 3 },
  { month: 'Apr', completed: 35, cancelled: 5 },
  { month: 'May', completed: 42, cancelled: 4 },
  { month: 'Jun', completed: 55, cancelled: 6 },
];

const mockTopicDistribution = [
  { name: 'Product Strategy', value: 35 },
  { name: 'Fundraising', value: 25 },
  { name: 'Go-To-Market', value: 20 },
  { name: 'Engineering', value: 15 },
  { name: 'Legal/Finance', value: 5 },
];

const mockMentorRatings = [
  { name: '4.5 - 5.0', value: 60 },
  { name: '4.0 - 4.4', value: 30 },
  { name: '3.5 - 3.9', value: 8 },
  { name: 'Below 3.5', value: 2 },
];

const COLORS = ['#0098c8', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444'];
const RATING_COLORS = ['#10b981', '#0098c8', '#f59e0b', '#ef4444'];

export const MentorshipAnalytics = () => {
  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight flex items-center">
            <TrendingUp className="mr-3 text-[#0098c8]" size={28} />
            Mentorship Analytics
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Track mentor engagement, session volume, and overall program health.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Session Volume Trend */}
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm p-6 lg:col-span-2">
          <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-6 flex items-center">
            <Activity size={16} className="mr-2 text-gray-400" /> Session Volume Trend
          </h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockSessionTrend}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} />
                <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Line type="monotone" name="Completed Sessions" dataKey="completed" stroke="#0098c8" strokeWidth={3} dot={{ r: 4, strokeWidth: 2, fill: '#0098c8' }} activeDot={{ r: 6 }} />
                <Line type="monotone" name="Cancelled" dataKey="cancelled" stroke="#ef4444" strokeWidth={3} dot={{ r: 4, strokeWidth: 2, fill: '#ef4444' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Topic Distribution */}
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm p-6">
          <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-6 flex items-center">
            <PieChartIcon size={16} className="mr-2 text-gray-400" /> Mentorship Topics
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={mockTopicDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {mockTopicDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-4 mt-4 flex-wrap">
            {mockTopicDistribution.map((entry, index) => (
              <div key={entry.name} className="flex items-center text-xs font-medium text-gray-600 dark:text-gray-400">
                <span className="w-3 h-3 rounded-full mr-1.5" style={{ backgroundColor: COLORS[index % COLORS.length] }}></span>
                {entry.name}
              </div>
            ))}
          </div>
        </div>

        {/* Mentor Ratings */}
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm p-6">
          <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-6 flex items-center">
            <Star size={16} className="mr-2 text-amber-400 fill-current" /> Mentor Rating Distribution
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockMentorRatings} layout="vertical" margin={{ top: 0, right: 0, left: 40, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e5e7eb" />
                <XAxis type="number" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280', fontWeight: 'bold' }} />
                <Tooltip cursor={{ fill: '#f3f4f6' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                  {mockMentorRatings.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={RATING_COLORS[index % RATING_COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
};
