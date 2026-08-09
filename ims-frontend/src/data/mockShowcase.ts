// ============================================================
// MOCK DATA — Phase 16: Public Innovation Showcase
// ============================================================

export type ShowcaseCategory =
  | 'AgriTech'
  | 'EduTech'
  | 'FinTech'
  | 'HealthTech'
  | 'GreenTech'
  | 'AI & ML'
  | 'IoT'
  | 'Blockchain'
  | 'CleanEnergy'
  | 'MobileTech';

export type StartupStage = 'Ideation' | 'Prototype' | 'MVP' | 'Early Revenue' | 'Growth' | 'Scale-up';
export type PartnerType = 'Academic' | 'Corporate' | 'Government' | 'NGO' | 'International';
export type AwardType = 'Innovation' | 'Startup' | 'Competition' | 'Research' | 'Special';
export type EventType = 'Hackathon' | 'Bootcamp' | 'Demo Day' | 'Seminar' | 'Conference' | 'Training';

const SCHOOLS = [
  'School of Computing (SoC)',
  'School of Business (SoB)',
  'School of Education (SoE)',
  'School of Natural Sciences (SoNS)',
  'School of Arts (SoA)',
  'School of Engineering (SoEng)',
];

const HUBS = ['Tech Innovation Hub', 'Business Innovation Hub', 'AgriTech Hub', 'EduTech Hub'];

const CATEGORIES: ShowcaseCategory[] = [
  'AgriTech', 'EduTech', 'FinTech', 'HealthTech', 'GreenTech',
  'AI & ML', 'IoT', 'Blockchain', 'CleanEnergy', 'MobileTech',
];

const TECH_STACKS = [
  ['React', 'Node.js', 'MongoDB'],
  ['Python', 'TensorFlow', 'FastAPI'],
  ['Flutter', 'Firebase', 'Dart'],
  ['Java', 'Spring Boot', 'PostgreSQL'],
  ['Arduino', 'Raspberry Pi', 'C++'],
  ['Solidity', 'Ethereum', 'Web3.js'],
  ['Vue.js', 'Laravel', 'MySQL'],
  ['React Native', 'Expo', 'Supabase'],
];

const FIRST_NAMES = ['Amina', 'Hassan', 'Fatima', 'Khalid', 'Zainab', 'Omar', 'Maryam', 'Ali', 'Yasmin', 'Tariq', 'Nadia', 'Ibrahim', 'Salma', 'Yusuf', 'Hawa', 'Juma', 'Rehema', 'Saidi', 'Mariam', 'Ahmed'];
const LAST_NAMES = ['Mohammed', 'Abdullah', 'Hassan', 'Ali', 'Omar', 'Juma', 'Salim', 'Bakari', 'Hamad', 'Rashid', 'Kombo', 'Mwinyi', 'Zuberi', 'Seif', 'Nasser'];

function randItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}
function randInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function randomName() {
  return `${randItem(FIRST_NAMES)} ${randItem(LAST_NAMES)}`;
}
function avatar(seed: string) {
  return `https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(seed)}&backgroundColor=0098c8`;
}
function coverImg(id: number) {
  const topics = ['technology', 'science', 'startup', 'business', 'education', 'nature', 'agriculture'];
  return `https://picsum.photos/seed/${id + 100}/800/450`;
}

// ─── INNOVATIONS ────────────────────────────────────────────
export interface ShowcaseInnovation {
  id: string;
  title: string;
  tagline: string;
  description: string;
  category: ShowcaseCategory;
  school: string;
  hub: string;
  stage: 'Concept' | 'Prototype' | 'Pilot' | 'Deployed';
  tech: string[];
  teamLead: string;
  teamLeadAvatar: string;
  teamSize: number;
  coverImage: string;
  likes: number;
  views: number;
  year: number;
  featured: boolean;
  tags: string[];
}

const INNOVATION_TITLES = [
  'Smart Irrigation System using AI Sensors',
  'Mobile-Based Crop Disease Detection',
  'Blockchain Land Registry for Zanzibar',
  'E-Learning Platform for Rural Students',
  'Solar-Powered Water Purification Unit',
  'Smart Waste Management IoT System',
  'FinTech Micro-Lending for Fishermen',
  'AI-Powered Mental Health Chatbot',
  'Portable Malaria Diagnostic Device',
  'Digital Marketplace for Local Artisans',
  'Smart Grid Energy Distribution System',
  'AR-Based Tourism Guide for Stone Town',
  'Automated Aquaculture Monitoring System',
  'Community Health Record Management',
  'Smart Traffic Management System',
  'Vertical Farming Innovation Unit',
  'Peer-to-Peer Renewable Energy Trading',
  'Coastal Erosion Monitoring via Drones',
  'Offline-First Education App',
  'Spice Supply Chain Traceability',
];

