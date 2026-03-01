import { useState } from "react";
import { ScrollView, Text, View, TouchableOpacity, Linking } from "react-native";
import { useRouter } from "expo-router";

import { ScreenContainer } from "@/components/screen-container";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useColors } from "@/hooks/use-colors";
import { securePackVendors } from "@/data/legal-content";

export default function SecurePacksScreen() {
  const router = useRouter();
  const colors = useColors();
  const [expandedVendor, setExpandedVendor] = useState<string | null>(null);

  const commonlyAllowed = [
    'Snacks and candy',
    'Ramen and instant foods',
    'Coffee and beverages',
    'Hygiene items (soap, shampoo, deodorant)',
    'Writing supplies',
    'Playing cards',
    'Books and magazines (some facilities)',
    'Clothing items (facility-specific)',
  ];

  const commonlyProhibited = [
    'Homemade food items',
    'Items in glass containers',
    'Aerosol products',
    'Items with alcohol content',
    'Sharp objects',
    'Electronics (unless specifically approved)',
    'Cash or gift cards',
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
            <Text className="text-xl font-bold text-foreground">Care Packages</Text>
            <Text className="text-sm text-muted">Send approved items to your loved one</Text>
          </View>
        </View>

        {/* What are Secure Packs */}
        <View className="px-4 py-4">
          <View className="bg-surface rounded-xl p-4 border border-border">
            <Text className="text-base font-semibold text-foreground mb-2">What are Secure Packs?</Text>
            <Text className="text-sm text-muted leading-relaxed">
              Secure packs (also called care packages) are pre-approved packages of food, clothing, 
              and personal items that you can order and have delivered to your loved one in custody. 
              These packages are inspected and delivered by approved vendors to ensure security compliance.
            </Text>
          </View>
        </View>

        {/* Approved Vendors */}
        <View className="px-4 py-2">
          <Text className="text-lg font-semibold text-foreground mb-3 px-1">Approved Vendors</Text>
          {securePackVendors.map((vendor) => (
            <View key={vendor.id} className="mb-3">
              <TouchableOpacity
                className="bg-surface rounded-xl p-4 border border-border"
                onPress={() => setExpandedVendor(
                  expandedVendor === vendor.id ? null : vendor.id
                )}
                activeOpacity={0.7}
              >
                <View className="flex-row items-center justify-between">
                  <View className="flex-row items-center flex-1">
                    <View 
                      className="w-10 h-10 rounded-full items-center justify-center mr-3"
                      style={{ backgroundColor: colors.error + '20' }}
                    >
                      <IconSymbol name="heart.fill" size={20} color={colors.error} />
                    </View>
                    <View className="flex-1">
                      <Text className="text-base font-semibold text-foreground">{vendor.name}</Text>
                      <Text className="text-xs text-muted" numberOfLines={1}>{vendor.description}</Text>
                    </View>
                  </View>
                  <IconSymbol 
                    name={expandedVendor === vendor.id ? "chevron.up" : "chevron.down"} 
                    size={18} 
                    color={colors.muted} 
                  />
                </View>

                {expandedVendor === vendor.id && (
                  <View className="mt-4 pt-4 border-t border-border">
                    <Text className="text-sm font-semibold text-foreground mb-2">Typical Items Available:</Text>
                    <View className="flex-row flex-wrap mb-4">
                      {vendor.typicalItems.map((item, index) => (
                        <View 
                          key={index} 
                          className="bg-background rounded-full px-3 py-1 mr-2 mb-2"
                        >
                          <Text className="text-xs text-foreground">{item}</Text>
                        </View>
                      ))}
                    </View>

                    <TouchableOpacity
                      className="bg-primary rounded-xl py-3 items-center"
                      onPress={() => Linking.openURL(vendor.websiteUrl)}
                      activeOpacity={0.7}
                    >
                      <Text className="text-white font-semibold">Visit {vendor.name}</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* What's Allowed */}
        <View className="px-4 py-4">
          <Text className="text-lg font-semibold text-foreground mb-3 px-1">What's Typically Allowed</Text>
          <View className="bg-success/10 rounded-xl p-4 border border-success/30">
            {commonlyAllowed.map((item, index) => (
              <View key={index} className="flex-row items-center mb-2">
                <IconSymbol name="checkmark.circle.fill" size={16} color={colors.success} />
                <Text className="text-sm text-foreground ml-2">{item}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* What's NOT Allowed */}
        <View className="px-4 py-4">
          <Text className="text-lg font-semibold text-foreground mb-3 px-1">What's Typically NOT Allowed</Text>
          <View className="bg-error/10 rounded-xl p-4 border border-error/30">
            {commonlyProhibited.map((item, index) => (
              <View key={index} className="flex-row items-center mb-2">
                <IconSymbol name="xmark.circle.fill" size={16} color={colors.error} />
                <Text className="text-sm text-foreground ml-2">{item}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* How to Order */}
        <View className="px-4 py-4">
          <Text className="text-lg font-semibold text-foreground mb-3 px-1">How to Order</Text>
          <View className="bg-surface rounded-xl p-4 border border-border">
            <View className="flex-row items-start mb-3">
              <View 
                className="w-6 h-6 rounded-full items-center justify-center mr-3 mt-0.5"
                style={{ backgroundColor: colors.primary }}
              >
                <Text className="text-xs text-white font-bold">1</Text>
              </View>
              <Text className="flex-1 text-sm text-foreground">
                Check with the facility to see which vendors they accept
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
                Visit the vendor's website and search for the facility
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
                Select a package or build your own from approved items
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
                Enter your loved one's information and complete payment
              </Text>
            </View>
          </View>
        </View>

        {/* Tips */}
        <View className="px-4 py-4">
          <View className="bg-warning/10 rounded-xl p-4 border border-warning/30">
            <View className="flex-row items-center mb-2">
              <IconSymbol name="lightbulb" size={18} color={colors.warning} />
              <Text className="text-sm font-semibold text-foreground ml-2">Pro Tips</Text>
            </View>
            <Text className="text-sm text-muted leading-relaxed mb-2">
              • Many facilities only allow packages during certain times (quarterly, for holidays, etc.)
            </Text>
            <Text className="text-sm text-muted leading-relaxed mb-2">
              • Delivery can take 2-4 weeks, so plan ahead for special occasions
            </Text>
            <Text className="text-sm text-muted leading-relaxed">
              • Keep your order confirmation in case of delivery issues
            </Text>
          </View>
        </View>

        {/* Disclaimer */}
        <View className="px-4 py-4 mb-4">
          <View className="bg-surface rounded-xl p-4 border border-border">
            <View className="flex-row items-start">
              <IconSymbol name="info.circle" size={18} color={colors.muted} style={{ marginTop: 2 }} />
              <Text className="flex-1 text-xs text-muted ml-2 leading-relaxed">
                Approved items and vendors vary by facility. Always verify with the specific facility before placing an order.
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
