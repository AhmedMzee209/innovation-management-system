import { ReactNode } from 'react';
import { DashboardCard } from '../widgets/DashboardCard';

interface ChartCardProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
}

export const ChartCard = ({ title, subtitle, children }: ChartCardProps) => {
  return (
    <DashboardCard title={title} subtitle={subtitle} contentClassName="pt-6 pb-2">
      <div className="h-72 w-full">
        {children}
      </div>
    </DashboardCard>
  );
};
