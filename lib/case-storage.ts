import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

// Data Types
export interface CaseInfo {
  id: string;
  caseNumber: string;
  docketNumber: string;
  charges: string[];
  courtName: string;
  courtAddress: string;
  judge: string;
  status: 'pending' | 'active' | 'resolved' | 'appealed';
  filingDate: string;
  notes: string;
  createdAt: string;
  updatedAt: string;
}

export interface CourtDate {
  id: string;
  caseId: string;
  title: string;
  date: string;
  time: string;
  location: string;
  type: 'arraignment' | 'pretrial' | 'hearing' | 'trial' | 'sentencing' | 'other';
  notes: string;
  reminder: boolean;
  completed: boolean;
  createdAt: string;
}

export interface LegalContact {
  id: string;
  caseId: string;
  name: string;
  role: 'attorney' | 'public_defender' | 'probation_officer' | 'bondsman' | 'paralegal' | 'other';
  phone: string;
  email: string;
  address: string;
  notes: string;
  isPrimary: boolean;
  createdAt: string;
}

export interface CaseDocument {
  id: string;
  caseId: string;
  name: string;
  type: 'court_order' | 'bail_papers' | 'police_report' | 'evidence' | 'correspondence' | 'other';
  uri: string;
  fileSize: number;
  mimeType: string;
  notes: string;
  dateAdded: string;
}

export interface CaseNote {
  id: string;
  caseId: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface CaseTodo {
  id: string;
  caseId: string;
  task: string;
  dueDate: string | null;
  completed: boolean;
  priority: 'high' | 'medium' | 'low';
  createdAt: string;
}

export interface CaseTimeline {
  id: string;
  caseId: string;
  event: string;
  date: string;
  description: string;
  type: 'court' | 'filing' | 'milestone' | 'note';
}

// Storage Keys
const STORAGE_KEYS = {
  CASES: 'mycase_cases',
  COURT_DATES: 'mycase_court_dates',
  CONTACTS: 'mycase_contacts',
  DOCUMENTS: 'mycase_documents',
  NOTES: 'mycase_notes',
  TODOS: 'mycase_todos',
  TIMELINE: 'mycase_timeline',
};

// Helper to generate unique IDs
export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

// Secure storage wrapper (uses SecureStore on native, AsyncStorage on web)
const secureSet = async (key: string, value: string): Promise<void> => {
  if (Platform.OS === 'web') {
    await AsyncStorage.setItem(key, value);
  } else {
    await SecureStore.setItemAsync(key, value);
  }
};

const secureGet = async (key: string): Promise<string | null> => {
  if (Platform.OS === 'web') {
    return await AsyncStorage.getItem(key);
  } else {
    return await SecureStore.getItemAsync(key);
  }
};

const secureDelete = async (key: string): Promise<void> => {
  if (Platform.OS === 'web') {
    await AsyncStorage.removeItem(key);
  } else {
    await SecureStore.deleteItemAsync(key);
  }
};

// Generic storage functions
async function getStoredData<T>(key: string): Promise<T[]> {
  try {
    const data = await AsyncStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error(`Error reading ${key}:`, error);
    return [];
  }
}

async function setStoredData<T>(key: string, data: T[]): Promise<void> {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(`Error writing ${key}:`, error);
    throw error;
  }
}

