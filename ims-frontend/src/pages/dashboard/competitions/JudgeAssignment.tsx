import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MOCK_COMPETITIONS, MOCK_PITCH_SESSIONS, MOCK_JUDGES } from '@/data/mockCompetitions';
import { MOCK_USERS } from '@/data/mockUsers';
import { UserCheck, ArrowLeft, Calendar, Search } from 'lucide-react';
import { format, parseISO } from 'date-fns';

export const JudgeAssignment = () => {
  const { id } = useParams();
  const competition = MOCK_COMPETITIONS.find(c => c.id === id);
  const sessions = MOCK_PITCH_SESSIONS.filter(s => s.competitionId === id);
  const allJudges = MOCK_USERS.filter(u => u.role === 'ROLE_MENTOR' || u.role === 'ROLE_REVIEWER');

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSession, setSelectedSession] = useState(sessions[0]?.id || '');

  if (!competition) return <div className="p-8 text-center text-gray-500">Competition not found</div>;

  const currentSession = sessions.find(s => s.id === selectedSession);
  const assignedJudgeIds = currentSession?.judgeIds || [];
  
  // For dummy UI, we map judge IDs (which are 'judge_1') to Users. In a real app, judge table connects to user table.
  // We'll mock the assignment visually here.
  const assignedJudges = assignedJudgeIds.map(jid => {
    const judge = MOCK_JUDGES.find(j => j.id === jid);
    return MOCK_USERS.find(u => u.id === judge?.userId);
  }).filter(Boolean);

  const availableJudges = allJudges.filter(u => !assignedJudges.find(aj => aj?.id === u.id) && `${u.firstName} ${u.lastName}`.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      
      <div className="mb-8">
        <Link to={`/dashboard/competitions/${id}`} className="text-sm font-medium text-gray-500 hover:text-[#0098c8] flex items-center transition-colors mb-4">
          <ArrowLeft size={16} className="mr-1" /> Back to Competition
        </Link>
        <h1 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight flex items-center mb-2">
          <UserCheck className="mr-3 text-purple-600" size={28} />
          Judge Assignment
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">Assign faculty and external experts to specific pitch sessions for {competition.name}.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Col: Sessions & Available Judges */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm p-4">
            <h3 className="text-sm font-bold text-gray-900 dark:text-white flex items-center mb-4">
              <Calendar size={16} className="mr-2 text-purple-600" /> Select Pitch Session
            </h3>
            <div className="space-y-2">
              {sessions.map(session => (
                <button
                  key={session.id}
                  onClick={() => setSelectedSession(session.id)}
                  className={`w-full text-left p-3 rounded-xl border transition-colors ${
                    selectedSession === session.id 
                      ? 'bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800' 
                      : 'bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  <div className="font-bold text-gray-900 dark:text-white text-sm">{session.name}</div>
                  <div className="text-xs text-gray-500 mt-1">{format(parseISO(session.startTime), 'MMM d, HH:mm')}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm p-4 flex flex-col h-[500px]">
            <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-4">Available Judges</h3>
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input 
                type="text" 
                placeholder="Search staff..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-sm bg-gray-50 dark:bg-gray-800/50 outline-none"
              />
            </div>
            <div className="flex-1 overflow-y-auto space-y-2 scrollbar-hide">
              {availableJudges.map(judge => (
                <div key={judge.id} className="p-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-100 dark:border-gray-800 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {judge.avatarUrl ? (
                      <img src={judge.avatarUrl} alt={`${judge.firstName} ${judge.lastName}`} className="w-8 h-8 rounded-full" />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-xs">
                        {judge.firstName[0]}{judge.lastName[0]}
                      </div>
                    )}
                    <div>
                      <div className="text-sm font-bold text-gray-900 dark:text-white leading-tight">{judge.firstName} {judge.lastName}</div>
                      <div className="text-[10px] text-gray-500">{judge.department}</div>
                    </div>
                  </div>
                  <button className="text-xs font-bold text-[#0098c8] hover:underline px-2 py-1 bg-blue-50 dark:bg-blue-900/20 rounded">Add</button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Col: Assigned Panel */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm overflow-hidden flex flex-col min-h-[500px]">
            <div className="p-6 border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/30 flex justify-between items-center">
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Assigned Panel</h3>
                <p className="text-sm text-gray-500 mt-1">{currentSession?.name}</p>
              </div>
              <div className="px-3 py-1.5 bg-purple-100 text-purple-700 rounded-lg text-sm font-bold">
                {assignedJudges.length} Judges
              </div>
            </div>
            
            <div className="p-6 flex-1 bg-gray-50/30 dark:bg-gray-900/50">
              {assignedJudges.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-gray-400">
                  <UserCheck size={48} className="mb-4 opacity-50" />
                  <p className="text-lg font-bold text-gray-500">No judges assigned yet</p>
                  <p className="text-sm mt-1">Select judges from the available list to add them to this panel.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {assignedJudges.map(judge => (
                    <div key={judge?.id} className="bg-white dark:bg-gray-900 p-4 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm flex items-center justify-between group">
                      <div className="flex items-center gap-3">
                        {judge?.avatarUrl ? (
                          <img src={judge.avatarUrl} alt={`${judge.firstName} ${judge.lastName}`} className="w-12 h-12 rounded-full border border-gray-100 dark:border-gray-800" />
                        ) : (
                          <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-lg">
                            {judge?.firstName?.[0]}{judge?.lastName?.[0]}
                          </div>
                        )}
                        <div>
                          <div className="font-bold text-gray-900 dark:text-white">{judge?.firstName} {judge?.lastName}</div>
                          <div className="text-xs text-gray-500">{judge?.department}</div>
                        </div>
                      </div>
                      <button className="text-red-500 opacity-0 group-hover:opacity-100 transition-opacity text-xs font-bold hover:underline">Remove</button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
