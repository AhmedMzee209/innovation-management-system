export const STATISTICS = [
  { id: '1', label: 'Active Users', value: 2500, suffix: '+' },
  { id: '2', label: 'Innovations Submitted', value: 450, suffix: '' },
  { id: '3', label: 'Registered Startups', value: 45, suffix: '' },
  { id: '4', label: 'Funding Distributed', value: 1.2, suffix: 'M', prefix: '$' },
  { id: '5', label: 'Active Mentors', value: 120, suffix: '+' },
  { id: '6', label: 'Participating Schools', value: 8, suffix: '' },
];

export const SCHOOLS = [
  { id: '1', name: 'School of Computing and Communication Studies', acronym: 'SCCS', innovations: 120, startups: 15 },
  { id: '2', name: 'School of Business', acronym: 'SOB', innovations: 85, startups: 12 },
  { id: '3', name: 'School of Education', acronym: 'SOE', innovations: 45, startups: 3 },
  { id: '4', name: 'School of Natural and Social Sciences', acronym: 'SNSS', innovations: 60, startups: 5 },
  { id: '5', name: 'School of Health and Medical Sciences', acronym: 'SHMS', innovations: 95, startups: 8 },
];

export const INNOVATION_HUBS = [
  { id: '1', name: 'SUZA Central Innovation Hub', location: 'Tunguu Main Campus', description: 'The central nervous system of SUZA innovation.' },
  { id: '2', name: 'Tech & Digital Hub', location: 'SCCS Campus', description: 'Focused on software, AI, and digital transformation.' },
  { id: '3', name: 'HealthTech Hub', location: 'SHMS Campus', description: 'Innovating healthcare solutions for Zanzibar.' },
];

export const FEATURED_INNOVATIONS = [
  { id: '1', title: 'Smart Ocean Monitoring System', category: 'IoT & Environment', school: 'SCCS', stage: 'MVP', image: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&q=80&w=800' },
  { id: '2', title: 'ZanHealth Telemedicine', category: 'HealthTech', school: 'SHMS', stage: 'Scaling', image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800' },
  { id: '3', title: 'EduVR Zanzibar', category: 'EdTech', school: 'SOE', stage: 'Prototype', image: 'https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?auto=format&fit=crop&q=80&w=800' },
];

export const STARTUPS = [
  { id: '1', name: 'OceanTech ZNZ', founder: 'Ali Juma', school: 'SCCS', stage: 'Seed', logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&q=80&w=200' },
  { id: '2', name: 'ZanAgri Smart', founder: 'Fatma Said', school: 'SOB', stage: 'Series A', logo: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?auto=format&fit=crop&q=80&w=200' },
];

export const EVENTS = [
  { id: '1', title: 'Annual SUZA Hackathon 2026', date: 'Oct 15, 2026', type: 'Hackathon' },
  { id: '2', title: 'Investor Pitch Day', date: 'Nov 02, 2026', type: 'Competition' },
  { id: '3', title: 'AI in Healthcare Workshop', date: 'Nov 20, 2026', type: 'Workshop' },
];

export const TESTIMONIALS = [
  { id: '1', quote: "IMS transformed my final year project into a funded startup. The mentorship was invaluable.", author: "Asha M.", role: "Innovator Innovator", avatar: "https://i.pravatar.cc/150?u=asha" },
  { id: '2', quote: "A seamless platform that bridges the gap between academic research and commercial viability.", author: "Dr. K. Omar", role: "Innovation Manager", avatar: "https://i.pravatar.cc/150?u=omar" },
  { id: '3', quote: "We've found incredible talent and viable businesses through SUZA's innovation ecosystem.", author: "John D.", role: "Angel Investor", avatar: "https://i.pravatar.cc/150?u=john" },
];

export const FAQS = [
  { question: 'Who can submit an innovation?', answer: 'Any currently enrolled SUZA innovator or active faculty member can submit an innovation through the IMS platform.' },
  { question: 'How is intellectual property handled?', answer: 'IP rights are governed by the SUZA Innovation Policy. Generally, innovators retain ownership while the university retains a non-exclusive license for academic purposes.' },
  { question: 'What kind of funding is available?', answer: 'We offer prototype grants, seed funding for incubated startups, and connections to external angel investors and venture capital.' },
];
