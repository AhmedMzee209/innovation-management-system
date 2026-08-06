import { MentorProfile } from '@/data/mockMentorship';
import { MOCK_USERS } from '@/data/mockUsers';
import { UserAvatar } from '@/components/dashboard/users/UserAvatar';
import { Briefcase, Star, Clock, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export const MentorCard = ({ mentor }: { mentor: MentorProfile }) => {
  const user = MOCK_USERS[mentor.id];
  
  if (!user) return null;

  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm hover:shadow-md transition-all flex flex-col group h-full">
      <div className="p-5 flex-1 flex flex-col items-center text-center">
        <UserAvatar firstName={user.firstName} lastName={user.lastName} size="xl" className="mb-4 shadow-sm" />
        
        <h3 className="text-lg font-bold text-gray-900 dark:text-white leading-tight mb-1">
          {user.firstName} {user.lastName}
        </h3>
        <p className="text-sm font-medium text-[#0098c8] mb-3">{mentor.industry} Expert</p>
        
        <div className="flex flex-wrap gap-1 justify-center mb-4">
          {mentor.expertise.slice(0, 3).map(exp => (
            <span key={exp} className="text-[10px] font-bold uppercase bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 px-2 py-1 rounded">
              {exp}
            </span>
          ))}
          {mentor.expertise.length > 3 && (
            <span className="text-[10px] font-bold uppercase bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 px-2 py-1 rounded">
              +{mentor.expertise.length - 3}
            </span>
          )}
        </div>

        <div className="w-full grid grid-cols-2 gap-2 mt-auto pt-4 border-t border-gray-100 dark:border-gray-800">
          <div className="flex flex-col items-center p-2 bg-amber-50 dark:bg-amber-900/10 rounded-lg">
            <div className="flex items-center text-amber-500 mb-1">
              <Star size={14} className="fill-current mr-1" />
              <span className="text-sm font-black">{mentor.rating.toFixed(1)}</span>
            </div>
            <span className="text-[10px] font-bold uppercase text-amber-700/70 dark:text-amber-500/70">Rating</span>
          </div>
          <div className="flex flex-col items-center p-2 bg-green-50 dark:bg-green-900/10 rounded-lg">
            <div className="flex items-center text-green-600 mb-1">
              <CheckCircle2 size={14} className="mr-1" />
              <span className="text-sm font-black">{mentor.totalSessions}</span>
            </div>
            <span className="text-[10px] font-bold uppercase text-green-700/70 dark:text-green-500/70">Sessions</span>
          </div>
        </div>
      </div>

      <div className="px-5 py-3 border-t border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/20 flex justify-between items-center">
        <div className="flex items-center text-xs text-gray-500" title={mentor.availability}>
          <Clock size={14} className="mr-1" />
          <span className="truncate max-w-[120px]">{mentor.availability}</span>
        </div>
        <Link 
          to={`/dashboard/mentors/${mentor.id}`}
          className="text-sm font-bold text-[#0098c8] flex items-center group-hover:underline"
        >
          Profile
          <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
};
