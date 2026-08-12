import { Outlet } from 'react-router-dom';
import { AuthenticationIllustration } from '@/components/auth/AuthenticationIllustration';
import { Link } from 'react-router-dom';

export const AuthLayout = () => {
  return (
    <div className="min-h-screen flex w-full bg-gray-50 dark:bg-gray-900 font-sans selection:bg-[#0098c8]/20 selection:text-[#0098c8]">
      {/* Left Side - Animated Illustration */}
      <AuthenticationIllustration />

      {/* Right Side - Form + Footer */}
      <div className="w-full lg:w-1/2 flex flex-col relative overflow-y-auto">
        {/* Background blur blobs (mobile only) */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#0098c8]/5 rounded-full blur-3xl lg:hidden pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#e8b800]/5 rounded-full blur-3xl lg:hidden pointer-events-none" />

        {/* Form area — grows to fill space, centers content */}
        <div className="flex-1 flex flex-col items-center justify-center p-4 sm:p-8 relative z-10">
          <Outlet />
        </div>

        {/* ── Page-bottom footer ───────────────────────────── */}
        <footer className="shrink-0 w-full py-4 px-6 border-t border-gray-100 dark:border-gray-800 bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm relative z-10">
          <p className="text-center text-xs text-gray-400 dark:text-gray-500 flex items-center justify-center flex-wrap gap-x-2 gap-y-1">
            <span className="font-medium text-gray-500 dark:text-gray-400">
              © {new Date().getFullYear()} SUZA IMS.
            </span>
            <Link to="/terms" className="hover:text-[#0098c8] transition-colors">Terms</Link>
            <span className="text-gray-300 dark:text-gray-700">•</span>
            <Link to="/privacy" className="hover:text-[#0098c8] transition-colors">Privacy Policy</Link>
            <span className="text-gray-300 dark:text-gray-700">•</span>
            <Link to="/contact" className="hover:text-[#0098c8] transition-colors">Help</Link>
          </p>
        </footer>
      </div>
    </div>
  );
};
