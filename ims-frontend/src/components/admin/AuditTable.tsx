import { useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { ChevronUp, ChevronDown, ChevronLeft, ChevronRight, Search, X, SlidersHorizontal, Download } from 'lucide-react';
import { RootState } from '@/store';
import { setAuditSearch, setAuditModule, setAuditAction, setAuditStatus, setAuditPage, setAuditSort, resetAuditFilters } from '@/store/slices/auditSlice';
import { AUDIT_LOGS } from '@/data/mockAdmin';
import { StatusBadge } from './StatusBadge';
import { format } from 'date-fns';

const MODULES = ['All', 'AUTH', 'USERS', 'INNOVATIONS', 'STARTUPS', 'FUNDING', 'COMPETITION', 'MENTORSHIP', 'DOCUMENTS', 'SETTINGS', 'REPORTS', 'ORGANIZATION'];
const ACTIONS = ['All', 'LOGIN', 'LOGOUT', 'CREATE', 'UPDATE', 'DELETE', 'VIEW', 'EXPORT', 'APPROVE', 'REJECT'];
const STATUSES = ['All', 'SUCCESS', 'FAILED', 'BLOCKED', 'PENDING'];

export const AuditTable = () => {
  const dispatch = useDispatch();
  const { searchQuery, filterModule, filterAction, filterStatus, sortBy, sortDir, currentPage, pageSize } = useSelector((s: RootState) => s.audit);
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    let data = [...AUDIT_LOGS];
    if (filterModule !== 'All') data = data.filter(l => l.module === filterModule);
    if (filterAction !== 'All') data = data.filter(l => l.action === filterAction);
    if (filterStatus !== 'All') data = data.filter(l => l.status === filterStatus);
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      data = data.filter(l => l.user.toLowerCase().includes(q) || l.resource.toLowerCase().includes(q) || l.ip.includes(q));
    }
    if (sortBy === 'timestamp') data.sort((a, b) => sortDir === 'desc' ? new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime() : new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
    else if (sortBy === 'user') data.sort((a, b) => sortDir === 'desc' ? b.user.localeCompare(a.user) : a.user.localeCompare(b.user));
    return data;
  }, [filterModule, filterAction, filterStatus, searchQuery, sortBy, sortDir]);

  const totalPages = Math.ceil(filtered.length / pageSize);
  const paginated = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const SortIcon = ({ col }: { col: string }) => {
    if (sortBy !== col) return <ChevronUp size={12} className="opacity-20" />;
    return sortDir === 'asc' ? <ChevronUp size={12} className="text-[#0098c8]" /> : <ChevronDown size={12} className="text-[#0098c8]" />;
  };

  const handleSort = (col: string) => {
    dispatch(setAuditSort({ by: col, dir: sortBy === col && sortDir === 'asc' ? 'desc' : 'asc' }));
  };

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex flex-col md:flex-row gap-3 items-start md:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            value={searchQuery}
            onChange={e => dispatch(setAuditSearch(e.target.value))}
            placeholder="Search user, resource, IP..."
            className="w-full pl-9 pr-9 py-2.5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-700 dark:text-gray-300 outline-none focus:ring-2 focus:ring-[#0098c8]/30"
          />
          {searchQuery && <button onClick={() => dispatch(setAuditSearch(''))} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"><X size={14} /></button>}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-400">{filtered.length.toLocaleString()} records</span>
          <button onClick={() => setShowFilters(!showFilters)} className="flex items-center gap-1.5 px-3 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-xs font-bold text-gray-600 dark:text-gray-400 hover:border-[#0098c8] transition-colors">
            <SlidersHorizontal size={14} /> Filters
          </button>
          <button onClick={() => dispatch(resetAuditFilters())} className="px-3 py-2 text-xs font-bold text-gray-500 hover:text-red-500 transition-colors">Reset</button>
          <button className="flex items-center gap-1.5 px-3 py-2 bg-[#0098c8] text-white rounded-xl text-xs font-bold hover:bg-[#007ba1] transition-colors">
            <Download size={14} /> Export
          </button>
        </div>
      </div>

      {/* Filter bar */}
      {showFilters && (
        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="grid grid-cols-2 md:grid-cols-4 gap-3 bg-gray-50 dark:bg-gray-900 rounded-xl p-4 border border-gray-100 dark:border-gray-800">
          {[
            { label: 'Module', value: filterModule, options: MODULES, action: setAuditModule },
            { label: 'Action', value: filterAction, options: ACTIONS, action: setAuditAction },
            { label: 'Status', value: filterStatus, options: STATUSES, action: setAuditStatus },
          ].map(({ label, value, options, action }) => (
            <div key={label}>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">{label}</label>
              <select value={value} onChange={e => dispatch(action(e.target.value))} className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-700 dark:text-gray-300 outline-none">
                {options.map(o => <option key={o}>{o}</option>)}
              </select>
            </div>
          ))}
        </motion.div>
      )}

      {/* Table */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px]">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-800/50">
                {[
                  { label: 'Timestamp', col: 'timestamp' },
                  { label: 'User', col: 'user' },
                  { label: 'Action', col: 'action' },
                  { label: 'Module', col: 'module' },
                  { label: 'Resource', col: 'resource' },
                  { label: 'IP Address', col: 'ip' },
                  { label: 'Status', col: 'status' },
                ].map(({ label, col }) => (
                  <th key={col} onClick={() => handleSort(col)} className="px-4 py-3 text-left text-xs font-black uppercase tracking-wider text-gray-500 cursor-pointer hover:text-gray-700 dark:hover:text-gray-300 select-none">
                    <span className="flex items-center gap-1">{label} <SortIcon col={col} /></span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
              {paginated.map((log, i) => (
                <motion.tr key={log.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.01 }} className="hover:bg-gray-50 dark:hover:bg-gray-800/40 transition-colors">
                  <td className="px-4 py-3 text-xs text-gray-500 whitespace-nowrap font-mono">{format(new Date(log.timestamp), 'MMM d, HH:mm:ss')}</td>
                  <td className="px-4 py-3">
                    <p className="text-xs font-bold text-gray-900 dark:text-white">{log.user}</p>
                    <p className="text-xs text-gray-400">{log.userRole}</p>
                  </td>
                  <td className="px-4 py-3"><span className="px-2 py-0.5 bg-[#0098c8]/10 text-[#0098c8] text-xs font-bold rounded-md">{log.action}</span></td>
                  <td className="px-4 py-3 text-xs font-semibold text-gray-600 dark:text-gray-400">{log.module}</td>
                  <td className="px-4 py-3 text-xs text-gray-500 max-w-[180px] truncate">{log.resource}</td>
                  <td className="px-4 py-3 text-xs font-mono text-gray-400">{log.ip}</td>
                  <td className="px-4 py-3"><StatusBadge status={log.status} size="sm" /></td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100 dark:border-gray-800">
          <span className="text-xs text-gray-400">Page {currentPage} of {totalPages} · {filtered.length.toLocaleString()} total</span>
          <div className="flex items-center gap-1">
            <button onClick={() => dispatch(setAuditPage(Math.max(1, currentPage - 1)))} disabled={currentPage === 1} className="p-1.5 rounded-lg border border-gray-200 dark:border-gray-700 disabled:opacity-40 hover:border-[#0098c8] text-gray-600 dark:text-gray-400"><ChevronLeft size={16} /></button>
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const p = Math.max(1, currentPage - 2) + i;
              if (p > totalPages) return null;
              return <button key={p} onClick={() => dispatch(setAuditPage(p))} className={`w-8 h-8 rounded-lg text-xs font-bold border transition-colors ${currentPage === p ? 'bg-[#0098c8] text-white border-[#0098c8]' : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-[#0098c8]'}`}>{p}</button>;
            })}
            <button onClick={() => dispatch(setAuditPage(Math.min(totalPages, currentPage + 1)))} disabled={currentPage === totalPages} className="p-1.5 rounded-lg border border-gray-200 dark:border-gray-700 disabled:opacity-40 hover:border-[#0098c8] text-gray-600 dark:text-gray-400"><ChevronRight size={16} /></button>
          </div>
        </div>
      </div>
    </div>
  );
};
