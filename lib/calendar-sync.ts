import * as Calendar from 'expo-calendar';
import { Platform, Alert, Linking } from 'react-native';
import { CourtDate } from './case-storage';

export interface CalendarSyncResult {
  success: boolean;
  eventId?: string;
  error?: string;
}

/**
 * Request calendar permissions from the user
 */
export async function requestCalendarPermissions(): Promise<boolean> {
  if (Platform.OS === 'web') {
    // Web doesn't support native calendar - we'll use .ics download instead
    return true;
  }

  const { status } = await Calendar.requestCalendarPermissionsAsync();
  
  if (status !== 'granted') {
    Alert.alert(
      'Calendar Permission Required',
      'To add court dates to your calendar, please grant calendar access in your device settings.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Open Settings', onPress: () => Linking.openSettings() },
      ]
    );
    return false;
  }
  
  return true;
}

/**
 * Get the default calendar for the device
 */
async function getDefaultCalendar(): Promise<string | null> {
  if (Platform.OS === 'web') {
    return null;
  }

  const calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);
  
  // Try to find the default calendar
  const defaultCalendar = calendars.find(cal => {
    if (Platform.OS === 'ios') {
      return cal.allowsModifications && cal.source?.name === 'Default';
    }
    // Android: look for primary calendar
    return cal.isPrimary || cal.accessLevel === Calendar.CalendarAccessLevel.OWNER;
  });

  if (defaultCalendar) {
    return defaultCalendar.id;
  }

  // Fallback to first writable calendar
  const writableCalendar = calendars.find(cal => cal.allowsModifications);
  return writableCalendar?.id || null;
}

/**
 * Create a new calendar specifically for court dates (if needed)
 */
async function getOrCreateCourtCalendar(): Promise<string | null> {
  if (Platform.OS === 'web') {
    return null;
  }

  const calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);
  
  // Check if we already have a court dates calendar
  const existingCalendar = calendars.find(cal => cal.title === 'Court Dates');
  if (existingCalendar) {
    return existingCalendar.id;
  }

  // Try to use default calendar instead of creating a new one
  return getDefaultCalendar();
}

/**
 * Parse date string to Date object
 */
function parseCourtDate(dateStr: string, timeStr: string): Date {
  // Handle various date formats
  let date: Date;
  
  // Try ISO format first
  if (dateStr.includes('T')) {
    date = new Date(dateStr);
  } else if (dateStr.includes('/')) {
    // MM/DD/YYYY format
    const [month, day, year] = dateStr.split('/').map(Number);
    date = new Date(year, month - 1, day);
  } else if (dateStr.includes('-')) {
    // YYYY-MM-DD format
    date = new Date(dateStr);
  } else {
    date = new Date(dateStr);
  }

  // Parse time if provided
  if (timeStr && timeStr !== 'TBD') {
    const timeMatch = timeStr.match(/(\d{1,2}):(\d{2})\s*(AM|PM)?/i);
    if (timeMatch) {
      let hours = parseInt(timeMatch[1], 10);
      const minutes = parseInt(timeMatch[2], 10);
      const period = timeMatch[3]?.toUpperCase();
      
      if (period === 'PM' && hours !== 12) {
        hours += 12;
      } else if (period === 'AM' && hours === 12) {
        hours = 0;
      }
      
      date.setHours(hours, minutes, 0, 0);
    }
  } else {
    // Default to 9 AM if no time specified
    date.setHours(9, 0, 0, 0);
  }

  return date;
}

/**
 * Add a court date to the device calendar
 */
