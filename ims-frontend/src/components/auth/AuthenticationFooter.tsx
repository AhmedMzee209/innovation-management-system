import { Link } from 'react-router-dom';

export const AuthenticationFooter = () => {
  return (
    <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-800 text-center">
      <p className="text-xs text-gray-400 dark:text-gray-500">
        <span className="font-medium text-gray-500 dark:text-gray-400">
          © {new Date().getFullYear()} SUZA IMS.
        </span>
        {' '}
        <Link
          to="/terms"
          className="hover:text-[#0098c8] transition-colors"
        >
          Terms
        </Link>
        <span className="mx-1.5 text-gray-300 dark:text-gray-600">•</span>
        <Link
          to="/privacy"
          className="hover:text-[#0098c8] transition-colors"
        >
          Privacy Policy
        </Link>
        <span className="mx-1.5 text-gray-300 dark:text-gray-600">•</span>
        <Link
          to="/contact"
          className="hover:text-[#0098c8] transition-colors"
        >
          Help
        </Link>
      </p>
    </div>
  );
};
