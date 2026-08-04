import { MOCK_SCHOOLS, MOCK_HUBS, MOCK_MANAGERS } from './mockOrganization';
import { MOCK_USERS } from './mockUsers';

export type InnovationStage = 'Idea' | 'Submitted' | 'Under Review' | 'Evaluated' | 'Approved' | 'Prototyping' | 'Startup Formed' | 'Rejected';
export type InnovationCategory = 'Artificial Intelligence' | 'Blue Economy' | 'Agriculture' | 'Health' | 'Education' | 'Business' | 'Tourism' | 'Environment' | 'ICT' | 'Engineering' | 'Research';

export interface InnovationDocument {
  id: string;
  name: string;
  type: 'PDF' | 'DOCX' | 'PPTX' | 'IMAGE';
  size: string;
  uploadDate: string;
  url: string;
}

export interface InnovationTimelineEvent {
  id: string;
  stage: InnovationStage;
  date: string;
  actorId: string;
  actorName: string;
  actorRole: string;
  comment?: string;
}

export interface Innovation {
  id: string;
  code: string;
  title: string;
  shortDescription: string;
  problemStatement: string;
  proposedSolution: string;
  categoryId: InnovationCategory;
  keywords: string[];
  
  // Details
  objectives: string;
  targetBeneficiaries: string;
  expectedImpact: string;
  innovationType: 'Product' | 'Service' | 'Process' | 'Model';
  technologyUsed: string;
  researchArea: string;
  sdgAlignment: string[];

  // Business
  marketOpportunity: string;
  commercialPotential: 'High' | 'Medium' | 'Low';
  estimatedCost: number;
  expectedRevenue: number;
  competitors: string;

  // Relations
  ownerId: string;
  schoolId: string;
  hubId: string;
  managerId: string;
  teamMembers: { role: string; name: string }[];
  
  // Lifecycle
  stage: InnovationStage;
  submissionDate: string;
  lastUpdated: string;
  progress: number; // 0-100
  
  documents: InnovationDocument[];
  timeline: InnovationTimelineEvent[];
}

export const INNOVATION_CATEGORIES = [
  { id: 'Artificial Intelligence', icon: 'BrainCircuit', desc: 'AI, Machine Learning, Data Science applications' },
  { id: 'Blue Economy', icon: 'Waves', desc: 'Marine resources, fisheries, coastal tourism' },
  { id: 'Agriculture', icon: 'Leaf', desc: 'Smart farming, agribusiness, food security' },
  { id: 'Health', icon: 'HeartPulse', desc: 'MedTech, public health, biomedical research' },
  { id: 'Education', icon: 'GraduationCap', desc: 'EdTech, e-learning platforms, pedagogy' },
  { id: 'Business', icon: 'Briefcase', desc: 'FinTech, e-commerce, business models' },
  { id: 'Tourism', icon: 'Palmtree', desc: 'Hospitality tech, eco-tourism, heritage' },
  { id: 'Environment', icon: 'TreePine', desc: 'Climate tech, renewable energy, conservation' },
  { id: 'ICT', icon: 'Laptop', desc: 'Software, networks, IoT, cybersecurity' },
  { id: 'Engineering', icon: 'Wrench', desc: 'Hardware, mechanics, civil infrastructure' },
  { id: 'Research', icon: 'Microscope', desc: 'Fundamental science, applied research' },
];

const STAGES: InnovationStage[] = ['Idea', 'Submitted', 'Under Review', 'Evaluated', 'Approved', 'Prototyping', 'Startup Formed', 'Rejected'];
const ADJECTIVES = ['Smart', 'Digital', 'Eco', 'NextGen', 'Intelligent', 'Mobile', 'Automated', 'Virtual', 'Quantum', 'Nano'];
const NOUNS = ['Platform', 'System', 'Network', 'Monitor', 'Analyzer', 'Tracker', 'Optimiser', 'Engine', 'Portal', 'Assistant'];

// Helper to get random item
const sample = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];
const randomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