const TAGLINES = [
  'Revolutionizing agriculture through intelligent automation',
  'Empowering communities with accessible technology',
  'Bridging the digital divide in rural Zanzibar',
  'Data-driven solutions for real-world problems',
  'Sustainable innovation for a better tomorrow',
  'Transforming local industries with modern tech',
  'Connecting people through smart digital platforms',
  'Harnessing AI for social good in East Africa',
];

export const SHOWCASE_INNOVATIONS: ShowcaseInnovation[] = Array.from({ length: 300 }, (_, i) => {
  const title = INNOVATION_TITLES[i % INNOVATION_TITLES.length] + (i >= INNOVATION_TITLES.length ? ` v${Math.floor(i / INNOVATION_TITLES.length) + 1}` : '');
  const lead = randomName();
  return {
    id: `inn-${i + 1}`,
    title,
    tagline: randItem(TAGLINES),
    description: `This innovation addresses a critical challenge in ${randItem(CATEGORIES).toLowerCase()} through an integrated approach combining ${randItem(TECH_STACKS).join(', ')}. Developed by SUZA innovators, it has demonstrated significant impact in pilot testing across multiple communities in Zanzibar.`,
    category: CATEGORIES[i % CATEGORIES.length],
    school: SCHOOLS[i % SCHOOLS.length],
    hub: HUBS[i % HUBS.length],
    stage: (['Concept', 'Prototype', 'Pilot', 'Deployed'] as const)[i % 4],
    tech: TECH_STACKS[i % TECH_STACKS.length],
    teamLead: lead,
    teamLeadAvatar: avatar(lead),
    teamSize: randInt(2, 8),
    coverImage: coverImg(i),
    likes: randInt(10, 500),
    views: randInt(100, 5000),
    year: randInt(2021, 2026),
    featured: i < 12,
    tags: [CATEGORIES[i % CATEGORIES.length], SCHOOLS[i % SCHOOLS.length].split(' ')[2] ?? 'Tech', 'SUZA'],
  };
});

// ─── STARTUPS ───────────────────────────────────────────────
export interface ShowcaseStartup {
  id: string;
  name: string;
  tagline: string;
  description: string;
  logo: string;
  founder: string;
  founderAvatar: string;
  school: string;
  industry: ShowcaseCategory;
  stage: StartupStage;
  fundingReceived: number;
  teamSize: number;
  founded: number;
  achievements: string[];
  coverImage: string;
  featured: boolean;
  website: string;
}

const STARTUP_NAMES = [
  'AgroSense', 'EduReach', 'PayZan', 'HealthLink', 'SolarNest',
  'WasteWise', 'FishFin', 'MindCare', 'DiagnoKit', 'ArtisanHub',
  'GridFlow', 'StoneGuide', 'AquaWatch', 'CareChain', 'FlowCity',
  'FarmTower', 'EnergySwap', 'CoastWatch', 'LearnAfrica', 'SpiceTrace',
];
const STARTUP_ACHIEVEMENTS = [
  'Winner of SUZA Innovation Challenge 2025',
  'Selected for East Africa Startup Accelerator',
  '$50K seed funding secured',
  'Featured in TechCrunch Africa',
  '500+ active users in pilot phase',
  'Partnership with UNDP Tanzania',
  'Patent pending — innovative sensor design',
  'Best Startup — Zanzibar Tech Expo 2025',
  'Deployed in 3 districts across Zanzibar',
  '10,000+ lives impacted',
];

