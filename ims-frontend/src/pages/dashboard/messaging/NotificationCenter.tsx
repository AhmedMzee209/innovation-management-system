import { useState, useMemo } from 'react';
import { MOCK_NOTIFICATIONS } from '@/data/mockMessaging';
import { Search, Filter, Bell, Check, Trash2, ArrowUpDown } from 'lucide-react';
import { format } from 'date-fns';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { setSearchQuery, setFilterStatus } from '@/store/slices/notificationSlice';

export const NotificationCenter = () => {
  const dispatch = useDispatch();
  const { searchQuery, filterStatus } = useSelector((state: RootState) => state.notification);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const filteredNotifications = useMemo(() => {
    return MOCK_NOTIFICATIONS.filter(n => {
      const matchesSearch = n.title.toLowerCase().includes(searchQuery.toLowerCase()) || n.message.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = filterStatus === 'All' ? true : !n.isRead;
      return matchesSearch && matchesStatus;
    });
  }, [searchQuery, filterStatus]);

  const toggleSelect = (id: string) => {
    const newSet = new Set(selectedIds);
    if (newSet.has(id)) newSet.delete(id);
    else newSet.add(id);
    setSelectedIds(newSet);
  };

  const toggleSelectAll = () => {
    if (selectedIds.size === filteredNotifications.length) setSelectedIds(new Set());
    else setSelectedIds(new Set(filteredNotifications.map(n => n.id)));
  };

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-2">
        <div>
          <h1 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight flex items-center">
            <Bell className="mr-3 text-[#0098c8]" size={28} />
            Notification Center
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Manage and review all system alerts and updates.</p>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row justify-between gap-4 bg-white dark:bg-gray-900 p-4 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm">
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search notifications..." 
              value={searchQuery}
              onChange={(e) => dispatch(setSearchQuery(e.target.value))}
              className="pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-800 border-none rounded-xl text-sm font-medium w-full sm:w-64 focus:ring-2 focus:ring-[#0098c8] outline-none transition-all dark:text-white"
            />
          </div>
          <select 
            value={filterStatus}
            onChange={(e) => dispatch(setFilterStatus(e.target.value as any))}
            className="px-4 py-2 bg-gray-50 dark:bg-gray-800 border-none rounded-xl text-sm font-bold text-gray-700 dark:text-gray-300 focus:ring-2 focus:ring-[#0098c8] outline-none cursor-pointer"
          >
            <option value="All">All Notifications</option>
            <option value="Unread">Unread Only</option>
          </select>
        </div>
        
        {selectedIds.size > 0 && (
          <div className="flex items-center gap-2 animate-in fade-in zoom-in duration-200">
            <span className="text-sm font-bold text-[#0098c8] mr-2">{selectedIds.size} selected</span>
            <button className="px-3 py-1.5 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-xs font-bold transition-colors flex items-center">
              <Check size={14} className="mr-1" /> Mark Read
            </button>
            <button className="px-3 py-1.5 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/40 rounded-lg text-xs font-bold transition-colors flex items-center">
              <Trash2 size={14} className="mr-1" /> Delete
            </button>
          </div>
        )}
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-800">
                <th className="p-4 w-12">
                  <input 
                    type="checkbox" 
                    className="w-4 h-4 rounded border-gray-300 text-[#0098c8] focus:ring-[#0098c8]"
                    checked={filteredNotifications.length > 0 && selectedIds.size === filteredNotifications.length}
                    onChange={toggleSelectAll}
                  />
                </th>
                <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center cursor-pointer hover:text-gray-700 dark:hover:text-gray-300">
                    Title & Message <ArrowUpDown size={12} className="ml-1" />
                  </div>
                </th>
                <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider hidden md:table-cell">Category</th>
                <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider hidden lg:table-cell">Priority</th>
                <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {filteredNotifications.map(n => (
                <tr key={n.id} className={`hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors ${!n.isRead ? 'bg-blue-50/30 dark:bg-blue-900/10' : ''}`}>
                  <td className="p-4">
                    <input 
                      type="checkbox" 
                      className="w-4 h-4 rounded border-gray-300 text-[#0098c8] focus:ring-[#0098c8]"
                      checked={selectedIds.has(n.id)}
                      onChange={() => toggleSelect(n.id)}
                    />
                  </td>
                  <td className="p-4">
                    <div className="flex items-start gap-3">
                      {!n.isRead && <div className="w-2 h-2 rounded-full bg-[#0098c8] mt-2 shrink-0"></div>}
                      <div>
                        <h4 className={`text-sm ${!n.isRead ? 'font-bold text-gray-900 dark:text-white' : 'font-semibold text-gray-700 dark:text-gray-200'}`}>{n.title}</h4>
                        <p className="text-xs text-gray-500 line-clamp-1 mt-0.5 max-w-md">{n.message}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 hidden md:table-cell">
                    <span className="px-2.5 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded text-xs font-bold whitespace-nowrap">
                      {n.category}
                    </span>
                  </td>
                  <td className="p-4 hidden lg:table-cell">
                    <span className={`px-2.5 py-1 rounded text-xs font-bold uppercase tracking-wider ${
                      n.priority === 'Critical' ? 'bg-red-100 text-red-700' :
                      n.priority === 'High' ? 'bg-amber-100 text-amber-700' :
                      n.priority === 'Medium' ? 'bg-blue-100 text-blue-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {n.priority}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <span className="text-xs font-medium text-gray-500 whitespace-nowrap">
                      {format(new Date(n.createdAt), 'MMM d, yyyy')}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {filteredNotifications.length === 0 && (
            <div className="p-12 text-center text-gray-500">
              No notifications found matching your criteria.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
