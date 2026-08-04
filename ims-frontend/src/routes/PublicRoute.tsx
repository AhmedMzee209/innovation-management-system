import { Outlet } from 'react-router-dom';

export const PublicRoute = () => {
  // Public route can be seen by both logged in and logged out users.
  // We don't restrict access here.
  return <Outlet />;
};
