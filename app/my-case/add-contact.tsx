import { useState, useEffect } from "react";
import { ScrollView, Text, View, TouchableOpacity, TextInput, Alert } from "react-native";
import { useRouter } from "expo-router";

import { ScreenContainer } from "@/components/screen-container";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useColors } from "@/hooks/use-colors";
import { CaseStorage, CaseInfo, LegalContact } from "@/lib/case-storage";

export default function AddContactScreen() {
  const router = useRouter();
  const colors = useColors();
  const [saving, setSaving] = useState(false);
  const [cases, setCases] = useState<CaseInfo[]>([]);
  
  const [selectedCaseId, setSelectedCaseId] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState<LegalContact['role']>('attorney');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [isPrimary, setIsPrimary] = useState(false);

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

  const roleOptions: { value: LegalContact['role']; label: string; icon: string }[] = [
    { value: 'attorney', label: 'Attorney', icon: '⚖️' },
    { value: 'public_defender', label: 'Public Defender', icon: '🏛️' },
    { value: 'probation_officer', label: 'Probation Officer', icon: '👮' },
    { value: 'bondsman', label: 'Bondsman', icon: '💰' },
    { value: 'paralegal', label: 'Paralegal', icon: '📋' },
    { value: 'other', label: 'Other', icon: '👤' },
  ];

  const handleSave = async () => {
    if (!name.trim()) {
      Alert.alert('Required', 'Please enter a name for this contact.');
      return;
    }

    setSaving(true);
    try {
      await CaseStorage.saveContact({
        caseId: selectedCaseId,
        name: name.trim(),
        role,
        phone: phone.trim(),
        email: email.trim(),
        address: address.trim(),
        notes: notes.trim(),
        isPrimary,
      });
      
      Alert.alert('Success', 'Contact added successfully!', [
        { text: 'OK', onPress: () => router.back() }
      ]);
    } catch (error) {
      console.error('Error saving contact:', error);
      Alert.alert('Error', 'Failed to save contact. Please try again.');
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
            <Text className="text-xl font-bold text-foreground">Add Contact</Text>
            <Text className="text-sm text-muted">Save your legal contacts</Text>
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

          {/* Role */}
          <View className="mb-4">
            <Text className="text-sm font-semibold text-foreground mb-2">Role</Text>
            <View className="flex-row flex-wrap">
              {roleOptions.map((option) => (
                <TouchableOpacity
                  key={option.value}
                  className={`mr-2 mb-2 px-4 py-2 rounded-full border flex-row items-center ${
                    role === option.value 
                      ? 'bg-primary border-primary' 
                      : 'bg-surface border-border'
                  }`}
                  onPress={() => setRole(option.value)}
                  activeOpacity={0.7}
                >
                  <Text className="mr-1">{option.icon}</Text>
                  <Text 
                    className={`text-sm font-medium ${
                      role === option.value ? 'text-white' : 'text-foreground'
                    }`}
                  >
                    {option.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Name */}
          <View className="mb-4">
            <Text className="text-sm font-semibold text-foreground mb-2">Name *</Text>
            <TextInput
              className="bg-surface border border-border rounded-xl px-4 py-3 text-foreground"
              placeholder="e.g., John Smith, Esq."
              placeholderTextColor={colors.muted}
              value={name}
              onChangeText={setName}
            />
          </View>

          {/* Phone */}
          <View className="mb-4">
            <Text className="text-sm font-semibold text-foreground mb-2">Phone</Text>
            <TextInput
              className="bg-surface border border-border rounded-xl px-4 py-3 text-foreground"
              placeholder="e.g., (215) 555-1234"
              placeholderTextColor={colors.muted}
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
            />
          </View>

          {/* Email */}
          <View className="mb-4">
            <Text className="text-sm font-semibold text-foreground mb-2">Email</Text>
            <TextInput
              className="bg-surface border border-border rounded-xl px-4 py-3 text-foreground"
              placeholder="e.g., attorney@lawfirm.com"
              placeholderTextColor={colors.muted}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          {/* Address */}
          <View className="mb-4">
            <Text className="text-sm font-semibold text-foreground mb-2">Address</Text>
            <TextInput
              className="bg-surface border border-border rounded-xl px-4 py-3 text-foreground"
              placeholder="e.g., 123 Main St, Suite 100, Philadelphia, PA"
              placeholderTextColor={colors.muted}
              value={address}
              onChangeText={setAddress}
              multiline
              numberOfLines={2}
              style={{ minHeight: 60, textAlignVertical: 'top' }}
            />
          </View>

          {/* Primary Contact Toggle */}
          <View className="mb-4">
            <TouchableOpacity
              className="flex-row items-center justify-between bg-surface border border-border rounded-xl px-4 py-3"
              onPress={() => setIsPrimary(!isPrimary)}
              activeOpacity={0.7}
            >
              <View className="flex-row items-center">
                <IconSymbol name="star.fill" size={20} color={colors.warning} />
                <Text className="text-sm font-medium text-foreground ml-3">Primary Contact</Text>
              </View>
              <View 
                className={`w-12 h-7 rounded-full justify-center ${isPrimary ? 'bg-primary items-end' : 'bg-border items-start'}`}
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
              placeholder="Any additional notes about this contact..."
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
              {saving ? 'Saving...' : 'Save Contact'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Tips */}
        <View className="px-4 py-4 mb-4">
          <View className="bg-primary/10 rounded-xl p-4 border border-primary/30">
            <Text className="text-sm font-semibold text-foreground mb-2">💡 Tips</Text>
            <View className="space-y-1">
              {[
                'Save your attorney\'s direct line, not just the office number',
                'Include your probation officer\'s badge number in notes',
                'Mark your primary contact for quick access',
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
