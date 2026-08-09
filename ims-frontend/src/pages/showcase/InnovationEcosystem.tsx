import { motion } from 'framer-motion';
import { ECOSYSTEM_GROWTH, SCHOOL_PERFORMANCE, SHOWCASE_STATS } from '@/data/mockShowcase';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { StatCounter } from '@/components/showcase/StatCounter';

export const InnovationEcosystem = () => (
  <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
    <div className="bg-gradient-to-r from-slate-800 to-slate-900 py-16 px-6 text-center">
      <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl font-black text-white mb-3">Innovation Ecosystem</motion.h1>
      <p className="text-white/70 mb-12">The thriving innovation landscape of SUZA — in numbers</p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
        <StatCounter end={SHOWCASE_STATS.innovations} label="Innovations" />
        <StatCounter end={SHOWCASE_STATS.startups} label="Startups" />
        <StatCounter end={SHOWCASE_STATS.partners} label="Partners" />
        <StatCounter end={SHOWCASE_STATS.countries} label="Countries" />
      </div>
    </div>

    <div className="max-w-6xl mx-auto px-6 py-16 space-y-12">
      <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 border border-gray-100 dark:border-gray-800 shadow-sm">
        <h2 className="text-xl font-black text-gray-900 dark:text-white mb-6">Ecosystem Growth (2020–2026)</h2>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={ECOSYSTEM_GROWTH}>
            <defs>
              <linearGradient id="gInn" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0098c8" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#0098c8" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="gStu" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
            <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
            <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }} />
            <Legend verticalAlign="top" height={36} />
            <Area type="monotone" dataKey="innovations" name="Innovations" stroke="#0098c8" strokeWidth={3} fill="url(#gInn)" />
            <Area type="monotone" dataKey="startups" name="Startups" stroke="#f59e0b" strokeWidth={3} fill="url(#gStu)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 border border-gray-100 dark:border-gray-800 shadow-sm">
        <h2 className="text-xl font-black text-gray-900 dark:text-white mb-6">School Performance Comparison</h2>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={SCHOOL_PERFORMANCE}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
            <XAxis dataKey="school" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
            <Tooltip contentStyle={{ borderRadius: '12px', border: 'none' }} />
            <Legend verticalAlign="top" height={36} />
            <Bar dataKey="innovations" name="Innovations" fill="#0098c8" radius={[4, 4, 0, 0]} />
            <Bar dataKey="startups" name="Startups" fill="#f59e0b" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  </div>
);
