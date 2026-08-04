import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthenticationCard } from '@/components/auth/AuthenticationCard';
import { LoadingButton } from '@/components/auth/LoadingButton';
import { MailCheck, XCircle, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

export const VerifyEmail = () => {
  const [status, setStatus] = useState<'verifying' | 'success' | 'failed'>('verifying');
  const [isResending, setIsResending] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate verification process
    const timer = setTimeout(() => {
      // Randomly fail or succeed for demo purposes
      setStatus(Math.random() > 0.5 ? 'success' : 'failed');
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleResend = () => {
    setIsResending(true);
    setTimeout(() => {
      setIsResending(false);
      setStatus('verifying'); // trigger re-verify
    }, 1500);
  };

  return (
    <AuthenticationCard>
      <div className="flex flex-col items-center justify-center text-center py-6">
        
        {status === 'verifying' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center space-y-4">
            <Loader2 className="animate-spin text-[#0098c8]" size={48} />
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Verifying your email...</h2>
            <p className="text-sm text-gray-500">Please wait while we confirm your email address.</p>
          </motion.div>
        )}

        {status === 'success' && (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center space-y-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <MailCheck className="text-green-600" size={32} />
            </div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Email Verified!</h2>
            <p className="text-sm text-gray-500 px-4">
              Your email address has been successfully verified. You can now log in to the IMS platform.
            </p>
            <button
              onClick={() => navigate('/login')}
              className="mt-6 w-full py-2.5 px-4 bg-[#0d2137] text-white rounded-xl font-bold hover:bg-[#1a365d] transition-colors"
            >
              Continue to Login
            </button>
          </motion.div>
        )}

        {status === 'failed' && (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center space-y-4 w-full">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
              <XCircle className="text-red-600" size={32} />
            </div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Verification Failed</h2>
            <p className="text-sm text-gray-500 px-4 mb-4">
              The verification link is invalid or has expired. Please request a new link.
            </p>
            
            <LoadingButton loading={isResending} onClick={handleResend} className="w-full">
              Resend Verification Link
            </LoadingButton>
            
            <Link to="/login" className="text-sm font-bold text-gray-500 hover:text-gray-900 mt-4 block">
              Back to Login
            </Link>
          </motion.div>
        )}

      </div>
    </AuthenticationCard>
  );
};
