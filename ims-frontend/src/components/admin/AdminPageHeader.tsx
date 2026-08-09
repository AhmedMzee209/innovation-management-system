import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

interface Breadcrumb { label: string; href?: string; }

interface AdminPageHeaderProps {
  title: string;
  subtitle?: string;
  breadcrumbs?: Breadcrumb[];
  actions?: ReactNode;
  icon?: ReactNode;
  badge?: { label: string; color: string };
}

export const AdminPageHeader = ({ title, subtitle, breadcrumbs, actions, icon, badge }: AdminPageHeaderProps) => (
  <div className="mb-8">
    {breadcrumbs && (
      <nav className="flex items-center gap-1 text-xs text-gray-400 mb-3">
        <Link to="/admin" className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors">Admin</Link>
        {breadcrumbs.map((b, i) => (
          <span key={i} className="flex items-center gap-1">
            <ChevronRight size={12} />
            {b.href ? <Link to={b.href} className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors">{b.label}</Link> : <span className="text-gray-600 dark:text-gray-300 font-medium">{b.label}</span>}
          </span>
        ))}
      </nav>
    )}
    <div className="flex items-start justify-between gap-4">
      <div className="flex items-center gap-4">
        {icon && <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#0098c8] to-[#005f8a] flex items-center justify-center text-white shadow-lg">{icon}</div>}
        <div>
          <div className="flex items-center gap-3">
            <motion.h1 initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="text-2xl font-black text-gray-900 dark:text-white">{title}</motion.h1>
            {badge && <span className={`px-2 py-0.5 text-xs font-bold rounded-full ${badge.color}`}>{badge.label}</span>}
          </div>
          {subtitle && <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">{subtitle}</p>}
        </div>
      </div>
      {actions && <div className="flex items-center gap-2 flex-shrink-0">{actions}</div>}
    </div>
  </div>
);
