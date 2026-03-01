import { ScrollView, Text, View, TouchableOpacity, Linking } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";

import { ScreenContainer } from "@/components/screen-container";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useColors } from "@/hooks/use-colors";
import { rights, rightsCategories } from "@/data/legal-content";

export default function RightDetailScreen() {
  const router = useRouter();
  const colors = useColors();
  const { id } = useLocalSearchParams<{ id: string }>();

  const right = rights.find(r => r.id === id);
  const category = right ? rightsCategories.find(c => c.id === right.category) : null;

  if (!right) {
    return (
      <ScreenContainer className="items-center justify-center">
        <Text className="text-lg text-muted">Right not found</Text>
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

  // Find related rights in the same category
  const relatedRights = rights
    .filter(r => r.category === right.category && r.id !== right.id)
    .slice(0, 3);

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
              style={{ backgroundColor: colors.primary + '20' }}
            >
              <Text className="text-xs" style={{ color: colors.primary }}>{category?.name}</Text>
            </View>
          </View>
          <Text className="text-2xl font-bold text-foreground">{right.title}</Text>
        </View>

        {/* Summary */}
        <View className="px-4 py-4">
          <View className="bg-primary/10 rounded-xl p-4 border border-primary/30">
            <Text className="text-base text-foreground leading-relaxed">{right.summary}</Text>
          </View>
        </View>

        {/* Full Explanation */}
        <View className="px-4 py-2">
          <Text className="text-lg font-semibold text-foreground mb-3 px-1">Full Explanation</Text>
          <View className="bg-surface rounded-xl p-4 border border-border">
            <Text className="text-base text-foreground leading-relaxed">{right.fullText}</Text>
          </View>
        </View>

        {/* Legal Basis */}
        <View className="px-4 py-4">
          <Text className="text-lg font-semibold text-foreground mb-3 px-1">Legal Basis</Text>
          <View className="bg-surface rounded-xl p-4 border border-border">
            <View className="flex-row items-start">
              <IconSymbol name="scale.3d" size={20} color={colors.primary} style={{ marginTop: 2 }} />
              <Text className="flex-1 text-base text-foreground ml-3">{right.legalBasis}</Text>
            </View>
          </View>
        </View>

        {/* Source */}
        <View className="px-4 py-2">
          <Text className="text-lg font-semibold text-foreground mb-3 px-1">Source</Text>
          <TouchableOpacity
            className="bg-surface rounded-xl p-4 border border-border flex-row items-center"
            onPress={() => Linking.openURL(right.sourceUrl)}
            activeOpacity={0.7}
          >
            <View 
              className="w-10 h-10 rounded-full items-center justify-center mr-3"
              style={{ backgroundColor: colors.primary + '20' }}
            >
              <IconSymbol name="link" size={20} color={colors.primary} />
            </View>
            <View className="flex-1">
              <Text className="text-base font-medium text-foreground">{right.sourceName}</Text>
              <Text className="text-xs text-muted" numberOfLines={1}>{right.sourceUrl}</Text>
            </View>
            <IconSymbol name="arrow.up.right" size={18} color={colors.primary} />
          </TouchableOpacity>
        </View>

        {/* What To Do */}
        <View className="px-4 py-4">
          <Text className="text-lg font-semibold text-foreground mb-3 px-1">If Your Rights Are Violated</Text>
          <View className="bg-warning/10 rounded-xl p-4 border border-warning/30">
            <View className="flex-row items-start mb-3">
              <View 
                className="w-6 h-6 rounded-full items-center justify-center mr-3 mt-0.5"
                style={{ backgroundColor: colors.warning }}
              >
                <Text className="text-xs text-white font-bold">1</Text>
              </View>
              <Text className="flex-1 text-sm text-foreground">
                Document everything - dates, times, names, what happened
              </Text>
            </View>
            <View className="flex-row items-start mb-3">
              <View 
                className="w-6 h-6 rounded-full items-center justify-center mr-3 mt-0.5"
                style={{ backgroundColor: colors.warning }}
              >
                <Text className="text-xs text-white font-bold">2</Text>
              </View>
              <Text className="flex-1 text-sm text-foreground">
                File a grievance through the facility's grievance process
              </Text>
            </View>
            <View className="flex-row items-start mb-3">
              <View 
                className="w-6 h-6 rounded-full items-center justify-center mr-3 mt-0.5"
                style={{ backgroundColor: colors.warning }}
              >
                <Text className="text-xs text-white font-bold">3</Text>
              </View>
              <Text className="flex-1 text-sm text-foreground">
                Keep copies of all grievances and responses
              </Text>
            </View>
            <View className="flex-row items-start">
              <View 
                className="w-6 h-6 rounded-full items-center justify-center mr-3 mt-0.5"
                style={{ backgroundColor: colors.warning }}
              >
                <Text className="text-xs text-white font-bold">4</Text>
              </View>
              <Text className="flex-1 text-sm text-foreground">
                Contact family or legal aid organizations if needed
              </Text>
            </View>
          </View>
        </View>

        {/* Related Rights */}
        {relatedRights.length > 0 && (
          <View className="px-4 py-4">
            <Text className="text-lg font-semibold text-foreground mb-3 px-1">Related Rights</Text>
            {relatedRights.map((relatedRight) => (
              <TouchableOpacity
                key={relatedRight.id}
                className="bg-surface rounded-xl p-4 mb-3 border border-border flex-row items-center"
                onPress={() => router.push(`/right/${relatedRight.id}` as any)}
                activeOpacity={0.7}
              >
                <View 
                  className="w-10 h-10 rounded-full items-center justify-center mr-3"
                  style={{ backgroundColor: colors.primary + '20' }}
                >
                  <IconSymbol name="shield.fill" size={20} color={colors.primary} />
                </View>
                <View className="flex-1">
                  <Text className="text-base font-medium text-foreground">{relatedRight.title}</Text>
                  <Text className="text-xs text-muted" numberOfLines={1}>{relatedRight.summary}</Text>
                </View>
                <IconSymbol name="chevron.right" size={18} color={colors.muted} />
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Ask AI */}
        <View className="px-4 py-4">
          <TouchableOpacity
            className="bg-primary rounded-xl p-4 flex-row items-center justify-center"
            onPress={() => router.push("/assistant" as any)}
            activeOpacity={0.7}
          >
            <IconSymbol name="bubble.left.fill" size={20} color="#FFFFFF" />
            <Text className="text-white font-semibold ml-2">Ask AI About This Right</Text>
          </TouchableOpacity>
        </View>

        {/* Disclaimer */}
        <View className="px-4 py-4 mb-4">
          <View className="bg-surface rounded-xl p-4 border border-border">
            <View className="flex-row items-start">
              <IconSymbol name="info.circle" size={18} color={colors.muted} style={{ marginTop: 2 }} />
              <Text className="flex-1 text-xs text-muted ml-2 leading-relaxed">
                This information is educational and does not constitute legal advice. 
                Rights may vary by jurisdiction. Consult an attorney for specific legal questions.
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
