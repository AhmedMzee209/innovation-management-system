import { Activity, Users, Building2, Lightbulb, Rocket, Banknote } from 'lucide-react';
import { KPIWidget } from '@/components/dashboard/analytics/KPIWidget';
import { ChartCard } from '@/components/dashboard/analytics/ChartCard';
import { FilterToolbar } from '@/components/dashboard/analytics/FilterToolbar';
import { MOCK_KPIS, MOCK_MONTHLY_TRENDS, MOCK_SCHOOL_DISTRIBUTION } from '@/data/mockAnalytics';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell, Legend } from 'recharts';

const COLORS = ['#0098c8', '#10b981', '#f59e0b', '#8b5cf6', '#64748b'];

export const ExecutiveDashboard = () => {
  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight flex items-center">
          <Activity className="mr-3 text-purple-600" size={28} />
          Executive Dashboard
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">High-level overview of the entire Innovation Management System.</p>
      </div>

      <FilterToolbar />

      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <KPIWidget 
          title="Total Users" 
          value={MOCK_KPIS.users.toLocaleString()} 
          trend="Active this month" 
          trendUp={true}
          icon={<Users size={24} />} 
          bgClass="bg-blue-50 text-blue-500 dark:bg-blue-900/20"
        />
        <KPIWidget 
          title="Innovations" 
          value={MOCK_KPIS.innovations.total.toLocaleString()} 
          trend={`${MOCK_KPIS.innovations.approved} approved`} 
          trendUp={true}
          icon={<Lightbulb size={24} />} 
          bgClass="bg-emerald-50 text-emerald-500 dark:bg-emerald-900/20"
        />
        <KPIWidget 
          title="Active Startups" 
          value={MOCK_KPIS.startups.toLocaleString()} 
          trend="Incubated" 
          trendUp={true}
          icon={<Rocket size={24} />} 
          bgClass="bg-amber-50 text-amber-500 dark:bg-amber-900/20"
        />
        <KPIWidget 
          title="Total Funding" 
          value={`$${(MOCK_KPIS.funding.totalAmount / 1000000).toFixed(1)}M`} 
          trend="Disbursed" 
          trendUp={true}
          icon={<Banknote size={24} />} 
          bgClass="bg-purple-50 text-purple-500 dark:bg-purple-900/20"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <ChartCard title="Innovation Pipeline (YTD)" className="lg:col-span-2">
          <AreaChart data={MOCK_MONTHLY_TRENDS} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorSub" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0098c8" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#0098c8" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorApp" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} dy={10} />
            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
            <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
            <Legend verticalAlign="top" height={36} />
            <Area type="monotone" dataKey="submissions" name="Submissions" stroke="#0098c8" fillOpacity={1} fill="url(#colorSub)" />
            <Area type="monotone" dataKey="approvals" name="Approvals" stroke="#10b981" fillOpacity={1} fill="url(#colorApp)" />
          </AreaChart>
        </ChartCard>

        <ChartCard title="Innovations by School">
          <PieChart>
            <Pie
              data={MOCK_SCHOOL_DISTRIBUTION}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
            >
              {MOCK_SCHOOL_DISTRIBUTION.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
            <Legend layout="vertical" verticalAlign="bottom" align="center" wrapperStyle={{ fontSize: '11px', marginTop: '20px' }} />
          </PieChart>
        </ChartCard>
      </div>

    </div>
  );
};
