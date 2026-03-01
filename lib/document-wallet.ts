import AsyncStorage from '@react-native-async-storage/async-storage';

// ============================================================================
// TYPES
// ============================================================================

export type DocumentCategory =
  | 'affidavit'
  | 'docket'
  | 'disposition'
  | 'probation'
  | 'expungement'
  | 'other';

export interface WalletDocument {
  id: string;
  title: string;
  category: DocumentCategory;
  description: string;
  caseNumber?: string;
  dateIssued?: string;
  notes?: string;
  isPinned: boolean;
  createdAt: string;
  updatedAt: string;
}

// ============================================================================
// CONSTANTS
// ============================================================================

const STORAGE_KEY = 'document_wallet';
const PROFILE_KEY = 'user_profile';

export const DOCUMENT_CATEGORIES: { id: DocumentCategory; label: string; icon: string; description: string }[] = [
  { id: 'affidavit', label: 'Affidavit', icon: 'doc.text.fill', description: 'Sworn written statements' },
  { id: 'docket', label: 'Docket', icon: 'list.bullet.clipboard', description: 'Court case records' },
  { id: 'disposition', label: 'Disposition', icon: 'checkmark.seal', description: 'Case outcomes & judgments' },
  { id: 'probation', label: 'Probation', icon: 'person.badge.clock', description: 'Probation/parole documents' },
  { id: 'expungement', label: 'Expungement', icon: 'checkmark.shield.fill', description: 'Record clearing documents' },
  { id: 'other', label: 'Other', icon: 'folder.fill', description: 'Other legal documents' },
];

// ============================================================================
// HELPERS
// ============================================================================

const generateId = (): string =>
  Date.now().toString(36) + Math.random().toString(36).substring(2);

async function getAll(): Promise<WalletDocument[]> {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as WalletDocument[]) : [];
  } catch {
    return [];
  }
}

async function saveAll(docs: WalletDocument[]): Promise<void> {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(docs));
}

// ============================================================================
// PUBLIC API
// ============================================================================

export const DocumentWallet = {
  async getDocuments(category?: DocumentCategory): Promise<WalletDocument[]> {
    const docs = await getAll();
    if (category) return docs.filter((d) => d.category === category);
    return docs;
  },

  async getDocument(id: string): Promise<WalletDocument | null> {
    const docs = await getAll();
    return docs.find((d) => d.id === id) ?? null;
  },

  async addDocument(
    data: Omit<WalletDocument, 'id' | 'createdAt' | 'updatedAt'>
  ): Promise<WalletDocument> {
    const docs = await getAll();
    const now = new Date().toISOString();
    const newDoc: WalletDocument = { ...data, id: generateId(), createdAt: now, updatedAt: now };
    docs.push(newDoc);
    await saveAll(docs);
    return newDoc;
  },

  async updateDocument(id: string, updates: Partial<WalletDocument>): Promise<WalletDocument | null> {
    const docs = await getAll();
    const idx = docs.findIndex((d) => d.id === id);
    if (idx === -1) return null;
    docs[idx] = { ...docs[idx], ...updates, updatedAt: new Date().toISOString() };
    await saveAll(docs);
    return docs[idx];
  },

  async deleteDocument(id: string): Promise<void> {
    const docs = await getAll();
    await saveAll(docs.filter((d) => d.id !== id));
  },

  async pinAffidavit(id: string): Promise<void> {
    const docs = await getAll();
    // Unpin all affidavits first, then pin the selected one
    const updated = docs.map((d) =>
      d.category === 'affidavit' ? { ...d, isPinned: d.id === id, updatedAt: new Date().toISOString() } : d
    );
    await saveAll(updated);
  },

  async unpinAffidavit(): Promise<void> {
    const docs = await getAll();
    const updated = docs.map((d) =>
      d.isPinned ? { ...d, isPinned: false, updatedAt: new Date().toISOString() } : d
    );
    await saveAll(updated);
  },

  async getPinnedAffidavit(): Promise<WalletDocument | null> {
    const docs = await getAll();
    return docs.find((d) => d.category === 'affidavit' && d.isPinned) ?? null;
  },

  async getCounts(): Promise<{ total: number; byCategory: Record<DocumentCategory, number> }> {
    const docs = await getAll();
    const byCategory = DOCUMENT_CATEGORIES.reduce(
      (acc, c) => ({ ...acc, [c.id]: 0 }),
      {} as Record<DocumentCategory, number>
    );
    docs.forEach((d) => {
      byCategory[d.category] = (byCategory[d.category] ?? 0) + 1;
    });
    return { total: docs.length, byCategory };
  },
};

// ============================================================================
// USER PROFILE
// ============================================================================

export interface UserProfile {
  name: string;
  allowAnalytics: boolean;
  allowNotifications: boolean;
  darkModeOverride: 'system' | 'dark' | 'light';
}

const DEFAULT_PROFILE: UserProfile = {
  name: '',
  allowAnalytics: false,
  allowNotifications: true,
  darkModeOverride: 'system',
};

export const ProfileStorage = {
  async get(): Promise<UserProfile> {
    try {
      const raw = await AsyncStorage.getItem(PROFILE_KEY);
      return raw ? { ...DEFAULT_PROFILE, ...(JSON.parse(raw) as Partial<UserProfile>) } : DEFAULT_PROFILE;
    } catch {
      return DEFAULT_PROFILE;
    }
  },

  async update(updates: Partial<UserProfile>): Promise<UserProfile> {
    const current = await this.get();
    const updated = { ...current, ...updates };
    await AsyncStorage.setItem(PROFILE_KEY, JSON.stringify(updated));
    return updated;
  },
};
