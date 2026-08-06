import { BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { MOCK_COMPETITIONS, MOCK_PARTICIPANTS } from '@/data/mockCompetitions';
import { Activity, Users, Trophy } from 'lucide-react';

export const CompetitionAnalytics = () => {
  // Aggregate data for Category Distribution (Pie Chart)
  const categoryData = MOCK_COMPETITIONS.reduce((acc: any[], comp) => {
    const existing = acc.find(item => item.name === comp.category);
    if (existing) existing.value += 1;
    else acc.push({ name: comp.category, value: 1 });
    return acc;
  }, []);

  const COLORS = ['#0098c8', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899'];

  // Mock data for Registration Trends (Area Chart)
  const registrationTrendData = [
    { month: 'Jan', participants: 120 },
    { month: 'Feb', participants: 150 },
    { month: 'Mar', participants: 200 },
    { month: 'Apr', participants: 180 },
    { month: 'May', participants: 250 },
    { month: 'Jun', participants: 300 },
  ];

  // Mock data for School Performance (Bar Chart)
  const schoolPerformanceData = [
    { school: 'Computing', wins: 15, participants: 80 },
    { school: 'Business', wins: 8, participants: 60 },
    { school: 'Agriculture', wins: 12, participants: 50 },
    { school: 'Health', wins: 5, participants: 40 },
    { school: 'Tourism', wins: 6, participants: 30 },
  ];

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      
      <div className="mb-8">
        <h1 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight flex items-center mb-2">
          <Activity className="mr-3 text-[#0098c8]" size={28} />
          Competition Analytics
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Analyze participant engagement, school performance, and competition growth.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Registration Trends */}
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 dark:text-white flex items-center mb-6">
            <Users size={16} className="mr-2 text-purple-500" /> Participant Growth Trend (2026)
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={registrationTrendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#374151" opacity={0.2} />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151', color: '#f9fafb', borderRadius: '0.5rem' }}
                  itemStyle={{ color: '#8b5cf6', fontWeight: 'bold' }}
                />
                <Area type="monotone" dataKey="participants" stroke="#8b5cf6" strokeWidth={3} fillOpacity={1} fill="url(#colorUsers)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Categories Pie Chart */}
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm flex flex-col">
          <h3 className="text-sm font-bold text-gray-900 dark:text-white flex items-center mb-2">
            <Activity size={16} className="mr-2 text-[#0098c8]" /> Competitions by Category
          </h3>
          <div className="flex-1 flex items-center justify-center min-h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  labelLine={false}
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151', color: '#f9fafb', borderRadius: '0.5rem' }}
                  itemStyle={{ fontWeight: 'bold' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* School Performance Bar Chart */}
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm lg:col-span-2">
          <h3 className="text-sm font-bold text-gray-900 dark:text-white flex items-center mb-6">
            <Trophy size={16} className="mr-2 text-amber-500" /> School Performance (Participants vs Wins)
          </h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={schoolPerformanceData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#374151" opacity={0.2} />
                <XAxis dataKey="school" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} />
                <YAxis yAxisId="left" orientation="left" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} />
                <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151', color: '#f9fafb', borderRadius: '0.5rem' }}
                  cursor={{ fill: '#374151', opacity: 0.1 }}
                />
                <Bar yAxisId="left" dataKey="participants" name="Participants" fill="#0098c8" radius={[4, 4, 0, 0]} />
                <Bar yAxisId="right" dataKey="wins" name="Competition Wins" fill="#f59e0b" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
};
