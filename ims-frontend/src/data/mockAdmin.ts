// ============================================================
// MOCK DATA — Phase 17: System Administration Center
// ============================================================

// ─── TYPES ──────────────────────────────────────────────────
export type LogSeverity = 'INFO' | 'WARNING' | 'ERROR' | 'CRITICAL' | 'DEBUG';
export type LogStatus = 'SUCCESS' | 'FAILED' | 'PENDING' | 'BLOCKED';
export type BackupStatus = 'Completed' | 'Failed' | 'In Progress' | 'Scheduled';
export type ServiceStatus = 'Online' | 'Degraded' | 'Offline' | 'Maintenance';
export type JobStatus = 'Running' | 'Completed' | 'Failed' | 'Scheduled' | 'Disabled';
export type IntegrationStatus = 'Connected' | 'Disconnected' | 'Error' | 'Pending';

// ─── HELPERS ────────────────────────────────────────────────
function randInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function randItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}
function minutesAgo(n: number): string {
  return new Date(Date.now() - n * 60 * 1000).toISOString();
}
function daysAgo(n: number): string {
  return new Date(Date.now() - n * 24 * 60 * 60 * 1000).toISOString();
}

// ─── SYSTEM STATS ────────────────────────────────────────────
export const SYSTEM_STATS = {
  cpu: 34,
  cpuTrend: '+2%',
  ram: 68,
  ramUsed: '10.9 GB',
  ramTotal: '16 GB',
  disk: 52,
  diskUsed: '260 GB',
  diskTotal: '500 GB',
  activeUsers: 847,
  onlineUsers: 124,
  apiRequestsPerMin: 2340,
  backgroundJobs: 18,
  recentErrors: 7,
  dbConnections: 45,
  dbMaxConnections: 100,
  dbResponseMs: 12,
  cacheHitRate: 94,
  uptime: '99.97%',
  uptimeDays: 42,
  appVersion: '2.5.1',
  javaVersion: '17.0.9',
  nodeVersion: '20.11.0',
  dbVersion: 'PostgreSQL 15.4',
};

// ─── HEALTH METRICS ─────────────────────────────────────────
export interface ServiceHealth {
  name: string;
  status: ServiceStatus;
  latencyMs: number;
  uptime: string;
  lastCheck: string;
  description: string;
}

export const SERVICE_HEALTH: ServiceHealth[] = [
  { name: 'Web Application', status: 'Online', latencyMs: 45, uptime: '99.97%', lastCheck: minutesAgo(1), description: 'Main React frontend application' },
  { name: 'API Server', status: 'Online', latencyMs: 23, uptime: '99.95%', lastCheck: minutesAgo(1), description: 'Spring Boot backend API' },
  { name: 'Database (Primary)', status: 'Online', latencyMs: 12, uptime: '99.99%', lastCheck: minutesAgo(1), description: 'PostgreSQL primary instance' },
  { name: 'Database (Replica)', status: 'Online', latencyMs: 15, uptime: '99.98%', lastCheck: minutesAgo(2), description: 'PostgreSQL read replica' },
  { name: 'Redis Cache', status: 'Online', latencyMs: 3, uptime: '99.99%', lastCheck: minutesAgo(1), description: 'Session & data cache layer' },
  { name: 'Email Service', status: 'Online', latencyMs: 210, uptime: '99.80%', lastCheck: minutesAgo(5), description: 'SMTP notification service' },
  { name: 'File Storage', status: 'Online', latencyMs: 88, uptime: '99.90%', lastCheck: minutesAgo(3), description: 'Document & media storage' },
  { name: 'Background Jobs', status: 'Degraded', latencyMs: 450, uptime: '98.50%', lastCheck: minutesAgo(2), description: 'Async task processing queue' },
  { name: 'Search Engine', status: 'Online', latencyMs: 34, uptime: '99.85%', lastCheck: minutesAgo(1), description: 'Full-text search indexing' },
  { name: 'Backup Service', status: 'Online', latencyMs: 0, uptime: '99.70%', lastCheck: minutesAgo(10), description: 'Automated backup scheduler' },
];

// ─── MONITORING TIME-SERIES ─────────────────────────────────
export interface MetricPoint {
  time: string;
  cpu: number;
  ram: number;
  requests: number;
  errors: number;
  latency: number;
}

