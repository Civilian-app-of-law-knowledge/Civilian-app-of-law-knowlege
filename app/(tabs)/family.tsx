import { ScrollView, Text, View, TouchableOpacity, Linking } from "react-native";
import { useRouter } from "expo-router";

import { ScreenContainer } from "@/components/screen-container";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useColors } from "@/hooks/use-colors";
import { phoneProviders, commissaryProviders, emergencyContacts } from "@/data/legal-content";

export default function FamilyScreen() {
  const router = useRouter();
  const colors = useColors();

  const primarySupport = [
    {
      id: 'reunification',
      title: 'Family Reunification',
      subtitle: 'Rebuilding bonds after incarceration',
      icon: 'heart.fill' as const,
      route: '/family-reunification',
      color: '#E91E63',
      emoji: '👨‍👩‍👧‍👦',
    },
    {
      id: 'community',
      title: 'Community Resources',
      subtitle: 'Food, housing, clothing & more',
      icon: 'hand.raised.fill' as const,
      route: '/community-resources',
      color: colors.success,
      emoji: '🤝',
    },
    {
      id: 'jobs',
      title: 'Job Resources',
      subtitle: 'Second chance employers',
      icon: 'briefcase.fill' as const,
      route: '/job-resources',
      color: colors.primary,
      emoji: '💼',
    },
    {
      id: 'rehab',
      title: 'Rehab Alternatives',
      subtitle: 'Treatment instead of jail',
      icon: 'cross.fill' as const,
      route: '/rehab-alternatives',
      color: '#8B5CF6',
      emoji: '🏥',
    },
  ];

  const connectionCategories = [
    {
      id: 'phone',
      title: 'Phone Services',
      subtitle: 'Set up calls',
      icon: 'bubble.left.fill' as const,
      route: '/phone-services',
      color: colors.primary,
    },
    {
      id: 'commissary',
      title: 'Send Money',
      subtitle: 'Fund their account',
      icon: 'star.fill' as const,
      route: '/commissary',
      color: colors.success,
    },
    {
      id: 'packages',
      title: 'Care Packages',
      subtitle: 'Send approved items',
      icon: 'shippingbox.fill' as const,
      route: '/secure-packs',
      color: colors.warning,
    },
    {
      id: 'visitation',
      title: 'Visitation',
      subtitle: 'Schedule visits',
      icon: 'person.fill' as const,
      route: '/visitation',
      color: '#8B5CF6',
    },
    {
      id: 'mail',
      title: 'Mail Guidelines',
      subtitle: 'What you can send',
      icon: 'doc.text' as const,
      route: '/mail-guidelines',
      color: '#3B82F6',
    },
    {
      id: 'facilities',
      title: 'Find Facility',
      subtitle: 'Jail/prison directory',
      icon: 'building.columns' as const,
      route: '/facilities',
      color: colors.muted,
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
          <Text className="text-2xl font-bold text-foreground mb-1">
            Family Support Hub
          </Text>
          <Text className="text-sm text-muted">
            Resources for families, reunification, and rebuilding lives
          </Text>
        </View>

        {/* Encouraging Message */}
        <View className="px-4 py-3">
          <View className="bg-primary/10 rounded-xl p-4 border border-primary/30">
            <View className="flex-row items-center">
              <Text className="text-3xl mr-3">💚</Text>
              <View className="flex-1">
                <Text className="text-base font-semibold text-foreground">You're Not Alone</Text>
                <Text className="text-sm text-muted">
                  Millions of families are going through this. Support is available, and healing is possible.
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Primary Support - New Features */}
        <View className="px-4 py-4">
          <Text className="text-lg font-semibold text-foreground mb-3 px-1">Support & Resources</Text>
          {primarySupport.map((item) => (
            <TouchableOpacity
              key={item.id}
              className="bg-surface rounded-xl p-4 mb-3 border border-border flex-row items-center"
              onPress={() => router.push(item.route as any)}
              activeOpacity={0.7}
            >
              <View 
                className="w-14 h-14 rounded-xl items-center justify-center mr-4"
                style={{ backgroundColor: item.color + '15' }}
              >
                <Text className="text-2xl">{item.emoji}</Text>
              </View>
              <View className="flex-1">
                <Text className="text-base font-semibold text-foreground">{item.title}</Text>
                <Text className="text-sm text-muted">{item.subtitle}</Text>
              </View>
              <IconSymbol name="chevron.right" size={20} color={colors.muted} />
            </TouchableOpacity>
          ))}
        </View>

        {/* Stay Connected */}
        <View className="px-4 py-4">
          <Text className="text-lg font-semibold text-foreground mb-3 px-1">Stay Connected</Text>
          <View className="flex-row flex-wrap justify-between">
            {connectionCategories.map((category) => (
              <TouchableOpacity
                key={category.id}
                className="w-[32%] bg-surface rounded-xl p-3 mb-3 border border-border items-center"
                onPress={() => router.push(category.route as any)}
                activeOpacity={0.7}
              >
                <View 
                  className="w-10 h-10 rounded-full items-center justify-center mb-2"
                  style={{ backgroundColor: category.color + '20' }}
                >
                  <IconSymbol name={category.icon} size={20} color={category.color} />
                </View>
                <Text className="text-xs font-semibold text-foreground text-center" numberOfLines={1}>{category.title}</Text>
                <Text className="text-xs text-muted text-center" numberOfLines={1}>{category.subtitle}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Quick Access - Phone Providers */}
        <View className="px-4 py-4">
          <Text className="text-lg font-semibold text-foreground mb-3 px-1">Phone Providers</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {phoneProviders.slice(0, 4).map((provider) => (
              <TouchableOpacity
                key={provider.id}
                className="bg-surface rounded-xl p-4 mr-3 border border-border"
                style={{ width: 160 }}
                onPress={() => Linking.openURL(provider.websiteUrl)}
                activeOpacity={0.7}
              >
                <View 
                  className="w-10 h-10 rounded-full items-center justify-center mb-2"
                  style={{ backgroundColor: colors.primary + '20' }}
                >
                  <IconSymbol name="bubble.left.fill" size={20} color={colors.primary} />
                </View>
                <Text className="text-sm font-semibold text-foreground mb-1">{provider.name}</Text>
                <Text className="text-xs text-muted" numberOfLines={1}>{provider.customerService}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <TouchableOpacity
            className="py-3 items-center"
            onPress={() => router.push("/phone-services" as any)}
            activeOpacity={0.7}
          >
            <Text className="text-sm font-medium" style={{ color: colors.primary }}>
              View All Providers →
            </Text>
          </TouchableOpacity>
        </View>

        {/* Send Money Quick Links */}
        <View className="px-4 py-2">
          <Text className="text-lg font-semibold text-foreground mb-3 px-1">Send Money</Text>
          <View className="flex-row flex-wrap">
            {commissaryProviders.slice(0, 4).map((provider) => (
              <TouchableOpacity
                key={provider.id}
                className="bg-surface rounded-xl px-4 py-3 mr-2 mb-2 border border-border"
                onPress={() => Linking.openURL(provider.websiteUrl)}
                activeOpacity={0.7}
              >
                <Text className="text-sm font-medium text-foreground">{provider.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Crisis Hotlines */}
        <View className="px-4 py-4">
          <View className="bg-error/10 rounded-xl p-4 border border-error/30">
            <View className="flex-row items-center mb-3">
              <IconSymbol name="exclamationmark.triangle" size={20} color={colors.error} />
              <Text className="text-base font-semibold text-foreground ml-2">Crisis Hotlines</Text>
            </View>
            {emergencyContacts.slice(0, 3).map((contact) => (
              <TouchableOpacity
                key={contact.id}
                className="flex-row items-center justify-between py-2 border-t border-error/20"
                onPress={() => Linking.openURL(`tel:${contact.phone.replace(/[^0-9]/g, '')}`)}
                activeOpacity={0.7}
              >
                <View className="flex-1 pr-2">
                  <Text className="text-sm font-medium text-foreground">{contact.name}</Text>
                </View>
                <View className="bg-error/20 px-3 py-1 rounded-full">
                  <Text className="text-sm font-bold" style={{ color: colors.error }}>{contact.phone}</Text>
                </View>
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              className="pt-3 items-center"
              onPress={() => router.push("/emergency-contacts" as any)}
              activeOpacity={0.7}
            >
              <Text className="text-sm font-medium" style={{ color: colors.error }}>
                View All Hotlines →
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* More Resources */}
        <View className="px-4 py-4">
          <Text className="text-lg font-semibold text-foreground mb-3 px-1">More Resources</Text>
          <View className="flex-row flex-wrap">
            <TouchableOpacity
              className="bg-surface rounded-xl px-4 py-3 mr-2 mb-2 border border-border flex-row items-center"
              onPress={() => router.push("/bail-bond" as any)}
              activeOpacity={0.7}
            >
              <IconSymbol name="scale.3d" size={16} color={colors.primary} />
              <Text className="text-sm font-medium text-foreground ml-2">Bail & Bond</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="bg-surface rounded-xl px-4 py-3 mr-2 mb-2 border border-border flex-row items-center"
              onPress={() => router.push("/reentry" as any)}
              activeOpacity={0.7}
            >
              <IconSymbol name="arrow.uturn.right.circle.fill" size={16} color={colors.primary} />
              <Text className="text-sm font-medium text-foreground ml-2">Reentry</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="bg-surface rounded-xl px-4 py-3 mr-2 mb-2 border border-border flex-row items-center"
              onPress={() => router.push("/expungement" as any)}
              activeOpacity={0.7}
            >
              <IconSymbol name="checkmark.shield.fill" size={16} color={colors.primary} />
              <Text className="text-sm font-medium text-foreground ml-2">Expungement</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="bg-surface rounded-xl px-4 py-3 mr-2 mb-2 border border-border flex-row items-center"
              onPress={() => router.push("/resources" as any)}
              activeOpacity={0.7}
            >
              <IconSymbol name="book.fill" size={16} color={colors.primary} />
              <Text className="text-sm font-medium text-foreground ml-2">All Resources</Text>
            </TouchableOpacity>
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
            <Text className="text-white font-semibold ml-2">Ask AI for Help</Text>
          </TouchableOpacity>
        </View>

        {/* Disclaimer */}
        <View className="px-4 py-4 mb-4">
          <View className="bg-surface rounded-xl p-4 border border-border">
            <View className="flex-row items-start">
              <IconSymbol name="info.circle" size={18} color={colors.muted} style={{ marginTop: 2 }} />
              <Text className="flex-1 text-xs text-muted ml-2 leading-relaxed">
                Services vary by facility and location. Always verify with the specific facility before sending money or packages.
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
