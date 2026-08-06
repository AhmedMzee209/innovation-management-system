import { useParams, Link } from 'react-router-dom';
import { MOCK_REVIEWS } from '@/data/mockReviews';
import { MOCK_INNOVATIONS } from '@/data/mockInnovations';
import { MOCK_USERS } from '@/data/mockUsers';
import { ReviewStatusBadge } from '@/components/dashboard/reviews/cards/ReviewStatusBadge';
import { ArrowLeft, CheckCircle2, MessageSquare, ExternalLink, Calendar, FileText, UserCircle } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { UserAvatar } from '@/components/dashboard/users/UserAvatar';
import { cn } from '@/lib/utils';

export const ReviewDetails = () => {
  const { id } = useParams();
  const review = MOCK_REVIEWS.find(r => r.id === id);
  const innovation = MOCK_INNOVATIONS.find(i => i.id === review?.innovationId);
  const reviewer = MOCK_USERS[review?.reviewerId || ''];

  if (!review || !innovation) return <div className="p-8 text-center text-gray-500">Review not found</div>;

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <Link to="/dashboard/reviews" className="flex items-center text-sm font-medium text-gray-500 hover:text-[#0098c8] transition-colors">
          <ArrowLeft size={16} className="mr-1.5" /> Back to Queue
        </Link>
        {review.status !== 'Evaluated' && (
          <Link 
            to={`/dashboard/reviews/${review.id}/evaluate`}
            className="px-5 py-2 bg-[#0098c8] text-white rounded-lg text-sm font-bold hover:bg-[#007aa3] transition-colors shadow-sm"
          >
            Start Evaluation
          </Link>
        )}
      </div>

      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm p-6 mb-6">
        <div className="flex items-center space-x-3 mb-3">
          <span className="text-xl font-bold text-gray-900 dark:text-white">Review: {innovation.title}</span>
          <span className="text-sm text-gray-500 font-mono">#{review.id}</span>
        </div>
        
        <div className="flex items-center space-x-4 text-sm mb-6">
          <ReviewStatusBadge status={review.status} />
          <div className="flex items-center text-gray-500">
            <UserAvatar firstName={reviewer?.firstName} lastName={reviewer?.lastName} size="sm" className="mr-2" />
            Assigned to {reviewer?.firstName}
          </div>
          <div className="flex items-center text-gray-500">
            <Calendar size={14} className="mr-1" />
            Due {format(parseISO(review.deadlineDate), 'MMM d, yyyy')}
          </div>
        </div>
        <p className="text-gray-600 dark:text-gray-300">{innovation.shortDescription}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Innovation Context */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm overflow-hidden">
            <div className="p-4 border-b border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/50 flex justify-between items-center">
              <h3 className="text-sm font-bold text-gray-900 dark:text-white flex items-center">
                <FileText size={16} className="mr-2 text-gray-400" /> Application Details
              </h3>
              <Link to={`/dashboard/innovations/${innovation.id}`} className="text-xs text-[#0098c8] font-medium flex items-center hover:underline">
                View Full Profile <ExternalLink size={12} className="ml-1" />
              </Link>
            </div>
            <div className="p-6 space-y-6">
              <div>
                <h4 className="text-xs font-bold uppercase text-gray-500 mb-2">Problem Statement</h4>
                <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{innovation.problemStatement}</p>
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase text-gray-500 mb-2">Proposed Solution</h4>
                <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{innovation.proposedSolution}</p>
              </div>
              <div className="grid grid-cols-2 gap-6 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-100 dark:border-gray-800">
                 <div>
                  <h4 className="text-xs font-bold text-gray-500 mb-1">Target Beneficiaries</h4>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{innovation.targetBeneficiaries}</p>
                 </div>
                 <div>
                  <h4 className="text-xs font-bold text-gray-500 mb-1">Expected Revenue</h4>
                  <p className="text-sm font-medium text-green-600 dark:text-green-400">${innovation.expectedRevenue.toLocaleString()}</p>
                 </div>
              </div>
            </div>
          </div>

          {/* Review Results if Evaluated */}
          {review.status === 'Evaluated' && (
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Final Evaluation Report</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 text-center">
                <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700">
                  <p className="text-xs font-bold uppercase text-gray-500 mb-1">Score</p>
                  <p className="text-2xl font-black text-gray-900 dark:text-white">{review.totalScore}<span className="text-sm text-gray-500">/{review.maxScore}</span></p>
                </div>
                <div className={cn(
                  "p-4 rounded-lg border md:col-span-2 flex flex-col justify-center items-center",
                  review.decision === 'Approve' ? "bg-green-50 border-green-200 text-green-800 dark:bg-green-900/10 dark:border-green-900/30" : 
                  review.decision === 'Reject' ? "bg-red-50 border-red-200 text-red-800 dark:bg-red-900/10 dark:border-red-900/30" :
                  "bg-amber-50 border-amber-200 text-amber-800 dark:bg-amber-900/10 dark:border-amber-900/30"
                )}>
                  <p className="text-xs font-bold uppercase mb-1 opacity-70">Final Decision</p>
                  <p className="text-xl font-black">{review.decision}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-bold text-green-600 dark:text-green-500 mb-1">Key Strengths</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300">{review.strengths}</p>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-red-600 dark:text-red-500 mb-1">Key Weaknesses</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300">{review.weaknesses}</p>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-amber-600 dark:text-amber-500 mb-1">Recommendations</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300">{review.recommendations}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Column - Timeline / Comments */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm p-6">
            <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-6 flex items-center">
              <MessageSquare size={16} className="mr-2 text-gray-400" /> Activity Feed
            </h3>
            
            <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px before:h-full before:w-0.5 before:bg-gray-200 dark:before:bg-gray-800">
              {review.timeline.map((evt, idx) => (
                <div key={evt.id} className="relative flex items-start space-x-3">
                  <div className="w-10 h-10 rounded-full border-4 border-white dark:border-gray-900 bg-gray-100 dark:bg-gray-800 flex items-center justify-center shrink-0 z-10 text-gray-500">
                    <UserCircle size={18} />
                  </div>
                  <div className="flex-1 pt-1">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm font-bold text-gray-900 dark:text-white">{evt.actorName}</p>
                      <p className="text-xs text-gray-500">{format(parseISO(evt.date), 'MMM d, h:mm a')}</p>
                    </div>
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{evt.action}</p>
                    {evt.comment && (
                      <div className="mt-2 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg text-sm text-gray-600 dark:text-gray-400 border border-gray-100 dark:border-gray-800">
                        {evt.comment}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {review.status !== 'Evaluated' && (
              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-800">
                <textarea rows={3} className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:ring-2 focus:ring-[#0098c8] bg-gray-50 dark:bg-gray-800/50 mb-3" placeholder="Leave a comment or internal note..." />
                <button className="px-4 py-2 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded-lg text-sm font-bold hover:bg-gray-800 dark:hover:bg-white transition-colors w-full">
                  Post Comment
                </button>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
