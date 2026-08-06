import { CompetitionStatus } from '@/data/mockCompetitions';
import { cn } from '@/lib/utils';
import { CheckCircle2, Clock, Calendar, Check, XCircle } from 'lucide-react';

export const CompetitionStatusBadge = ({ status, className }: { status: CompetitionStatus, className?: string }) => {
  let color = 'bg-gray-100 text-gray-700';
  let Icon = Clock;

  switch (status) {
    case 'Draft': color = 'bg-slate-100 text-slate-700'; Icon = Clock; break;
    case 'Upcoming': color = 'bg-blue-100 text-blue-700'; Icon = Calendar; break;
    case 'Registration Open': color = 'bg-amber-100 text-amber-700'; Icon = Check; break;
    case 'Live': color = 'bg-emerald-100 text-emerald-700 shadow-[0_0_10px_rgba(16,185,129,0.3)] border border-emerald-200'; Icon = CheckCircle2; break;
    case 'Completed': color = 'bg-purple-100 text-purple-700'; Icon = CheckCircle2; break;
    case 'Cancelled': color = 'bg-red-100 text-red-700'; Icon = XCircle; break;
  }

  return (
    <span className={cn("inline-flex items-center px-2.5 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase", color, className)}>
      <Icon size={10} className="mr-1.5 shrink-0" />
      {status}
    </span>
  );
};
