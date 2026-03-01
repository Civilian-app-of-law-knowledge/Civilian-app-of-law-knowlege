import { ScrollView, Text, View, TouchableOpacity, Linking, RefreshControl } from "react-native";
import { useRouter, useFocusEffect } from "expo-router";
import { useState, useCallback } from "react";

import { ScreenContainer } from "@/components/screen-container";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useColors } from "@/hooks/use-colors";
import { Footer } from "@/components/footer";
import { useRefresh } from "@/lib/refresh-provider";
import { lawUpdates, emergencyContacts, faqs } from "@/data/legal-content";
import { DocumentWallet, WalletDocument } from "@/lib/document-wallet";

export default function HomeScreen() {
  const router = useRouter();
  const colors = useColors();
  const { isRefreshing, refreshData, timeSinceRefresh, nextRefreshIn } = useRefresh();
  const [refreshing, setRefreshing] = useState(false);
  const [pinnedAffidavit, setPinnedAffidavit] = useState<WalletDocument | null>(null);

  useFocusEffect(
    useCallback(() => {
      DocumentWallet.getPinnedAffidavit().then(setPinnedAffidavit);
    }, [setPinnedAffidavit])
  );

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await refreshData();
    setPinnedAffidavit(await DocumentWallet.getPinnedAffidavit());
    setRefreshing(false);
  }, [refreshData]);

  const recentUpdates = lawUpdates.slice(0, 3);
  const topFaqs = faqs.slice(0, 3);

  const quickActions = [
    { title: "Find an Inmate", subtitle: "All 50 states + federal", icon: "magnifyingglass" as const, route: "/state-lookup" },
    { title: "Know Your Rights", subtitle: "Constitutional protections", icon: "shield.fill" as const, route: "/rights" },
    { title: "My Case", subtitle: "Track your legal matters", icon: "doc.text" as const, route: "/my-case" },
    { title: "Family Support", subtitle: "Phone, commissary & more", icon: "heart.fill" as const, route: "/family" },
    { title: "Grievances", subtitle: "File complaints & appeals", icon: "exclamationmark.bubble" as const, route: "/grievances" },
    { title: "Work Release", subtitle: "Petition & banking info", icon: "banknote" as const, route: "/work-release" },
    { title: "Education", subtitle: "GED, certs & college", icon: "graduationcap.fill" as const, route: "/education" },
    { title: "Job Resources", subtitle: "55+ second chance employers", icon: "briefcase.fill" as const, route: "/job-resources" },
  ];

  const moreResources = [
    { title: "SSI & Benefits", icon: "dollarsign.circle" as const, route: "/ssi-benefits" },
    { title: "Document Wallet", icon: "folder.fill" as const, route: "/document-wallet" },
    { title: "Charge Reduction", icon: "arrow.down.circle" as const, route: "/charge-reduction" },
    { title: "Law Alerts", icon: "bell.fill" as const, route: "/law-alerts" },
    { title: "Lawyer Directory", icon: "person.text.rectangle" as const, route: "/lawyer-directory" },
    { title: "Prosecutor Info", icon: "building.columns" as const, route: "/prosecutor-info" },
    { title: "Outdoor & Hunting Laws", icon: "leaf.fill" as const, route: "/outdoor-laws" },
    { title: "Probation Guide", icon: "checkmark.circle" as const, route: "/probation-guide" },
    { title: "Warrant Check", icon: "exclamationmark.triangle" as const, route: "/warrant-check" },
    { title: "Voting Rights", icon: "hand.raised.fill" as const, route: "/voting-rights" },
    { title: "Child Support", icon: "figure.and.child.holdinghands" as const, route: "/child-support" },
    { title: "Veterans Benefits", icon: "star.fill" as const, route: "/veterans-benefits" },
    { title: "Immigration & ICE", icon: "globe" as const, route: "/immigration-rights" },
    { title: "Inmate Resources", icon: "ipad" as const, route: "/inmate-resources" },
    { title: "Free Legal Aid", icon: "building.columns" as const, route: "/legal-aid" },
    { title: "Court Records", icon: "doc.text" as const, route: "/court-records" },
    { title: "AI Assistant", icon: "bubble.left.fill" as const, route: "/assistant" },
    { title: "Rehab Options", icon: "heart.text.square.fill" as const, route: "/rehab-alternatives" },
    { title: "Community Help", icon: "person.2.fill" as const, route: "/community-resources" },
    { title: "Bail & Bond Info", icon: "banknote" as const, route: "/bail-bond" },
    { title: "Reentry Resources", icon: "arrow.right.circle" as const, route: "/reentry" },
    { title: "Emergency Contacts", icon: "phone.fill" as const, route: "/emergency-contacts" },
    { title: "Share Your Story", icon: "megaphone.fill" as const, route: "/submit-testimony" },
    { title: "All Resources", icon: "link" as const, route: "/resources" },
    { title: "FAQ", icon: "questionmark.circle" as const, route: "/faq" },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return colors.error;
      case 'important': return colors.warning;
      default: return colors.muted;
    }
  };

  return (
    <ScreenContainer>
      <ScrollView 
        className="flex-1" 
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing || isRefreshing}
            onRefresh={onRefresh}
            tintColor={colors.primary}
            colors={[colors.primary]}
          />
        }
      >
        {/* Header */}
        <View className="px-5 pt-4 pb-6 bg-surface">
          <Text className="text-3xl font-bold text-foreground mb-2">
            Civilian Law of Knowledge
          </Text>
          <Text className="text-base text-muted leading-relaxed">
            Knowledge is power. Providing clear, structured information about the justice system for civilians and families.
          </Text>
          <View className="flex-row items-center mt-3 bg-background/50 rounded-lg px-3 py-2">
            <IconSymbol name="clock" size={14} color={colors.muted} />
            <Text className="text-xs text-muted ml-2">Updated {timeSinceRefresh} • Next refresh in {nextRefreshIn}</Text>
          </View>
        </View>

        {/* Pinned Affidavit */}
        {pinnedAffidavit && (
          <View className="px-4 pt-4 pb-2">
            <TouchableOpacity
              className="bg-surface rounded-xl p-4 border flex-row items-center"
              style={{ borderColor: colors.primary + "60" }}
              onPress={() => router.push("/document-wallet" as any)}
              activeOpacity={0.7}
            >
              <View
                className="w-10 h-10 rounded-full items-center justify-center mr-3"
                style={{ backgroundColor: colors.primary + "20" }}
              >
                <IconSymbol name="pin.fill" size={20} color={colors.primary} />
              </View>
              <View className="flex-1">
                <Text className="text-xs font-semibold uppercase mb-0.5" style={{ color: colors.primary }}>
                  📌 Pinned Affidavit
                </Text>
                <Text className="text-sm font-semibold text-foreground" numberOfLines={1}>
                  {pinnedAffidavit.title}
                </Text>
                {pinnedAffidavit.caseNumber ? (
                  <Text className="text-xs text-muted">Case: {pinnedAffidavit.caseNumber}</Text>
                ) : null}
              </View>
              <IconSymbol name="chevron.right" size={18} color={colors.muted} />
            </TouchableOpacity>
          </View>
        )}

        {/* Quick Actions Grid */}
        <View className="px-4 py-4">
          <Text className="text-lg font-semibold text-foreground mb-3 px-1">Quick Actions</Text>
          <View className="flex-row flex-wrap justify-between">
            {quickActions.map((action, index) => (
              <TouchableOpacity
                key={index}
                className="w-[48%] bg-surface rounded-xl p-4 mb-3 border border-border"
                style={{ minHeight: 110 }}
                onPress={() => router.push(action.route as any)}
                activeOpacity={0.7}
              >
                <View 
                  className="w-10 h-10 rounded-full items-center justify-center mb-3"
                  style={{ backgroundColor: colors.primary + '20' }}
                >
                  <IconSymbol name={action.icon} size={22} color={colors.primary} />
                </View>
                <Text className="text-base font-semibold text-foreground mb-1">{action.title}</Text>
                <Text className="text-xs text-muted">{action.subtitle}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* FEATURED: Expungement Guide */}
        <View className="px-4 py-2">
          <TouchableOpacity
            className="bg-primary rounded-xl p-5 mb-4"
            onPress={() => router.push("/expungement" as any)}
            activeOpacity={0.8}
          >
            <View className="flex-row items-center mb-3">
              <View className="w-12 h-12 rounded-full bg-white/20 items-center justify-center mr-3">
                <IconSymbol name="checkmark.shield.fill" size={28} color="#FFFFFF" />
              </View>
              <View className="flex-1">
                <View className="flex-row items-center mb-1">
                  <View className="bg-white/20 px-2 py-0.5 rounded-full mr-2">
                    <Text className="text-xs font-bold text-white">IMPORTANT</Text>
                  </View>
                </View>
                <Text className="text-xl font-bold text-white">Clear Your Record</Text>
              </View>
              <IconSymbol name="chevron.right" size={24} color="#FFFFFF" />
            </View>
            <Text className="text-sm text-white/90 leading-relaxed">
              Learn how to get crimes expunged from your record. Many people are eligible but don't know it. 
              Our comprehensive guide covers every type of relief, state-by-state resources, and step-by-step instructions.
            </Text>
          </TouchableOpacity>
        </View>

        {/* Emergency Contacts */}
        <View className="px-4 py-2">
          <View className="bg-error/10 rounded-xl p-4 border border-error/30">
            <View className="flex-row items-center mb-3">
              <IconSymbol name="exclamationmark.triangle" size={20} color={colors.error} />
              <Text className="text-base font-semibold text-foreground ml-2">Emergency Hotlines</Text>
            </View>
            {emergencyContacts.slice(0, 2).map((contact) => (
              <TouchableOpacity
                key={contact.id}
                className="flex-row items-center justify-between py-2"
                onPress={() => Linking.openURL(`tel:${contact.phone.replace(/[^0-9]/g, '')}`)}
                activeOpacity={0.7}
              >
                <View className="flex-1">
                  <Text className="text-sm font-medium text-foreground">{contact.name}</Text>
                  <Text className="text-xs text-muted">{contact.description}</Text>
                </View>
                <View className="bg-error/20 px-3 py-1 rounded-full">
                  <Text className="text-sm font-bold" style={{ color: colors.error }}>{contact.phone}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Recent Law Updates */}
        <View className="px-4 py-4">
          <View className="flex-row items-center justify-between mb-3 px-1">
            <Text className="text-lg font-semibold text-foreground">Recent Law Updates</Text>
            <TouchableOpacity onPress={() => router.push("/law-alerts" as any)} activeOpacity={0.7}>
              <Text className="text-sm" style={{ color: colors.primary }}>See All</Text>
            </TouchableOpacity>
          </View>
          {recentUpdates.map((update) => (
            <TouchableOpacity
              key={update.id}
              className="bg-surface rounded-xl p-4 mb-3 border border-border"
              onPress={() => router.push(`/update/${update.id}` as any)}
              activeOpacity={0.7}
            >
              <View className="flex-row items-center mb-2">
                <View 
                  className="px-2 py-1 rounded-full mr-2"
                  style={{ backgroundColor: getPriorityColor(update.priority) + '20' }}
                >
                  <Text 
                    className="text-xs font-semibold uppercase"
                    style={{ color: getPriorityColor(update.priority) }}
                  >
                    {update.priority}
                  </Text>
                </View>
                <Text className="text-xs text-muted">{update.jurisdiction}</Text>
              </View>
              <Text className="text-base font-semibold text-foreground mb-1">{update.title}</Text>
              <Text className="text-sm text-muted" numberOfLines={2}>{update.summary}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* FAQ Preview */}
        <View className="px-4 py-4">
          <View className="flex-row items-center justify-between mb-3 px-1">
            <Text className="text-lg font-semibold text-foreground">Common Questions</Text>
            <TouchableOpacity onPress={() => router.push("/faq" as any)} activeOpacity={0.7}>
              <Text className="text-sm" style={{ color: colors.primary }}>See All</Text>
            </TouchableOpacity>
          </View>
          {topFaqs.map((faq) => (
            <TouchableOpacity
              key={faq.id}
              className="bg-surface rounded-xl p-4 mb-3 border border-border flex-row items-center"
              onPress={() => router.push("/faq" as any)}
              activeOpacity={0.7}
            >
              <View 
                className="w-8 h-8 rounded-full items-center justify-center mr-3"
                style={{ backgroundColor: colors.primary + '20' }}
              >
                <IconSymbol name="questionmark.circle" size={18} color={colors.primary} />
              </View>
              <Text className="flex-1 text-sm font-medium text-foreground" numberOfLines={2}>
                {faq.question}
              </Text>
              <IconSymbol name="chevron.right" size={18} color={colors.muted} />
            </TouchableOpacity>
          ))}
        </View>

        {/* All Resources Grid */}
        <View className="px-4 py-4">
          <Text className="text-lg font-semibold text-foreground mb-3 px-1">All Resources</Text>
          <View className="flex-row flex-wrap justify-between">
            {moreResources.map((item, index) => (
              <TouchableOpacity
                key={index}
                className="w-[48%] bg-surface rounded-xl p-3 mb-3 border border-border flex-row items-center"
                onPress={() => router.push(item.route as any)}
                activeOpacity={0.7}
              >
                <View 
                  className="w-8 h-8 rounded-full items-center justify-center mr-2"
                  style={{ backgroundColor: colors.primary + '15' }}
                >
                  <IconSymbol name={item.icon} size={16} color={colors.primary} />
                </View>
                <Text className="text-xs font-medium text-foreground flex-1" numberOfLines={1}>{item.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Footer */}
        <Footer showDisclaimer={true} />
      </ScrollView>
    </ScreenContainer>
  );
}