export const SHOWCASE_STARTUPS: ShowcaseStartup[] = Array.from({ length: 100 }, (_, i) => {
  const name = STARTUP_NAMES[i % STARTUP_NAMES.length] + (i >= STARTUP_NAMES.length ? ` ${Math.floor(i / STARTUP_NAMES.length) + 1}` : '');
  const founder = randomName();
  return {
    id: `stup-${i + 1}`,
    name,
    tagline: randItem(TAGLINES),
    description: `${name} is an innovative startup founded at SUZA, focusing on ${randItem(CATEGORIES).toLowerCase()} solutions for East African communities. Our technology bridges the gap between traditional practices and modern digital tools.`,
    logo: avatar(name),
    founder,
    founderAvatar: avatar(founder),
    school: SCHOOLS[i % SCHOOLS.length],
    industry: CATEGORIES[i % CATEGORIES.length],
    stage: (['Ideation', 'Prototype', 'MVP', 'Early Revenue', 'Growth', 'Scale-up'] as StartupStage[])[i % 6],
    fundingReceived: randInt(0, 500) * 1000,
    teamSize: randInt(2, 15),
    founded: randInt(2020, 2026),
    achievements: [randItem(STARTUP_ACHIEVEMENTS), randItem(STARTUP_ACHIEVEMENTS)].filter((v, idx, a) => a.indexOf(v) === idx),
    coverImage: coverImg(i + 300),
    featured: i < 8,
    website: `https://${name.toLowerCase().replace(/\s/g, '')}.co.tz`,
  };
});

// ─── SUCCESS STORIES ────────────────────────────────────────
export interface SuccessStory {
  id: string;
  title: string;
  summary: string;
  innovator: string;
  innovatorAvatar: string;
  innovation: string;
  startup: string;
  school: string;
  year: number;
  coverImage: string;
  testimonial: string;
  achievements: string[];
  milestones: { date: string; event: string }[];
  featured: boolean;
}

const STORY_TITLES = [
  'From Classroom to Market: How AgroSense Changed Farming',
  'Building EduReach: A Journey of Persistence and Impact',
  'The Solar Startup That Powered 200 Homes',
  'How a Fisherman Inspired a FinTech Revolution',
  'From Lab Research to Life-Saving Diagnostics',
  'Turning Waste into Wealth with Smart Technology',
  'One App That Connected 10,000 Artisans',
  'The Student Who Built Zanzibar\'s First AI Chatbot',
  'Growing Food in the City: A Vertical Farming Success',
  'Tracing Spices from Farm to Table with Blockchain',
];

export const SHOWCASE_STORIES: SuccessStory[] = Array.from({ length: 50 }, (_, i) => {
  const name = randomName();
  return {
    id: `story-${i + 1}`,
    title: STORY_TITLES[i % STORY_TITLES.length],
    summary: 'A compelling journey of innovation, persistence, and community impact that transformed a simple idea into a thriving enterprise benefiting thousands across Zanzibar.',
    innovator: name,
    innovatorAvatar: avatar(name),
    innovation: INNOVATION_TITLES[i % INNOVATION_TITLES.length],
    startup: STARTUP_NAMES[i % STARTUP_NAMES.length],
    school: SCHOOLS[i % SCHOOLS.length],
    year: randInt(2021, 2026),
    coverImage: coverImg(i + 400),
    testimonial: `"The IMS platform gave us the tools, mentorship, and funding we needed to turn our idea into a real business. SUZA's ecosystem is world-class." — ${name}`,
    achievements: [randItem(STARTUP_ACHIEVEMENTS), randItem(STARTUP_ACHIEVEMENTS)],
    milestones: [
      { date: `Jan ${randInt(2021, 2023)}`, event: 'Idea Submitted to IMS' },
      { date: `Apr ${randInt(2021, 2023)}`, event: 'Approved for Incubation' },
      { date: `Sep ${randInt(2022, 2024)}`, event: 'Prototype Developed' },
      { date: `Jan ${randInt(2023, 2025)}`, event: 'First Funding Secured' },
      { date: `Jun ${randInt(2024, 2026)}`, event: 'Product Launched' },
    ],
    featured: i < 6,
  };
});

// ─── RESEARCH PROJECTS ──────────────────────────────────────
export interface ResearchProject {
  id: string;
  title: string;
  abstract: string;
  area: ShowcaseCategory;
  school: string;
  leadResearcher: string;
  leadResearcherAvatar: string;
  team: string[];
  publications: number;
  patents: number;
  year: number;
  status: 'Ongoing' | 'Completed' | 'Published';
  coverImage: string;
  keywords: string[];
}

