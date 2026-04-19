
export type Likelihood = 'Low' | 'Medium' | 'High';
export type Severity = 'Low' | 'Medium' | 'High' | 'Minor' | 'Moderate' | 'Critical';
export type Priority = 'Low' | 'Medium' | 'High' | 'Urgent';
export type Status = 'Mitigated' | 'Awaiting' | 'Requested';

export interface FileAttachment {
  name: string;
  type: string;
  size: string;
  uploadedBy: string;
  date: string;
  included: boolean;
}

export interface ApprovalStep {
  role: string;
  user: string;
  date: string;
  status: 'Created' | 'Submitted' | 'Approved' | 'Waiting for Approval';
}

export interface ExternalReviewer {
  user: string;
  role: string;
  lastOpened: string;
  status: string;
}

export interface ActivityLogEntry {
  user: string;
  action: string;
  date: string;
  details?: string;
}

export interface ResponseData {
  status: string;
  responder: string;
  responderRole: string;
  date: string;
  content: string;
  instructionToContractor?: string;
}

export interface EarlyWarning {
  id: string;
  submissionRef: string;
  title: string;
  type: string;
  version: string;
  dateAware: string;
  notifiedDate: string;
  replyRequiredDate: string;
  noticeGivenBy: 'Main Contractor' | 'PM';
  categories: string[];
  description: string;
  riskMeetingRequired: string;
  meetingDate?: string;
  likelihood: Likelihood;
  severity: Severity;
  priority: Priority;
  actionOwner: string;
  status: Status;
  tags: string[];
  files: FileAttachment[];
  approvalProgress: ApprovalStep[];
  externalReviewers: ExternalReviewer[];
  activityLog: ActivityLogEntry[];
  response?: ResponseData;
}
