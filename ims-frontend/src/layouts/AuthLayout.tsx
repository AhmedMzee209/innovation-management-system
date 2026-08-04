import { Outlet } from 'react-router-dom';
import { AuthenticationIllustration } from '@/components/auth/AuthenticationIllustration';

export const AuthLayout = () => {
  return (
    <div className="min-h-screen flex w-full bg-gray-50 dark:bg-gray-900 font-sans selection:bg-[#0098c8]/20 selection:text-[#0098c8]">
      {/* Left Side - Animated Illustration */}
      <AuthenticationIllustration />

      {/* Right Side - Form Container */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-4 sm:p-8 relative overflow-y-auto">
        {/* Background elements for mobile/tablet to ensure it's not totally plain */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#0098c8]/5 rounded-full blur-3xl lg:hidden" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#e8b800]/5 rounded-full blur-3xl lg:hidden" />

        <div className="w-full flex justify-center">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
