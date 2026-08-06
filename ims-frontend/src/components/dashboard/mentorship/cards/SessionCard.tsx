import { MentoringSession } from '@/data/mockMentorship';
import { MOCK_STARTUPS } from '@/data/mockStartups';
import { MOCK_USERS } from '@/data/mockUsers';
import { SessionStatusBadge } from './SessionStatusBadge';
import { Calendar, Clock, MapPin, Video, UserCircle, Building2, ArrowRight } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { Link } from 'react-router-dom';

export const SessionCard = ({ session, showMentor = true }: { session: MentoringSession, showMentor?: boolean }) => {
  const startup = MOCK_STARTUPS.find(s => s.id === session.startupId);
  const mentor = MOCK_USERS[session.mentorId];

  if (!startup || !mentor) return null;

  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
      {/* Side Color Bar */}
      <div className={`absolute left-0 top-0 bottom-0 w-1 ${
        session.status === 'Completed' ? 'bg-green-500' :
        session.status === 'Scheduled' ? 'bg-blue-500' :
        session.status === 'Cancelled' ? 'bg-red-500' : 'bg-amber-500'
      }`}></div>

      <div className="flex justify-between items-start mb-3">
        <SessionStatusBadge status={session.status} />
        <span className="text-xs font-bold text-gray-500 flex items-center bg-gray-50 dark:bg-gray-800 px-2 py-1 rounded">
          {session.meetingType === 'Virtual' ? <Video size={12} className="mr-1 text-[#0098c8]" /> : <MapPin size={12} className="mr-1 text-purple-500" />}
          {session.meetingType}
        </span>
      </div>

      <h3 className="font-bold text-gray-900 dark:text-white mb-2 line-clamp-1">{session.agenda}</h3>
      
      <div className="flex flex-col gap-2 mb-4">
        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
          <Calendar size={14} className="mr-2 text-gray-400" />
          {format(parseISO(session.date), 'EEEE, MMM d, yyyy')}
        </div>
        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
          <Clock size={14} className="mr-2 text-gray-400" />
          {session.time} ({session.durationMinutes} min)
        </div>
      </div>

      <div className="flex items-center gap-3 pt-4 border-t border-gray-100 dark:border-gray-800">
        {showMentor ? (
          <>
            <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0">
              <UserCircle size={16} />
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-xs text-gray-500">Mentor</p>
              <p className="text-sm font-bold text-gray-900 dark:text-white truncate">{mentor.firstName} {mentor.lastName}</p>
            </div>
          </>
        ) : (
          <>
            <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400 shrink-0">
              <Building2 size={16} />
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-xs text-gray-500">Startup</p>
              <p className="text-sm font-bold text-gray-900 dark:text-white truncate">{startup.name}</p>
            </div>
          </>
        )}
        
        <Link 
          to={`/dashboard/mentorship/sessions/${session.id}`}
          className="w-8 h-8 rounded-full bg-gray-50 dark:bg-gray-800 flex items-center justify-center text-gray-500 hover:bg-[#0098c8] hover:text-white transition-colors"
        >
          <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
};
