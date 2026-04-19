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
      { name: 'Incident_Report_L3_Formwork.pdf', type: 'pdf', size: '1.5MB', uploadedBy: 'Eric Ng', date: '2025-11-05 08:00:00', included: true },
      { name: 'LD_Notification.pdf', type: 'pdf', size: '95KB', uploadedBy: 'Eric Ng', date: '2025-11-05 09:30:00', included: true },
      { name: 'site_photo_formwork_collapse.jpg', type: 'jpg', size: '2.8MB', uploadedBy: 'Eric Ng', date: '2025-11-04 15:10:00', included: false },
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
  },
  {
    id: 'DC/2024/09-EWN-0047',
    submissionRef: 'KKJV/DC202409/L00992',
    title: 'Ground settlement at Section D pile cap',
    type: 'Early Warning Notice',
    version: '1.0',
    dateAware: '2025-10-05',
    notifiedDate: '2025-10-08',
    replyRequiredDate: '2025-10-22',
    noticeGivenBy: 'Main Contractor',
    categories: ['Delaying Completion', 'Increasing the Total of the Price'],
    description: 'Unexpected ground settlement observed at pile cap PC-D12 during excavation works. Settlement reading exceeded 25mm threshold specified in the contract. Geotechnical engineer has been notified and monitoring frequency increased to twice daily.',
    riskMeetingRequired: 'Urgent risk meeting required within 3 working days',
    meetingDate: '2025-10-11',
    likelihood: 'High',
    severity: 'Critical',
    priority: 'Urgent',
    actionOwner: 'Tommy Lau',
    status: 'Requested',
    tags: ['Geotechnical', 'Safety'],
    files: [
      { name: 'Settlement_Monitoring_Report_Oct05.pdf', type: 'pdf', size: '540KB', uploadedBy: 'Tommy Lau', date: '2025-10-06 08:45:00', included: true },
      { name: 'PC-D12_survey_readings.xlsx', type: 'xlsx', size: '95KB', uploadedBy: 'Tommy Lau', date: '2025-10-07 17:10:33', included: true },
    ],
    approvalProgress: [
      { role: 'Assistant Quantity Surveyor', user: 'FAN Ka Chun', date: '2025-10-08 09:00:00', status: 'Created' },
      { role: 'PQS', user: 'Lok Chan', date: '2025-10-08 14:30:00', status: 'Submitted' },
      { role: 'Commercial Manager', user: 'Robert Henderson', date: '2025-10-09 10:15:00', status: 'Waiting for Approval' },
    ],
    externalReviewers: [
      { user: 'Albert Low', role: "Engineer's Representative", lastOpened: '2025-10-09 09:00', status: 'Not Yet Responded' },
    ],
    activityLog: [
      { user: 'Tommy Lau', action: 'created draft', date: 'Oct 06', details: 'Ground settlement anomaly detected at PC-D12. Draft EWN initiated.' },
      { user: 'FAN Ka Chun', action: 'submitted for approval', date: 'Oct 08', details: 'Submitted to PQS for review.' },
      { user: 'Lok Chan', action: 'saved RISK management', date: 'Oct 08' },
    ],
  },
  {
    id: 'DC/2024/09-EWN-0048',
    submissionRef: 'KKJV/DC202409/L00993',
    title: 'Asbestos-containing material found at demolition zone',
    type: 'Early Warning Notice',
    version: '1.0',
    dateAware: '2025-10-09',
    notifiedDate: '2025-10-10',
    replyRequiredDate: '2025-10-24',
    noticeGivenBy: 'Main Contractor',
    categories: ['Delaying Completion', 'Increasing the Total of the Price', 'Impairing the performance of the work in work'],
    description: 'During demolition of existing structure at Block C, suspected asbestos-containing material (ACM) identified in roof panels and pipe insulation. Works in affected area immediately suspended. Licensed asbestos contractor to be engaged for assessment and removal.',
    riskMeetingRequired: 'To be discussed at next scheduled early warning meeting',
    meetingDate: '2025-10-15',
    likelihood: 'High',
    severity: 'Critical',
    priority: 'Urgent',
    actionOwner: 'Winnie Ho',
    status: 'Awaiting',
    tags: ['Safety', 'Environmental', 'Regulatory'],
    files: [
      { name: 'ACM_Preliminary_Assessment.pdf', type: 'pdf', size: '1.1MB', uploadedBy: 'Winnie Ho', date: '2025-10-10 11:00:00', included: true },
      { name: 'site_photo_ACM_blockC.jpg', type: 'jpg', size: '2.4MB', uploadedBy: 'Winnie Ho', date: '2025-10-10 11:05:00', included: false },
    ],
    approvalProgress: [
      { role: 'Assistant Quantity Surveyor', user: 'FAN Ka Chun', date: '2025-10-10 13:00:00', status: 'Created' },
      { role: 'PQS', user: 'Lok Chan', date: '2025-10-10 17:00:00', status: 'Submitted' },
      { role: 'Commercial Manager', user: 'Robert Henderson', date: '2025-10-11 09:30:00', status: 'Approved' },
      { role: 'Project Director', user: 'Michelle Wong', date: '2025-10-11 15:00:00', status: 'Approved' },
    ],
    externalReviewers: [
      { user: 'Albert Low', role: "Engineer's Representative", lastOpened: '2025-10-12 10:00', status: 'Approve' },
      { user: 'Sarah Jenkins', role: 'Lead Architect', lastOpened: '2025-10-12 14:20', status: 'Not Yet Responded' },
    ],
    activityLog: [
      { user: 'Winnie Ho', action: 'created draft', date: 'Oct 10', details: 'Suspected ACM found. Immediate suspension of demolition works at Block C.' },
      { user: 'FAN Ka Chun', action: 'submitted for approval', date: 'Oct 10' },
      { user: 'Robert Henderson', action: 'added comment', date: 'Oct 11', details: 'Engage licensed asbestos contractor immediately. Do not resume works without clearance certificate.' },
      { user: 'Michelle Wong', action: 'approved', date: 'Oct 11' },
    ],
    response: {
      status: 'Instructed',
      responder: 'Albert Low',
      responderRole: 'Project Manager',
      date: '2025-10-13',
      content: 'The Project Manager acknowledges the EWN. Contractor shall engage a licensed asbestos removal contractor approved by EPD and submit a detailed removal programme within 5 working days.',
      instructionToContractor: 'Submit asbestos removal programme by 2025-10-18. All works in Block C to remain suspended until further notice.'
    }
  },
  {
    id: 'DC/2024/09-EWN-0049',
    submissionRef: 'KKJV/DC202409/L00994',
    title: 'Shortage of structural steel due to supply chain disruption',
    type: 'Early Warning Notice',
    version: '0.2',
    dateAware: '2025-10-12',
    notifiedDate: '2025-10-14',
    replyRequiredDate: '2025-10-28',
    noticeGivenBy: 'Main Contractor',
    categories: ['Delaying Completion', 'Increasing the Total of the Price'],
    description: 'Steel supplier notified MC of a 6-week lead time extension for Grade 50B structural steel sections due to global supply chain disruption. Affected sections include UB 305x165x40 and UC 203x203x46 required for Level 4 steel frame erection. Current stock will be depleted by end of October.',
    riskMeetingRequired: 'To be discussed at next scheduled early warning meeting',
    meetingDate: '2025-10-22',
    likelihood: 'High',
    severity: 'High',
    priority: 'High',
    actionOwner: 'Derek Chan',
    status: 'Awaiting',
    tags: ['Supply Chain', 'Structural'],
    files: [
      { name: 'Supplier_Delay_Notice_Oct12.pdf', type: 'pdf', size: '320KB', uploadedBy: 'Derek Chan', date: '2025-10-13 09:00:00', included: true },
    ],
    approvalProgress: [
      { role: 'Assistant Quantity Surveyor', user: 'FAN Ka Chun', date: '2025-10-14 10:00:00', status: 'Created' },
      { role: 'PQS', user: 'Lok Chan', date: '2025-10-14 16:00:00', status: 'Submitted' },
      { role: 'Commercial Manager', user: 'Robert Henderson', date: '2025-10-15 11:00:00', status: 'Waiting for Approval' },
    ],
    externalReviewers: [],
    activityLog: [
      { user: 'Derek Chan', action: 'created draft', date: 'Oct 13', details: 'Steel supplier confirmed 6-week delay. EWN raised to notify PM.' },
      { user: 'FAN Ka Chun', action: 'submitted for approval', date: 'Oct 14' },
    ],
  },
  {
    id: 'DC/2024/09-EWN-0050',
    submissionRef: 'KKJV/DC202409/L00995',
    title: 'Unforeseen rock encountered during bored piling',
    type: 'Early Warning Notice',
    version: '1.1',
    dateAware: '2025-10-15',
    notifiedDate: '2025-10-16',
    replyRequiredDate: '2025-10-30',
    noticeGivenBy: 'Main Contractor',
    categories: ['Increasing the Total of the Price', 'Delaying Completion'],
    description: 'During bored piling works at Grid Line 7, rock head was encountered at -8.5mPD, which is approximately 4.5m higher than predicted by the ground investigation report. The rock is classified as Grade II/III granite requiring additional rock-socketing works. An estimated 12 additional piles are affected.',
    riskMeetingRequired: 'Urgent risk meeting required within 3 working days',
    meetingDate: '2025-10-19',
    likelihood: 'High',
    severity: 'High',
    priority: 'High',
    actionOwner: 'Tommy Lau',
    status: 'Mitigated',
    tags: ['Geotechnical', 'Piling'],
    files: [
      { name: 'GI_Borehole_Records.pdf', type: 'pdf', size: '4.2MB', uploadedBy: 'Tommy Lau', date: '2025-10-16 08:00:00', included: true },
      { name: 'Rock_Socketing_Method_Statement.pdf', type: 'pdf', size: '980KB', uploadedBy: 'Tommy Lau', date: '2025-10-17 14:30:00', included: true },
      { name: 'pile_log_grid7.jpg', type: 'jpg', size: '870KB', uploadedBy: 'Tommy Lau', date: '2025-10-16 07:55:00', included: false },
    ],
    approvalProgress: [
      { role: 'Assistant Quantity Surveyor', user: 'FAN Ka Chun', date: '2025-10-16 11:00:00', status: 'Created' },
      { role: 'PQS', user: 'Lok Chan', date: '2025-10-16 15:00:00', status: 'Submitted' },
      { role: 'Commercial Manager', user: 'Robert Henderson', date: '2025-10-17 10:00:00', status: 'Approved' },
      { role: 'Project Director', user: 'Michelle Wong', date: '2025-10-17 16:00:00', status: 'Approved' },
    ],
    externalReviewers: [
      { user: 'Albert Low', role: "Engineer's Representative", lastOpened: '2025-10-18 09:30', status: 'Approve' },
    ],
    activityLog: [
      { user: 'Tommy Lau', action: 'created draft', date: 'Oct 16', details: 'Rock head unexpectedly high at Grid Line 7. Rock socketing required.' },
      { user: 'Lok Chan', action: 'saved RISK management', date: 'Oct 16' },
      { user: 'FAN Ka Chun', action: 'submitted for approval', date: 'Oct 16' },
      { user: 'Robert Henderson', action: 'added comment', date: 'Oct 17', details: 'Variation order to be prepared for additional rock socketing. Confirm day-work records are maintained.' },
      { user: 'Michelle Wong', action: 'approved', date: 'Oct 17' },
    ],
    response: {
      status: 'Acknowledged',
      responder: 'Albert Low',
      responderRole: 'Project Manager',
      date: '2025-10-18',
      content: 'The Project Manager acknowledges the unforeseen ground condition. Contractor may proceed with rock socketing works. A compensation event assessment shall be submitted within 14 days.',
      instructionToContractor: 'Submit CE assessment for additional rock socketing by 2025-11-01.'
    }
  },
  {
    id: 'DC/2024/09-EWN-0051',
    submissionRef: 'KKJV/DC202409/L00996',
    title: 'Crane runway beam misalignment',
    type: 'Early Warning Notice',
    version: '0.3',
    dateAware: '2025-10-18',
    notifiedDate: '2025-10-20',
    replyRequiredDate: '2025-11-03',
    noticeGivenBy: 'Main Contractor',
    categories: ['Delaying Completion', 'Impairing the performance of the work in work'],
    description: 'Tower crane runway beams at RB-3 found to be out of alignment by 18mm horizontally and 12mm vertically upon survey check. Misalignment is beyond tolerance stated in BS EN 1090-2. Crane operations in affected zone suspended pending rectification. Structural engineer instructed to review.',
    riskMeetingRequired: 'To be discussed at next scheduled early warning meeting',
    meetingDate: '2025-10-28',
    likelihood: 'Medium',
    severity: 'High',
    priority: 'High',
    actionOwner: 'Eric Ng',
    status: 'Awaiting',
    tags: ['Structural', 'Safety', 'Plant'],
    files: [
      { name: 'Runway_Survey_Report.pdf', type: 'pdf', size: '650KB', uploadedBy: 'Eric Ng', date: '2025-10-19 10:00:00', included: true },
    ],
    approvalProgress: [
      { role: 'Assistant Quantity Surveyor', user: 'FAN Ka Chun', date: '2025-10-20 09:00:00', status: 'Created' },
      { role: 'PQS', user: 'Lok Chan', date: '2025-10-20 14:00:00', status: 'Submitted' },
      { role: 'Commercial Manager', user: 'Robert Henderson', date: '2025-10-21 09:00:00', status: 'Waiting for Approval' },
    ],
    externalReviewers: [
      { user: 'Albert Low', role: "Engineer's Representative", lastOpened: '2025-10-21 11:00', status: 'Not Yet Responded' },
    ],
    activityLog: [
      { user: 'Eric Ng', action: 'created draft', date: 'Oct 19', details: 'Runway beam survey identified non-compliant alignment. Crane suspended.' },
      { user: 'FAN Ka Chun', action: 'submitted for approval', date: 'Oct 20' },
    ],
  },
  {
    id: 'DC/2024/09-EWN-0052',
    submissionRef: 'KKJV/DC202409/L00997',
    title: 'Underground water main burst at Ch. 340',
    type: 'Early Warning Notice',
    version: '1.0',
    dateAware: '2025-10-20',
    notifiedDate: '2025-10-21',
    replyRequiredDate: '2025-11-04',
    noticeGivenBy: 'Main Contractor',
    categories: ['Delaying Completion', 'Increasing the Total of the Price', 'Impairing the performance of the work in work'],
    description: 'A 300mm diameter WSD water main burst at Chainage 340 during road breaking works. Works in the 50m radius exclusion zone immediately halted. WSD emergency crew notified. Potential damage to adjacent utility ducts. Traffic diversion measures activated on Tai Po Road.',
    riskMeetingRequired: 'Urgent risk meeting required within 3 working days',
    meetingDate: '2025-10-24',
    likelihood: 'High',
    severity: 'Critical',
    priority: 'Urgent',
    actionOwner: 'Winnie Ho',
    status: 'Requested',
    tags: ['Utility', 'Safety', 'Environmental'],
    files: [
      { name: 'WSD_Notification_Letter.pdf', type: 'pdf', size: '210KB', uploadedBy: 'Winnie Ho', date: '2025-10-21 08:30:00', included: true },
      { name: 'burst_main_photo_ch340.jpg', type: 'jpg', size: '3.1MB', uploadedBy: 'Winnie Ho', date: '2025-10-20 16:45:00', included: false },
      { name: 'Traffic_Diversion_Plan.pdf', type: 'pdf', size: '480KB', uploadedBy: 'Winnie Ho', date: '2025-10-21 09:00:00', included: true },
    ],
    approvalProgress: [
      { role: 'Assistant Quantity Surveyor', user: 'FAN Ka Chun', date: '2025-10-21 10:00:00', status: 'Created' },
      { role: 'PQS', user: 'Lok Chan', date: '2025-10-21 13:30:00', status: 'Submitted' },
      { role: 'Commercial Manager', user: 'Robert Henderson', date: '2025-10-22 08:30:00', status: 'Approved' },
      { role: 'Project Director', user: 'Michelle Wong', date: '2025-10-22 11:00:00', status: 'Approved' },
    ],
    externalReviewers: [
      { user: 'Albert Low', role: "Engineer's Representative", lastOpened: '2025-10-22 14:00', status: 'Approve' },
      { user: 'Sarah Jenkins', role: 'Lead Architect', lastOpened: '2025-10-23 09:30', status: 'Not Yet Responded' },
    ],
    activityLog: [
      { user: 'Winnie Ho', action: 'created draft', date: 'Oct 21', details: 'WSD water main burst at Ch.340. Emergency measures activated.' },
      { user: 'Winnie Ho', action: 'added comment', date: 'Oct 21', details: 'WSD crew on site. Estimated 3-day repair duration.' },
      { user: 'FAN Ka Chun', action: 'submitted for approval', date: 'Oct 21' },
      { user: 'Robert Henderson', action: 'approved', date: 'Oct 22' },
      { user: 'Michelle Wong', action: 'approved', date: 'Oct 22' },
    ],
    response: {
      status: 'Instructed',
      responder: 'Albert Low',
      responderRole: 'Project Manager',
      date: '2025-10-23',
      content: 'The Project Manager acknowledges the incident. All costs associated with emergency repair coordination and traffic management to be documented for compensation event assessment.',
      instructionToContractor: 'Maintain daily records of all additional costs incurred. Submit CE notification by 2025-10-28.'
    }
  },
  {
    id: 'DC/2024/09-EWN-0053',
    submissionRef: 'KKJV/DC202409/L00998',
    title: 'Design change to curtain wall system at Tower A',
    type: 'Early Warning Notice',
    version: '0.5',
    dateAware: '2025-10-22',
    notifiedDate: '2025-10-24',
    replyRequiredDate: '2025-11-07',
    noticeGivenBy: 'PM',
    categories: ['Increasing the Total of the Price', 'Delaying Completion'],
    description: 'Architect issued RFI response requiring change of curtain wall system from stick system to unitised system for Tower A Levels 10-25. The change affects 2,800sqm of facade. Lead time for unitised panels is 20 weeks from overseas fabricator. Current programme shows facade works commencing in Week 38.',
    riskMeetingRequired: 'To be discussed at next scheduled early warning meeting',
    meetingDate: '2025-11-05',
    likelihood: 'High',
    severity: 'High',
    priority: 'High',
    actionOwner: 'Sarah Jenkins',
    status: 'Awaiting',
    tags: ['Design', 'Architectural', 'Programme'],
    files: [
      { name: 'RFI-0234_Response.pdf', type: 'pdf', size: '1.8MB', uploadedBy: 'system', date: '2025-10-22 15:00:00', included: true },
      { name: 'Unitised_CW_Specification.pdf', type: 'pdf', size: '2.3MB', uploadedBy: 'Sarah Jenkins', date: '2025-10-24 10:00:00', included: true },
    ],
    approvalProgress: [
      { role: 'Assistant Quantity Surveyor', user: 'FAN Ka Chun', date: '2025-10-24 09:30:00', status: 'Created' },
      { role: 'PQS', user: 'Lok Chan', date: '2025-10-24 16:30:00', status: 'Submitted' },
      { role: 'Commercial Manager', user: 'Robert Henderson', date: '2025-10-25 10:00:00', status: 'Waiting for Approval' },
    ],
    externalReviewers: [
      { user: 'Albert Low', role: "Engineer's Representative", lastOpened: '2025-10-25 11:30', status: 'Not Yet Responded' },
    ],
    activityLog: [
      { user: 'Sarah Jenkins', action: 'created draft', date: 'Oct 24', details: 'Curtain wall system change instructed via RFI-0234. EWN raised.' },
      { user: 'FAN Ka Chun', action: 'saved RISK management', date: 'Oct 24' },
      { user: 'FAN Ka Chun', action: 'submitted for approval', date: 'Oct 24' },
    ],
  },
  {
    id: 'DC/2024/09-EWN-0054',
    submissionRef: 'KKJV/DC202409/L00999',
    title: 'Noise complaint from adjacent residents – night works',
    type: 'Early Warning Notice',
    version: '1.0',
    dateAware: '2025-10-25',
    notifiedDate: '2025-10-27',
    replyRequiredDate: '2025-11-10',
    noticeGivenBy: 'Main Contractor',
    categories: ['Impairing the performance of the work in work'],
    description: 'Multiple noise complaints received from residents of Lung Wah Court adjacent to the site regarding percussive piling works conducted under a CNP. EPD has issued a verbal warning to the site agent. Noise level readings taken at site boundary exceeded 75dB(A) on three occasions. Risk of CNP revocation if non-compliance continues.',
    riskMeetingRequired: 'To be discussed at next scheduled early warning meeting',
    meetingDate: '2025-11-02',
    likelihood: 'Medium',
    severity: 'Moderate',
    priority: 'Medium',
    actionOwner: 'Eddy',
    status: 'Mitigated',
    tags: ['Environmental', 'Regulatory', 'Community Relations'],
    files: [
      { name: 'Noise_Level_Readings_Oct25.pdf', type: 'pdf', size: '175KB', uploadedBy: 'Eddy', date: '2025-10-26 09:00:00', included: true },
      { name: 'EPD_Warning_Letter.pdf', type: 'pdf', size: '90KB', uploadedBy: 'Eddy', date: '2025-10-27 10:00:00', included: true },
    ],
    approvalProgress: [
      { role: 'Assistant Quantity Surveyor', user: 'FAN Ka Chun', date: '2025-10-27 11:00:00', status: 'Created' },
      { role: 'PQS', user: 'Lok Chan', date: '2025-10-27 15:00:00', status: 'Submitted' },
      { role: 'Commercial Manager', user: 'Robert Henderson', date: '2025-10-28 09:30:00', status: 'Approved' },
      { role: 'Project Director', user: 'Michelle Wong', date: '2025-10-28 14:00:00', status: 'Approved' },
    ],
    externalReviewers: [
      { user: 'Albert Low', role: "Engineer's Representative", lastOpened: '2025-10-29 09:00', status: 'Approve' },
    ],
    activityLog: [
      { user: 'Eddy', action: 'created draft', date: 'Oct 26', details: 'EPD verbal warning received. Noise complaint from Lung Wah Court documented.' },
      { user: 'FAN Ka Chun', action: 'submitted for approval', date: 'Oct 27' },
      { user: 'Robert Henderson', action: 'added comment', date: 'Oct 28', details: 'Ensure noise barriers are installed and rig enclosures are checked before next night shift.' },
      { user: 'Michelle Wong', action: 'approved', date: 'Oct 28' },
    ],
    response: {
      status: 'Acknowledged',
      responder: 'Albert Low',
      responderRole: 'Project Manager',
      date: '2025-10-29',
      content: 'PM acknowledges the noise issue. Contractor to implement additional noise mitigation measures immediately and provide an updated noise management plan within 3 working days.',
      instructionToContractor: 'Submit updated Noise Management Plan by 2025-11-01.'
    }
  },
  {
    id: 'DC/2024/09-EWN-0055',
    submissionRef: 'KKJV/DC202409/L01000',
    title: 'Delay in obtaining BD approval for temporary works',
    type: 'Early Warning Notice',
    version: '0.2',
    dateAware: '2025-10-28',
    notifiedDate: '2025-10-30',
    replyRequiredDate: '2025-11-13',
    noticeGivenBy: 'Main Contractor',
    categories: ['Delaying Completion'],
    description: 'Buildings Department approval for temporary works drawings (shoring and formwork for basement B3) has not been received as of the date of this notice. Submission was made 8 weeks ago. BD has requested two rounds of clarification. If approval is not received by 15 November, concrete works for B3 slab will be delayed by a minimum of 3 weeks.',
    riskMeetingRequired: 'To be discussed at next scheduled early warning meeting',
    meetingDate: '2025-11-08',
    likelihood: 'High',
    severity: 'High',
    priority: 'High',
    actionOwner: 'Derek Chan',
    status: 'Awaiting',
    tags: ['Regulatory', 'Programme', 'Statutory'],
    files: [
      { name: 'BD_Submission_Acknowledgement.pdf', type: 'pdf', size: '150KB', uploadedBy: 'Derek Chan', date: '2025-09-02 10:00:00', included: true },
      { name: 'BD_Clarification_RFI_2.pdf', type: 'pdf', size: '220KB', uploadedBy: 'Derek Chan', date: '2025-10-15 14:00:00', included: true },
    ],
    approvalProgress: [
      { role: 'Assistant Quantity Surveyor', user: 'FAN Ka Chun', date: '2025-10-30 10:00:00', status: 'Created' },
      { role: 'PQS', user: 'Lok Chan', date: '2025-10-30 15:30:00', status: 'Submitted' },
      { role: 'Commercial Manager', user: 'Robert Henderson', date: '2025-10-31 09:00:00', status: 'Waiting for Approval' },
    ],
    externalReviewers: [],
    activityLog: [
      { user: 'Derek Chan', action: 'created draft', date: 'Oct 29', details: 'BD approval overdue. Risk to B3 slab programme identified.' },
      { user: 'FAN Ka Chun', action: 'submitted for approval', date: 'Oct 30' },
    ],
  },
  {
    id: 'DC/2024/09-EWN-0056',
    submissionRef: 'KKJV/DC202409/L01001',
    title: 'Contaminated soil found at excavation level -5m',
    type: 'Early Warning Notice',
    version: '1.0',
    dateAware: '2025-11-01',
    notifiedDate: '2025-11-03',
    replyRequiredDate: '2025-11-17',
    noticeGivenBy: 'Main Contractor',
    categories: ['Increasing the Total of the Price', 'Delaying Completion'],
    description: 'During bulk excavation works at the northern zone, soil samples taken at -5mPD returned elevated heavy metal concentrations (lead and arsenic) exceeding EPD Remediation Criteria. An estimated 800m³ of contaminated fill requires off-site disposal at a licensed contaminated soil facility. Works in affected area suspended pending EPD notification.',
    riskMeetingRequired: 'Urgent risk meeting required within 3 working days',
    meetingDate: '2025-11-06',
    likelihood: 'High',
    severity: 'High',
    priority: 'High',
    actionOwner: 'Winnie Ho',
    status: 'Requested',
    tags: ['Environmental', 'Geotechnical', 'Regulatory'],
    files: [
      { name: 'Soil_Sample_Lab_Results.pdf', type: 'pdf', size: '780KB', uploadedBy: 'Winnie Ho', date: '2025-11-02 09:00:00', included: true },
      { name: 'EPD_Notification_Form.pdf', type: 'pdf', size: '130KB', uploadedBy: 'Winnie Ho', date: '2025-11-03 10:00:00', included: true },
    ],
    approvalProgress: [
      { role: 'Assistant Quantity Surveyor', user: 'FAN Ka Chun', date: '2025-11-03 11:00:00', status: 'Created' },
      { role: 'PQS', user: 'Lok Chan', date: '2025-11-03 16:00:00', status: 'Submitted' },
      { role: 'Commercial Manager', user: 'Robert Henderson', date: '2025-11-04 10:00:00', status: 'Waiting for Approval' },
    ],
    externalReviewers: [
      { user: 'Albert Low', role: "Engineer's Representative", lastOpened: '2025-11-04 14:00', status: 'Not Yet Responded' },
    ],
    activityLog: [
      { user: 'Winnie Ho', action: 'created draft', date: 'Nov 02', details: 'Contaminated soil confirmed by lab. EPD notification in progress.' },
      { user: 'FAN Ka Chun', action: 'submitted for approval', date: 'Nov 03' },
    ],
  },
  {
    id: 'DC/2024/09-EWN-0057',
    submissionRef: 'KKJV/DC202409/L01002',
    title: 'Formwork collapse at Level 3 slab pour',
    type: 'Early Warning Notice',
    version: '1.0',
    dateAware: '2025-11-04',
    notifiedDate: '2025-11-05',
    replyRequiredDate: '2025-11-19',
    noticeGivenBy: 'Main Contractor',
    categories: ['Delaying Completion', 'Impairing the performance of the work in work'],
    description: 'Partial formwork collapse occurred during concrete pour at Level 3 slab on 04 Nov at approximately 14:30. No personnel were injured. Approximately 15m² of soffit formwork dropped by 200mm. Concrete pour immediately halted. LD notified. Independent investigation by an RSE has been commissioned.',
    riskMeetingRequired: 'Urgent risk meeting required within 3 working days',
    meetingDate: '2025-11-07',
    likelihood: 'Low',
    severity: 'Critical',
    priority: 'Urgent',
    actionOwner: 'Eric Ng',
    status: 'Requested',
    tags: ['Safety', 'Structural', 'Incident'],
    files: [
      { name: 'Attachment A.pdf', type: 'pdf', size: '280KB', uploadedBy: 'system', date: '2025-10-17 11:15:59', included: true },
      { name: 'flood_photo_01.jpg', type: 'jpg', size: '1.2MB', uploadedBy: 'PM', date: '2025-10-18 09:30:22', included: false },
    ],
    approvalProgress: [
      { role: 'Assistant Quantity Surveyor', user: 'FAN Ka Chun', date: '2025-11-05 09:00:00', status: 'Created' },
      { role: 'PQS', user: 'Lok Chan', date: '2025-11-05 12:00:00', status: 'Submitted' },
      { role: 'Commercial Manager', user: 'Robert Henderson', date: '2025-11-05 15:00:00', status: 'Approved' },
      { role: 'Project Director', user: 'Michelle Wong', date: '2025-11-05 17:00:00', status: 'Approved' },
    ],
    externalReviewers: [
      { user: 'Albert Low', role: "Engineer's Representative", lastOpened: '2025-11-06 09:00', status: 'Approve' },
      { user: 'Sarah Jenkins', role: 'Lead Architect', lastOpened: '2025-11-06 11:00', status: 'Not Yet Responded' },
    ],
    activityLog: [
      { user: 'Eric Ng', action: 'created draft', date: 'Nov 05', details: 'Formwork collapse incident at L3. LD notified. RSE commissioned.' },
      { user: 'Robert Henderson', action: 'added comment', date: 'Nov 05', details: 'All formwork works on site to be suspended pending RSE investigation and clearance.' },
      { user: 'Michelle Wong', action: 'approved', date: 'Nov 05' },
    ],
    response: {
      status: 'Instructed',
      responder: 'Albert Low',
      responderRole: 'Project Manager',
      date: '2025-11-06',
      content: 'PM instructs all formwork activities to be suspended until RSE investigation report is received and reviewed. A safety stand-down meeting for all site personnel to be conducted by 07 Nov.',
      instructionToContractor: 'Submit RSE investigation report and revised method statement before resuming any formwork works.'
    }
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
