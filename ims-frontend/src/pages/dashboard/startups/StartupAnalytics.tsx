import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';
import { TrendingUp, PieChart as PieChartIcon, Activity, DollarSign } from 'lucide-react';

const mockStageData = [
  { name: 'Idea', value: 12 },
  { name: 'Validation', value: 15 },
  { name: 'Prototype', value: 8 },
  { name: 'MVP', value: 10 },
  { name: 'Incubation', value: 5 },
];

const mockFundingData = [
  { name: 'Bootstrapped', value: 20 },
  { name: 'Pre-Seed', value: 15 },
  { name: 'Seed', value: 10 },
  { name: 'Series A', value: 5 },
];

const mockGrowthData = [
  { month: 'Jan', startups: 10, funding: 500 },
  { month: 'Feb', startups: 15, funding: 800 },
  { month: 'Mar', startups: 22, funding: 1200 },
  { month: 'Apr', startups: 28, funding: 1500 },
  { month: 'May', startups: 35, funding: 2100 },
  { month: 'Jun', startups: 50, funding: 3500 },
];

const COLORS = ['#0098c8', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444', '#ec4899'];
const FUNDING_COLORS = ['#64748b', '#f59e0b', '#10b981', '#3b82f6'];

export const StartupAnalytics = () => {
  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight flex items-center">
            <TrendingUp className="mr-3 text-[#0098c8]" size={28} />
            Startup Analytics
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Deep dive into ecosystem metrics, growth trends, and funding distribution.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Growth Trend Area Chart */}
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm p-6 lg:col-span-2">
          <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-6 flex items-center">
            <Activity size={16} className="mr-2 text-gray-400" /> Cumulative Ecosystem Growth
          </h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockGrowthData}>
                <defs>
                  <linearGradient id="colorStartups" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0098c8" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#0098c8" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} />
                <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Area type="monotone" dataKey="startups" stroke="#0098c8" strokeWidth={3} fillOpacity={1} fill="url(#colorStartups)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Stage Distribution */}
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm p-6">
          <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-6 flex items-center">
            <PieChartIcon size={16} className="mr-2 text-gray-400" /> Startups by Stage
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={mockStageData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {mockStageData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-4 mt-4 flex-wrap">
            {mockStageData.map((entry, index) => (
              <div key={entry.name} className="flex items-center text-xs font-medium text-gray-600 dark:text-gray-400">
                <span className="w-3 h-3 rounded-full mr-1.5" style={{ backgroundColor: COLORS[index % COLORS.length] }}></span>
                {entry.name}
              </div>
            ))}
          </div>
        </div>

        {/* Funding Distribution */}
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm p-6">
          <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-6 flex items-center">
            <DollarSign size={16} className="mr-2 text-gray-400" /> Funding Stages
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockFundingData} layout="vertical" margin={{ top: 0, right: 0, left: 30, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e5e7eb" />
                <XAxis type="number" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280', fontWeight: 'bold' }} />
                <Tooltip cursor={{ fill: '#f3f4f6' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                  {mockFundingData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={FUNDING_COLORS[index % FUNDING_COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Funding Raised Trend */}
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm p-6 lg:col-span-2">
          <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-6 flex items-center">
            <TrendingUp size={16} className="mr-2 text-gray-400" /> Total Capital Raised ($k)
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockGrowthData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} />
                <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Line type="monotone" dataKey="funding" stroke="#10b981" strokeWidth={3} dot={{ r: 4, strokeWidth: 2, fill: '#10b981' }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
};
