import { StartupStage, IncubationStatus, FundingStatus } from '@/data/mockStartups';
import { cn } from '@/lib/utils';
import { Lightbulb, Search, FlaskConical, Rocket, Users, Target, TrendingUp, CheckCircle, Clock, AlertTriangle, DollarSign, Leaf } from 'lucide-react';

export const StageBadge = ({ stage, className }: { stage: StartupStage, className?: string }) => {
  let color = 'bg-gray-100 text-gray-700';
  let Icon = Lightbulb;

  switch (stage) {
    case 'Idea': color = 'bg-slate-100 text-slate-700'; Icon = Lightbulb; break;
    case 'Validation': color = 'bg-indigo-100 text-indigo-700'; Icon = Search; break;
    case 'Prototype': color = 'bg-blue-100 text-blue-700'; Icon = FlaskConical; break;
    case 'MVP': color = 'bg-amber-100 text-amber-700'; Icon = Rocket; break;
    case 'Incubation': color = 'bg-purple-100 text-purple-700'; Icon = Users; break;
    case 'Market Launch': color = 'bg-pink-100 text-pink-700'; Icon = Target; break;
    case 'Growth': color = 'bg-emerald-100 text-emerald-700'; Icon = TrendingUp; break;
  }

  return (
    <span className={cn("inline-flex items-center px-2 py-0.5 rounded text-xs font-bold tracking-wide", color, className)}>
      <Icon size={12} className="mr-1.5 shrink-0" />
      {stage}
    </span>
  );
};

export const IncubationBadge = ({ status, className }: { status: IncubationStatus, className?: string }) => {
  let color = 'bg-gray-100 text-gray-700';
  let Icon = Clock;

  switch (status) {
    case 'Pending': color = 'bg-gray-100 text-gray-700'; Icon = Clock; break;
    case 'Active': color = 'bg-blue-100 text-blue-700'; Icon = Rocket; break;
    case 'Graduated': color = 'bg-emerald-100 text-emerald-700'; Icon = CheckCircle; break;
    case 'Dropped': color = 'bg-red-100 text-red-700'; Icon = AlertTriangle; break;
  }

  return (
    <span className={cn("inline-flex items-center px-2 py-0.5 rounded text-xs font-bold tracking-wide", color, className)}>
      <Icon size={12} className="mr-1.5 shrink-0" />
      {status}
    </span>
  );
};

export const FundingBadge = ({ status, className }: { status: FundingStatus, className?: string }) => {
  let color = 'bg-gray-100 text-gray-700';
  let Icon = DollarSign;

  switch (status) {
    case 'Bootstrapped': color = 'bg-slate-100 text-slate-700'; Icon = Target; break;
    case 'Pre-Seed': color = 'bg-amber-100 text-amber-700'; Icon = Leaf; break;
    case 'Seed': color = 'bg-green-100 text-green-700'; Icon = Leaf; break;
    case 'Series A': color = 'bg-emerald-100 text-emerald-700'; Icon = TrendingUp; break;
  }

  return (
    <span className={cn("inline-flex items-center px-2 py-0.5 rounded text-xs font-bold tracking-wide", color, className)}>
      <Icon size={12} className="mr-1.5 shrink-0" />
      {status}
    </span>
  );
};
