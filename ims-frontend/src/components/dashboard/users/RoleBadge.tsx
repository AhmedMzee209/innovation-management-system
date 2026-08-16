import { cn } from '@/lib/utils';
import { Shield, ShieldAlert, Star, User, BookOpen, GraduationCap, Briefcase, Globe } from 'lucide-react';

interface RoleBadgeProps {
  roleId: string;
  className?: string;
}

export const RoleBadge = ({ roleId, className }: RoleBadgeProps) => {
  const getRoleConfig = () => {
    switch (roleId) {
      case 'SUPER_ADMIN':
        return { label: 'Super Admin', color: 'bg-purple-100 text-purple-700 dark:bg-purple-500/10 dark:text-purple-400 border-purple-200 dark:border-purple-800', icon: ShieldAlert };
      case 'INNOVATION_DIRECTOR':
        return { label: 'Director', color: 'bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400 border-blue-200 dark:border-blue-800', icon: Star };
      case 'CENTRAL_INNOVATION_MANAGER':
      case 'CENTRAL_HUB_MANAGER':
      case 'SCHOOL_INNOVATION_MANAGER':
      case 'SCHOOL_HUB_MANAGER':
        return { label: 'Manager', color: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800', icon: Shield };
      case 'MENTOR':
        return { label: 'Mentor', color: 'bg-teal-100 text-teal-700 dark:bg-teal-500/10 dark:text-teal-400 border-teal-200 dark:border-teal-800', icon: Briefcase };
      case 'REVIEWER':
        return { label: 'Reviewer', color: 'bg-orange-100 text-orange-700 dark:bg-orange-500/10 dark:text-orange-400 border-orange-200 dark:border-orange-800', icon: BookOpen };
      case 'INNOVATOR':
        return { label: 'Innovator', color: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border-slate-200 dark:border-slate-700', icon: GraduationCap };
      case 'INVESTOR':
        return { label: 'Investor', color: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800', icon: Briefcase };
      case 'PUBLIC_VISITOR':
        return { label: 'Visitor', color: 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400 border-gray-200 dark:border-gray-700', icon: Globe };
      default:
        return { label: 'User', color: 'bg-gray-100 text-gray-700 border-gray-200', icon: User };
    }
  };

  const config = getRoleConfig();
  const Icon = config.icon;

  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border",
        config.color,
        className
      )}
    >
      <Icon size={12} className="mr-1.5 opacity-70" />
      {config.label}
    </span>
  );
};
