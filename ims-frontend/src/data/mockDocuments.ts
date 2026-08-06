import { MOCK_USERS } from './mockUsers';

export type DocumentCategory = 'Proposal' | 'Business Plan' | 'Pitch Deck' | 'Presentation' | 'Research Paper' | 'Financial Report' | 'Agreement' | 'Certificate' | 'Image' | 'Video' | 'Other';
export type FileType = 'pdf' | 'doc' | 'docx' | 'xls' | 'xlsx' | 'ppt' | 'pptx' | 'png' | 'jpg' | 'mp4' | 'zip';
export type DocumentStatus = 'Approved' | 'Pending Approval' | 'Rejected' | 'Draft' | 'Archived';
export type DocumentModule = 'Innovation' | 'Startup' | 'Funding' | 'Mentorship' | 'Competition' | 'General';

export interface DocumentFolder {
  id: string;
  name: string;
  parentId: string | null;
  ownerId: string;
  createdAt: string;
  color?: string;
}

export interface DocumentVersion {
  id: string;
  version: string;
  url: string;
  size: number; // bytes
  uploadedBy: string;
  uploadedAt: string;
  notes: string;
}

export interface DocumentActivity {
  id: string;
  action: 'Uploaded' | 'Viewed' | 'Downloaded' | 'Shared' | 'Edited' | 'Deleted' | 'Approved' | 'Rejected';
  userId: string;
  timestamp: string;
  details?: string;
}

export interface Document {
  id: string;
  code: string;
  name: string;
  description: string;
  folderId: string | null; // null means root
  ownerId: string;
  category: DocumentCategory;
  module: DocumentModule;
  fileType: FileType;
  currentVersion: string;
  status: DocumentStatus;
  isShared: boolean;
  sharedWith: string[]; // user IDs
  tags: string[];
  
  versions: DocumentVersion[];
  activity: DocumentActivity[];
  
  // Computed values from current version for quick access
  size: number; 
  lastModified: string;
  
  downloads: number;
  views: number;
}

const randomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
const sample = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];
const generateDate = (offsetDays: number) => new Date(Date.now() + offsetDays * 86400000).toISOString();

export const DOCUMENT_CATEGORIES: { name: DocumentCategory; icon: string; description: string }[] = [
  { name: 'Proposal', icon: 'FileText', description: 'Project and grant proposals' },
  { name: 'Business Plan', icon: 'Briefcase', description: 'Startup business plans and models' },
  { name: 'Pitch Deck', icon: 'Presentation', description: 'Investor pitch decks' },
  { name: 'Research Paper', icon: 'BookOpen', description: 'Academic and scientific research' },
  { name: 'Financial Report', icon: 'PieChart', description: 'Budgets, projections, and reports' },
  { name: 'Agreement', icon: 'PenTool', description: 'Contracts, NDAs, and MoUs' },
  { name: 'Certificate', icon: 'Award', description: 'Certificates of completion or achievement' },
  { name: 'Image', icon: 'Image', description: 'Logos, photos, and diagrams' },
  { name: 'Video', icon: 'Video', description: 'Pitch videos and demonstrations' },
  { name: 'Other', icon: 'File', description: 'Miscellaneous documents' },
];

export const MOCK_FOLDERS: DocumentFolder[] = [
  { id: 'f_1', name: 'Startup Pitch Decks', parentId: null, ownerId: 'u_1', createdAt: generateDate(-100), color: 'blue' },
  { id: 'f_2', name: 'Funding Applications 2026', parentId: null, ownerId: 'u_2', createdAt: generateDate(-50), color: 'emerald' },
  { id: 'f_3', name: 'Legal Documents', parentId: null, ownerId: 'u_1', createdAt: generateDate(-200), color: 'red' },
  { id: 'f_4', name: 'Seed Stage', parentId: 'f_1', ownerId: 'u_1', createdAt: generateDate(-90), color: 'amber' },
  { id: 'f_5', name: 'Series A', parentId: 'f_1', ownerId: 'u_1', createdAt: generateDate(-80), color: 'purple' },
];