export const MONITORING_DATA_24H: MetricPoint[] = Array.from({ length: 24 }, (_, i) => ({
  time: `${String(i).padStart(2, '0')}:00`,
  cpu: randInt(15, 85),
  ram: randInt(55, 80),
  requests: randInt(800, 4000),
  errors: randInt(0, 25),
  latency: randInt(20, 120),
}));

export const MONITORING_DATA_7D: MetricPoint[] = Array.from({ length: 7 }, (_, i) => {
  const d = new Date(); d.setDate(d.getDate() - (6 - i));
  return {
    time: d.toLocaleDateString('en', { weekday: 'short' }),
    cpu: randInt(20, 70),
    ram: randInt(55, 78),
    requests: randInt(15000, 80000),
    errors: randInt(5, 150),
    latency: randInt(25, 90),
  };
});

// ─── AUDIT LOGS ─────────────────────────────────────────────
export interface AuditLog {
  id: string;
  timestamp: string;
  user: string;
  userRole: string;
  action: string;
  module: string;
  resource: string;
  ip: string;
  browser: string;
  status: LogStatus;
  details?: string;
}

const USERS = ['admin@suza.ac.tz', 'director@suza.ac.tz', 'manager@suza.ac.tz', 'reviewer@suza.ac.tz', 'innovator@suza.ac.tz', 'system@suza.ac.tz', 'mentor@suza.ac.tz', 'finance@suza.ac.tz'];
const ROLES = ['SUPER_ADMIN', 'INNOVATION_DIRECTOR', 'HUB_MANAGER', 'REVIEWER', 'INNOVATOR', 'MENTOR', 'FINANCE_OFFICER'];
const ACTIONS = ['LOGIN', 'LOGOUT', 'CREATE', 'UPDATE', 'DELETE', 'VIEW', 'EXPORT', 'IMPORT', 'APPROVE', 'REJECT', 'SUBMIT', 'DOWNLOAD', 'UPLOAD', 'ASSIGN', 'REVOKE'];
const MODULES = ['AUTH', 'USERS', 'INNOVATIONS', 'STARTUPS', 'FUNDING', 'COMPETITION', 'MENTORSHIP', 'DOCUMENTS', 'SETTINGS', 'REPORTS', 'ORGANIZATION'];
const RESOURCES = ['User#1045', 'Innovation#288', 'Startup#67', 'Funding Application#344', 'Competition#12', 'Document#891', 'Role#REVIEWER', 'Permission#CREATE_INNOVATION', 'Session#abc123', 'Report#Q4-2025'];
const BROWSERS = ['Chrome 120.0 / Windows 11', 'Firefox 121.0 / macOS', 'Safari 17.2 / macOS', 'Edge 120.0 / Windows 10', 'Chrome 120.0 / Ubuntu'];
const STATUSES: LogStatus[] = ['SUCCESS', 'SUCCESS', 'SUCCESS', 'SUCCESS', 'FAILED', 'BLOCKED', 'PENDING'];

export const AUDIT_LOGS: AuditLog[] = Array.from({ length: 10000 }, (_, i) => ({
  id: `audit-${i + 1}`,
  timestamp: new Date(Date.now() - (i * 2.5 * 60 * 1000)).toISOString(),
  user: randItem(USERS),
  userRole: randItem(ROLES),
  action: randItem(ACTIONS),
  module: randItem(MODULES),
  resource: randItem(RESOURCES),
  ip: `192.168.${randInt(1, 10)}.${randInt(1, 254)}`,
  browser: randItem(BROWSERS),
  status: randItem(STATUSES),
  details: i % 5 === 0 ? 'Additional context for this audit event' : undefined,
}));

// ─── ACTIVITY LOGS ──────────────────────────────────────────
export interface ActivityLog {
  id: string;
  timestamp: string;
  user: string;
  type: 'LOGIN' | 'LOGOUT' | 'DATA_CHANGE' | 'FILE_ACCESS' | 'PERMISSION_CHANGE';
  description: string;
  module: string;
  ip: string;
}

