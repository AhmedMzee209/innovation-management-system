import { useSelector } from 'react-redux';
import { RootState } from '@/store';

export const usePermissions = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  const hasRole = (role: string) => {
    if (!user) return false;
    const cleanRole = user.role.replace('ROLE_', '');
    const cleanTargetRole = role.replace('ROLE_', '');
    return cleanRole === cleanTargetRole || user.role === role;
  };

  const hasPermission = (permission: string) => {
    if (!user) return false;
    // For now we map permissions to roles directly in the frontend since we don't have the granular list
    if (hasRole('SUPER_ADMIN')) return true;
    
    // Example basic mapping (in a real app, this would check a granular list returned from login)
    if (permission.startsWith('USER_') && ['SUPER_ADMIN', 'INNOVATION_DIRECTOR'].includes(user.role)) return true;
    if (permission.startsWith('ROLE_') && hasRole('SUPER_ADMIN')) return true;
    
    return false;
  };

  const hasAnyPermission = (permissions: string[]) => {
    return permissions.some(p => hasPermission(p));
  };

  return {
    hasRole,
    hasPermission,
    hasAnyPermission,
    isSuperAdmin: hasRole('SUPER_ADMIN')
  };
};
