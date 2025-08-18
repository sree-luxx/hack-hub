export interface User {
  id: string;
  email: string;
  name: string;
  role: 'participant' | 'organizer' | 'judge';
  avatar?: string;
  createdAt: Date;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  theme: string;
  startDate: Date;
  endDate: Date;
  registrationDeadline: Date;
  mode: 'online' | 'offline' | 'hybrid';
  location?: string;
  maxTeamSize: number;
  prizes: Prize[];
  sponsors: Sponsor[];
  tracks: string[];
  rules: string;
  timeline: TimelineItem[];
  organizerId: string;
  status: 'draft' | 'published' | 'ongoing' | 'completed';
  registrations: number;
  maxParticipants?: number;
}

export interface Prize {
  rank: number;
  amount: string;
  description: string;
}

export interface Sponsor {
  name: string;
  logo: string;
  tier: 'platinum' | 'gold' | 'silver' | 'bronze';
}

export interface TimelineItem {
  title: string;
  date: Date;
  description: string;
}

export interface Team {
  id: string;
  name: string;
  eventId: string;
  leaderId: string;
  members: TeamMember[];
  inviteCode: string;
  maxSize: number;
  description?: string;
  skills: string[];
}

export interface TeamMember {
  userId: string;
  name: string;
  email: string;
  role: 'leader' | 'member';
  joinedAt: Date;
}

export interface Submission {
  id: string;
  teamId: string;
  eventId: string;
  title: string;
  description: string;
  githubUrl?: string;
  demoUrl?: string;
  videoUrl?: string;
  documents: string[];
  submittedAt: Date;
  status: 'draft' | 'submitted' | 'reviewed';
  scores: Score[];
  feedback: string[];
}

export interface Score {
  judgeId: string;
  innovation: number;
  functionality: number;
  scalability: number;
  uiux: number;
  techIntegration: number;
  feedback: string;
  submittedAt: Date;
}

export interface Announcement {
  id: string;
  eventId?: string;
  title: string;
  content: string;
  type: 'general' | 'event' | 'urgent';
  createdAt: Date;
  createdBy: string;
}

export interface QAThread {
  id: string;
  eventId?: string;
  question: string;
  answer?: string;
  askedBy: string;
  answeredBy?: string;
  createdAt: Date;
  answeredAt?: Date;
  upvotes: number;
}