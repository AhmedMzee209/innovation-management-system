import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MOCK_COMPETITIONS, MOCK_PARTICIPANTS, MOCK_JUDGES, MOCK_PITCH_SESSIONS } from '@/data/mockCompetitions';
import { MOCK_STARTUPS } from '@/data/mockStartups';
import { MOCK_USERS } from '@/data/mockUsers';
import { CompetitionStatusBadge } from '@/components/dashboard/competitions/cards/CompetitionStatusBadge';
import { ArrowLeft, Calendar, MapPin, Users, Trophy, Activity, Info, FileText, CheckCircle2, ChevronRight, Clock } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { cn } from '@/lib/utils';

export const CompetitionDetails = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('Overview');

  const competition = MOCK_COMPETITIONS.find(c => c.id === id);

  if (!competition) return <div className="p-8 text-center text-gray-500">Competition not found</div>;

  const participants = MOCK_PARTICIPANTS.filter(p => p.competitionId === id);
  const judges = MOCK_JUDGES.filter(j => j.competitionId === id);
  const sessions = MOCK_PITCH_SESSIONS.filter(s => s.competitionId === id);

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      
      {/* Header Actions */}
      <div className="flex items-center justify-between mb-2">
        <Link to="/dashboard/competitions/list" className="text-sm font-medium text-gray-500 hover:text-[#0098c8] flex items-center transition-colors">
          <ArrowLeft size={16} className="mr-1" /> Back to Competitions
        </Link>
        <div className="flex gap-2">
          {competition.status === 'Registration Open' && (
            <Link 
              to={`/dashboard/competitions/${competition.id}/register`}
              className="px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-bold hover:bg-emerald-700 transition-colors shadow-sm"
            >
              Register Now
            </Link>
          )}
          <button className="px-4 py-2 bg-[#0098c8] text-white rounded-lg text-sm font-bold hover:bg-blue-600 transition-colors shadow-sm">
            Manage Event
          </button>
        </div>
      </div>

      {/* Banner */}
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm overflow-hidden">
        <div className={`h-40 md:h-56 bg-gradient-to-r ${competition.bannerColor} relative flex items-end p-6 md:p-8`}>
          <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay"></div>
          
          <div className="relative z-10 w-full flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="text-white">
              <div className="flex items-center gap-3 mb-2">
                <CompetitionStatusBadge status={competition.status} className="bg-white/20 text-white border-none shadow-sm" />
                <span className="text-xs font-bold text-white/80 uppercase tracking-wider">{competition.code}</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-2 drop-shadow-md">
                {competition.name}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-white/90">
                <span className="flex items-center"><Calendar size={16} className="mr-1.5" /> {format(parseISO(competition.startDate), 'MMM d, yyyy')}</span>
                <span className="flex items-center"><MapPin size={16} className="mr-1.5" /> {competition.venue}</span>
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 text-white min-w-[200px]">
              <p className="text-xs font-bold uppercase tracking-wider text-white/70 mb-1">Prize Pool</p>
              <h2 className="text-3xl font-black">${competition.prizePool.toLocaleString()}</h2>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm p-2 flex overflow-x-auto scrollbar-hide">
        {['Overview', 'Participants', 'Judges', 'Pitch Schedule', 'Results'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "px-6 py-2.5 rounded-xl text-sm font-bold transition-all whitespace-nowrap",
              activeTab === tab 
                ? "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white" 
                : "text-gray-500 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800/50"
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        <div className="lg:col-span-2 space-y-6">
          {activeTab === 'Overview' && (
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 md:p-8 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center mb-6">
                <Info size={20} className="mr-2 text-[#0098c8]" /> About the Competition
              </h2>
              <div className="prose dark:prose-invert max-w-none text-gray-600 dark:text-gray-300">
                <p className="text-lg leading-relaxed mb-6">{competition.description}</p>
                
                <h3 className="font-bold text-gray-900 dark:text-white mt-8 mb-4">Event Details</h3>
                <div className="grid grid-cols-2 gap-4 bg-gray-50 dark:bg-gray-800/50 p-6 rounded-xl border border-gray-100 dark:border-gray-800">
                  <div>
                    <p className="text-xs font-bold text-gray-500 uppercase">Type</p>
                    <p className="font-medium text-gray-900 dark:text-white">{competition.type}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-500 uppercase">Category</p>
                    <p className="font-medium text-gray-900 dark:text-white">{competition.category}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-500 uppercase">Organizer</p>
                    <p className="font-medium text-gray-900 dark:text-white">{competition.organizer}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-500 uppercase">Max Capacity</p>
                    <p className="font-medium text-gray-900 dark:text-white">{competition.maxTeams} Teams</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'Participants' && (
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center bg-gray-50/50 dark:bg-gray-800/30">
                <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center">
                  <Users size={20} className="mr-2 text-[#0098c8]" /> Registered Teams ({participants.length})
                </h2>
                <Link to="/dashboard/competitions/participants" className="text-sm font-bold text-[#0098c8] hover:underline flex items-center">
                  Manage <ChevronRight size={16} />
                </Link>
              </div>
              <div className="divide-y divide-gray-100 dark:divide-gray-800">
                {participants.slice(0, 5).map(p => {
                  const startup = MOCK_STARTUPS.find(s => s.id === p.startupId);
                  return (
                    <div key={p.id} className="p-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800/50">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded bg-gradient-to-br from-[#0098c8] to-purple-600 text-white flex items-center justify-center font-bold">
                          {startup?.name.charAt(0)}
                        </div>
                        <div>
                          <Link to={`/dashboard/startups/${startup?.id}`} className="font-bold text-gray-900 dark:text-white hover:text-[#0098c8] block">{startup?.name}</Link>
                          <span className="text-xs text-gray-500">{startup?.industry}</span>
                        </div>
                      </div>
                      <span className={cn("px-2.5 py-1 rounded-full text-[10px] font-bold uppercase", 
                        p.status === 'Approved' ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-600'
                      )}>
                        {p.status}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          
          {/* Add more tabs logic here if needed, keeping it focused on Overview for the plan */}
          {activeTab !== 'Overview' && activeTab !== 'Participants' && (
             <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-12 shadow-sm text-center">
                <Activity size={48} className="mx-auto text-gray-300 dark:text-gray-700 mb-4" />
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">{activeTab} Panel</h3>
                <p className="text-gray-500 text-sm mt-2">Manage {activeTab.toLowerCase()} data for this competition.</p>
                <button className="mt-6 px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg text-sm font-bold hover:bg-gray-200 dark:hover:bg-gray-700">
                  Open Dedicated Dashboard
                </button>
             </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm">
            <h3 className="text-sm font-bold text-gray-900 dark:text-white flex items-center mb-6">
              <Calendar size={16} className="mr-2 text-[#0098c8]" /> Timeline
            </h3>
            
            <div className="relative pl-6 space-y-6 before:absolute before:inset-0 before:ml-2.5 before:w-0.5 before:-translate-x-px before:bg-gray-200 dark:before:bg-gray-700">
              
              <div className="relative">
                <div className="absolute -left-6 w-5 h-5 bg-white dark:bg-gray-900 border-2 border-emerald-500 rounded-full flex items-center justify-center mt-0.5"><CheckCircle2 size={10} className="text-emerald-500" /></div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900 dark:text-white">Registration Opens</h4>
                  <p className="text-xs text-gray-500 mt-1">{format(parseISO(competition.registrationStart), 'MMM d, yyyy')}</p>
                </div>
              </div>
              
              <div className="relative">
                <div className={`absolute -left-6 w-5 h-5 bg-white dark:bg-gray-900 border-2 rounded-full flex items-center justify-center mt-0.5 ${competition.status === 'Draft' || competition.status === 'Upcoming' ? 'border-gray-300' : 'border-[#0098c8]'}`}></div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900 dark:text-white">Registration Closes</h4>
                  <p className="text-xs text-gray-500 mt-1">{format(parseISO(competition.registrationEnd), 'MMM d, yyyy')}</p>
                </div>
              </div>
              
              <div className="relative">
                <div className={`absolute -left-6 w-5 h-5 bg-white dark:bg-gray-900 border-2 rounded-full flex items-center justify-center mt-0.5 ${competition.status === 'Completed' || competition.status === 'Live' ? 'border-[#0098c8]' : 'border-gray-300'}`}></div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900 dark:text-white">Event Starts</h4>
                  <p className="text-xs text-gray-500 mt-1">{format(parseISO(competition.startDate), 'MMM d, yyyy')}</p>
                </div>
              </div>
              
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm">
            <h3 className="text-sm font-bold text-gray-900 dark:text-white flex items-center mb-4">
              <Trophy size={16} className="mr-2 text-amber-500" /> Stats
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                <span className="text-sm text-gray-500 font-medium">Registered</span>
                <span className="font-black text-gray-900 dark:text-white">{participants.length}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                <span className="text-sm text-gray-500 font-medium">Judges</span>
                <span className="font-black text-gray-900 dark:text-white">{judges.length}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                <span className="text-sm text-gray-500 font-medium">Pitch Sessions</span>
                <span className="font-black text-gray-900 dark:text-white">{sessions.length}</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
