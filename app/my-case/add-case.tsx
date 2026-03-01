import { useState } from "react";
import { ScrollView, Text, View, TouchableOpacity, TextInput, Alert } from "react-native";
import { useRouter } from "expo-router";

import { ScreenContainer } from "@/components/screen-container";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useColors } from "@/hooks/use-colors";
import { CaseStorage, CaseInfo } from "@/lib/case-storage";

export default function AddCaseScreen() {
  const router = useRouter();
  const colors = useColors();
  const [saving, setSaving] = useState(false);
  
  const [caseNumber, setCaseNumber] = useState('');
  const [docketNumber, setDocketNumber] = useState('');
  const [charges, setCharges] = useState('');
  const [courtName, setCourtName] = useState('');
  const [courtAddress, setCourtAddress] = useState('');
  const [judge, setJudge] = useState('');
  const [status, setStatus] = useState<CaseInfo['status']>('pending');
  const [filingDate, setFilingDate] = useState('');
  const [notes, setNotes] = useState('');

  const statusOptions: { value: CaseInfo['status']; label: string }[] = [
    { value: 'pending', label: 'Pending' },
    { value: 'active', label: 'Active' },
    { value: 'resolved', label: 'Resolved' },
    { value: 'appealed', label: 'Appealed' },
  ];

  const handleSave = async () => {
    if (!caseNumber.trim() && !docketNumber.trim()) {
      Alert.alert('Required', 'Please enter a case number or docket number.');
      return;
    }

    setSaving(true);
    try {
      await CaseStorage.saveCase({
        caseNumber: caseNumber.trim(),
        docketNumber: docketNumber.trim(),
        charges: charges.split(',').map(c => c.trim()).filter(c => c),
        courtName: courtName.trim(),
        courtAddress: courtAddress.trim(),
        judge: judge.trim(),
        status,
        filingDate: filingDate.trim(),
        notes: notes.trim(),
      });
      
      Alert.alert('Success', 'Case added successfully!', [
        { text: 'OK', onPress: () => router.back() }
      ]);
    } catch (error) {
      console.error('Error saving case:', error);
      Alert.alert('Error', 'Failed to save case. Please try again.');
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
            <Text className="text-xl font-bold text-foreground">Add Case</Text>
            <Text className="text-sm text-muted">Enter your case information</Text>
          </View>
        </View>

        {/* Form */}
        <View className="px-4 py-4">
          {/* Case Number */}
          <View className="mb-4">
            <Text className="text-sm font-semibold text-foreground mb-2">Case Number *</Text>
            <TextInput
              className="bg-surface border border-border rounded-xl px-4 py-3 text-foreground"
              placeholder="e.g., 2024-CR-12345"
              placeholderTextColor={colors.muted}
              value={caseNumber}
              onChangeText={setCaseNumber}
              autoCapitalize="characters"
            />
          </View>

          {/* Docket Number */}
          <View className="mb-4">
            <Text className="text-sm font-semibold text-foreground mb-2">Docket Number</Text>
            <TextInput
              className="bg-surface border border-border rounded-xl px-4 py-3 text-foreground"
              placeholder="e.g., CP-51-CR-0012345-2024"
              placeholderTextColor={colors.muted}
              value={docketNumber}
              onChangeText={setDocketNumber}
              autoCapitalize="characters"
            />
          </View>

          {/* Charges */}
          <View className="mb-4">
            <Text className="text-sm font-semibold text-foreground mb-2">Charges</Text>
            <Text className="text-xs text-muted mb-2">Separate multiple charges with commas</Text>
            <TextInput
              className="bg-surface border border-border rounded-xl px-4 py-3 text-foreground"
              placeholder="e.g., Theft, Possession"
              placeholderTextColor={colors.muted}
              value={charges}
              onChangeText={setCharges}
              multiline
              numberOfLines={2}
              style={{ minHeight: 60, textAlignVertical: 'top' }}
            />
          </View>

          {/* Court Name */}
          <View className="mb-4">
            <Text className="text-sm font-semibold text-foreground mb-2">Court Name</Text>
            <TextInput
              className="bg-surface border border-border rounded-xl px-4 py-3 text-foreground"
              placeholder="e.g., Philadelphia Court of Common Pleas"
              placeholderTextColor={colors.muted}
              value={courtName}
              onChangeText={setCourtName}
            />
          </View>

          {/* Court Address */}
          <View className="mb-4">
            <Text className="text-sm font-semibold text-foreground mb-2">Court Address</Text>
            <TextInput
              className="bg-surface border border-border rounded-xl px-4 py-3 text-foreground"
              placeholder="e.g., 1301 Filbert St, Philadelphia, PA"
              placeholderTextColor={colors.muted}
              value={courtAddress}
              onChangeText={setCourtAddress}
              multiline
              numberOfLines={2}
              style={{ minHeight: 60, textAlignVertical: 'top' }}
            />
          </View>

          {/* Judge */}
          <View className="mb-4">
            <Text className="text-sm font-semibold text-foreground mb-2">Judge</Text>
            <TextInput
              className="bg-surface border border-border rounded-xl px-4 py-3 text-foreground"
              placeholder="e.g., Hon. John Smith"
              placeholderTextColor={colors.muted}
              value={judge}
              onChangeText={setJudge}
            />
          </View>

          {/* Status */}
          <View className="mb-4">
            <Text className="text-sm font-semibold text-foreground mb-2">Status</Text>
            <View className="flex-row flex-wrap">
              {statusOptions.map((option) => (
                <TouchableOpacity
                  key={option.value}
                  className={`mr-2 mb-2 px-4 py-2 rounded-full border ${
                    status === option.value 
                      ? 'bg-primary border-primary' 
                      : 'bg-surface border-border'
                  }`}
                  onPress={() => setStatus(option.value)}
                  activeOpacity={0.7}
                >
                  <Text 
                    className={`text-sm font-medium ${
                      status === option.value ? 'text-white' : 'text-foreground'
                    }`}
                  >
                    {option.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Filing Date */}
          <View className="mb-4">
            <Text className="text-sm font-semibold text-foreground mb-2">Filing Date</Text>
            <TextInput
              className="bg-surface border border-border rounded-xl px-4 py-3 text-foreground"
              placeholder="e.g., 01/15/2024"
              placeholderTextColor={colors.muted}
              value={filingDate}
              onChangeText={setFilingDate}
            />
          </View>

          {/* Notes */}
          <View className="mb-4">
            <Text className="text-sm font-semibold text-foreground mb-2">Notes</Text>
            <TextInput
              className="bg-surface border border-border rounded-xl px-4 py-3 text-foreground"
              placeholder="Any additional notes about your case..."
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
              {saving ? 'Saving...' : 'Save Case'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Tips */}
        <View className="px-4 py-4 mb-4">
          <View className="bg-primary/10 rounded-xl p-4 border border-primary/30">
            <Text className="text-sm font-semibold text-foreground mb-2">💡 Tips</Text>
            <View className="space-y-1">
              {[
                'Find your case number on any court documents',
                'The docket number is usually on the top of court papers',
                'Keep this information updated as your case progresses',
              ].map((tip, index) => (
                <View key={index} className="flex-row items-start mb-1">
                  <Text className="text-primary mr-2">•</Text>
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
