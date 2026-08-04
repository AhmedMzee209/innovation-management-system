export const MOCK_DASHBOARD_STATS = [
  { id: '1', title: 'Total Users', value: 2543, trend: 12.5, icon: 'Users' },
  { id: '2', title: 'Active Innovations', value: 450, trend: 8.2, icon: 'Lightbulb' },
  { id: '3', title: 'Registered Startups', value: 45, trend: 2.4, icon: 'Rocket' },
  { id: '4', title: 'Funding Distributed', value: 1250000, trend: 15.3, icon: 'Banknote', prefix: '$', format: 'currency' },
];

export const MOCK_CHART_DATA = [
  { name: 'Jan', submissions: 45, startups: 2 },
  { name: 'Feb', submissions: 52, startups: 3 },
  { name: 'Mar', submissions: 38, startups: 1 },
  { name: 'Apr', submissions: 65, startups: 5 },
  { name: 'May', submissions: 85, startups: 8 },
  { name: 'Jun', submissions: 110, startups: 12 },
];

export const MOCK_DONUT_DATA = [
  { name: 'Idea Phase', value: 400, color: '#0d2137' },
  { name: 'Prototype', value: 300, color: '#0098c8' },
  { name: 'MVP', value: 200, color: '#e8b800' },
  { name: 'Scaling', value: 100, color: '#3cb371' },
];

export const MOCK_RECENT_ACTIVITIES = [
  { id: '1', title: 'New Innovation Submitted', description: 'Smart Ocean Monitoring System', time: '10 minutes ago', type: 'innovation' },
  { id: '2', title: 'Funding Approved', description: '$50,000 granted to ZanHealth', time: '2 hours ago', type: 'funding' },
  { id: '3', title: 'New Startup Registered', description: 'EduVR Zanzibar joined the hub', time: '5 hours ago', type: 'startup' },
  { id: '4', title: 'User Role Updated', description: 'Dr. Suleiman granted Reviewer access', time: '1 day ago', type: 'system' },
];

export const MOCK_TABLE_DATA = [
  { id: 'INV-101', title: 'Smart Ocean Monitoring', author: 'Ali Juma', school: 'SCCS', status: 'Under Review', date: '2026-10-15' },
  { id: 'INV-102', title: 'ZanHealth Telemedicine', author: 'Fatma Said', school: 'SHMS', status: 'Approved', date: '2026-10-14' },
  { id: 'INV-103', title: 'EduVR Zanzibar', author: 'Khadija Hassan', school: 'SOE', status: 'Draft', date: '2026-10-12' },
  { id: 'INV-104', title: 'AgriSense IoT', author: 'Juma Ali', school: 'SOB', status: 'Rejected', date: '2026-10-10' },
  { id: 'INV-105', title: 'Smart Grid Zanzibar', author: 'Maryam Omar', school: 'SCCS', status: 'Approved', date: '2026-10-05' },
];
