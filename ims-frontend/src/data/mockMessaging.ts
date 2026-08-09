import { MOCK_USERS } from './mockUsers';

// Types
export type Priority = 'Low' | 'Medium' | 'High' | 'Critical';
export type NotificationCategory = 'System' | 'Mentorship' | 'Funding' | 'Competition' | 'Startup' | 'Review';
export type AnnouncementCategory = 'General' | 'Event' | 'Funding Opportunity' | 'System Update';
export type AudienceType = 'All Users' | 'Innovators' | 'Academic Staff' | 'Hub Managers';

export interface Notification {
  id: string;
  title: string;
  message: string;
  senderId: string | 'System';
  recipientId: string;
  priority: Priority;
  category: NotificationCategory;
  isRead: boolean;
  createdAt: string;
  actionUrl?: string;
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  content: string;
  createdAt: string;
  isRead: boolean;
  attachments?: { name: string; url: string; size: string }[];
}

export interface Conversation {
  id: string;
  participants: string[]; // user IDs
  isGroup: boolean;
  groupName?: string;
  groupAvatar?: string;
  lastMessageId?: string;
  updatedAt: string;
  isPinned: boolean;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  category: AnnouncementCategory;
  audience: AudienceType;
  priority: Priority;
  authorId: string;
  createdAt: string;
  expiresAt: string;
  attachments?: { name: string; url: string }[];
}

// Helpers
const randomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
const sample = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];
const generateDate = (offsetDays: number, offsetHours = 0) => 
  new Date(Date.now() + offsetDays * 86400000 + offsetHours * 3600000).toISOString();

// Mock Data Generators

export const MOCK_NOTIFICATIONS: Notification[] = Array.from({ length: 500 }).map((_, i) => ({
  id: `notif_${i + 1}`,
  title: sample([
    'New Application Received', 
    'Meeting Reminder', 
    'Funding Approved', 
    'System Maintenance',
    'Review Required'
  ]),
  message: 'This is a detailed message for the notification explaining what action is required from the user.',
  senderId: Math.random() > 0.8 ? 'System' : sample(MOCK_USERS).id,
  recipientId: sample(MOCK_USERS).id, // In a real app this would be targeted
  priority: sample(['Low', 'Medium', 'Medium', 'High', 'Critical']),
  category: sample(['System', 'Mentorship', 'Funding', 'Competition', 'Startup', 'Review']),
  isRead: Math.random() > 0.4,
  createdAt: generateDate(-randomInt(0, 30), -randomInt(0, 24)),
  actionUrl: Math.random() > 0.5 ? '/dashboard' : undefined
})).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());


export const MOCK_CONVERSATIONS: Conversation[] = Array.from({ length: 50 }).map((_, i) => {
  const isGroup = Math.random() > 0.8;
  const participantCount = isGroup ? randomInt(3, 8) : 2;
  const participants = Array.from({ length: participantCount }).map(() => sample(MOCK_USERS).id);
  
  return {
    id: `conv_${i + 1}`,
    participants: [...new Set([...participants, MOCK_USERS[0].id])], // Ensure current user (u_1 usually) is in some
    isGroup,
    groupName: isGroup ? sample(['Project Alpha Team', 'SUZA Hub Managers', 'Mentorship Cohort 1', 'Funding Reviewers']) : undefined,
    groupAvatar: isGroup ? `https://ui-avatars.com/api/?name=Group&background=random` : undefined,
    updatedAt: generateDate(-randomInt(0, 30), -randomInt(0, 24)),
    isPinned: Math.random() > 0.9,
  };
});

let msgIdCounter = 1;
export const MOCK_MESSAGES: Message[] = [];

MOCK_CONVERSATIONS.forEach(conv => {
  const msgCount = randomInt(5, 50);
  let lastMsgId = '';
  
  for (let j = 0; j < msgCount; j++) {
    const id = `msg_${msgIdCounter++}`;
    lastMsgId = id;
    
    MOCK_MESSAGES.push({
      id,
      conversationId: conv.id,
      senderId: sample(conv.participants),
      content: sample([
        'Hello everyone!',
        'Could you review the latest funding proposal?',
        'I have scheduled the mentorship session for next Tuesday.',
        'Please check the attached document.',
        'Looks good to me. Approved.',
        'When is the deadline for the competition registration?',
        'Thank you!',
        'I am working on the startup valuation report now.',
        'Can we jump on a quick call?'
      ]),
      createdAt: generateDate(-randomInt(0, 10), -randomInt(0, 24)),
      isRead: Math.random() > 0.2,
      attachments: Math.random() > 0.9 ? [{ name: 'Document.pdf', url: '#', size: '2.4 MB' }] : undefined
    });
  }
  
  conv.lastMessageId = lastMsgId;
});

// Sort messages chronologically
MOCK_MESSAGES.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
// Sort conversations by latest update
MOCK_CONVERSATIONS.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());

export const MOCK_ANNOUNCEMENTS: Announcement[] = Array.from({ length: 50 }).map((_, i) => ({
  id: `ann_${i + 1}`,
  title: sample([
    'SUZA Innovation Week 2026', 
    'New Seed Funding Opportunity', 
    'System Downtime Scheduled', 
    'Welcome to the new Cohort',
    'Call for Judges: App Dev Challenge'
  ]),
  content: 'We are excited to announce a new milestone for the university. Please read the full details and ensure that your respective teams are informed. Attachments include the formal memo and schedule.',
  category: sample(['General', 'Event', 'Funding Opportunity', 'System Update']),
  audience: sample(['All Users', 'Innovators', 'Academic Staff', 'Hub Managers']),
  priority: sample(['Low', 'Medium', 'High']),
  authorId: sample(MOCK_USERS).id,
  createdAt: generateDate(-randomInt(0, 60)),
  expiresAt: generateDate(randomInt(10, 60)),
})).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
