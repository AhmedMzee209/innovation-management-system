import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Link } from 'react-router-dom';
import { EmailInput } from '@/components/auth/EmailInput';
import { LoadingButton } from '@/components/auth/LoadingButton';
import { SuccessMessage } from '@/components/auth/SuccessMessage';
import { AuthenticationCard } from '@/components/auth/AuthenticationCard';
import { AuthenticationFooter } from '@/components/auth/AuthenticationFooter';
import { ArrowLeft, KeyRound } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const forgotSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

type ForgotFormValues = z.infer<typeof forgotSchema>;

export const ForgotPassword = () => {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotFormValues>({
    resolver: zodResolver(forgotSchema),
  });

  const onSubmit = (data: ForgotFormValues) => {
    setStatus('loading');
    setTimeout(() => {
      setStatus('success');
    }, 1500);
  };

  return (
    <>
      <div className="absolute top-6 left-6 lg:top-8 lg:left-8">
        <Link to="/login" className="flex items-center space-x-2 text-sm font-bold text-gray-500 hover:text-[#0098c8] transition-colors">
          <ArrowLeft size={16} />
          <span>Back to Login</span>
        </Link>
      </div>

      <AuthenticationCard>
        <div className="flex justify-center mb-6">
          <div className="w-14 h-14 rounded-full bg-[#0098c8]/10 flex items-center justify-center">
            <KeyRound size={24} className="text-[#0098c8]" />
          </div>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight mb-2">
            Forgot Password?
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            No worries, we'll send you reset instructions.
          </p>
        </div>

        <AnimatePresence mode="wait">
          {status === 'success' ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-6"
            >
              <SuccessMessage message="Check your email. We've sent you a password reset link." />
              <Link to="/login" className="block">
                <button type="button" className="w-full py-2.5 px-4 bg-gray-100 hover:bg-gray-200 text-gray-900 rounded-xl font-bold transition-colors">
                  Return to Login
                </button>
              </Link>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-5"
            >
              <EmailInput
                {...register('email')}
                error={errors.email?.message}
                placeholder="Enter your email address"
              />

              <LoadingButton
                type="submit"
                loading={status === 'loading'}
                className="mt-2"
              >
                Reset Password
              </LoadingButton>
            </motion.form>
          )}
        </AnimatePresence>

        <AuthenticationFooter />
      </AuthenticationCard>
    </>
  );
};
