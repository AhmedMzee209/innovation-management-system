import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useMutation } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { EmailInput } from './EmailInput';
import { PasswordInput } from './PasswordInput';
import { RememberMe } from './RememberMe';
import { LoadingButton } from './LoadingButton';
import { ErrorMessage } from './ErrorMessage';
import { SocialLoginButtons } from './SocialLoginButtons';
import { loginStart, loginSuccess, loginFailure, setRememberMe, mapUserResponseToProfile } from '@/store/slices/authSlice';
import { RootState } from '@/store';
import { authService } from '@/services/auth/auth.service';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  rememberMe: z.boolean().default(false),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error } = useSelector((state: RootState) => state.auth);
  
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      rememberMe: false,
    },
  });

  const loginMutation = useMutation({
    mutationFn: (data: LoginFormValues) => authService.login({ email: data.email, password: data.password }),
    onSuccess: (response, variables) => {
      // Store tokens
      if (variables.rememberMe) {
        localStorage.setItem('rememberMe', 'true');
      } else {
        localStorage.removeItem('rememberMe');
      }
      localStorage.setItem('token', response.data.accessToken);
      localStorage.setItem('refreshToken', response.data.refreshToken);

      dispatch(loginSuccess({ 
        user: mapUserResponseToProfile(response.data.user as any), 
        token: response.data.accessToken 
      }));

      Swal.fire({
        html: `
          <div class="flex flex-col items-center justify-center">
            <h2 class="text-lg font-bold text-[#0d2137] mb-2">Welcome Back!</h2>
            <div class="animate-spin rounded-full h-8 w-8 border-[3px] border-gray-100 border-t-[#0098c8] mb-2"></div>
            <p class="text-xs text-gray-500 font-medium">Preparing your dashboard...</p>
          </div>
        `,
        showConfirmButton: false,
        timer: 2000,
        width: '18rem',
        padding: '1.25rem',
        background: '#ffffff',
        customClass: {
          popup: 'rounded-2xl shadow-xl border border-gray-100',
        }
      }).then(() => {
        navigate('/dashboard');
      });
    },
    onError: (err: any) => {
      const msg = err?.response?.data?.message || err?.response?.data?.error || 'Invalid email or password. Please try again.';
      dispatch(loginFailure(msg));
    }
  });

  const onSubmit = (data: LoginFormValues) => {
    dispatch(loginStart());
    dispatch(setRememberMe(data.rememberMe));
    loginMutation.mutate(data);
  };

  return (
    <div className="w-full">
      <ErrorMessage message={error || ''} />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <EmailInput
          {...register('email')}
          error={errors.email?.message}
          placeholder="Enter your email address"
        />

        <PasswordInput
          {...register('password')}
          error={errors.password?.message}
          placeholder="Enter your password"
        />

        <div className="flex items-center justify-between mt-2">
          <RememberMe {...register('rememberMe')} />
          <Link
            to="/forgot-password"
            className="text-sm font-bold text-[#0098c8] hover:text-[#0d2137] dark:hover:text-[#e8b800] transition-colors"
          >
            Forgot Password?
          </Link>
        </div>

        <LoadingButton
          type="submit"
          loading={loginMutation.isPending}
          className="mt-6"
        >
          Sign In to Portal
        </LoadingButton>
      </form>

      <SocialLoginButtons />
    </div>
  );
};
