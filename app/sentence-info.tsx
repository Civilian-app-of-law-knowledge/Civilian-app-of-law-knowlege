import { ScrollView, Text, View, TouchableOpacity, Linking } from "react-native";
import { useRouter } from "expo-router";

import { ScreenContainer } from "@/components/screen-container";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useColors } from "@/hooks/use-colors";

export default function SentenceInfoScreen() {
  const router = useRouter();
  const colors = useColors();

  const federalCredits = [
    {
      title: 'Good Conduct Time (GCT)',
      description: 'Up to 54 days per year for good behavior',
      details: 'Inmates serving more than 1 year can earn up to 54 days per year of good conduct time. This is calculated based on the sentence imposed, not time served. GCT can be lost for disciplinary infractions.',
    },
    {
      title: 'First Step Act Time Credits (FSA)',
      description: 'Earn credits through programming',
      details: 'Eligible inmates can earn 10-15 days of time credits for every 30 days of participation in evidence-based recidivism reduction programs. Credits can be applied toward early transfer to supervised release or halfway house.',
    },
    {
      title: 'Jail Credit',
      description: 'Credit for time served before sentencing',
      details: 'Time spent in custody before sentencing (pre-trial detention) is typically credited toward the sentence. This should be calculated automatically but verify with your case manager.',
    },
  ];

  const stateVariations = [
    { state: 'Pennsylvania', credit: 'Up to 5 days per month for good behavior' },
    { state: 'California', credit: 'Day-for-day credit for many offenses (50%)' },
    { state: 'Texas', credit: 'Varies by offense class, up to 30 days/month' },
    { state: 'Florida', credit: 'Up to 10 days per month for gain time' },
    { state: 'New York', credit: 'Up to 1/3 off sentence for good behavior' },
  ];

  const importantTerms = [
    { term: 'Minimum Release Date', definition: 'Earliest possible release date with all credits applied' },
    { term: 'Maximum Release Date', definition: 'Latest release date if no credits earned' },
    { term: 'Projected Release Date', definition: 'Estimated release based on current credits' },
    { term: 'Parole Eligibility', definition: 'Date when eligible to be considered for parole (if applicable)' },
    { term: 'Mandatory Release', definition: 'Required release date under certain sentencing laws' },
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
            <Text className="text-xl font-bold text-foreground">Sentence & Time Credits</Text>
            <Text className="text-sm text-muted">Understanding good time and release dates</Text>
          </View>
        </View>

        {/* Overview */}
        <View className="px-4 py-4">
          <View className="bg-surface rounded-xl p-4 border border-border">
            <Text className="text-base font-semibold text-foreground mb-2">How Time Credits Work</Text>
            <Text className="text-sm text-muted leading-relaxed">
              Most inmates can earn time off their sentence through good behavior and program participation. 
              The amount varies significantly between federal and state systems, and among different states. 
              Understanding your specific situation requires knowing which system you're in and what credits apply.
            </Text>
          </View>
        </View>

        {/* Federal Credits */}
        <View className="px-4 py-2">
          <Text className="text-lg font-semibold text-foreground mb-3 px-1">Federal System Credits</Text>
          {federalCredits.map((credit, index) => (
            <View key={index} className="bg-surface rounded-xl p-4 mb-3 border border-border">
              <View className="flex-row items-center mb-2">
                <View 
                  className="w-8 h-8 rounded-full items-center justify-center mr-3"
                  style={{ backgroundColor: colors.primary + '20' }}
                >
                  <IconSymbol name="clock" size={18} color={colors.primary} />
                </View>
                <View className="flex-1">
                  <Text className="text-base font-semibold text-foreground">{credit.title}</Text>
                  <Text className="text-xs text-muted">{credit.description}</Text>
                </View>
              </View>
              <Text className="text-sm text-muted leading-relaxed">{credit.details}</Text>
            </View>
          ))}
        </View>

        {/* First Step Act Info */}
        <View className="px-4 py-4">
          <View className="bg-primary/10 rounded-xl p-4 border border-primary/30">
            <View className="flex-row items-center mb-2">
              <IconSymbol name="info.circle" size={18} color={colors.primary} />
              <Text className="text-sm font-semibold text-foreground ml-2">First Step Act (Federal)</Text>
            </View>
            <Text className="text-sm text-muted leading-relaxed mb-3">
              The First Step Act of 2018 expanded opportunities for federal inmates to earn time credits. 
              Not everyone is eligible - certain convictions are excluded. 
              Speak with your case manager about your eligibility and available programs.
            </Text>
            <TouchableOpacity
              onPress={() => Linking.openURL('https://www.bop.gov/inmates/fsa/')}
              activeOpacity={0.7}
            >
              <Text className="text-sm font-medium" style={{ color: colors.primary }}>
                Learn more at BOP.gov →
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* State Variations */}
        <View className="px-4 py-4">
          <Text className="text-lg font-semibold text-foreground mb-3 px-1">State System Examples</Text>
          <View className="bg-surface rounded-xl border border-border overflow-hidden">
            {stateVariations.map((item, index) => (
              <View 
                key={index} 
                className={`p-4 flex-row items-center justify-between ${
                  index < stateVariations.length - 1 ? 'border-b border-border' : ''
                }`}
              >
                <Text className="text-sm font-medium text-foreground">{item.state}</Text>
                <Text className="text-sm text-muted flex-1 text-right">{item.credit}</Text>
              </View>
            ))}
          </View>
          <Text className="text-xs text-muted mt-2 px-1">
            State laws vary significantly. Contact your facility or DOC for specific information.
          </Text>
        </View>

        {/* Important Terms */}
        <View className="px-4 py-4">
          <Text className="text-lg font-semibold text-foreground mb-3 px-1">Key Terms</Text>
          <View className="bg-surface rounded-xl border border-border overflow-hidden">
            {importantTerms.map((item, index) => (
              <View 
                key={index} 
                className={`p-4 ${
                  index < importantTerms.length - 1 ? 'border-b border-border' : ''
                }`}
              >
                <Text className="text-sm font-semibold text-foreground mb-1">{item.term}</Text>
                <Text className="text-sm text-muted">{item.definition}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* How to Check */}
        <View className="px-4 py-4">
          <Text className="text-lg font-semibold text-foreground mb-3 px-1">How to Check Your Time</Text>
          <View className="bg-surface rounded-xl p-4 border border-border">
            <View className="flex-row items-start mb-3">
              <View 
                className="w-6 h-6 rounded-full items-center justify-center mr-3 mt-0.5"
                style={{ backgroundColor: colors.primary }}
              >
                <Text className="text-xs text-white font-bold">1</Text>
              </View>
              <Text className="flex-1 text-sm text-foreground">
                Request a sentence computation from your case manager or counselor
              </Text>
            </View>
            <View className="flex-row items-start mb-3">
              <View 
                className="w-6 h-6 rounded-full items-center justify-center mr-3 mt-0.5"
                style={{ backgroundColor: colors.primary }}
              >
                <Text className="text-xs text-white font-bold">2</Text>
              </View>
              <Text className="flex-1 text-sm text-foreground">
                Review the computation for accuracy - check jail credit, GCT, and any other credits
              </Text>
            </View>
            <View className="flex-row items-start mb-3">
              <View 
                className="w-6 h-6 rounded-full items-center justify-center mr-3 mt-0.5"
                style={{ backgroundColor: colors.primary }}
              >
                <Text className="text-xs text-white font-bold">3</Text>
              </View>
              <Text className="flex-1 text-sm text-foreground">
                If you believe there's an error, file an administrative remedy (grievance)
              </Text>
            </View>
            <View className="flex-row items-start">
              <View 
                className="w-6 h-6 rounded-full items-center justify-center mr-3 mt-0.5"
                style={{ backgroundColor: colors.primary }}
              >
                <Text className="text-xs text-white font-bold">4</Text>
              </View>
              <Text className="flex-1 text-sm text-foreground">
                Family members can also request information through official channels
              </Text>
            </View>
          </View>
        </View>

        {/* Warning */}
        <View className="px-4 py-4">
          <View className="bg-warning/10 rounded-xl p-4 border border-warning/30">
            <View className="flex-row items-center mb-2">
              <IconSymbol name="exclamationmark.triangle" size={18} color={colors.warning} />
              <Text className="text-sm font-semibold text-foreground ml-2">Important Warning</Text>
            </View>
            <Text className="text-sm text-muted leading-relaxed">
              Good time credits can be lost for disciplinary infractions. Serious violations can result in 
              loss of all accumulated good time. Always understand the consequences before any action that 
              could result in disciplinary charges.
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
            <Text className="text-white font-semibold ml-2">Ask AI About Sentencing</Text>
          </TouchableOpacity>
        </View>

        {/* Disclaimer */}
        <View className="px-4 py-4 mb-4">
          <View className="bg-surface rounded-xl p-4 border border-border">
            <View className="flex-row items-start">
              <IconSymbol name="info.circle" size={18} color={colors.muted} style={{ marginTop: 2 }} />
              <Text className="flex-1 text-xs text-muted ml-2 leading-relaxed">
                Sentence calculations are complex and vary by jurisdiction. This information is general guidance only. 
                Always verify your specific situation with your case manager or an attorney.
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
