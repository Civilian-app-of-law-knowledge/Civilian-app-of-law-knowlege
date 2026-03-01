import { useState, useEffect } from "react";
import { ScrollView, Text, View, TouchableOpacity, TextInput, Alert, Platform } from "react-native";
import { useRouter } from "expo-router";
import * as DocumentPicker from 'expo-document-picker';

import { ScreenContainer } from "@/components/screen-container";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useColors } from "@/hooks/use-colors";
import { CaseStorage, CaseInfo, CaseDocument } from "@/lib/case-storage";

export default function AddDocumentScreen() {
  const router = useRouter();
  const colors = useColors();
  const [saving, setSaving] = useState(false);
  const [cases, setCases] = useState<CaseInfo[]>([]);
  
  const [selectedCaseId, setSelectedCaseId] = useState('');
  const [name, setName] = useState('');
  const [type, setType] = useState<CaseDocument['type']>('court_order');
  const [notes, setNotes] = useState('');
  const [selectedFile, setSelectedFile] = useState<{
    uri: string;
    name: string;
    size: number;
    mimeType: string;
  } | null>(null);

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

  const typeOptions: { value: CaseDocument['type']; label: string; icon: string }[] = [
    { value: 'court_order', label: 'Court Order', icon: '⚖️' },
    { value: 'bail_papers', label: 'Bail Papers', icon: '📄' },
    { value: 'police_report', label: 'Police Report', icon: '👮' },
    { value: 'evidence', label: 'Evidence', icon: '🔍' },
    { value: 'correspondence', label: 'Correspondence', icon: '✉️' },
    { value: 'other', label: 'Other', icon: '📁' },
  ];

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ['application/pdf', 'image/*', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
        copyToCacheDirectory: true,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const asset = result.assets[0];
        setSelectedFile({
          uri: asset.uri,
          name: asset.name,
          size: asset.size || 0,
          mimeType: asset.mimeType || 'application/octet-stream',
        });
        if (!name) {
          setName(asset.name.replace(/\.[^/.]+$/, ''));
        }
      }
    } catch (error) {
      console.error('Error picking document:', error);
      Alert.alert('Error', 'Failed to pick document. Please try again.');
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleSave = async () => {
    if (!name.trim()) {
      Alert.alert('Required', 'Please enter a name for this document.');
      return;
    }
    if (!selectedFile) {
      Alert.alert('Required', 'Please select a document to upload.');
      return;
    }

    setSaving(true);
    try {
      await CaseStorage.saveDocument({
        caseId: selectedCaseId,
        name: name.trim(),
        type,
        uri: selectedFile.uri,
        fileSize: selectedFile.size,
        mimeType: selectedFile.mimeType,
        notes: notes.trim(),
      });
      
      Alert.alert('Success', 'Document saved successfully!', [
        { text: 'OK', onPress: () => router.back() }
      ]);
    } catch (error) {
      console.error('Error saving document:', error);
      Alert.alert('Error', 'Failed to save document. Please try again.');
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
            <Text className="text-xl font-bold text-foreground">Add Document</Text>
            <Text className="text-sm text-muted">Store your case documents securely</Text>
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

          {/* File Picker */}
          <View className="mb-4">
            <Text className="text-sm font-semibold text-foreground mb-2">Document *</Text>
            <TouchableOpacity
              className="bg-surface border-2 border-dashed border-border rounded-xl p-6 items-center"
              onPress={pickDocument}
              activeOpacity={0.7}
            >
              {selectedFile ? (
                <View className="items-center">
                  <View 
                    className="w-12 h-12 rounded-full items-center justify-center mb-2"
                    style={{ backgroundColor: colors.success + '20' }}
                  >
                    <IconSymbol name="checkmark.circle.fill" size={24} color={colors.success} />
                  </View>
                  <Text className="text-sm font-medium text-foreground text-center" numberOfLines={2}>
                    {selectedFile.name}
                  </Text>
                  <Text className="text-xs text-muted mt-1">
                    {formatFileSize(selectedFile.size)}
                  </Text>
                  <Text className="text-xs text-primary mt-2">Tap to change</Text>
                </View>
              ) : (
                <View className="items-center">
                  <View 
                    className="w-12 h-12 rounded-full items-center justify-center mb-2"
                    style={{ backgroundColor: colors.primary + '20' }}
                  >
                    <IconSymbol name="doc.text" size={24} color={colors.primary} />
                  </View>
                  <Text className="text-sm font-medium text-foreground">Tap to select document</Text>
                  <Text className="text-xs text-muted mt-1">PDF, Images, Word documents</Text>
                </View>
              )}
            </TouchableOpacity>
          </View>

          {/* Document Type */}
          <View className="mb-4">
            <Text className="text-sm font-semibold text-foreground mb-2">Document Type</Text>
            <View className="flex-row flex-wrap">
              {typeOptions.map((option) => (
                <TouchableOpacity
                  key={option.value}
                  className={`mr-2 mb-2 px-4 py-2 rounded-full border flex-row items-center ${
                    type === option.value 
                      ? 'bg-primary border-primary' 
                      : 'bg-surface border-border'
                  }`}
                  onPress={() => setType(option.value)}
                  activeOpacity={0.7}
                >
                  <Text className="mr-1">{option.icon}</Text>
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

          {/* Name */}
          <View className="mb-4">
            <Text className="text-sm font-semibold text-foreground mb-2">Document Name *</Text>
            <TextInput
              className="bg-surface border border-border rounded-xl px-4 py-3 text-foreground"
              placeholder="e.g., Bail Release Order"
              placeholderTextColor={colors.muted}
              value={name}
              onChangeText={setName}
            />
          </View>

          {/* Notes */}
          <View className="mb-4">
            <Text className="text-sm font-semibold text-foreground mb-2">Notes</Text>
            <TextInput
              className="bg-surface border border-border rounded-xl px-4 py-3 text-foreground"
              placeholder="Any additional notes about this document..."
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
              {saving ? 'Saving...' : 'Save Document'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Security Notice */}
        <View className="px-4 py-4 mb-4">
          <View className="bg-success/10 rounded-xl p-4 border border-success/30">
            <View className="flex-row items-center mb-2">
              <IconSymbol name="checkmark.shield.fill" size={18} color={colors.success} />
              <Text className="text-sm font-semibold text-foreground ml-2">Secure Storage</Text>
            </View>
            <Text className="text-xs text-muted">
              Your documents are stored securely on your device only. They are not uploaded to any server and remain private to you.
            </Text>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
