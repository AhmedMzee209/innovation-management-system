import { useState } from 'react';
import { MOCK_MENTORS } from '@/data/mockMentorship';
import { MOCK_USERS } from '@/data/mockUsers';
import { MentorCard } from '@/components/dashboard/mentorship/cards/MentorCard';
import { Search, Filter, Users } from 'lucide-react';
import { cn } from '@/lib/utils';

export const MentorDirectory = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState<string | null>(null);

  const mentors = Object.values(MOCK_MENTORS);
  const industries = Array.from(new Set(mentors.map(m => m.industry)));

  const filteredMentors = mentors.filter(mentor => {
    const user = MOCK_USERS[mentor.id];
    if (!user) return false;
    
    const matchesSearch = `${user.firstName} ${user.lastName}`.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          mentor.expertise.some(e => e.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesIndustry = selectedIndustry ? mentor.industry === selectedIndustry : true;

    return matchesSearch && matchesIndustry;
  });

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight flex items-center">
            <Users className="mr-3 text-[#0098c8]" size={28} />
            Mentor Directory
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Discover and connect with industry experts and academic advisors.</p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 p-4 border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search by mentor name or expertise..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-sm bg-gray-50 dark:bg-gray-800/50 focus:outline-none focus:ring-2 focus:ring-[#0098c8] dark:text-white transition-shadow"
          />
        </div>
        
        <div className="flex items-center space-x-3 overflow-x-auto pb-2 sm:pb-0 scrollbar-hide">
          <button 
            onClick={() => setSelectedIndustry(null)}
            className={cn(
              "px-4 py-2 border rounded-lg text-sm font-medium transition-colors whitespace-nowrap shadow-sm",
              selectedIndustry === null 
                ? "bg-[#0098c8] text-white border-[#0098c8]" 
                : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
            )}
          >
            All Industries
          </button>
          {industries.map(industry => (
            <button 
              key={industry}
              onClick={() => setSelectedIndustry(industry)}
              className={cn(
                "px-4 py-2 border rounded-lg text-sm font-medium transition-colors whitespace-nowrap shadow-sm",
                selectedIndustry === industry 
                  ? "bg-[#0098c8] text-white border-[#0098c8]" 
                  : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
              )}
            >
              {industry}
            </button>
          ))}
          <button className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors shadow-sm flex items-center shrink-0">
            <Filter size={16} className="mr-2 text-gray-400" /> More Filters
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredMentors.map(mentor => (
          <MentorCard key={mentor.id} mentor={mentor} />
        ))}
      </div>

      {filteredMentors.length === 0 && (
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-12 text-center flex flex-col items-center justify-center">
          <Users size={48} className="text-gray-300 dark:text-gray-700 mb-4" />
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">No mentors found</h3>
          <p className="text-sm text-gray-500 mt-2 max-w-sm">Try adjusting your search query or filters to find the right mentor.</p>
        </div>
      )}
    </div>
  );
};
