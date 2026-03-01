import { describe, it, expect, beforeEach, vi } from 'vitest';

// Mock AsyncStorage
const mockStorage: Record<string, string> = {};
vi.mock('@react-native-async-storage/async-storage', () => ({
  default: {
    getItem: vi.fn((key: string) => Promise.resolve(mockStorage[key] || null)),
    setItem: vi.fn((key: string, value: string) => {
      mockStorage[key] = value;
      return Promise.resolve();
    }),
    removeItem: vi.fn((key: string) => {
      delete mockStorage[key];
      return Promise.resolve();
    }),
  },
}));

// Mock expo-secure-store
vi.mock('expo-secure-store', () => ({
  setItemAsync: vi.fn(),
  getItemAsync: vi.fn(),
  deleteItemAsync: vi.fn(),
}));

// Mock Platform
vi.mock('react-native', () => ({
  Platform: { OS: 'web' },
}));

import { CaseStorage, generateId, CaseInfo, CourtDate, LegalContact } from '../case-storage';

describe('CaseStorage', () => {
  beforeEach(() => {
    // Clear mock storage before each test
    Object.keys(mockStorage).forEach(key => delete mockStorage[key]);
  });

  describe('generateId', () => {
    it('should generate unique IDs', () => {
      const id1 = generateId();
      const id2 = generateId();
      expect(id1).toBeTruthy();
      expect(id2).toBeTruthy();
      expect(id1).not.toBe(id2);
    });

    it('should generate string IDs', () => {
      const id = generateId();
      expect(typeof id).toBe('string');
      expect(id.length).toBeGreaterThan(0);
    });
  });

  describe('Cases', () => {
    it('should return empty array when no cases exist', async () => {
      const cases = await CaseStorage.getCases();
      expect(cases).toEqual([]);
    });

    it('should save a new case', async () => {
      const caseData = {
        caseNumber: '2024-CR-12345',
        docketNumber: 'CP-51-CR-0012345-2024',
        charges: ['Theft', 'Possession'],
        courtName: 'Philadelphia Court of Common Pleas',
        courtAddress: '1301 Filbert St, Philadelphia, PA',
        judge: 'Hon. John Smith',
        status: 'pending' as const,
        filingDate: '01/15/2024',
        notes: 'Test case',
      };

      const savedCase = await CaseStorage.saveCase(caseData);
      
      expect(savedCase.id).toBeTruthy();
      expect(savedCase.caseNumber).toBe('2024-CR-12345');
      expect(savedCase.charges).toEqual(['Theft', 'Possession']);
      expect(savedCase.createdAt).toBeTruthy();
      expect(savedCase.updatedAt).toBeTruthy();
    });

    it('should retrieve saved cases', async () => {
      await CaseStorage.saveCase({
        caseNumber: 'CASE-001',
        docketNumber: '',
        charges: [],
        courtName: '',
        courtAddress: '',
        judge: '',
        status: 'active',
        filingDate: '',
        notes: '',
      });

      const cases = await CaseStorage.getCases();
      expect(cases.length).toBe(1);
      expect(cases[0].caseNumber).toBe('CASE-001');
    });

    it('should update an existing case', async () => {
      const savedCase = await CaseStorage.saveCase({
        caseNumber: 'CASE-002',
        docketNumber: '',
        charges: [],
        courtName: '',
        courtAddress: '',
        judge: '',
        status: 'pending',
        filingDate: '',
        notes: '',
      });

      const updatedCase = await CaseStorage.updateCase(savedCase.id, {
        status: 'resolved',
        notes: 'Case resolved',
      });

      expect(updatedCase).toBeTruthy();
      expect(updatedCase!.status).toBe('resolved');
      expect(updatedCase!.notes).toBe('Case resolved');
    });

    it('should return null when updating non-existent case', async () => {
      const result = await CaseStorage.updateCase('non-existent-id', { status: 'resolved' });
      expect(result).toBeNull();
    });

    it('should delete a case', async () => {
      const savedCase = await CaseStorage.saveCase({
        caseNumber: 'CASE-003',
        docketNumber: '',
        charges: [],
        courtName: '',
        courtAddress: '',
        judge: '',
        status: 'pending',
        filingDate: '',
        notes: '',
      });

      await CaseStorage.deleteCase(savedCase.id);
      const cases = await CaseStorage.getCases();
      expect(cases.length).toBe(0);
    });
  });

  describe('Court Dates', () => {
    it('should save and retrieve court dates', async () => {
      const courtDate = await CaseStorage.saveCourtDate({
        caseId: 'case-123',
        title: 'Preliminary Hearing',
        date: '2024-02-15',
        time: '9:00 AM',
        location: 'Courtroom 302',
        type: 'hearing',
        notes: '',
        reminder: true,
        completed: false,
      });

      expect(courtDate.id).toBeTruthy();
      expect(courtDate.title).toBe('Preliminary Hearing');

      const dates = await CaseStorage.getCourtDates();
      expect(dates.length).toBe(1);
    });

    it('should filter court dates by case ID', async () => {
      await CaseStorage.saveCourtDate({
        caseId: 'case-A',
        title: 'Hearing A',
        date: '2024-02-15',
        time: '9:00 AM',
        location: '',
        type: 'hearing',
        notes: '',
        reminder: true,
        completed: false,
      });

      await CaseStorage.saveCourtDate({
        caseId: 'case-B',
        title: 'Hearing B',
        date: '2024-02-16',
        time: '10:00 AM',
        location: '',
        type: 'trial',
        notes: '',
        reminder: true,
        completed: false,
      });

      const datesA = await CaseStorage.getCourtDates('case-A');
      expect(datesA.length).toBe(1);
      expect(datesA[0].title).toBe('Hearing A');
    });
  });

  describe('Legal Contacts', () => {
    it('should save and retrieve contacts', async () => {
      const contact = await CaseStorage.saveContact({
        caseId: 'case-123',
        name: 'John Smith, Esq.',
        role: 'attorney',
        phone: '(215) 555-1234',
        email: 'john@lawfirm.com',
        address: '123 Main St',
        notes: '',
        isPrimary: true,
      });

      expect(contact.id).toBeTruthy();
      expect(contact.name).toBe('John Smith, Esq.');
      expect(contact.role).toBe('attorney');

      const contacts = await CaseStorage.getContacts();
      expect(contacts.length).toBe(1);
    });

    it('should update a contact', async () => {
      const contact = await CaseStorage.saveContact({
        caseId: 'case-123',
        name: 'Jane Doe',
        role: 'public_defender',
        phone: '',
        email: '',
        address: '',
        notes: '',
        isPrimary: false,
      });

      const updated = await CaseStorage.updateContact(contact.id, {
        phone: '(215) 555-9999',
        isPrimary: true,
      });

      expect(updated!.phone).toBe('(215) 555-9999');
      expect(updated!.isPrimary).toBe(true);
    });
  });

  describe('Todos', () => {
    it('should save and retrieve todos', async () => {
      const todo = await CaseStorage.saveTodo({
        caseId: 'case-123',
        task: 'Gather character references',
        dueDate: '2024-02-20',
        completed: false,
        priority: 'high',
      });

      expect(todo.id).toBeTruthy();
      expect(todo.task).toBe('Gather character references');
      expect(todo.priority).toBe('high');

      const todos = await CaseStorage.getTodos();
      expect(todos.length).toBe(1);
    });

    it('should update todo completion status', async () => {
      const todo = await CaseStorage.saveTodo({
        caseId: 'case-123',
        task: 'File motion',
        dueDate: null,
        completed: false,
        priority: 'medium',
      });

      const updated = await CaseStorage.updateTodo(todo.id, { completed: true });
      expect(updated!.completed).toBe(true);
    });
  });

  describe('Utility Functions', () => {
    it('should get upcoming court dates sorted by date', async () => {
      // Add dates in random order
      await CaseStorage.saveCourtDate({
        caseId: 'case-1',
        title: 'Future Date 2',
        date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days from now
        time: '9:00 AM',
        location: '',
        type: 'hearing',
        notes: '',
        reminder: true,
        completed: false,
      });

      await CaseStorage.saveCourtDate({
        caseId: 'case-1',
        title: 'Future Date 1',
        date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days from now
        time: '10:00 AM',
        location: '',
        type: 'trial',
        notes: '',
        reminder: true,
        completed: false,
      });

      const upcoming = await CaseStorage.getUpcomingCourtDates(5);
      expect(upcoming.length).toBe(2);
      expect(upcoming[0].title).toBe('Future Date 1'); // Closer date first
    });

    it('should get pending todos sorted by priority', async () => {
      await CaseStorage.saveTodo({
        caseId: 'case-1',
        task: 'Low priority task',
        dueDate: null,
        completed: false,
        priority: 'low',
      });

      await CaseStorage.saveTodo({
        caseId: 'case-1',
        task: 'High priority task',
        dueDate: null,
        completed: false,
        priority: 'high',
      });

      await CaseStorage.saveTodo({
        caseId: 'case-1',
        task: 'Medium priority task',
        dueDate: null,
        completed: false,
        priority: 'medium',
      });

      const pending = await CaseStorage.getPendingTodos(10);
      expect(pending.length).toBe(3);
      expect(pending[0].priority).toBe('high');
      expect(pending[1].priority).toBe('medium');
      expect(pending[2].priority).toBe('low');
    });
  });
});
