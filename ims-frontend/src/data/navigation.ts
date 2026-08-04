import { 
  LayoutDashboard, 
  Users, 
  Building2, 
  Lightbulb, 
  ClipboardCheck, 
  Rocket, 
  UserPlus, 
  Banknote, 
  Trophy, 
  Briefcase, 
  FileText, 
  Bell, 
  LineChart, 
  Globe, 
  Settings 
} from 'lucide-react';

export interface NavItem {
  name: string;
  href: string;
  icon: any;
  roles?: string[]; // Roles that can see this item
  subItems?: { name: string; href: string }[];
}

export interface NavGroup {
  name: string;
  items: NavItem[];
}

export const SIDEBAR_NAVIGATION: NavGroup[] = [
  {
    name: 'OVERVIEW',
    items: [
      {
        name: 'Dashboard',
        href: '/dashboard',
        icon: LayoutDashboard,
      },
    ]
  },
  {
    name: 'INNOVATION',
    items: [
      {
        name: 'Innovations',
        href: '/dashboard/innovations',
        icon: Lightbulb,
        subItems: [
          { name: 'My Submissions', href: '/dashboard/innovations/my' },
          { name: 'All Innovations', href: '/dashboard/innovations/all' },
        ]
      },
      {
        name: 'Reviews',
        href: '/dashboard/reviews',
        icon: ClipboardCheck,
        roles: ['SUPER_ADMIN', 'INNOVATION_DIRECTOR', 'REVIEWER', 'CENTRAL_HUB_MANAGER', 'SCHOOL_HUB_MANAGER'],
      },
      {
        name: 'Categories',
        href: '/dashboard/categories',
        icon: Briefcase,
      }
    ]
  },
  {
    name: 'PROGRAMS',
    items: [
      {
        name: 'Startups',
        href: '/dashboard/startups',
        icon: Rocket,
      },
      {
        name: 'Mentorship',
        href: '/dashboard/mentorship',
        icon: UserPlus,
      },
      {
        name: 'Funding',
        href: '/dashboard/funding',
        icon: Banknote,
      },
      {
        name: 'Competitions',
        href: '/dashboard/competitions',
        icon: Trophy,
      }
    ]
  },
  {
    name: 'ORGANIZATION',
    items: [
      {
        name: 'Schools',
        href: '/dashboard/schools',
        icon: Building2,
        roles: ['SUPER_ADMIN', 'INNOVATION_DIRECTOR'],
      },
      {
        name: 'Departments',
        href: '/dashboard/departments',
        icon: Building2,
        roles: ['SUPER_ADMIN', 'INNOVATION_DIRECTOR'],
      },
      {
        name: 'Innovation Hubs',
        href: '/dashboard/organization',
        icon: Globe,
        roles: ['SUPER_ADMIN', 'INNOVATION_DIRECTOR'],
      }
    ]
  },
  {
    name: 'ADMINISTRATION',
    items: [
      {
        name: 'Users & Roles',
        href: '/dashboard/users',
        icon: Users,
        roles: ['SUPER_ADMIN'],
        subItems: [
          { name: 'All Users', href: '/dashboard/users' },
          { name: 'Roles & Permissions', href: '/dashboard/roles' },
        ]
      },
      {
        name: 'Documents',
        href: '/dashboard/documents',
        icon: FileText,
      },
      {
        name: 'Notifications',
        href: '/dashboard/notifications',
        icon: Bell,
      },
      {
        name: 'Settings',
        href: '/dashboard/settings',
        icon: Settings,
      }
    ]
  }
];
