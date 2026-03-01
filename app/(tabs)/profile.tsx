import { useState, useCallback } from "react";
import { ScrollView, Text, View, TouchableOpacity, TextInput, Switch } from "react-native";
import { useRouter, useFocusEffect } from "expo-router";

import { ScreenContainer } from "@/components/screen-container";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useColors } from "@/hooks/use-colors";
import { ProfileStorage, DocumentWallet, UserProfile } from "@/lib/document-wallet";
import { CaseStorage } from "@/lib/case-storage";

export default function ProfileScreen() {
  const router = useRouter();
  const colors = useColors();

  const [profile, setProfile] = useState<UserProfile>({
    name: "",
    allowAnalytics: false,
    allowNotifications: true,
    darkModeOverride: "system",
  });
  const [docCount, setDocCount] = useState(0);
  const [caseCount, setCaseCount] = useState(0);
  const [editingName, setEditingName] = useState(false);
  const [nameInput, setNameInput] = useState("");

  const loadData = useCallback(async () => {
    const [p, { total }, cases] = await Promise.all([
      ProfileStorage.get(),
      DocumentWallet.getCounts(),
      CaseStorage.getCases(),
    ]);
    setProfile(p);
    setNameInput(p.name);
    setDocCount(total);
    setCaseCount(cases.length);
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [loadData])
  );

  const saveName = async () => {
    const updated = await ProfileStorage.update({ name: nameInput.trim() });
    setProfile(updated);
    setEditingName(false);
  };

  const toggleAnalytics = async (val: boolean) => {
    const updated = await ProfileStorage.update({ allowAnalytics: val });
    setProfile(updated);
  };

  const toggleNotifications = async (val: boolean) => {
    const updated = await ProfileStorage.update({ allowNotifications: val });
    setProfile(updated);
  };

  const displayName = profile.name.trim() || "Anonymous User";

  return (
    <ScreenContainer>
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View className="px-5 pt-4 pb-6 bg-surface">
          <Text className="text-2xl font-bold text-foreground mb-1">My Profile</Text>
          <Text className="text-sm text-muted">Manage your account and privacy settings</Text>
        </View>

        {/* Avatar + Name */}
        <View className="px-4 py-4">
          <View className="bg-surface rounded-xl p-5 border border-border items-center">
            <View
              className="w-20 h-20 rounded-full items-center justify-center mb-4"
              style={{ backgroundColor: colors.primary + "20" }}
            >
              <IconSymbol name="person.fill" size={40} color={colors.primary} />
            </View>

            {editingName ? (
              <View className="w-full flex-row items-center mb-2">
                <TextInput
                  className="flex-1 bg-background rounded-xl px-4 py-3 text-base text-foreground border border-border mr-2"
                  placeholder="Enter your name"
                  placeholderTextColor={colors.muted}
                  value={nameInput}
                  onChangeText={setNameInput}
                  autoFocus
                  returnKeyType="done"
                  onSubmitEditing={saveName}
                />
                <TouchableOpacity
                  className="px-4 py-3 rounded-xl"
                  style={{ backgroundColor: colors.primary }}
                  onPress={saveName}
                  activeOpacity={0.7}
                >
                  <Text className="text-white font-semibold">Save</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity
                className="flex-row items-center mb-1"
                onPress={() => setEditingName(true)}
                activeOpacity={0.7}
              >
                <Text className="text-xl font-bold text-foreground mr-2">{displayName}</Text>
                <IconSymbol name="pencil" size={16} color={colors.muted} />
              </TouchableOpacity>
            )}

            <Text className="text-sm text-muted">Tap name to edit</Text>
          </View>
        </View>

        {/* Stats */}
        <View className="px-4 py-2">
          <Text className="text-base font-semibold text-foreground mb-3 px-1">My Data</Text>
          <View className="flex-row">
            <TouchableOpacity
              className="flex-1 bg-surface rounded-xl p-4 mr-2 border border-border items-center"
              onPress={() => router.push("/document-wallet" as any)}
              activeOpacity={0.7}
            >
              <View
                className="w-12 h-12 rounded-full items-center justify-center mb-2"
                style={{ backgroundColor: colors.primary + "20" }}
              >
                <IconSymbol name="folder.fill" size={24} color={colors.primary} />
              </View>
              <Text className="text-2xl font-bold text-foreground">{docCount}</Text>
              <Text className="text-xs text-muted text-center">Saved Documents</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="flex-1 bg-surface rounded-xl p-4 ml-2 border border-border items-center"
              onPress={() => router.push("/my-case" as any)}
              activeOpacity={0.7}
            >
              <View
                className="w-12 h-12 rounded-full items-center justify-center mb-2"
                style={{ backgroundColor: colors.primary + "20" }}
              >
                <IconSymbol name="doc.text" size={24} color={colors.primary} />
              </View>
              <Text className="text-2xl font-bold text-foreground">{caseCount}</Text>
              <Text className="text-xs text-muted text-center">Saved Cases</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Quick Links */}
        <View className="px-4 py-4">
          <Text className="text-base font-semibold text-foreground mb-3 px-1">My Tools</Text>
          {[
            {
              title: "Document Wallet",
              subtitle: `${docCount} document${docCount !== 1 ? "s" : ""} saved`,
              icon: "folder.fill" as const,
              route: "/document-wallet",
            },
            {
              title: "My Case",
              subtitle: `${caseCount} case${caseCount !== 1 ? "s" : ""} tracked`,
              icon: "doc.text" as const,
              route: "/my-case",
            },
            {
              title: "Notification Settings",
              subtitle: "Court date reminders",
              icon: "bell.fill" as const,
              route: "/notification-settings",
            },
          ].map((item, idx) => (
            <TouchableOpacity
              key={idx}
              className="bg-surface rounded-xl p-4 mb-3 border border-border flex-row items-center"
              onPress={() => router.push(item.route as any)}
              activeOpacity={0.7}
            >
              <View
                className="w-10 h-10 rounded-full items-center justify-center mr-3"
                style={{ backgroundColor: colors.primary + "20" }}
              >
                <IconSymbol name={item.icon} size={20} color={colors.primary} />
              </View>
              <View className="flex-1">
                <Text className="text-base font-semibold text-foreground">{item.title}</Text>
                <Text className="text-sm text-muted">{item.subtitle}</Text>
              </View>
              <IconSymbol name="chevron.right" size={18} color={colors.muted} />
            </TouchableOpacity>
          ))}
        </View>

        {/* Privacy Toggles */}
        <View className="px-4 py-4">
          <Text className="text-base font-semibold text-foreground mb-3 px-1">Privacy Settings</Text>
          <View className="bg-surface rounded-xl border border-border overflow-hidden">
            {/* Notifications */}
            <View className="flex-row items-center justify-between px-4 py-4 border-b border-border">
              <View className="flex-row items-center flex-1 mr-3">
                <View
                  className="w-8 h-8 rounded-full items-center justify-center mr-3"
                  style={{ backgroundColor: colors.primary + "20" }}
                >
                  <IconSymbol name="bell.fill" size={16} color={colors.primary} />
                </View>
                <View className="flex-1">
                  <Text className="text-sm font-semibold text-foreground">Notifications</Text>
                  <Text className="text-xs text-muted">Court date and case reminders</Text>
                </View>
              </View>
              <Switch
                value={profile.allowNotifications}
                onValueChange={toggleNotifications}
                trackColor={{ false: colors.border, true: colors.primary + "80" }}
                thumbColor={profile.allowNotifications ? colors.primary : colors.muted}
              />
            </View>

            {/* Analytics */}
            <View className="flex-row items-center justify-between px-4 py-4">
              <View className="flex-row items-center flex-1 mr-3">
                <View
                  className="w-8 h-8 rounded-full items-center justify-center mr-3"
                  style={{ backgroundColor: colors.muted + "20" }}
                >
                  <IconSymbol name="chart.bar" size={16} color={colors.muted} />
                </View>
                <View className="flex-1">
                  <Text className="text-sm font-semibold text-foreground">Analytics</Text>
                  <Text className="text-xs text-muted">Share anonymous usage data to improve the app</Text>
                </View>
              </View>
              <Switch
                value={profile.allowAnalytics}
                onValueChange={toggleAnalytics}
                trackColor={{ false: colors.border, true: colors.primary + "80" }}
                thumbColor={profile.allowAnalytics ? colors.primary : colors.muted}
              />
            </View>
          </View>
        </View>

        {/* Privacy Notice */}
        <View className="px-4 py-2">
          <View className="bg-success/10 rounded-xl p-4 border border-success/30">
            <View className="flex-row items-start">
              <IconSymbol name="checkmark.shield.fill" size={18} color={colors.success} style={{ marginTop: 2 }} />
              <Text className="flex-1 text-xs text-muted ml-2 leading-relaxed">
                Your data is stored only on your device. No personal information is sent to any
                server. This app does not require an account.
              </Text>
            </View>
          </View>
        </View>

        {/* Legal Disclaimer */}
        <View className="px-4 py-4 mb-4">
          <View className="bg-surface rounded-xl p-4 border border-border">
            <View className="flex-row items-start">
              <IconSymbol name="info.circle" size={18} color={colors.muted} style={{ marginTop: 2 }} />
              <Text className="flex-1 text-xs text-muted ml-2 leading-relaxed">
                Civilian Law of Knowledge is an educational platform. Content is for informational
                purposes only and does not constitute legal advice. Always consult a qualified
                attorney for your specific situation.
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
