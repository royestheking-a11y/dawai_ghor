export type LeadStatus = 
  | 'New'
  | 'Verified'
  | 'Audited'
  | 'Hot Lead'
  | 'Message Generated'
  | 'Contacted'
  | 'Replied'
  | 'Interested'
  | 'Demo Sent'
  | 'Meeting Booked'
  | 'Proposal Sent'
  | 'Converted'
  | 'Rejected';

export type LeadCategory = 
  | 'Restaurant'
  | 'Clinic'
  | 'Gym'
  | 'Salon'
  | 'School'
  | 'Shop'
  | 'Pharmacy'
  | 'Real Estate'
  | 'Training Center'
  | 'Travel Agency';

export interface AuditDetails {
  websiteExists: boolean;
  speedScore: number; // 0-100
  isMobileFriendly: boolean;
  hasOnlineOrder: boolean;
  hasWhatsApp: boolean;
  hasBookingSystem: boolean;
  hasGoogleReviewsReply: boolean;
  fbActive: boolean;
  seoScore: number;
}

export type FollowUpStage = 'None' | 'Day 1' | 'Day 3' | 'Day 7' | 'Day 14';

export interface Lead {
  id: string;
  businessName: string;
  category: LeadCategory;
  location: string;
  phone: string;
  email: string;
  website: string;
  facebook: string;
  linkedin?: string;
  whatsapp?: string;
  rating: number; // e.g. 4.3
  reviewCount: number;
  score: number; // 0-100
  status: LeadStatus;
  needDetected: string;
  serviceRecommended: string;
  aiMessageDraft: string;
  outreachChannel: 'WhatsApp' | 'Email' | 'Facebook' | 'LinkedIn';
  approved: boolean;
  followUpStage: FollowUpStage;
  lastContactDate?: string;
  notes: string[];
  auditDetails: AuditDetails;
  decisionMaker?: string;
  decisionMakerTitle?: string;
  estimatedDealValue?: number; // e.g. 500, 1200
  createdVia?: 'Google Places' | 'Chrome Extension' | 'Manual' | 'Website Scraper';
}

export interface ActivityLog {
  id: string;
  leadId: string;
  leadName: string;
  action: string;
  timestamp: string;
  type: 'audit' | 'message' | 'approval' | 'status_change' | 'meeting' | 'proposal';
}
