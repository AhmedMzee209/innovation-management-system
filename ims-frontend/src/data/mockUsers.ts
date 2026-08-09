export type UserStatus = 'Active' | 'Inactive' | 'Pending' | 'Suspended';

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  gender: 'Male' | 'Female' | 'Other';
  role: string;
  school: string;
  department: string;
  innovationHub: string;
  status: UserStatus;
  lastLogin: string | null;
  createdAt: string;
  avatarUrl?: string;
  password?: string;
}

const FIRST_NAMES = ['Ahmed', 'Fatma', 'Ali', 'Asha', 'Juma', 'Maryam', 'Khamis', 'Zainab', 'Omar', 'Halima', 'Said', 'Mwanajuma', 'Hassan', 'Rukia', 'Abubakar'];
const LAST_NAMES = ['Mzee', 'Salum', 'Abdullah', 'Juma', 'Khamis', 'Haji', 'Ali', 'Makame', 'Said', 'Suleiman'];
const SCHOOLS = ['School of Computing', 'School of Business', 'School of Education', 'School of Health', 'School of Agriculture'];
const HUBS = ['Central Hub', 'Tech Hub', 'Business Hub', 'Agri Hub'];
const ROLES = ['ROLE_SUPER_ADMIN', 'ROLE_INNOVATION_DIRECTOR', 'ROLE_CENTRAL_HUB_MANAGER', 'ROLE_SCHOOL_HUB_MANAGER', 'ROLE_MENTOR', 'ROLE_REVIEWER', 'ROLE_INNOVATOR', 'ROLE_INNOVATOR'];

// Generate 50 mock users dynamically to avoid massive hardcoding, but deterministic.
export const MOCK_USERS: User[] = Array.from({ length: 50 }).map((_, i) => {
  const firstName = FIRST_NAMES[i % FIRST_NAMES.length];
  const lastName = LAST_NAMES[i % LAST_NAMES.length];
  
  let role = 'ROLE_INNOVATOR';
  if (i === 0) role = 'ROLE_SUPER_ADMIN';
  else if (i === 1) role = 'ROLE_INNOVATION_DIRECTOR';
  else if (i < 5) role = 'ROLE_CENTRAL_HUB_MANAGER';
  else if (i < 10) role = 'ROLE_MENTOR';
  else if (i < 15) role = 'ROLE_REVIEWER';
  
  let status: UserStatus = 'Active';
  if (i % 7 === 0) status = 'Inactive';
  else if (i % 11 === 0) status = 'Pending';
  else if (i % 23 === 0) status = 'Suspended';

  return {
    id: `USR-${1000 + i}`,
    firstName,
    lastName,
    email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}${i}@suza.ac.tz`,
    phone: `+255 77${Math.floor(Math.random() * 900000) + 100000}`,
    gender: i % 2 === 0 ? 'Male' : 'Female',
    role,
    school: SCHOOLS[i % SCHOOLS.length],
    department: 'Computer Science',
    innovationHub: HUBS[i % HUBS.length],
    status,
    lastLogin: status === 'Pending' ? null : `2026-08-0${(i % 9) + 1}T10:00:00Z`,
    createdAt: '2023-01-01T00:00:00Z',
    avatarUrl: i % 3 === 0 ? `https://i.pravatar.cc/150?u=${i}` : undefined,
    password: 'password123',
  };
});
