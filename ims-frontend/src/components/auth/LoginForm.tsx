import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { EmailInput } from './EmailInput';
import { PasswordInput } from './PasswordInput';
import { RememberMe } from './RememberMe';
import { LoadingButton } from './LoadingButton';
import { ErrorMessage } from './ErrorMessage';
import { SocialLoginButtons } from './SocialLoginButtons';
import { MOCK_USERS } from '@/data/mockUsers';
import { loginStart, loginSuccess, loginFailure, setRememberMe } from '@/store/slices/authSlice';
import { RootState } from '@/store';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Users } from 'lucide-react';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  rememberMe: z.boolean().default(false),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export const LoginForm = () => {
  const [showDemoAccounts, setShowDemoAccounts] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error } = useSelector((state: RootState) => state.auth);
  
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

  const onSubmit = async (data: LoginFormValues) => {
    dispatch(loginStart());
    dispatch(setRememberMe(data.rememberMe));

    // Simulate network request
    setTimeout(() => {
      // Dummy authentication logic
      const userKey = Object.keys(MOCK_USERS).find((key) => MOCK_USERS[key].email === data.email);
      
      if (userKey && MOCK_USERS[userKey].password === data.password) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...userProfile } = MOCK_USERS[userKey];
        dispatch(loginSuccess({ user: userProfile, token: 'dummy_jwt_token_123' }));
        navigate('/dashboard'); // Will be updated when dashboards are built
      } else {
        dispatch(loginFailure('Invalid email or password. Please try again.'));
      }
    }, 1500);
  };

  const handleDemoAccountSelect = (key: string) => {
    setValue('email', MOCK_USERS[key].email);
    setValue('password', MOCK_USERS[key].password);
    setShowDemoAccounts(false);
  };

  return (
    <div className="w-full">
      <ErrorMessage message={error || ''} />

      {/* Demo Accounts Dropdown (For Phase 2 Testing) */}
      <div className="mb-6 mt-4 relative">
        <button
          type="button"
          onClick={() => setShowDemoAccounts(!showDemoAccounts)}
          className="w-full flex items-center justify-between px-4 py-2.5 bg-[#e5f5fb] text-[#0098c8] border border-[#b3e3f4] rounded-xl text-sm font-bold hover:bg-[#d6f0fa] transition-colors"
        >
          <div className="flex items-center space-x-2">
            <Users size={16} />
            <span>Select Demo Account</span>
          </div>
          <ChevronDown size={16} className={`transition-transform ${showDemoAccounts ? 'rotate-180' : ''}`} />
        </button>

        <AnimatePresence>
          {showDemoAccounts && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl z-50 overflow-hidden"
            >
              <div className="max-h-48 overflow-y-auto py-1">
                {Object.entries(MOCK_USERS).map(([key, user]) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => handleDemoAccountSelect(key)}
                    className="w-full text-left px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-700/50 flex items-center justify-between"
                  >
                    <span className="text-sm font-medium text-gray-900 dark:text-gray-100">{user.role.replace(/_/g, ' ')}</span>
                    <span className="text-xs text-gray-500">{user.email}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

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
          loading={status === 'loading'}
          className="mt-6"
        >
          Sign In to Portal
        </LoadingButton>
      </form>

      <SocialLoginButtons />
    </div>
  );
};
