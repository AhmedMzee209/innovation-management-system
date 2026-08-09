import { Building2, Layers, Users } from 'lucide-react';
import { KPIWidget } from '@/components/dashboard/analytics/KPIWidget';
import { ChartCard } from '@/components/dashboard/analytics/ChartCard';
import { FilterToolbar } from '@/components/dashboard/analytics/FilterToolbar';
import { MOCK_KPIS, MOCK_SCHOOL_DISTRIBUTION } from '@/data/mockAnalytics';
import { PieChart, Pie, Cell, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

const COLORS = ['#0098c8', '#10b981', '#f59e0b', '#8b5cf6', '#64748b'];

export const OrganizationAnalytics = () => {
  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight flex items-center">
          <Building2 className="mr-3 text-slate-600" size={28} />
          Organization Analytics
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Insights into schools, departments, and hubs.</p>
      </div>

      <FilterToolbar />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <KPIWidget title="Total Schools" value={MOCK_KPIS.schools} icon={<Building2 size={24} />} bgClass="bg-slate-50 text-slate-500" />
        <KPIWidget title="Innovation Hubs" value={MOCK_KPIS.hubs} icon={<Layers size={24} />} bgClass="bg-blue-50 text-blue-500" />
        <KPIWidget title="Total Hub Members" value={450} icon={<Users size={24} />} bgClass="bg-emerald-50 text-emerald-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="User Distribution by School">
          <PieChart>
            <Pie
              data={MOCK_SCHOOL_DISTRIBUTION}
              cx="50%"
              cy="50%"
              outerRadius={100}
              dataKey="value"
            >
              {MOCK_SCHOOL_DISTRIBUTION.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip contentStyle={{ borderRadius: '12px', border: 'none' }} />
            <Legend layout="horizontal" verticalAlign="bottom" align="center" wrapperStyle={{ fontSize: '11px', paddingTop: '20px' }} />
          </PieChart>
        </ChartCard>

        <ChartCard title="Activity by Hub">
          <BarChart data={[
            { name: 'Tech Hub', users: 150, activities: 320 },
            { name: 'Business Hub', users: 120, activities: 210 },
            { name: 'Agri Hub', users: 80, activities: 150 },
            { name: 'Edu Hub', users: 100, activities: 180 },
          ]} margin={{ top: 20, right: 0, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} dy={10} />
            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
            <Tooltip cursor={{ fill: '#f3f4f6' }} contentStyle={{ borderRadius: '12px', border: 'none' }} />
            <Legend verticalAlign="top" height={36} />
            <Bar dataKey="users" name="Active Users" fill="#0098c8" radius={[4, 4, 0, 0]} />
            <Bar dataKey="activities" name="Activities" fill="#10b981" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ChartCard>
      </div>
    </div>
  );
};
