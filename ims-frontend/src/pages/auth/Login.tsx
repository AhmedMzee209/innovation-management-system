import { AuthenticationCard } from '@/components/auth/AuthenticationCard';
import { AuthenticationFooter } from '@/components/auth/AuthenticationFooter';
import { LoginForm } from '@/components/auth/LoginForm';
import suzaLogo from '@/assets/images/suza-logo.png';
import smzLogo from '@/assets/images/smz-logo.png';
import { Link } from 'react-router-dom';
import { UserPlus } from 'lucide-react';

export const Login = () => {
  return (
    <>
      <div className="absolute top-6 right-6 lg:top-8 lg:right-8 flex items-center space-x-3">
        {/* Language Selector UI only */}
        <select className="bg-transparent border border-gray-200 dark:border-gray-700 rounded-lg text-xs font-medium px-2.5 py-1.5 outline-none cursor-pointer text-gray-600 dark:text-gray-300">
          <option>English</option>
          <option>Swahili</option>
        </select>
        <Link to="/" className="text-xs font-bold text-gray-500 hover:text-gray-900 transition-colors">
          Back to Home
        </Link>
      </div>

      <AuthenticationCard>
        <div className="flex justify-center mb-8 space-x-4 items-center">
          <img src={suzaLogo} alt="SUZA" className="h-14 w-auto object-contain" />
          <div className="w-px h-10 bg-gray-200 dark:bg-gray-700" />
          <img src={smzLogo} alt="SMZ" className="h-14 w-auto object-contain" />
        </div>

        <div className="text-center mb-8">
          <h1 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight mb-1">
            Welcome Back
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Sign in to access the Innovation Management System.
          </p>
        </div>

        <LoginForm />
        {/* Register link */}
        <div className="mt-6 pt-5 border-t border-gray-100 dark:border-gray-700 text-center mb-6">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            New to SUZA IMS?{' '}
            <Link
              to="/register"
              className="inline-flex items-center gap-1 font-bold text-[#0098c8] hover:text-[#0d2137] dark:hover:text-[#e8b800] transition-colors"
            >
              <UserPlus size={14} />
              Create an Account
            </Link>
          </p>
        </div>

        <AuthenticationFooter />
      </AuthenticationCard>
    </>
  );
};
