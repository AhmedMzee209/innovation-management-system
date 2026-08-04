import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface DonutChartWidgetProps {
  data: any[];
}

export const DonutChartWidget = ({ data }: DonutChartWidgetProps) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="45%"
          innerRadius={60}
          outerRadius={80}
          paddingAngle={5}
          dataKey="value"
          stroke="none"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip 
          contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
          itemStyle={{ fontSize: '14px', fontWeight: 'bold', color: '#0d2137' }}
        />
        <Legend iconType="circle" wrapperStyle={{ fontSize: '12px' }} />
      </PieChart>
    </ResponsiveContainer>
  );
};
