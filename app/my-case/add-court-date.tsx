import { useState, useEffect } from "react";
import { ScrollView, Text, View, TouchableOpacity, TextInput, Alert } from "react-native";
import { useRouter } from "expo-router";

import { ScreenContainer } from "@/components/screen-container";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useColors } from "@/hooks/use-colors";
import { CaseStorage, CaseInfo, CourtDate } from "@/lib/case-storage";
import { addCourtDateToCalendar } from "@/lib/calendar-sync";
import { Platform } from "react-native";
import { scheduleCourtDateNotifications } from "@/lib/notifications";

export default function AddCourtDateScreen() {
  const router = useRouter();
  const colors = useColors();
  const [saving, setSaving] = useState(false);
  const [cases, setCases] = useState<CaseInfo[]>([]);
  
  const [selectedCaseId, setSelectedCaseId] = useState('');
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  const [type, setType] = useState<CourtDate['type']>('hearing');
  const [notes, setNotes] = useState('');
  const [reminder, setReminder] = useState(true);
  const [addToCalendar, setAddToCalendar] = useState(true);
  const [enableNotifications, setEnableNotifications] = useState(true);

  useEffect(() => {
    loadCases();
  }, []);

  const loadCases = async () => {
    const casesData = await CaseStorage.getCases();
    setCases(casesData);
    if (casesData.length > 0) {
      setSelectedCaseId(casesData[0].id);
    }
  };

  const typeOptions: { value: CourtDate['type']; label: string }[] = [
    { value: 'arraignment', label: 'Arraignment' },
    { value: 'pretrial', label: 'Pre-Trial' },
    { value: 'hearing', label: 'Hearing' },
    { value: 'trial', label: 'Trial' },
    { value: 'sentencing', label: 'Sentencing' },
    { value: 'other', label: 'Other' },
  ];

  const handleSave = async () => {
    if (!title.trim()) {
      Alert.alert('Required', 'Please enter a title for this court date.');
      return;
    }
    if (!date.trim()) {
      Alert.alert('Required', 'Please enter the date.');
      return;
    }

    setSaving(true);
    try {
      await CaseStorage.saveCourtDate({
        caseId: selectedCaseId,
        title: title.trim(),
        date: date.trim(),
        time: time.trim() || 'TBD',
        location: location.trim(),
        type,
        notes: notes.trim(),
        reminder,
        completed: false,
      });
      
      // Get the saved court date for calendar and notifications
      const savedDates = await CaseStorage.getCourtDates();
      const newDate = savedDates[savedDates.length - 1];

      // Schedule push notifications if enabled
      if (enableNotifications && newDate) {
        await scheduleCourtDateNotifications(newDate);
      }

      // Add to calendar if selected
      if (addToCalendar && newDate) {
        const calResult = await addCourtDateToCalendar(newDate);
        if (calResult.success) {
          Alert.alert(
            'Success', 
            Platform.OS === 'web'
              ? 'Court date added! Calendar file downloaded - open it to add to your calendar.'
              : `Court date added${enableNotifications ? ' with push notifications' : ''}${addToCalendar ? ' and synced to calendar' : ''}!`,
            [{ text: 'OK', onPress: () => router.back() }]
          );
        } else {
          Alert.alert('Partial Success', 'Court date saved but could not add to calendar: ' + calResult.error, [
            { text: 'OK', onPress: () => router.back() }
          ]);
        }
      } else {
        Alert.alert('Success', `Court date added${enableNotifications ? ' with push notifications' : ''}!`, [
          { text: 'OK', onPress: () => router.back() }
        ]);
      }
    } catch (error) {
      console.error('Error saving court date:', error);
      Alert.alert('Error', 'Failed to save court date. Please try again.');
    } finally {
      setSaving(false);
    }
  };

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
            <Text className="text-xl font-bold text-foreground">Add Court Date</Text>
            <Text className="text-sm text-muted">Track your upcoming hearings</Text>
          </View>
        </View>

        {/* Form */}
        <View className="px-4 py-4">
          {/* Select Case */}
          {cases.length > 0 && (
            <View className="mb-4">
              <Text className="text-sm font-semibold text-foreground mb-2">Related Case</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {cases.map((caseItem) => (
                  <TouchableOpacity
                    key={caseItem.id}
                    className={`mr-2 px-4 py-2 rounded-full border ${
                      selectedCaseId === caseItem.id 
                        ? 'bg-primary border-primary' 
                        : 'bg-surface border-border'
                    }`}
                    onPress={() => setSelectedCaseId(caseItem.id)}
                    activeOpacity={0.7}
                  >
                    <Text 
                      className={`text-sm font-medium ${
                        selectedCaseId === caseItem.id ? 'text-white' : 'text-foreground'
                      }`}
                    >
                      #{caseItem.caseNumber || caseItem.docketNumber || 'Case'}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          )}

          {/* Title */}
          <View className="mb-4">
            <Text className="text-sm font-semibold text-foreground mb-2">Title *</Text>
            <TextInput
              className="bg-surface border border-border rounded-xl px-4 py-3 text-foreground"
              placeholder="e.g., Preliminary Hearing"
              placeholderTextColor={colors.muted}
              value={title}
              onChangeText={setTitle}
            />
          </View>

          {/* Type */}
          <View className="mb-4">
            <Text className="text-sm font-semibold text-foreground mb-2">Type</Text>
            <View className="flex-row flex-wrap">
              {typeOptions.map((option) => (
                <TouchableOpacity
                  key={option.value}
                  className={`mr-2 mb-2 px-4 py-2 rounded-full border ${
                    type === option.value 
                      ? 'bg-primary border-primary' 
                      : 'bg-surface border-border'
                  }`}
                  onPress={() => setType(option.value)}
                  activeOpacity={0.7}
                >
                  <Text 
                    className={`text-sm font-medium ${
                      type === option.value ? 'text-white' : 'text-foreground'
                    }`}
                  >
                    {option.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Date */}
          <View className="mb-4">
            <Text className="text-sm font-semibold text-foreground mb-2">Date *</Text>
            <TextInput
              className="bg-surface border border-border rounded-xl px-4 py-3 text-foreground"
              placeholder="e.g., 02/15/2024"
              placeholderTextColor={colors.muted}
              value={date}
              onChangeText={setDate}
            />
          </View>

          {/* Time */}
          <View className="mb-4">
            <Text className="text-sm font-semibold text-foreground mb-2">Time</Text>
            <TextInput
              className="bg-surface border border-border rounded-xl px-4 py-3 text-foreground"
              placeholder="e.g., 9:00 AM"
              placeholderTextColor={colors.muted}
              value={time}
              onChangeText={setTime}
            />
          </View>

          {/* Location */}
          <View className="mb-4">
            <Text className="text-sm font-semibold text-foreground mb-2">Location</Text>
            <TextInput
              className="bg-surface border border-border rounded-xl px-4 py-3 text-foreground"
              placeholder="e.g., Courtroom 302, Criminal Justice Center"
              placeholderTextColor={colors.muted}
              value={location}
              onChangeText={setLocation}
              multiline
              numberOfLines={2}
              style={{ minHeight: 60, textAlignVertical: 'top' }}
            />
          </View>

          {/* Reminder Toggle */}
          <View className="mb-4">
            <TouchableOpacity
              className="flex-row items-center justify-between bg-surface border border-border rounded-xl px-4 py-3"
              onPress={() => setReminder(!reminder)}
              activeOpacity={0.7}
            >
              <View className="flex-row items-center">
                <IconSymbol name="bell.fill" size={20} color={colors.primary} />
                <Text className="text-sm font-medium text-foreground ml-3">Enable Reminder</Text>
              </View>
              <View 
                className={`w-12 h-7 rounded-full justify-center ${reminder ? 'bg-primary items-end' : 'bg-border items-start'}`}
              >
                <View className="w-5 h-5 rounded-full bg-white m-1" />
              </View>
            </TouchableOpacity>
          </View>

          {/* Add to Calendar Toggle */}
          <View className="mb-4">
            <TouchableOpacity
              className="flex-row items-center justify-between bg-surface border border-border rounded-xl px-4 py-3"
              onPress={() => setAddToCalendar(!addToCalendar)}
              activeOpacity={0.7}
            >
              <View className="flex-row items-center">
                <IconSymbol name="calendar" size={20} color={colors.primary} />
                <View className="ml-3">
                  <Text className="text-sm font-medium text-foreground">Add to Phone Calendar</Text>
                  <Text className="text-xs text-muted">Sync with your device calendar</Text>
                </View>
              </View>
              <View 
                className={`w-12 h-7 rounded-full justify-center ${addToCalendar ? 'bg-primary items-end' : 'bg-border items-start'}`}
              >
                <View className="w-5 h-5 rounded-full bg-white m-1" />
              </View>
            </TouchableOpacity>
          </View>

          {/* Push Notifications Toggle */}
          <View className="mb-4">
            <TouchableOpacity
              className="flex-row items-center justify-between bg-surface border border-border rounded-xl px-4 py-3"
              onPress={() => setEnableNotifications(!enableNotifications)}
              activeOpacity={0.7}
            >
              <View className="flex-row items-center">
                <IconSymbol name="bell.fill" size={20} color={colors.primary} />
                <View className="ml-3">
                  <Text className="text-sm font-medium text-foreground">Push Notifications</Text>
                  <Text className="text-xs text-muted">Get reminded before court date</Text>
                </View>
              </View>
              <View 
                className={`w-12 h-7 rounded-full justify-center ${enableNotifications ? 'bg-primary items-end' : 'bg-border items-start'}`}
              >
                <View className="w-5 h-5 rounded-full bg-white m-1" />
              </View>
            </TouchableOpacity>
          </View>

          {/* Notes */}
          <View className="mb-4">
            <Text className="text-sm font-semibold text-foreground mb-2">Notes</Text>
            <TextInput
              className="bg-surface border border-border rounded-xl px-4 py-3 text-foreground"
              placeholder="Any additional notes..."
              placeholderTextColor={colors.muted}
              value={notes}
              onChangeText={setNotes}
              multiline
              numberOfLines={4}
              style={{ minHeight: 100, textAlignVertical: 'top' }}
            />
          </View>
        </View>

        {/* Save Button */}
        <View className="px-4 py-4">
          <TouchableOpacity
            className={`rounded-xl p-4 items-center ${saving ? 'bg-primary/50' : 'bg-primary'}`}
            onPress={handleSave}
            disabled={saving}
            activeOpacity={0.7}
          >
            <Text className="text-white font-semibold">
              {saving ? 'Saving...' : 'Save Court Date'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Tips */}
        <View className="px-4 py-4 mb-4">
          <View className="bg-warning/10 rounded-xl p-4 border border-warning/30">
            <Text className="text-sm font-semibold text-foreground mb-2">⚠️ Important</Text>
            <View className="space-y-1">
              {[
                'Always arrive 15-30 minutes early',
                'Bring all required documents and ID',
                'Dress appropriately for court',
                'Turn off your phone before entering',
              ].map((tip, index) => (
                <View key={index} className="flex-row items-start mb-1">
                  <Text className="text-warning mr-2">•</Text>
                  <Text className="flex-1 text-xs text-muted">{tip}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