const RESEARCH_TITLES = [
  'Machine Learning Models for Crop Yield Prediction in Zanzibar',
  'Blockchain-Based Land Registry: A Feasibility Study',
  'Mobile Health Interventions for Maternal Care',
  'Renewable Energy Potential Assessment for Indian Ocean Islands',
  'Digital Financial Inclusion for Artisanal Fishermen',
  'NLP-Based Swahili Language Processing Framework',
  'Smart Grid Implementation in Developing Economies',
  'IoT-Enabled Marine Ecosystem Monitoring',
  'E-Learning Adoption Barriers in Rural East Africa',
  'Sustainable Agriculture Practices Using Precision Technology',
];

export const SHOWCASE_RESEARCH: ResearchProject[] = Array.from({ length: 100 }, (_, i) => {
  const lead = randomName();
  return {
    id: `res-${i + 1}`,
    title: RESEARCH_TITLES[i % RESEARCH_TITLES.length] + (i >= RESEARCH_TITLES.length ? ` (Part ${Math.floor(i / RESEARCH_TITLES.length) + 1})` : ''),
    abstract: 'This research investigates cutting-edge solutions to pressing challenges in the East African context, combining quantitative analysis with field study methodologies. Findings have significant implications for policy and practice in the region.',
    area: CATEGORIES[i % CATEGORIES.length],
    school: SCHOOLS[i % SCHOOLS.length],
    leadResearcher: lead,
    leadResearcherAvatar: avatar(lead),
    team: [randomName(), randomName()],
    publications: randInt(0, 5),
    patents: randInt(0, 2),
    year: randInt(2020, 2026),
    status: (['Ongoing', 'Completed', 'Published'] as const)[i % 3],
    coverImage: coverImg(i + 500),
    keywords: [CATEGORIES[i % CATEGORIES.length], 'East Africa', 'Zanzibar', 'Innovation'],
  };
});

// ─── AWARDS ─────────────────────────────────────────────────
export interface ShowcaseAward {
  id: string;
  name: string;
  type: AwardType;
  year: number;
  winner: string;
  winnerAvatar: string;
  innovation: string;
  startup?: string;
  prize: string;
  description: string;
  category: ShowcaseCategory;
  school: string;
}

const AWARD_NAMES = [
  'Best Innovation of the Year',
  'Outstanding Startup Award',
  'Research Excellence Prize',
  'Social Impact Award',
  'Best AgriTech Innovation',
  'Best EduTech Solution',
  'Innovation Challenge Champion',
  'SUZA Innovation Grand Prize',
  'Zanzibar Tech Pioneer Award',
  'East Africa Innovation Excellence',
  'Best FinTech Solution',
  'Green Innovation Award',
];

export const SHOWCASE_AWARDS: ShowcaseAward[] = Array.from({ length: 60 }, (_, i) => {
  const winner = randomName();
  return {
    id: `award-${i + 1}`,
    name: AWARD_NAMES[i % AWARD_NAMES.length],
    type: (['Innovation', 'Startup', 'Competition', 'Research', 'Special'] as AwardType[])[i % 5],
    year: randInt(2019, 2026),
    winner,
    winnerAvatar: avatar(winner),
    innovation: INNOVATION_TITLES[i % INNOVATION_TITLES.length],
    startup: i % 3 === 0 ? STARTUP_NAMES[i % STARTUP_NAMES.length] : undefined,
    prize: randInt(1, 50) % 2 === 0 ? `$${randInt(1, 50) * 1000} Cash Prize` : 'Certificate of Excellence',
    description: 'Awarded for exceptional contribution to innovation and technology development that demonstrates measurable community impact.',
    category: CATEGORIES[i % CATEGORIES.length],
    school: SCHOOLS[i % SCHOOLS.length],
  };
});

// ─── EVENTS ─────────────────────────────────────────────────
export interface ShowcaseEvent {
  id: string;
  name: string;
  type: EventType;
  date: string;
  endDate: string;
  location: string;
  description: string;
  participants: number;
  coverImage: string;
  gallery: string[];
  highlights: string[];
  upcoming: boolean;
}

const EVENT_NAMES = [
  'SUZA Innovation Hackathon 2026',
  'Zanzibar Tech Startup Bootcamp',
  'AgriTech Demo Day',
  'East Africa EdTech Conference',
  'Digital Zanzibar Summit',
  'SUZA Research Symposium',
  'Women in Tech Bootcamp',
  'FinTech Innovation Sprint',
  'Green Energy Hackathon',
  'AI & ML Workshop Series',
  'IoT Solutions Expo',
  'Startup Pitch Competition Finals',
  'Innovation Showcase 2025',
  'Youth Innovators Forum',
  'Industry-Academia Connect Day',
];

