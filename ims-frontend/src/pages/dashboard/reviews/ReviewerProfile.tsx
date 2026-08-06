import { MOCK_REVIEWERS, MOCK_REVIEWS } from '@/data/mockReviews';
import { UserAvatar } from '@/components/dashboard/users/UserAvatar';
import { Star, CheckCircle, Clock, Award } from 'lucide-react';

export const ReviewerProfile = () => {
  // Demo using the first reviewer
  const reviewer = MOCK_REVIEWERS[0];
  const reviews = MOCK_REVIEWS.filter(r => r.reviewerId === reviewer.id);
  const completed = reviews.filter(r => r.status === 'Evaluated');
  
  const avgScore = completed.length > 0 
    ? (completed.reduce((acc, curr) => acc + curr.totalScore, 0) / completed.length).toFixed(1)
    : 0;

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-[#0098c8] to-[#0d2137]"></div>
        <div className="px-8 pb-8 relative">
          <div className="flex justify-between items-end -mt-12 mb-6">
            <div className="p-1 bg-white dark:bg-gray-900 rounded-full inline-block">
              <UserAvatar firstName={reviewer.firstName} lastName={reviewer.lastName} size="xl" />
            </div>
            <button className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors shadow-sm">
              Edit Profile
            </button>
          </div>
          
          <h1 className="text-3xl font-black text-gray-900 dark:text-white mb-1">
            {reviewer.firstName} {reviewer.lastName}
          </h1>
          <p className="text-gray-500 font-medium mb-6">{reviewer.email} • {reviewer.role.replace('ROLE_', '')}</p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-gray-100 dark:border-gray-800">
            <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
              <div className="flex items-center text-gray-500 mb-1">
                <CheckCircle size={16} className="mr-2" /> <span className="text-xs font-bold uppercase tracking-wider">Completed</span>
              </div>
              <p className="text-2xl font-black text-gray-900 dark:text-white">{completed.length}</p>
            </div>
            <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
              <div className="flex items-center text-gray-500 mb-1">
                <Clock size={16} className="mr-2" /> <span className="text-xs font-bold uppercase tracking-wider">Pending</span>
              </div>
              <p className="text-2xl font-black text-gray-900 dark:text-white">{reviews.length - completed.length}</p>
            </div>
            <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
              <div className="flex items-center text-gray-500 mb-1">
                <Star size={16} className="mr-2" /> <span className="text-xs font-bold uppercase tracking-wider">Avg Score Given</span>
              </div>
              <p className="text-2xl font-black text-gray-900 dark:text-white">{avgScore}</p>
            </div>
            <div className="p-4 bg-[#0098c8]/10 rounded-xl border border-[#0098c8]/20 text-[#0098c8]">
              <div className="flex items-center mb-1">
                <Award size={16} className="mr-2" /> <span className="text-xs font-bold uppercase tracking-wider">Reviewer Level</span>
              </div>
              <p className="text-2xl font-black">Expert</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
