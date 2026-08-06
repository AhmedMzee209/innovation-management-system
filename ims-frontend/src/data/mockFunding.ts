import { MOCK_STARTUPS } from './mockStartups';
import { MOCK_USERS } from './mockUsers';

export type FundingProgramStatus = 'Active' | 'Upcoming' | 'Closed' | 'Draft';
export type FundingType = 'Grant' | 'Equity' | 'Convertible Note' | 'Debt';
export type ApplicationStatus = 'Draft' | 'Submitted' | 'Under Review' | 'Approved' | 'Rejected' | 'Revision Required';
export type DisbursementStatus = 'Pending' | 'Processing' | 'Completed' | 'Failed';

export interface FundingProgram {
  id: string;
  code: string;
  name: string;
  description: string;
  type: FundingType;
  category: string;
  totalBudget: number;
  availableBudget: number;
  minAmount: number;
  maxAmount: number;
  startDate: string;
  endDate: string;
  status: FundingProgramStatus;
  eligibilityCriteria: string[];
}

export interface BudgetBreakdown {
  equipment: number;
  operations: number;
  marketing: number;
  humanResources: number;
  research: number;
  other: number;
}

export interface FundingApplication {
  id: string;
  applicationNumber: string;
  startupId: string;
  programId: string;
  requestedAmount: number;
  approvedAmount?: number;
  submissionDate: string;
  status: ApplicationStatus;
  budgetBreakdown: BudgetBreakdown;
  evaluationScore?: number;
  reviewerComments?: string;
}

export interface Disbursement {
  id: string;
  applicationId: string;
  startupId: string;
  totalAmount: number;
  amountDisbursed: number;
  remainingBalance: number;
  nextInstallmentDate?: string;
  nextInstallmentAmount?: number;
  status: DisbursementStatus;
}

const randomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
const sample = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];
const generateDate = (offsetDays: number) => new Date(Date.now() + offsetDays * 86400000).toISOString().split('T')[0];

export const MOCK_FUNDING_PROGRAMS: FundingProgram[] = Array.from({ length: 20 }).map((_, i) => {
  const totalBudget = randomInt(5, 50) * 10000;
  const isClosed = Math.random() > 0.7;
  const isUpcoming = !isClosed && Math.random() > 0.8;
  
  return {
    id: `prog_${i + 100}`,
    code: `GRANT-${new Date().getFullYear()}-${String(i + 1).padStart(3, '0')}`,
    name: sample(['Seed Fund Catalyst', 'Research Commercialization Grant', 'Women in Tech Fund', 'Green Energy Initiative', 'DeepTech ScaleUp']),
    description: 'Providing early-stage capital for university spin-offs and student-led innovations to accelerate go-to-market strategies.',
    type: sample(['Grant', 'Grant', 'Grant', 'Equity', 'Convertible Note']),
    category: sample(['Technology', 'Agriculture', 'Healthcare', 'Education', 'General']),
    totalBudget,
    availableBudget: isClosed ? 0 : randomInt(totalBudget * 0.2, totalBudget),
    minAmount: randomInt(1, 5) * 1000,
    maxAmount: randomInt(10, 50) * 1000,
    startDate: generateDate(isUpcoming ? randomInt(10, 30) : -randomInt(30, 90)),
    endDate: generateDate(isClosed ? -randomInt(1, 30) : randomInt(30, 90)),
    status: isClosed ? 'Closed' : (isUpcoming ? 'Upcoming' : 'Active'),
    eligibilityCriteria: ['Must be registered SUZA student/alumni', 'TRL 3 or above', 'Clear financial model'],
  };
});

const startupIds = MOCK_STARTUPS.map(s => s.id);
const programIds = MOCK_FUNDING_PROGRAMS.map(p => p.id);

export const MOCK_APPLICATIONS: FundingApplication[] = Array.from({ length: 150 }).map((_, i) => {
  const statusRoll = Math.random();
  const status: ApplicationStatus = statusRoll > 0.4 ? 'Approved' : statusRoll > 0.2 ? 'Rejected' : statusRoll > 0.1 ? 'Under Review' : 'Submitted';
  const requestedAmount = randomInt(10, 50) * 1000;
  
  const bEquipment = Math.floor(requestedAmount * (randomInt(20, 40) / 100));
  const bOps = Math.floor(requestedAmount * (randomInt(10, 20) / 100));
  const bMarketing = Math.floor(requestedAmount * (randomInt(10, 20) / 100));
  const bHR = Math.floor(requestedAmount * (randomInt(20, 30) / 100));
  const bResearch = Math.floor(requestedAmount * (randomInt(0, 10) / 100));
  const bOther = requestedAmount - (bEquipment + bOps + bMarketing + bHR + bResearch);

  return {
    id: `app_${i + 1000}`,
    applicationNumber: `APP-${new Date().getFullYear()}-${String(i + 1).padStart(4, '0')}`,
    startupId: sample(startupIds),
    programId: sample(programIds),
    requestedAmount,
    approvedAmount: status === 'Approved' ? Math.floor(requestedAmount * (randomInt(80, 100) / 100)) : undefined,
    submissionDate: generateDate(-randomInt(5, 60)),
    status,
    budgetBreakdown: { equipment: bEquipment, operations: bOps, marketing: bMarketing, humanResources: bHR, research: bResearch, other: bOther },
    evaluationScore: status === 'Approved' ? randomInt(85, 98) : (status === 'Rejected' ? randomInt(40, 70) : undefined),
    reviewerComments: status === 'Approved' ? 'Strong business model and clear path to market.' : undefined,
  };
});

export const MOCK_DISBURSEMENTS: Disbursement[] = MOCK_APPLICATIONS.filter(a => a.status === 'Approved').slice(0, 30).map((app, i) => {
  const total = app.approvedAmount || 0;
  const disbursed = Math.floor(total * (randomInt(30, 80) / 100));
  const remaining = total - disbursed;
  
  return {
    id: `disb_${i + 1}`,
    applicationId: app.id,
    startupId: app.startupId,
    totalAmount: total,
    amountDisbursed: disbursed,
    remainingBalance: remaining,
    nextInstallmentDate: remaining > 0 ? generateDate(randomInt(10, 30)) : undefined,
    nextInstallmentAmount: remaining > 0 ? Math.floor(remaining / 2) : undefined,
    status: remaining > 0 ? 'Processing' : 'Completed',
  };
});
