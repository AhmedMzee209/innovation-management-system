import { MOCK_INNOVATIONS, Innovation } from './mockInnovations';
import { MOCK_USERS } from './mockUsers';

export type ReviewStatus = 'Pending' | 'In Progress' | 'Evaluated' | 'Overdue';
export type ReviewDecision = 'Pending' | 'Approve' | 'Reject' | 'Revision Required' | 'Recommend Incubation';
export type ReviewPriority = 'High' | 'Normal' | 'Low';

export interface EvaluationScore {
  criteriaId: string;
  score: number; // 0-10
  remarks: string;
}

export interface ReviewTimelineEvent {
  id: string;
  action: string;
  date: string;
  actorId: string;
  actorName: string;
  comment?: string;
}

export interface Review {
  id: string;
  innovationId: string;
  reviewerId: string;
  status: ReviewStatus;
  priority: ReviewPriority;
  assignedDate: string;
  deadlineDate: string;
  completedDate?: string;
  
  // Evaluation Data
  scores: EvaluationScore[];
  totalScore: number;
  maxScore: number;
  
  // Final Decision
  decision: ReviewDecision;
  strengths: string;
  weaknesses: string;
  recommendations: string;
  
  timeline: ReviewTimelineEvent[];
}

export const EVALUATION_CRITERIA = [
  { id: 'crit_1', category: 'Innovation', name: 'Originality & Novelty', maxScore: 10, description: 'Is the idea unique and fundamentally different from existing solutions?' },
  { id: 'crit_2', category: 'Innovation', name: 'Creativity', maxScore: 10, description: 'Does the approach show creative problem solving?' },
  { id: 'crit_3', category: 'Technical', name: 'Technical Feasibility', maxScore: 10, description: 'Can this actually be built with current technology?' },
  { id: 'crit_4', category: 'Technical', name: 'Technology Readiness Level (TRL)', maxScore: 10, description: 'How mature is the underlying technology?' },
  { id: 'crit_5', category: 'Business', name: 'Market Potential', maxScore: 10, description: 'Is there a clear, large target market?' },
  { id: 'crit_6', category: 'Business', name: 'Commercialization Strategy', maxScore: 10, description: 'Is the path to revenue clear and realistic?' },
  { id: 'crit_7', category: 'Impact', name: 'Social Impact', maxScore: 10, description: 'Does it improve lives or communities?' },
  { id: 'crit_8', category: 'Impact', name: 'Environmental Impact', maxScore: 10, description: 'Is it sustainable and eco-friendly? (SDG alignment)' },
];

const sample = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];
const randomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

// Get users who are reviewers or academics
export const MOCK_REVIEWERS = Object.values(MOCK_USERS).filter(
  u => u.role === 'ROLE_REVIEWER' || u.role === 'ROLE_ACADEMIC'
);

// Generate 100 dummy reviews assigned to various innovations
export const MOCK_REVIEWS: Review[] = Array.from({ length: 100 }).map((_, index) => {
  const innovation = MOCK_INNOVATIONS[index % MOCK_INNOVATIONS.length]; // Link to existing innovations
  const reviewer = sample(MOCK_REVIEWERS);
  
  const statusPool: ReviewStatus[] = ['Pending', 'In Progress', 'Evaluated', 'Overdue'];
  const status = statusPool[randomInt(0, 3)];
  
  const priorityPool: ReviewPriority[] = ['High', 'Normal', 'Low'];
  const priority = priorityPool[randomInt(0, 2)];

  const assignedDate = new Date(Date.now() - randomInt(1, 30) * 86400000);
  const deadlineDate = new Date(assignedDate.getTime() + 14 * 86400000); // 14 days to review
  
  let scores: EvaluationScore[] = [];
  let totalScore = 0;
  const maxScore = EVALUATION_CRITERIA.length * 10;
  let decision: ReviewDecision = 'Pending';
  let completedDate = undefined;

  if (status === 'Evaluated') {
    completedDate = new Date(assignedDate.getTime() + randomInt(2, 10) * 86400000).toISOString();
    scores = EVALUATION_CRITERIA.map(c => {
      const score = randomInt(4, 10);
      totalScore += score;
      return {
        criteriaId: c.id,
        score,
        remarks: `Demonstrates acceptable levels of ${c.name.toLowerCase()}.`
      };
    });

    if (totalScore >= 70) decision = 'Approve';
    else if (totalScore >= 60) decision = 'Revision Required';
    else decision = 'Reject';
    
    // Some get incubation
    if (totalScore >= 75 && randomInt(0, 1) === 1) decision = 'Recommend Incubation';
  }

  const timeline: ReviewTimelineEvent[] = [
    {
      id: `tev_${index}_1`,
      action: 'Review Assigned',
      date: assignedDate.toISOString(),
      actorId: 'system',
      actorName: 'System Auto-Assignment',
      comment: `Automatically routed to ${reviewer.firstName} ${reviewer.lastName} based on category match.`
    }
  ];

  if (status === 'In Progress' || status === 'Evaluated') {
    timeline.push({
      id: `tev_${index}_2`,
      action: 'Review Started',
      date: new Date(assignedDate.getTime() + 86400000).toISOString(),
      actorId: reviewer.id,
      actorName: `${reviewer.firstName} ${reviewer.lastName}`,
    });
  }

  if (status === 'Evaluated') {
    timeline.push({
      id: `tev_${index}_3`,
      action: 'Evaluation Submitted',
      date: completedDate!,
      actorId: reviewer.id,
      actorName: `${reviewer.firstName} ${reviewer.lastName}`,
      comment: `Final score: ${totalScore}/${maxScore} - ${decision}`
    });
  }

  return {
    id: `rev_${index + 1000}`,
    innovationId: innovation.id,
    reviewerId: reviewer.id,
    status,
    priority,
    assignedDate: assignedDate.toISOString(),
    deadlineDate: deadlineDate.toISOString(),
    completedDate,
    
    scores,
    totalScore,
    maxScore,
    
    decision,
    strengths: status === 'Evaluated' ? 'Strong technical foundation and clear market opportunity.' : '',
    weaknesses: status === 'Evaluated' ? 'Financial projections seem slightly optimistic for Year 1.' : '',
    recommendations: status === 'Evaluated' ? 'Consider partnering with local NGOs to boost social impact metrics.' : '',
    
    timeline
  };
});
