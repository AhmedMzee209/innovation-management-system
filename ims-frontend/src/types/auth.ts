export type Role =
  | 'SUPER_ADMIN'
  | 'INNOVATION_DIRECTOR'
  | 'CENTRAL_HUB_MANAGER'
  | 'SCHOOL_HUB_MANAGER'
  | 'MENTOR'
  | 'REVIEWER'
  | 'INNOVATOR'
  | 'STUDENT';

export interface UserProfile {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: Role;
  avatar: string;
  department?: string;
  phoneNumber?: string;
}

// Backend Response Types
export interface RoleResponse {
  id: string;
  name: Role;
  description?: string;
}

export interface UserResponse {
  id: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  gender?: string;
  profilePhoto?: string;
  enabled: boolean;
  emailVerified: boolean;
  roles: RoleResponse[];
}
