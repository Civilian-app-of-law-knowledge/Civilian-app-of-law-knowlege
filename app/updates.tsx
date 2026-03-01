import { useState } from "react";
import { ScrollView, Text, View, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

import { ScreenContainer } from "@/components/screen-container";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useColors } from "@/hooks/use-colors";
import { lawUpdates } from "@/data/legal-content";

type PriorityFilter = 'all' | 'critical' | 'important' | 'informational';

export default function UpdatesScreen() {
  const router = useRouter();
  const colors = useColors();
  const [selectedPriority, setSelectedPriority] = useState<PriorityFilter>('all');

  const priorities = [
    { id: 'all' as PriorityFilter, label: 'All' },
    { id: 'critical' as PriorityFilter, label: 'Critical' },
    { id: 'important' as PriorityFilter, label: 'Important' },
    { id: 'informational' as PriorityFilter, label: 'Info' },
  ];

  const filteredUpdates = lawUpdates.filter(update => 
    selectedPriority === 'all' || update.priority === selectedPriority
  );

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
        <View className="px-5 pt-4 pb-4 bg-surface flex-row items-center">
          <TouchableOpacity
            className="mr-3 p-1"
            onPress={() => router.back()}
            activeOpacity={0.7}
          >
            <IconSymbol name="chevron.left" size={24} color={colors.foreground} />
          </TouchableOpacity>
          <View>
            <Text className="text-xl font-bold text-foreground">Law Updates & Alerts</Text>
            <Text className="text-sm text-muted">Stay informed about legal changes</Text>
          </View>
        </View>

        {/* Priority Legend */}
        <View className="px-4 py-3">
          <View className="bg-surface rounded-xl p-4 border border-border">
            <Text className="text-sm font-semibold text-foreground mb-3">Priority Levels</Text>
            <View className="flex-row flex-wrap">
              <View className="flex-row items-center mr-4 mb-2">
                <View 
                  className="w-3 h-3 rounded-full mr-2"
                  style={{ backgroundColor: colors.error }}
                />
                <Text className="text-xs text-muted">Critical - Immediate impact</Text>
              </View>
              <View className="flex-row items-center mr-4 mb-2">
                <View 
                  className="w-3 h-3 rounded-full mr-2"
                  style={{ backgroundColor: colors.warning }}
                />
                <Text className="text-xs text-muted">Important - Significant change</Text>
              </View>
              <View className="flex-row items-center mb-2">
                <View 
                  className="w-3 h-3 rounded-full mr-2"
                  style={{ backgroundColor: colors.muted }}
                />
                <Text className="text-xs text-muted">Informational - Good to know</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Priority Filter */}
        <View className="px-4 py-2">
          <View className="flex-row bg-surface rounded-xl p-1 border border-border">
            {priorities.map((priority) => (
              <TouchableOpacity
                key={priority.id}
                className="flex-1 py-2 rounded-lg"
                style={{ 
                  backgroundColor: selectedPriority === priority.id ? colors.primary : 'transparent' 
                }}
                onPress={() => setSelectedPriority(priority.id)}
                activeOpacity={0.7}
              >
                <Text 
                  className="text-center text-sm font-medium"
                  style={{ 
                    color: selectedPriority === priority.id ? '#FFFFFF' : colors.muted 
                  }}
                >
                  {priority.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Updates List */}
        <View className="px-4 py-4">
          <Text className="text-sm text-muted mb-3 px-1">
            {filteredUpdates.length} updates
          </Text>
          {filteredUpdates.map((update) => (
            <TouchableOpacity
              key={update.id}
              className="bg-surface rounded-xl p-4 mb-3 border border-border"
              onPress={() => router.push(`/update/${update.id}` as any)}
              activeOpacity={0.7}
            >
              <View className="flex-row items-start">
                <View 
                  className="w-10 h-10 rounded-full items-center justify-center mr-3"
                  style={{ backgroundColor: getPriorityColor(update.priority) + '20' }}
                >
                  <IconSymbol 
                    name={getPriorityIcon(update.priority) as any} 
                    size={20} 
                    color={getPriorityColor(update.priority)} 
                  />
                </View>
                <View className="flex-1">
                  <View className="flex-row items-center flex-wrap mb-1">
                    <View 
                      className="px-2 py-0.5 rounded-full mr-2"
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
                  <Text className="text-sm text-muted mb-2" numberOfLines={2}>{update.summary}</Text>
                  <View className="flex-row items-center">
                    <IconSymbol name="calendar" size={12} color={colors.muted} />
                    <Text className="text-xs text-muted ml-1">
                      Effective: {update.effectiveDate}
                    </Text>
                  </View>
                </View>
                <IconSymbol name="chevron.right" size={18} color={colors.muted} />
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Subscribe CTA */}
        <View className="px-4 py-4">
          <View className="bg-primary/10 rounded-xl p-4 border border-primary/30">
            <View className="flex-row items-center mb-2">
              <IconSymbol name="bell.fill" size={18} color={colors.primary} />
              <Text className="text-base font-semibold text-foreground ml-2">Stay Updated</Text>
            </View>
            <Text className="text-sm text-muted leading-relaxed">
              Check back regularly for the latest legal updates and changes that may affect you or your loved ones.
            </Text>
          </View>
        </View>

        {/* Disclaimer */}
        <View className="px-4 py-4 mb-4">
          <View className="bg-surface rounded-xl p-4 border border-border">
            <View className="flex-row items-start">
              <IconSymbol name="info.circle" size={18} color={colors.muted} style={{ marginTop: 2 }} />
              <Text className="flex-1 text-xs text-muted ml-2 leading-relaxed">
                Law updates are provided for informational purposes. Always verify current laws with official sources or consult an attorney.
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
