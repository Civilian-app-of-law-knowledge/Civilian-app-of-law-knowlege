import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock expo-calendar
vi.mock('expo-calendar', () => ({
  requestCalendarPermissionsAsync: vi.fn(() => Promise.resolve({ status: 'granted' })),
  getCalendarsAsync: vi.fn(() => Promise.resolve([
    { id: 'cal-1', title: 'Personal', allowsModifications: true, isPrimary: true }
  ])),
  createEventAsync: vi.fn(() => Promise.resolve('event-123')),
  deleteEventAsync: vi.fn(() => Promise.resolve()),
  EntityTypes: { EVENT: 'event' },
  CalendarAccessLevel: { OWNER: 'owner' },
}));

// Mock react-native
vi.mock('react-native', () => ({
  Platform: { OS: 'ios' },
  Alert: { alert: vi.fn() },
  Linking: { openSettings: vi.fn() },
}));

import { 
  requestCalendarPermissions, 
  addCourtDateToCalendar, 
  removeCourtDateFromCalendar,
  isCalendarSyncAvailable 
} from '../calendar-sync';
import { CourtDate } from '../case-storage';

describe('Calendar Sync', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('isCalendarSyncAvailable', () => {
    it('should return true (available on all platforms)', () => {
      expect(isCalendarSyncAvailable()).toBe(true);
    });
  });

  describe('requestCalendarPermissions', () => {
    it('should return true when permission is granted', async () => {
      const result = await requestCalendarPermissions();
      expect(result).toBe(true);
    });
  });

  describe('addCourtDateToCalendar', () => {
    const mockCourtDate: CourtDate = {
      id: 'date-123',
      caseId: 'case-456',
      title: 'Preliminary Hearing',
      date: '2024-02-15',
      time: '9:00 AM',
      location: 'Courtroom 302, Criminal Justice Center',
      type: 'hearing',
      notes: 'Bring all documents',
      reminder: true,
      completed: false,
      createdAt: '2024-01-15T10:00:00Z',
    };

    it('should successfully add court date to calendar', async () => {
      const result = await addCourtDateToCalendar(mockCourtDate);
      expect(result.success).toBe(true);
      expect(result.eventId).toBe('event-123');
    });

    it('should handle court date with TBD time', async () => {
      const dateWithTBD = { ...mockCourtDate, time: 'TBD' };
      const result = await addCourtDateToCalendar(dateWithTBD);
      expect(result.success).toBe(true);
    });

    it('should handle court date with MM/DD/YYYY format', async () => {
      const dateWithSlash = { ...mockCourtDate, date: '02/15/2024' };
      const result = await addCourtDateToCalendar(dateWithSlash);
      expect(result.success).toBe(true);
    });

    it('should handle court date with PM time', async () => {
      const dateWithPM = { ...mockCourtDate, time: '2:30 PM' };
      const result = await addCourtDateToCalendar(dateWithPM);
      expect(result.success).toBe(true);
    });
  });

  describe('removeCourtDateFromCalendar', () => {
    it('should successfully remove event from calendar', async () => {
      const result = await removeCourtDateFromCalendar('event-123');
      expect(result).toBe(true);
    });
  });

  describe('Court date type labels', () => {
    const courtTypes: CourtDate['type'][] = ['arraignment', 'pretrial', 'hearing', 'trial', 'sentencing', 'other'];
    
    courtTypes.forEach(type => {
      it(`should handle ${type} court type`, async () => {
        const mockDate: CourtDate = {
          id: 'date-123',
          caseId: 'case-456',
          title: `Test ${type}`,
          date: '2024-02-15',
          time: '9:00 AM',
          location: 'Courtroom 302',
          type,
          notes: '',
          reminder: true,
          completed: false,
          createdAt: '2024-01-15T10:00:00Z',
        };
        
        const result = await addCourtDateToCalendar(mockDate);
        expect(result.success).toBe(true);
      });
    });
  });
});
