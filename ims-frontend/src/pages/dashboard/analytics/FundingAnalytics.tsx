import { Banknote, TrendingUp, PieChart as PieIcon } from 'lucide-react';
import { KPIWidget } from '@/components/dashboard/analytics/KPIWidget';
import { ChartCard } from '@/components/dashboard/analytics/ChartCard';
import { FilterToolbar } from '@/components/dashboard/analytics/FilterToolbar';
import { MOCK_KPIS, MOCK_FUNDING_BUDGET, MOCK_MONTHLY_TRENDS } from '@/data/mockAnalytics';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, AreaChart, Area } from 'recharts';

export const FundingAnalytics = () => {
  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight flex items-center">
          <Banknote className="mr-3 text-purple-600" size={28} />
          Funding Analytics
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Overview of budget allocation, utilization, and disbursement trends.</p>
      </div>

      <FilterToolbar />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <KPIWidget 
          title="Total Budget (2026)" 
          value="$5.0M" 
          icon={<Banknote size={24} />} 
          bgClass="bg-purple-50 text-purple-500" 
        />
        <KPIWidget 
          title="Total Utilized" 
          value={`$${(MOCK_KPIS.funding.totalAmount / 1000000).toFixed(1)}M`} 
          icon={<PieIcon size={24} />} 
          bgClass="bg-blue-50 text-blue-500" 
        />
        <KPIWidget 
          title="Avg Disbursement" 
          value="$45K" 
          icon={<TrendingUp size={24} />} 
          bgClass="bg-emerald-50 text-emerald-500" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="Budget Allocation vs Utilization">
          <BarChart data={MOCK_FUNDING_BUDGET} margin={{ top: 20, right: 0, left: 10, bottom: 0 }} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e5e7eb" />
            <XAxis type="number" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
            <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 11 }} width={120} />
            <Tooltip cursor={{ fill: '#f3f4f6' }} contentStyle={{ borderRadius: '12px', border: 'none' }} />
            <Legend verticalAlign="top" height={36} />
            <Bar dataKey="allocated" name="Allocated Budget" fill="#e2e8f0" radius={[0, 4, 4, 0]} barSize={16} />
            <Bar dataKey="utilized" name="Utilized Amount" fill="#8b5cf6" radius={[0, 4, 4, 0]} barSize={16} />
          </BarChart>
        </ChartCard>

        <ChartCard title="Monthly Disbursements">
          <AreaChart data={MOCK_MONTHLY_TRENDS} margin={{ top: 20, right: 20, left: 10, bottom: 0 }}>
            <defs>
              <linearGradient id="colorFunding" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} dy={10} />
            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
            <Tooltip contentStyle={{ borderRadius: '12px', border: 'none' }} />
            <Area type="monotone" dataKey="funding" name="Disbursed ($)" stroke="#8b5cf6" strokeWidth={3} fillOpacity={1} fill="url(#colorFunding)" />
          </AreaChart>
        </ChartCard>
      </div>
    </div>
  );
};
