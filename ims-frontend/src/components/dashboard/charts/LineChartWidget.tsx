import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface LineChartWidgetProps {
  data: any[];
}

export const LineChartWidget = ({ data }: LineChartWidgetProps) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" className="dark:stroke-gray-800" />
        <XAxis 
          dataKey="name" 
          axisLine={false} 
          tickLine={false} 
          tick={{ fill: '#9ca3af', fontSize: 12 }} 
          dy={10}
        />
        <YAxis 
          axisLine={false} 
          tickLine={false} 
          tick={{ fill: '#9ca3af', fontSize: 12 }}
        />
        <Tooltip 
          contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
          itemStyle={{ fontSize: '14px', fontWeight: 'bold' }}
        />
        <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', paddingTop: '20px' }} />
        <Line 
          type="monotone" 
          dataKey="submissions" 
          name="Submissions"
          stroke="#0098c8" 
          strokeWidth={3} 
          dot={{ r: 4, fill: '#0098c8', strokeWidth: 2, stroke: '#fff' }} 
          activeDot={{ r: 6, strokeWidth: 0 }}
        />
        <Line 
          type="monotone" 
          dataKey="startups" 
          name="Startups Formed"
          stroke="#e8b800" 
          strokeWidth={3}
          dot={{ r: 4, fill: '#e8b800', strokeWidth: 2, stroke: '#fff' }} 
        />
      </LineChart>
    </ResponsiveContainer>
  );
};