// Generate 120 dummy innovations
export const MOCK_INNOVATIONS: Innovation[] = Array.from({ length: 120 }).map((_, index) => {
  const school = sample(MOCK_SCHOOLS);
  const hub = sample(MOCK_HUBS);
  const manager = MOCK_MANAGERS.find(m => m.hubId === hub.id) || MOCK_MANAGERS[0];
  const owner = sample(Object.values(MOCK_USERS).filter(u => u.role === 'ROLE_STUDENT' || u.role === 'ROLE_RESEARCHER'));
  
  const category = sample(INNOVATION_CATEGORIES).id as InnovationCategory;
  const stage = STAGES[randomInt(0, 6)]; // Exclude rejected for mostly positive data
  
  const progressMap: Record<InnovationStage, number> = {
    'Idea': 10, 'Submitted': 25, 'Under Review': 40, 'Evaluated': 55, 
    'Approved': 70, 'Prototyping': 85, 'Startup Formed': 100, 'Rejected': 100
  };

  const code = `INV-2024-${String(index + 1001).padStart(4, '0')}`;
  
  return {
    id: `inv_${index}`,
    code,
    title: `${sample(ADJECTIVES)} ${category.split(' ')[0]} ${sample(NOUNS)}`,
    shortDescription: `A revolutionary approach to solving critical challenges in ${category.toLowerCase()} using cutting-edge technology.`,
    problemStatement: 'Current systems are inefficient, expensive, and lack proper data integration leading to massive resource waste.',
    proposedSolution: 'An integrated hardware and software solution that utilizes AI and IoT sensors to optimize resource allocation in real-time.',
    categoryId: category,
    keywords: ['Innovation', category.split(' ')[0], 'Tech', 'SUZA', 'Zanzibar'],
    
    objectives: '1. Reduce costs by 30%\n2. Improve efficiency by 45%\n3. Provide real-time analytics dashboards',
    targetBeneficiaries: 'Local communities, government agencies, and small businesses in Zanzibar.',
    expectedImpact: 'Creation of 50+ direct jobs and significant reduction in environmental waste within 5 years.',
    innovationType: sample(['Product', 'Service', 'Process', 'Model']),
    technologyUsed: 'React, Node.js, Python AI Models, LoRaWAN Sensors, AWS',
    researchArea: 'Applied Machine Learning',
    sdgAlignment: ['SDG 9: Industry, Innovation and Infrastructure', 'SDG 11: Sustainable Cities'],

    marketOpportunity: 'The Total Addressable Market (TAM) in East Africa alone is estimated at $150M annually.',
    commercialPotential: sample(['High', 'Medium', 'High', 'High']),
    estimatedCost: randomInt(5000, 50000),
    expectedRevenue: randomInt(100000, 500000),
    competitors: 'Traditional manual systems, fragmented software tools without local context.',

    ownerId: owner.id,
    schoolId: school.id,
    hubId: hub.id,
    managerId: manager.id,
    teamMembers: [
      { role: 'Co-Founder', name: 'Ali Hassan' },
      { role: 'Lead Developer', name: 'Fatma Juma' },
      { role: 'Supervisor', name: school.deanName }
    ],

    stage: stage,
    submissionDate: new Date(Date.now() - randomInt(1, 100) * 86400000).toISOString(),
    lastUpdated: new Date(Date.now() - randomInt(0, 5) * 86400000).toISOString(),
    progress: progressMap[stage],

    documents: [
      { id: 'doc_1', name: 'Project_Proposal_v2.pdf', type: 'PDF', size: '2.4 MB', uploadDate: '2024-01-15T10:00:00Z', url: '#' },
      { id: 'doc_2', name: 'Architecture_Diagram.png', type: 'IMAGE', size: '1.1 MB', uploadDate: '2024-01-16T14:30:00Z', url: '#' },
      { id: 'doc_3', name: 'Business_Model_Canvas.pptx', type: 'PPTX', size: '5.2 MB', uploadDate: '2024-02-01T09:15:00Z', url: '#' }
    ],

    timeline: [
      { id: 'evt_1', stage: 'Idea', date: '2024-01-01T08:00:00Z', actorId: owner.id, actorName: `${owner.firstName} ${owner.lastName}`, actorRole: 'Innovator', comment: 'Initial idea drafted' },
      { id: 'evt_2', stage: 'Submitted', date: '2024-01-15T10:00:00Z', actorId: owner.id, actorName: `${owner.firstName} ${owner.lastName}`, actorRole: 'Innovator', comment: 'Formal submission completed via portal' },
    ]
  };
});
