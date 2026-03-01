import { useState, useEffect } from "react";
import { ScrollView, Text, View, TouchableOpacity, Alert, Platform } from "react-native";
import { useRouter } from "expo-router";

import { ScreenContainer } from "@/components/screen-container";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useColors } from "@/hooks/use-colors";
import {
  NotificationSettings,
  getNotificationSettings,
  saveNotificationSettings,
  requestNotificationPermissions,
  sendTestNotification,
  cancelAllNotifications,
  getScheduledNotificationCount,
} from "@/lib/notifications";

export default function NotificationSettingsScreen() {
  const router = useRouter();
  const colors = useColors();
  const [settings, setSettings] = useState<NotificationSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [scheduledCount, setScheduledCount] = useState(0);
  const [permissionGranted, setPermissionGranted] = useState(false);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const [loadedSettings, count] = await Promise.all([
        getNotificationSettings(),
        getScheduledNotificationCount(),
      ]);
      setSettings(loadedSettings);
      setScheduledCount(count);
      
      // Check permission status
      const granted = await requestNotificationPermissions();
      setPermissionGranted(granted);
    } catch (error) {
      console.error('Error loading settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggle = async (key: keyof NotificationSettings | string, value: boolean) => {
    if (!settings) return;

    let newSettings: NotificationSettings;

    if (key.includes('.')) {
      // Handle nested keys like 'reminderTimes.oneDay'
      const [parent, child] = key.split('.');
      newSettings = {
        ...settings,
        [parent]: {
          ...(settings[parent as keyof NotificationSettings] as object),
          [child]: value,
        },
      };
    } else {
      newSettings = {
        ...settings,
        [key]: value,
      };
    }

    setSettings(newSettings);
    setSaving(true);
    
    try {
      await saveNotificationSettings(newSettings);
    } catch (error) {
      console.error('Error saving settings:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleRequestPermission = async () => {
    const granted = await requestNotificationPermissions();
    setPermissionGranted(granted);
    
    if (!granted) {
      Alert.alert(
        'Permission Required',
        'Please enable notifications in your device settings to receive court date reminders.',
        [{ text: 'OK' }]
      );
    }
  };

  const handleTestNotification = async () => {
    if (!permissionGranted) {
      Alert.alert('Permission Required', 'Please enable notifications first.');
      return;
    }
    
    await sendTestNotification();
    Alert.alert('Test Sent', 'You should receive a test notification shortly.');
  };

  const handleClearAll = async () => {
    Alert.alert(
      'Clear All Notifications',
      'This will cancel all scheduled notifications. You can re-enable them by editing your court dates.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear All',
          style: 'destructive',
          onPress: async () => {
            await cancelAllNotifications();
            setScheduledCount(0);
            Alert.alert('Cleared', 'All scheduled notifications have been cancelled.');
          },
        },
      ]
    );
  };

  const ToggleSwitch = ({ value, onToggle }: { value: boolean; onToggle: () => void }) => (
    <TouchableOpacity
      onPress={onToggle}
      activeOpacity={0.7}
    >
      <View 
        className={`w-12 h-7 rounded-full justify-center ${value ? 'bg-primary items-end' : 'bg-border items-start'}`}
      >
        <View className="w-5 h-5 rounded-full bg-white m-1" />
      </View>
    </TouchableOpacity>
  );

  if (loading || !settings) {
    return (
      <ScreenContainer>
        <View className="flex-1 items-center justify-center">
          <Text className="text-muted">Loading settings...</Text>
        </View>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer>
      <ScrollView 
        className="flex-1" 
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View className="px-5 pt-4 pb-4 bg-surface flex-row items-center">
          <TouchableOpacity
            className="mr-3 p-1"
            onPress={() => router.back()}
            activeOpacity={0.7}
          >
            <IconSymbol name="chevron.left" size={24} color={colors.foreground} />
          </TouchableOpacity>
          <View className="flex-1">
            <Text className="text-xl font-bold text-foreground">Notification Settings</Text>
            <Text className="text-sm text-muted">Manage your reminders</Text>
          </View>
          <View className="w-10 h-10 rounded-full bg-primary/20 items-center justify-center">
            <IconSymbol name="bell.fill" size={20} color={colors.primary} />
          </View>
        </View>

        {/* Permission Status */}
        {!permissionGranted && (
          <View className="px-4 py-3">
            <TouchableOpacity
              className="bg-warning/10 rounded-xl p-4 border border-warning/30"
              onPress={handleRequestPermission}
              activeOpacity={0.7}
            >
              <View className="flex-row items-center">
                <IconSymbol name="exclamationmark.triangle" size={24} color={colors.warning} />
                <View className="flex-1 ml-3">
                  <Text className="text-sm font-semibold text-foreground">Notifications Disabled</Text>
                  <Text className="text-xs text-muted">Tap to enable push notifications</Text>
                </View>
                <IconSymbol name="chevron.right" size={20} color={colors.warning} />
              </View>
            </TouchableOpacity>
          </View>
        )}

        {/* Scheduled Count */}
        <View className="px-4 py-3">
          <View className="bg-primary/10 rounded-xl p-4 border border-primary/30">
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center">
                <IconSymbol name="calendar" size={20} color={colors.primary} />
                <Text className="text-sm font-medium text-foreground ml-2">Scheduled Reminders</Text>
              </View>
              <View className="bg-primary px-3 py-1 rounded-full">
                <Text className="text-sm font-bold text-white">{scheduledCount}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Main Toggle */}
        <View className="px-4 py-2">
          <View className="bg-surface rounded-xl border border-border">
            <View className="flex-row items-center justify-between p-4">
              <View className="flex-row items-center flex-1">
                <View 
                  className="w-10 h-10 rounded-full items-center justify-center mr-3"
                  style={{ backgroundColor: colors.primary + '20' }}
                >
                  <IconSymbol name="bell.fill" size={20} color={colors.primary} />
                </View>
                <View className="flex-1">
                  <Text className="text-base font-semibold text-foreground">Enable Notifications</Text>
                  <Text className="text-xs text-muted">Receive reminders for court dates and tasks</Text>
                </View>
              </View>
              <ToggleSwitch 
                value={settings.enabled} 
                onToggle={() => handleToggle('enabled', !settings.enabled)} 
              />
            </View>
          </View>
        </View>

        {/* Notification Types */}
        <View className="px-4 py-4">
          <Text className="text-sm font-semibold text-muted mb-3 px-1">NOTIFICATION TYPES</Text>
          <View className="bg-surface rounded-xl border border-border">
            {/* Court Date Reminders */}
            <View className="flex-row items-center justify-between p-4 border-b border-border">
              <View className="flex-row items-center flex-1">
                <Text className="text-2xl mr-3">⚖️</Text>
                <View className="flex-1">
                  <Text className="text-sm font-medium text-foreground">Court Date Reminders</Text>
                  <Text className="text-xs text-muted">Get notified before court appearances</Text>
                </View>
              </View>
              <ToggleSwitch 
                value={settings.courtDateReminders} 
                onToggle={() => handleToggle('courtDateReminders', !settings.courtDateReminders)} 
              />
            </View>

            {/* Task Reminders */}
            <View className="flex-row items-center justify-between p-4">
              <View className="flex-row items-center flex-1">
                <Text className="text-2xl mr-3">📋</Text>
                <View className="flex-1">
                  <Text className="text-sm font-medium text-foreground">Task Reminders</Text>
                  <Text className="text-xs text-muted">Get notified about due tasks</Text>
                </View>
              </View>
              <ToggleSwitch 
                value={settings.taskReminders} 
                onToggle={() => handleToggle('taskReminders', !settings.taskReminders)} 
              />
            </View>
          </View>
        </View>

        {/* Reminder Timing */}
        <View className="px-4 py-4">
          <Text className="text-sm font-semibold text-muted mb-3 px-1">REMINDER TIMING</Text>
          <View className="bg-surface rounded-xl border border-border">
            {/* 1 Day Before */}
            <View className="flex-row items-center justify-between p-4 border-b border-border">
              <View className="flex-1">
                <Text className="text-sm font-medium text-foreground">1 Day Before</Text>
                <Text className="text-xs text-muted">Reminder 24 hours ahead</Text>
              </View>
              <ToggleSwitch 
                value={settings.reminderTimes.oneDay} 
                onToggle={() => handleToggle('reminderTimes.oneDay', !settings.reminderTimes.oneDay)} 
              />
            </View>

            {/* 1 Hour Before */}
            <View className="flex-row items-center justify-between p-4 border-b border-border">
              <View className="flex-1">
                <Text className="text-sm font-medium text-foreground">1 Hour Before</Text>
                <Text className="text-xs text-muted">Reminder 60 minutes ahead</Text>
              </View>
              <ToggleSwitch 
                value={settings.reminderTimes.oneHour} 
                onToggle={() => handleToggle('reminderTimes.oneHour', !settings.reminderTimes.oneHour)} 
              />
            </View>

            {/* 15 Minutes Before */}
            <View className="flex-row items-center justify-between p-4">
              <View className="flex-1">
                <Text className="text-sm font-medium text-foreground">15 Minutes Before</Text>
                <Text className="text-xs text-muted">Final reminder before event</Text>
              </View>
              <ToggleSwitch 
                value={settings.reminderTimes.fifteenMinutes} 
                onToggle={() => handleToggle('reminderTimes.fifteenMinutes', !settings.reminderTimes.fifteenMinutes)} 
              />
            </View>
          </View>
        </View>

        {/* Actions */}
        <View className="px-4 py-4">
          <Text className="text-sm font-semibold text-muted mb-3 px-1">ACTIONS</Text>
          <View className="bg-surface rounded-xl border border-border">
            {/* Test Notification */}
            <TouchableOpacity
              className="flex-row items-center justify-between p-4 border-b border-border"
              onPress={handleTestNotification}
              activeOpacity={0.7}
            >
              <View className="flex-row items-center">
                <IconSymbol name="bell.fill" size={20} color={colors.primary} />
                <Text className="text-sm font-medium text-foreground ml-3">Send Test Notification</Text>
              </View>
              <IconSymbol name="chevron.right" size={18} color={colors.muted} />
            </TouchableOpacity>

            {/* Clear All */}
            <TouchableOpacity
              className="flex-row items-center justify-between p-4"
              onPress={handleClearAll}
              activeOpacity={0.7}
            >
              <View className="flex-row items-center">
                <IconSymbol name="trash" size={20} color={colors.error} />
                <Text className="text-sm font-medium ml-3" style={{ color: colors.error }}>
                  Clear All Scheduled Notifications
                </Text>
              </View>
              <IconSymbol name="chevron.right" size={18} color={colors.muted} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Info */}
        <View className="px-4 py-4 mb-4">
          <View className="bg-surface rounded-xl p-4 border border-border">
            <View className="flex-row items-start">
              <IconSymbol name="info.circle" size={18} color={colors.muted} style={{ marginTop: 2 }} />
              <Text className="flex-1 text-xs text-muted ml-2 leading-relaxed">
                Notifications are scheduled locally on your device. They will be delivered even when the app is closed, 
                but may be affected by battery optimization settings on some devices.
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
