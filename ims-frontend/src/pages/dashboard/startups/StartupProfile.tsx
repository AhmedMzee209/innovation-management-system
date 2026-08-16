import { useParams, Link } from 'react-router-dom';
import { useStartup } from '@/hooks/useStartup';
import { StageBadge } from '@/components/dashboard/startups/cards/StartupStatusBadge';
import { ArrowLeft, Target, Rocket, Calendar, Mail, CheckCircle2, FileText, Loader2, Building2 } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { UserAvatar } from '@/components/dashboard/users/UserAvatar';
import { cn } from '@/lib/utils';
import { useState } from 'react';

export const StartupProfile = () => {
  const { id } = useParams<{ id: string }>();
  const { data: startup, isLoading } = useStartup(id || '');
  const [activeTab, setActiveTab] = useState('Overview');

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-4rem)]">
        <Loader2 className="animate-spin h-8 w-8 text-[#0098c8]" />
      </div>
    );
  }

  if (!startup) return <div className="p-8 text-center text-gray-500">Startup not found</div>;

  const founderInfo = startup.teamMembers.find(t => t.isFounder);
  const teamMembers = startup.teamMembers || [];

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] overflow-y-auto bg-gray-50 dark:bg-[#0a0a0a]">
      {/* Banner Area */}
      <div className="relative h-64 sm:h-80 bg-gradient-to-br from-slate-900 to-[#0d2137] overflow-hidden shrink-0">
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay"></div>
        <div className="absolute top-4 left-4 lg:top-8 lg:left-8 z-10">
          <Link to="/dashboard/startups" className="flex items-center text-sm font-medium text-white/70 hover:text-white transition-colors bg-black/20 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-white/10">
            <ArrowLeft size={16} className="mr-1.5" /> Back to Directory
          </Link>
        </div>
      </div>

      {/* Main Content Overlay */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full -mt-24 sm:-mt-32 relative z-10 pb-12 flex-1">
        
        {/* Header Card */}
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm p-6 sm:p-8 mb-6">
          <div className="flex flex-col sm:flex-row gap-6 items-start">
            <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-2xl bg-gradient-to-br from-[#0098c8] to-purple-600 border-4 border-white dark:border-gray-900 shadow-md shrink-0 flex items-center justify-center -mt-12 sm:-mt-16">
              <span className="text-3xl sm:text-4xl font-black text-white">{startup.startupName.charAt(0)}</span>
            </div>
            
            <div className="flex-1 w-full">
              <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-2">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h1 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white tracking-tight">{startup.startupName}</h1>
                    <span className="text-xs font-mono font-bold bg-gray-100 dark:bg-gray-800 text-gray-500 px-2 py-0.5 rounded border border-gray-200 dark:border-gray-700">{startup.startupCode}</span>
                  </div>
                  <p className="text-lg font-medium text-gray-500 dark:text-gray-400">{startup.tagline || 'No tagline'}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <StageBadge stage={startup.currentStage?.name || 'Unknown'} />
                  <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium capitalize ${
                    startup.status === 'ACTIVE' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                  }`}>
                    {startup.status?.toLowerCase()}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-gray-100 dark:border-gray-800">
                <div>
                  <p className="text-xs font-bold uppercase text-gray-500 mb-1">Registration #</p>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{startup.registrationNumber || 'Pending'}</p>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase text-gray-500 mb-1">School</p>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{startup.schoolName || 'University-wide'}</p>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase text-gray-500 mb-1">Founded</p>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{startup.foundedDate ? format(parseISO(startup.foundedDate), 'MMMM yyyy') : 'Unknown'}</p>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase text-gray-500 mb-1">Team Size</p>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{teamMembers.length} Members</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 bg-gray-200/50 dark:bg-gray-800/50 p-1 rounded-xl w-fit mb-6 overflow-x-auto">
          {['Overview', 'Team', 'Milestones', 'Achievements', 'Progress'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-bold transition-all whitespace-nowrap",
                activeTab === tab 
                  ? "bg-white dark:bg-gray-900 text-[#0098c8] shadow-sm" 
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-gray-800"
              )}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-6">
            
            {activeTab === 'Overview' && (
              <>
                <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm p-6">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">About {startup.startupName}</h3>
                  <div className="space-y-6 text-sm text-gray-700 dark:text-gray-300">
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-white mb-2">Description</h4>
                      <p className="leading-relaxed">{startup.description || 'No description provided.'}</p>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-white mb-2 flex items-center"><Target size={16} className="mr-2 text-indigo-500" /> Vision</h4>
                      <p className="leading-relaxed italic border-l-4 border-indigo-200 dark:border-indigo-900/50 pl-4">{startup.vision || 'No vision provided.'}</p>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-white mb-2 flex items-center"><Rocket size={16} className="mr-2 text-rose-500" /> Mission</h4>
                      <p className="leading-relaxed border-l-4 border-rose-200 dark:border-rose-900/50 pl-4">{startup.mission || 'No mission provided.'}</p>
                    </div>
                  </div>
                </div>
              </>
            )}

            {activeTab === 'Team' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {teamMembers.length > 0 ? teamMembers.map(member => (
                  <div key={member.id} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4 flex items-center gap-4 hover:shadow-md transition-shadow">
                    <UserAvatar firstName={member.userName.split(' ')[0]} lastName={member.userName.split(' ')[1] || ''} size="lg" />
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-white">{member.userName}</h4>
                      <p className="text-sm font-medium text-[#0098c8]">{member.role}</p>
                      {member.ownershipPercentage !== undefined && member.ownershipPercentage > 0 && (
                        <p className="text-xs text-gray-500 mt-1">{member.ownershipPercentage}% Equity</p>
                      )}
                    </div>
                  </div>
                )) : (
                  <div className="col-span-2 p-8 text-center text-gray-500 border border-dashed rounded-xl border-gray-300 dark:border-gray-700">No team members assigned.</div>
                )}
              </div>
            )}
            
            {activeTab === 'Milestones' && (
              <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">Milestones</h3>
                </div>
                <div className="space-y-4">
                  {startup.milestones?.length > 0 ? startup.milestones.map((ms, idx) => (
                    <div key={ms.id} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className={cn(
                          "w-8 h-8 rounded-full flex items-center justify-center border-2 shrink-0",
                          ms.status === 'COMPLETED' ? "bg-green-50 border-green-500 text-green-600" :
                          ms.status === 'IN_PROGRESS' ? "bg-blue-50 border-blue-500 text-blue-600" :
                          "bg-gray-50 border-gray-300 text-gray-400 dark:bg-gray-800 dark:border-gray-700"
                        )}>
                          {ms.status === 'COMPLETED' ? <CheckCircle2 size={16} /> : idx + 1}
                        </div>
                        {idx !== startup.milestones.length - 1 && (
                          <div className={cn("w-0.5 h-full my-1", ms.status === 'COMPLETED' ? "bg-green-200" : "bg-gray-200 dark:bg-gray-800")}></div>
                        )}
                      </div>
                      <div className="pb-4 pt-1 flex-1">
                        <div className="flex justify-between items-start mb-1">
                          <h4 className="font-bold text-gray-900 dark:text-white">{ms.title}</h4>
                          <span className={cn(
                            "text-[10px] font-bold uppercase px-2 py-0.5 rounded",
                            ms.status === 'COMPLETED' ? "bg-green-100 text-green-700" :
                            ms.status === 'IN_PROGRESS' ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-500"
                          )}>{ms.status}</span>
                        </div>
                        <p className="text-sm text-gray-500 mb-2">{ms.description}</p>
                        <p className="text-xs font-medium text-gray-400 flex items-center">
                          <Calendar size={12} className="mr-1" />
                          Target: {format(parseISO(ms.targetDate), 'MMM d, yyyy')}
                        </p>
                      </div>
                    </div>
                  )) : (
                    <p className="text-center text-gray-500 py-4">No milestones tracked.</p>
                  )}
                </div>
              </div>
            )}

            {(activeTab === 'Achievements' || activeTab === 'Progress') && (
              <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm p-12 flex flex-col items-center justify-center text-center">
                <FileText size={48} className="text-gray-300 dark:text-gray-700 mb-4" />
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{activeTab} View</h3>
                <p className="text-sm text-gray-500 max-w-sm">This view allows you to see {activeTab.toLowerCase()} records for the startup.</p>
                <div className="mt-6 w-full text-left space-y-4">
                   {activeTab === 'Achievements' && startup.achievements?.map(ach => (
                     <div key={ach.id} className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                       <h4 className="font-bold text-gray-900 dark:text-white">{ach.title}</h4>
                       <p className="text-sm text-gray-500">{ach.description}</p>
                       <span className="text-xs text-blue-500 mt-2 block">{format(parseISO(ach.achievementDate), 'MMM d, yyyy')} • {ach.category}</span>
                     </div>
                   ))}
                   {activeTab === 'Progress' && startup.progressRecords?.map(pr => (
                     <div key={pr.id} className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                       <div className="flex justify-between">
                         <h4 className="font-bold text-gray-900 dark:text-white">{pr.progressPercentage}% Progress</h4>
                         <span className="text-xs text-gray-400">{format(parseISO(pr.createdAt), 'MMM d, yyyy')}</span>
                       </div>
                       <p className="text-sm text-gray-500 mt-2">{pr.summary}</p>
                     </div>
                   ))}
                </div>
              </div>
            )}

          </div>

          {/* Right Column - Sidebar Widgets */}
          <div className="lg:col-span-1 space-y-6">
            
            {founderInfo && (
              <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm p-6">
                <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-4">Lead Founder</h3>
                <div className="flex items-center gap-4 mb-4">
                  <UserAvatar firstName={founderInfo.userName.split(' ')[0]} lastName={founderInfo.userName.split(' ')[1] || ''} size="lg" />
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white">{founderInfo.userName}</h4>
                    <p className="text-sm text-gray-500">{founderInfo.userEmail}</p>
                  </div>
                </div>
                <button className="w-full py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm font-bold text-gray-700 dark:text-gray-300 hover:bg-gray-100 transition-colors flex items-center justify-center">
                  <Mail size={16} className="mr-2" /> Contact Founder
                </button>
              </div>
            )}

            {startup.hubName && (
               <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm p-6">
                 <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-4">Hub Assignment</h3>
                 <div className="flex items-center gap-3">
                   <div className="w-10 h-10 rounded-lg bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 flex items-center justify-center">
                     <Building2 size={20} />
                   </div>
                   <div>
                     <h4 className="font-bold text-gray-900 dark:text-white">{startup.hubName}</h4>
                     <p className="text-xs text-gray-500">Managing Hub</p>
                   </div>
                 </div>
               </div>
            )}

            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm p-6">
              <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-4">Origin Details</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-800">
                  <span className="text-gray-500">Innovation Title</span>
                  <Link to={`/dashboard/innovations/${startup.innovationId}`} className="font-medium text-[#0098c8] hover:underline text-right max-w-[150px] truncate" title={startup.innovationTitle}>
                    {startup.innovationTitle}
                  </Link>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-500">System Code</span>
                  <span className="font-mono font-bold text-gray-900 dark:text-white">{startup.startupCode}</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
