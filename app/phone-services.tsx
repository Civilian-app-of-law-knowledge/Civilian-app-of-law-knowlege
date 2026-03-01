import { useState } from "react";
import { ScrollView, Text, View, TouchableOpacity, Linking } from "react-native";
import { useRouter } from "expo-router";

import { ScreenContainer } from "@/components/screen-container";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useColors } from "@/hooks/use-colors";
import { phoneProviders } from "@/data/legal-content";

export default function PhoneServicesScreen() {
  const router = useRouter();
  const colors = useColors();
  const [expandedProvider, setExpandedProvider] = useState<string | null>(null);

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
            <Text className="text-xl font-bold text-foreground">Phone Services</Text>
            <Text className="text-sm text-muted">Set up calls with your loved one</Text>
          </View>
        </View>

        {/* Introduction */}
        <View className="px-4 py-4">
          <View className="bg-primary/10 rounded-xl p-4 border border-primary/30">
            <Text className="text-sm text-foreground leading-relaxed">
              Most correctional facilities use one of these phone service providers. 
              You'll need to create an account and add funds before your loved one can call you.
            </Text>
          </View>
        </View>

        {/* Providers List */}
        <View className="px-4 py-2">
          <Text className="text-lg font-semibold text-foreground mb-3 px-1">Phone Providers</Text>
          {phoneProviders.map((provider) => (
            <View key={provider.id} className="mb-3">
              <TouchableOpacity
                className="bg-surface rounded-xl p-4 border border-border"
                onPress={() => setExpandedProvider(
                  expandedProvider === provider.id ? null : provider.id
                )}
                activeOpacity={0.7}
              >
                <View className="flex-row items-center justify-between">
                  <View className="flex-row items-center flex-1">
                    <View 
                      className="w-10 h-10 rounded-full items-center justify-center mr-3"
                      style={{ backgroundColor: colors.primary + '20' }}
                    >
                      <IconSymbol name="bubble.left.fill" size={20} color={colors.primary} />
                    </View>
                    <View className="flex-1">
                      <Text className="text-base font-semibold text-foreground">{provider.name}</Text>
                      <Text className="text-xs text-muted">{provider.customerService}</Text>
                    </View>
                  </View>
                  <IconSymbol 
                    name={expandedProvider === provider.id ? "chevron.up" : "chevron.down"} 
                    size={18} 
                    color={colors.muted} 
                  />
                </View>

                {expandedProvider === provider.id && (
                  <View className="mt-4 pt-4 border-t border-border">
                    <Text className="text-sm text-muted mb-3">{provider.description}</Text>
                    
                    <Text className="text-sm font-semibold text-foreground mb-2">How to Set Up:</Text>
                    {provider.setupSteps.map((step, index) => (
                      <View key={index} className="flex-row mb-2">
                        <View 
                          className="w-5 h-5 rounded-full items-center justify-center mr-2 mt-0.5"
                          style={{ backgroundColor: colors.primary }}
                        >
                          <Text className="text-xs text-white font-bold">{index + 1}</Text>
                        </View>
                        <Text className="flex-1 text-sm text-foreground">{step}</Text>
                      </View>
                    ))}

                    <View className="flex-row mt-4">
                      <TouchableOpacity
                        className="flex-1 bg-primary rounded-xl py-3 mr-2 items-center"
                        onPress={() => Linking.openURL(provider.websiteUrl)}
                        activeOpacity={0.7}
                      >
                        <Text className="text-white font-semibold">Visit Website</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        className="flex-1 bg-surface rounded-xl py-3 ml-2 items-center border border-border"
                        onPress={() => Linking.openURL(`tel:${provider.customerService.replace(/[^0-9]/g, '')}`)}
                        activeOpacity={0.7}
                      >
                        <Text className="text-foreground font-semibold">Call Support</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* Tips */}
        <View className="px-4 py-4">
          <Text className="text-lg font-semibold text-foreground mb-3 px-1">Tips</Text>
          <View className="bg-surface rounded-xl p-4 border border-border">
            <View className="flex-row items-start mb-3">
              <IconSymbol name="lightbulb" size={18} color={colors.warning} style={{ marginTop: 2 }} />
              <Text className="flex-1 text-sm text-foreground ml-2">
                <Text className="font-semibold">Check the facility first:</Text> Contact the facility to confirm which provider they use before creating an account.
              </Text>
            </View>
            <View className="flex-row items-start mb-3">
              <IconSymbol name="lightbulb" size={18} color={colors.warning} style={{ marginTop: 2 }} />
              <Text className="flex-1 text-sm text-foreground ml-2">
                <Text className="font-semibold">Add funds in advance:</Text> Your loved one can only call when there are funds available in your account.
              </Text>
            </View>
            <View className="flex-row items-start">
              <IconSymbol name="lightbulb" size={18} color={colors.warning} style={{ marginTop: 2 }} />
              <Text className="flex-1 text-sm text-foreground ml-2">
                <Text className="font-semibold">Download the app:</Text> Most providers have mobile apps that make it easier to manage your account and receive calls.
              </Text>
            </View>
          </View>
        </View>

        {/* FCC Rate Info */}
        <View className="px-4 py-4">
          <View className="bg-success/10 rounded-xl p-4 border border-success/30">
            <View className="flex-row items-center mb-2">
              <IconSymbol name="checkmark.circle.fill" size={18} color={colors.success} />
              <Text className="text-sm font-semibold text-foreground ml-2">FCC Rate Caps</Text>
            </View>
            <Text className="text-sm text-muted leading-relaxed">
              The FCC has capped prison phone rates at $0.14/minute for prisons and $0.16/minute for jails for interstate calls. 
              If you're being charged more, you may be able to file a complaint with the FCC.
            </Text>
            <TouchableOpacity
              className="mt-3"
              onPress={() => Linking.openURL('https://www.fcc.gov/consumers/guides/inmate-telephone-service')}
              activeOpacity={0.7}
            >
              <Text className="text-sm font-medium" style={{ color: colors.primary }}>
                Learn more about FCC regulations →
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Disclaimer */}
        <View className="px-4 py-4 mb-4">
          <View className="bg-surface rounded-xl p-4 border border-border">
            <View className="flex-row items-start">
              <IconSymbol name="info.circle" size={18} color={colors.muted} style={{ marginTop: 2 }} />
              <Text className="flex-1 text-xs text-muted ml-2 leading-relaxed">
                Rates and services vary by facility. Contact the facility or provider directly for specific pricing and availability.
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
