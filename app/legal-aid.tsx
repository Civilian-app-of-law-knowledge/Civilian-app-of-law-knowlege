import { ScrollView, Text, View, TouchableOpacity, Linking } from "react-native";
import { useRouter } from "expo-router";

import { ScreenContainer } from "@/components/screen-container";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useColors } from "@/hooks/use-colors";
import { legalAidOrgs } from "@/data/legal-content";

export default function LegalAidScreen() {
  const router = useRouter();
  const colors = useColors();

  const openLink = (url: string) => {
    Linking.openURL(url);
  };

  const callPhone = (phone: string) => {
    Linking.openURL(`tel:${phone.replace(/[^0-9]/g, '')}`);
  };

  const nationalResources = [
    { name: 'Legal Services Corporation', description: 'Find free legal aid in your area', url: 'https://www.lsc.gov/find-legal-aid', phone: '202-295-1500' },
    { name: 'LawHelp.org', description: 'Free legal help by state', url: 'https://www.lawhelp.org/', phone: null },
    { name: 'American Bar Association', description: 'Free legal help directory', url: 'https://www.americanbar.org/groups/legal_services/flh-home/', phone: null },
    { name: 'Avvo', description: 'Free legal advice from attorneys', url: 'https://www.avvo.com/', phone: null },
    { name: 'ACLU', description: 'Civil liberties legal assistance', url: 'https://www.aclu.org/', phone: '212-549-2500' },
    { name: 'NAACP Legal Defense Fund', description: 'Racial justice litigation', url: 'https://www.naacpldf.org/', phone: '212-965-2200' },
  ];

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
            Free Legal Aid
          </Text>
          <Text className="text-sm text-muted mb-4">
            Find free or low-cost legal help. Many organizations provide free legal services for those who qualify based on income.
          </Text>
        </View>

        {/* National Resources */}
        <View className="px-4 mb-6">
          <Text className="text-lg font-bold text-foreground mb-3">National Resources</Text>
          
          {nationalResources.map((resource, index) => (
            <View key={index} className="bg-surface rounded-xl p-4 mb-3 border border-border">
              <Text className="text-base font-semibold text-foreground mb-1">{resource.name}</Text>
              <Text className="text-sm text-muted mb-3">{resource.description}</Text>
              
              <View className="flex-row gap-2">
                <TouchableOpacity
                  onPress={() => openLink(resource.url)}
                  className="bg-primary rounded-lg px-3 py-2 flex-row items-center"
                >
                  <IconSymbol name="globe" size={14} color="#fff" />
                  <Text className="text-white text-xs font-medium ml-1">Visit Website</Text>
                </TouchableOpacity>
                
                {resource.phone && (
                  <TouchableOpacity
                    onPress={() => callPhone(resource.phone!)}
                    className="bg-surface rounded-lg px-3 py-2 flex-row items-center border border-border"
                  >
                    <IconSymbol name="phone" size={14} color={colors.primary} />
                    <Text className="text-primary text-xs font-medium ml-1">{resource.phone}</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          ))}
        </View>

        {/* State Legal Aid */}
        <View className="px-4 mb-6">
          <Text className="text-lg font-bold text-foreground mb-3">State Legal Aid Organizations</Text>
          
          {legalAidOrgs.map((org) => (
            <View key={org.id} className="bg-surface rounded-xl p-4 mb-3 border border-border">
              <View className="flex-row items-center mb-2">
                <View 
                  className="w-8 h-8 rounded-lg items-center justify-center mr-3"
                  style={{ backgroundColor: colors.primary + '15' }}
                >
                  <Text className="text-primary font-bold text-xs">{org.state}</Text>
                </View>
                <Text className="text-base font-semibold text-foreground flex-1">{org.name}</Text>
              </View>
              
              <View className="flex-row flex-wrap gap-1 mb-3">
                {org.services.map((service, idx) => (
                  <View key={idx} className="bg-background rounded px-2 py-1">
                    <Text className="text-xs text-muted">{service}</Text>
                  </View>
                ))}
              </View>
              
              <View className="flex-row gap-2">
                <TouchableOpacity
                  onPress={() => openLink(org.website)}
                  className="bg-primary rounded-lg px-3 py-2 flex-row items-center"
                >
                  <IconSymbol name="globe" size={14} color="#fff" />
                  <Text className="text-white text-xs font-medium ml-1">Website</Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                  onPress={() => callPhone(org.phone)}
                  className="bg-surface rounded-lg px-3 py-2 flex-row items-center border border-border"
                >
                  <IconSymbol name="phone" size={14} color={colors.primary} />
                  <Text className="text-primary text-xs font-medium ml-1">{org.phone}</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>

        {/* Tips */}
        <View className="px-4 mb-6">
          <View className="bg-primary/10 rounded-xl p-4 border border-primary/30">
            <Text className="text-base font-semibold text-foreground mb-2">How to Get Free Legal Help</Text>
            <View className="gap-2">
              <View className="flex-row items-start">
                <Text className="text-primary mr-2">1.</Text>
                <Text className="text-sm text-muted flex-1">Check if you qualify based on income (usually 125-200% of poverty level)</Text>
              </View>
              <View className="flex-row items-start">
                <Text className="text-primary mr-2">2.</Text>
                <Text className="text-sm text-muted flex-1">Gather documents: ID, proof of income, case documents</Text>
              </View>
              <View className="flex-row items-start">
                <Text className="text-primary mr-2">3.</Text>
                <Text className="text-sm text-muted flex-1">Call or apply online - many have intake hotlines</Text>
              </View>
              <View className="flex-row items-start">
                <Text className="text-primary mr-2">4.</Text>
                <Text className="text-sm text-muted flex-1">If denied, ask for referrals to other resources</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Disclaimer */}
        <View className="px-4 mb-6">
          <View className="bg-surface rounded-xl p-4 border border-border">
            <View className="flex-row items-start">
              <IconSymbol name="info.circle" size={16} color={colors.muted} style={{ marginTop: 2 }} />
              <Text className="flex-1 text-xs text-muted ml-2">
                Legal aid organizations have limited resources and may not be able to take every case. 
                If one organization cannot help, try others or ask for referrals.
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
