import { useParams, Link } from 'react-router-dom';
import { MOCK_OPPORTUNITIES, MOCK_PROVIDERS, OPPORTUNITY_CATEGORIES } from '@/data/mockOpportunities';
import { ArrowLeft, MapPin, Clock, Briefcase, GraduationCap, Building, ExternalLink, Calendar, Users, Target, FileText, CheckCircle2 } from 'lucide-react';
import { format, parseISO, formatDistanceToNow, isPast } from 'date-fns';
import { cn } from '@/lib/utils';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { toggleBookmark } from '@/store/slices/opportunitySlice';

export const OpportunityDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  
  const opportunity = MOCK_OPPORTUNITIES.find(o => o.id === id);
  const provider = MOCK_PROVIDERS.find(p => p.id === opportunity?.providerId);
  const category = OPPORTUNITY_CATEGORIES.find(c => c.id === opportunity?.categoryId);
  
  const isBookmarked = useSelector((state: RootState) => state.opportunity.bookmarkedIds.includes(id || ''));

  if (!opportunity || !provider) {
    return <div className="p-8 text-center text-gray-500">Opportunity not found</div>;
  }

  const deadlineDate = new Date(opportunity.deadline);
  const isExpired = isPast(deadlineDate);

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-5xl mx-auto space-y-6">
      
      <div className="flex items-center justify-between mb-6">
        <Link to="/dashboard/opportunities/marketplace" className="text-sm font-medium text-gray-500 hover:text-[#0098c8] flex items-center transition-colors">
          <ArrowLeft size={16} className="mr-1" /> Back to Marketplace
        </Link>
        <div className="flex gap-3">
          <button 
            onClick={() => dispatch(toggleBookmark(opportunity.id))}
            className="px-4 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-sm font-bold text-gray-700 dark:text-gray-300 hover:bg-gray-50 transition-colors shadow-sm"
          >
            {isBookmarked ? 'Saved' : 'Save'}
          </button>
          {!isExpired && (
            <button className="px-5 py-2 bg-[#0098c8] text-white rounded-xl text-sm font-bold hover:bg-[#007ba1] transition-colors shadow-sm">
              Apply Now
            </button>
          )}
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm overflow-hidden">
        {/* Banner */}
        <div className={cn("h-48 md:h-64 bg-gradient-to-r relative", opportunity.bannerColor)}>
          {/* Status Badge */}
          <div className="absolute top-4 right-4">
            <span className={cn("px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider backdrop-blur",
              isExpired ? "bg-red-500/20 text-white border border-red-500/30" : "bg-emerald-500/20 text-white border border-emerald-500/30"
            )}>
              {isExpired ? 'Closed' : 'Accepting Applications'}
            </span>
          </div>
        </div>

        <div className="px-6 md:px-10 relative pb-10">
          <img src={provider.logo} alt={provider.name} className="w-24 h-24 md:w-32 md:h-32 rounded-2xl border-4 border-white dark:border-gray-900 absolute -top-12 md:-top-16 bg-white object-cover shadow-sm" />
          
          <div className="pt-16 md:pt-20">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
              <div>
                <h1 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white mb-2">{opportunity.title}</h1>
                <div className="flex items-center text-gray-600 dark:text-gray-400 font-medium">
                  <Building size={18} className="mr-2" />
                  <Link to={`/dashboard/opportunities/providers/${provider.id}`} className="hover:text-[#0098c8] transition-colors">{provider.name}</Link>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 py-6 border-y border-gray-100 dark:border-gray-800">
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Opportunity Type</p>
                <div className="flex items-center font-bold text-gray-900 dark:text-white">
                  <Briefcase size={16} className="mr-2 text-blue-500" /> {opportunity.type}
                </div>
              </div>
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Location</p>
                <div className="flex items-center font-bold text-gray-900 dark:text-white">
                  <MapPin size={16} className="mr-2 text-purple-500" /> {opportunity.location}
                </div>
              </div>
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Deadline</p>
                <div className="flex items-center font-bold text-gray-900 dark:text-white">
                  <Clock size={16} className={cn("mr-2", isExpired ? "text-red-500" : "text-emerald-500")} /> 
                  {format(deadlineDate, 'MMM d, yyyy')}
                </div>
              </div>
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Posted On</p>
                <div className="flex items-center font-bold text-gray-900 dark:text-white">
                  <Calendar size={16} className="mr-2 text-gray-400" /> {format(parseISO(opportunity.postedDate), 'MMM d, yyyy')}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-10">
              
              {/* Main Content */}
              <div className="md:col-span-2 space-y-8">
                
                <section>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                    <FileText size={20} className="mr-2 text-[#0098c8]" /> Description
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">{opportunity.description}</p>
                </section>

                <section>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                    <Target size={20} className="mr-2 text-[#0098c8]" /> Benefits
                  </h2>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {opportunity.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-start bg-blue-50/50 dark:bg-blue-900/10 p-3 rounded-lg border border-blue-100 dark:border-blue-900/30">
                        <CheckCircle2 size={18} className="mr-2 text-blue-500 shrink-0 mt-0.5" />
                        <span className="text-sm font-medium text-gray-800 dark:text-gray-200">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </section>

                <section>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                    <Users size={20} className="mr-2 text-[#0098c8]" /> Selection Process
                  </h2>
                  <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-xl border border-gray-100 dark:border-gray-800">
                    <pre className="font-sans text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{opportunity.selectionProcess}</pre>
                  </div>
                </section>

              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                
                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6 border border-gray-100 dark:border-gray-800">
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-4">Eligibility Requirements</h3>
                  <div className="space-y-4">
                    <div>
                      <p className="text-xs font-bold text-gray-500 mb-1">Roles</p>
                      <div className="flex flex-wrap gap-1.5">
                        {opportunity.eligibleRoles.map(role => (
                          <span key={role} className="px-2 py-1 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600 rounded text-xs font-bold">{role.replace('ROLE_', '')}</span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-500 mb-1">Education Level</p>
                      <p className="text-sm font-medium text-gray-800 dark:text-gray-200">{opportunity.educationLevel.join(', ')}</p>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-500 mb-1">Experience</p>
                      <p className="text-sm font-medium text-gray-800 dark:text-gray-200">{opportunity.experience}</p>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-500 mb-1">Required Skills</p>
                      <div className="flex flex-wrap gap-1.5">
                        {opportunity.requiredSkills.map(skill => (
                          <span key={skill} className="px-2 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded text-xs font-bold">{skill}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6 border border-gray-100 dark:border-gray-800">
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-4">Required Documents</h3>
                  <ul className="space-y-2">
                    {opportunity.requiredDocuments.map((doc, i) => (
                      <li key={i} className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 before:content-['•'] before:mr-2 before:text-[#0098c8]">
                        {doc}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800 shadow-sm text-center">
                  <img src={provider.logo} alt={provider.name} className="w-16 h-16 rounded-full mx-auto mb-3" />
                  <h3 className="font-bold text-gray-900 dark:text-white mb-1">{provider.name}</h3>
                  <p className="text-xs text-gray-500 mb-4">{provider.type} • {provider.country}</p>
                  <a href={provider.website} target="_blank" rel="noreferrer" className="inline-flex items-center text-sm font-bold text-[#0098c8] hover:underline">
                    Visit Website <ExternalLink size={14} className="ml-1" />
                  </a>
                </div>

              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
