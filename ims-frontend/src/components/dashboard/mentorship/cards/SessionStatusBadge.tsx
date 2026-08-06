import { SessionStatus, ActionPlanStatus, ActionPlanPriority } from '@/data/mockMentorship';
import { cn } from '@/lib/utils';
import { CalendarClock, CheckCircle2, XCircle, AlertCircle, CircleDashed, Clock, CheckCircle, AlertTriangle, ArrowUpCircle } from 'lucide-react';

export const SessionStatusBadge = ({ status, className }: { status: SessionStatus, className?: string }) => {
  let color = 'bg-gray-100 text-gray-700';
  let Icon = CalendarClock;

  switch (status) {
    case 'Scheduled': color = 'bg-blue-100 text-blue-700'; Icon = CalendarClock; break;
    case 'Completed': color = 'bg-green-100 text-green-700'; Icon = CheckCircle2; break;
    case 'Cancelled': color = 'bg-red-100 text-red-700'; Icon = XCircle; break;
    case 'No Show': color = 'bg-amber-100 text-amber-700'; Icon = AlertCircle; break;
  }

  return (
    <span className={cn("inline-flex items-center px-2 py-0.5 rounded text-xs font-bold tracking-wide", color, className)}>
      <Icon size={12} className="mr-1.5 shrink-0" />
      {status}
    </span>
  );
};

export const ActionPlanStatusBadge = ({ status, className }: { status: ActionPlanStatus, className?: string }) => {
  let color = 'bg-gray-100 text-gray-700';
  let Icon = CircleDashed;

  switch (status) {
    case 'Pending': color = 'bg-slate-100 text-slate-700'; Icon = CircleDashed; break;
    case 'In Progress': color = 'bg-blue-100 text-blue-700'; Icon = Clock; break;
    case 'Completed': color = 'bg-green-100 text-green-700'; Icon = CheckCircle; break;
    case 'Blocked': color = 'bg-red-100 text-red-700'; Icon = AlertTriangle; break;
  }

  return (
    <span className={cn("inline-flex items-center px-2 py-0.5 rounded text-xs font-bold tracking-wide", color, className)}>
      <Icon size={12} className="mr-1.5 shrink-0" />
      {status}
    </span>
  );
};

export const PriorityBadge = ({ priority, className }: { priority: ActionPlanPriority, className?: string }) => {
  let color = 'bg-gray-100 text-gray-700';

  switch (priority) {
    case 'Low': color = 'bg-slate-100 text-slate-700'; break;
    case 'Medium': color = 'bg-blue-100 text-blue-700'; break;
    case 'High': color = 'bg-amber-100 text-amber-700'; break;
    case 'Critical': color = 'bg-red-100 text-red-700'; break;
  }

  return (
    <span className={cn("inline-flex items-center px-2 py-0.5 rounded text-xs font-bold tracking-wide", color, className)}>
      <ArrowUpCircle size={12} className="mr-1.5 shrink-0" />
      {priority}
    </span>
  );
};
