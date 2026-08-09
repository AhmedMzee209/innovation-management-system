import { Rocket, Target, Users } from 'lucide-react';
import { KPIWidget } from '@/components/dashboard/analytics/KPIWidget';
import { ChartCard } from '@/components/dashboard/analytics/ChartCard';
import { FilterToolbar } from '@/components/dashboard/analytics/FilterToolbar';
import { MOCK_KPIS, MOCK_MONTHLY_TRENDS, MOCK_STARTUP_STAGES } from '@/data/mockAnalytics';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell } from 'recharts';

const COLORS = ['#0098c8', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899'];

export const StartupAnalytics = () => {
  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight flex items-center">
          <Rocket className="mr-3 text-amber-500" size={28} />
          Startup Analytics
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Track incubation progress, survival rates, and growth metrics.</p>
      </div>

      <FilterToolbar />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <KPIWidget title="Active Startups" value={MOCK_KPIS.startups} icon={<Rocket size={24} />} bgClass="bg-amber-50 text-amber-500" />
        <KPIWidget title="Commercialized" value={18} icon={<Target size={24} />} bgClass="bg-emerald-50 text-emerald-500" />
        <KPIWidget title="Jobs Created" value={342} icon={<Users size={24} />} bgClass="bg-blue-50 text-blue-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="Startup Registration Growth (YTD)">
          <LineChart data={MOCK_MONTHLY_TRENDS} margin={{ top: 20, right: 20, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} dy={10} />
            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
            <Tooltip contentStyle={{ borderRadius: '12px', border: 'none' }} />
            <Legend verticalAlign="top" height={36} />
            <Line type="monotone" dataKey="startups" name="New Startups" stroke="#f59e0b" strokeWidth={3} dot={{ r: 4, fill: '#f59e0b', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 6 }} />
          </LineChart>
        </ChartCard>

        <ChartCard title="Startup Stages">
          <PieChart>
            <Pie
              data={MOCK_STARTUP_STAGES}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={2}
              dataKey="count"
            >
              {MOCK_STARTUP_STAGES.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip contentStyle={{ borderRadius: '12px', border: 'none' }} />
            <Legend layout="vertical" verticalAlign="middle" align="right" wrapperStyle={{ fontSize: '12px' }} />
          </PieChart>
        </ChartCard>
      </div>
    </div>
  );
};
