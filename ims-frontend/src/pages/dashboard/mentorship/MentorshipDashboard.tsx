import { Users, CalendarClock, Briefcase, TrendingUp, ArrowRight, Activity, Plus } from 'lucide-react';
import { StatCard } from '@/components/dashboard/widgets/StatCard';
import { MOCK_MENTORS, MOCK_SESSIONS, MOCK_ACTION_PLANS } from '@/data/mockMentorship';
import { SessionCard } from '@/components/dashboard/mentorship/cards/SessionCard';
import { ActionPlanCard } from '@/components/dashboard/mentorship/cards/ActionPlanCard';
import { Link } from 'react-router-dom';

export const MentorshipDashboard = () => {
  const totalMentors = Object.keys(MOCK_MENTORS).length;
  const upcomingSessions = MOCK_SESSIONS.filter(s => s.status === 'Scheduled');
  const completedSessions = MOCK_SESSIONS.filter(s => s.status === 'Completed').length;
  const pendingActions = MOCK_ACTION_PLANS.filter(a => a.status === 'Pending' || a.status === 'In Progress');

  // Sort upcoming sessions by date/time
  const sortedUpcoming = upcomingSessions.sort((a, b) => new Date(`${a.date}T${a.time}`).getTime() - new Date(`${b.date}T${b.time}`).getTime()).slice(0, 3);
  const recentActions = pendingActions.slice(0, 4);

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight flex items-center">
            <Briefcase className="mr-3 text-[#0098c8]" size={28} />
            Mentorship Hub
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Manage mentor networks, schedule sessions, and track startup progress.</p>
        </div>
        <button className="px-5 py-2.5 bg-[#0098c8] text-white rounded-lg text-sm font-bold hover:bg-[#007aa3] transition-colors shadow-sm flex items-center">
          <CalendarClock size={18} className="mr-2" /> Schedule Session
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard id="m1" label="Active Mentors" value={totalMentors.toString()} trend={{ value: 4, isPositive: true }} icon={Users} />
        <StatCard id="m2" label="Upcoming Sessions" value={upcomingSessions.length.toString()} trend={{ value: 12, isPositive: true }} icon={CalendarClock} />
        <StatCard id="m3" label="Pending Action Items" value={pendingActions.length.toString()} trend={{ value: 5, isPositive: false }} icon={Activity} />
        <StatCard id="m4" label="Total Hours Mentored" value={(completedSessions * 1.5).toString()} trend={{ value: 18, isPositive: true }} icon={TrendingUp} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column - Upcoming Sessions */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center">
              <CalendarClock size={18} className="mr-2 text-blue-500" /> Upcoming Sessions
            </h2>
            <Link to="/dashboard/mentorship/sessions" className="text-sm text-[#0098c8] font-bold hover:underline flex items-center">
              View Calendar <ArrowRight size={14} className="ml-1" />
            </Link>
          </div>
          
          {sortedUpcoming.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {sortedUpcoming.map(session => (
                <SessionCard key={session.id} session={session} showMentor={false} />
              ))}
            </div>
          ) : (
            <div className="bg-gray-50 dark:bg-gray-800/50 border border-dashed border-gray-300 dark:border-gray-700 rounded-xl p-8 text-center flex flex-col items-center justify-center">
              <CalendarClock size={32} className="text-gray-400 mb-3" />
              <h3 className="text-sm font-bold text-gray-900 dark:text-white">No Upcoming Sessions</h3>
              <p className="text-xs text-gray-500 mt-1 max-w-sm mx-auto mb-4">You have no scheduled sessions in the near future.</p>
              <button className="text-[#0098c8] text-sm font-bold hover:underline">Schedule one now</button>
            </div>
          )}
        </div>

        {/* Right Column - Action Items */}
        <div className="lg:col-span-1 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center">
              <Activity size={18} className="mr-2 text-amber-500" /> Action Items
            </h2>
            <Link to="/dashboard/mentorship/action-plans" className="text-sm text-[#0098c8] font-bold hover:underline">View All</Link>
          </div>

          <div className="space-y-4">
            {recentActions.map(task => (
              <ActionPlanCard key={task.id} task={task} />
            ))}
          </div>

          <button className="w-full py-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 border-dashed rounded-xl text-sm font-bold text-gray-600 dark:text-gray-400 hover:text-[#0098c8] hover:border-[#0098c8] transition-colors flex items-center justify-center">
            <Plus size={16} className="mr-2" /> Add Action Item
          </button>
        </div>
      </div>
    </div>
  );
};
