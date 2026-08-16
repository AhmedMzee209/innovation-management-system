import { useParams, Link } from 'react-router-dom';
import { useInnovationReviews, useMyAssignments } from '@/hooks/useReview';
import { useInnovation } from '@/hooks/useInnovation';
import { ReviewStatusBadge } from '@/components/dashboard/reviews/cards/ReviewStatusBadge';
import { ArrowLeft, MessageSquare, ExternalLink, Calendar, FileText, UserCircle, Loader2 } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { UserAvatar } from '@/components/dashboard/users/UserAvatar';
import { cn } from '@/lib/utils';
import { useState } from 'react';

export const ReviewDetails = () => {
  const { id: innovationId } = useParams();
  
  const { data: reviews = [], isLoading: isLoadingReviews } = useInnovationReviews(innovationId!);
  const { data: innovation, isLoading: isLoadingInnovation } = useInnovation(innovationId!);
  const { data: assignments = [], isLoading: isLoadingAssignments } = useMyAssignments();

  const [commentText, setCommentText] = useState('');

  if (isLoadingReviews || isLoadingInnovation || isLoadingAssignments) {
    return (
      <div className="flex items-center justify-center h-[50vh]">
        <Loader2 className="w-8 h-8 text-[#0098c8] animate-spin" />
      </div>
    );
  }

  // Find the review and assignment for this innovation
  const review = reviews.length > 0 ? reviews[0] : null;
  const assignment = assignments.find(a => a.innovationId === innovationId);

  if (!innovation || (!review && !assignment)) {
    return <div className="p-8 text-center text-gray-500">Review not found</div>;
  }

  // Display status from review if exists, else from assignment
  const currentStatus = review?.status || assignment?.status || 'PENDING';
  const deadline = assignment?.deadline || new Date().toISOString();
  
  // Reviewer details from assignment
  const reviewerName = review?.assignment?.reviewerName || assignment?.reviewerName || 'Reviewer';
  const reviewerFirstName = reviewerName.split(' ')[0] || 'R';
  const reviewerLastName = reviewerName.split(' ')[1] || 'V';

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <Link to="/dashboard/reviews" className="flex items-center text-sm font-medium text-gray-500 hover:text-[#0098c8] transition-colors">
          <ArrowLeft size={16} className="mr-1.5" /> Back to Queue
        </Link>
        {currentStatus !== 'COMPLETED' && (
          <Link 
            to={`/dashboard/reviews/evaluate/${innovation.id}`}
            className="px-5 py-2 bg-[#0098c8] text-white rounded-lg text-sm font-bold hover:bg-[#007aa3] transition-colors shadow-sm"
          >
            Start Evaluation
          </Link>
        )}
      </div>

      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm p-6 mb-6">
        <div className="flex items-center space-x-3 mb-3">
          <span className="text-xl font-bold text-gray-900 dark:text-white">Review: {innovation.title}</span>
          <span className="text-sm text-gray-500 font-mono">#{review?.id || assignment?.id}</span>
        </div>
        
        <div className="flex flex-wrap gap-4 items-center text-sm mb-6">
          <ReviewStatusBadge status={currentStatus} />
          <div className="flex items-center text-gray-500">
            <UserAvatar firstName={reviewerFirstName} lastName={reviewerLastName} size="sm" className="mr-2" />
            Assigned to {reviewerName}
          </div>
          <div className="flex items-center text-gray-500">
            <Calendar size={14} className="mr-1" />
            Due {format(parseISO(deadline), 'MMM d, yyyy')}
          </div>
        </div>
        <p className="text-gray-600 dark:text-gray-300">{innovation.abstractText}</p>
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
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{innovation.targetBeneficiaries || 'N/A'}</p>
                 </div>
                 <div>
                  <h4 className="text-xs font-bold text-gray-500 mb-1">Innovation Level</h4>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {innovation.innovationLevel || 'N/A'}
                  </p>
                 </div>
              </div>
            </div>
          </div>

          {/* Review Results if Evaluated */}
          {review && currentStatus === 'COMPLETED' && (
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Final Evaluation Report</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 text-center">
                <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700">
                  <p className="text-xs font-bold uppercase text-gray-500 mb-1">Score</p>
                  <p className="text-2xl font-black text-gray-900 dark:text-white">
                    {review.overallScore}
                  </p>
                </div>
                <div className={cn(
                  "p-4 rounded-lg border md:col-span-2 flex flex-col justify-center items-center",
                  review.decision === 'APPROVE' || review.decision === 'RECOMMEND_INCUBATION' ? "bg-green-50 border-green-200 text-green-800 dark:bg-green-900/10 dark:border-green-900/30" : 
                  review.decision === 'REJECT' ? "bg-red-50 border-red-200 text-red-800 dark:bg-red-900/10 dark:border-red-900/30" :
                  "bg-amber-50 border-amber-200 text-amber-800 dark:bg-amber-900/10 dark:border-amber-900/30"
                )}>
                  <p className="text-xs font-bold uppercase mb-1 opacity-70">Final Decision</p>
                  <p className="text-xl font-black">{review.decision.replace('_', ' ')}</p>
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
              <MessageSquare size={16} className="mr-2 text-gray-400" /> Comments
            </h3>
            
            <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px before:h-full before:w-0.5 before:bg-gray-200 dark:before:bg-gray-800">
              {review?.comments?.map((c) => (
                <div key={c.id} className="relative flex items-start space-x-3">
                  <div className="w-10 h-10 rounded-full border-4 border-white dark:border-gray-900 bg-gray-100 dark:bg-gray-800 flex items-center justify-center shrink-0 z-10 text-gray-500">
                    <UserCircle size={18} />
                  </div>
                  <div className="flex-1 pt-1">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm font-bold text-gray-900 dark:text-white">{c.authorName}</p>
                      <p className="text-xs text-gray-500">{format(parseISO(c.createdAt), 'MMM d, h:mm a')}</p>
                    </div>
                    <div className="mt-2 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg text-sm text-gray-600 dark:text-gray-400 border border-gray-100 dark:border-gray-800">
                      {c.comment}
                    </div>
                  </div>
                </div>
              ))}
              {(!review?.comments || review.comments.length === 0) && (
                <div className="text-sm text-gray-500 ml-12 pb-4">No comments yet.</div>
              )}
            </div>

            {currentStatus !== 'COMPLETED' && (
              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-800">
                <textarea 
                  rows={3} 
                  className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:ring-2 focus:ring-[#0098c8] bg-gray-50 dark:bg-gray-800/50 mb-3" 
                  placeholder="Leave a comment or internal note..." 
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                />
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
