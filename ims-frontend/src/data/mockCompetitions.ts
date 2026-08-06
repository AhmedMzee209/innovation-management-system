import { MOCK_STARTUPS } from './mockStartups';
import { MOCK_USERS } from './mockUsers';

export type CompetitionStatus = 'Draft' | 'Upcoming' | 'Registration Open' | 'Live' | 'Completed' | 'Cancelled';
export type PitchSessionStatus = 'Scheduled' | 'Ongoing' | 'Completed';
export type ParticipantStatus = 'Pending' | 'Approved' | 'Rejected' | 'Checked In';

export interface Competition {
  id: string;
  code: string;
  name: string;
  description: string;
  type: 'Hackathon' | 'Pitch Deck' | 'Business Plan' | 'Innovation Challenge';
  category: string;
  registrationStart: string;
  registrationEnd: string;
  startDate: string;
  endDate: string;
  venue: string;
  status: CompetitionStatus;
  prizePool: number;
  organizer: string;
  maxTeams: number;
  bannerColor: string;
}

export interface CompetitionParticipant {
  id: string;
  competitionId: string;
  startupId: string;
  status: ParticipantStatus;
  registrationDate: string;
  pitchSessionId?: string;
  finalScore?: number;
  rank?: number;
}

export interface CompetitionJudge {
  id: string;
  competitionId: string;
  userId: string;
  expertise: string[];
  assignedSessions: string[];
}

export interface PitchSession {
  id: string;
  competitionId: string;
  name: string;
  startTime: string;
  endTime: string;
  venue: string;
  status: PitchSessionStatus;
  judgeIds: string[];
  participantIds: string[];
}

const randomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
const sample = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];
const generateDate = (offsetDays: number) => new Date(Date.now() + offsetDays * 86400000).toISOString();

const BANNERS = ['from-blue-600 to-indigo-700', 'from-emerald-500 to-teal-700', 'from-purple-600 to-pink-600', 'from-amber-500 to-orange-600', 'from-[#0098c8] to-blue-800'];

export const MOCK_COMPETITIONS: Competition[] = Array.from({ length: 20 }).map((_, i) => {
  const statusRoll = Math.random();
  let status: CompetitionStatus = 'Draft';
  let regStartOffset = 0, regEndOffset = 0, startOffset = 0, endOffset = 0;

  if (statusRoll > 0.8) {
    status = 'Completed';
    regStartOffset = -90; regEndOffset = -60; startOffset = -55; endOffset = -50;
  } else if (statusRoll > 0.5) {
    status = 'Live';
    regStartOffset = -30; regEndOffset = -5; startOffset = -1; endOffset = 2;
  } else if (statusRoll > 0.2) {
    status = 'Registration Open';
    regStartOffset = -10; regEndOffset = 20; startOffset = 25; endOffset = 28;
  } else {
    status = 'Upcoming';
    regStartOffset = 30; regEndOffset = 60; startOffset = 65; endOffset = 68;
  }

  return {
    id: `comp_${i + 1}`,
    code: `SUZA-COMP-${new Date().getFullYear()}-${String(i + 1).padStart(3, '0')}`,
    name: sample(['OceanTech Hackathon', 'SUZA PitchFest', 'Zanzibar Innovates', 'Green Energy Challenge', 'AI for Good Competition']),
    description: 'An intense, multi-day competition focused on building scalable prototypes and pitching to top-tier investors.',
    type: sample(['Hackathon', 'Pitch Deck', 'Business Plan', 'Innovation Challenge']),
    category: sample(['Technology', 'Agriculture', 'Healthcare', 'Education', 'Tourism']),
    registrationStart: generateDate(regStartOffset),
    registrationEnd: generateDate(regEndOffset),
    startDate: generateDate(startOffset),
    endDate: generateDate(endOffset),
    venue: sample(['Main Hall, SUZA Tunguu', 'Innovation Hub, Vuga', 'Virtual via Zoom', 'Kiembe Samaki Campus']),
    status,
    prizePool: randomInt(1, 10) * 10000,
    organizer: sample(['School of Computing', 'SUZA Hub', 'Zanzibar Tech Association', 'Ministry of Education']),
    maxTeams: randomInt(10, 50),
    bannerColor: sample(BANNERS),
  };
});

// Helper to grab IDs
const compIds = MOCK_COMPETITIONS.map(c => c.id);
const startupIds = MOCK_STARTUPS.map(s => s.id);
const academicStaff = MOCK_USERS.filter(u => u.role === 'ROLE_MENTOR' || u.role === 'ROLE_REVIEWER');

export const MOCK_PARTICIPANTS: CompetitionParticipant[] = Array.from({ length: 300 }).map((_, i) => {
  const compId = sample(compIds);
  const isCompleted = MOCK_COMPETITIONS.find(c => c.id === compId)?.status === 'Completed';
  const statusRoll = Math.random();

  return {
    id: `cp_${i + 1}`,
    competitionId: compId,
    startupId: sample(startupIds),
    status: statusRoll > 0.2 ? 'Approved' : (statusRoll > 0.1 ? 'Pending' : 'Rejected'),
    registrationDate: generateDate(-randomInt(10, 40)),
    finalScore: isCompleted ? randomInt(60, 98) : undefined,
    rank: isCompleted ? randomInt(1, 15) : undefined,
  };
});

export const MOCK_PITCH_SESSIONS: PitchSession[] = Array.from({ length: 120 }).map((_, i) => {
  const compId = sample(compIds);
  const participants = MOCK_PARTICIPANTS.filter(p => p.competitionId === compId && p.status === 'Approved');
  const compStatus = MOCK_COMPETITIONS.find(c => c.id === compId)?.status;
  
  return {
    id: `ps_${i + 1}`,
    competitionId: compId,
    name: `Pitch Session ${String.fromCharCode(65 + randomInt(0, 5))}`,
    startTime: generateDate(compStatus === 'Completed' ? -50 : (compStatus === 'Live' ? 0 : 30)),
    endTime: generateDate(compStatus === 'Completed' ? -50 + 0.1 : (compStatus === 'Live' ? 0.1 : 30.1)),
    venue: sample(['Room 101', 'Auditorium A', 'Virtual Stage 1', 'Main Hub Space']),
    status: compStatus === 'Completed' ? 'Completed' : (compStatus === 'Live' ? 'Ongoing' : 'Scheduled'),
    judgeIds: [], // Will populate below
    participantIds: participants.slice(0, 5).map(p => p.id),
  };
});

export const MOCK_JUDGES: CompetitionJudge[] = Array.from({ length: 40 }).map((_, i) => {
  const compId = sample(compIds);
  const sessions = MOCK_PITCH_SESSIONS.filter(s => s.competitionId === compId);
  const judgeId = `judge_${i + 1}`;
  
  // Assign judge to sessions
  sessions.slice(0, 3).forEach(s => s.judgeIds.push(judgeId));

  return {
    id: judgeId,
    competitionId: compId,
    userId: sample(academicStaff).id,
    expertise: [sample(['Software', 'Business', 'Finance', 'Marketing']), sample(['AI', 'AgriTech', 'EdTech'])],
    assignedSessions: sessions.slice(0, 3).map(s => s.id),
  };
});
