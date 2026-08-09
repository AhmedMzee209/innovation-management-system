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
  Settings,
  TrendingUp,
  CalendarClock,
  Activity,
  Award,
  Bookmark,
  Layers,
  Building,
  HardDrive,
  FolderOpen,
  UploadCloud,
  MessageSquare,
  Megaphone,
  PieChart as PieChartIcon
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
          { name: 'Categories', href: '/dashboard/innovations/categories' },
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
    name: 'STARTUPS',
    items: [
      {
        name: 'Startup Dashboard',
        href: '/dashboard/startups/dashboard',
        icon: Building2,
        roles: ['SUPER_ADMIN', 'INNOVATION_DIRECTOR', 'CENTRAL_HUB_MANAGER', 'SCHOOL_HUB_MANAGER'],
      },
      {
        name: 'Startup Directory',
        href: '/dashboard/startups',
        icon: Users,
      },
      {
        name: 'My Startups',
        href: '/dashboard/startups/my',
        icon: Rocket,
      },
      {
        name: 'Analytics',
        href: '/dashboard/startups/analytics',
        icon: TrendingUp,
        roles: ['SUPER_ADMIN', 'INNOVATION_DIRECTOR'],
      }
    ]
  },
  {
    name: 'MENTORSHIP',
    items: [
      {
        name: 'Mentorship Hub',
        href: '/dashboard/mentorship/dashboard',
        icon: Briefcase,
        roles: ['SUPER_ADMIN', 'INNOVATION_DIRECTOR'],
      },
      {
        name: 'Mentor Directory',
        href: '/dashboard/mentorship/mentors',
        icon: Users,
      },
      {
        name: 'Session Calendar',
        href: '/dashboard/mentorship/calendar',
        icon: CalendarClock,
      },
      {
        name: 'Mentoring Sessions',
        href: '/dashboard/mentorship/sessions',
        icon: UserPlus,
      },
      {
        name: 'Action Plans',
        href: '/dashboard/mentorship/action-plans',
        icon: ClipboardCheck,
      },
      {
        name: 'Analytics',
        href: '/dashboard/mentorship/analytics',
        icon: TrendingUp,
        roles: ['SUPER_ADMIN', 'INNOVATION_DIRECTOR'],
      }
    ]
  },
  {
    name: 'FUNDING & GRANTS',
    items: [
      {
        name: 'Funding Dashboard',
        href: '/dashboard/funding/dashboard',
        icon: Banknote,
        roles: ['SUPER_ADMIN', 'INNOVATION_DIRECTOR'],
      },
      {
        name: 'Funding Programs',
        href: '/dashboard/funding/programs',
        icon: Briefcase,
      },
      {
        name: 'Applications',
        href: '/dashboard/funding/applications',
        icon: FileText,
      },
      {
        name: 'Disbursements',
        href: '/dashboard/funding/disbursements',
        icon: Activity,
        roles: ['SUPER_ADMIN', 'INNOVATION_DIRECTOR'],
      },
      {
        name: 'Analytics',
        href: '/dashboard/funding/analytics',
        icon: TrendingUp,
        roles: ['SUPER_ADMIN', 'INNOVATION_DIRECTOR'],
      }
    ]
  },
  {
    name: 'COMPETITIONS & EVENTS',
    items: [
      {
        name: 'Dashboard',
        href: '/dashboard/competitions/dashboard',
        icon: Trophy,
        roles: ['SUPER_ADMIN', 'INNOVATION_DIRECTOR', 'HUB_MANAGER']
      },
      {
        name: 'All Competitions',
        href: '/dashboard/competitions/list',
        icon: FileText,
        roles: ['SUPER_ADMIN', 'INNOVATION_DIRECTOR', 'HUB_MANAGER']
      },
      {
        name: 'Participants',
        href: '/dashboard/competitions/participants',
        icon: Users,
        roles: ['SUPER_ADMIN', 'INNOVATION_DIRECTOR', 'HUB_MANAGER', 'ACADEMIC_STAFF']
      },
      {
        name: 'Judges & Scoring',
        href: '/dashboard/competitions/judges',
        icon: ClipboardCheck,
        roles: ['SUPER_ADMIN', 'INNOVATION_DIRECTOR', 'HUB_MANAGER']
      },
      {
        name: 'Pitch Schedule',
        href: '/dashboard/competitions/pitch',
        icon: CalendarClock,
        roles: ['SUPER_ADMIN', 'INNOVATION_DIRECTOR', 'HUB_MANAGER', 'ACADEMIC_STAFF']
      },
      {
        name: 'Results & Winners',
        href: '/dashboard/competitions/results',
        icon: Award,
        roles: ['SUPER_ADMIN', 'INNOVATION_DIRECTOR', 'HUB_MANAGER', 'ACADEMIC_STAFF', 'INNOVATOR']
      },
      {
        name: 'Event Analytics',
        href: '/dashboard/competitions/analytics',
        icon: LineChart,
        roles: ['SUPER_ADMIN', 'INNOVATION_DIRECTOR', 'HUB_MANAGER']
      }
    ]
  },
  {
    name: 'OPPORTUNITIES',
    items: [
      {
        name: 'Dashboard',
        href: '/dashboard/opportunities/dashboard',
        icon: Activity,
        roles: ['SUPER_ADMIN', 'INNOVATION_DIRECTOR', 'INNOVATOR']
      },
      {
        name: 'Marketplace',
        href: '/dashboard/opportunities/marketplace',
        icon: Briefcase,
        roles: ['SUPER_ADMIN', 'INNOVATION_DIRECTOR', 'INNOVATOR', 'INNOVATOR']
      },
      {
        name: 'My Applications',
        href: '/dashboard/opportunities/applications',
        icon: FileText,
        roles: ['INNOVATOR', 'INNOVATOR']
      },
      {
        name: 'Saved',
        href: '/dashboard/opportunities/saved',
        icon: Bookmark,
        roles: ['INNOVATOR', 'INNOVATOR']
      },
      {
        name: 'Categories',
        href: '/dashboard/opportunities/categories',
        icon: Layers,
        roles: ['SUPER_ADMIN', 'INNOVATION_DIRECTOR', 'INNOVATOR']
      },
      {
        name: 'Providers',
        href: '/dashboard/opportunities/providers',
        icon: Building,
        roles: ['SUPER_ADMIN', 'INNOVATION_DIRECTOR', 'INNOVATOR']
      },
      {
        name: 'Reports & Analytics',
        href: '/dashboard/opportunities/reports',
        icon: LineChart,
        roles: ['SUPER_ADMIN', 'INNOVATION_DIRECTOR']
      }
    ]
  },
  {
    name: 'DOCUMENTS',
    items: [
      {
        name: 'Workspace',
        href: '/dashboard/documents/dashboard',
        icon: HardDrive,
        roles: ['SUPER_ADMIN', 'INNOVATION_DIRECTOR', 'HUB_MANAGER', 'ACADEMIC_STAFF', 'INNOVATOR']
      },
      {
        name: 'Library',
        href: '/dashboard/documents/library',
        icon: FolderOpen,
        roles: ['SUPER_ADMIN', 'INNOVATION_DIRECTOR', 'HUB_MANAGER', 'ACADEMIC_STAFF', 'INNOVATOR']
      },
      {
        name: 'Upload',
        href: '/dashboard/documents/upload',
        icon: UploadCloud,
        roles: ['SUPER_ADMIN', 'INNOVATION_DIRECTOR', 'HUB_MANAGER', 'ACADEMIC_STAFF']
      },
      {
        name: 'Categories',
        href: '/dashboard/documents/categories',
        icon: Layers,
        roles: ['SUPER_ADMIN', 'INNOVATION_DIRECTOR', 'HUB_MANAGER']
      },
      {
        name: 'Reports & Analytics',
        href: '/dashboard/documents/reports',
        icon: LineChart,
        roles: ['SUPER_ADMIN', 'INNOVATION_DIRECTOR']
      }
    ]
  },
  {
    name: 'ANALYTICS & REPORTS',
    items: [
      {
        name: 'Executive Dashboard',
        href: '/dashboard/analytics/executive',
        icon: Activity,
      },
      {
        name: 'Custom Dashboard',
        href: '/dashboard/analytics/custom',
        icon: LayoutDashboard,
      },
      {
        name: 'Innovation Analytics',
        href: '/dashboard/analytics/innovation',
        icon: Lightbulb,
      },
      {
        name: 'Startup Analytics',
        href: '/dashboard/analytics/startups',
        icon: Rocket,
      },
      {
        name: 'Funding Analytics',
        href: '/dashboard/analytics/funding',
        icon: Banknote,
      },
      {
        name: 'Competition Analytics',
        href: '/dashboard/analytics/competitions',
        icon: Trophy,
      },
      {
        name: 'Mentorship Analytics',
        href: '/dashboard/analytics/mentorship',
        icon: Users,
      },
      {
        name: 'Opportunity Analytics',
        href: '/dashboard/analytics/opportunities',
        icon: Briefcase,
      },
      {
        name: 'Organization Analytics',
        href: '/dashboard/analytics/organization',
        icon: Building2,
      },
      {
        name: 'Reports Center',
        href: '/dashboard/analytics/reports',
        icon: FileText,
      }
    ]
  },
  {
    name: 'COMMUNICATION',
    items: [
      {
        name: 'Dashboard',
        href: '/dashboard/notifications/dashboard',
        icon: LayoutDashboard,
      },
      {
        name: 'Messages',
        href: '/dashboard/messages',
        icon: MessageSquare,
      },
      {
        name: 'Notifications',
        href: '/dashboard/notifications/center',
        icon: Bell,
      },
      {
        name: 'Announcements',
        href: '/dashboard/announcements',
        icon: Megaphone,
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