const ACTIVITY_DESCRIPTIONS = [
  'User logged in successfully',
  'User logged out',
  'Updated innovation status to Approved',
  'Downloaded funding report',
  'Submitted new innovation proposal',
  'Changed user role from REVIEWER to HUB_MANAGER',
  'Uploaded 3 documents to innovation #288',
  'Exported audit logs to CSV',
  'Reset user password',
  'Created new competition event',
];

export const ACTIVITY_LOGS: ActivityLog[] = Array.from({ length: 5000 }, (_, i) => ({
  id: `act-${i + 1}`,
  timestamp: new Date(Date.now() - (i * 5 * 60 * 1000)).toISOString(),
  user: randItem(USERS),
  type: randItem(['LOGIN', 'LOGOUT', 'DATA_CHANGE', 'FILE_ACCESS', 'PERMISSION_CHANGE'] as const),
  description: randItem(ACTIVITY_DESCRIPTIONS),
  module: randItem(MODULES),
  ip: `192.168.${randInt(1, 10)}.${randInt(1, 254)}`,
}));

// ─── ERROR LOGS ─────────────────────────────────────────────
export interface ErrorLog {
  id: string;
  timestamp: string;
  code: string;
  message: string;
  module: string;
  severity: LogSeverity;
  stackTrace?: string;
  resolved: boolean;
  resolvedAt?: string;
  resolvedBy?: string;
}

const ERROR_CODES = ['ERR_500', 'ERR_503', 'ERR_DB_TIMEOUT', 'ERR_AUTH_EXPIRED', 'ERR_NULL_POINTER', 'ERR_CONSTRAINT', 'ERR_FILE_NOT_FOUND', 'ERR_RATE_LIMIT', 'WARN_SLOW_QUERY', 'INFO_CACHE_MISS'];
const ERROR_MESSAGES = [
  'Internal server error in InnovationController.create()',
  'Database connection timeout after 30000ms',
  'JWT token expired for user admin@suza.ac.tz',
  'NullPointerException in FundingService.calculate()',
  'File not found: /uploads/documents/report-2025.pdf',
  'Rate limit exceeded for IP 192.168.1.45',
  'Slow query detected: >2000ms on innovations table',
  'Cache miss for key: user:session:abc123',
  'Service unavailable: Email SMTP connection failed',
  'Unique constraint violation on email field',
];

export const ERROR_LOGS: ErrorLog[] = Array.from({ length: 500 }, (_, i) => ({
  id: `err-${i + 1}`,
  timestamp: new Date(Date.now() - (i * 30 * 60 * 1000)).toISOString(),
  code: randItem(ERROR_CODES),
  message: randItem(ERROR_MESSAGES),
  module: randItem(MODULES),
  severity: randItem(['ERROR', 'ERROR', 'WARNING', 'CRITICAL', 'INFO', 'DEBUG'] as LogSeverity[]),
  stackTrace: i % 3 === 0 ? 'at ac.suza.ims.innovation.service.InnovationServiceImpl.create(InnovationServiceImpl.java:156)\n  at ac.suza.ims.innovation.controller.InnovationController.create(InnovationController.java:89)' : undefined,
  resolved: i % 3 !== 0,
  resolvedAt: i % 3 !== 0 ? new Date(Date.now() - (i * 15 * 60 * 1000)).toISOString() : undefined,
  resolvedBy: i % 3 !== 0 ? randItem(USERS) : undefined,
}));

// ─── BACKUP RECORDS ─────────────────────────────────────────
export interface BackupRecord {
  id: string;
  name: string;
  type: 'Full' | 'Incremental' | 'Differential';
  status: BackupStatus;
  size: string;
  duration: string;
  createdAt: string;
  storage: 'Local' | 'Cloud S3' | 'Google Drive';
  initiatedBy: 'Scheduler' | 'Manual';
  expiresAt: string;
}

