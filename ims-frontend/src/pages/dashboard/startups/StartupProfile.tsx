import { useParams, Link, useLocation } from 'react-router-dom';
import { MOCK_STARTUPS } from '@/data/mockStartups';
import { MOCK_USERS } from '@/data/mockUsers';
import { StageBadge, FundingBadge, IncubationBadge } from '@/components/dashboard/startups/cards/StartupStatusBadge';
import { ArrowLeft, ExternalLink, Target, TrendingUp, Users, FileText, Rocket, MapPin, Calendar, Briefcase, Mail, CheckCircle2 } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { UserAvatar } from '@/components/dashboard/users/UserAvatar';
import { cn } from '@/lib/utils';
import { useState } from 'react';

export const StartupProfile = () => {
  const { id } = useParams();
  const location = useLocation();
  const startup = MOCK_STARTUPS.find(s => s.id === id);
  const [activeTab, setActiveTab] = useState('Overview');

  if (!startup) return <div className="p-8 text-center text-gray-500">Startup not found</div>;

  const founderInfo = startup.team.find(t => t.role === 'Founder');
  const founder = founderInfo ? MOCK_USERS[founderInfo.userId] : null;

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
              <span className="text-3xl sm:text-4xl font-black text-white">{startup.name.charAt(0)}</span>
            </div>
            
            <div className="flex-1 w-full">
              <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-2">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h1 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white tracking-tight">{startup.name}</h1>
                    <span className="text-xs font-mono font-bold bg-gray-100 dark:bg-gray-800 text-gray-500 px-2 py-0.5 rounded border border-gray-200 dark:border-gray-700">{startup.code}</span>
                  </div>
                  <p className="text-lg font-medium text-gray-500 dark:text-gray-400">{startup.tagline}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <StageBadge stage={startup.stage} />
                  <FundingBadge status={startup.fundingStatus} />
                  <IncubationBadge status={startup.incubationStatus} />
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-gray-100 dark:border-gray-800">
                <div>
                  <p className="text-xs font-bold uppercase text-gray-500 mb-1">Industry</p>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{startup.industry}</p>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase text-gray-500 mb-1">Business Model</p>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{startup.businessModel}</p>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase text-gray-500 mb-1">Founded</p>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{format(parseISO(startup.foundedDate), 'MMMM yyyy')}</p>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase text-gray-500 mb-1">Team Size</p>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{startup.team.length} Members</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 bg-gray-200/50 dark:bg-gray-800/50 p-1 rounded-xl w-fit mb-6 overflow-x-auto">
          {['Overview', 'Team', 'Milestones', 'Documents'].map(tab => (
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
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">About {startup.name}</h3>
                  <div className="space-y-6 text-sm text-gray-700 dark:text-gray-300">
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-white mb-2">Description</h4>
                      <p className="leading-relaxed">{startup.description}</p>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-white mb-2 flex items-center"><Target size={16} className="mr-2 text-indigo-500" /> Vision</h4>
                      <p className="leading-relaxed italic border-l-4 border-indigo-200 dark:border-indigo-900/50 pl-4">{startup.vision}</p>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-white mb-2 flex items-center"><Rocket size={16} className="mr-2 text-rose-500" /> Mission</h4>
                      <p className="leading-relaxed border-l-4 border-rose-200 dark:border-rose-900/50 pl-4">{startup.mission}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm p-6">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Current Milestones</h3>
                  <div className="space-y-4">
                    {startup.milestones.map((ms, idx) => (
                      <div key={ms.id} className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <div className={cn(
                            "w-8 h-8 rounded-full flex items-center justify-center border-2 shrink-0",
                            ms.status === 'Completed' ? "bg-green-50 border-green-500 text-green-600" :
                            ms.status === 'In Progress' ? "bg-blue-50 border-blue-500 text-blue-600" :
                            "bg-gray-50 border-gray-300 text-gray-400 dark:bg-gray-800 dark:border-gray-700"
                          )}>
                            {ms.status === 'Completed' ? <CheckCircle2 size={16} /> : idx + 1}
                          </div>
                          {idx !== startup.milestones.length - 1 && (
                            <div className={cn("w-0.5 h-full my-1", ms.status === 'Completed' ? "bg-green-200" : "bg-gray-200 dark:bg-gray-800")}></div>
                          )}
                        </div>
                        <div className="pb-4 pt-1 flex-1">
                          <div className="flex justify-between items-start mb-1">
                            <h4 className="font-bold text-gray-900 dark:text-white">{ms.title}</h4>
                            <span className={cn(
                              "text-[10px] font-bold uppercase px-2 py-0.5 rounded",
                              ms.status === 'Completed' ? "bg-green-100 text-green-700" :
                              ms.status === 'In Progress' ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-500"
                            )}>{ms.status}</span>
                          </div>
                          <p className="text-sm text-gray-500 mb-2">{ms.description}</p>
                          <p className="text-xs font-medium text-gray-400 flex items-center">
                            <Calendar size={12} className="mr-1" />
                            Target: {format(parseISO(ms.dueDate), 'MMM d, yyyy')}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {activeTab === 'Team' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {startup.team.map(member => {
                  const mUser = MOCK_USERS[member.userId];
                  if (!mUser) return null;
                  return (
                    <div key={member.id} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4 flex items-center gap-4 hover:shadow-md transition-shadow">
                      <UserAvatar firstName={mUser.firstName} lastName={mUser.lastName} size="lg" />
                      <div>
                        <h4 className="font-bold text-gray-900 dark:text-white">{mUser.firstName} {mUser.lastName}</h4>
                        <p className="text-sm font-medium text-[#0098c8]">{member.role}</p>
                        {member.equity > 0 && (
                          <p className="text-xs text-gray-500 mt-1">{member.equity}% Equity</p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
            
            {(activeTab === 'Milestones' || activeTab === 'Documents') && (
              <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm p-12 flex flex-col items-center justify-center text-center">
                <FileText size={48} className="text-gray-300 dark:text-gray-700 mb-4" />
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Detailed {activeTab} View</h3>
                <p className="text-sm text-gray-500 max-w-sm">This expanded view allows you to manage specific artifacts and tracking for {activeTab.toLowerCase()}.</p>
              </div>
            )}

          </div>

          {/* Right Column - Sidebar Widgets */}
          <div className="lg:col-span-1 space-y-6">
            
            {founder && (
              <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm p-6">
                <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-4">Lead Founder</h3>
                <div className="flex items-center gap-4 mb-4">
                  <UserAvatar firstName={founder.firstName} lastName={founder.lastName} size="lg" />
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white">{founder.firstName} {founder.lastName}</h4>
                    <p className="text-sm text-gray-500">{founder.email}</p>
                  </div>
                </div>
                <button className="w-full py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm font-bold text-gray-700 dark:text-gray-300 hover:bg-gray-100 transition-colors flex items-center justify-center">
                  <Mail size={16} className="mr-2" /> Contact Founder
                </button>
              </div>
            )}

            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm p-6">
              <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-4">Key Metrics</h3>
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-100 dark:border-gray-800">
                  <p className="text-xs font-bold text-gray-500 uppercase mb-1">Total Funding</p>
                  <p className="text-2xl font-black text-green-600 dark:text-green-500">${(startup.totalFundingRaised).toLocaleString()}</p>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-100 dark:border-gray-800">
                  <p className="text-xs font-bold text-gray-500 uppercase mb-1">Estimated Valuation</p>
                  <p className="text-2xl font-black text-gray-900 dark:text-white">${(startup.valuation).toLocaleString()}</p>
                </div>
                {startup.monthlyRecurringRevenue > 0 && (
                  <div className="p-4 bg-[#0098c8]/5 dark:bg-[#0098c8]/10 rounded-xl border border-[#0098c8]/20">
                    <p className="text-xs font-bold text-[#0098c8] uppercase mb-1">MRR</p>
                    <p className="text-2xl font-black text-[#0098c8]">${(startup.monthlyRecurringRevenue).toLocaleString()}</p>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm p-6">
              <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-4">Origin Details</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-800">
                  <span className="text-gray-500">Innovation ID</span>
                  <Link to={`/dashboard/innovations/${startup.innovationId}`} className="font-mono font-bold text-[#0098c8] hover:underline">
                    {startup.innovationId.replace('inv_', 'INV-')}
                  </Link>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-500">System Code</span>
                  <span className="font-mono font-bold text-gray-900 dark:text-white">{startup.code}</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
