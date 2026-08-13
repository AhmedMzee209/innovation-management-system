export type Role =
  | 'SUPER_ADMIN'
  | 'INNOVATION_DIRECTOR'
  | 'CENTRAL_HUB_MANAGER'
  | 'SCHOOL_HUB_MANAGER'
  | 'MENTOR'
  | 'REVIEWER'
  | 'INNOVATOR';

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
  userType?: 'STUDENT' | 'ALUMNI' | 'EXTERNAL';
  registrationNumber?: string;
  graduationYear?: number;
  profilePhoto?: string;
  enabled: boolean;
  emailVerified: boolean;
  roles: RoleResponse[];
}
