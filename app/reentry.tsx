import { ScrollView, Text, View, TouchableOpacity, Linking } from "react-native";
import { useRouter } from "expo-router";

import { ScreenContainer } from "@/components/screen-container";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useColors } from "@/hooks/use-colors";

export default function ReentryScreen() {
  const router = useRouter();
  const colors = useColors();

  const reentryCategories = [
    {
      title: 'Identification Documents',
      icon: 'doc.text',
      items: [
        { name: 'Birth Certificate', description: 'Contact vital records in your birth state', tip: 'Many facilities help obtain this before release' },
        { name: 'Social Security Card', description: 'Visit SSA.gov or local Social Security office', tip: 'Free replacement, need proof of identity' },
        { name: 'State ID / Driver\'s License', description: 'Visit your state DMV', tip: 'Some states offer ID assistance programs for returning citizens' },
      ],
    },
    {
      title: 'Housing',
      icon: 'building.columns',
      items: [
        { name: 'Halfway Houses', description: 'Transitional housing with support services', tip: 'Often arranged before release through case manager' },
        { name: 'Reentry Housing Programs', description: 'Nonprofits offering housing assistance', tip: 'Apply early - waitlists can be long' },
        { name: 'Public Housing', description: 'May be available depending on conviction type', tip: 'Some housing authorities have "ban the box" policies' },
      ],
    },
    {
      title: 'Employment',
      icon: 'briefcase',
      items: [
        { name: 'Second Chance Employers', description: 'Companies that hire people with records', tip: 'Many large companies have fair chance hiring policies' },
        { name: 'Workforce Development', description: 'Job training and placement programs', tip: 'Check local American Job Centers' },
        { name: 'Entrepreneurship', description: 'Starting your own business', tip: 'Some programs offer microloans for returning citizens' },
      ],
    },
    {
      title: 'Benefits & Support',
      icon: 'heart.fill',
      items: [
        { name: 'SNAP (Food Stamps)', description: 'Nutrition assistance', tip: 'Eligibility varies by state and conviction' },
        { name: 'Medicaid', description: 'Health insurance for low-income individuals', tip: 'Apply immediately upon release' },
        { name: 'Social Security', description: 'If you had benefits before incarceration', tip: 'Benefits can be reinstated - contact SSA' },
      ],
    },
  ];

  const nationalResources = [
    { name: 'National Reentry Resource Center', url: 'https://nationalreentryresourcecenter.org/', description: 'Comprehensive reentry information' },
    { name: 'Help For Felons', url: 'https://helpforfelons.org/', description: 'Jobs, housing, and assistance for people with records' },
    { name: 'Reentry Council', url: 'https://csgjusticecenter.org/reentry/', description: 'Policy and program resources' },
    { name: 'Legal Action Center', url: 'https://lac.org/', description: 'Legal rights for people with criminal records' },
  ];

  const preReleaseChecklist = [
    'Request copies of all important documents (medical records, certificates earned)',
    'Confirm release date and transportation arrangements',
    'Set up contact with parole/probation officer if applicable',
    'Arrange housing - even temporary',
    'Identify immediate support contacts (family, reentry programs)',
    'Get prescription medications for at least 30 days',
    'Obtain any money owed from commissary account',
    'Get copies of certificates for programs completed',
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
            <Text className="text-xl font-bold text-foreground">Reentry Resources</Text>
            <Text className="text-sm text-muted">Preparing for life after release</Text>
          </View>
        </View>

        {/* Introduction */}
        <View className="px-4 py-4">
          <View className="bg-primary/10 rounded-xl p-4 border border-primary/30">
            <Text className="text-sm text-foreground leading-relaxed">
              Successful reentry starts with planning. Whether you're preparing for release or supporting 
              a loved one, these resources can help navigate the transition back to the community.
            </Text>
          </View>
        </View>

        {/* Categories */}
        {reentryCategories.map((category, catIndex) => (
          <View key={catIndex} className="px-4 py-2">
            <View className="flex-row items-center mb-3 px-1">
              <View 
                className="w-8 h-8 rounded-full items-center justify-center mr-2"
                style={{ backgroundColor: colors.primary + '20' }}
              >
                <IconSymbol name={category.icon as any} size={18} color={colors.primary} />
              </View>
              <Text className="text-lg font-semibold text-foreground">{category.title}</Text>
            </View>
            {category.items.map((item, itemIndex) => (
              <View key={itemIndex} className="bg-surface rounded-xl p-4 mb-2 border border-border">
                <Text className="text-base font-semibold text-foreground mb-1">{item.name}</Text>
                <Text className="text-sm text-muted mb-2">{item.description}</Text>
                <View className="flex-row items-start bg-background rounded-lg p-2">
                  <IconSymbol name="lightbulb" size={14} color={colors.warning} style={{ marginTop: 2 }} />
                  <Text className="flex-1 text-xs text-muted ml-2">{item.tip}</Text>
                </View>
              </View>
            ))}
          </View>
        ))}

        {/* Pre-Release Checklist */}
        <View className="px-4 py-4">
          <Text className="text-lg font-semibold text-foreground mb-3 px-1">Pre-Release Checklist</Text>
          <View className="bg-surface rounded-xl p-4 border border-border">
            {preReleaseChecklist.map((item, index) => (
              <View key={index} className="flex-row items-start mb-3">
                <View 
                  className="w-5 h-5 rounded border-2 mr-3 mt-0.5"
                  style={{ borderColor: colors.border }}
                />
                <Text className="flex-1 text-sm text-foreground">{item}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* National Resources */}
        <View className="px-4 py-4">
          <Text className="text-lg font-semibold text-foreground mb-3 px-1">National Resources</Text>
          {nationalResources.map((resource, index) => (
            <TouchableOpacity
              key={index}
              className="bg-surface rounded-xl p-4 mb-3 border border-border flex-row items-center"
              onPress={() => Linking.openURL(resource.url)}
              activeOpacity={0.7}
            >
              <View 
                className="w-10 h-10 rounded-full items-center justify-center mr-3"
                style={{ backgroundColor: colors.primary + '20' }}
              >
                <IconSymbol name="link" size={20} color={colors.primary} />
              </View>
              <View className="flex-1">
                <Text className="text-base font-semibold text-foreground">{resource.name}</Text>
                <Text className="text-sm text-muted">{resource.description}</Text>
              </View>
              <IconSymbol name="arrow.up.right" size={18} color={colors.muted} />
            </TouchableOpacity>
          ))}
        </View>

        {/* Rights After Release */}
        <View className="px-4 py-4">
          <View className="bg-warning/10 rounded-xl p-4 border border-warning/30">
            <View className="flex-row items-center mb-2">
              <IconSymbol name="shield.fill" size={18} color={colors.warning} />
              <Text className="text-sm font-semibold text-foreground ml-2">Know Your Rights</Text>
            </View>
            <Text className="text-sm text-muted leading-relaxed mb-2">
              Many rights are restored after completing your sentence. These may include:
            </Text>
            <Text className="text-sm text-muted leading-relaxed">
              • Voting rights (varies by state){'\n'}
              • Right to serve on a jury (after waiting period){'\n'}
              • Certain professional licenses{'\n'}
              • Expungement or sealing of records (in some cases)
            </Text>
            <TouchableOpacity
              className="mt-3"
              onPress={() => router.push("/rights" as any)}
              activeOpacity={0.7}
            >
              <Text className="text-sm font-medium" style={{ color: colors.primary }}>
                Learn more about your rights →
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* For Family Members */}
        <View className="px-4 py-4">
          <View className="bg-surface rounded-xl p-4 border border-border">
            <View className="flex-row items-center mb-2">
              <IconSymbol name="heart.fill" size={18} color={colors.error} />
              <Text className="text-sm font-semibold text-foreground ml-2">For Family Members</Text>
            </View>
            <Text className="text-sm text-muted leading-relaxed">
              Supporting a loved one's reentry is challenging but important. Consider:{'\n\n'}
              • Having realistic expectations about the adjustment period{'\n'}
              • Helping with practical needs (transportation, appointments){'\n'}
              • Being patient with the reintegration process{'\n'}
              • Connecting them with support groups and resources{'\n'}
              • Taking care of your own wellbeing too
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
            <Text className="text-white font-semibold ml-2">Ask AI About Reentry</Text>
          </TouchableOpacity>
        </View>

        {/* Disclaimer */}
        <View className="px-4 py-4 mb-4">
          <View className="bg-surface rounded-xl p-4 border border-border">
            <View className="flex-row items-start">
              <IconSymbol name="info.circle" size={18} color={colors.muted} style={{ marginTop: 2 }} />
              <Text className="flex-1 text-xs text-muted ml-2 leading-relaxed">
                Eligibility for programs and benefits varies by location and individual circumstances. 
                Always verify current requirements with the specific program or agency.
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
