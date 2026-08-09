import { Trophy, Users, Award } from 'lucide-react';
import { KPIWidget } from '@/components/dashboard/analytics/KPIWidget';
import { ChartCard } from '@/components/dashboard/analytics/ChartCard';
import { FilterToolbar } from '@/components/dashboard/analytics/FilterToolbar';
import { MOCK_KPIS, MOCK_SCHOOL_DISTRIBUTION, MOCK_CATEGORY_DISTRIBUTION } from '@/data/mockAnalytics';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell } from 'recharts';

const COLORS = ['#0098c8', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899'];

export const CompetitionAnalytics = () => {
  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight flex items-center">
          <Trophy className="mr-3 text-amber-500" size={28} />
          Competition Analytics
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Metrics on hackathons, pitch events, and school participation.</p>
      </div>

      <FilterToolbar />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <KPIWidget title="Total Competitions" value={MOCK_KPIS.competitions} icon={<Trophy size={24} />} bgClass="bg-amber-50 text-amber-500" />
        <KPIWidget title="Total Participants" value={845} icon={<Users size={24} />} bgClass="bg-blue-50 text-blue-500" />
        <KPIWidget title="Awards Granted" value={42} icon={<Award size={24} />} bgClass="bg-purple-50 text-purple-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="Participation by School">
          <BarChart data={MOCK_SCHOOL_DISTRIBUTION} margin={{ top: 20, right: 0, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10 }} dy={10} />
            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
            <Tooltip cursor={{ fill: '#f3f4f6' }} contentStyle={{ borderRadius: '12px', border: 'none' }} />
            <Bar dataKey="value" name="Participants" fill="#0098c8" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ChartCard>

        <ChartCard title="Competition Categories">
          <PieChart>
            <Pie
              data={MOCK_CATEGORY_DISTRIBUTION}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={2}
              dataKey="value"
            >
              {MOCK_CATEGORY_DISTRIBUTION.map((entry, index) => (
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
