export interface Role {
  id: string;
  name: string;
  description: string;
  userCount: number;
  isSystem: boolean; // Cannot be deleted
  createdAt: string;
}

export const MOCK_ROLES: Role[] = [
  {
    id: 'ROLE_SUPER_ADMIN',
    name: 'Super Admin',
    description: 'Full system access across all modules and settings.',
    userCount: 2,
    isSystem: true,
    createdAt: '2023-01-01T00:00:00Z',
  },
  {
    id: 'ROLE_INNOVATION_DIRECTOR',
    name: 'Innovation Director',
    description: 'Oversees the entire innovation ecosystem and all hubs.',
    userCount: 3,
    isSystem: true,
    createdAt: '2023-01-15T00:00:00Z',
  },
  {
    id: 'ROLE_CENTRAL_HUB_MANAGER',
    name: 'Central Innovation Manager',
    description: 'Manages the central SUZA innovation hub.',
    userCount: 5,
    isSystem: true,
    createdAt: '2023-02-01T00:00:00Z',
  },
  {
    id: 'ROLE_SCHOOL_HUB_MANAGER',
    name: 'School Innovation Manager',
    description: 'Manages a specific school-level innovation hub.',
    userCount: 12,
    isSystem: true,
    createdAt: '2023-02-15T00:00:00Z',
  },
  {
    id: 'ROLE_MENTOR',
    name: 'Mentor',
    description: 'Provides guidance and mentorship to assigned startups.',
    userCount: 45,
    isSystem: true,
    createdAt: '2023-03-01T00:00:00Z',
  },
  {
    id: 'ROLE_REVIEWER',
    name: 'Reviewer',
    description: 'Reviews and scores submitted innovations and proposals.',
    userCount: 30,
    isSystem: true,
    createdAt: '2023-03-15T00:00:00Z',
  },
  {
    id: 'ROLE_STUDENT',
    name: 'Student',
    description: 'Current SUZA student capable of submitting innovations.',
    userCount: 2500,
    isSystem: true,
    createdAt: '2023-04-01T00:00:00Z',
  },
  {
    id: 'ROLE_ALUMNI',
    name: 'Alumni',
    description: 'SUZA alumni participating in the ecosystem.',
    userCount: 850,
    isSystem: true,
    createdAt: '2023-04-15T00:00:00Z',
  },
  {
    id: 'ROLE_INVESTOR',
    name: 'Investor',
    description: 'External partner looking to fund or support startups.',
    userCount: 15,
    isSystem: true,
    createdAt: '2023-05-01T00:00:00Z',
  },
  {
    id: 'ROLE_PUBLIC_VISITOR',
    name: 'Public Visitor',
    description: 'General public user with read-only access to showcase.',
    userCount: 12000,
    isSystem: true,
    createdAt: '2023-05-15T00:00:00Z',
  },
];
