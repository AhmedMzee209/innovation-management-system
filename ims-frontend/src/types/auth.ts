export type Role =
  | 'SUPER_ADMIN'
  | 'INNOVATION_DIRECTOR'
  | 'CENTRAL_HUB_MANAGER'
  | 'SCHOOL_HUB_MANAGER'
  | 'MENTOR'
  | 'REVIEWER'
  | 'STUDENT'
  | 'ALUMNI';

export interface UserProfile {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: Role;
  avatar: string;
  department?: string;
}