// Case Management
export const CaseStorage = {
  // Cases
  async getCases(): Promise<CaseInfo[]> {
    return getStoredData<CaseInfo>(STORAGE_KEYS.CASES);
  },

  async getCase(id: string): Promise<CaseInfo | null> {
    const cases = await this.getCases();
    return cases.find(c => c.id === id) || null;
  },

  async saveCase(caseInfo: Omit<CaseInfo, 'id' | 'createdAt' | 'updatedAt'>): Promise<CaseInfo> {
    const cases = await this.getCases();
    const newCase: CaseInfo = {
      ...caseInfo,
      id: generateId(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    cases.push(newCase);
    await setStoredData(STORAGE_KEYS.CASES, cases);
    return newCase;
  },

  async updateCase(id: string, updates: Partial<CaseInfo>): Promise<CaseInfo | null> {
    const cases = await this.getCases();
    const index = cases.findIndex(c => c.id === id);
    if (index === -1) return null;
    
    cases[index] = {
      ...cases[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    await setStoredData(STORAGE_KEYS.CASES, cases);
    return cases[index];
  },

  async deleteCase(id: string): Promise<void> {
    const cases = await this.getCases();
    const filtered = cases.filter(c => c.id !== id);
    await setStoredData(STORAGE_KEYS.CASES, filtered);
    
    // Also delete related data
    const courtDates = await this.getCourtDates();
    await setStoredData(STORAGE_KEYS.COURT_DATES, courtDates.filter(d => d.caseId !== id));
    
    const contacts = await this.getContacts();
    await setStoredData(STORAGE_KEYS.CONTACTS, contacts.filter(c => c.caseId !== id));
    
    const documents = await this.getDocuments();
    await setStoredData(STORAGE_KEYS.DOCUMENTS, documents.filter(d => d.caseId !== id));
    
    const notes = await this.getNotes();
    await setStoredData(STORAGE_KEYS.NOTES, notes.filter(n => n.caseId !== id));
    
    const todos = await this.getTodos();
    await setStoredData(STORAGE_KEYS.TODOS, todos.filter(t => t.caseId !== id));
  },

  // Court Dates
  async getCourtDates(caseId?: string): Promise<CourtDate[]> {
    const dates = await getStoredData<CourtDate>(STORAGE_KEYS.COURT_DATES);
    if (caseId) {
      return dates.filter(d => d.caseId === caseId);
    }
    return dates;
  },

  async saveCourtDate(courtDate: Omit<CourtDate, 'id' | 'createdAt'>): Promise<CourtDate> {
    const dates = await this.getCourtDates();
    const newDate: CourtDate = {
      ...courtDate,
      id: generateId(),
      createdAt: new Date().toISOString(),
    };
    dates.push(newDate);
    await setStoredData(STORAGE_KEYS.COURT_DATES, dates);
    return newDate;
  },

  async updateCourtDate(id: string, updates: Partial<CourtDate>): Promise<CourtDate | null> {
    const dates = await this.getCourtDates();
    const index = dates.findIndex(d => d.id === id);
    if (index === -1) return null;
    
    dates[index] = { ...dates[index], ...updates };
    await setStoredData(STORAGE_KEYS.COURT_DATES, dates);
    return dates[index];
  },

  async deleteCourtDate(id: string): Promise<void> {
    const dates = await this.getCourtDates();
    await setStoredData(STORAGE_KEYS.COURT_DATES, dates.filter(d => d.id !== id));
  },

  // Legal Contacts
  async getContacts(caseId?: string): Promise<LegalContact[]> {
    const contacts = await getStoredData<LegalContact>(STORAGE_KEYS.CONTACTS);
    if (caseId) {
      return contacts.filter(c => c.caseId === caseId);
    }
    return contacts;
  },

  async saveContact(contact: Omit<LegalContact, 'id' | 'createdAt'>): Promise<LegalContact> {
    const contacts = await this.getContacts();
    const newContact: LegalContact = {
      ...contact,
      id: generateId(),
      createdAt: new Date().toISOString(),
    };
    contacts.push(newContact);
    await setStoredData(STORAGE_KEYS.CONTACTS, contacts);
    return newContact;
  },

  async updateContact(id: string, updates: Partial<LegalContact>): Promise<LegalContact | null> {
    const contacts = await this.getContacts();
    const index = contacts.findIndex(c => c.id === id);
    if (index === -1) return null;
    
    contacts[index] = { ...contacts[index], ...updates };
    await setStoredData(STORAGE_KEYS.CONTACTS, contacts);
    return contacts[index];
  },

  async deleteContact(id: string): Promise<void> {
    const contacts = await this.getContacts();
    await setStoredData(STORAGE_KEYS.CONTACTS, contacts.filter(c => c.id !== id));
  },

  // Documents
  async getDocuments(caseId?: string): Promise<CaseDocument[]> {
    const docs = await getStoredData<CaseDocument>(STORAGE_KEYS.DOCUMENTS);
    if (caseId) {
      return docs.filter(d => d.caseId === caseId);
    }
    return docs;
  },

  async saveDocument(doc: Omit<CaseDocument, 'id' | 'dateAdded'>): Promise<CaseDocument> {
    const docs = await this.getDocuments();
    const newDoc: CaseDocument = {
      ...doc,
      id: generateId(),
      dateAdded: new Date().toISOString(),
    };
    docs.push(newDoc);
    await setStoredData(STORAGE_KEYS.DOCUMENTS, docs);
    return newDoc;
  },

  async deleteDocument(id: string): Promise<void> {
    const docs = await this.getDocuments();
    await setStoredData(STORAGE_KEYS.DOCUMENTS, docs.filter(d => d.id !== id));
  },

  // Notes
  async getNotes(caseId?: string): Promise<CaseNote[]> {
    const notes = await getStoredData<CaseNote>(STORAGE_KEYS.NOTES);
    if (caseId) {
      return notes.filter(n => n.caseId === caseId);
    }
    return notes;
  },

  async saveNote(note: Omit<CaseNote, 'id' | 'createdAt' | 'updatedAt'>): Promise<CaseNote> {
    const notes = await this.getNotes();
    const newNote: CaseNote = {
      ...note,
      id: generateId(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    notes.push(newNote);
    await setStoredData(STORAGE_KEYS.NOTES, notes);
    return newNote;
  },

  async updateNote(id: string, updates: Partial<CaseNote>): Promise<CaseNote | null> {
    const notes = await this.getNotes();
    const index = notes.findIndex(n => n.id === id);
    if (index === -1) return null;
    
    notes[index] = {
      ...notes[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    await setStoredData(STORAGE_KEYS.NOTES, notes);
    return notes[index];
  },

  async deleteNote(id: string): Promise<void> {
    const notes = await this.getNotes();
    await setStoredData(STORAGE_KEYS.NOTES, notes.filter(n => n.id !== id));
  },

  // Todos
  async getTodos(caseId?: string): Promise<CaseTodo[]> {
    const todos = await getStoredData<CaseTodo>(STORAGE_KEYS.TODOS);
    if (caseId) {
      return todos.filter(t => t.caseId === caseId);
    }
    return todos;
  },

  async saveTodo(todo: Omit<CaseTodo, 'id' | 'createdAt'>): Promise<CaseTodo> {
    const todos = await this.getTodos();
    const newTodo: CaseTodo = {
      ...todo,
      id: generateId(),
      createdAt: new Date().toISOString(),
    };
    todos.push(newTodo);
    await setStoredData(STORAGE_KEYS.TODOS, todos);
    return newTodo;
  },

  async updateTodo(id: string, updates: Partial<CaseTodo>): Promise<CaseTodo | null> {
    const todos = await this.getTodos();
    const index = todos.findIndex(t => t.id === id);
    if (index === -1) return null;
    
    todos[index] = { ...todos[index], ...updates };
    await setStoredData(STORAGE_KEYS.TODOS, todos);
    return todos[index];
  },

  async deleteTodo(id: string): Promise<void> {
    const todos = await this.getTodos();
    await setStoredData(STORAGE_KEYS.TODOS, todos.filter(t => t.id !== id));
  },

  // Utility functions
  async getUpcomingCourtDates(limit: number = 5): Promise<CourtDate[]> {
    const dates = await this.getCourtDates();
    const now = new Date();
    return dates
      .filter(d => new Date(d.date) >= now && !d.completed)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .slice(0, limit);
  },

  async getPendingTodos(limit: number = 10): Promise<CaseTodo[]> {
    const todos = await this.getTodos();
    return todos
      .filter(t => !t.completed)
      .sort((a, b) => {
        // Sort by priority first, then by due date
        const priorityOrder = { high: 0, medium: 1, low: 2 };
        if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
          return priorityOrder[a.priority] - priorityOrder[b.priority];
        }
        if (a.dueDate && b.dueDate) {
          return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
        }
        return a.dueDate ? -1 : 1;
      })
      .slice(0, limit);
  },

  // Clear all data (for testing or reset)
  async clearAllData(): Promise<void> {
    await Promise.all([
      AsyncStorage.removeItem(STORAGE_KEYS.CASES),
      AsyncStorage.removeItem(STORAGE_KEYS.COURT_DATES),
      AsyncStorage.removeItem(STORAGE_KEYS.CONTACTS),
      AsyncStorage.removeItem(STORAGE_KEYS.DOCUMENTS),
      AsyncStorage.removeItem(STORAGE_KEYS.NOTES),
      AsyncStorage.removeItem(STORAGE_KEYS.TODOS),
      AsyncStorage.removeItem(STORAGE_KEYS.TIMELINE),
    ]);
  },
};

export default CaseStorage;