export const BACKUP_RECORDS: BackupRecord[] = Array.from({ length: 100 }, (_, i) => ({
  id: `bkp-${i + 1}`,
  name: `backup_${new Date(Date.now() - i * 24 * 3600 * 1000).toISOString().slice(0, 10)}_${['full', 'incr', 'diff'][i % 3]}`,
  type: (['Full', 'Incremental', 'Differential'] as const)[i % 3],
  status: (['Completed', 'Completed', 'Completed', 'Failed', 'Scheduled'] as BackupStatus[])[i % 5],
  size: `${randInt(100, 4500)} MB`,
  duration: `${randInt(1, 45)}m ${randInt(0, 59)}s`,
  createdAt: daysAgo(i),
  storage: (['Cloud S3', 'Cloud S3', 'Local', 'Google Drive'] as const)[i % 4],
  initiatedBy: i % 5 === 0 ? 'Manual' : 'Scheduler',
  expiresAt: new Date(Date.now() + (30 - i % 30) * 24 * 3600 * 1000).toISOString(),
}));

// ─── STORAGE STATS ───────────────────────────────────────────
export const STORAGE_STATS = {
  total: 500,
  used: 284,
  documents: 120,
  images: 85,
  backups: 62,
  other: 17,
  free: 216,
};

// ─── API ENDPOINTS ───────────────────────────────────────────
export interface ApiEndpoint {
  id: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  path: string;
  module: string;
  rateLimit: number;
  requestsToday: number;
  avgLatency: number;
  errorRate: number;
  status: 'Active' | 'Deprecated' | 'Disabled';
}

const API_PATHS = [
  ['/api/v1/auth/login', 'POST', 'AUTH'],
  ['/api/v1/users', 'GET', 'USERS'],
  ['/api/v1/innovations', 'GET', 'INNOVATIONS'],
  ['/api/v1/innovations/{id}', 'PUT', 'INNOVATIONS'],
  ['/api/v1/startups', 'POST', 'STARTUPS'],
  ['/api/v1/funding/programs', 'GET', 'FUNDING'],
  ['/api/v1/competitions', 'GET', 'COMPETITIONS'],
  ['/api/v1/mentorship/sessions', 'POST', 'MENTORSHIP'],
  ['/api/v1/documents/upload', 'POST', 'DOCUMENTS'],
  ['/api/v1/analytics/overview', 'GET', 'ANALYTICS'],
];

export const API_ENDPOINTS: ApiEndpoint[] = Array.from({ length: 40 }, (_, i) => {
  const [path, method, module] = API_PATHS[i % API_PATHS.length];
  return {
    id: `ep-${i + 1}`,
    method: method as ApiEndpoint['method'],
    path: `${path}${i >= API_PATHS.length ? `/v${Math.floor(i / API_PATHS.length) + 1}` : ''}`,
    module,
    rateLimit: randItem([100, 200, 500, 1000, 5000]),
    requestsToday: randInt(50, 15000),
    avgLatency: randInt(8, 250),
    errorRate: parseFloat((Math.random() * 5).toFixed(2)),
    status: i % 8 === 0 ? 'Deprecated' : i % 15 === 0 ? 'Disabled' : 'Active',
  };
});

// ─── INTEGRATIONS ────────────────────────────────────────────
export interface Integration {
  id: string;
  name: string;
  category: string;
  status: IntegrationStatus;
  icon: string;
  description: string;
  lastSync?: string;
  configuredBy?: string;
}

export const INTEGRATIONS: Integration[] = [
  { id: 'int-1', name: 'Google OAuth', category: 'Authentication', status: 'Connected', icon: 'G', description: 'Google sign-in for SUZA accounts', lastSync: minutesAgo(5), configuredBy: 'admin@suza.ac.tz' },
  { id: 'int-2', name: 'Microsoft Azure AD', category: 'Authentication', status: 'Connected', icon: 'M', description: 'Microsoft 365 identity integration', lastSync: minutesAgo(10), configuredBy: 'admin@suza.ac.tz' },
  { id: 'int-3', name: 'GitHub', category: 'Version Control', status: 'Disconnected', icon: 'GH', description: 'Repository integration for code submissions', configuredBy: undefined },
  { id: 'int-4', name: 'Stripe', category: 'Payment Gateway', status: 'Connected', icon: 'S', description: 'Payment processing for funding applications', lastSync: minutesAgo(30), configuredBy: 'finance@suza.ac.tz' },
  { id: 'int-5', name: 'SendGrid', category: 'Email Provider', status: 'Connected', icon: 'SG', description: 'Transactional email delivery service', lastSync: minutesAgo(2), configuredBy: 'admin@suza.ac.tz' },
  { id: 'int-6', name: 'Twilio SMS', category: 'SMS Provider', status: 'Error', icon: 'T', description: 'SMS notifications and OTP delivery', lastSync: minutesAgo(120), configuredBy: 'admin@suza.ac.tz' },
  { id: 'int-7', name: 'AWS S3', category: 'Storage Provider', status: 'Connected', icon: 'S3', description: 'Cloud object storage for documents', lastSync: minutesAgo(1), configuredBy: 'admin@suza.ac.tz' },
  { id: 'int-8', name: 'Google Analytics', category: 'Analytics', status: 'Connected', icon: 'GA', description: 'Website traffic and usage analytics', lastSync: minutesAgo(15), configuredBy: 'director@suza.ac.tz' },
  { id: 'int-9', name: 'Slack', category: 'Notifications', status: 'Disconnected', icon: 'SL', description: 'Team notification channel integration', configuredBy: undefined },
  { id: 'int-10', name: 'LDAP / Active Directory', category: 'Authentication', status: 'Pending', icon: 'AD', description: 'Enterprise directory service (configuration pending)', configuredBy: undefined },
];

