export const MOCK_KPIS = {
  users: 1245,
  schools: 6,
  hubs: 4,
  innovations: { total: 543, approved: 312 },
  startups: 124,
  mentors: 85,
  funding: { programs: 12, totalAmount: 4500000 },
  competitions: 18,
  opportunities: 156,
  documents: 842,
};

export const MOCK_MONTHLY_TRENDS = [
  { name: 'Jan', submissions: 45, approvals: 30, startups: 5, funding: 120000 },
  { name: 'Feb', submissions: 52, approvals: 35, startups: 7, funding: 150000 },
  { name: 'Mar', submissions: 85, approvals: 45, startups: 12, funding: 280000 },
  { name: 'Apr', submissions: 65, approvals: 40, startups: 8, funding: 190000 },
  { name: 'May', submissions: 92, approvals: 55, startups: 15, funding: 420000 },
  { name: 'Jun', submissions: 110, approvals: 70, startups: 18, funding: 550000 },
  { name: 'Jul', submissions: 105, approvals: 80, startups: 14, funding: 480000 },
  { name: 'Aug', submissions: 125, approvals: 95, startups: 22, funding: 650000 },
  { name: 'Sep', submissions: 140, approvals: 110, startups: 25, funding: 820000 },
];

export const MOCK_SCHOOL_DISTRIBUTION = [
  { name: 'School of Computing (SoC)', value: 45 },
  { name: 'School of Business (SoB)', value: 25 },
  { name: 'School of Education (SoE)', value: 15 },
  { name: 'School of Natural Sciences (SoNS)', value: 10 },
  { name: 'Others', value: 5 },
];

export const MOCK_CATEGORY_DISTRIBUTION = [
  { name: 'Agriculture Tech', value: 30 },
  { name: 'EduTech', value: 25 },
  { name: 'FinTech', value: 20 },
  { name: 'HealthTech', value: 15 },
  { name: 'GreenTech', value: 10 },
];

export const MOCK_REPORTS = [
  { id: '1', title: 'Q3 Innovation Pipeline Report', type: 'PDF', generatedAt: '2026-08-01T10:00:00Z', author: 'Dr. Smith' },
  { id: '2', title: 'Startup Survival Rates 2025', type: 'Excel', generatedAt: '2026-07-28T14:30:00Z', author: 'Prof. Johnson' },
  { id: '3', title: 'Funding Utilization Summary', type: 'CSV', generatedAt: '2026-07-25T09:15:00Z', author: 'System' },
  { id: '4', title: 'Competitions Impact Assessment', type: 'PDF', generatedAt: '2026-07-20T11:45:00Z', author: 'Sarah Connor' },
  { id: '5', title: 'Mentorship Engagement Metrics', type: 'PDF', generatedAt: '2026-07-15T16:20:00Z', author: 'System' },
];

export const MOCK_FUNDING_BUDGET = [
  { name: 'Seed Capital', allocated: 2000000, utilized: 1500000 },
  { name: 'Research Grants', allocated: 1500000, utilized: 1200000 },
  { name: 'Event Sponsorships', allocated: 500000, utilized: 450000 },
  { name: 'Equipment Funds', allocated: 1000000, utilized: 600000 },
];

export const MOCK_STARTUP_STAGES = [
  { name: 'Ideation', count: 45 },
  { name: 'Prototyping', count: 35 },
  { name: 'Early Revenue', count: 25 },
  { name: 'Growth', count: 15 },
  { name: 'Scale-up', count: 4 },
];
