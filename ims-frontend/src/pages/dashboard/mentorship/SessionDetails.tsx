import { useParams, Link } from 'react-router-dom';
import { MOCK_SESSIONS, MOCK_ACTION_PLANS } from '@/data/mockMentorship';
import { MOCK_USERS } from '@/data/mockUsers';
import { MOCK_STARTUPS } from '@/data/mockStartups';
import { ArrowLeft, Calendar, Clock, MapPin, Video, FileText, CheckCircle2, MessageSquare, AlertCircle } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { UserAvatar } from '@/components/dashboard/users/UserAvatar';
import { SessionStatusBadge } from '@/components/dashboard/mentorship/cards/SessionStatusBadge';
import { ActionPlanCard } from '@/components/dashboard/mentorship/cards/ActionPlanCard';

export const SessionDetails = () => {
  const { id } = useParams();
  const session = MOCK_SESSIONS.find(s => s.id === id);

  if (!session) return <div className="p-8 text-center text-gray-500">Session not found</div>;

  const mentor = MOCK_USERS[session.mentorId];
  const startup = MOCK_STARTUPS.find(s => s.id === session.startupId);
  const actionPlans = MOCK_ACTION_PLANS.filter(a => a.sessionId === session.id);

  if (!mentor || !startup) return <div className="p-8 text-center text-gray-500">Error loading session details</div>;

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-5xl mx-auto space-y-6">
      
      <div className="flex items-center text-sm font-medium text-gray-500 mb-6">
        <Link to="/dashboard/mentorship/sessions" className="hover:text-[#0098c8] flex items-center transition-colors">
          <ArrowLeft size={16} className="mr-1" /> Back to Sessions
        </Link>
      </div>

      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm overflow-hidden">
        
        {/* Header */}
        <div className="p-6 sm:p-8 border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/30">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
            <h1 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white tracking-tight">
              {session.agenda}
            </h1>
            <SessionStatusBadge status={session.status} className="text-sm px-3 py-1" />
          </div>

          <div className="flex flex-wrap gap-4 text-sm font-medium text-gray-600 dark:text-gray-400">
            <div className="flex items-center">
              <Calendar size={16} className="mr-2 text-[#0098c8]" />
              {format(parseISO(session.date), 'EEEE, MMMM d, yyyy')}
            </div>
            <div className="flex items-center">
              <Clock size={16} className="mr-2 text-amber-500" />
              {session.time} ({session.durationMinutes} min)
            </div>
            <div className="flex items-center bg-white dark:bg-gray-800 px-3 py-1 rounded-full border border-gray-200 dark:border-gray-700 shadow-sm">
              {session.meetingType === 'Virtual' ? (
                <><Video size={14} className="mr-2 text-[#0098c8]" /> Virtual Meeting</>
              ) : (
                <><MapPin size={14} className="mr-2 text-purple-500" /> {session.location}</>
              )}
            </div>
          </div>
        </div>

        {/* Participants */}
        <div className="p-6 sm:p-8 border-b border-gray-100 dark:border-gray-800 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">Mentor</h3>
            <div className="flex items-center gap-4 bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl border border-gray-100 dark:border-gray-800">
              <UserAvatar firstName={mentor.firstName} lastName={mentor.lastName} size="lg" />
              <div>
                <Link to={`/dashboard/mentors/${mentor.id}`} className="font-bold text-gray-900 dark:text-white hover:text-[#0098c8] hover:underline">
                  {mentor.firstName} {mentor.lastName}
                </Link>
                <p className="text-sm text-gray-500">{mentor.email}</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">Startup</h3>
            <div className="flex items-center gap-4 bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl border border-gray-100 dark:border-gray-800">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#0098c8] to-purple-600 flex items-center justify-center text-white font-black text-xl shrink-0">
                {startup.name.charAt(0)}
              </div>
              <div>
                <Link to={`/dashboard/startups/${startup.id}`} className="font-bold text-gray-900 dark:text-white hover:text-[#0098c8] hover:underline">
                  {startup.name}
                </Link>
                <p className="text-sm text-gray-500">{startup.industry}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Details & Notes */}
        <div className="p-6 sm:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center mb-4">
                  <FileText size={18} className="mr-2 text-gray-400" /> Agenda & Context
                </h3>
                <div className="bg-blue-50/50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30 rounded-xl p-5 text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                  <p>The primary focus of this session is to discuss: <span className="font-bold">{session.agenda}</span>.</p>
                  <p className="mt-2">Please ensure you have reviewed the necessary documentation and prepared any relevant questions before joining the session.</p>
                </div>
              </div>

              {session.notes && (
                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center mb-4">
                    <MessageSquare size={18} className="mr-2 text-gray-400" /> Session Notes
                  </h3>
                  <div className="bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl p-5 text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                    {session.notes}
                  </div>
                </div>
              )}

              {session.feedback && (
                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center mb-4">
                    <CheckCircle2 size={18} className="mr-2 text-green-500" /> Mentor Feedback
                  </h3>
                  <div className="bg-green-50/50 dark:bg-green-900/10 border border-green-200 dark:border-green-900/30 rounded-xl p-5 text-sm">
                    <div className="flex items-center mb-3">
                      <span className="font-bold text-green-800 dark:text-green-400 mr-2">Rating:</span>
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map(star => (
                          <svg key={star} className={`w-4 h-4 ${star <= session.feedback!.rating ? 'text-green-500' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                    <p className="text-green-900 dark:text-green-300 italic">"{session.feedback.comment}"</p>
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center mb-4">
                  <AlertCircle size={18} className="mr-2 text-gray-400" /> Assigned Action Plans
                </h3>
                
                {actionPlans.length > 0 ? (
                  <div className="space-y-3">
                    {actionPlans.map(task => (
                      <ActionPlanCard key={task.id} task={task} />
                    ))}
                  </div>
                ) : (
                  <div className="bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl p-6 text-center text-sm text-gray-500">
                    No action plans were assigned during this session.
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
