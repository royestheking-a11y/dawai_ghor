
import { v4 as uuidv4 } from 'uuid';

// Types
export type Role = 'candidate' | 'recruiter' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  title?: string;
  role: Role;
  avatar?: string;
  password?: string; // In a real app, never store plain text
  bio?: string;
  location?: string;
  skills?: string[];
  verifiedSkills?: string[];
  experience?: {
    company: string;
    role: string;
    duration: string;
  }[];
  resumeUrl?: string;
  createdAt: string;
}

export interface Company {
  id: string;
  recruiterId: string;
  name: string;
  logo?: string;
  description: string;
  location?: string;
  website?: string;
  verified: boolean;
}

export interface Job {
  id: string;
  recruiterId: string;
  companyId: string;
  title: string;
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Remote' | 'Internship';
  category: string;
  location: string;
  salaryMin?: number;
  salaryMax?: number;
  description: string;
  requirements: string[];
  skills: string[];
  status: 'active' | 'closed' | 'draft';
  isVerified: boolean;
  isUrgent: boolean;
  isFeatured: boolean;
  createdAt: string;
}

export interface Application {
  id: string;
  jobId: string;
  candidateId: string;
  status: 'applied' | 'shortlisted' | 'interview' | 'offer' | 'rejected';
  coverLetter?: string;
  appliedAt: string;
}

export type NotificationType = 'message' | 'alert' | 'application' | 'system';

export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  time: string; // ISO string
  isRead: boolean;
  link?: string;
}

export interface SupportMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: 'new' | 'read' | 'replied';
  createdAt: string;
}

// Initial Data
const INITIAL_USERS: User[] = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@chakribazar.com',
    role: 'admin',
    password: 'password',
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Tech Solutions Ltd',
    email: 'hr@techsolutions.com',
    role: 'recruiter',
    password: 'password',
    createdAt: new Date().toISOString(),
  },
  {
    id: '3',
    name: 'Rahim Ahmed',
    email: 'rahim@test.com',
    role: 'candidate',
    password: 'password',
    skills: ['React', 'Node.js'],
    location: 'Dhaka',
    createdAt: new Date().toISOString(),
  }
];

const INITIAL_MESSAGES: SupportMessage[] = [
  {
    id: 'm1',
    name: 'Karim Ullah',
    email: 'karim@example.com',
    subject: 'billing',
    message: 'I am having trouble upgrading my account.',
    status: 'new',
    createdAt: new Date().toISOString()
  }
];

const INITIAL_COMPANIES: Company[] = [
  {
    id: 'c1',
    recruiterId: '2',
    name: 'Tech Solutions Ltd',
    description: 'Leading software company in Bangladesh.',
    location: 'Gulshan 2, Dhaka',
    verified: true,
  }
];

const INITIAL_JOBS: Job[] = [
  {
    id: 'j1',
    recruiterId: '2',
    companyId: 'c1',
    title: 'Senior React Developer',
    type: 'Full-time',
    category: 'Engineering',
    location: 'Dhaka (Hybrid)',
    salaryMin: 80000,
    salaryMax: 120000,
    description: 'We are looking for an experienced React developer to join our team.',
    requirements: ['3+ years exp', 'React', 'TypeScript'],
    skills: ['React', 'TypeScript', 'Tailwind'],
    status: 'active',
    isVerified: true,
    isUrgent: true,
    isFeatured: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'j2',
    recruiterId: '2',
    companyId: 'c1',
    title: 'UX/UI Designer',
    type: 'Full-time',
    category: 'Design',
    location: 'Remote',
    salaryMin: 50000,
    salaryMax: 70000,
    description: 'Creative designer needed for mobile apps.',
    requirements: ['Figma expert', 'Portfolio required'],
    skills: ['Figma', 'Prototyping'],
    status: 'active',
    isVerified: true,
    isUrgent: false,
    isFeatured: false,
    createdAt: new Date().toISOString(),
  }
];

// DB Service
class MockDB {
  private get<T>(key: string): T[] {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  }

  private set<T>(key: string, data: T[]) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  init() {
    if (!localStorage.getItem('users')) this.set('users', INITIAL_USERS);
    if (!localStorage.getItem('companies')) this.set('companies', INITIAL_COMPANIES);
    if (!localStorage.getItem('jobs')) this.set('jobs', INITIAL_JOBS);
    if (!localStorage.getItem('applications')) this.set('applications', []);
    if (!localStorage.getItem('notifications')) this.set('notifications', []);
    if (!localStorage.getItem('support_messages')) this.set('support_messages', INITIAL_MESSAGES);
  }

