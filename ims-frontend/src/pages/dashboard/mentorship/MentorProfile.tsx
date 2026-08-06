import { useParams, Link } from 'react-router-dom';
import { MOCK_MENTORS, MOCK_SESSIONS } from '@/data/mockMentorship';
import { MOCK_USERS } from '@/data/mockUsers';
import { ArrowLeft, Star, CheckCircle2, MapPin, Briefcase, Mail, Calendar, MessageSquare } from 'lucide-react';
import { UserAvatar } from '@/components/dashboard/users/UserAvatar';
import { SessionCard } from '@/components/dashboard/mentorship/cards/SessionCard';

export const MentorProfile = () => {
  const { id } = useParams();
  const mentor = MOCK_MENTORS[id || ''];
  const user = mentor ? MOCK_USERS[mentor.id] : null;

  if (!mentor || !user) return <div className="p-8 text-center text-gray-500">Mentor not found</div>;

  const mentorSessions = MOCK_SESSIONS.filter(s => s.mentorId === mentor.id);
  const upcomingSessions = mentorSessions.filter(s => s.status === 'Scheduled').slice(0, 3);
  const completedSessions = mentorSessions.filter(s => s.status === 'Completed').slice(0, 3);

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] overflow-y-auto bg-gray-50 dark:bg-[#0a0a0a]">
      {/* Banner */}
      <div className="relative h-48 sm:h-64 bg-gradient-to-br from-blue-900 to-[#0098c8] overflow-hidden shrink-0">
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay"></div>
        <div className="absolute top-4 left-4 lg:top-8 lg:left-8 z-10">
          <Link to="/dashboard/mentorship/mentors" className="flex items-center text-sm font-medium text-white/70 hover:text-white transition-colors bg-black/20 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-white/10">
            <ArrowLeft size={16} className="mr-1.5" /> Back to Directory
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full -mt-24 relative z-10 pb-12 flex-1">
        
        {/* Profile Card */}
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm p-6 sm:p-8 mb-6 flex flex-col md:flex-row gap-6 items-start md:items-center">
          <div className="shrink-0 -mt-16 md:mt-0">
            <UserAvatar firstName={user.firstName} lastName={user.lastName} size="xxl" className="border-4 border-white dark:border-gray-900 shadow-lg" />
          </div>
          
          <div className="flex-1">
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
              <div>
                <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">{user.firstName} {user.lastName}</h1>
                <p className="text-lg font-medium text-[#0098c8] flex items-center mt-1">
                  <Briefcase size={18} className="mr-2" /> {mentor.industry} Expert
                </p>
              </div>
              <div className="flex gap-3">
                <button className="px-5 py-2.5 bg-[#0098c8] text-white rounded-lg text-sm font-bold hover:bg-[#007aa3] transition-colors shadow-sm flex items-center">
                  <Calendar size={18} className="mr-2" /> Request Session
                </button>
                <button className="p-2.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors shadow-sm">
                  <MessageSquare size={18} />
                </button>
              </div>
            </div>

            <div className="flex flex-wrap gap-6 mt-6 pt-6 border-t border-gray-100 dark:border-gray-800 text-sm">
              <div className="flex items-center text-amber-500 font-bold">
                <Star size={16} className="fill-current mr-1.5" />
                {mentor.rating.toFixed(1)} Rating
              </div>
              <div className="flex items-center text-green-600 font-bold">
                <CheckCircle2 size={16} className="mr-1.5" />
                {mentor.totalSessions} Sessions
              </div>
              <div className="flex items-center text-gray-600 dark:text-gray-400 font-medium">
                <Briefcase size={16} className="mr-1.5 text-gray-400" />
                {mentor.experienceYears} Years Experience
              </div>
              <div className="flex items-center text-gray-600 dark:text-gray-400 font-medium">
                <Mail size={16} className="mr-1.5 text-gray-400" />
                {user.email}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm p-6 sm:p-8">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">About {user.firstName}</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">{mentor.biography}</p>
              
              <h4 className="font-bold text-gray-900 dark:text-white mb-3">Core Expertise</h4>
              <div className="flex flex-wrap gap-2">
                {mentor.expertise.map(exp => (
                  <span key={exp} className="px-3 py-1.5 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 rounded-lg text-sm font-bold border border-blue-100 dark:border-blue-900/50">
                    {exp}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm p-6 sm:p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Recent Activity</h3>
                <Link to="/dashboard/mentorship/sessions" className="text-sm font-bold text-[#0098c8] hover:underline">View All Sessions</Link>
              </div>
              
              <div className="space-y-4">
                <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider">Upcoming Sessions</h4>
                {upcomingSessions.length > 0 ? upcomingSessions.map(session => (
                  <SessionCard key={session.id} session={session} showMentor={false} />
                )) : <p className="text-sm text-gray-500 italic">No upcoming sessions.</p>}

                <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mt-6 pt-4 border-t border-gray-100 dark:border-gray-800">Completed Sessions</h4>
                {completedSessions.length > 0 ? completedSessions.map(session => (
                  <SessionCard key={session.id} session={session} showMentor={false} />
                )) : <p className="text-sm text-gray-500 italic">No completed sessions.</p>}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm p-6">
              <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-4 flex items-center">
                <Calendar size={16} className="mr-2 text-gray-400" /> Availability
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl border border-gray-100 dark:border-gray-800">
                {mentor.availability}
              </p>
              <button className="w-full mt-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm font-bold text-gray-700 dark:text-gray-300 hover:bg-gray-100 transition-colors">
                View Full Calendar
              </button>
            </div>

            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm p-6">
              <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-4 flex items-center">
                <MapPin size={16} className="mr-2 text-gray-400" /> Affiliation
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">School</span>
                  <span className="font-bold text-gray-900 dark:text-white">School of Computing</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">Department</span>
                  <span className="font-bold text-gray-900 dark:text-white">Computer Science</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">Role</span>
                  <span className="font-bold text-gray-900 dark:text-white">Academic Staff</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
