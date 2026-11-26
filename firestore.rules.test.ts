/**
 * Hardened Security Rules Red-Team Specification Test Suite (Dirty Dozen Payloads)
 * Verifies all 12 adversarial payloads defined in security_spec.md are rejected.
 */

export interface DirtyDozenScenario {
  id: number;
  name: string;
  collection:
    | 'taskLists'
    | 'tasks'
    | 'clinicDevices'
    | 'clinicTreatments'
    | 'publicProfiles'
    | 'seoContentAssets'
    | 'seoReportSchedules';
  operation: 'get' | 'list' | 'create' | 'update' | 'delete';
  expectedOutcome: 'PERMISSION_DENIED';
  payload: Record<string, unknown>;
}

export const DIRTY_DOZEN_TESTS: DirtyDozenScenario[] = [
  {
    id: 1,
    name: 'Unauthenticated Write',
    collection: 'seoContentAssets',
    operation: 'create',
    expectedOutcome: 'PERMISSION_DENIED',
    payload: { auth: null, docId: 'seo_1' },
  },
  {
    id: 2,
    name: 'Unverified Email Spoof',
    collection: 'taskLists',
    operation: 'get',
    expectedOutcome: 'PERMISSION_DENIED',
    payload: { auth: { uid: 'u1', email: 'team@corp.com', email_verified: false }, docId: 'list_1' },
  },
  {
    id: 3,
    name: 'Identity Spoofing on Profile Create',
    collection: 'publicProfiles',
    operation: 'create',
    expectedOutcome: 'PERMISSION_DENIED',
    payload: { auth: { uid: 'u1', email_verified: true }, docId: 'u2', ownerId: 'u2' },
  },
  {
    id: 4,
    name: 'Shadow PII Field Injection on Public Profile',
    collection: 'publicProfiles',
    operation: 'create',
    expectedOutcome: 'PERMISSION_DENIED',
    payload: { email: 'leaked@corp.com', isAdmin: true },
  },
  {
    id: 5,
    name: 'Shadow Field Injection on Update',
    collection: 'seoContentAssets',
    operation: 'update',
    expectedOutcome: 'PERMISSION_DENIED',
    payload: { hackedField: 'injected' },
  },
  {
    id: 6,
    name: 'ID Poisoning Attack',
    collection: 'seoContentAssets',
    operation: 'create',
    expectedOutcome: 'PERMISSION_DENIED',
    payload: { docId: 'invalid/id$with*bad@chars' },
  },
  {
    id: 7,
    name: 'Denial of Wallet String Overflow',
    collection: 'seoContentAssets',
    operation: 'create',
    expectedOutcome: 'PERMISSION_DENIED',
    payload: { contentExcerptLength: 20000 },
  },
  {
    id: 8,
    name: 'Array Overflow Attack',
    collection: 'seoReportSchedules',
    operation: 'create',
    expectedOutcome: 'PERMISSION_DENIED',
    payload: { recipientEmailsCount: 15 },
  },
  {
    id: 9,
    name: 'Invalid Enum State Transition',
    collection: 'seoContentAssets',
    operation: 'update',
    expectedOutcome: 'PERMISSION_DENIED',
    payload: { anomalyType: 'hacked_anomaly' },
  },
  {
    id: 10,
    name: 'Forged Client Timestamp',
    collection: 'seoContentAssets',
    operation: 'create',
    expectedOutcome: 'PERMISSION_DENIED',
    payload: { createdAt: '1999-01-01T00:00:00Z' },
  },
  {
    id: 11,
    name: 'Cross-User PII Report Schedule Read Attempt',
    collection: 'seoReportSchedules',
    operation: 'get',
    expectedOutcome: 'PERMISSION_DENIED',
    payload: { authUid: 'u2', resourceOwnerId: 'u1' },
  },
  {
    id: 12,
    name: 'Unshared Profile Scrape Attempt',
    collection: 'publicProfiles',
    operation: 'list',
    expectedOutcome: 'PERMISSION_DENIED',
    payload: { authUid: 'u2', resourceOwnerId: 'u1', isPubliclyShared: false },
  },
];
