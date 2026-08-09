export type Role =
  | 'SUPER_ADMIN'
  | 'INNOVATION_DIRECTOR'
  | 'CENTRAL_HUB_MANAGER'
  | 'SCHOOL_HUB_MANAGER'
  | 'MENTOR'
  | 'REVIEWER'
  | 'INNOVATOR'
  | 'INNOVATOR';

export interface UserProfile {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: Role;
  avatar: string;
  department?: string;
}
