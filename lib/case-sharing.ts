import AsyncStorage from '@react-native-async-storage/async-storage';
import { CaseInfo, CourtDate, LegalContact, CaseTodo } from './case-storage';

// Storage key for shared data
const SHARED_CASES_KEY = '@shared_cases';

// Share options interface
export interface ShareOptions {
  includeBasicInfo: boolean;
  includeCourtDates: boolean;
  includeContacts: boolean;
  includeTodos: boolean;
  includeNotes: boolean;
  expiresIn: '1hour' | '24hours' | '7days' | '30days';
}

// Shared case data structure
export interface SharedCaseData {
  id: string;
  createdAt: string;
  expiresAt: string;
  sharedBy: string;
  caseInfo?: Partial<CaseInfo>;
  courtDates?: CourtDate[];
  contacts?: LegalContact[];
  todos?: CaseTodo[];
}

// Stored share record
interface ShareRecord {
  id: string;
  caseId: string;
  createdAt: string;
  expiresAt: string;
  data: string; // Base64 encoded JSON
}

/**
 * Generate a unique share ID
 */
function generateShareId(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // Removed similar looking chars
  let result = '';
  for (let i = 0; i < 8; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

/**
 * Calculate expiration date based on option
 */
function calculateExpiration(expiresIn: ShareOptions['expiresIn']): Date {
  const now = new Date();
  switch (expiresIn) {
    case '1hour':
      return new Date(now.getTime() + 60 * 60 * 1000);
    case '24hours':
      return new Date(now.getTime() + 24 * 60 * 60 * 1000);
    case '7days':
      return new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
    case '30days':
      return new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
    default:
      return new Date(now.getTime() + 24 * 60 * 60 * 1000);
  }
}

/**
 * Simple encoding to make data less readable (not true encryption)
 * For a production app, you'd use proper encryption
 */
function encodeData(data: object): string {
  const json = JSON.stringify(data);
  return btoa(encodeURIComponent(json));
}

/**
 * Decode the encoded data
 */
function decodeData(encoded: string): object | null {
  try {
    const json = decodeURIComponent(atob(encoded));
    return JSON.parse(json);
  } catch {
    return null;
  }
}

/**
 * Get all share records
 */
async function getShareRecords(): Promise<ShareRecord[]> {
  try {
    const stored = await AsyncStorage.getItem(SHARED_CASES_KEY);
    if (stored) {
      const records: ShareRecord[] = JSON.parse(stored);
      // Filter out expired records
      const now = new Date();
      return records.filter(r => new Date(r.expiresAt) > now);
    }
  } catch (error) {
    console.error('Error loading share records:', error);
  }
  return [];
}

/**
 * Save share records
 */
async function saveShareRecords(records: ShareRecord[]): Promise<void> {
  try {
    await AsyncStorage.setItem(SHARED_CASES_KEY, JSON.stringify(records));
  } catch (error) {
    console.error('Error saving share records:', error);
  }
}

/**
 * Create a shareable case package
 */
export async function createShareableCase(
  caseInfo: CaseInfo,
  courtDates: CourtDate[],
  contacts: LegalContact[],
  todos: CaseTodo[],
  options: ShareOptions,
  sharedByName: string = 'Case Owner'
): Promise<{ shareId: string; qrData: string; expiresAt: Date }> {
  const shareId = generateShareId();
  const expiresAt = calculateExpiration(options.expiresIn);

  // Build shared data based on options
  const sharedData: SharedCaseData = {
    id: shareId,
    createdAt: new Date().toISOString(),
    expiresAt: expiresAt.toISOString(),
    sharedBy: sharedByName,
  };

  if (options.includeBasicInfo) {
    sharedData.caseInfo = {
      caseNumber: caseInfo.caseNumber,
      docketNumber: caseInfo.docketNumber,
      courtName: caseInfo.courtName,
      charges: caseInfo.charges,
      status: caseInfo.status,
      ...(options.includeNotes && { notes: caseInfo.notes }),
    };
  }

  if (options.includeCourtDates) {
    sharedData.courtDates = courtDates.filter(d => d.caseId === caseInfo.id);
  }

  if (options.includeContacts) {
    sharedData.contacts = contacts.filter(c => c.caseId === caseInfo.id);
  }

  if (options.includeTodos) {
    sharedData.todos = todos.filter(t => t.caseId === caseInfo.id);
  }

  // Encode the data
  const encodedData = encodeData(sharedData);

  // Create QR data string (includes share ID for lookup and encoded data)
  const qrData = JSON.stringify({
    type: 'CLK_CASE_SHARE',
    version: 1,
    id: shareId,
    data: encodedData,
  });

  // Store the share record locally
  const records = await getShareRecords();
  records.push({
    id: shareId,
    caseId: caseInfo.id,
    createdAt: new Date().toISOString(),
    expiresAt: expiresAt.toISOString(),
    data: encodedData,
  });
  await saveShareRecords(records);

  return { shareId, qrData, expiresAt };
}

/**
 * Parse QR code data and extract shared case info
 */
export function parseSharedCaseData(qrData: string): SharedCaseData | null {
  try {
    const parsed = JSON.parse(qrData);
    
    if (parsed.type !== 'CLK_CASE_SHARE' || !parsed.data) {
      return null;
    }

    const decoded = decodeData(parsed.data) as SharedCaseData;
    
    if (!decoded || !decoded.id || !decoded.expiresAt) {
      return null;
    }

    // Check if expired
    if (new Date(decoded.expiresAt) < new Date()) {
      return null;
    }

    return decoded;
  } catch {
    return null;
  }
}

/**
 * Get active shares for a case
 */
export async function getActiveSharesForCase(caseId: string): Promise<ShareRecord[]> {
  const records = await getShareRecords();
  return records.filter(r => r.caseId === caseId);
}

/**
 * Revoke a share
 */
export async function revokeShare(shareId: string): Promise<void> {
  const records = await getShareRecords();
  const filtered = records.filter(r => r.id !== shareId);
  await saveShareRecords(filtered);
}

/**
 * Revoke all shares for a case
 */
export async function revokeAllSharesForCase(caseId: string): Promise<void> {
  const records = await getShareRecords();
  const filtered = records.filter(r => r.caseId !== caseId);
  await saveShareRecords(filtered);
}

/**
 * Get expiration label
 */
export function getExpirationLabel(expiresIn: ShareOptions['expiresIn']): string {
  switch (expiresIn) {
    case '1hour': return '1 Hour';
    case '24hours': return '24 Hours';
    case '7days': return '7 Days';
    case '30days': return '30 Days';
    default: return '24 Hours';
  }
}

/**
 * Format remaining time until expiration
 */
export function formatTimeRemaining(expiresAt: string): string {
  const now = new Date();
  const expires = new Date(expiresAt);
  const diff = expires.getTime() - now.getTime();

  if (diff <= 0) {
    return 'Expired';
  }

  const hours = Math.floor(diff / (60 * 60 * 1000));
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return `${days} day${days > 1 ? 's' : ''} remaining`;
  } else if (hours > 0) {
    return `${hours} hour${hours > 1 ? 's' : ''} remaining`;
  } else {
    const minutes = Math.floor(diff / (60 * 1000));
    return `${minutes} minute${minutes > 1 ? 's' : ''} remaining`;
  }
}

export default {
  createShareableCase,
  parseSharedCaseData,
  getActiveSharesForCase,
  revokeShare,
  revokeAllSharesForCase,
  getExpirationLabel,
  formatTimeRemaining,
};
