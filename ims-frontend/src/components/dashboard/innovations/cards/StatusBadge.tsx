import { InnovationStage } from '@/data/mockInnovations';
import { cn } from '@/lib/utils';
import { CheckCircle2, Clock, Lightbulb, PenTool, Rocket, XCircle, AlertCircle, PlayCircle } from 'lucide-react';

interface StatusBadgeProps {
  stage: InnovationStage;
  className?: string;
  showIcon?: boolean;
}

export const StatusBadge = ({ stage, className, showIcon = true }: StatusBadgeProps) => {
  let color = 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300';
  let Icon = AlertCircle;

  switch (stage) {
    case 'Idea':
      color = 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400';
      Icon = Lightbulb;
      break;
    case 'Submitted':
      color = 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
      Icon = PlayCircle;
      break;
    case 'Under Review':
      color = 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400';
      Icon = Clock;
      break;
    case 'Evaluated':
      color = 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400';
      Icon = CheckCircle2;
      break;
    case 'Approved':
      color = 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400';
      Icon = CheckCircle2;
      break;
    case 'Prototyping':
      color = 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400';
      Icon = PenTool;
      break;
    case 'Startup Formed':
      color = 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
      Icon = Rocket;
      break;
    case 'Rejected':
      color = 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
      Icon = XCircle;
      break;
  }

  return (
    <span className={cn("inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold tracking-wide", color, className)}>
      {showIcon && <Icon size={12} className="mr-1.5 shrink-0" />}
      {stage}
    </span>
  );
};
