import { ScrollView, Text, View, TouchableOpacity, Linking, TextInput } from "react-native";
import { useRouter } from "expo-router";
import { useState, useMemo } from "react";

import { ScreenContainer } from "@/components/screen-container";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useColors } from "@/hooks/use-colors";
import { stateInmateLookups } from "@/data/legal-content";

export default function StateLookupScreen() {
  const router = useRouter();
  const colors = useColors();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredStates = useMemo(() => {
    if (!searchQuery.trim()) return stateInmateLookups;
    const query = searchQuery.toLowerCase();
    return stateInmateLookups.filter(
      s => s.state.toLowerCase().includes(query) || 
           s.stateCode.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  const openLink = (url: string) => {
    Linking.openURL(url);
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
            State Inmate Lookup
          </Text>
          <Text className="text-sm text-muted mb-4">
            Find inmates in any state using official Department of Corrections portals. All links go directly to official government websites.
          </Text>

          {/* Search */}
          <View className="bg-surface rounded-xl px-4 py-3 flex-row items-center border border-border mb-4">
            <IconSymbol name="magnifyingglass" size={18} color={colors.muted} />
            <TextInput
              className="flex-1 ml-3 text-foreground"
              placeholder="Search by state name..."
              placeholderTextColor={colors.muted}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
        </View>

        {/* Federal BOP - Featured */}
        <View className="px-4 mb-4">
          <TouchableOpacity
            onPress={() => openLink('https://www.bop.gov/inmateloc/')}
            className="bg-primary/10 rounded-xl p-4 border-2 border-primary"
          >
            <View className="flex-row items-center mb-2">
              <View className="w-10 h-10 rounded-full bg-primary items-center justify-center mr-3">
                <IconSymbol name="building.columns" size={20} color="#fff" />
              </View>
              <View className="flex-1">
                <Text className="text-lg font-bold text-foreground">Federal BOP Inmate Locator</Text>
                <Text className="text-sm text-muted">All federal prison inmates</Text>
              </View>
              <IconSymbol name="arrow.up.right" size={18} color={colors.primary} />
            </View>
            <Text className="text-xs text-muted">bop.gov/inmateloc</Text>
          </TouchableOpacity>
        </View>

        {/* VINE Link */}
        <View className="px-4 mb-4">
          <TouchableOpacity
            onPress={() => openLink('https://www.vinelink.com/')}
            className="bg-surface rounded-xl p-4 border border-border"
          >
            <View className="flex-row items-center">
              <View 
                className="w-10 h-10 rounded-full items-center justify-center mr-3"
                style={{ backgroundColor: colors.warning + '20' }}
              >
                <IconSymbol name="bell" size={20} color={colors.warning} />
              </View>
              <View className="flex-1">
                <Text className="text-base font-semibold text-foreground">VINE - Victim Notification</Text>
                <Text className="text-xs text-muted">Get notified when an offender's custody status changes</Text>
              </View>
              <IconSymbol name="arrow.up.right" size={18} color={colors.muted} />
            </View>
          </TouchableOpacity>
        </View>

        {/* State List */}
        <View className="px-4 mb-4">
          <Text className="text-lg font-bold text-foreground mb-3">All 50 States</Text>
          
          {filteredStates.map((state) => (
            <View key={state.id} className="bg-surface rounded-xl mb-3 border border-border overflow-hidden">
              <View className="p-4">
                <View className="flex-row items-center mb-2">
                  <View 
                    className="w-10 h-10 rounded-lg items-center justify-center mr-3"
                    style={{ backgroundColor: colors.primary + '15' }}
                  >
                    <Text className="text-primary font-bold">{state.stateCode}</Text>
                  </View>
                  <View className="flex-1">
                    <Text className="text-base font-semibold text-foreground">{state.state}</Text>
                    <Text className="text-xs text-muted" numberOfLines={1}>{state.portalName}</Text>
                  </View>
                </View>
                
                <Text className="text-xs text-muted mb-3">{state.notes}</Text>
                
                <View className="flex-row flex-wrap gap-2">
                  <TouchableOpacity
                    onPress={() => openLink(state.portalUrl)}
                    className="bg-primary rounded-lg px-3 py-2 flex-row items-center"
                  >
                    <IconSymbol name="magnifyingglass" size={14} color="#fff" />
                    <Text className="text-white text-xs font-medium ml-1">Inmate Search</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity
                    onPress={() => openLink(state.docWebsite)}
                    className="bg-surface rounded-lg px-3 py-2 flex-row items-center border border-border"
                  >
                    <IconSymbol name="globe" size={14} color={colors.muted} />
                    <Text className="text-muted text-xs font-medium ml-1">DOC Website</Text>
                  </TouchableOpacity>
                  
                  {state.vineLink && (
                    <TouchableOpacity
                      onPress={() => openLink(state.vineLink!)}
                      className="bg-surface rounded-lg px-3 py-2 flex-row items-center border border-border"
                    >
                      <IconSymbol name="bell" size={14} color={colors.warning} />
                      <Text className="text-muted text-xs font-medium ml-1">VINE</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            </View>
          ))}
          
          {filteredStates.length === 0 && (
            <View className="bg-surface rounded-xl p-6 items-center border border-border">
              <IconSymbol name="magnifyingglass" size={32} color={colors.muted} />
              <Text className="text-muted mt-2">No states found</Text>
            </View>
          )}
        </View>

        {/* Tips */}
        <View className="px-4 mb-6">
          <View className="bg-surface rounded-xl p-4 border border-border">
            <Text className="text-base font-semibold text-foreground mb-2">Search Tips</Text>
            <View className="gap-2">
              <View className="flex-row items-start">
                <Text className="text-primary mr-2">•</Text>
                <Text className="text-sm text-muted flex-1">For recent arrests, check the county jail first</Text>
              </View>
              <View className="flex-row items-start">
                <Text className="text-primary mr-2">•</Text>
                <Text className="text-sm text-muted flex-1">State DOC sites only show state prison inmates, not county jail</Text>
              </View>
              <View className="flex-row items-start">
                <Text className="text-primary mr-2">•</Text>
                <Text className="text-sm text-muted flex-1">Use exact spelling of names for best results</Text>
              </View>
              <View className="flex-row items-start">
                <Text className="text-primary mr-2">•</Text>
                <Text className="text-sm text-muted flex-1">If you have an inmate ID number, use it for faster lookup</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
