import { useState } from "react";
import { ScrollView, Text, View, TouchableOpacity, TextInput } from "react-native";
import { useRouter } from "expo-router";

import { ScreenContainer } from "@/components/screen-container";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useColors } from "@/hooks/use-colors";
import { facilities } from "@/data/legal-content";

type FacilityType = 'all' | 'county' | 'state' | 'federal';

export default function FacilitiesScreen() {
  const router = useRouter();
  const colors = useColors();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<FacilityType>('all');

  const facilityTypes = [
    { id: 'all' as FacilityType, label: 'All' },
    { id: 'county' as FacilityType, label: 'County' },
    { id: 'state' as FacilityType, label: 'State' },
    { id: 'federal' as FacilityType, label: 'Federal' },
  ];

  const filteredFacilities = facilities.filter(facility => {
    const matchesSearch = searchQuery === '' || 
      facility.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      facility.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      facility.state.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === 'all' || facility.type === selectedType;
    return matchesSearch && matchesType;
  });

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
            <Text className="text-xl font-bold text-foreground">Facility Directory</Text>
            <Text className="text-sm text-muted">Find jails and prisons</Text>
          </View>
        </View>

        {/* Search */}
        <View className="px-4 py-3">
          <View className="bg-surface rounded-xl border border-border overflow-hidden">
            <View className="flex-row items-center px-4">
              <IconSymbol name="magnifyingglass" size={20} color={colors.muted} />
              <TextInput
                className="flex-1 py-3 px-3 text-base text-foreground"
                placeholder="Search by name, city, or state..."
                placeholderTextColor={colors.muted}
                value={searchQuery}
                onChangeText={setSearchQuery}
                returnKeyType="search"
              />
              {searchQuery.length > 0 && (
                <TouchableOpacity onPress={() => setSearchQuery('')} activeOpacity={0.7}>
                  <IconSymbol name="xmark.circle.fill" size={20} color={colors.muted} />
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>

        {/* Type Filter */}
        <View className="px-4 py-2">
          <View className="flex-row bg-surface rounded-xl p-1 border border-border">
            {facilityTypes.map((type) => (
              <TouchableOpacity
                key={type.id}
                className="flex-1 py-2 rounded-lg"
                style={{ 
                  backgroundColor: selectedType === type.id ? colors.primary : 'transparent' 
                }}
                onPress={() => setSelectedType(type.id)}
                activeOpacity={0.7}
              >
                <Text 
                  className="text-center text-sm font-medium"
                  style={{ 
                    color: selectedType === type.id ? '#FFFFFF' : colors.muted 
                  }}
                >
                  {type.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Facilities List */}
        <View className="px-4 py-4">
          <Text className="text-sm text-muted mb-3 px-1">
            {filteredFacilities.length} facilities found
          </Text>
          {filteredFacilities.map((facility) => (
            <TouchableOpacity
              key={facility.id}
              className="bg-surface rounded-xl p-4 mb-3 border border-border"
              onPress={() => router.push(`/facility/${facility.id}` as any)}
              activeOpacity={0.7}
            >
              <View className="flex-row items-start justify-between">
                <View className="flex-1">
                  <View className="flex-row items-center mb-1">
                    <View 
                      className="px-2 py-0.5 rounded-full mr-2"
                      style={{ backgroundColor: colors.muted + '30' }}
                    >
                      <Text className="text-xs text-muted uppercase">{facility.type}</Text>
                    </View>
                  </View>
                  <Text className="text-base font-semibold text-foreground mb-1">{facility.name}</Text>
                  <Text className="text-sm text-muted mb-2">
                    {facility.city}, {facility.state} {facility.zip}
                  </Text>
                  <View className="flex-row items-center">
                    <IconSymbol name="bubble.left.fill" size={14} color={colors.muted} />
                    <Text className="text-xs text-muted ml-1">Phone: {facility.phoneServices}</Text>
                  </View>
                </View>
                <IconSymbol name="chevron.right" size={18} color={colors.muted} />
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Info Note */}
        <View className="px-4 py-4 mb-4">
          <View className="bg-surface rounded-xl p-4 border border-border">
            <View className="flex-row items-start">
              <IconSymbol name="info.circle" size={18} color={colors.muted} style={{ marginTop: 2 }} />
              <Text className="flex-1 text-xs text-muted ml-2 leading-relaxed">
                This directory includes select facilities. For a complete list, visit your state's Department of Corrections website or the Federal Bureau of Prisons.
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