export async function addCourtDateToCalendar(courtDate: CourtDate): Promise<CalendarSyncResult> {
  try {
    // Check permissions
    const hasPermission = await requestCalendarPermissions();
    if (!hasPermission) {
      return { success: false, error: 'Calendar permission denied' };
    }

    // Web fallback - generate .ics file for download
    if (Platform.OS === 'web') {
      return generateICSFile(courtDate);
    }

    // Get calendar
    const calendarId = await getOrCreateCourtCalendar();
    if (!calendarId) {
      return { success: false, error: 'No writable calendar found' };
    }

    // Parse date and time
    const startDate = parseCourtDate(courtDate.date, courtDate.time);
    const endDate = new Date(startDate.getTime() + 2 * 60 * 60 * 1000); // 2 hour duration

    // Create event details
    const eventDetails: Partial<Calendar.Event> = {
      title: `⚖️ ${courtDate.title}`,
      startDate,
      endDate,
      location: courtDate.location || '',
      notes: `Court Date Type: ${getCourtTypeLabel(courtDate.type)}\n\n${courtDate.notes || ''}\n\nAdded from Civilian Law of Knowledge app`,
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      alarms: [
        { relativeOffset: -1440 }, // 1 day before (in minutes)
        { relativeOffset: -60 },   // 1 hour before
        { relativeOffset: -15 },   // 15 minutes before
      ],
    };

    // Create the event
    const eventId = await Calendar.createEventAsync(calendarId, eventDetails);

    return { success: true, eventId };
  } catch (error) {
    console.error('Error adding to calendar:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to add to calendar' 
    };
  }
}

/**
 * Generate an .ics file for web download
 */
function generateICSFile(courtDate: CourtDate): CalendarSyncResult {
  try {
    const startDate = parseCourtDate(courtDate.date, courtDate.time);
    const endDate = new Date(startDate.getTime() + 2 * 60 * 60 * 1000);

    const formatICSDate = (date: Date): string => {
      return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    };

    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Civilian Law of Knowledge//Court Date//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'BEGIN:VEVENT',
      `DTSTART:${formatICSDate(startDate)}`,
      `DTEND:${formatICSDate(endDate)}`,
      `SUMMARY:⚖️ ${courtDate.title}`,
      `LOCATION:${courtDate.location || ''}`,
      `DESCRIPTION:Court Date Type: ${getCourtTypeLabel(courtDate.type)}\\n${courtDate.notes || ''}\\nAdded from Civilian Law of Knowledge app`,
      'BEGIN:VALARM',
      'TRIGGER:-P1D',
      'ACTION:DISPLAY',
      'DESCRIPTION:Court date tomorrow',
      'END:VALARM',
      'BEGIN:VALARM',
      'TRIGGER:-PT1H',
      'ACTION:DISPLAY',
      'DESCRIPTION:Court date in 1 hour',
      'END:VALARM',
      `UID:${courtDate.id}@civilianlaw.app`,
      `DTSTAMP:${formatICSDate(new Date())}`,
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    // Create blob and download
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `court-date-${courtDate.id}.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    return { success: true };
  } catch (error) {
    console.error('Error generating ICS file:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to generate calendar file' 
    };
  }
}

/**
 * Get human-readable court type label
 */
function getCourtTypeLabel(type: CourtDate['type']): string {
  const labels: Record<CourtDate['type'], string> = {
    arraignment: 'Arraignment',
    pretrial: 'Pre-Trial Conference',
    hearing: 'Hearing',
    trial: 'Trial',
    sentencing: 'Sentencing',
    other: 'Court Appearance',
  };
  return labels[type] || 'Court Date';
}

/**
 * Check if calendar sync is available on this platform
 */
export function isCalendarSyncAvailable(): boolean {
  return true; // Available on all platforms (native calendar on mobile, .ics download on web)
}

/**
 * Remove a court date from the calendar
 */
export async function removeCourtDateFromCalendar(eventId: string): Promise<boolean> {
  if (Platform.OS === 'web') {
    return true; // Can't remove from web
  }

  try {
    await Calendar.deleteEventAsync(eventId);
    return true;
  } catch (error) {
    console.error('Error removing from calendar:', error);
    return false;
  }
}

export default {
  requestCalendarPermissions,
  addCourtDateToCalendar,
  removeCourtDateFromCalendar,
  isCalendarSyncAvailable,
};
