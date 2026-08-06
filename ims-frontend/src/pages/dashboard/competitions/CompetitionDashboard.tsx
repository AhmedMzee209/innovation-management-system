import { Trophy, Users, Calendar, Activity, ChevronRight, Award, Plus, MapPin, Clock } from 'lucide-react';
import { MOCK_COMPETITIONS, MOCK_PARTICIPANTS, MOCK_PITCH_SESSIONS } from '@/data/mockCompetitions';
import { Link } from 'react-router-dom';
import { CompetitionCard } from '@/components/dashboard/competitions/cards/CompetitionCard';
import { format, parseISO } from 'date-fns';

export const CompetitionDashboard = () => {
  const activeCompetitions = MOCK_COMPETITIONS.filter(c => c.status === 'Live' || c.status === 'Registration Open');
  const upcomingSessions = MOCK_PITCH_SESSIONS.filter(s => s.status === 'Scheduled').sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime()).slice(0, 4);
  
  const totalCompetitions = MOCK_COMPETITIONS.length;
  const totalParticipants = MOCK_PARTICIPANTS.length;
  const totalPrizePool = MOCK_COMPETITIONS.reduce((acc, curr) => acc + curr.prizePool, 0);

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0 mb-8">
        <div>
          <h1 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight flex items-center">
            <Trophy className="mr-3 text-[#0098c8]" size={28} />
            Competition Management
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Host hackathons, manage pitch sessions, and discover top campus talent.</p>
        </div>
        <Link to="/dashboard/competitions/new" className="px-5 py-2.5 bg-gradient-to-r from-[#0098c8] to-blue-600 text-white rounded-xl text-sm font-bold hover:opacity-90 transition-opacity shadow-sm flex items-center">
          <Plus size={18} className="mr-2" /> Host Competition
        </Link>
      </div>

      {/* Topline Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-5 shadow-sm flex items-center">
          <div className="w-12 h-12 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-[#0098c8] mr-4 shrink-0">
            <Trophy size={24} />
          </div>
          <div>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Total Events</p>
            <h2 className="text-2xl font-black text-gray-900 dark:text-white">{totalCompetitions}</h2>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-5 shadow-sm flex items-center">
          <div className="w-12 h-12 rounded-full bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center text-emerald-600 mr-4 shrink-0">
            <Users size={24} />
          </div>
          <div>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Participants</p>
            <h2 className="text-2xl font-black text-gray-900 dark:text-white">{totalParticipants}</h2>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-5 shadow-sm flex items-center">
          <div className="w-12 h-12 rounded-full bg-amber-50 dark:bg-amber-900/20 flex items-center justify-center text-amber-500 mr-4 shrink-0">
            <Award size={24} />
          </div>
          <div>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Total Prize Pool</p>
            <h2 className="text-2xl font-black text-gray-900 dark:text-white">${(totalPrizePool / 1000).toFixed(0)}k</h2>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-5 shadow-sm flex items-center">
          <div className="w-12 h-12 rounded-full bg-purple-50 dark:bg-purple-900/20 flex items-center justify-center text-purple-600 mr-4 shrink-0">
            <Activity size={24} />
          </div>
          <div>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Active Now</p>
            <h2 className="text-2xl font-black text-gray-900 dark:text-white">{activeCompetitions.length}</h2>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        
        {/* Left Column - Active Competitions */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center">
              <Activity size={18} className="mr-2 text-emerald-500" /> Happening Now
            </h2>
            <Link to="/dashboard/competitions/list" className="text-sm text-[#0098c8] font-bold hover:underline flex items-center">
              View All <ChevronRight size={14} className="ml-1" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {activeCompetitions.slice(0, 4).map(comp => (
              <CompetitionCard key={comp.id} competition={comp} />
            ))}
          </div>
        </div>

        {/* Right Column - Upcoming Pitch Sessions */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm p-6 flex flex-col h-full">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center mb-6">
              <Calendar size={18} className="mr-2 text-purple-500" /> Upcoming Pitches
            </h2>

            <div className="space-y-4 flex-1">
              {upcomingSessions.map(session => (
                <div key={session.id} className="flex gap-4">
                  <div className="flex flex-col items-center shrink-0">
                    <div className="text-xs font-bold text-gray-400 uppercase">{format(parseISO(session.startTime), 'MMM')}</div>
                    <div className="text-xl font-black text-gray-900 dark:text-white leading-none">{format(parseISO(session.startTime), 'dd')}</div>
                  </div>
                  <div className="border border-gray-100 dark:border-gray-800 rounded-xl p-3 flex-1 hover:shadow-md transition-shadow bg-gray-50/50 dark:bg-gray-800/30">
                    <h4 className="font-bold text-gray-900 dark:text-white text-sm">{session.name}</h4>
                    <div className="flex flex-col gap-1 mt-2 text-xs text-gray-500">
                      <span className="flex items-center"><Clock size={12} className="mr-1.5" /> {format(parseISO(session.startTime), 'HH:mm')} - {format(parseISO(session.endTime), 'HH:mm')}</span>
                      <span className="flex items-center"><MapPin size={12} className="mr-1.5" /> {session.venue}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <Link to="/dashboard/competitions/pitch" className="block text-center w-full mt-6 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm font-bold text-gray-700 dark:text-gray-300 hover:bg-gray-100 transition-colors">
              View Schedule
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
