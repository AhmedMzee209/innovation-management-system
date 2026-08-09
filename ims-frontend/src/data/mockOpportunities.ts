import { MOCK_USERS } from './mockUsers';
import { MOCK_STARTUPS } from './mockStartups';

export type OpportunityType = 'Grant' | 'Scholarship' | 'Internship' | 'Accelerator' | 'Incubator' | 'Conference' | 'Workshop' | 'Training' | 'Exchange Program' | 'Investment' | 'Research';
export type OpportunityStatus = 'Draft' | 'Published' | 'Closed' | 'Archived';
export type ApplicationStatus = 'Draft' | 'Submitted' | 'Under Review' | 'Interview Scheduled' | 'Interview Completed' | 'Accepted' | 'Rejected' | 'Withdrawn';

export interface OpportunityProvider {
  id: string;
  name: string;
  type: 'University' | 'VC Firm' | 'Government' | 'Corporate' | 'NGO' | 'Hub';
  country: string;
  website: string;
  logo: string;
  description: string;
  contactEmail: string;
}

export interface OpportunityCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export interface Opportunity {
  id: string;
  code: string;
  title: string;
  providerId: string;
  type: OpportunityType;
  categoryId: string;
  description: string;
  benefits: string[];
  location: string;
  deadline: string;
  postedDate: string;
  status: OpportunityStatus;
  bannerColor: string;
  
  // Eligibility
  eligibleSchools: string[];
  eligibleRoles: string[];
  requiredSkills: string[];
  educationLevel: string[];
  experience: string;
  
  // Requirements
  requiredDocuments: string[];
  applicationLink?: string;
  selectionProcess: string;
}

export interface OpportunityApplication {
  id: string;
  opportunityId: string;
  applicantId: string; // Could be a User or a Startup ID depending on opportunity type
  applicantType: 'User' | 'Startup';
  status: ApplicationStatus;
  appliedDate: string;
  lastUpdated: string;
  notes: string;
  interviewDate?: string;
}

const randomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
const sample = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];
const generateDate = (offsetDays: number) => new Date(Date.now() + offsetDays * 86400000).toISOString();

export const OPPORTUNITY_CATEGORIES: OpportunityCategory[] = [
  { id: 'cat_1', name: 'Technology', description: 'Software, AI, Blockchain, Hardware', icon: 'Cpu' },
  { id: 'cat_2', name: 'Agriculture', description: 'AgriTech, Farming, Sustainability', icon: 'Leaf' },
  { id: 'cat_3', name: 'Healthcare', description: 'MedTech, Digital Health, Biotech', icon: 'Stethoscope' },
  { id: 'cat_4', name: 'Education', description: 'EdTech, E-learning platforms', icon: 'GraduationCap' },
  { id: 'cat_5', name: 'Finance', description: 'FinTech, Payments, Crypto', icon: 'Wallet' },
  { id: 'cat_6', name: 'Climate', description: 'Clean Energy, Sustainability', icon: 'Wind' },
  { id: 'cat_7', name: 'Tourism', description: 'Travel, Hospitality, Blue Economy', icon: 'Compass' },
];

export const MOCK_PROVIDERS: OpportunityProvider[] = Array.from({ length: 40 }).map((_, i) => ({
  id: `prov_${i + 1}`,
  name: sample(['Zanzibar Innovation Hub', 'SUZA Tech', 'East Africa VC', 'Global Grants', 'DevCorp', 'World Health NGO', 'AgriFund', 'Blue Ocean Ventures']),
  type: sample(['University', 'VC Firm', 'Government', 'Corporate', 'NGO', 'Hub']),
  country: sample(['Tanzania', 'Kenya', 'USA', 'UK', 'South Africa', 'Rwanda', 'UAE']),
  website: `https://provider${i}.org`,
  logo: `https://ui-avatars.com/api/?name=Prov+${i}&background=0D8ABC&color=fff&size=128`,
  description: 'A leading organization dedicated to fostering innovation and supporting early-stage startups and talents.',
  contactEmail: `contact@provider${i}.org`,
}));

