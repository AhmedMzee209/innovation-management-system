import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { ROUTES } from '@/constants/routes';

interface RoleRouteProps {
  allowedRoles: string[];
}

export const RoleRoute = ({ allowedRoles }: RoleRouteProps) => {
  const { roles, isAuthenticated } = useSelector((state: RootState) => state.auth);

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.PUBLIC.LOGIN} replace />;
  }

  const hasRole = roles.some((role) => allowedRoles.includes(role));

  if (!hasRole) {
    return <Navigate to={ROUTES.ERRORS.FORBIDDEN} replace />;
  }

  return <Outlet />;
};
