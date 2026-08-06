import { MOCK_USERS, User } from './mockUsers';
import { MOCK_STARTUPS } from './mockStartups';

export type SessionStatus = 'Scheduled' | 'Completed' | 'Cancelled' | 'No Show';
export type MeetingType = 'Virtual' | 'In-Person';
export type ActionPlanStatus = 'Pending' | 'In Progress' | 'Completed' | 'Blocked';
export type ActionPlanPriority = 'Low' | 'Medium' | 'High' | 'Critical';

export interface MentorProfile {
  id: string; // matches userId
  expertise: string[];
  industry: string;
  biography: string;
  experienceYears: number;
  availability: string; // e.g. "Tuesdays 2PM-5PM"
  rating: number;
  totalSessions: number;
}

export interface MentoringSession {
  id: string;
  mentorId: string;
  startupId: string;
  date: string;
  time: string;
  durationMinutes: number;
  status: SessionStatus;
  meetingType: MeetingType;
  location: string; // URL if Virtual, room if In-Person
  agenda: string;
  notes?: string;
  feedback?: {
    rating: number;
    comment: string;
  };
}

export interface ActionPlan {
  id: string;
  sessionId: string;
  startupId: string;
  taskTitle: string;
  description: string;
  priority: ActionPlanPriority;
  status: ActionPlanStatus;
  dueDate: string;
  completedDate?: string;
}

const randomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
const sample = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];
const sampleMultiple = <T>(arr: T[], count: number): T[] => {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

// Generate 30 Mentors from Academic users
const academicUsers = Object.values(MOCK_USERS).filter(u => u.role === 'ROLE_ACADEMIC');
const EXPERTISE = ['Product Strategy', 'Go-To-Market', 'Fundraising', 'Engineering', 'UX/UI Design', 'Marketing', 'Sales', 'Legal', 'Financial Modeling'];
const INDUSTRIES = ['AgriTech', 'Blue Economy', 'HealthTech', 'EdTech', 'FinTech', 'E-Commerce'];

export const MOCK_MENTORS: Record<string, MentorProfile> = {};
academicUsers.forEach(user => {
  MOCK_MENTORS[user.id] = {
    id: user.id,
    expertise: sampleMultiple(EXPERTISE, randomInt(2, 4)),
    industry: sample(INDUSTRIES),
    biography: `Experienced professional specializing in early-stage growth and academic-to-industry spin-offs. Passionate about leveraging technology for sustainable development.`,
    experienceYears: randomInt(5, 25),
    availability: sample(['Mondays & Wednesdays 2PM-4PM', 'Tuesdays 10AM-12PM', 'Fridays 9AM-12PM', 'Flexible (By Appointment)']),
    rating: Number((Math.random() * 1.5 + 3.5).toFixed(1)), // 3.5 to 5.0
    totalSessions: randomInt(5, 50),
  };
});

const mentorIds = Object.keys(MOCK_MENTORS);
const startupIds = MOCK_STARTUPS.map(s => s.id);

export const MOCK_SESSIONS: MentoringSession[] = Array.from({ length: 150 }).map((_, i) => {
  const isPast = Math.random() > 0.3; // 70% past sessions
  const status: SessionStatus = isPast 
    ? sample(['Completed', 'Completed', 'Completed', 'Cancelled', 'No Show']) 
    : 'Scheduled';
  
  const dateOffsetDays = isPast ? -randomInt(1, 90) : randomInt(1, 30);
  const dateObj = new Date(Date.now() + dateOffsetDays * 86400000);
  
  const meetingType = sample(['Virtual', 'In-Person', 'Virtual']);

  return {
    id: `sess_${i + 100}`,
    mentorId: sample(mentorIds),
    startupId: sample(startupIds),
    date: dateObj.toISOString().split('T')[0],
    time: `${String(randomInt(9, 16)).padStart(2, '0')}:00`,
    durationMinutes: sample([30, 45, 60, 90]),
    status,
    meetingType,
    location: meetingType === 'Virtual' ? 'https://zoom.us/j/randomlink' : 'Innovation Hub - Room 102',
    agenda: sample(['Review MVP progress', 'Fundraising Strategy prep', 'Go-To-Market plan review', 'General check-in', 'Technical architecture review']),
    notes: status === 'Completed' ? 'Startup is making good progress. Need to focus on user acquisition next week.' : undefined,
    feedback: status === 'Completed' && Math.random() > 0.5 ? {
      rating: randomInt(4, 5),
      comment: 'Very productive session. The mentor provided excellent insights on our pricing strategy.'
    } : undefined
  };
});

export const MOCK_ACTION_PLANS: ActionPlan[] = [];
MOCK_SESSIONS.filter(s => s.status === 'Completed').forEach(session => {
  const numTasks = randomInt(1, 3);
  for (let i = 0; i < numTasks; i++) {
    const isCompleted = Math.random() > 0.4;
    MOCK_ACTION_PLANS.push({
      id: `task_${session.id}_${i}`,
      sessionId: session.id,
      startupId: session.startupId,
      taskTitle: sample(['Finalize financial model', 'Conduct 5 user interviews', 'Update pitch deck', 'Deploy v1 to staging', 'Register business entity']),
      description: 'Please ensure this is completed before our next scheduled meeting to stay on track.',
      priority: sample(['Low', 'Medium', 'High', 'Critical']),
      status: isCompleted ? 'Completed' : sample(['Pending', 'In Progress', 'Blocked']),
      dueDate: new Date(new Date(session.date).getTime() + randomInt(7, 14) * 86400000).toISOString(),
      completedDate: isCompleted ? new Date(new Date(session.date).getTime() + randomInt(1, 7) * 86400000).toISOString() : undefined,
    });
  }
});
