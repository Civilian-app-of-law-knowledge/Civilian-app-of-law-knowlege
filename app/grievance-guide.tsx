import { ScrollView, Text, View, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

import { ScreenContainer } from "@/components/screen-container";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useColors } from "@/hooks/use-colors";

export default function GrievanceGuideScreen() {
  const router = useRouter();
  const colors = useColors();

  const grievanceSteps = [
    {
      step: 1,
      title: 'Attempt Informal Resolution',
      description: 'Try to resolve the issue by speaking with staff first',
      details: 'Many facilities require you to attempt informal resolution before filing a formal grievance. Speak with the relevant staff member or supervisor. Document who you spoke with, when, and what was said.',
    },
    {
      step: 2,
      title: 'Obtain Grievance Form',
      description: 'Request the official grievance form',
      details: 'Ask a correctional officer or counselor for the grievance form. Some facilities have them available in the housing unit. Make sure you get the correct form for your type of complaint.',
    },
    {
      step: 3,
      title: 'Complete the Form Carefully',
      description: 'Write clearly and include all relevant details',
      details: 'Be specific about what happened, when, where, and who was involved. Stick to facts, not emotions. Explain what resolution you are seeking. Keep a copy for your records.',
    },
    {
      step: 4,
      title: 'Submit Within Deadline',
      description: 'File within the required timeframe',
      details: 'Most facilities have strict deadlines (often 15-30 days from the incident). Submit to the designated person or location. Get a receipt or acknowledgment if possible.',
    },
    {
      step: 5,
      title: 'Wait for Response',
      description: 'The facility must respond within a set timeframe',
      details: 'Facilities typically have 30-45 days to respond. If you don\'t receive a response, follow up in writing. Keep track of all dates and deadlines.',
    },
    {
      step: 6,
      title: 'Appeal if Necessary',
      description: 'You can appeal an unfavorable decision',
      details: 'If your grievance is denied, you usually have the right to appeal to a higher level. Follow the appeal process exactly as described. There may be multiple levels of appeal.',
    },
  ];

  const whatToGrieve = [
    'Denial of medical care or delayed treatment',
    'Unsafe living conditions',
    'Staff misconduct or abuse',
    'Denial of religious practices',
    'Mail interference or censorship',
    'Improper disciplinary actions',
    'Denial of access to legal materials',
    'Discrimination based on race, religion, etc.',
    'Retaliation for filing previous grievances',
  ];

  const tips = [
    'Be factual and specific - avoid emotional language',
    'Include dates, times, names, and locations',
    'Explain what you want as a resolution',
    'Keep copies of everything you submit',
    'Track all deadlines carefully',
    'Follow each step of the process - don\'t skip levels',
    'If staff won\'t give you forms, document your requests',
    'Consider having someone outside track your grievances',
  ];

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
          <View>
            <Text className="text-xl font-bold text-foreground">Grievance Filing Guide</Text>
            <Text className="text-sm text-muted">How to file complaints properly</Text>
          </View>
        </View>

        {/* What is a Grievance */}
        <View className="px-4 py-4">
          <View className="bg-surface rounded-xl p-4 border border-border">
            <Text className="text-base font-semibold text-foreground mb-2">What is a Grievance?</Text>
            <Text className="text-sm text-muted leading-relaxed">
              A grievance is a formal written complaint about conditions, treatment, or policies in a correctional facility. 
              Filing grievances is a constitutional right and creates an official record of issues. 
              Exhausting the grievance process is often required before you can file a lawsuit.
            </Text>
          </View>
        </View>

        {/* Why It Matters */}
        <View className="px-4 py-2">
          <View className="bg-primary/10 rounded-xl p-4 border border-primary/30">
            <View className="flex-row items-center mb-2">
              <IconSymbol name="exclamationmark.circle" size={18} color={colors.primary} />
              <Text className="text-sm font-semibold text-foreground ml-2">Why Grievances Matter</Text>
            </View>
            <Text className="text-sm text-muted leading-relaxed">
              Under the Prison Litigation Reform Act (PLRA), you must exhaust all administrative remedies 
              (complete the grievance process) before you can file a lawsuit in federal court. 
              Properly filed grievances also create documentation that can support future legal action.
            </Text>
          </View>
        </View>

        {/* Step by Step */}
        <View className="px-4 py-4">
          <Text className="text-lg font-semibold text-foreground mb-3 px-1">Step-by-Step Process</Text>
          {grievanceSteps.map((item, index) => (
            <View key={index} className="bg-surface rounded-xl p-4 mb-3 border border-border">
              <View className="flex-row items-start">
                <View 
                  className="w-8 h-8 rounded-full items-center justify-center mr-3"
                  style={{ backgroundColor: colors.primary }}
                >
                  <Text className="text-sm text-white font-bold">{item.step}</Text>
                </View>
                <View className="flex-1">
                  <Text className="text-base font-semibold text-foreground">{item.title}</Text>
                  <Text className="text-xs text-muted mb-2">{item.description}</Text>
                  <Text className="text-sm text-muted leading-relaxed">{item.details}</Text>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* What Can Be Grieved */}
        <View className="px-4 py-4">
          <Text className="text-lg font-semibold text-foreground mb-3 px-1">What Can Be Grieved</Text>
          <View className="bg-surface rounded-xl p-4 border border-border">
            {whatToGrieve.map((item, index) => (
              <View key={index} className="flex-row items-center mb-2">
                <IconSymbol name="checkmark.circle.fill" size={16} color={colors.success} />
                <Text className="flex-1 text-sm text-foreground ml-2">{item}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Tips for Success */}
        <View className="px-4 py-4">
          <Text className="text-lg font-semibold text-foreground mb-3 px-1">Tips for Success</Text>
          <View className="bg-warning/10 rounded-xl p-4 border border-warning/30">
            {tips.map((tip, index) => (
              <View key={index} className="flex-row items-start mb-2">
                <IconSymbol name="lightbulb" size={16} color={colors.warning} style={{ marginTop: 2 }} />
                <Text className="flex-1 text-sm text-foreground ml-2">{tip}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Retaliation Warning */}
        <View className="px-4 py-4">
          <View className="bg-error/10 rounded-xl p-4 border border-error/30">
            <View className="flex-row items-center mb-2">
              <IconSymbol name="exclamationmark.triangle" size={18} color={colors.error} />
              <Text className="text-sm font-semibold text-foreground ml-2">Retaliation is Illegal</Text>
            </View>
            <Text className="text-sm text-muted leading-relaxed">
              Staff cannot legally retaliate against you for filing grievances. If you experience retaliation 
              (transfers, loss of privileges, harassment), document it and file a separate grievance about the retaliation. 
              This can also be grounds for legal action.
            </Text>
          </View>
        </View>

        {/* Sample Language */}
        <View className="px-4 py-4">
          <Text className="text-lg font-semibold text-foreground mb-3 px-1">Sample Grievance Language</Text>
          <View className="bg-surface rounded-xl p-4 border border-border">
            <View className="bg-background rounded-lg p-4">
              <Text className="text-sm text-foreground leading-relaxed italic">
                "On [DATE] at approximately [TIME], in [LOCATION], [STAFF NAME/TITLE] [describe what happened]. 
                I attempted informal resolution by [describe attempts]. This violates [policy/right]. 
                I am requesting [specific remedy you want]."
              </Text>
            </View>
            <Text className="text-xs text-muted mt-3">
              Adapt this format to your specific situation. Be factual and specific.
            </Text>
          </View>
        </View>

        {/* Ask AI */}
        <View className="px-4 py-4">
          <TouchableOpacity
            className="bg-primary rounded-xl p-4 flex-row items-center justify-center"
            onPress={() => router.push("/assistant" as any)}
            activeOpacity={0.7}
          >
            <IconSymbol name="bubble.left.fill" size={20} color="#FFFFFF" />
            <Text className="text-white font-semibold ml-2">Ask AI About Grievances</Text>
          </TouchableOpacity>
        </View>

        {/* Disclaimer */}
        <View className="px-4 py-4 mb-4">
          <View className="bg-surface rounded-xl p-4 border border-border">
            <View className="flex-row items-start">
              <IconSymbol name="info.circle" size={18} color={colors.muted} style={{ marginTop: 2 }} />
              <Text className="flex-1 text-xs text-muted ml-2 leading-relaxed">
                Grievance procedures vary by facility. Always follow your specific facility's grievance policy. 
                This guide provides general information and does not constitute legal advice.
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
