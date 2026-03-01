import { ScrollView, Text, View, TouchableOpacity, TextInput, Alert } from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { ScreenContainer } from "@/components/screen-container";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useColors } from "@/hooks/use-colors";

interface Testimony {
  id: string;
  type: string;
  state: string;
  county: string;
  year: string;
  description: string;
  outcome: string;
  advice: string;
  anonymous: boolean;
  createdAt: string;
}

const TESTIMONIES_KEY = '@civilian_law_testimonies';

export default function SubmitTestimonyScreen() {
  const router = useRouter();
  const colors = useColors();
  
  const [type, setType] = useState('');
  const [state, setState] = useState('');
  const [county, setCounty] = useState('');
  const [year, setYear] = useState('');
  const [description, setDescription] = useState('');
  const [outcome, setOutcome] = useState('');
  const [advice, setAdvice] = useState('');
  const [anonymous, setAnonymous] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const experienceTypes = [
    'Arrest',
    'Traffic Stop',
    'Court Proceeding',
    'Incarceration',
    'Probation/Parole',
    'Expungement',
    'Family Reunification',
    'Reentry',
    'Other'
  ];

  const handleSubmit = async () => {
    if (!type || !description) {
      Alert.alert('Required Fields', 'Please select an experience type and provide a description.');
      return;
    }

    setSubmitting(true);
    try {
      const testimony: Testimony = {
        id: Date.now().toString(),
        type,
        state,
        county,
        year,
        description,
        outcome,
        advice,
        anonymous,
        createdAt: new Date().toISOString(),
      };

      // Save locally
      const existing = await AsyncStorage.getItem(TESTIMONIES_KEY);
      const testimonies: Testimony[] = existing ? JSON.parse(existing) : [];
      testimonies.push(testimony);
      await AsyncStorage.setItem(TESTIMONIES_KEY, JSON.stringify(testimonies));

      Alert.alert(
        'Thank You',
        'Your testimony has been submitted. Your experience will help others navigate the justice system.',
        [{ text: 'OK', onPress: () => router.back() }]
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to submit testimony. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <ScreenContainer>
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="px-4 pt-4 pb-2">
          <TouchableOpacity 
            onPress={() => router.back()}
            className="flex-row items-center mb-4"
          >
            <IconSymbol name="chevron.left" size={20} color={colors.primary} />
            <Text className="text-primary ml-1">Back</Text>
          </TouchableOpacity>
          
          <Text className="text-2xl font-bold text-foreground mb-2">
            Share Your Experience
          </Text>
          <Text className="text-sm text-muted mb-4">
            Your story can help others. Share your experience with the justice system to help educate and empower the community.
          </Text>
        </View>

        {/* Privacy Notice */}
        <View className="px-4 mb-4">
          <View className="bg-primary/10 rounded-xl p-4 border border-primary/30">
            <View className="flex-row items-center mb-2">
              <IconSymbol name="lock.fill" size={16} color={colors.primary} />
              <Text className="text-base font-semibold text-foreground ml-2">Privacy Protected</Text>
            </View>
            <Text className="text-sm text-muted">
              Your submission is stored locally on your device only. No personal information is collected or shared without your explicit consent.
            </Text>
          </View>
        </View>

        {/* Form */}
        <View className="px-4 mb-6">
          {/* Experience Type */}
          <Text className="text-sm font-medium text-foreground mb-2">Type of Experience *</Text>
          <View className="flex-row flex-wrap gap-2 mb-4">
            {experienceTypes.map((t) => (
              <TouchableOpacity
                key={t}
                onPress={() => setType(t)}
                className={`px-3 py-2 rounded-lg border ${type === t ? 'bg-primary border-primary' : 'bg-surface border-border'}`}
              >
                <Text className={type === t ? 'text-white text-sm' : 'text-foreground text-sm'}>{t}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Location */}
          <View className="flex-row gap-3 mb-4">
            <View className="flex-1">
              <Text className="text-sm font-medium text-foreground mb-2">State</Text>
              <TextInput
                className="bg-surface rounded-xl px-4 py-3 text-foreground border border-border"
                placeholder="e.g., California"
                placeholderTextColor={colors.muted}
                value={state}
                onChangeText={setState}
              />
            </View>
            <View className="flex-1">
              <Text className="text-sm font-medium text-foreground mb-2">County</Text>
              <TextInput
                className="bg-surface rounded-xl px-4 py-3 text-foreground border border-border"
                placeholder="e.g., Los Angeles"
                placeholderTextColor={colors.muted}
                value={county}
                onChangeText={setCounty}
              />
            </View>
          </View>

          {/* Year */}
          <Text className="text-sm font-medium text-foreground mb-2">Year</Text>
          <TextInput
            className="bg-surface rounded-xl px-4 py-3 text-foreground border border-border mb-4"
            placeholder="e.g., 2023"
            placeholderTextColor={colors.muted}
            value={year}
            onChangeText={setYear}
            keyboardType="number-pad"
          />

          {/* Description */}
          <Text className="text-sm font-medium text-foreground mb-2">What Happened? *</Text>
          <TextInput
            className="bg-surface rounded-xl px-4 py-3 text-foreground border border-border mb-4"
            placeholder="Describe your experience..."
            placeholderTextColor={colors.muted}
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={6}
            textAlignVertical="top"
            style={{ minHeight: 120 }}
          />

          {/* Outcome */}
          <Text className="text-sm font-medium text-foreground mb-2">Outcome</Text>
          <TextInput
            className="bg-surface rounded-xl px-4 py-3 text-foreground border border-border mb-4"
            placeholder="How did it resolve? What was the result?"
            placeholderTextColor={colors.muted}
            value={outcome}
            onChangeText={setOutcome}
            multiline
            numberOfLines={3}
            textAlignVertical="top"
            style={{ minHeight: 80 }}
          />

          {/* Advice */}
          <Text className="text-sm font-medium text-foreground mb-2">Advice for Others</Text>
          <TextInput
            className="bg-surface rounded-xl px-4 py-3 text-foreground border border-border mb-4"
            placeholder="What would you tell someone in a similar situation?"
            placeholderTextColor={colors.muted}
            value={advice}
            onChangeText={setAdvice}
            multiline
            numberOfLines={3}
            textAlignVertical="top"
            style={{ minHeight: 80 }}
          />

          {/* Anonymous Toggle */}
          <TouchableOpacity
            onPress={() => setAnonymous(!anonymous)}
            className="flex-row items-center bg-surface rounded-xl px-4 py-4 border border-border mb-6"
          >
            <View className={`w-6 h-6 rounded-md border-2 items-center justify-center mr-3 ${anonymous ? 'bg-primary border-primary' : 'border-border'}`}>
              {anonymous && <IconSymbol name="checkmark" size={14} color="#fff" />}
            </View>
            <View className="flex-1">
              <Text className="text-base font-medium text-foreground">Submit Anonymously</Text>
              <Text className="text-xs text-muted">Your identity will not be associated with this submission</Text>
            </View>
          </TouchableOpacity>

          {/* Submit Button */}
          <TouchableOpacity
            onPress={handleSubmit}
            disabled={submitting}
            className={`rounded-xl py-4 items-center ${submitting ? 'bg-muted' : 'bg-primary'}`}
          >
            <Text className="text-white font-semibold text-base">
              {submitting ? 'Submitting...' : 'Submit Testimony'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Disclaimer */}
        <View className="px-4 mb-6">
          <View className="bg-surface rounded-xl p-4 border border-border">
            <View className="flex-row items-start">
              <IconSymbol name="info.circle" size={16} color={colors.muted} style={{ marginTop: 2 }} />
              <Text className="flex-1 text-xs text-muted ml-2">
                By submitting, you confirm this is your own experience and you have the right to share it. 
                This platform does not provide legal advice. For legal matters, consult a licensed attorney.
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
