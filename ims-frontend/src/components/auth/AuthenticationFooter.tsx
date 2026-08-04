import { Link } from 'react-router-dom';

export const AuthenticationFooter = () => {
  return (
    <div className="mt-8 text-center text-xs text-gray-500 dark:text-gray-400 space-x-3">
      <span>&copy; {new Date().getFullYear()} SUZA IMS.</span>
      <Link to="/terms" className="hover:text-primary transition-colors">Terms</Link>
      <span>&bull;</span>
      <Link to="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
      <span>&bull;</span>
      <Link to="/contact" className="hover:text-primary transition-colors">Help</Link>
    </div>
  );
};
