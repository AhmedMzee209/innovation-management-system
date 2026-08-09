import { Lightbulb } from 'lucide-react';
import { KPIWidget } from '@/components/dashboard/analytics/KPIWidget';
import { ChartCard } from '@/components/dashboard/analytics/ChartCard';
import { FilterToolbar } from '@/components/dashboard/analytics/FilterToolbar';
import { MOCK_KPIS, MOCK_MONTHLY_TRENDS, MOCK_CATEGORY_DISTRIBUTION } from '@/data/mockAnalytics';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

const COLORS = ['#0098c8', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899'];

export const InnovationAnalytics = () => {
  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight flex items-center">
          <Lightbulb className="mr-3 text-emerald-500" size={28} />
          Innovation Analytics
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Detailed breakdown of ideas, submissions, and categories.</p>
      </div>

      <FilterToolbar />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <KPIWidget title="Total Ideas" value={MOCK_KPIS.innovations.total} icon={<Lightbulb size={24} />} bgClass="bg-emerald-50 text-emerald-500" />
        <KPIWidget title="Approved" value={MOCK_KPIS.innovations.approved} icon={<Lightbulb size={24} />} bgClass="bg-blue-50 text-blue-500" />
        <KPIWidget title="Conversion Rate" value={`${Math.round((MOCK_KPIS.innovations.approved / MOCK_KPIS.innovations.total) * 100)}%`} icon={<Lightbulb size={24} />} bgClass="bg-purple-50 text-purple-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="Monthly Submissions (By Status)">
          <BarChart data={MOCK_MONTHLY_TRENDS} margin={{ top: 20, right: 0, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} dy={10} />
            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
            <Tooltip cursor={{ fill: '#f3f4f6' }} contentStyle={{ borderRadius: '12px', border: 'none' }} />
            <Legend verticalAlign="top" height={36} />
            <Bar dataKey="submissions" name="Total Submitted" fill="#e2e8f0" radius={[4, 4, 0, 0]} />
            <Bar dataKey="approvals" name="Approved" fill="#10b981" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ChartCard>

        <ChartCard title="Submissions by Category">
          <PieChart>
            <Pie
              data={MOCK_CATEGORY_DISTRIBUTION}
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              labelLine={false}
            >
              {MOCK_CATEGORY_DISTRIBUTION.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip contentStyle={{ borderRadius: '12px', border: 'none' }} />
          </PieChart>
        </ChartCard>
      </div>
    </div>
  );
};
