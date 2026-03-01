import { ScrollView, Text, View, TouchableOpacity, Linking } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";

import { ScreenContainer } from "@/components/screen-container";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useColors } from "@/hooks/use-colors";
import { facilities } from "@/data/legal-content";

export default function FacilityDetailScreen() {
  const router = useRouter();
  const colors = useColors();
  const { id } = useLocalSearchParams<{ id: string }>();

  const facility = facilities.find(f => f.id === id);

  if (!facility) {
    return (
      <ScreenContainer className="items-center justify-center">
        <Text className="text-lg text-muted">Facility not found</Text>
        <TouchableOpacity
          className="mt-4 px-6 py-3 rounded-xl"
          style={{ backgroundColor: colors.primary }}
          onPress={() => router.back()}
        >
          <Text className="text-white font-medium">Go Back</Text>
        </TouchableOpacity>
      </ScreenContainer>
    );
  }

  const infoSections = [
    {
      title: 'Contact Information',
      items: [
        { label: 'Phone', value: facility.phone, action: () => Linking.openURL(`tel:${facility.phone.replace(/[^0-9]/g, '')}`) },
        { label: 'Address', value: `${facility.address}\n${facility.city}, ${facility.state} ${facility.zip}` },
        { label: 'Website', value: 'Visit Website', action: () => Linking.openURL(facility.websiteUrl) },
      ],
    },
    {
      title: 'Services',
      items: [
        { label: 'Phone Service Provider', value: facility.phoneServices },
        { label: 'Commissary Provider', value: facility.commissaryProvider },
        { label: 'Secure Pack Vendors', value: facility.securePackVendors.join(', ') },
      ],
    },
    {
      title: 'Visitation',
      items: [
        { label: 'Hours', value: facility.visitationHours },
      ],
    },
  ];

  return (
    <ScreenContainer>
      <ScrollView 
        className="flex-1" 
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View className="px-5 pt-4 pb-4 bg-surface">
          <TouchableOpacity
            className="flex-row items-center mb-3"
            onPress={() => router.back()}
            activeOpacity={0.7}
          >
            <IconSymbol name="chevron.left" size={20} color={colors.primary} />
            <Text className="text-sm ml-1" style={{ color: colors.primary }}>Back</Text>
          </TouchableOpacity>
          <View className="flex-row items-center mb-2">
            <View 
              className="px-2 py-1 rounded-full mr-2"
              style={{ backgroundColor: colors.muted + '30' }}
            >
              <Text className="text-xs text-muted uppercase">{facility.type}</Text>
            </View>
          </View>
          <Text className="text-2xl font-bold text-foreground mb-1">{facility.name}</Text>
          <Text className="text-sm text-muted">
            {facility.city}, {facility.state} {facility.zip}
          </Text>
        </View>

        {/* Quick Actions */}
        <View className="px-4 py-4">
          <View className="flex-row">
            <TouchableOpacity
              className="flex-1 bg-primary rounded-xl py-3 mr-2 flex-row items-center justify-center"
              onPress={() => Linking.openURL(`tel:${facility.phone.replace(/[^0-9]/g, '')}`)}
              activeOpacity={0.7}
            >
              <IconSymbol name="bubble.left.fill" size={18} color="#FFFFFF" />
              <Text className="text-white font-semibold ml-2">Call Facility</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="flex-1 bg-surface rounded-xl py-3 ml-2 flex-row items-center justify-center border border-border"
              onPress={() => Linking.openURL(facility.websiteUrl)}
              activeOpacity={0.7}
            >
              <IconSymbol name="arrow.up.right" size={18} color={colors.foreground} />
              <Text className="text-foreground font-semibold ml-2">Website</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Info Sections */}
        {infoSections.map((section, sectionIndex) => (
          <View key={sectionIndex} className="px-4 py-2">
            <Text className="text-lg font-semibold text-foreground mb-3 px-1">{section.title}</Text>
            <View className="bg-surface rounded-xl border border-border overflow-hidden">
              {section.items.map((item, itemIndex) => (
                <TouchableOpacity
                  key={itemIndex}
                  className={`p-4 flex-row items-center justify-between ${
                    itemIndex < section.items.length - 1 ? 'border-b border-border' : ''
                  }`}
                  onPress={item.action}
                  disabled={!item.action}
                  activeOpacity={item.action ? 0.7 : 1}
                >
                  <View className="flex-1">
                    <Text className="text-xs text-muted mb-1">{item.label}</Text>
                    <Text className="text-base text-foreground">{item.value}</Text>
                  </View>
                  {item.action && (
                    <IconSymbol 
                      name={item.label === 'Website' ? 'arrow.up.right' : 'chevron.right'} 
                      size={18} 
                      color={colors.primary} 
                    />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}

        {/* Related Actions */}
        <View className="px-4 py-4">
          <Text className="text-lg font-semibold text-foreground mb-3 px-1">Quick Links</Text>
          <View className="flex-row flex-wrap">
            <TouchableOpacity
              className="bg-surface rounded-xl px-4 py-3 mr-2 mb-2 border border-border flex-row items-center"
              onPress={() => router.push("/phone-services" as any)}
              activeOpacity={0.7}
            >
              <IconSymbol name="bubble.left.fill" size={16} color={colors.primary} />
              <Text className="text-sm font-medium text-foreground ml-2">Phone Setup</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="bg-surface rounded-xl px-4 py-3 mr-2 mb-2 border border-border flex-row items-center"
              onPress={() => router.push("/commissary" as any)}
              activeOpacity={0.7}
            >
              <IconSymbol name="star.fill" size={16} color={colors.primary} />
              <Text className="text-sm font-medium text-foreground ml-2">Commissary</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="bg-surface rounded-xl px-4 py-3 mr-2 mb-2 border border-border flex-row items-center"
              onPress={() => router.push("/visitation" as any)}
              activeOpacity={0.7}
            >
              <IconSymbol name="person.fill" size={16} color={colors.primary} />
              <Text className="text-sm font-medium text-foreground ml-2">Visitation Info</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="bg-surface rounded-xl px-4 py-3 mr-2 mb-2 border border-border flex-row items-center"
              onPress={() => router.push("/mail-guidelines" as any)}
              activeOpacity={0.7}
            >
              <IconSymbol name="doc.text" size={16} color={colors.primary} />
              <Text className="text-sm font-medium text-foreground ml-2">Mail Guidelines</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Disclaimer */}
        <View className="px-4 py-4 mb-4">
          <View className="bg-surface rounded-xl p-4 border border-border">
            <View className="flex-row items-start">
              <IconSymbol name="info.circle" size={18} color={colors.muted} style={{ marginTop: 2 }} />
              <Text className="flex-1 text-xs text-muted ml-2 leading-relaxed">
                Information may change. Contact the facility directly for the most current details on visitation, services, and policies.
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