// ─── SCHEDULED JOBS ──────────────────────────────────────────
export interface ScheduledJob {
  id: string;
  name: string;
  description: string;
  cron: string;
  lastRun: string;
  nextRun: string;
  duration: string;
  status: JobStatus;
  module: string;
}

export const SCHEDULED_JOBS: ScheduledJob[] = [
  { id: 'job-1', name: 'Daily Database Backup', description: 'Full database backup to cloud storage', cron: '0 2 * * *', lastRun: minutesAgo(240), nextRun: minutesAgo(-1200), duration: '12m 34s', status: 'Completed', module: 'BACKUP' },
  { id: 'job-2', name: 'Innovation Status Sync', description: 'Sync innovation statuses with review pipeline', cron: '*/30 * * * *', lastRun: minutesAgo(15), nextRun: minutesAgo(-15), duration: '45s', status: 'Completed', module: 'INNOVATIONS' },
  { id: 'job-3', name: 'Email Digest Sender', description: 'Send daily activity digests to users', cron: '0 8 * * *', lastRun: minutesAgo(60), nextRun: minutesAgo(-1380), duration: '3m 12s', status: 'Completed', module: 'EMAIL' },
  { id: 'job-4', name: 'Audit Log Archiver', description: 'Archive audit logs older than 90 days', cron: '0 1 * * 0', lastRun: daysAgo(7), nextRun: minutesAgo(-10080), duration: '5m 22s', status: 'Completed', module: 'AUDIT' },
  { id: 'job-5', name: 'Cache Warmer', description: 'Pre-populate Redis cache with hot data', cron: '*/15 * * * *', lastRun: minutesAgo(5), nextRun: minutesAgo(-10), duration: '8s', status: 'Running', module: 'CACHE' },
  { id: 'job-6', name: 'Expired Session Cleaner', description: 'Remove expired user sessions from DB', cron: '0 * * * *', lastRun: minutesAgo(45), nextRun: minutesAgo(-15), duration: '2s', status: 'Completed', module: 'AUTH' },
  { id: 'job-7', name: 'Analytics Snapshot', description: 'Create daily analytics snapshot for dashboards', cron: '0 0 * * *', lastRun: minutesAgo(480), nextRun: minutesAgo(-960), duration: '18m 05s', status: 'Failed', module: 'ANALYTICS' },
  { id: 'job-8', name: 'Storage Cleanup', description: 'Remove temp files and orphaned uploads', cron: '0 3 * * *', lastRun: minutesAgo(300), nextRun: minutesAgo(-1140), duration: '7m 44s', status: 'Completed', module: 'STORAGE' },
  { id: 'job-9', name: 'Report Generator', description: 'Generate weekly performance reports', cron: '0 6 * * 1', lastRun: daysAgo(7), nextRun: minutesAgo(-10080), duration: '25m 10s', status: 'Scheduled', module: 'REPORTS' },
  { id: 'job-10', name: 'Notification Dispatcher', description: 'Process pending notification queue', cron: '*/5 * * * *', lastRun: minutesAgo(3), nextRun: minutesAgo(-2), duration: '1s', status: 'Completed', module: 'NOTIFICATIONS' },
];

