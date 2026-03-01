import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CourtDate, CaseTodo } from './case-storage';

// Storage keys
const NOTIFICATION_SETTINGS_KEY = '@notification_settings';
const SCHEDULED_NOTIFICATIONS_KEY = '@scheduled_notifications';

// Notification settings interface
export interface NotificationSettings {
  enabled: boolean;
  courtDateReminders: boolean;
  taskReminders: boolean;
  reminderTimes: {
    oneDay: boolean;
    oneHour: boolean;
    fifteenMinutes: boolean;
  };
  quietHoursEnabled: boolean;
  quietHoursStart: string; // "22:00"
  quietHoursEnd: string;   // "07:00"
}

// Default settings
const DEFAULT_SETTINGS: NotificationSettings = {
  enabled: true,
  courtDateReminders: true,
  taskReminders: true,
  reminderTimes: {
    oneDay: true,
    oneHour: true,
    fifteenMinutes: true,
  },
  quietHoursEnabled: false,
  quietHoursStart: '22:00',
  quietHoursEnd: '07:00',
};

// Scheduled notification tracking
interface ScheduledNotification {
  id: string;
  notificationId: string;
  type: 'court_date' | 'task';
  referenceId: string;
  scheduledFor: string;
}

/**
 * Configure notification handler
 */
export function configureNotifications() {
  // Set notification handler for foreground notifications
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
      shouldShowBanner: true,
      shouldShowList: true,
    }),
  });
}

/**
 * Request notification permissions
 */
export async function requestNotificationPermissions(): Promise<boolean> {
  if (Platform.OS === 'web') {
    // Web notifications require different handling
    if ('Notification' in window) {
      const permission = await Notification.requestPermission();
      return permission === 'granted';
    }
    return false;
  }

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== 'granted') {
    return false;
  }

  // Configure Android channel
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('court-dates', {
      name: 'Court Date Reminders',
      importance: Notifications.AndroidImportance.HIGH,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#C9A227',
      sound: 'default',
    });

    await Notifications.setNotificationChannelAsync('tasks', {
      name: 'Task Reminders',
      importance: Notifications.AndroidImportance.DEFAULT,
      sound: 'default',
    });
  }

  return true;
}

/**
 * Get notification settings
 */
export async function getNotificationSettings(): Promise<NotificationSettings> {
  try {
    const stored = await AsyncStorage.getItem(NOTIFICATION_SETTINGS_KEY);
    if (stored) {
      return { ...DEFAULT_SETTINGS, ...JSON.parse(stored) };
    }
  } catch (error) {
    console.error('Error loading notification settings:', error);
  }
  return DEFAULT_SETTINGS;
}

/**
 * Save notification settings
 */
export async function saveNotificationSettings(settings: NotificationSettings): Promise<void> {
  try {
    await AsyncStorage.setItem(NOTIFICATION_SETTINGS_KEY, JSON.stringify(settings));
  } catch (error) {
    console.error('Error saving notification settings:', error);
  }
}

/**
 * Get scheduled notifications
 */
async function getScheduledNotifications(): Promise<ScheduledNotification[]> {
  try {
    const stored = await AsyncStorage.getItem(SCHEDULED_NOTIFICATIONS_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Error loading scheduled notifications:', error);
  }
  return [];
}

/**
 * Save scheduled notifications
 */
async function saveScheduledNotifications(notifications: ScheduledNotification[]): Promise<void> {
  try {
    await AsyncStorage.setItem(SCHEDULED_NOTIFICATIONS_KEY, JSON.stringify(notifications));
  } catch (error) {
    console.error('Error saving scheduled notifications:', error);
  }
}

/**
 * Parse date string to Date object
 */
function parseDateTime(dateStr: string, timeStr: string): Date {
  let date: Date;
  
  if (dateStr.includes('T')) {
    date = new Date(dateStr);
  } else if (dateStr.includes('/')) {
    const [month, day, year] = dateStr.split('/').map(Number);
    date = new Date(year, month - 1, day);
  } else if (dateStr.includes('-')) {
    date = new Date(dateStr);
  } else {
    date = new Date(dateStr);
  }

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
    date.setHours(9, 0, 0, 0);
  }

  return date;
}

/**
 * Schedule notifications for a court date
 */
