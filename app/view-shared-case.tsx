import { useState, useEffect } from "react";
import { ScrollView, Text, View, TouchableOpacity, TextInput, Linking } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";

import { ScreenContainer } from "@/components/screen-container";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useColors } from "@/hooks/use-colors";
import { parseSharedCaseData, SharedCaseData } from "@/lib/case-sharing";

export default function ViewSharedCaseScreen() {
  const router = useRouter();
  const colors = useColors();
  const params = useLocalSearchParams<{ data?: string }>();
  
  const [manualCode, setManualCode] = useState('');
  const [sharedData, setSharedData] = useState<SharedCaseData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (params.data) {
      try {
        const decoded = decodeURIComponent(params.data);
        const parsed = parseSharedCaseData(decoded);
        if (parsed) {
          setSharedData(parsed);
        } else {
          setError('Invalid or expired share link');
        }
      } catch {
        setError('Could not parse share data');
      }
    }
  }, [params.data]);

  const handleManualEntry = () => {
    // For manual code entry, we'd need to look up the share
    // In this simple implementation, we just show an info message
    setError('Please scan the QR code directly to view shared case information.');
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const getCourtTypeLabel = (type: string): string => {
    const labels: Record<string, string> = {
      arraignment: 'Arraignment',
      pretrial: 'Pre-Trial',
      hearing: 'Hearing',
      trial: 'Trial',
      sentencing: 'Sentencing',
      other: 'Court Date',
    };
    return labels[type] || 'Court Date';
  };

  const getContactRoleLabel = (role: string): string => {
    const labels: Record<string, string> = {
      attorney: 'Attorney',
      public_defender: 'Public Defender',
      probation_officer: 'Probation Officer',
      bondsman: 'Bondsman',
      paralegal: 'Paralegal',
      other: 'Contact',
    };
    return labels[role] || 'Contact';
  };

  if (!sharedData && !error) {
    return (
      <ScreenContainer>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View className="flex-row items-center px-4 py-4 border-b border-border">
            <TouchableOpacity
              className="mr-3 p-1"
              onPress={() => router.back()}
              activeOpacity={0.7}
            >
              <IconSymbol name="chevron.left" size={24} color={colors.foreground} />
            </TouchableOpacity>
            <View className="flex-1">
              <Text className="text-xl font-bold text-foreground">View Shared Case</Text>
              <Text className="text-sm text-muted">Enter code or scan QR</Text>
            </View>
          </View>

          {/* Manual Entry */}
          <View className="px-4 py-6">
            <View className="bg-surface border border-border rounded-2xl p-6">
              <View className="items-center mb-6">
                <View className="w-16 h-16 rounded-full bg-primary/20 items-center justify-center mb-4">
                  <IconSymbol name="qrcode.viewfinder" size={32} color={colors.primary} />
                </View>
                <Text className="text-lg font-semibold text-foreground text-center">
                  Enter Share Code
                </Text>
                <Text className="text-sm text-muted text-center mt-1">
                  Enter the 8-character code from the shared QR
                </Text>
              </View>

              <TextInput
                className="bg-background border border-border rounded-xl px-4 py-3 text-foreground text-center text-xl font-mono tracking-widest"
                placeholder="XXXXXXXX"
                placeholderTextColor={colors.muted}
                value={manualCode}
                onChangeText={(text) => setManualCode(text.toUpperCase())}
                maxLength={8}
                autoCapitalize="characters"
              />

              <TouchableOpacity
                className="bg-primary rounded-xl py-3 mt-4 items-center"
                onPress={handleManualEntry}
                activeOpacity={0.7}
              >
                <Text className="text-white font-semibold">View Case</Text>
              </TouchableOpacity>
            </View>

            {/* Info */}
            <View className="mt-6 bg-primary/10 rounded-xl p-4 border border-primary/20">
              <View className="flex-row items-start">
                <IconSymbol name="info.circle" size={20} color={colors.primary} />
                <Text className="flex-1 text-sm text-muted ml-2">
                  To view shared case information, scan the QR code shown by the person sharing their case with you. The information will be displayed securely on your device.
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </ScreenContainer>
    );
  }

  if (error) {
    return (
      <ScreenContainer>
        <View className="flex-1 items-center justify-center p-6">
          <View className="w-20 h-20 rounded-full bg-error/20 items-center justify-center mb-4">
            <IconSymbol name="xmark.circle.fill" size={40} color={colors.error} />
          </View>
          <Text className="text-lg font-semibold text-foreground text-center mb-2">
            Unable to Load
          </Text>
          <Text className="text-sm text-muted text-center mb-6">{error}</Text>
          <TouchableOpacity
            className="bg-primary px-6 py-3 rounded-xl"
            onPress={() => router.back()}
          >
            <Text className="text-white font-semibold">Go Back</Text>
          </TouchableOpacity>
        </View>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="flex-row items-center px-4 py-4 border-b border-border">
          <TouchableOpacity
            className="mr-3 p-1"
            onPress={() => router.back()}
            activeOpacity={0.7}
          >
            <IconSymbol name="chevron.left" size={24} color={colors.foreground} />
          </TouchableOpacity>
          <View className="flex-1">
            <Text className="text-xl font-bold text-foreground">Shared Case</Text>
            <Text className="text-sm text-muted">From: {sharedData?.sharedBy}</Text>
          </View>
        </View>

        {/* Expiration Notice */}
        <View className="px-4 py-3">
          <View className="bg-warning/10 rounded-xl p-3 border border-warning/30 flex-row items-center">
            <IconSymbol name="clock.arrow.circlepath" size={18} color={colors.warning} />
            <Text className="flex-1 text-xs text-muted ml-2">
              This share expires: {sharedData?.expiresAt ? new Date(sharedData.expiresAt).toLocaleString() : 'Unknown'}
            </Text>
          </View>
        </View>

        {/* Case Information */}
        {sharedData?.caseInfo && (
          <View className="px-4 py-4">
            <Text className="text-lg font-bold text-foreground mb-3">Case Information</Text>
            <View className="bg-surface border border-border rounded-xl p-4">
              {sharedData.caseInfo.caseNumber && (
                <View className="mb-3">
                  <Text className="text-xs text-muted">Case Number</Text>
                  <Text className="text-base font-semibold text-foreground">{sharedData.caseInfo.caseNumber}</Text>
                </View>
              )}
              {sharedData.caseInfo.docketNumber && (
                <View className="mb-3">
                  <Text className="text-xs text-muted">Docket Number</Text>
                  <Text className="text-base font-semibold text-foreground">{sharedData.caseInfo.docketNumber}</Text>
                </View>
              )}
              {sharedData.caseInfo.courtName && (
                <View className="mb-3">
                  <Text className="text-xs text-muted">Court</Text>
                  <Text className="text-base text-foreground">{sharedData.caseInfo.courtName}</Text>
                </View>
              )}
              {sharedData.caseInfo.charges && sharedData.caseInfo.charges.length > 0 && (
                <View className="mb-3">
                  <Text className="text-xs text-muted">Charges</Text>
                  <Text className="text-base text-foreground">{sharedData.caseInfo.charges.join(', ')}</Text>
                </View>
              )}
              {sharedData.caseInfo.status && (
                <View className="mb-3">
                  <Text className="text-xs text-muted">Status</Text>
                  <Text className="text-base text-foreground capitalize">{sharedData.caseInfo.status}</Text>
                </View>
              )}
              {sharedData.caseInfo.notes && (
                <View>
                  <Text className="text-xs text-muted">Notes</Text>
                  <Text className="text-base text-foreground">{sharedData.caseInfo.notes}</Text>
                </View>
              )}
            </View>
          </View>
        )}

        {/* Court Dates */}
        {sharedData?.courtDates && sharedData.courtDates.length > 0 && (
          <View className="px-4 py-4">
            <Text className="text-lg font-bold text-foreground mb-3">Court Dates</Text>
            {sharedData.courtDates.map((date, index) => (
              <View key={index} className="bg-surface border border-border rounded-xl p-4 mb-2">
                <View className="flex-row items-start">
                  <View className="w-12 h-12 rounded-xl bg-primary/20 items-center justify-center mr-3">
                    <Text className="text-lg font-bold" style={{ color: colors.primary }}>
                      {new Date(date.date).getDate()}
                    </Text>
                    <Text className="text-xs" style={{ color: colors.primary }}>
                      {new Date(date.date).toLocaleDateString('en-US', { month: 'short' })}
                    </Text>
                  </View>
                  <View className="flex-1">
                    <Text className="text-base font-semibold text-foreground">{date.title}</Text>
                    <Text className="text-sm text-muted">{getCourtTypeLabel(date.type)} • {date.time}</Text>
                    <Text className="text-xs text-muted mt-1">{date.location}</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        )}

        {/* Legal Contacts */}
        {sharedData?.contacts && sharedData.contacts.length > 0 && (
          <View className="px-4 py-4">
            <Text className="text-lg font-bold text-foreground mb-3">Legal Contacts</Text>
            {sharedData.contacts.map((contact, index) => (
              <View key={index} className="bg-surface border border-border rounded-xl p-4 mb-2">
                <View className="flex-row items-center justify-between mb-2">
                  <Text className="text-base font-semibold text-foreground">{contact.name}</Text>
                  <View className="bg-primary/10 px-2 py-1 rounded-full">
                    <Text className="text-xs font-medium" style={{ color: colors.primary }}>
                      {getContactRoleLabel(contact.role)}
                    </Text>
                  </View>
                </View>
                {contact.phone && (
                  <TouchableOpacity
                    className="flex-row items-center mb-1"
                    onPress={() => Linking.openURL(`tel:${contact.phone}`)}
                  >
                    <IconSymbol name="phone.fill" size={14} color={colors.primary} />
                    <Text className="text-sm ml-2" style={{ color: colors.primary }}>{contact.phone}</Text>
                  </TouchableOpacity>
                )}
                {contact.email && (
                  <TouchableOpacity
                    className="flex-row items-center"
                    onPress={() => Linking.openURL(`mailto:${contact.email}`)}
                  >
                    <IconSymbol name="paperplane.fill" size={14} color={colors.primary} />
                    <Text className="text-sm ml-2" style={{ color: colors.primary }}>{contact.email}</Text>
                  </TouchableOpacity>
                )}
              </View>
            ))}
          </View>
        )}

        {/* To-Do Items */}
        {sharedData?.todos && sharedData.todos.length > 0 && (
          <View className="px-4 py-4 mb-8">
            <Text className="text-lg font-bold text-foreground mb-3">To-Do Items</Text>
            <View className="bg-surface border border-border rounded-xl overflow-hidden">
              {sharedData.todos.map((todo, index) => (
                <View 
                  key={index}
                  className={`p-4 flex-row items-center ${index > 0 ? 'border-t border-border' : ''}`}
                >
                  <View 
                    className={`w-5 h-5 rounded-full border-2 mr-3 items-center justify-center ${
                      todo.completed ? 'bg-success border-success' : 'border-border'
                    }`}
                  >
                    {todo.completed && <IconSymbol name="checkmark" size={12} color="white" />}
                  </View>
                  <View className="flex-1">
                    <Text className={`text-sm ${todo.completed ? 'text-muted line-through' : 'text-foreground'}`}>
                      {todo.task}
                    </Text>
                    {todo.dueDate && (
                      <Text className="text-xs text-muted">Due: {formatDate(todo.dueDate)}</Text>
                    )}
                  </View>
                </View>
              ))}
            </View>
          </View>
        )}
      </ScrollView>
    </ScreenContainer>
  );
}
