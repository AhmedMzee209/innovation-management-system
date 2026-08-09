import { Briefcase, FileCheck, Map } from 'lucide-react';
import { KPIWidget } from '@/components/dashboard/analytics/KPIWidget';
import { ChartCard } from '@/components/dashboard/analytics/ChartCard';
import { FilterToolbar } from '@/components/dashboard/analytics/FilterToolbar';
import { MOCK_KPIS, MOCK_MONTHLY_TRENDS } from '@/data/mockAnalytics';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar, Legend } from 'recharts';

export const OpportunityAnalytics = () => {
  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight flex items-center">
          <Briefcase className="mr-3 text-blue-500" size={28} />
          Opportunity Analytics
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Metrics on internships, grants, and external ecosystem opportunities.</p>
      </div>

      <FilterToolbar />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <KPIWidget title="Total Opportunities" value={MOCK_KPIS.opportunities} icon={<Briefcase size={24} />} bgClass="bg-blue-50 text-blue-500" />
        <KPIWidget title="Total Applications" value={1845} icon={<FileCheck size={24} />} bgClass="bg-emerald-50 text-emerald-500" />
        <KPIWidget title="Acceptance Rate" value="14%" icon={<Map size={24} />} bgClass="bg-purple-50 text-purple-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="Applications Trend">
          <AreaChart data={MOCK_MONTHLY_TRENDS} margin={{ top: 20, right: 20, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorApp" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} dy={10} />
            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
            <Tooltip contentStyle={{ borderRadius: '12px', border: 'none' }} />
            <Area type="monotone" dataKey="submissions" name="Applications" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorApp)" />
          </AreaChart>
        </ChartCard>

        <ChartCard title="Opportunities by Type">
          <BarChart data={[
            { name: 'Internships', count: 65 },
            { name: 'Grants', count: 45 },
            { name: 'Partnerships', count: 30 },
            { name: 'Fellowships', count: 16 },
          ]} margin={{ top: 20, right: 0, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} dy={10} />
            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
            <Tooltip cursor={{ fill: '#f3f4f6' }} contentStyle={{ borderRadius: '12px', border: 'none' }} />
            <Legend verticalAlign="top" height={36} />
            <Bar dataKey="count" name="Available Opportunities" fill="#0098c8" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ChartCard>
      </div>
    </div>
  );
};
