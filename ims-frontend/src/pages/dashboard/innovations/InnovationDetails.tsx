import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Building2, MapPin, Globe, CheckCircle2, FileText, Download, UserCircle, Rocket, Edit, Clock } from 'lucide-react';
import { MOCK_INNOVATIONS } from '@/data/mockInnovations';
import { MOCK_SCHOOLS, MOCK_HUBS } from '@/data/mockOrganization';
import { MOCK_USERS } from '@/data/mockUsers';
import { StatusBadge } from '@/components/dashboard/innovations/cards/StatusBadge';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { UserAvatar } from '@/components/dashboard/users/UserAvatar';

export const InnovationDetails = () => {
  const { id } = useParams();
  const innovation = MOCK_INNOVATIONS.find(i => i.id === id) || MOCK_INNOVATIONS[0];
  const school = MOCK_SCHOOLS.find(s => s.id === innovation.schoolId);
  const hub = MOCK_HUBS.find(h => h.id === innovation.hubId);
  const owner = MOCK_USERS[innovation.ownerId] || Object.values(MOCK_USERS)[0];

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      {/* Header Controls */}
      <div className="flex items-center justify-between mb-2">
        <Link to="/dashboard/innovations" className="flex items-center text-sm font-medium text-gray-500 hover:text-[#0098c8] transition-colors">
          <ArrowLeft size={16} className="mr-1.5" /> Back to Innovations
        </Link>
        <div className="flex space-x-3">
          <button className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors shadow-sm flex items-center">
            <Download size={16} className="mr-2" /> Export PDF
          </button>
          <button className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-[#0098c8] rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors shadow-sm flex items-center">
            <Edit size={16} className="mr-2" /> Edit
          </button>
        </div>
      </div>

      {/* Hero Banner */}
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm p-6 lg:p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#0098c8]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
        
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 relative z-10">
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-4">
              <span className="text-xs font-mono font-bold text-gray-500 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                {innovation.code}
              </span>
              <StatusBadge stage={innovation.stage} />
              <span className="text-xs font-bold text-[#0098c8] bg-blue-50 dark:bg-blue-900/20 px-2 py-1 rounded border border-blue-100 dark:border-blue-900/30">
                {innovation.categoryId}
              </span>
            </div>
            <h1 className="text-3xl font-black text-gray-900 dark:text-white leading-tight mb-4">
              {innovation.title}
            </h1>
            <p className="text-gray-600 dark:text-gray-300 text-lg max-w-3xl leading-relaxed mb-6">
              {innovation.shortDescription}
            </p>
            
            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center text-gray-500">
                <Building2 size={16} className="mr-2 text-gray-400" />
                {school?.name}
              </div>
              <div className="flex items-center text-gray-500">
                <Globe size={16} className="mr-2 text-gray-400" />
                {hub?.name}
              </div>
            </div>
          </div>

          <div className="w-full md:w-64 shrink-0 bg-gray-50 dark:bg-gray-800/50 rounded-xl p-5 border border-gray-100 dark:border-gray-800">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-4">Primary Innovator</h3>
            <div className="flex items-center space-x-3 mb-4">
              <UserAvatar firstName={owner.firstName} lastName={owner.lastName} size="md" />
              <div>
                <p className="font-bold text-gray-900 dark:text-white">{owner.firstName} {owner.lastName}</p>
                <p className="text-xs text-gray-500">{owner.email}</p>
              </div>
            </div>
            <div className="space-y-2 pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex justify-between text-xs">
                <span className="text-gray-500">Submitted:</span>
                <span className="font-medium text-gray-900 dark:text-white">{format(new Date(innovation.submissionDate), 'MMM d, yyyy')}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-gray-500">Last Update:</span>
                <span className="font-medium text-gray-900 dark:text-white">{format(new Date(innovation.lastUpdated), 'MMM d, yyyy')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Main Details */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm p-6 lg:p-8">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Innovation Details</h2>
            
            <div className="space-y-8">
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#0098c8] mb-2">Problem Statement</h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">{innovation.problemStatement}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#0098c8] mb-2">Proposed Solution</h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">{innovation.proposedSolution}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-gray-100 dark:border-gray-800">
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-3">Objectives</h3>
                  <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{innovation.objectives}</p>
                </div>
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-3">Target Beneficiaries</h3>
                  <p className="text-sm text-gray-700 dark:text-gray-300">{innovation.targetBeneficiaries}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm p-6 lg:p-8">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Business & Commercialization</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl border border-gray-100 dark:border-gray-800">
                <p className="text-xs font-bold uppercase text-gray-500 mb-1">Estimated Cost</p>
                <p className="text-2xl font-black text-gray-900 dark:text-white">${innovation.estimatedCost.toLocaleString()}</p>
              </div>
              <div className="bg-green-50 dark:bg-green-900/10 p-4 rounded-xl border border-green-100 dark:border-green-900/30">
                <p className="text-xs font-bold uppercase text-green-600 dark:text-green-500 mb-1">Expected Revenue (Yr 1)</p>
                <p className="text-2xl font-black text-green-700 dark:text-green-400">${innovation.expectedRevenue.toLocaleString()}</p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-2">Market Opportunity</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{innovation.marketOpportunity}</p>
              </div>
              <div>
                <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-2">Competitive Landscape</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{innovation.competitors}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          
          {/* Progress Tracker */}
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm p-6">
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900 dark:text-white mb-4">Lifecycle Progress</h3>
            
            <div className="flex justify-between text-xs mb-2">
              <span className="font-medium text-gray-500">{innovation.stage}</span>
              <span className="font-bold text-[#0098c8]">{innovation.progress}%</span>
            </div>
            <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-2 mb-6 overflow-hidden">
              <div 
                className="bg-[#0098c8] h-2 rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${innovation.progress}%` }}
              ></div>
            </div>

            <div className="space-y-4 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-200 dark:before:via-gray-700 before:to-transparent">
              {innovation.timeline.map((evt, idx) => (
                <div key={evt.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white dark:border-gray-900 bg-blue-100 text-[#0098c8] dark:bg-[#0098c8]/20 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-sm relative z-10">
                    <CheckCircle2 size={16} />
                  </div>
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50 shadow-sm">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="text-sm font-bold text-gray-900 dark:text-white">{evt.stage}</h4>
                    </div>
                    <p className="text-xs text-gray-500 mb-2">{format(new Date(evt.date), 'MMM d, yyyy h:mm a')}</p>
                    {evt.comment && <p className="text-xs text-gray-600 dark:text-gray-400 italic">"{evt.comment}"</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Documents */}
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm p-6">
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900 dark:text-white mb-4">Attached Documents</h3>
            <div className="space-y-3">
              {innovation.documents.map(doc => (
                <div key={doc.id} className="flex items-center p-3 border border-gray-100 dark:border-gray-800 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 flex items-center justify-center mr-3 shrink-0">
                    <FileText size={18} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{doc.name}</p>
                    <p className="text-xs text-gray-500">{doc.size} • {format(new Date(doc.uploadDate), 'MMM d')}</p>
                  </div>
                  <a href={doc.url} className="p-2 text-gray-400 hover:text-[#0098c8] opacity-0 group-hover:opacity-100 transition-all">
                    <Download size={16} />
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Team Members */}
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm p-6">
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900 dark:text-white mb-4">Team Members</h3>
            <div className="space-y-4">
              {innovation.teamMembers.map((member, i) => (
                <div key={i} className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-500">
                    <UserCircle size={18} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{member.name}</p>
                    <p className="text-xs text-gray-500">{member.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
