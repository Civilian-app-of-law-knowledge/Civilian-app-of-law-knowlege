import { useState } from "react";
import { ScrollView, Text, View, TouchableOpacity, Linking } from "react-native";
import { useRouter } from "expo-router";

import { ScreenContainer } from "@/components/screen-container";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useColors } from "@/hooks/use-colors";
import { commissaryProviders } from "@/data/legal-content";

export default function CommissaryScreen() {
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
            <Text className="text-xl font-bold text-foreground">Send Money / Commissary</Text>
            <Text className="text-sm text-muted">Fund your loved one's account</Text>
          </View>
        </View>

        {/* What is Commissary */}
        <View className="px-4 py-4">
          <View className="bg-surface rounded-xl p-4 border border-border">
            <Text className="text-base font-semibold text-foreground mb-2">What is Commissary?</Text>
            <Text className="text-sm text-muted leading-relaxed">
              Commissary is like a store inside the facility where inmates can purchase food, snacks, 
              hygiene items, writing supplies, and other approved items. Family members can deposit 
              money into their loved one's commissary account so they can make purchases.
            </Text>
          </View>
        </View>

        {/* How to Send Money */}
        <View className="px-4 py-2">
          <Text className="text-lg font-semibold text-foreground mb-3 px-1">How to Send Money</Text>
          
          <View className="bg-surface rounded-xl p-4 border border-border mb-4">
            <View className="flex-row items-start mb-3">
              <View 
                className="w-6 h-6 rounded-full items-center justify-center mr-3 mt-0.5"
                style={{ backgroundColor: colors.primary }}
              >
                <Text className="text-xs text-white font-bold">1</Text>
              </View>
              <View className="flex-1">
                <Text className="text-sm font-semibold text-foreground">Find the Right Provider</Text>
                <Text className="text-sm text-muted">Contact the facility to find out which money transfer service they accept.</Text>
              </View>
            </View>
            <View className="flex-row items-start mb-3">
              <View 
                className="w-6 h-6 rounded-full items-center justify-center mr-3 mt-0.5"
                style={{ backgroundColor: colors.primary }}
              >
                <Text className="text-xs text-white font-bold">2</Text>
              </View>
              <View className="flex-1">
                <Text className="text-sm font-semibold text-foreground">Create an Account</Text>
                <Text className="text-sm text-muted">Sign up on the provider's website or app with your information.</Text>
              </View>
            </View>
            <View className="flex-row items-start mb-3">
              <View 
                className="w-6 h-6 rounded-full items-center justify-center mr-3 mt-0.5"
                style={{ backgroundColor: colors.primary }}
              >
                <Text className="text-xs text-white font-bold">3</Text>
              </View>
              <View className="flex-1">
                <Text className="text-sm font-semibold text-foreground">Find Your Loved One</Text>
                <Text className="text-sm text-muted">Search by name, ID number, or facility to locate their account.</Text>
              </View>
            </View>
            <View className="flex-row items-start">
              <View 
                className="w-6 h-6 rounded-full items-center justify-center mr-3 mt-0.5"
                style={{ backgroundColor: colors.primary }}
              >
                <Text className="text-xs text-white font-bold">4</Text>
              </View>
              <View className="flex-1">
                <Text className="text-sm font-semibold text-foreground">Deposit Funds</Text>
                <Text className="text-sm text-muted">Add money via credit card, debit card, or at retail locations.</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Providers */}
        <View className="px-4 py-2">
          <Text className="text-lg font-semibold text-foreground mb-3 px-1">Money Transfer Services</Text>
          {commissaryProviders.map((provider) => (
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
                      style={{ backgroundColor: colors.success + '20' }}
                    >
                      <IconSymbol name="star.fill" size={20} color={colors.success} />
                    </View>
                    <View className="flex-1">
                      <Text className="text-base font-semibold text-foreground">{provider.name}</Text>
                      <Text className="text-xs text-muted" numberOfLines={1}>{provider.description}</Text>
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
                    <Text className="text-sm font-semibold text-foreground mb-2">Deposit Methods:</Text>
                    {provider.methods.map((method, index) => (
                      <View key={index} className="flex-row items-center mb-2">
                        <IconSymbol name="checkmark.circle.fill" size={16} color={colors.success} />
                        <Text className="text-sm text-foreground ml-2">{method}</Text>
                      </View>
                    ))}

                    <TouchableOpacity
                      className="mt-4 bg-primary rounded-xl py-3 items-center"
                      onPress={() => Linking.openURL(provider.websiteUrl)}
                      activeOpacity={0.7}
                    >
                      <Text className="text-white font-semibold">Visit {provider.name}</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* Tips */}
        <View className="px-4 py-4">
          <Text className="text-lg font-semibold text-foreground mb-3 px-1">Important Tips</Text>
          <View className="bg-warning/10 rounded-xl p-4 border border-warning/30">
            <View className="flex-row items-start mb-3">
              <IconSymbol name="exclamationmark.triangle" size={18} color={colors.warning} style={{ marginTop: 2 }} />
              <Text className="flex-1 text-sm text-foreground ml-2">
                <Text className="font-semibold">Processing time:</Text> Deposits can take 24-72 hours to appear in the account.
              </Text>
            </View>
            <View className="flex-row items-start mb-3">
              <IconSymbol name="exclamationmark.triangle" size={18} color={colors.warning} style={{ marginTop: 2 }} />
              <Text className="flex-1 text-sm text-foreground ml-2">
                <Text className="font-semibold">Fees apply:</Text> Most services charge transaction fees. Compare providers for the best rates.
              </Text>
            </View>
            <View className="flex-row items-start">
              <IconSymbol name="exclamationmark.triangle" size={18} color={colors.warning} style={{ marginTop: 2 }} />
              <Text className="flex-1 text-sm text-foreground ml-2">
                <Text className="font-semibold">Spending limits:</Text> Facilities may have weekly or monthly spending limits on commissary.
              </Text>
            </View>
          </View>
        </View>

        {/* Disclaimer */}
        <View className="px-4 py-4 mb-4">
          <View className="bg-surface rounded-xl p-4 border border-border">
            <View className="flex-row items-start">
              <IconSymbol name="info.circle" size={18} color={colors.muted} style={{ marginTop: 2 }} />
              <Text className="flex-1 text-xs text-muted ml-2 leading-relaxed">
                Services and fees vary by facility. Always verify the accepted provider with the facility before making a deposit.
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
