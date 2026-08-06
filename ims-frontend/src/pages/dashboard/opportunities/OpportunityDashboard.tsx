import { Briefcase, FileText, CheckCircle2, XCircle, Clock, Bookmark, ArrowRight, Activity } from 'lucide-react';
import { MOCK_OPPORTUNITIES, MOCK_APPLICATIONS } from '@/data/mockOpportunities';
import { Link } from 'react-router-dom';
import { OpportunityCard } from '@/components/dashboard/opportunities/cards/OpportunityCard';
import { format, parseISO } from 'date-fns';

export const OpportunityDashboard = () => {
  const activeOpportunities = MOCK_OPPORTUNITIES.filter(o => o.status === 'Published');
  const userApplications = MOCK_APPLICATIONS; // In a real app, filter by current user
  
  const stats = {
    active: activeOpportunities.length,
    submitted: userApplications.filter(a => a.status !== 'Draft' && a.status !== 'Withdrawn').length,
    accepted: userApplications.filter(a => a.status === 'Accepted').length,
    rejected: userApplications.filter(a => a.status === 'Rejected').length,
  };

  const recentApps = [...userApplications].sort((a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime()).slice(0, 5);

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0 mb-8">
        <div>
          <h1 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight flex items-center">
            <Activity className="mr-3 text-[#0098c8]" size={28} />
            Opportunity Dashboard
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Track your applications, upcoming deadlines, and discover new matches.</p>
        </div>
        <Link to="/dashboard/opportunities/marketplace" className="px-5 py-2.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-xl text-sm font-bold hover:opacity-90 transition-opacity shadow-sm flex items-center">
          <Briefcase size={18} className="mr-2" /> Explore Marketplace
        </Link>
      </div>

      {/* Topline Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-5 shadow-sm flex items-center">
          <div className="w-12 h-12 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-[#0098c8] mr-4 shrink-0">
            <Briefcase size={24} />
          </div>
          <div>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Active Opps</p>
            <h2 className="text-2xl font-black text-gray-900 dark:text-white">{stats.active}</h2>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-5 shadow-sm flex items-center">
          <div className="w-12 h-12 rounded-full bg-purple-50 dark:bg-purple-900/20 flex items-center justify-center text-purple-600 mr-4 shrink-0">
            <FileText size={24} />
          </div>
          <div>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Submitted</p>
            <h2 className="text-2xl font-black text-gray-900 dark:text-white">{stats.submitted}</h2>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-5 shadow-sm flex items-center">
          <div className="w-12 h-12 rounded-full bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center text-emerald-500 mr-4 shrink-0">
            <CheckCircle2 size={24} />
          </div>
          <div>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Accepted</p>
            <h2 className="text-2xl font-black text-gray-900 dark:text-white">{stats.accepted}</h2>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-5 shadow-sm flex items-center">
          <div className="w-12 h-12 rounded-full bg-red-50 dark:bg-red-900/20 flex items-center justify-center text-red-500 mr-4 shrink-0">
            <XCircle size={24} />
          </div>
          <div>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Rejected</p>
            <h2 className="text-2xl font-black text-gray-900 dark:text-white">{stats.rejected}</h2>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        
        {/* Left Column - Recommended */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center">
              <Activity size={18} className="mr-2 text-emerald-500" /> Recommended For You
            </h2>
            <Link to="/dashboard/opportunities/marketplace" className="text-sm text-[#0098c8] font-bold hover:underline flex items-center">
              View All <ArrowRight size={14} className="ml-1" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {activeOpportunities.slice(0, 4).map(opp => (
              <OpportunityCard key={opp.id} opportunity={opp} />
            ))}
          </div>
        </div>

        {/* Right Column - Recent Applications */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm p-6 flex flex-col h-full">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center">
                <FileText size={18} className="mr-2 text-purple-500" /> Recent Applications
              </h2>
            </div>

            <div className="space-y-4 flex-1">
              {recentApps.map(app => {
                const opp = MOCK_OPPORTUNITIES.find(o => o.id === app.opportunityId);
                return (
                  <Link key={app.id} to={`/dashboard/opportunities/applications/${app.id}`} className="block group">
                    <div className="border border-gray-100 dark:border-gray-800 rounded-xl p-4 flex flex-col hover:shadow-md transition-shadow bg-gray-50/50 dark:bg-gray-800/30">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-bold text-gray-900 dark:text-white text-sm line-clamp-1 group-hover:text-[#0098c8] transition-colors">{opp?.title}</h4>
                      </div>
                      <div className="flex items-center justify-between mt-auto pt-2">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                          app.status === 'Accepted' ? 'bg-emerald-100 text-emerald-700' :
                          app.status === 'Rejected' ? 'bg-red-100 text-red-700' :
                          app.status === 'Interview Scheduled' ? 'bg-purple-100 text-purple-700' :
                          'bg-blue-100 text-blue-700'
                        }`}>
                          {app.status}
                        </span>
                        <span className="text-xs font-bold text-gray-400">
                          {format(parseISO(app.appliedDate), 'MMM d, yyyy')}
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
            
            <Link to="/dashboard/opportunities/applications" className="block text-center w-full mt-6 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm font-bold text-gray-700 dark:text-gray-300 hover:bg-gray-100 transition-colors">
              View All Applications
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
