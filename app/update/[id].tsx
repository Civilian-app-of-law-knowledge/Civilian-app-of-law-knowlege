import { ScrollView, Text, View, TouchableOpacity, Linking } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";

import { ScreenContainer } from "@/components/screen-container";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useColors } from "@/hooks/use-colors";
import { lawUpdates } from "@/data/legal-content";

export default function UpdateDetailScreen() {
  const router = useRouter();
  const colors = useColors();
  const { id } = useLocalSearchParams<{ id: string }>();

  const update = lawUpdates.find(u => u.id === id);

  if (!update) {
    return (
      <ScreenContainer className="items-center justify-center">
        <Text className="text-lg text-muted">Update not found</Text>
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

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return colors.error;
      case 'important': return colors.warning;
      default: return colors.muted;
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'critical': return 'exclamationmark.triangle';
      case 'important': return 'exclamationmark.circle';
      default: return 'info.circle';
    }
  };

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
          <Text className="text-2xl font-bold text-foreground">{update.title}</Text>
        </View>

        {/* Priority Banner */}
        {update.priority === 'critical' && (
          <View className="px-4 py-2">
            <View className="bg-error/10 rounded-xl p-4 border border-error/30 flex-row items-center">
              <IconSymbol name="exclamationmark.triangle" size={20} color={colors.error} />
              <Text className="flex-1 text-sm font-medium text-foreground ml-2">
                This is a critical update that may have immediate impact.
              </Text>
            </View>
          </View>
        )}

        {/* Summary */}
        <View className="px-4 py-4">
          <View className="bg-primary/10 rounded-xl p-4 border border-primary/30">
            <Text className="text-base text-foreground leading-relaxed">{update.summary}</Text>
          </View>
        </View>

        {/* Details */}
        <View className="px-4 py-2">
          <Text className="text-lg font-semibold text-foreground mb-3 px-1">Details</Text>
          <View className="bg-surface rounded-xl p-4 border border-border">
            <Text className="text-base text-foreground leading-relaxed">{update.details}</Text>
          </View>
        </View>

        {/* Key Info */}
        <View className="px-4 py-4">
          <Text className="text-lg font-semibold text-foreground mb-3 px-1">Key Information</Text>
          <View className="bg-surface rounded-xl border border-border overflow-hidden">
            <View className="p-4 border-b border-border">
              <Text className="text-xs text-muted mb-1">Effective Date</Text>
              <View className="flex-row items-center">
                <IconSymbol name="calendar" size={16} color={colors.primary} />
                <Text className="text-base text-foreground ml-2">{update.effectiveDate}</Text>
              </View>
            </View>
            <View className="p-4 border-b border-border">
              <Text className="text-xs text-muted mb-1">Jurisdiction</Text>
              <View className="flex-row items-center">
                <IconSymbol name="building.columns" size={16} color={colors.primary} />
                <Text className="text-base text-foreground ml-2">{update.jurisdiction}</Text>
              </View>
            </View>
            <View className="p-4">
              <Text className="text-xs text-muted mb-1">Category</Text>
              <View className="flex-row items-center">
                <IconSymbol name="tag" size={16} color={colors.primary} />
                <Text className="text-base text-foreground ml-2">{update.category}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Source */}
        <View className="px-4 py-2">
          <Text className="text-lg font-semibold text-foreground mb-3 px-1">Source</Text>
          <TouchableOpacity
            className="bg-surface rounded-xl p-4 border border-border flex-row items-center"
            onPress={() => Linking.openURL(update.sourceUrl)}
            activeOpacity={0.7}
          >
            <View 
              className="w-10 h-10 rounded-full items-center justify-center mr-3"
              style={{ backgroundColor: colors.primary + '20' }}
            >
              <IconSymbol name="link" size={20} color={colors.primary} />
            </View>
            <View className="flex-1">
              <Text className="text-base font-medium text-foreground">{update.sourceName}</Text>
              <Text className="text-xs text-muted" numberOfLines={1}>View official source</Text>
            </View>
            <IconSymbol name="arrow.up.right" size={18} color={colors.primary} />
          </TouchableOpacity>
        </View>

        {/* What This Means */}
        <View className="px-4 py-4">
          <Text className="text-lg font-semibold text-foreground mb-3 px-1">What This Means For You</Text>
          <View className="bg-warning/10 rounded-xl p-4 border border-warning/30">
            <View className="flex-row items-start mb-2">
              <IconSymbol name="lightbulb" size={18} color={colors.warning} style={{ marginTop: 2 }} />
              <Text className="flex-1 text-sm text-foreground ml-2 leading-relaxed">
                Review the full details of this update to understand how it may affect your situation. 
                If you have questions about how this applies to your specific case, consult with a qualified attorney.
              </Text>
            </View>
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
            <Text className="text-white font-semibold ml-2">Ask AI About This Update</Text>
          </TouchableOpacity>
        </View>

        {/* Disclaimer */}
        <View className="px-4 py-4 mb-4">
          <View className="bg-surface rounded-xl p-4 border border-border">
            <View className="flex-row items-start">
              <IconSymbol name="info.circle" size={18} color={colors.muted} style={{ marginTop: 2 }} />
              <Text className="flex-1 text-xs text-muted ml-2 leading-relaxed">
                This summary is for informational purposes only. Always verify current laws with official sources or consult an attorney for legal advice.
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
