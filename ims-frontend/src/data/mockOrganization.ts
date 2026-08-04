export type OrgStatus = 'Active' | 'Inactive' | 'Pending';

export interface School {
  id: string;
  name: string;
  shortName: string;
  deanName: string;
  deanEmail: string;
  campus: string;
  status: OrgStatus;
  departmentsCount: number;
  innovationsCount: number;
  startupsCount: number;
  establishedYear: number;
  logoColor: string;
}

export interface Department {
  id: string;
  schoolId: string;
  name: string;
  headName: string;
  headEmail: string;
  status: OrgStatus;
  innovationsCount: number;
}

export interface Hub {
  id: string;
  name: string;
  type: 'Central' | 'School';
  schoolId?: string; // Only for School hubs
  managerId: string;
  status: OrgStatus;
  innovationsCount: number;
  startupsCount: number;
  mentorsCount: number;
  location: string;
}

export interface InnovationManager {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: 'Central Hub Manager' | 'School Hub Manager';
  hubId: string;
  schoolId?: string;
  status: OrgStatus;
  avatarUrl?: string;
  joinDate: string;
}

// -----------------------------------------
// DATA GENERATION
// -----------------------------------------

export const MOCK_SCHOOLS: School[] = [
  { id: 'SCH-001', name: 'School of Computing and Communication Studies', shortName: 'SCCS', deanName: 'Dr. Salum Abdullah', deanEmail: 'dean.sccs@suza.ac.tz', campus: 'Tunguu', status: 'Active', departmentsCount: 4, innovationsCount: 45, startupsCount: 12, establishedYear: 2002, logoColor: 'bg-blue-500' },
  { id: 'SCH-002', name: 'School of Business', shortName: 'SOB', deanName: 'Prof. Maryam Juma', deanEmail: 'dean.sob@suza.ac.tz', campus: 'Chwaka', status: 'Active', departmentsCount: 5, innovationsCount: 22, startupsCount: 8, establishedYear: 2005, logoColor: 'bg-green-500' },
  { id: 'SCH-003', name: 'School of Education', shortName: 'SOE', deanName: 'Dr. Ali Makame', deanEmail: 'dean.soe@suza.ac.tz', campus: 'Nkrumah', status: 'Active', departmentsCount: 3, innovationsCount: 15, startupsCount: 2, establishedYear: 1999, logoColor: 'bg-yellow-500' },
  { id: 'SCH-004', name: 'School of Health and Medical Sciences', shortName: 'SHMS', deanName: 'Dr. Fatma Said', deanEmail: 'dean.shms@suza.ac.tz', campus: 'Mbweni', status: 'Active', departmentsCount: 6, innovationsCount: 30, startupsCount: 5, establishedYear: 2010, logoColor: 'bg-red-500' },
  { id: 'SCH-005', name: 'School of Agriculture', shortName: 'SOA', deanName: 'Prof. Khamis Haji', deanEmail: 'dean.soa@suza.ac.tz', campus: 'Kizimbani', status: 'Active', departmentsCount: 3, innovationsCount: 18, startupsCount: 4, establishedYear: 2012, logoColor: 'bg-emerald-600' },
  { id: 'SCH-006', name: 'School of Natural and Social Sciences', shortName: 'SNSS', deanName: 'Dr. Zainab Omar', deanEmail: 'dean.snss@suza.ac.tz', campus: 'Vuga', status: 'Active', departmentsCount: 5, innovationsCount: 10, startupsCount: 1, establishedYear: 2008, logoColor: 'bg-purple-500' },
  { id: 'SCH-007', name: 'School of Swahili and Foreign Languages', shortName: 'SSFL', deanName: 'Dr. Juma Suleiman', deanEmail: 'dean.ssfl@suza.ac.tz', campus: 'Nkrumah', status: 'Active', departmentsCount: 4, innovationsCount: 5, startupsCount: 0, establishedYear: 2001, logoColor: 'bg-orange-500' },
  { id: 'SCH-008', name: 'School of Tourism and Hospitality', shortName: 'STH', deanName: 'Prof. Asha Ali', deanEmail: 'dean.sth@suza.ac.tz', campus: 'Maruhubi', status: 'Active', departmentsCount: 2, innovationsCount: 25, startupsCount: 6, establishedYear: 2015, logoColor: 'bg-teal-500' },
];

export const MOCK_DEPARTMENTS: Department[] = Array.from({ length: 30 }).map((_, i) => {
  const schoolIndex = i % 8;
  const school = MOCK_SCHOOLS[schoolIndex];
  return {
    id: `DEP-${100 + i}`,
    schoolId: school.id,
    name: `Department of ${['Computer Science', 'IT', 'Software Engineering', 'Business Admin', 'Accounting', 'Marketing', 'Nursing', 'Public Health', 'Agriculture', 'Tourism', 'Languages', 'History'][i % 12]}`,
    headName: `Dr. ${['Ahmed', 'Mwanajuma', 'Hassan', 'Rukia', 'Abubakar'][i % 5]} ${['Mzee', 'Salum', 'Abdullah', 'Juma', 'Khamis'][i % 5]}`,
    headEmail: `hod.dep${i}@suza.ac.tz`,
    status: i % 15 === 0 ? 'Inactive' : 'Active',
    innovationsCount: Math.floor(Math.random() * 15),
  };
});

export const MOCK_HUBS: Hub[] = [
  { id: 'HUB-000', name: 'SUZA Central Innovation Hub', type: 'Central', managerId: 'MGR-001', status: 'Active', innovationsCount: 170, startupsCount: 38, mentorsCount: 45, location: 'Tunguu Main Campus' },
  ...MOCK_SCHOOLS.map((school, i): Hub => ({
    id: `HUB-${101 + i}`,
    name: `${school.shortName} Innovation Hub`,
    type: 'School',
    schoolId: school.id,
    managerId: `MGR-${102 + i}`,
    status: 'Active',
    innovationsCount: school.innovationsCount,
    startupsCount: school.startupsCount,
    mentorsCount: Math.floor(Math.random() * 10) + 2,
    location: `${school.campus} Campus`,
  }))
];

export const MOCK_MANAGERS: InnovationManager[] = MOCK_HUBS.map((hub, i): InnovationManager => {
  return {
    id: hub.managerId,
    userId: `USR-900${i}`,
    firstName: ['Khamis', 'Fatma', 'Ali', 'Asha', 'Juma', 'Maryam', 'Said', 'Zainab', 'Omar'][i % 9],
    lastName: ['Mzee', 'Salum', 'Abdullah', 'Juma', 'Khamis', 'Haji', 'Ali', 'Makame', 'Said'][i % 9],
    email: `manager.hub${i}@suza.ac.tz`,
    phone: `+255 77${Math.floor(Math.random() * 900000) + 100000}`,
    role: hub.type === 'Central' ? 'Central Hub Manager' : 'School Hub Manager',
    hubId: hub.id,
    schoolId: hub.schoolId,
    status: 'Active',
    avatarUrl: `https://i.pravatar.cc/150?u=mgr${i}`,
    joinDate: '2023-02-15T00:00:00Z',
  };
});
