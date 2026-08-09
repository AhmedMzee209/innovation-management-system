export type ActionType = 'View' | 'Create' | 'Update' | 'Delete' | 'Approve' | 'Export' | 'Assign';

export interface ModulePermission {
  module: string;
  actions: Record<ActionType, boolean>;
}

export interface RolePermissions {
  roleId: string;
  permissions: ModulePermission[];
}

export const PERMISSION_MODULES = [
  'Dashboard Analytics',
  'User Management',
  'Role Management',
  'Organization (Schools/Hubs)',
  'Innovations',
  'Startups',
  'Mentorship',
  'Funding',
  'Competitions',
  'Public Showcase',
  'System Settings',
];

// Helper to create full access
const createFullAccess = (module: string): ModulePermission => ({
  module,
  actions: { View: true, Create: true, Update: true, Delete: true, Approve: true, Export: true, Assign: true },
});

// Helper to create read-only access
const createReadOnly = (module: string): ModulePermission => ({
  module,
  actions: { View: true, Create: false, Update: false, Delete: false, Approve: false, Export: false, Assign: false },
});

export const MOCK_ROLE_PERMISSIONS: Record<string, RolePermissions> = {
  'ROLE_SUPER_ADMIN': {
    roleId: 'ROLE_SUPER_ADMIN',
    permissions: PERMISSION_MODULES.map(module => createFullAccess(module)),
  },
  'ROLE_INNOVATION_DIRECTOR': {
    roleId: 'ROLE_INNOVATION_DIRECTOR',
    permissions: PERMISSION_MODULES.map(module => {
      if (module === 'System Settings' || module === 'Role Management') return createReadOnly(module);
      return createFullAccess(module);
    }),
  },
  'ROLE_INNOVATOR': {
    roleId: 'ROLE_INNOVATOR',
    permissions: PERMISSION_MODULES.map(module => {
      if (module === 'Innovations' || module === 'Startups') {
        return {
          module,
          actions: { View: true, Create: true, Update: true, Delete: false, Approve: false, Export: false, Assign: false }
        };
      }
      return createReadOnly(module);
    }),
  },
  // Add other default permissions as needed for UI demonstration...
};
