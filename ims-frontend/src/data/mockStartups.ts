import { MOCK_INNOVATIONS } from './mockInnovations';
import { MOCK_USERS } from './mockUsers';
import { MOCK_REVIEWS } from './mockReviews';

export type StartupStage = 'Idea' | 'Validation' | 'Prototype' | 'MVP' | 'Incubation' | 'Market Launch' | 'Growth';
export type IncubationStatus = 'Pending' | 'Active' | 'Graduated' | 'Dropped';
export type FundingStatus = 'Bootstrapped' | 'Pre-Seed' | 'Seed' | 'Series A';

export interface StartupTeamMember {
  id: string;
  userId: string;
  role: 'Founder' | 'Co-Founder' | 'Developer' | 'Designer' | 'Business Lead' | 'Advisor' | 'Mentor';
  equity: number;
}

export interface StartupMilestone {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  completedDate?: string;
  status: 'Pending' | 'In Progress' | 'Completed';
}

export interface Startup {
  id: string;
  code: string;
  innovationId: string;
  name: string;
  tagline: string;
  description: string;
  industry: string;
  businessModel: string;
  vision: string;
  mission: string;
  
  stage: StartupStage;
  incubationStatus: IncubationStatus;
  fundingStatus: FundingStatus;
  
  foundedDate: string;
  
  team: StartupTeamMember[];
  milestones: StartupMilestone[];
  
  // Metrics
  valuation: number;
  totalFundingRaised: number;
  monthlyRecurringRevenue: number;
}

// Find innovations that were approved in the review phase
const approvedInnovationIds = MOCK_REVIEWS
  .filter(r => r.decision === 'Approve' || r.decision === 'Recommend Incubation')
  .map(r => r.innovationId);

const approvedInnovations = MOCK_INNOVATIONS.filter(i => approvedInnovationIds.includes(i.id));

const randomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
const sample = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

const STAGES: StartupStage[] = ['Validation', 'Prototype', 'MVP', 'Incubation', 'Market Launch', 'Growth'];
const FUNDING: FundingStatus[] = ['Bootstrapped', 'Pre-Seed', 'Seed', 'Series A'];
const INCUBATION: IncubationStatus[] = ['Pending', 'Active', 'Graduated'];

export const MOCK_STARTUPS: Startup[] = approvedInnovations.slice(0, 50).map((innovation, index) => {
  const stage = sample(STAGES);
  const fundingStatus = sample(FUNDING);
  const incubationStatus = sample(INCUBATION);
  
  const team: StartupTeamMember[] = [
    {
      id: `tm_${index}_1`,
      userId: innovation.primaryInnovatorId,
      role: 'Founder',
      equity: 60 + randomInt(0, 20)
    }
  ];
  
  // Add 1-3 random team members
  const otherUsers = Object.values(MOCK_USERS).filter(u => u.id !== innovation.primaryInnovatorId && u.role === 'ROLE_STUDENT');
  for (let i = 0; i < randomInt(1, 3); i++) {
    const randomUser = sample(otherUsers);
    if (randomUser && !team.find(t => t.userId === randomUser.id)) {
      team.push({
        id: `tm_${index}_${i + 2}`,
        userId: randomUser.id,
        role: sample(['Co-Founder', 'Developer', 'Designer', 'Business Lead']),
        equity: randomInt(2, 15)
      });
    }
  }

  // Add Mentor
  const mentors = Object.values(MOCK_USERS).filter(u => u.role === 'ROLE_MENTOR');
  const mentor = sample(mentors);
  if (mentor) {
    team.push({
      id: `tm_${index}_mentor`,
      userId: mentor.id,
      role: 'Mentor',
      equity: 0
    });
  }

  return {
    id: `startup_${index + 100}`,
    code: `ST-${new Date().getFullYear()}-${String(index + 1).padStart(4, '0')}`,
    innovationId: innovation.id,
    name: `${innovation.title.split(' ')[0]} Tech`,
    tagline: `Revolutionizing ${innovation.categoryId.toLowerCase()} for the future.`,
    description: innovation.proposedSolution,
    industry: innovation.categoryId,
    businessModel: sample(['B2B SaaS', 'B2C Marketplace', 'Hardware Sales', 'Subscription', 'Freemium']),
    vision: `To be the leading provider of ${innovation.categoryId.toLowerCase()} solutions in East Africa.`,
    mission: `Empowering communities through accessible and scalable technology.`,
    
    stage,
    incubationStatus,
    fundingStatus,
    
    foundedDate: new Date(Date.now() - randomInt(30, 365) * 86400000).toISOString(),
    
    team,
    milestones: [
      { id: `ms_${index}_1`, title: 'Idea Validation', description: 'Validate the core assumptions with 100 potential customers.', dueDate: new Date(Date.now() - 100 * 86400000).toISOString(), completedDate: new Date(Date.now() - 90 * 86400000).toISOString(), status: 'Completed' },
      { id: `ms_${index}_2`, title: 'MVP Development', description: 'Build the core features of the product.', dueDate: new Date(Date.now() - 30 * 86400000).toISOString(), completedDate: stage !== 'Validation' && stage !== 'Prototype' ? new Date(Date.now() - 10 * 86400000).toISOString() : undefined, status: stage === 'Validation' || stage === 'Prototype' ? 'In Progress' : 'Completed' },
      { id: `ms_${index}_3`, title: 'Market Launch', description: 'Official public release.', dueDate: new Date(Date.now() + 60 * 86400000).toISOString(), status: stage === 'Market Launch' || stage === 'Growth' ? 'Completed' : 'Pending' },
    ],
    
    valuation: randomInt(1, 50) * 100000,
    totalFundingRaised: fundingStatus === 'Bootstrapped' ? 0 : randomInt(1, 10) * 50000,
    monthlyRecurringRevenue: stage === 'Growth' ? randomInt(1, 20) * 1000 : (stage === 'Market Launch' ? randomInt(0, 5) * 500 : 0)
  };
});
