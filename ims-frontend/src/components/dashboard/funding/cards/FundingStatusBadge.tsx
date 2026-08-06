import { FundingProgramStatus, ApplicationStatus, DisbursementStatus } from '@/data/mockFunding';
import { cn } from '@/lib/utils';
import { CheckCircle2, XCircle, AlertCircle, Clock, Banknote, Calendar, Hourglass, RefreshCw } from 'lucide-react';

export const ProgramStatusBadge = ({ status, className }: { status: FundingProgramStatus, className?: string }) => {
  let color = 'bg-gray-100 text-gray-700';
  let Icon = Clock;

  switch (status) {
    case 'Active': color = 'bg-emerald-100 text-emerald-700'; Icon = CheckCircle2; break;
    case 'Upcoming': color = 'bg-blue-100 text-blue-700'; Icon = Calendar; break;
    case 'Closed': color = 'bg-gray-100 text-gray-500'; Icon = XCircle; break;
    case 'Draft': color = 'bg-amber-100 text-amber-700'; Icon = AlertCircle; break;
  }

  return (
    <span className={cn("inline-flex items-center px-2 py-0.5 rounded text-xs font-bold tracking-wide", color, className)}>
      <Icon size={12} className="mr-1.5 shrink-0" />
      {status}
    </span>
  );
};

export const AppStatusBadge = ({ status, className }: { status: ApplicationStatus, className?: string }) => {
  let color = 'bg-gray-100 text-gray-700';
  let Icon = Clock;

  switch (status) {
    case 'Draft': color = 'bg-slate-100 text-slate-700'; Icon = Clock; break;
    case 'Submitted': color = 'bg-blue-100 text-blue-700'; Icon = CheckCircle2; break;
    case 'Under Review': color = 'bg-amber-100 text-amber-700'; Icon = Hourglass; break;
    case 'Approved': color = 'bg-emerald-100 text-emerald-700'; Icon = Banknote; break;
    case 'Rejected': color = 'bg-red-100 text-red-700'; Icon = XCircle; break;
    case 'Revision Required': color = 'bg-purple-100 text-purple-700'; Icon = RefreshCw; break;
  }

  return (
    <span className={cn("inline-flex items-center px-2 py-0.5 rounded text-xs font-bold tracking-wide", color, className)}>
      <Icon size={12} className="mr-1.5 shrink-0" />
      {status}
    </span>
  );
};

export const DisbursementStatusBadge = ({ status, className }: { status: DisbursementStatus, className?: string }) => {
  let color = 'bg-gray-100 text-gray-700';
  let Icon = Clock;

  switch (status) {
    case 'Pending': color = 'bg-amber-100 text-amber-700'; Icon = Clock; break;
    case 'Processing': color = 'bg-blue-100 text-blue-700'; Icon = RefreshCw; break;
    case 'Completed': color = 'bg-emerald-100 text-emerald-700'; Icon = CheckCircle2; break;
    case 'Failed': color = 'bg-red-100 text-red-700'; Icon = AlertCircle; break;
  }

  return (
    <span className={cn("inline-flex items-center px-2 py-0.5 rounded text-xs font-bold tracking-wide", color, className)}>
      <Icon size={12} className="mr-1.5 shrink-0" />
      {status}
    </span>
  );
};
