import { ScrollView, Text, View, TouchableOpacity, Linking } from "react-native";
import { useRouter } from "expo-router";

import { ScreenContainer } from "@/components/screen-container";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useColors } from "@/hooks/use-colors";

export default function CourtRecordsScreen() {
  const router = useRouter();
  const colors = useColors();

  const openLink = (url: string) => {
    Linking.openURL(url);
  };

  const federalCourts = [
    { name: 'PACER', description: 'Federal court records (all districts)', url: 'https://pacer.uscourts.gov/', note: 'Small fee per page' },
    { name: 'RECAP Archive', description: 'Free federal court records', url: 'https://www.courtlistener.com/recap/', note: 'Free alternative to PACER' },
    { name: 'Supreme Court', description: 'U.S. Supreme Court docket', url: 'https://www.supremecourt.gov/docket/docket.aspx', note: 'Free' },
  ];

  const stateCourtSystems = [
    { state: 'CA', name: 'California Courts', url: 'https://www.courts.ca.gov/find-my-court.htm' },
    { state: 'TX', name: 'Texas Courts Online', url: 'https://www.txcourts.gov/case-search/' },
    { state: 'FL', name: 'Florida Courts', url: 'https://www.flcourts.org/' },
    { state: 'NY', name: 'NY Court System', url: 'https://iapps.courts.state.ny.us/webcivil/ecourtsMain' },
    { state: 'PA', name: 'PA Unified Judicial System', url: 'https://ujsportal.pacourts.us/' },
    { state: 'IL', name: 'Illinois Courts', url: 'https://www.illinoiscourts.gov/' },
    { state: 'OH', name: 'Ohio Courts', url: 'https://www.supremecourt.ohio.gov/' },
    { state: 'GA', name: 'Georgia Courts', url: 'https://www.georgiacourts.gov/' },
    { state: 'NC', name: 'North Carolina Courts', url: 'https://www.nccourts.gov/' },
    { state: 'MI', name: 'Michigan Courts', url: 'https://courts.michigan.gov/' },
    { state: 'NJ', name: 'New Jersey Courts', url: 'https://www.njcourts.gov/' },
    { state: 'VA', name: 'Virginia Courts', url: 'https://www.vacourts.gov/' },
    { state: 'WA', name: 'Washington Courts', url: 'https://www.courts.wa.gov/' },
    { state: 'AZ', name: 'Arizona Courts', url: 'https://www.azcourts.gov/' },
    { state: 'MA', name: 'Massachusetts Courts', url: 'https://www.mass.gov/orgs/trial-court' },
  ];

  const freeResources = [
    { name: 'CourtListener', description: 'Free legal opinions and court records', url: 'https://www.courtlistener.com/' },
    { name: 'Google Scholar', description: 'Search legal opinions', url: 'https://scholar.google.com/' },
    { name: 'Justia', description: 'Free case law and legal information', url: 'https://www.justia.com/' },
    { name: 'FindLaw', description: 'Legal information and case summaries', url: 'https://www.findlaw.com/' },
    { name: 'Casetext', description: 'Legal research platform', url: 'https://casetext.com/' },
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
            Court Records Lookup
          </Text>
          <Text className="text-sm text-muted mb-4">
            Search court records, case dockets, and legal documents. Find information about any case in federal or state courts.
          </Text>
        </View>

        {/* Federal Courts */}
        <View className="px-4 mb-6">
          <Text className="text-lg font-bold text-foreground mb-3">Federal Court Records</Text>
          
          {federalCourts.map((court, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => openLink(court.url)}
              className="bg-surface rounded-xl p-4 mb-3 border border-border"
            >
              <View className="flex-row items-center justify-between">
                <View className="flex-1">
                  <Text className="text-base font-semibold text-foreground">{court.name}</Text>
                  <Text className="text-sm text-muted">{court.description}</Text>
                  <Text className="text-xs text-primary mt-1">{court.note}</Text>
                </View>
                <IconSymbol name="arrow.up.right" size={18} color={colors.primary} />
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* State Courts */}
        <View className="px-4 mb-6">
          <Text className="text-lg font-bold text-foreground mb-3">State Court Systems</Text>
          
          <View className="flex-row flex-wrap gap-2">
            {stateCourtSystems.map((court, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => openLink(court.url)}
                className="bg-surface rounded-lg px-3 py-2 border border-border flex-row items-center"
              >
                <Text className="text-primary font-bold mr-2">{court.state}</Text>
                <IconSymbol name="arrow.up.right" size={12} color={colors.muted} />
              </TouchableOpacity>
            ))}
          </View>
          
          <Text className="text-xs text-muted mt-3">
            Tap a state to access their court records system. Most states offer free basic case lookup.
          </Text>
        </View>

        {/* Free Resources */}
        <View className="px-4 mb-6">
          <Text className="text-lg font-bold text-foreground mb-3">Free Legal Research</Text>
          
          {freeResources.map((resource, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => openLink(resource.url)}
              className="bg-surface rounded-xl p-4 mb-3 border border-border flex-row items-center"
            >
              <View className="flex-1">
                <Text className="text-base font-semibold text-foreground">{resource.name}</Text>
                <Text className="text-sm text-muted">{resource.description}</Text>
              </View>
              <IconSymbol name="arrow.up.right" size={18} color={colors.muted} />
            </TouchableOpacity>
          ))}
        </View>

        {/* Tips */}
        <View className="px-4 mb-6">
          <View className="bg-primary/10 rounded-xl p-4 border border-primary/30">
            <Text className="text-base font-semibold text-foreground mb-2">Search Tips</Text>
            <View className="gap-2">
              <View className="flex-row items-start">
                <Text className="text-primary mr-2">•</Text>
                <Text className="text-sm text-muted flex-1">Use exact case numbers when available (e.g., 2:24-cv-01234)</Text>
              </View>
              <View className="flex-row items-start">
                <Text className="text-primary mr-2">•</Text>
                <Text className="text-sm text-muted flex-1">Try different name spellings if initial search fails</Text>
              </View>
              <View className="flex-row items-start">
                <Text className="text-primary mr-2">•</Text>
                <Text className="text-sm text-muted flex-1">Criminal cases are often in separate systems from civil cases</Text>
              </View>
              <View className="flex-row items-start">
                <Text className="text-primary mr-2">•</Text>
                <Text className="text-sm text-muted flex-1">Some records may be sealed or restricted from public access</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