export const SHOWCASE_EVENTS: ShowcaseEvent[] = Array.from({ length: 80 }, (_, i) => {
  const year = randInt(2022, 2027);
  const month = String(randInt(1, 12)).padStart(2, '0');
  const day = String(randInt(1, 28)).padStart(2, '0');
  const isUpcoming = year >= 2026 && parseInt(month) >= 8;
  return {
    id: `evt-${i + 1}`,
    name: EVENT_NAMES[i % EVENT_NAMES.length] + (i >= EVENT_NAMES.length ? ` (${year})` : ` (${year})`),
    type: (['Hackathon', 'Bootcamp', 'Demo Day', 'Seminar', 'Conference', 'Training'] as EventType[])[i % 6],
    date: `${year}-${month}-${day}`,
    endDate: `${year}-${month}-${String(Math.min(parseInt(day) + randInt(1, 3), 28)).padStart(2, '0')}`,
    location: randItem(['SUZA Main Campus', 'Zanzibar Town Hall', 'Online (Zoom)', 'Stone Town Cultural Centre', 'SUZA Innovation Hub']),
    description: 'A dynamic event bringing together innovators, mentors, investors, and industry leaders to collaborate, compete, and celebrate innovation in Zanzibar.',
    participants: randInt(30, 500),
    coverImage: coverImg(i + 600),
    gallery: [coverImg(i + 601), coverImg(i + 602), coverImg(i + 603)],
    highlights: [
      `${randInt(10, 50)} teams participated`,
      `${randInt(3, 15)} prizes awarded`,
      `Guest speakers from ${randInt(3, 10)} organizations`,
    ],
    upcoming: isUpcoming,
  };
});

// ─── PARTNERS ───────────────────────────────────────────────
export interface ShowcasePartner {
  id: string;
  name: string;
  type: PartnerType;
  country: string;
  description: string;
  logo: string;
  website: string;
  partnerSince: number;
  contributions: string[];
}

const PARTNERS_DATA = [
  { name: 'Microsoft Africa', type: 'Corporate', country: 'Kenya' },
  { name: 'Google.org', type: 'Corporate', country: 'USA' },
  { name: 'UNDP Tanzania', type: 'Government', country: 'Tanzania' },
  { name: 'MIT Innovation Labs', type: 'Academic', country: 'USA' },
  { name: 'African Development Bank', type: 'International', country: 'Ivory Coast' },
  { name: 'GIZ Germany', type: 'NGO', country: 'Germany' },
  { name: 'Tony Elumelu Foundation', type: 'NGO', country: 'Nigeria' },
  { name: 'University of Edinburgh', type: 'Academic', country: 'UK' },
  { name: 'GSMA Foundation', type: 'International', country: 'UK' },
  { name: 'Zanzibar ICT Authority', type: 'Government', country: 'Tanzania' },
  { name: 'Seedstars Africa', type: 'Corporate', country: 'Switzerland' },
  { name: 'Mastercard Foundation', type: 'NGO', country: 'Canada' },
  { name: 'World Bank IFC', type: 'International', country: 'USA' },
  { name: 'MIT Media Lab', type: 'Academic', country: 'USA' },
  { name: 'Kenya Airways Innovations', type: 'Corporate', country: 'Kenya' },
];

export const SHOWCASE_PARTNERS: ShowcasePartner[] = Array.from({ length: 40 }, (_, i) => {
  const base = PARTNERS_DATA[i % PARTNERS_DATA.length];
  const name = base.name + (i >= PARTNERS_DATA.length ? ` ${Math.floor(i / PARTNERS_DATA.length) + 1}` : '');
  return {
    id: `partner-${i + 1}`,
    name,
    type: base.type as PartnerType,
    country: base.country,
    description: `${name} is a valued strategic partner of SUZA Innovation Management System, contributing expertise, funding, and mentorship resources to support the next generation of East African innovators.`,
    logo: avatar(name),
    website: `https://${name.toLowerCase().replace(/\s|\./g, '')}.org`,
    partnerSince: randInt(2018, 2024),
    contributions: ['Mentorship Programs', 'Funding Support', 'Technical Expertise'].slice(0, randInt(1, 3)),
  };
});

// ─── FEATURED INNOVATORS ────────────────────────────────────
export interface FeaturedInnovator {
  id: string;
  name: string;
  title: string;
  bio: string;
  photo: string;
  school: string;
  innovation: string;
  startup?: string;
  achievements: string[];
  socialLinks: { platform: string; url: string }[];
  featured: boolean;
  year: number;
}

