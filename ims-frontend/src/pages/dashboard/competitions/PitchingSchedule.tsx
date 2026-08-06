import { useState } from 'react';
import { MOCK_PITCH_SESSIONS, MOCK_COMPETITIONS, MOCK_JUDGES, MOCK_PARTICIPANTS } from '@/data/mockCompetitions';
import { MOCK_USERS } from '@/data/mockUsers';
import { MOCK_STARTUPS } from '@/data/mockStartups';
import { Calendar, MapPin, Users, Clock, ArrowRight, UserCheck } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

export const PitchingSchedule = () => {
  const [selectedCompId, setSelectedCompId] = useState<string>('All');
  
  const filteredSessions = selectedCompId === 'All' 
    ? MOCK_PITCH_SESSIONS 
    : MOCK_PITCH_SESSIONS.filter(s => s.competitionId === selectedCompId);

  // Sort by start time
  const sortedSessions = [...filteredSessions].sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime());

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0 mb-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight flex items-center">
            <Calendar className="mr-3 text-purple-600" size={28} />
            Pitching Schedule
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Manage time slots, venues, and judge panels for live pitch sessions.</p>
        </div>
        
        <div>
          <select 
            value={selectedCompId}
            onChange={(e) => setSelectedCompId(e.target.value)}
            className="px-4 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl text-sm font-bold shadow-sm focus:ring-2 focus:ring-purple-500 outline-none"
          >
            <option value="All">All Competitions</option>
            {MOCK_COMPETITIONS.map(c => (
              <option key={c.id} value={c.id}>{c.code}: {c.name}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-6">
        {sortedSessions.slice(0, 10).map((session, index) => {
          const comp = MOCK_COMPETITIONS.find(c => c.id === session.competitionId);
          const judges = session.judgeIds.map(jid => {
            const judge = MOCK_JUDGES.find(j => j.id === jid);
            return MOCK_USERS.find(u => u.id === judge?.userId);
          }).filter(Boolean);
          
          const participantStartups = session.participantIds.map(pid => {
            const p = MOCK_PARTICIPANTS.find(part => part.id === pid);
            return MOCK_STARTUPS.find(s => s.id === p?.startupId);
          }).filter(Boolean);

          return (
            <div key={session.id} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm overflow-hidden flex flex-col md:flex-row">
              
              {/* Timeline Left Sidebar */}
              <div className="bg-gray-50 dark:bg-gray-800/50 p-6 md:w-64 border-r border-gray-100 dark:border-gray-800 flex flex-col items-center md:items-start text-center md:text-left justify-center md:justify-start">
                <p className="text-sm font-bold text-gray-500 uppercase tracking-widest">{format(parseISO(session.startTime), 'EEEE')}</p>
                <p className="text-3xl font-black text-gray-900 dark:text-white mt-1 mb-2">{format(parseISO(session.startTime), 'MMM d')}</p>
                
                <div className="flex items-center text-[#0098c8] font-bold text-lg mb-4">
                  <Clock size={18} className="mr-2" />
                  {format(parseISO(session.startTime), 'HH:mm')} - {format(parseISO(session.endTime), 'HH:mm')}
                </div>
                
                <div className={cn("px-3 py-1 rounded-full text-xs font-bold w-fit mx-auto md:mx-0", 
                  session.status === 'Ongoing' ? 'bg-emerald-100 text-emerald-700 animate-pulse' :
                  session.status === 'Completed' ? 'bg-gray-200 text-gray-600' : 'bg-purple-100 text-purple-700'
                )}>
                  {session.status}
                </div>
              </div>

              {/* Main Content */}
              <div className="p-6 md:p-8 flex-1">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{session.name}</h3>
                    <p className="text-sm font-bold text-gray-500">{comp?.name}</p>
                  </div>
                  <div className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700">
                    <MapPin size={16} className="mr-2 text-gray-400" /> {session.venue}
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6 pt-6 border-t border-gray-100 dark:border-gray-800">
                  
                  {/* Participants */}
                  <div>
                    <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 flex items-center">
                      <Users size={14} className="mr-2" /> Pitching Teams ({participantStartups.length})
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {participantStartups.map(startup => (
                        <Link key={startup?.id} to={`/dashboard/startups/${startup?.id}`} className="px-3 py-1.5 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 rounded-lg text-sm font-bold text-gray-700 dark:text-gray-300 transition-colors">
                          {startup?.name}
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* Judges */}
                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center">
                        <UserCheck size={14} className="mr-2" /> Judging Panel ({judges.length})
                      </h4>
                      <Link to={`/dashboard/competitions/${session.competitionId}/assign-judges`} className="text-xs font-bold text-[#0098c8] hover:underline">
                        Manage Panel
                      </Link>
                    </div>
                    <div className="flex -space-x-3 overflow-hidden">
                      {judges.map(judge => (
                        <div key={judge?.id} className="relative group">
                          {judge?.avatarUrl ? (
                            <img 
                              src={judge.avatarUrl} 
                              alt={`${judge.firstName} ${judge.lastName}`} 
                              title={`${judge.firstName} ${judge.lastName}`}
                              className="inline-block h-10 w-10 rounded-full ring-2 ring-white dark:ring-gray-900 object-cover" 
                            />
                          ) : (
                            <div 
                              title={`${judge?.firstName} ${judge?.lastName}`}
                              className="inline-flex h-10 w-10 items-center justify-center rounded-full ring-2 ring-white dark:ring-gray-900 bg-blue-100 text-blue-600 font-bold text-xs"
                            >
                              {judge?.firstName?.[0]}{judge?.lastName?.[0]}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              </div>
              
              {/* Actions */}
              <div className="bg-gray-50 dark:bg-gray-800/50 p-6 border-t md:border-t-0 md:border-l border-gray-100 dark:border-gray-800 flex flex-col justify-center gap-3">
                {session.participantIds.length > 0 ? (
                  <Link to={`/dashboard/competitions/evaluate/${session.id}/${session.participantIds[0]}`} className="w-full px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-bold hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors shadow-sm flex items-center justify-center">
                    Score Pitch
                  </Link>
                ) : (
                  <button disabled className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-400 dark:text-gray-500 rounded-lg text-sm font-bold cursor-not-allowed flex items-center justify-center">
                    No Teams
                  </button>
                )}
                <button className="w-full px-4 py-2 bg-[#0098c8] text-white rounded-lg text-sm font-bold hover:bg-blue-600 transition-colors shadow-sm flex items-center justify-center">
                  Live View <ArrowRight size={16} className="ml-1" />
                </button>
              </div>

            </div>
          );
        })}
      </div>
    </div>
  );
};
