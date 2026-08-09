import { AreaChart, Area, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface MonitoringChartProps {
  data: any[];
  metrics: { key: string; color: string; label: string }[];
  type?: 'area' | 'line';
  height?: number;
  title?: string;
}

export const MonitoringChart = ({ data, metrics, type = 'area', height = 240, title }: MonitoringChartProps) => {
  const ChartComponent = type === 'area' ? AreaChart : LineChart;

  return (
    <div>
      {title && <h3 className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">{title}</h3>}
      <ResponsiveContainer width="100%" height={height}>
        <ChartComponent data={data}>
          <defs>
            {metrics.map(m => (
              <linearGradient key={m.key} id={`grad_${m.key}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={m.color} stopOpacity={0.25} />
                <stop offset="95%" stopColor={m.color} stopOpacity={0} />
              </linearGradient>
            ))}
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(156,163,175,0.2)" />
          <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#9ca3af' }} />
          <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#9ca3af' }} />
          <Tooltip
            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', backgroundColor: 'rgba(17,24,39,0.95)', color: '#f9fafb' }}
            labelStyle={{ color: '#9ca3af', fontSize: '11px' }}
          />
          <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '12px' }} />
          {metrics.map(m =>
            type === 'area' ? (
              <Area key={m.key} type="monotone" dataKey={m.key} name={m.label} stroke={m.color} strokeWidth={2} fill={`url(#grad_${m.key})`} dot={false} activeDot={{ r: 4 }} />
            ) : (
              <Line key={m.key} type="monotone" dataKey={m.key} name={m.label} stroke={m.color} strokeWidth={2} dot={false} activeDot={{ r: 4 }} />
            )
          )}
        </ChartComponent>
      </ResponsiveContainer>
    </div>
  );
};
