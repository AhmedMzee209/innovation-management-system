import { MOCK_APPLICATIONS, MOCK_OPPORTUNITIES } from '@/data/mockOpportunities';
import { FileText, Download, Target, Users, Calendar, TrendingUp } from 'lucide-react';
import { format, subMonths } from 'date-fns';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

const COLORS = ['#0098c8', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444'];

export const OpportunityAnalytics = () => {
  // Mock Data Aggregation
  const monthlyData = Array.from({ length: 6 }).map((_, i) => ({
    name: format(subMonths(new Date(), 5 - i), 'MMM'),
    applications: Math.floor(Math.random() * 50) + 10,
    accepted: Math.floor(Math.random() * 10) + 2,
  }));

  const statusData = [
    { name: 'Accepted', value: MOCK_APPLICATIONS.filter(a => a.status === 'Accepted').length },
    { name: 'Rejected', value: MOCK_APPLICATIONS.filter(a => a.status === 'Rejected').length },
    { name: 'Under Review', value: MOCK_APPLICATIONS.filter(a => a.status === 'Under Review').length },
    { name: 'Interview', value: MOCK_APPLICATIONS.filter(a => a.status === 'Interview Scheduled' || a.status === 'Interview Completed').length },
  ];

  const categoryData = [
    { name: 'Technology', value: 45 },
    { name: 'Agriculture', value: 25 },
    { name: 'Healthcare', value: 20 },
    { name: 'Education', value: 10 },
  ];

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0 mb-8">
        <div>
          <h1 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight flex items-center">
            <TrendingUp className="mr-3 text-[#0098c8]" size={28} />
            Opportunity Analytics
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Visualize ecosystem engagement and application conversion metrics.</p>
        </div>
        <button className="px-4 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 rounded-xl text-sm font-bold shadow-sm hover:bg-gray-50 flex items-center transition-colors">
          <Download size={16} className="mr-2" /> Export PDF
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Trend Chart */}
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center">
            <Calendar size={18} className="mr-2 text-purple-500" /> Application Trends
          </h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorApps" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0098c8" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#0098c8" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" className="dark:stroke-gray-800" />
                <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
                <RechartsTooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Area type="monotone" dataKey="applications" stroke="#0098c8" strokeWidth={3} fillOpacity={1} fill="url(#colorApps)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Conversion / Status Chart */}
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center">
            <Target size={18} className="mr-2 text-emerald-500" /> Application Outcomes
          </h3>
          <div className="h-72 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  labelLine={false}
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <RechartsTooltip 
                  itemStyle={{ color: '#111827', fontWeight: 'bold' }}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Bar Chart */}
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm lg:col-span-2">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center">
            <Users size={18} className="mr-2 text-amber-500" /> Opportunities by Category
          </h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e5e7eb" className="dark:stroke-gray-800" />
                <XAxis type="number" tick={{ fontSize: 12, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
                <YAxis dataKey="name" type="category" tick={{ fontSize: 12, fill: '#9ca3af', fontWeight: 'bold' }} axisLine={false} tickLine={false} width={100} />
                <RechartsTooltip 
                  cursor={{ fill: 'transparent' }}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="value" fill="#8b5cf6" radius={[0, 6, 6, 0]} barSize={24} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
};
