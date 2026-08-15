import { Banknote, TrendingUp, Calendar, AlertCircle, Activity, ChevronRight, Download, Users, FileText } from 'lucide-react';
import { StatCard } from '@/components/dashboard/widgets/StatCard';
import { MOCK_FUNDING_PROGRAMS, MOCK_APPLICATIONS, MOCK_DISBURSEMENTS } from '@/data/mockFunding';
import { Link } from 'react-router-dom';
import { ApplicationCard } from '@/components/dashboard/funding/cards/ApplicationCard';
import { DisbursementStatusBadge } from '@/components/dashboard/funding/cards/FundingStatusBadge';
import { format, parseISO } from 'date-fns';

export const FundingDashboard = () => {
  const activePrograms = MOCK_FUNDING_PROGRAMS.filter(p => p.status === 'Active');
  
  const totalFunding = MOCK_FUNDING_PROGRAMS.reduce((acc, curr) => acc + curr.totalBudget, 0);
  const totalDisbursed = MOCK_DISBURSEMENTS.reduce((acc, curr) => acc + curr.amountDisbursed, 0);
  const remainingBudget = totalFunding - totalDisbursed; // Simplified logic

  const pendingApps = MOCK_APPLICATIONS.filter(a => a.status === 'Submitted' || a.status === 'Under Review');
  const recentApps = pendingApps.sort((a, b) => new Date(b.submissionDate).getTime() - new Date(a.submissionDate).getTime()).slice(0, 3);
  
  const upcomingDisbursements = MOCK_DISBURSEMENTS
    .filter(d => d.status === 'Processing' && d.nextInstallmentDate)
    .sort((a, b) => new Date(a.nextInstallmentDate!).getTime() - new Date(b.nextInstallmentDate!).getTime())
    .slice(0, 4);

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight flex items-center">
            <Banknote className="mr-3 text-emerald-600" size={28} />
            Funding & Grants
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Manage capital distribution, track applications, and monitor ecosystem health.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-bold hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors shadow-sm flex items-center">
            <Download size={16} className="mr-2" /> Export Ledger
          </button>
          <Link to="/dashboard/funding/programs/new" className="px-5 py-2 bg-emerald-600 text-white rounded-lg text-sm font-bold hover:bg-emerald-700 transition-colors shadow-sm flex items-center">
            Create Program
          </Link>
        </div>
      </div>

      {/* Stripe-style Financial Topline */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-emerald-600 to-emerald-800 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-20">
            <Banknote size={64} />
          </div>
          <p className="text-emerald-100 text-sm font-bold tracking-wider uppercase mb-2">Total Capital Pool</p>
          <h2 className="text-4xl font-black mb-4">${(totalFunding / 1000000).toFixed(1)}M</h2>
          <div className="flex items-center text-sm font-medium bg-white/20 w-fit px-3 py-1 rounded-full backdrop-blur-sm border border-white/10">
            <TrendingUp size={16} className="mr-2" /> +$2.5M vs last year
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <p className="text-gray-500 text-sm font-bold tracking-wider uppercase mb-2">Total Disbursed</p>
            <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-2">${(totalDisbursed / 1000).toFixed(1)}k</h2>
          </div>
          <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-2 mt-4">
            <div className="bg-[#0098c8] h-2 rounded-full" style={{ width: `${(totalDisbursed / totalFunding) * 100}%` }}></div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <p className="text-gray-500 text-sm font-bold tracking-wider uppercase mb-2">Pending Applications</p>
            <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-2">{pendingApps.length}</h2>
          </div>
          <Link to="/dashboard/funding/applications" className="text-sm font-bold text-[#0098c8] flex items-center hover:underline mt-4">
            Review Queue <ChevronRight size={16} className="ml-1" />
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        
        {/* Left Column - Active Programs & Recent Apps */}
        <div className="lg:col-span-2 space-y-6">
          
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm overflow-hidden">
            <div className="p-6 flex items-center justify-between border-b border-gray-100 dark:border-gray-800">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center">
                <Activity size={18} className="mr-2 text-blue-500" /> Active Programs
              </h2>
              <Link to="/dashboard/funding/programs" className="text-sm text-[#0098c8] font-bold hover:underline flex items-center">
                View All <ChevronRight size={14} className="ml-1" />
              </Link>
            </div>
            
            <div className="divide-y divide-gray-100 dark:divide-gray-800">
              {activePrograms.slice(0, 3).map(program => (
                <div key={program.id} className="p-6 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors flex items-center justify-between">
                  <div>
                    <Link to={`/dashboard/funding/programs/${program.id}`} className="font-bold text-gray-900 dark:text-white hover:text-[#0098c8] mb-1 block">
                      {program.name}
                    </Link>
                    <div className="flex items-center text-xs text-gray-500 gap-4 mt-2">
                      <span className="flex items-center"><Banknote size={12} className="mr-1" /> ${(program.availableBudget / 1000).toFixed(0)}k Available</span>
                      <span className="flex items-center"><Calendar size={12} className="mr-1" /> Ends {format(parseISO(program.endDate), 'MMM d')}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-black text-gray-900 dark:text-white">${(program.maxAmount / 1000).toFixed(0)}k Max</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center">
                <FileText size={18} className="mr-2 text-amber-500" /> Applications Awaiting Review
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {recentApps.map(app => (
                <ApplicationCard key={app.id} application={app} />
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Upcoming Disbursements */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm p-6">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center mb-6">
              <AlertCircle size={18} className="mr-2 text-emerald-500" /> Upcoming Disbursements
            </h2>

            <div className="space-y-4">
              {upcomingDisbursements.map(disb => (
                <div key={disb.id} className="border border-gray-100 dark:border-gray-800 rounded-xl p-4 hover:shadow-md transition-shadow bg-gray-50/50 dark:bg-gray-800/30">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-bold text-gray-500">{disb.id.toUpperCase()}</span>
                    <DisbursementStatusBadge status={disb.status} />
                  </div>
                  <div className="flex items-end justify-between mt-4">
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Next Payment</p>
                      <h3 className="font-black text-lg text-gray-900 dark:text-white">
                        ${disb.nextInstallmentAmount?.toLocaleString()}
                      </h3>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500 font-medium">
                        Due {format(parseISO(disb.nextInstallmentDate!), 'MMM d, yy')}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <Link to="/dashboard/funding/disbursements" className="block text-center w-full mt-6 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm font-bold text-gray-700 dark:text-gray-300 hover:bg-gray-100 transition-colors">
              View Ledger
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
