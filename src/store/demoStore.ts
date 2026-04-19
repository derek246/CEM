import { EarlyWarning } from '../types';

const STORAGE_KEY = 'ce_module_early_warnings';

const MOCK_DATA: EarlyWarning[] = [
  {
    id: 'DC/2024/09-EWN-0045',
    submissionRef: 'KKJV/DC202409/L00990',
    title: 'Flood at section B',
    type: 'Early Warning Notice',
    version: '1.0',
    dateAware: '2025-09-28',
    notifiedDate: '2025-10-01',
    replyRequiredDate: '2025-10-14',
    noticeGivenBy: 'Main Contractor',
    categories: ['Increasing the Total of the Price', 'Delaying Completion'],
    description: 'Main entrance flood, pls see images attached. Water levels rose significantly after heavy rain.',
    riskMeetingRequired: 'To be discussed at next scheduled early warning meeting',
    meetingDate: '2025-11-09',
    likelihood: 'Medium',
    severity: 'High',
    priority: 'High',
    actionOwner: 'Eddy',
    status: 'Mitigated',
    tags: ['Environmental', 'Weather'],
    files: [
      { name: 'Attachment A.pdf', type: 'pdf', size: '280KB', uploadedBy: 'system', date: '2025-10-17 11:15:59', included: true },
      { name: 'flood_photo_01.jpg', type: 'jpg', size: '1.2MB', uploadedBy: 'PM', date: '2025-10-18 09:30:22', included: false },
    ],
    approvalProgress: [
      { role: 'Assistant Quantity Surveyor', user: 'FAN Ka Chun', date: '2023-11-15 09:42:15', status: 'Created' },
      { role: 'PQS', user: 'Lok Chan', date: '2023-11-15 14:20:00', status: 'Submitted' },
      { role: 'Commercial Manager', user: 'Robert Henderson', date: '2023-11-16 11:05:45', status: 'Approved' },
      { role: 'Project Director', user: 'Michelle Wong', date: '2023-11-16 11:05:45', status: 'Waiting for Approval' },
    ],
    externalReviewers: [
      { user: 'Albert Low', role: "Engineer's Representative", lastOpened: '2023-11-17 14:30', status: 'Approve' },
      { user: 'Sarah Jenkins', role: 'Lead Architect', lastOpened: '2023-11-18 09:12', status: 'Not Yet Responded' },
    ],
    activityLog: [
      { user: 'Michael Chen', action: 'created draft', date: 'Oct 15', details: 'Initial draft created for Early Warning notification.' },
      { user: 'Sarah Wong', action: 'saved RISK management', date: 'Oct 16' },
      { user: 'Robert Henderson', action: 'added comment', date: 'Oct 17', details: 'Please verify the northwestern corridor logistics data before submission.' },
      { user: 'Michael Chen', action: 'submitted for approval', date: 'Oct 18' },
    ],
    response: {
      status: 'Instructed',
      responder: 'Sarah Jenkins',
      responderRole: 'Project Manager',
      date: '2025-10-21',
      content: 'The Project Manager instructs the Contractor to provide a detailed plan for water diversion in Section B. Please ensure all temporary works drawings are submitted for review by EOD Friday.',
      instructionToContractor: 'Provide temporary drainage plan by 2025-10-24.'
    }
  },
  {
    id: 'DC/2024/09-EWN-0046',
    submissionRef: 'KKJV/DC202409/L00991',
    title: 'Utility conflict at Ch. 120',
    type: 'Early Warning Notice',
    version: '0.4',
    dateAware: '2025-09-30',
    notifiedDate: '2025-10-03',
    replyRequiredDate: '2025-10-17',
    noticeGivenBy: 'Main Contractor',
    categories: ['Delaying Completion', 'Impairing the performance of the work in work'],
    description: 'Conflict with existing electrical cables not shown on drawings.',
    riskMeetingRequired: 'To be discussed at next scheduled meeting',
    meetingDate: '2025-11-12',
    likelihood: 'Medium',
    severity: 'Medium',
    priority: 'Medium',
    actionOwner: 'Sarah',
    status: 'Awaiting',
    tags: ['Strategic', 'Operational'],
    files: [],
    approvalProgress: [],
    externalReviewers: [],
    activityLog: []
  }
];

export const getStore = (): EarlyWarning[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(MOCK_DATA));
    return MOCK_DATA;
  }
  return JSON.parse(stored);
};

export const saveStore = (data: EarlyWarning[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

export const addWarning = (warning: EarlyWarning) => {
  const store = getStore();
  saveStore([warning, ...store]);
};

export const updateWarning = (updated: EarlyWarning) => {
  const store = getStore();
  const index = store.findIndex(w => w.id === updated.id);
  if (index !== -1) {
    store[index] = updated;
    saveStore(store);
  }
};

export const deleteWarning = (id: string) => {
  const store = getStore();
  saveStore(store.filter(w => w.id !== id));
};