const BANNERS = ['from-blue-600 to-indigo-700', 'from-emerald-500 to-teal-700', 'from-purple-600 to-pink-600', 'from-amber-500 to-orange-600', 'from-[#0098c8] to-blue-800'];
const OPPORTUNITY_TYPES: OpportunityType[] = ['Grant', 'Scholarship', 'Internship', 'Accelerator', 'Incubator', 'Conference', 'Workshop', 'Training', 'Exchange Program', 'Investment', 'Research'];
const SKILLS = ['React', 'Python', 'Machine Learning', 'Data Analysis', 'Business Strategy', 'Marketing', 'Hardware Engineering'];

export const MOCK_OPPORTUNITIES: Opportunity[] = Array.from({ length: 150 }).map((_, i) => {
  const isExpired = Math.random() > 0.8;
  const deadlineOffset = isExpired ? -randomInt(5, 30) : randomInt(5, 60);

  return {
    id: `opp_${i + 1}`,
    code: `OPP-${new Date().getFullYear()}-${String(i + 1).padStart(4, '0')}`,
    title: sample([
      'Seed Funding for Tech Startups', 
      'Summer Research Internship', 
      'Global Accelerator Program', 
      'AgriTech Innovation Grant', 
      'Full-Stack Developer Internship',
      'Women in Tech Scholarship',
      'Blue Economy Innovation Challenge',
      'Early Stage VC Investment'
    ]),
    providerId: sample(MOCK_PROVIDERS).id,
    type: sample(OPPORTUNITY_TYPES),
    categoryId: sample(OPPORTUNITY_CATEGORIES).id,
    description: 'We are looking for exceptional talent and innovative startups to join our upcoming cohort. This opportunity provides funding, mentorship, and access to a global network of industry experts.',
    benefits: ['Up to $50k equity-free funding', '6 months of mentorship', 'Access to coworking space', 'Cloud credits'],
    location: sample(['Remote', 'Zanzibar, Tanzania', 'Nairobi, Kenya', 'London, UK', 'Dubai, UAE']),
    deadline: generateDate(deadlineOffset),
    postedDate: generateDate(-randomInt(1, 40)),
    status: isExpired ? 'Closed' : sample(['Published', 'Published', 'Published', 'Draft']),
    bannerColor: sample(BANNERS),
    
    eligibleSchools: ['School of Computing', 'School of Business', 'All'],
    eligibleRoles: ['ROLE_INNOVATOR', 'ROLE_INNOVATOR', 'ROLE_INNOVATOR'],
    requiredSkills: [sample(SKILLS), sample(SKILLS)],
    educationLevel: sample([['Undergraduate', 'Graduate'], ['PhD'], ['Any']]),
    experience: sample(['Entry Level', '1-3 Years', 'No experience required']),
    
    requiredDocuments: ['Resume/CV', 'Pitch Deck', 'Cover Letter', 'Business Plan'],
    selectionProcess: '1. Application Screening\n2. Technical Interview\n3. Final Pitch\n4. Offer',
  };
});

const activeOpps = MOCK_OPPORTUNITIES.filter(o => o.status === 'Published');
const innovatorUsers = MOCK_USERS.filter(u => u.role === 'ROLE_INNOVATOR');

export const MOCK_APPLICATIONS: OpportunityApplication[] = Array.from({ length: 300 }).map((_, i) => {
  const statusRoll = Math.random();
  let status: ApplicationStatus = 'Submitted';
  if (statusRoll > 0.9) status = 'Accepted';
  else if (statusRoll > 0.7) status = 'Rejected';
  else if (statusRoll > 0.5) status = 'Interview Completed';
  else if (statusRoll > 0.4) status = 'Interview Scheduled';
  else if (statusRoll > 0.2) status = 'Under Review';

  return {
    id: `app_${i + 1}`,
    opportunityId: sample(MOCK_OPPORTUNITIES).id,
    applicantId: sample(innovatorUsers).id, // We'll mix startups and users in a real app
    applicantType: 'User',
    status,
    appliedDate: generateDate(-randomInt(5, 30)),
    lastUpdated: generateDate(-randomInt(1, 4)),
    notes: 'Strong candidate with relevant background.',
    interviewDate: status === 'Interview Scheduled' ? generateDate(randomInt(2, 10)) : undefined
  };
});
