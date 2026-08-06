import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';
import { TrendingUp, PieChart as PieChartIcon, Activity, Banknote, Map } from 'lucide-react';

const mockFundingTrend = [
  { month: 'Jan', requested: 120000, approved: 80000 },
  { month: 'Feb', requested: 180000, approved: 110000 },
  { month: 'Mar', requested: 250000, approved: 160000 },
  { month: 'Apr', requested: 190000, approved: 140000 },
  { month: 'May', requested: 320000, approved: 210000 },
  { month: 'Jun', requested: 450000, approved: 280000 },
];

const mockCategoryDistribution = [
  { name: 'Technology', value: 450000 },
  { name: 'Agriculture', value: 250000 },
  { name: 'Healthcare', value: 180000 },
  { name: 'Education', value: 120000 },
  { name: 'General', value: 50000 },
];

const mockSchoolDistribution = [
  { name: 'School of Computing', value: 350000 },
  { name: 'School of Agriculture', value: 280000 },
  { name: 'School of Business', value: 150000 },
  { name: 'School of Health', value: 120000 },
  { name: 'School of Education', value: 80000 },
];

const COLORS = ['#0098c8', '#10b981', '#f59e0b', '#8b5cf6', '#ef4444'];
const SCHOOL_COLORS = ['#10b981', '#0098c8', '#f59e0b', '#8b5cf6', '#ef4444'];

export const FundingAnalytics = () => {
  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight flex items-center">
            <TrendingUp className="mr-3 text-emerald-600" size={28} />
            Funding Analytics
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Track capital allocation, application success rates, and budget utilization.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Funding Volume Trend */}
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm p-6 lg:col-span-2">
          <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-6 flex items-center">
            <Activity size={16} className="mr-2 text-gray-400" /> Capital Requested vs Approved
          </h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockFundingTrend}>
                <defs>
                  <linearGradient id="colorApproved" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorRequested" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#9ca3af" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#9ca3af" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} tickFormatter={(value) => `$${value/1000}k`} />
                <Tooltip 
                  formatter={(value: number) => `$${value.toLocaleString()}`}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} 
                />
                <Area type="monotone" name="Requested" dataKey="requested" stroke="#9ca3af" fillOpacity={1} fill="url(#colorRequested)" />
                <Area type="monotone" name="Approved" dataKey="approved" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorApproved)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Distribution by Category */}
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm p-6">
          <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-6 flex items-center">
            <PieChartIcon size={16} className="mr-2 text-gray-400" /> Allocation by Sector
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={mockCategoryDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {mockCategoryDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value: number) => `$${value.toLocaleString()}`}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} 
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-4 mt-4 flex-wrap">
            {mockCategoryDistribution.map((entry, index) => (
              <div key={entry.name} className="flex items-center text-xs font-medium text-gray-600 dark:text-gray-400">
                <span className="w-3 h-3 rounded-full mr-1.5" style={{ backgroundColor: COLORS[index % COLORS.length] }}></span>
                {entry.name}
              </div>
            ))}
          </div>
        </div>

        {/* Distribution by School */}
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm p-6">
          <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-6 flex items-center">
            <Map size={16} className="mr-2 text-gray-400" /> Capital Flow by School
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockSchoolDistribution} layout="vertical" margin={{ top: 0, right: 20, left: 40, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e5e7eb" />
                <XAxis type="number" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} tickFormatter={(value) => `$${value/1000}k`} />
                <YAxis dataKey="name" type="category" width={120} axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#6b7280', fontWeight: 'bold' }} />
                <Tooltip 
                  cursor={{ fill: '#f3f4f6' }} 
                  formatter={(value: number) => `$${value.toLocaleString()}`}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} 
                />
                <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                  {mockSchoolDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={SCHOOL_COLORS[index % SCHOOL_COLORS.length]} />
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
