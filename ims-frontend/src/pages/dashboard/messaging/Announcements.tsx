import { MOCK_ANNOUNCEMENTS } from '@/data/mockMessaging';
import { Megaphone, Search, Filter, Calendar, Users, Eye } from 'lucide-react';
import { format, isPast, parseISO } from 'date-fns';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { setSearchQuery, setFilterCategory } from '@/store/slices/announcementSlice';

export const Announcements = () => {
  const dispatch = useDispatch();
  const { searchQuery, filterCategory } = useSelector((state: RootState) => state.announcement);

  const filteredAnnouncements = MOCK_ANNOUNCEMENTS.filter(a => {
    const matchesSearch = a.title.toLowerCase().includes(searchQuery.toLowerCase()) || a.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === 'All' ? true : a.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight flex items-center">
            <Megaphone className="mr-3 text-amber-500" size={28} />
            Announcements
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Official broadcasts and updates from the university and hubs.</p>
        </div>
        <Link to="/dashboard/announcements/new" className="px-5 py-2.5 bg-[#0098c8] text-white rounded-xl text-sm font-bold shadow-sm hover:bg-[#007ba1] transition-colors flex items-center">
          <Megaphone size={16} className="mr-2" /> New Announcement
        </Link>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search announcements..." 
            value={searchQuery}
            onChange={(e) => dispatch(setSearchQuery(e.target.value))}
            className="w-full pl-10 pr-4 py-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl text-sm font-medium focus:ring-2 focus:ring-[#0098c8] outline-none transition-all shadow-sm dark:text-white"
          />
        </div>
        <select 
          value={filterCategory}
          onChange={(e) => dispatch(setFilterCategory(e.target.value as any))}
          className="px-4 py-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl text-sm font-bold text-gray-700 dark:text-gray-300 focus:ring-2 focus:ring-[#0098c8] outline-none cursor-pointer shadow-sm w-full sm:w-auto"
        >
          <option value="All">All Categories</option>
          <option value="General">General</option>
          <option value="Event">Events</option>
          <option value="Funding Opportunity">Funding</option>
          <option value="System Update">System Updates</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAnnouncements.map(announcement => {
          const expired = isPast(parseISO(announcement.expiresAt));
          
          return (
            <div key={announcement.id} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow group flex flex-col relative overflow-hidden">
              
              {announcement.priority === 'High' && !expired && (
                <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
                  <div className="absolute top-0 right-0 transform translate-x-4 -translate-y-4 rotate-45 w-24 h-8 bg-amber-500 flex items-end justify-center pb-1">
                    <span className="text-[9px] font-black text-white uppercase tracking-wider">Priority</span>
                  </div>
                </div>
              )}

              <div className="mb-4 pr-8">
                <span className={`inline-block px-2.5 py-1 rounded text-xs font-bold uppercase tracking-wider mb-3 ${
                  announcement.category === 'Event' ? 'bg-purple-100 text-purple-700' :
                  announcement.category === 'Funding Opportunity' ? 'bg-emerald-100 text-emerald-700' :
                  announcement.category === 'System Update' ? 'bg-blue-100 text-blue-700' :
                  'bg-gray-100 text-gray-700'
                }`}>
                  {announcement.category}
                </span>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white leading-tight mb-2 group-hover:text-[#0098c8] transition-colors line-clamp-2">
                  {announcement.title}
                </h3>
                <p className="text-sm text-gray-500 line-clamp-3 leading-relaxed">
                  {announcement.content}
                </p>
              </div>
              
              <div className="mt-auto pt-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between text-xs font-medium text-gray-500">
                <div className="flex items-center">
                  <Calendar size={14} className="mr-1.5 text-gray-400" />
                  {format(new Date(announcement.createdAt), 'MMM d, yyyy')}
                </div>
                <div className="flex items-center">
                  <Users size={14} className="mr-1.5 text-gray-400" />
                  {announcement.audience}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      {filteredAnnouncements.length === 0 && (
        <div className="py-20 text-center">
          <div className="w-16 h-16 bg-gray-50 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <Megaphone size={24} className="text-gray-400" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">No Announcements Found</h3>
          <p className="text-sm text-gray-500">Try adjusting your search or filters.</p>
        </div>
      )}
    </div>
  );
};
