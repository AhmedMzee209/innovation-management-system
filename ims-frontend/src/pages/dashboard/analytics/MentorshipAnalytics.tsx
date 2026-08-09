import { Users, Clock, CheckCircle2 } from 'lucide-react';
import { KPIWidget } from '@/components/dashboard/analytics/KPIWidget';
import { ChartCard } from '@/components/dashboard/analytics/ChartCard';
import { FilterToolbar } from '@/components/dashboard/analytics/FilterToolbar';
import { MOCK_KPIS, MOCK_MONTHLY_TRENDS } from '@/data/mockAnalytics';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar } from 'recharts';

export const MentorshipAnalytics = () => {
  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight flex items-center">
          <Users className="mr-3 text-emerald-500" size={28} />
          Mentorship Analytics
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Track mentor engagement, session hours, and startup progress.</p>
      </div>

      <FilterToolbar />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <KPIWidget title="Active Mentors" value={MOCK_KPIS.mentors} icon={<Users size={24} />} bgClass="bg-emerald-50 text-emerald-500" />
        <KPIWidget title="Total Sessions (YTD)" value={1420} icon={<Clock size={24} />} bgClass="bg-blue-50 text-blue-500" />
        <KPIWidget title="Completion Rate" value="92%" icon={<CheckCircle2 size={24} />} bgClass="bg-purple-50 text-purple-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="Mentorship Sessions Trend">
          <LineChart data={MOCK_MONTHLY_TRENDS} margin={{ top: 20, right: 20, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} dy={10} />
            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
            <Tooltip contentStyle={{ borderRadius: '12px', border: 'none' }} />
            <Legend verticalAlign="top" height={36} />
            <Line type="monotone" dataKey="submissions" name="Completed Sessions" stroke="#10b981" strokeWidth={3} dot={{ r: 4, fill: '#10b981', strokeWidth: 2, stroke: '#fff' }} />
          </LineChart>
        </ChartCard>

        <ChartCard title="Mentor Distribution by Hub">
          <BarChart data={[
            { name: 'Tech Hub', mentors: 35 },
            { name: 'Business Hub', mentors: 25 },
            { name: 'Agri Hub', mentors: 15 },
            { name: 'Edu Hub', mentors: 10 },
          ]} margin={{ top: 20, right: 0, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} dy={10} />
            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
            <Tooltip cursor={{ fill: '#f3f4f6' }} contentStyle={{ borderRadius: '12px', border: 'none' }} />
            <Bar dataKey="mentors" name="Mentors" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ChartCard>
      </div>
    </div>
  );
};
