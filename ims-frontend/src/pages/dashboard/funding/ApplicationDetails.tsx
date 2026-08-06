import { useParams, Link } from 'react-router-dom';
import { MOCK_APPLICATIONS, MOCK_FUNDING_PROGRAMS } from '@/data/mockFunding';
import { MOCK_STARTUPS } from '@/data/mockStartups';
import { AppStatusBadge } from '@/components/dashboard/funding/cards/FundingStatusBadge';
import { ArrowLeft, Banknote, Calendar, CheckCircle2, XCircle, FileText, PieChart, Activity, Download, MessageSquare } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { Cell, Pie, PieChart as RechartsPieChart, ResponsiveContainer, Tooltip } from 'recharts';

export const ApplicationDetails = () => {
  const { id } = useParams();
  const application = MOCK_APPLICATIONS.find(a => a.id === id);

  if (!application) return <div className="p-8 text-center text-gray-500">Application not found</div>;

  const startup = MOCK_STARTUPS.find(s => s.id === application.startupId);
  const program = MOCK_FUNDING_PROGRAMS.find(p => p.id === application.programId);

  if (!startup || !program) return <div className="p-8 text-center text-gray-500">Error loading application details</div>;

  const budgetData = [
    { name: 'Equipment', value: application.budgetBreakdown.equipment, color: '#0098c8' },
    { name: 'Operations', value: application.budgetBreakdown.operations, color: '#8b5cf6' },
    { name: 'Marketing', value: application.budgetBreakdown.marketing, color: '#10b981' },
    { name: 'HR', value: application.budgetBreakdown.humanResources, color: '#f59e0b' },
    { name: 'Research', value: application.budgetBreakdown.research, color: '#ef4444' },
    { name: 'Other', value: application.budgetBreakdown.other, color: '#6b7280' },
  ].filter(item => item.value > 0);

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between mb-6">
        <Link to="/dashboard/funding/applications" className="text-sm font-medium text-gray-500 hover:text-[#0098c8] flex items-center transition-colors">
          <ArrowLeft size={16} className="mr-1" /> Back to Applications
        </Link>
        <div className="flex gap-2">
          {application.status === 'Under Review' && (
            <Link 
              to={`/dashboard/funding/applications/${application.id}/evaluate`}
              className="px-4 py-2 bg-[#0098c8] text-white rounded-lg text-sm font-bold hover:bg-[#0086b3] transition-colors shadow-sm flex items-center"
            >
              <Activity size={16} className="mr-2" /> Evaluate Application
            </Link>
          )}
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm overflow-hidden">
        
        {/* Header */}
        <div className="p-6 sm:p-8 border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/30">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white tracking-tight">
                  {startup.name}
                </h1>
                <AppStatusBadge status={application.status} className="text-sm px-3 py-1" />
              </div>
              <p className="text-sm text-gray-500 font-medium">Application ID: {application.applicationNumber}</p>
            </div>
            
            <div className="text-right">
              <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Requested Amount</p>
              <h2 className="text-3xl font-black text-gray-900 dark:text-white">${application.requestedAmount.toLocaleString()}</h2>
              {application.approvedAmount && (
                <p className="text-sm font-bold text-emerald-600 mt-1">Approved: ${application.approvedAmount.toLocaleString()}</p>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-gray-100 dark:divide-gray-800">
          
          {/* Main Content */}
          <div className="lg:col-span-2 p-6 sm:p-8 space-y-8">
            
            {/* Context Section */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Funding Program</h3>
                <Link to={`/dashboard/funding/programs/${program.id}`} className="font-bold text-[#0098c8] hover:underline text-lg">
                  {program.name}
                </Link>
                <p className="text-sm text-gray-500 mt-1">{program.type} • Up to ${(program.maxAmount / 1000).toFixed(0)}k</p>
              </div>
              <div>
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Submission Details</h3>
                <p className="text-sm font-medium text-gray-900 dark:text-gray-300 flex items-center">
                  <Calendar size={16} className="mr-2 text-gray-400" /> {format(parseISO(application.submissionDate), 'MMMM d, yyyy')}
                </p>
              </div>
            </div>

            <hr className="border-gray-100 dark:border-gray-800" />

            {/* Budget Breakdown */}
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center mb-6">
                <PieChart size={20} className="mr-2 text-[#0098c8]" /> Budget Breakdown
              </h3>
              
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="w-48 h-48 shrink-0">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                      <Pie
                        data={budgetData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={2}
                        dataKey="value"
                      >
                        {budgetData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value: number) => `$${value.toLocaleString()}`} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="flex-1 w-full space-y-3">
                  {budgetData.map(item => (
                    <div key={item.name} className="flex items-center justify-between">
                      <div className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300">
                        <span className="w-3 h-3 rounded-full mr-3" style={{ backgroundColor: item.color }}></span>
                        {item.name}
                      </div>
                      <span className="font-bold text-gray-900 dark:text-white">${item.value.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <hr className="border-gray-100 dark:border-gray-800" />

            {/* Evaluation Results */}
            {application.evaluationScore && (
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center mb-4">
                  <Activity size={20} className="mr-2 text-amber-500" /> Evaluation Results
                </h3>
                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6 border border-gray-100 dark:border-gray-800">
                  <div className="flex items-center gap-6 mb-6">
                    <div className="w-20 h-20 rounded-full border-4 border-emerald-500 flex items-center justify-center bg-white dark:bg-gray-900 shadow-sm shrink-0">
                      <span className="text-2xl font-black text-emerald-600">{application.evaluationScore}</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-white text-lg">Committee Score</h4>
                      <p className="text-sm text-gray-500">Based on market potential, team capability, and financial viability.</p>
                    </div>
                  </div>
                  
                  {application.reviewerComments && (
                    <div className="bg-white dark:bg-gray-900 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                      <div className="flex items-center mb-2">
                        <MessageSquare size={16} className="text-gray-400 mr-2" />
                        <h5 className="font-bold text-gray-900 dark:text-white text-sm">Reviewer Comments</h5>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 italic">"{application.reviewerComments}"</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="p-6 sm:p-8 bg-gray-50/50 dark:bg-gray-900/50 space-y-6">
            <div>
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">Startup Profile</h3>
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4">
                <Link to={`/dashboard/startups/${startup.id}`} className="font-bold text-gray-900 dark:text-white hover:text-[#0098c8] text-lg mb-1 block">
                  {startup.name}
                </Link>
                <div className="text-sm text-gray-500 mb-4">{startup.industry} • {startup.stage}</div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Founded</span>
                    <span className="font-medium text-gray-900 dark:text-white">{format(parseISO(startup.foundedDate), 'yyyy')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Team Size</span>
                    <span className="font-medium text-gray-900 dark:text-white">{startup.teamSize} members</span>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4 flex items-center">
                <FileText size={14} className="mr-2" /> Supporting Documents
              </h3>
              <div className="space-y-2">
                {['Business Plan.pdf', 'Pitch Deck v2.pptx', 'Financial Projections.xlsx'].map(doc => (
                  <button key={doc} className="w-full flex items-center justify-between p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-[#0098c8] transition-colors group">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300 truncate">{doc}</span>
                    <Download size={16} className="text-gray-400 group-hover:text-[#0098c8]" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