const FILE_TYPES: FileType[] = ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'png', 'jpg', 'mp4', 'zip'];
const MODULES: DocumentModule[] = ['Innovation', 'Startup', 'Funding', 'Mentorship', 'Competition', 'General'];
const STATUSES: DocumentStatus[] = ['Approved', 'Pending Approval', 'Rejected', 'Draft', 'Archived'];

export const MOCK_DOCUMENTS: Document[] = Array.from({ length: 500 }).map((_, i) => {
  const isPdf = Math.random() > 0.4;
  const fileType: FileType = isPdf ? 'pdf' : sample(FILE_TYPES);
  
  const v1Date = generateDate(-randomInt(30, 365));
  const v2Date = generateDate(-randomInt(1, 29));
  
  const owner = sample(MOCK_USERS);
  
  const size = randomInt(1024 * 50, 1024 * 1024 * 50); // 50KB to 50MB

  const versions: DocumentVersion[] = [
    {
      id: `v_${i}_1`,
      version: '1.0',
      url: `https://dummyimage.com/800x1000/eeeeee/333333.png&text=Document+${i}+v1.0`,
      size: size * 0.9,
      uploadedBy: owner.id,
      uploadedAt: v1Date,
      notes: 'Initial upload'
    }
  ];

  if (Math.random() > 0.7) {
    versions.push({
      id: `v_${i}_2`,
      version: '1.1',
      url: `https://dummyimage.com/800x1000/eeeeee/333333.png&text=Document+${i}+v1.1`,
      size,
      uploadedBy: owner.id,
      uploadedAt: v2Date,
      notes: 'Revised based on feedback'
    });
  }

  const currentVersionObj = versions[versions.length - 1];

  return {
    id: `doc_${i + 1}`,
    code: `DOC-${new Date().getFullYear()}-${String(i + 1).padStart(4, '0')}`,
    name: sample([
      'Business_Plan_Final', 'Q3_Financial_Projections', 'Project_Proposal_Draft', 
      'Team_Structure', 'Market_Research_Report', 'NDA_Template', 
      'System_Architecture_Diagram', 'Pitch_Deck_v2', 'Certificate_of_Incorporation'
    ]) + `_${i}.${fileType}`,
    description: 'A comprehensive document outlining our strategy and implementation plan for the upcoming quarter.',
    folderId: Math.random() > 0.5 ? sample(MOCK_FOLDERS).id : null,
    ownerId: owner.id,
    category: sample(DOCUMENT_CATEGORIES).name,
    module: sample(MODULES),
    fileType,
    currentVersion: currentVersionObj.version,
    status: sample(STATUSES),
    isShared: Math.random() > 0.6,
    sharedWith: Math.random() > 0.6 ? [sample(MOCK_USERS).id, sample(MOCK_USERS).id] : [],
    tags: ['Important', 'Review', sample(['Startup', 'Finance', 'Tech', 'Legal'])],
    
    versions: versions.reverse(), // latest first
    activity: [
      { id: `act_${i}_1`, action: 'Uploaded', userId: owner.id, timestamp: v1Date, details: 'Uploaded version 1.0' },
      ...(Math.random() > 0.5 ? [{ id: `act_${i}_2`, action: 'Viewed' as const, userId: sample(MOCK_USERS).id, timestamp: generateDate(-randomInt(1, 20)) }] : [])
    ].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()),
    
    size: currentVersionObj.size,
    lastModified: currentVersionObj.uploadedAt,
    
    downloads: randomInt(0, 150),
    views: randomInt(5, 500)
  };
});

export const STORAGE_STATS = {
  total: 100 * 1024 * 1024 * 1024, // 100 GB
  used: MOCK_DOCUMENTS.reduce((acc, doc) => acc + doc.size, 0) * 5, // Multiply for a realistic number
  filesCount: MOCK_DOCUMENTS.length
};
