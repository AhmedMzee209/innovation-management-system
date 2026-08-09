import { ReactNode } from 'react';

interface KPIWidgetProps {
  title: string;
  value: string | number;
  trend?: string;
  trendUp?: boolean;
  icon: ReactNode;
  bgClass?: string;
}

export const KPIWidget = ({ title, value, trend, trendUp, icon, bgClass = 'bg-[#0098c8]/10 text-[#0098c8]' }: KPIWidgetProps) => {
  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow group flex flex-col justify-between">
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">{title}</p>
          <h3 className="text-2xl font-black text-gray-900 dark:text-white">{value}</h3>
        </div>
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-110 ${bgClass}`}>
          {icon}
        </div>
      </div>
      {trend && (
        <div className="flex items-center text-xs font-bold mt-2">
          {trendUp !== undefined && (
            <span className={`mr-1.5 ${trendUp ? 'text-emerald-500' : 'text-red-500'}`}>
              {trendUp ? '↑' : '↓'}
            </span>
          )}
          <span className="text-gray-500">{trend}</span>
        </div>
      )}
    </div>
  );
};