export const SHOWCASE_INNOVATORS: FeaturedInnovator[] = Array.from({ length: 50 }, (_, i) => {
  const name = randomName();
  return {
    id: `inn-ovator-${i + 1}`,
    name,
    title: randItem(['Student Innovator', 'Researcher', 'Startup Founder', 'Social Entrepreneur', 'Tech Pioneer']),
    bio: `${name} is a passionate innovator from SUZA's ${SCHOOLS[i % SCHOOLS.length]}. With a focus on ${CATEGORIES[i % CATEGORIES.length].toLowerCase()}, they have made significant contributions to the Zanzibar innovation ecosystem.`,
    photo: avatar(name),
    school: SCHOOLS[i % SCHOOLS.length],
    innovation: INNOVATION_TITLES[i % INNOVATION_TITLES.length],
    startup: i % 3 === 0 ? STARTUP_NAMES[i % STARTUP_NAMES.length] : undefined,
    achievements: [randItem(STARTUP_ACHIEVEMENTS), randItem(STARTUP_ACHIEVEMENTS)].filter((v, idx, a) => a.indexOf(v) === idx),
    socialLinks: [
      { platform: 'LinkedIn', url: '#' },
      { platform: 'Twitter', url: '#' },
      { platform: 'GitHub', url: '#' },
    ],
    featured: i < 8,
    year: randInt(2021, 2026),
  };
});

// ─── COMPETITION WINNERS ─────────────────────────────────────
export interface CompetitionWinner {
  id: string;
  competition: string;
  year: number;
  winner: string;
  winnerAvatar: string;
  position: 'Winner' | 'Runner-up' | '2nd Runner-up';
  innovation: string;
  startup?: string;
  prize: string;
  school: string;
}

const COMPETITIONS = [
  'SUZA Innovation Challenge',
  'Zanzibar Hackathon',
  'East Africa Startup Cup',
  'AgriTech Innovation Prize',
  'Digital Zanzibar Competition',
];

export const COMPETITION_WINNERS: CompetitionWinner[] = Array.from({ length: 60 }, (_, i) => {
  const winner = randomName();
  return {
    id: `cw-${i + 1}`,
    competition: COMPETITIONS[i % COMPETITIONS.length],
    year: randInt(2019, 2026),
    winner,
    winnerAvatar: avatar(winner),
    position: (['Winner', 'Runner-up', '2nd Runner-up'] as const)[i % 3],
    innovation: INNOVATION_TITLES[i % INNOVATION_TITLES.length],
    startup: i % 4 === 0 ? STARTUP_NAMES[i % STARTUP_NAMES.length] : undefined,
    prize: i % 3 === 0 ? `$${randInt(5, 50) * 1000}` : 'Certificate of Excellence',
    school: SCHOOLS[i % SCHOOLS.length],
  };
});

// ─── STATS ───────────────────────────────────────────────────
export const SHOWCASE_STATS = {
  innovations: 543,
  startups: 124,
  researchers: 210,
  mentors: 85,
  awards: 180,
  fundingRaised: 4500000,
  schools: 6,
  hubs: 4,
  partners: 40,
  countries: 12,
};

// ─── ECOSYSTEM CHART DATA ────────────────────────────────────
export const ECOSYSTEM_GROWTH = [
  { year: '2020', innovations: 45, startups: 12, funding: 200000 },
  { year: '2021', innovations: 89, startups: 28, funding: 450000 },
  { year: '2022', innovations: 156, startups: 45, funding: 890000 },
  { year: '2023', innovations: 245, startups: 72, funding: 1500000 },
  { year: '2024', innovations: 389, startups: 98, funding: 2800000 },
  { year: '2025', innovations: 487, startups: 115, funding: 3900000 },
  { year: '2026', innovations: 543, startups: 124, funding: 4500000 },
];

export const SCHOOL_PERFORMANCE = [
  { school: 'SoC', innovations: 185, startups: 42 },
  { school: 'SoB', innovations: 120, startups: 35 },
  { school: 'SoE', innovations: 80, startups: 18 },
  { school: 'SoNS', innovations: 95, startups: 22 },
  { school: 'SoA', innovations: 35, startups: 4 },
  { school: 'SoEng', innovations: 28, startups: 3 },
];