  // Users
  getUsers() { return this.get<User>('users'); }
  getUserById(id: string) { return this.getUsers().find(u => u.id === id); }
  getUserByEmail(email: string) { return this.getUsers().find(u => u.email === email); }
  createUser(user: Omit<User, 'id' | 'createdAt'>) {
    const users = this.getUsers();
    const newUser = { ...user, id: uuidv4(), createdAt: new Date().toISOString() };
    users.push(newUser);
    this.set('users', users);
    return newUser;
  }
  updateUser(id: string, data: Partial<User>) {
    const users = this.getUsers();
    const idx = users.findIndex(u => u.id === id);
    if (idx === -1) return null;
    users[idx] = { ...users[idx], ...data };
    this.set('users', users);
    return users[idx];
  }

  // Jobs
  getJobs() { return this.get<Job>('jobs'); }
  createJob(job: Omit<Job, 'id' | 'createdAt'>) {
    const jobs = this.getJobs();
    const newJob = { ...job, id: uuidv4(), createdAt: new Date().toISOString() };
    jobs.push(newJob);
    this.set('jobs', jobs);
    return newJob;
  }

  // Companies
  getCompanies() { return this.get<Company>('companies'); }
  getCompanyByRecruiterId(recruiterId: string) {
    return this.getCompanies().find(c => c.recruiterId === recruiterId);
  }
  createCompany(company: Omit<Company, 'id'>) {
    const companies = this.getCompanies();
    const newCompany = { ...company, id: uuidv4() };
    companies.push(newCompany);
    this.set('companies', companies);
    return newCompany;
  }
  updateCompany(id: string, data: Partial<Company>) {
    const companies = this.getCompanies();
    const idx = companies.findIndex(c => c.id === id);
    if (idx === -1) return null;
    companies[idx] = { ...companies[idx], ...data };
    this.set('companies', companies);
    return companies[idx];
  }

  // Applications
  getApplications() { return this.get<Application>('applications'); }
  createApplication(app: Omit<Application, 'id' | 'appliedAt'>) {
    const apps = this.getApplications();
    const newApp = { ...app, id: uuidv4(), appliedAt: new Date().toISOString() };
    apps.push(newApp);
    this.set('applications', apps);
    return newApp;
  }

  // Notifications
  getNotifications(userId: string) {
    return this.get<Notification>('notifications').filter(n => n.userId === userId).sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime());
  }

  createNotification(notif: Omit<Notification, 'id' | 'time' | 'isRead'>) {
    const notifications = this.get<Notification>('notifications');
    const newNotif = {
      ...notif,
      id: uuidv4(),
      time: new Date().toISOString(),
      isRead: false
    };
    notifications.push(newNotif);
    this.set('notifications', notifications);
    return newNotif;
  }

  markNotificationRead(id: string) {
    const notifications = this.get<Notification>('notifications');
    const idx = notifications.findIndex(n => n.id === id);
    if (idx === -1) return;
    notifications[idx].isRead = true;
    this.set('notifications', notifications);
  }

  markAllNotificationsRead(userId: string) {
    const notifications = this.get<Notification>('notifications');
    const updated = notifications.map(n => n.userId === userId ? { ...n, isRead: true } : n);
    this.set('notifications', updated);
  }

  // Support Messages
  getSupportMessages() { return this.get<SupportMessage>('support_messages'); }
  createSupportMessage(msg: Omit<SupportMessage, 'id' | 'status' | 'createdAt'>) {
    const messages = this.getSupportMessages();
    const newMsg = {
      ...msg,
      id: uuidv4(),
      status: 'new' as const,
      createdAt: new Date().toISOString()
    };
    messages.push(newMsg);
    this.set('support_messages', messages);
    return newMsg;
  }
  updateSupportMessage(id: string, data: Partial<SupportMessage>) {
    const messages = this.getSupportMessages();
    const idx = messages.findIndex(m => m.id === id);
    if (idx === -1) return null;
    messages[idx] = { ...messages[idx], ...data };
    this.set('support_messages', messages);
    return messages[idx];
  }
}

export const db = new MockDB();
