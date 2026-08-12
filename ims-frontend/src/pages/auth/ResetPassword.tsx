import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { authService } from '@/services/auth/auth.service';
import { PasswordInput } from '@/components/auth/PasswordInput';
import { LoadingButton } from '@/components/auth/LoadingButton';
import { PasswordStrength } from '@/components/auth/PasswordStrength';
import { SuccessMessage } from '@/components/auth/SuccessMessage';
import { AuthenticationCard } from '@/components/auth/AuthenticationCard';
import { LockKeyhole } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const resetSchema = z.object({
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type ResetFormValues = z.infer<typeof resetSchema>;

export const ResetPassword = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ResetFormValues>({
    resolver: zodResolver(resetSchema),
  });

  const currentPassword = watch('password', '');

  const resetMutation = useMutation({
    mutationFn: (data: ResetFormValues) => authService.resetPassword({ token, password: data.password }),
    onSuccess: () => {
      setIsSuccess(true);
      setErrorMsg(null);
      setTimeout(() => navigate('/login'), 2000);
    },
    onError: (err: any) => {
      setErrorMsg(err?.response?.data?.message || err?.response?.data?.error || 'Failed to reset password. The link might be expired.');
    }
  });

  const onSubmit = (data: ResetFormValues) => {
    resetMutation.mutate(data);
  };

  return (
    <AuthenticationCard>
      <div className="flex justify-center mb-6">
        <div className="w-14 h-14 rounded-full bg-[#e8b800]/10 flex items-center justify-center">
          <LockKeyhole size={24} className="text-[#e8b800]" />
        </div>
      </div>

      <div className="text-center mb-8">
        <h1 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight mb-2">
          Set New Password
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Your new password must be different from previous used passwords.
        </p>
      </div>

      <AnimatePresence mode="wait">
        {isSuccess ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-6"
          >
            <SuccessMessage message="Password has been reset successfully. Redirecting to login..." />
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
            <div>
              <PasswordInput
                {...register('password')}
                error={errors.password?.message}
                label="New Password"
                placeholder="Must be at least 8 characters"
              />
              <PasswordStrength password={currentPassword} />
            </div>

            <PasswordInput
              {...register('confirmPassword')}
              error={errors.confirmPassword?.message}
              label="Confirm Password"
              placeholder="Confirm your new password"
            />

            {errorMsg && (
              <div className="text-red-500 text-sm font-medium mt-2">
                {errorMsg}
              </div>
            )}

            <LoadingButton
              type="submit"
              loading={resetMutation.isPending}
              className="mt-6"
            >
              Reset Password
            </LoadingButton>
          </motion.form>
        )}
      </AnimatePresence>
    </AuthenticationCard>
  );
};