// ─── FEATURE FLAGS ───────────────────────────────────────────
export interface FeatureFlag {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  module: string;
  createdAt: string;
  updatedAt: string;
  updatedBy: string;
}

export const FEATURE_FLAGS: FeatureFlag[] = [
  { id: 'ff-1', name: 'AI_INNOVATION_SCORING', description: 'Enable AI-assisted innovation scoring system', enabled: true, module: 'INNOVATIONS', createdAt: daysAgo(90), updatedAt: daysAgo(5), updatedBy: 'admin@suza.ac.tz' },
  { id: 'ff-2', name: 'PUBLIC_SHOWCASE', description: 'Enable public innovation showcase portal', enabled: true, module: 'SHOWCASE', createdAt: daysAgo(60), updatedAt: daysAgo(2), updatedBy: 'admin@suza.ac.tz' },
  { id: 'ff-3', name: 'BLOCKCHAIN_CERTIFICATES', description: 'Issue blockchain-based certificates', enabled: false, module: 'COMPETITIONS', createdAt: daysAgo(30), updatedAt: daysAgo(30), updatedBy: 'director@suza.ac.tz' },
  { id: 'ff-4', name: 'VIDEO_PITCHING', description: 'Allow video submissions for competition pitches', enabled: true, module: 'COMPETITIONS', createdAt: daysAgo(45), updatedAt: daysAgo(10), updatedBy: 'admin@suza.ac.tz' },
  { id: 'ff-5', name: 'ADVANCED_ANALYTICS', description: 'Enable advanced BI analytics module', enabled: true, module: 'ANALYTICS', createdAt: daysAgo(120), updatedAt: daysAgo(1), updatedBy: 'admin@suza.ac.tz' },
  { id: 'ff-6', name: 'MULTI_LANGUAGE', description: 'Enable Swahili/English language switching', enabled: false, module: 'SYSTEM', createdAt: daysAgo(15), updatedAt: daysAgo(15), updatedBy: 'admin@suza.ac.tz' },
  { id: 'ff-7', name: 'MOBILE_APP_API', description: 'Expose mobile app API endpoints', enabled: true, module: 'API', createdAt: daysAgo(60), updatedAt: daysAgo(3), updatedBy: 'admin@suza.ac.tz' },
  { id: 'ff-8', name: 'PEER_REVIEW', description: 'Enable peer review for innovations', enabled: false, module: 'REVIEWS', createdAt: daysAgo(20), updatedAt: daysAgo(20), updatedBy: 'director@suza.ac.tz' },
  { id: 'ff-9', name: 'ONLINE_MENTORING', description: 'Enable video call mentoring sessions', enabled: true, module: 'MENTORSHIP', createdAt: daysAgo(80), updatedAt: daysAgo(7), updatedBy: 'admin@suza.ac.tz' },
  { id: 'ff-10', name: 'AUTOMATED_FUNDING', description: 'Automated funding disbursement workflow', enabled: false, module: 'FUNDING', createdAt: daysAgo(10), updatedAt: daysAgo(10), updatedBy: 'finance@suza.ac.tz' },
];

// ─── LICENSE ─────────────────────────────────────────────────
export const LICENSE_INFO = {
  product: 'SUZA IMS Enterprise',
  licenseKey: 'SUZA-IMS-ENT-2024-XXXX-YYYY-ZZZZ',
  organization: 'The State University of Zanzibar',
  type: 'Enterprise',
  users: { used: 847, limit: 2000 },
  modules: ['Core Platform', 'Innovation Management', 'Startup Incubation', 'Funding Management', 'Analytics & BI', 'Public Showcase', 'System Administration'],
  issuedAt: daysAgo(365),
  expiresAt: new Date(Date.now() + 180 * 24 * 3600 * 1000).toISOString(),
  supportLevel: 'Premium',
  version: '2.5.1',
};

// ─── QUICK ACTIONS (for dashboard) ───────────────────────────
export const RECENT_ADMIN_ACTIVITIES = AUDIT_LOGS.slice(0, 15).map(l => ({
  id: l.id,
  message: `${l.user} — ${l.action} on ${l.module}`,
  status: l.status,
  time: l.timestamp,
}));
