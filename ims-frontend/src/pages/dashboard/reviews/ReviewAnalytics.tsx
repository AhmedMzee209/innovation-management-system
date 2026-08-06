import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { BarChart2, TrendingUp, PieChart as PieChartIcon } from 'lucide-react';

const mockMonthlyData = [
  { name: 'Jan', reviews: 12, avgScore: 65 },
  { name: 'Feb', reviews: 19, avgScore: 68 },
  { name: 'Mar', reviews: 15, avgScore: 72 },
  { name: 'Apr', reviews: 22, avgScore: 70 },
  { name: 'May', reviews: 28, avgScore: 75 },
  { name: 'Jun', reviews: 24, avgScore: 74 },
];

const mockStatusData = [
  { name: 'Approved', value: 45 },
  { name: 'Rejected', value: 20 },
  { name: 'Revision Req', value: 25 },
  { name: 'Incubation', value: 10 },
];

const COLORS = ['#10b981', '#ef4444', '#f59e0b', '#0098c8'];

export const ReviewAnalytics = () => {
  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight flex items-center">
            <BarChart2 className="mr-3 text-[#0098c8]" size={28} />
            Review Analytics
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Detailed performance metrics for the innovation evaluation process.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Monthly Reviews Chart */}
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm p-6">
          <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-6 flex items-center">
            <TrendingUp size={16} className="mr-2 text-gray-400" /> Monthly Review Volume
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockMonthlyData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} />
                <Tooltip cursor={{ fill: '#f3f4f6' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Bar dataKey="reviews" fill="#0098c8" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Decision Distribution */}
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm p-6">
          <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-6 flex items-center">
            <PieChartIcon size={16} className="mr-2 text-gray-400" /> Final Decision Distribution
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={mockStatusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {mockStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-4 mt-4 flex-wrap">
            {mockStatusData.map((entry, index) => (
              <div key={entry.name} className="flex items-center text-xs text-gray-600 dark:text-gray-400">
                <span className="w-3 h-3 rounded-full mr-1.5" style={{ backgroundColor: COLORS[index] }}></span>
                {entry.name}
              </div>
            ))}
          </div>
        </div>

        {/* Average Scores Trend */}
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm p-6 lg:col-span-2">
          <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-6 flex items-center">
            <TrendingUp size={16} className="mr-2 text-gray-400" /> Average Evaluation Scores (Out of 80)
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockMonthlyData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} dy={10} />
                <YAxis domain={[0, 80]} axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} />
                <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Line type="monotone" dataKey="avgScore" stroke="#10b981" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
};
