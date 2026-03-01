import { ScrollView, Text, View, TouchableOpacity, Linking } from "react-native";
import { useRouter } from "expo-router";

import { ScreenContainer } from "@/components/screen-container";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useColors } from "@/hooks/use-colors";

export default function VisitationScreen() {
  const router = useRouter();
  const colors = useColors();

  const visitTypes = [
    {
      title: 'In-Person Visits',
      description: 'Face-to-face visits at the facility',
      details: [
        'Usually held in a designated visiting area',
        'May be contact (can touch) or non-contact (through glass)',
        'Typically 30 minutes to 2 hours depending on facility',
        'Must be on approved visitor list',
      ],
    },
    {
      title: 'Video Visits',
      description: 'Virtual visits via video call',
      details: [
        'Can be done from home or at facility kiosks',
        'Usually 15-30 minutes',
        'Requires account with facility\'s video provider',
        'May have fees per visit',
      ],
    },
    {
      title: 'Professional Visits',
      description: 'Visits from attorneys and legal representatives',
      details: [
        'Generally have more flexible scheduling',
        'May have additional privacy protections',
        'Usually not counted against regular visit limits',
      ],
    },
  ];

  const generalRules = [
    'Bring valid government-issued photo ID',
    'Arrive early (15-30 minutes before scheduled time)',
    'Dress appropriately (no revealing clothing, gang colors, or clothing similar to inmate uniforms)',
    'Leave valuables in your car (most facilities only allow keys, ID, and small amount of cash)',
    'No cell phones or electronics in visiting area',
    'Children must be supervised at all times',
    'No physical contact beyond brief embrace at start/end (for contact visits)',
  ];

  const videoVisitProviders = [
    { name: 'GTL Video Visitation', url: 'https://www.gtl.net/video-visitation/' },
    { name: 'Securus Video Connect', url: 'https://securustech.net/video-visitation/' },
    { name: 'JPay Video Visitation', url: 'https://www.jpay.com/PVideoVisit.aspx' },
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
            <Text className="text-xl font-bold text-foreground">Visitation Information</Text>
            <Text className="text-sm text-muted">How to visit your loved one</Text>
          </View>
        </View>

        {/* Getting Approved */}
        <View className="px-4 py-4">
          <View className="bg-primary/10 rounded-xl p-4 border border-primary/30">
            <Text className="text-base font-semibold text-foreground mb-2">Getting on the Visitor List</Text>
            <Text className="text-sm text-muted leading-relaxed mb-3">
              Before you can visit, you typically need to be approved and added to your loved one's visitor list. 
              This process usually involves:
            </Text>
            <View className="flex-row items-start mb-2">
              <View 
                className="w-5 h-5 rounded-full items-center justify-center mr-2 mt-0.5"
                style={{ backgroundColor: colors.primary }}
              >
                <Text className="text-xs text-white font-bold">1</Text>
              </View>
              <Text className="flex-1 text-sm text-foreground">Your loved one submits your name to be added</Text>
            </View>
            <View className="flex-row items-start mb-2">
              <View 
                className="w-5 h-5 rounded-full items-center justify-center mr-2 mt-0.5"
                style={{ backgroundColor: colors.primary }}
              >
                <Text className="text-xs text-white font-bold">2</Text>
              </View>
              <Text className="flex-1 text-sm text-foreground">Background check is conducted (can take 1-4 weeks)</Text>
            </View>
            <View className="flex-row items-start">
              <View 
                className="w-5 h-5 rounded-full items-center justify-center mr-2 mt-0.5"
                style={{ backgroundColor: colors.primary }}
              >
                <Text className="text-xs text-white font-bold">3</Text>
              </View>
              <Text className="flex-1 text-sm text-foreground">Once approved, you can schedule visits</Text>
            </View>
          </View>
        </View>

        {/* Types of Visits */}
        <View className="px-4 py-2">
          <Text className="text-lg font-semibold text-foreground mb-3 px-1">Types of Visits</Text>
          {visitTypes.map((type, index) => (
            <View key={index} className="bg-surface rounded-xl p-4 mb-3 border border-border">
              <View className="flex-row items-center mb-2">
                <View 
                  className="w-8 h-8 rounded-full items-center justify-center mr-3"
                  style={{ backgroundColor: colors.primary + '20' }}
                >
                  <IconSymbol name="person.fill" size={18} color={colors.primary} />
                </View>
                <View>
                  <Text className="text-base font-semibold text-foreground">{type.title}</Text>
                  <Text className="text-xs text-muted">{type.description}</Text>
                </View>
              </View>
              <View className="mt-2">
                {type.details.map((detail, detailIndex) => (
                  <View key={detailIndex} className="flex-row items-start mb-1">
                    <Text className="text-muted mr-2">•</Text>
                    <Text className="flex-1 text-sm text-muted">{detail}</Text>
                  </View>
                ))}
              </View>
            </View>
          ))}
        </View>

        {/* General Rules */}
        <View className="px-4 py-4">
          <Text className="text-lg font-semibold text-foreground mb-3 px-1">General Visitation Rules</Text>
          <View className="bg-surface rounded-xl p-4 border border-border">
            {generalRules.map((rule, index) => (
              <View key={index} className="flex-row items-start mb-2">
                <IconSymbol name="checkmark.circle.fill" size={16} color={colors.success} style={{ marginTop: 2 }} />
                <Text className="flex-1 text-sm text-foreground ml-2">{rule}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Video Visit Providers */}
        <View className="px-4 py-4">
          <Text className="text-lg font-semibold text-foreground mb-3 px-1">Video Visit Platforms</Text>
          {videoVisitProviders.map((provider, index) => (
            <TouchableOpacity
              key={index}
              className="bg-surface rounded-xl p-4 mb-3 border border-border flex-row items-center"
              onPress={() => Linking.openURL(provider.url)}
              activeOpacity={0.7}
            >
              <View 
                className="w-10 h-10 rounded-full items-center justify-center mr-3"
                style={{ backgroundColor: colors.primary + '20' }}
              >
                <IconSymbol name="person.fill" size={20} color={colors.primary} />
              </View>
              <Text className="flex-1 text-base font-medium text-foreground">{provider.name}</Text>
              <IconSymbol name="arrow.up.right" size={18} color={colors.muted} />
            </TouchableOpacity>
          ))}
        </View>

        {/* Tips */}
        <View className="px-4 py-4">
          <View className="bg-warning/10 rounded-xl p-4 border border-warning/30">
            <View className="flex-row items-center mb-2">
              <IconSymbol name="lightbulb" size={18} color={colors.warning} />
              <Text className="text-sm font-semibold text-foreground ml-2">Helpful Tips</Text>
            </View>
            <Text className="text-sm text-muted leading-relaxed mb-2">
              • Call ahead to confirm visitation hours, especially on holidays
            </Text>
            <Text className="text-sm text-muted leading-relaxed mb-2">
              • If denied entry, ask specifically why so you can correct the issue
            </Text>
            <Text className="text-sm text-muted leading-relaxed mb-2">
              • Bring coins/small bills for vending machines if available
            </Text>
            <Text className="text-sm text-muted leading-relaxed">
              • Be patient - security screening can take time
            </Text>
          </View>
        </View>

        {/* Find Facility */}
        <View className="px-4 py-4">
          <TouchableOpacity
            className="bg-primary rounded-xl p-4 flex-row items-center justify-center"
            onPress={() => router.push("/facilities" as any)}
            activeOpacity={0.7}
          >
            <IconSymbol name="building.columns" size={20} color="#FFFFFF" />
            <Text className="text-white font-semibold ml-2">Find Facility Visitation Hours</Text>
          </TouchableOpacity>
        </View>

        {/* Disclaimer */}
        <View className="px-4 py-4 mb-4">
          <View className="bg-surface rounded-xl p-4 border border-border">
            <View className="flex-row items-start">
              <IconSymbol name="info.circle" size={18} color={colors.muted} style={{ marginTop: 2 }} />
              <Text className="flex-1 text-xs text-muted ml-2 leading-relaxed">
                Visitation rules and hours vary by facility. Always contact the facility directly for the most current information and to schedule visits.
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