export async function scheduleCourtDateNotifications(courtDate: CourtDate): Promise<void> {
  const settings = await getNotificationSettings();
  
  if (!settings.enabled || !settings.courtDateReminders) {
    return;
  }

  // Cancel any existing notifications for this court date
  await cancelNotificationsForReference('court_date', courtDate.id);

  const eventDate = parseDateTime(courtDate.date, courtDate.time);
  const now = new Date();

  // Don't schedule for past dates
  if (eventDate <= now) {
    return;
  }

  const scheduled: ScheduledNotification[] = await getScheduledNotifications();
  const newNotifications: ScheduledNotification[] = [];

  const getCourtTypeLabel = (type: CourtDate['type']): string => {
    const labels: Record<CourtDate['type'], string> = {
      arraignment: 'Arraignment',
      pretrial: 'Pre-Trial Conference',
      hearing: 'Hearing',
      trial: 'Trial',
      sentencing: 'Sentencing',
      other: 'Court Appearance',
    };
    return labels[type] || 'Court Date';
  };

  // Schedule reminders based on settings
  const reminders = [
    { key: 'oneDay', minutes: 24 * 60, label: 'tomorrow' },
    { key: 'oneHour', minutes: 60, label: 'in 1 hour' },
    { key: 'fifteenMinutes', minutes: 15, label: 'in 15 minutes' },
  ];

  for (const reminder of reminders) {
    if (!settings.reminderTimes[reminder.key as keyof typeof settings.reminderTimes]) {
      continue;
    }

    const triggerDate = new Date(eventDate.getTime() - reminder.minutes * 60 * 1000);
    
    // Don't schedule if trigger time is in the past
    if (triggerDate <= now) {
      continue;
    }

    try {
      const notificationId = await Notifications.scheduleNotificationAsync({
        content: {
          title: `⚖️ ${getCourtTypeLabel(courtDate.type)} ${reminder.label}`,
          body: `${courtDate.title} at ${courtDate.time || 'TBD'}\n📍 ${courtDate.location || 'Location TBD'}`,
          data: {
            type: 'court_date',
            courtDateId: courtDate.id,
          },
          sound: 'default',
          priority: Notifications.AndroidNotificationPriority.HIGH,
          ...(Platform.OS === 'android' && { channelId: 'court-dates' }),
        },
        trigger: {
          type: Notifications.SchedulableTriggerInputTypes.DATE,
          date: triggerDate,
        },
      });

      newNotifications.push({
        id: `${courtDate.id}-${reminder.key}`,
        notificationId,
        type: 'court_date',
        referenceId: courtDate.id,
        scheduledFor: triggerDate.toISOString(),
      });
    } catch (error) {
      console.error(`Error scheduling ${reminder.key} notification:`, error);
    }
  }

  // Save updated scheduled notifications
  const filteredScheduled = scheduled.filter(n => n.referenceId !== courtDate.id);
  await saveScheduledNotifications([...filteredScheduled, ...newNotifications]);
}

/**
 * Schedule notification for a task due date
 */
export async function scheduleTaskNotification(task: CaseTodo): Promise<void> {
  const settings = await getNotificationSettings();
  
  if (!settings.enabled || !settings.taskReminders || !task.dueDate) {
    return;
  }

  // Cancel any existing notifications for this task
  await cancelNotificationsForReference('task', task.id);

  const dueDate = new Date(task.dueDate);
  dueDate.setHours(9, 0, 0, 0); // Default to 9 AM
  const now = new Date();

  // Don't schedule for past dates or completed tasks
  if (dueDate <= now || task.completed) {
    return;
  }

  const scheduled = await getScheduledNotifications();

  // Schedule reminder for 1 day before
  const triggerDate = new Date(dueDate.getTime() - 24 * 60 * 60 * 1000);
  
  if (triggerDate > now) {
    try {
      const notificationId = await Notifications.scheduleNotificationAsync({
        content: {
          title: '📋 Task Due Tomorrow',
          body: task.task,
          data: {
            type: 'task',
            taskId: task.id,
          },
          sound: 'default',
          ...(Platform.OS === 'android' && { channelId: 'tasks' }),
        },
        trigger: {
          type: Notifications.SchedulableTriggerInputTypes.DATE,
          date: triggerDate,
        },
      });

      const filteredScheduled = scheduled.filter(n => n.referenceId !== task.id);
      await saveScheduledNotifications([
        ...filteredScheduled,
        {
          id: `${task.id}-reminder`,
          notificationId,
          type: 'task',
          referenceId: task.id,
          scheduledFor: triggerDate.toISOString(),
        },
      ]);
    } catch (error) {
      console.error('Error scheduling task notification:', error);
    }
  }
}

/**
 * Cancel notifications for a specific reference (court date or task)
 */
export async function cancelNotificationsForReference(type: 'court_date' | 'task', referenceId: string): Promise<void> {
  const scheduled = await getScheduledNotifications();
  const toCancel = scheduled.filter(n => n.type === type && n.referenceId === referenceId);

  for (const notification of toCancel) {
    try {
      await Notifications.cancelScheduledNotificationAsync(notification.notificationId);
    } catch (error) {
      console.error('Error canceling notification:', error);
    }
  }

  const remaining = scheduled.filter(n => !(n.type === type && n.referenceId === referenceId));
  await saveScheduledNotifications(remaining);
}

/**
 * Cancel all scheduled notifications
 */
export async function cancelAllNotifications(): Promise<void> {
  try {
    await Notifications.cancelAllScheduledNotificationsAsync();
    await saveScheduledNotifications([]);
  } catch (error) {
    console.error('Error canceling all notifications:', error);
  }
}

/**
 * Get count of scheduled notifications
 */
export async function getScheduledNotificationCount(): Promise<number> {
  const scheduled = await getScheduledNotifications();
  return scheduled.length;
}

/**
 * Send immediate notification (for testing)
 */
export async function sendTestNotification(): Promise<void> {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: '🔔 Test Notification',
      body: 'Push notifications are working! You will receive reminders for your court dates.',
      sound: 'default',
    },
    trigger: null, // Immediate
  });
}

/**
 * Add notification response listener
 */
export function addNotificationResponseListener(
  callback: (response: Notifications.NotificationResponse) => void
): Notifications.EventSubscription {
  return Notifications.addNotificationResponseReceivedListener(callback);
}

/**
 * Add notification received listener
 */
export function addNotificationReceivedListener(
  callback: (notification: Notifications.Notification) => void
): Notifications.EventSubscription {
  return Notifications.addNotificationReceivedListener(callback);
}

export default {
  configureNotifications,
  requestNotificationPermissions,
  getNotificationSettings,
  saveNotificationSettings,
  scheduleCourtDateNotifications,
  scheduleTaskNotification,
  cancelNotificationsForReference,
  cancelAllNotifications,
  getScheduledNotificationCount,
  sendTestNotification,
  addNotificationResponseListener,
  addNotificationReceivedListener,
};
