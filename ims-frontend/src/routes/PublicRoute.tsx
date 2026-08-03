import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { ROUTES } from '@/constants/routes';

export const PublicRoute = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  if (isAuthenticated) {
    return <Navigate to={ROUTES.PROTECTED.DASHBOARD} replace />;
  }

  return <Outlet />;
};
