import { InputHTMLAttributes, forwardRef } from 'react';

interface RememberMeProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const RememberMe = forwardRef<HTMLInputElement, RememberMeProps>(
  ({ label = "Remember me", className, ...props }, ref) => {
    return (
      <div className="flex items-center">
        <div className="flex items-center h-5">
          <input
            id="remember-me"
            ref={ref}
            type="checkbox"
            className="w-4 h-4 rounded border-gray-300 text-[#0098c8] focus:ring-[#0098c8]/30 dark:border-gray-600 dark:bg-gray-800 transition-all cursor-pointer"
            {...props}
          />
        </div>
        <div className="ml-2 text-sm">
          <label htmlFor="remember-me" className="font-medium text-gray-600 dark:text-gray-400 cursor-pointer hover:text-gray-900 transition-colors">
            {label}
          </label>
        </div>
      </div>
    );
  }
);
RememberMe.displayName = 'RememberMe';
