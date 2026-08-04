import { Link } from 'react-router-dom';
import { AuthenticationCard } from '@/components/auth/AuthenticationCard';
import { Clock } from 'lucide-react';

export const SessionExpired = () => {
  return (
    <AuthenticationCard>
      <div className="flex flex-col items-center justify-center text-center py-6">
        <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4">
          <Clock className="text-orange-500" size={32} />
        </div>
        
        <h1 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight mb-2">
          Session Expired
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
          Your session has timed out due to inactivity. Please log in again to continue working.
        </p>

        <Link to="/login" className="w-full">
          <button type="button" className="w-full py-2.5 px-4 bg-[#0d2137] text-white rounded-xl font-bold hover:bg-[#1a365d] transition-colors shadow-sm">
            Return to Login
          </button>
        </Link>
      </div>
    </AuthenticationCard>
  );
};
