import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { ROUTES } from '@/constants/routes';

interface PermissionRouteProps {
  requiredPermissions: string[];
}

export const PermissionRoute = ({ requiredPermissions }: PermissionRouteProps) => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  // Implementation will depend on how permissions are fetched/stored.
  // For Phase 0, we assume user has all permissions or we check against a stub.
  const userPermissions: string[] = []; // Placeholder

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.PUBLIC.LOGIN} replace />;
  }

  const hasPermission = requiredPermissions.every((perm) => userPermissions.includes(perm));

  if (!hasPermission) {
    return <Navigate to={ROUTES.ERRORS.FORBIDDEN} replace />;
  }

  return <Outlet />;
};
