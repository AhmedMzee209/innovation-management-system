
import { cn } from '@/lib/utils';
import { CheckCircle2, Clock, Lightbulb, PenTool, Rocket, XCircle, AlertCircle, PlayCircle } from 'lucide-react';

interface StatusBadgeProps {
  stage: string;
  className?: string;
  showIcon?: boolean;
}

export const StatusBadge = ({ stage, className, showIcon = true }: StatusBadgeProps) => {
  let color = 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300';
  let Icon = AlertCircle;

  let displayStage = stage;

  switch (stage) {
    case 'IDEA':
    case 'Idea':
      color = 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400';
      Icon = Lightbulb;
      displayStage = 'Idea';
      break;
    case 'SUBMITTED':
    case 'Submitted':
      color = 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
      Icon = PlayCircle;
      displayStage = 'Submitted';
      break;
    case 'UNDER_REVIEW':
    case 'Under Review':
      color = 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400';
      Icon = Clock;
      displayStage = 'Under Review';
      break;
    case 'EVALUATED':
    case 'Evaluated':
      color = 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400';
      Icon = CheckCircle2;
      displayStage = 'Evaluated';
      break;
    case 'APPROVED':
    case 'Approved':
      color = 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400';
      Icon = CheckCircle2;
      displayStage = 'Approved';
      break;
    case 'PROTOTYPING':
    case 'Prototyping':
      color = 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400';
      Icon = PenTool;
      displayStage = 'Prototyping';
      break;
    case 'STARTUP_FORMED':
    case 'Startup Formed':
      color = 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
      Icon = Rocket;
      displayStage = 'Startup Formed';
      break;
    case 'REJECTED':
    case 'Rejected':
      color = 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
      Icon = XCircle;
      displayStage = 'Rejected';
      break;
    default:
      displayStage = stage?.replace(/_/g, ' ');
  }

  return (
    <span className={cn("inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold tracking-wide", color, className)}>
      {showIcon && <Icon size={12} className="mr-1.5 shrink-0" />}
      {displayStage}
    </span>
  );
};
