import { useParams, Link } from 'react-router-dom';
import { MOCK_APPLICATIONS, MOCK_OPPORTUNITIES, MOCK_PROVIDERS } from '@/data/mockOpportunities';
import { ArrowLeft, CheckCircle2, Circle, Clock, FileText, Calendar, Building, Info } from 'lucide-react';
import { format, parseISO } from 'date-fns';

export const ApplicationDetails = () => {
  const { id } = useParams();
  
  const application = MOCK_APPLICATIONS.find(a => a.id === id);
  const opportunity = MOCK_OPPORTUNITIES.find(o => o.id === application?.opportunityId);
  const provider = MOCK_PROVIDERS.find(p => p.id === opportunity?.providerId);

  if (!application || !opportunity || !provider) {
    return <div className="p-8 text-center text-gray-500">Application not found</div>;
  }

  const steps = [
    { label: 'Application Submitted', status: 'Completed', date: application.appliedDate },
    { label: 'Under Review', status: ['Under Review', 'Interview Scheduled', 'Interview Completed', 'Accepted', 'Rejected'].includes(application.status) ? 'Completed' : 'Pending', date: application.lastUpdated },
    { label: 'Interview Scheduled', status: ['Interview Scheduled', 'Interview Completed', 'Accepted', 'Rejected'].includes(application.status) ? 'Completed' : 'Pending', date: application.interviewDate || application.lastUpdated },
    { label: 'Decision', status: ['Accepted', 'Rejected'].includes(application.status) ? 'Completed' : 'Pending', date: application.lastUpdated },
  ];

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-5xl mx-auto space-y-6">
      
      <div className="flex items-center justify-between mb-6">
        <Link to="/dashboard/opportunities/applications" className="text-sm font-medium text-gray-500 hover:text-[#0098c8] flex items-center transition-colors">
          <ArrowLeft size={16} className="mr-1" /> Back to My Applications
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm p-6 md:p-8">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
              <div>
                <h1 className="text-2xl font-black text-gray-900 dark:text-white mb-2">{opportunity.title}</h1>
                <div className="flex items-center text-gray-500 dark:text-gray-400 font-medium text-sm">
                  <Building size={16} className="mr-2" /> {provider.name}
                </div>
              </div>
              <span className={`px-3 py-1.5 rounded-lg text-sm font-bold uppercase tracking-wider ${
                application.status === 'Accepted' ? 'bg-emerald-100 text-emerald-700' :
                application.status === 'Rejected' ? 'bg-red-100 text-red-700' :
                application.status === 'Interview Scheduled' ? 'bg-purple-100 text-purple-700' :
                'bg-blue-100 text-blue-700'
              }`}>
                {application.status}
              </span>
            </div>

            <div className="space-y-6 mt-10">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Application Status</h3>
              
              {/* Timeline */}
              <div className="relative pl-6 space-y-8 before:absolute before:inset-0 before:ml-[11px] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-200 dark:before:via-gray-700 before:to-transparent">
                {steps.map((step, idx) => (
                  <div key={idx} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                    <div className={`flex items-center justify-center w-6 h-6 rounded-full border-2 bg-white dark:bg-gray-900 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-sm ${
                      step.status === 'Completed' ? 'border-[#0098c8] text-[#0098c8]' : 'border-gray-300 dark:border-gray-600 text-gray-300 dark:text-gray-600'
                    }`}>
                      {step.status === 'Completed' ? <CheckCircle2 size={14} /> : <Circle size={14} />}
                    </div>
                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/30">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className={`font-bold text-sm ${step.status === 'Completed' ? 'text-gray-900 dark:text-white' : 'text-gray-500'}`}>{step.label}</h4>
                      </div>
                      <time className="text-xs font-medium text-gray-500 flex items-center">
                        <Calendar size={12} className="mr-1" /> {format(parseISO(step.date), 'MMM d, yyyy')}
                      </time>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {application.status === 'Interview Scheduled' && application.interviewDate && (
              <div className="mt-10 bg-purple-50 dark:bg-purple-900/20 border border-purple-100 dark:border-purple-800 rounded-xl p-5 flex items-start">
                <Info className="text-purple-600 shrink-0 mt-0.5 mr-3" size={20} />
                <div>
                  <h4 className="font-bold text-purple-900 dark:text-purple-300 mb-1">Interview Scheduled</h4>
                  <p className="text-sm text-purple-700 dark:text-purple-400">Your interview is scheduled for {format(parseISO(application.interviewDate), 'MMMM do, yyyy')}. Please check your email for the meeting link and instructions.</p>
                </div>
              </div>
            )}
            
            {(application.status === 'Accepted' || application.status === 'Rejected') && (
              <div className={`mt-10 border rounded-xl p-5 flex items-start ${application.status === 'Accepted' ? 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-100 dark:border-emerald-800' : 'bg-red-50 dark:bg-red-900/20 border-red-100 dark:border-red-800'}`}>
                <Info className={`shrink-0 mt-0.5 mr-3 ${application.status === 'Accepted' ? 'text-emerald-600' : 'text-red-600'}`} size={20} />
                <div>
                  <h4 className={`font-bold mb-1 ${application.status === 'Accepted' ? 'text-emerald-900 dark:text-emerald-300' : 'text-red-900 dark:text-red-300'}`}>Decision Reached</h4>
                  <p className={`text-sm ${application.status === 'Accepted' ? 'text-emerald-700 dark:text-emerald-400' : 'text-red-700 dark:text-red-400'}`}>
                    {application.notes}
                  </p>
                </div>
              </div>
            )}

          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm p-6">
            <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-4">Application Info</h3>
            <div className="space-y-4">
              <div>
                <p className="text-xs font-bold text-gray-500 mb-1">Application ID</p>
                <p className="text-sm font-medium text-gray-900 dark:text-white">{application.id}</p>
              </div>
              <div>
                <p className="text-xs font-bold text-gray-500 mb-1">Applied On</p>
                <p className="text-sm font-medium text-gray-900 dark:text-white">{format(parseISO(application.appliedDate), 'MMMM d, yyyy')}</p>
              </div>
              <div>
                <p className="text-xs font-bold text-gray-500 mb-1">Last Updated</p>
                <p className="text-sm font-medium text-gray-900 dark:text-white">{format(parseISO(application.lastUpdated), 'MMMM d, yyyy')}</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm p-6">
            <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-4">Submitted Documents</h3>
            <ul className="space-y-3">
              {opportunity.requiredDocuments.map((doc, i) => (
                <li key={i} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-100 dark:border-gray-700">
                  <div className="flex items-center">
                    <FileText size={16} className="text-gray-400 mr-2" />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{doc}</span>
                  </div>
                  <button className="text-xs font-bold text-[#0098c8] hover:underline">View</button>
                </li>
              ))}
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
};
