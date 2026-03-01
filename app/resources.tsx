import { useState } from "react";
import { ScrollView, Text, View, TouchableOpacity, TextInput, Linking } from "react-native";
import { useRouter } from "expo-router";

import { ScreenContainer } from "@/components/screen-container";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useColors } from "@/hooks/use-colors";
import { resources } from "@/data/legal-content";

export default function ResourcesScreen() {
  const router = useRouter();
  const colors = useColors();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Get unique categories
  const categories = [...new Set(resources.map(r => r.category))];

  const filteredResources = resources.filter(resource => {
    const matchesSearch = searchQuery === '' || 
      resource.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === null || resource.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Legal Aid': return 'scale.3d';
      case 'Civil Rights': return 'shield.fill';
      case 'Reentry': return 'building.columns';
      case 'Family Support': return 'heart.fill';
      case 'Mental Health': return 'brain';
      case 'Government': return 'building.columns';
      default: return 'link';
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
            <Text className="text-xl font-bold text-foreground">Resource Library</Text>
            <Text className="text-sm text-muted">Helpful organizations and links</Text>
          </View>
        </View>

        {/* Search */}
        <View className="px-4 py-3">
          <View className="bg-surface rounded-xl border border-border overflow-hidden">
            <View className="flex-row items-center px-4">
              <IconSymbol name="magnifyingglass" size={20} color={colors.muted} />
              <TextInput
                className="flex-1 py-3 px-3 text-base text-foreground"
                placeholder="Search resources..."
                placeholderTextColor={colors.muted}
                value={searchQuery}
                onChangeText={setSearchQuery}
                returnKeyType="search"
              />
              {searchQuery.length > 0 && (
                <TouchableOpacity onPress={() => setSearchQuery('')} activeOpacity={0.7}>
                  <IconSymbol name="xmark.circle.fill" size={20} color={colors.muted} />
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>

        {/* Category Filter */}
        <View className="px-4 py-2">
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <TouchableOpacity
              className="px-4 py-2 rounded-full mr-2"
              style={{ 
                backgroundColor: selectedCategory === null ? colors.primary : colors.surface,
                borderWidth: 1,
                borderColor: selectedCategory === null ? colors.primary : colors.border,
              }}
              onPress={() => setSelectedCategory(null)}
              activeOpacity={0.7}
            >
              <Text 
                className="text-sm font-medium"
                style={{ color: selectedCategory === null ? '#FFFFFF' : colors.foreground }}
              >
                All
              </Text>
            </TouchableOpacity>
            {categories.map((category) => (
              <TouchableOpacity
                key={category}
                className="px-4 py-2 rounded-full mr-2"
                style={{ 
                  backgroundColor: selectedCategory === category ? colors.primary : colors.surface,
                  borderWidth: 1,
                  borderColor: selectedCategory === category ? colors.primary : colors.border,
                }}
                onPress={() => setSelectedCategory(category)}
                activeOpacity={0.7}
              >
                <Text 
                  className="text-sm font-medium"
                  style={{ color: selectedCategory === category ? '#FFFFFF' : colors.foreground }}
                >
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Resources List */}
        <View className="px-4 py-4">
          <Text className="text-sm text-muted mb-3 px-1">
            {filteredResources.length} resources
          </Text>
          {filteredResources.map((resource) => (
            <TouchableOpacity
              key={resource.id}
              className="bg-surface rounded-xl p-4 mb-3 border border-border"
              onPress={() => Linking.openURL(resource.websiteUrl)}
              activeOpacity={0.7}
            >
              <View className="flex-row items-start">
                <View 
                  className="w-10 h-10 rounded-full items-center justify-center mr-3"
                  style={{ backgroundColor: colors.primary + '20' }}
                >
                  <IconSymbol 
                    name={getCategoryIcon(resource.category) as any} 
                    size={20} 
                    color={colors.primary} 
                  />
                </View>
                <View className="flex-1">
                  <View className="flex-row items-center flex-wrap mb-1">
                    <View 
                      className="px-2 py-0.5 rounded-full mr-2"
                      style={{ backgroundColor: colors.muted + '30' }}
                    >
                      <Text className="text-xs text-muted">{resource.category}</Text>
                    </View>
                    {resource.national && (
                      <View 
                        className="px-2 py-0.5 rounded-full"
                        style={{ backgroundColor: colors.success + '20' }}
                      >
                        <Text className="text-xs" style={{ color: colors.success }}>National</Text>
                      </View>
                    )}
                  </View>
                  <Text className="text-base font-semibold text-foreground mb-1">{resource.name}</Text>
                  <Text className="text-sm text-muted mb-2" numberOfLines={2}>{resource.description}</Text>
                  {resource.phone && (
                    <TouchableOpacity 
                      className="flex-row items-center"
                      onPress={() => Linking.openURL(`tel:${resource.phone?.replace(/[^0-9]/g, '')}`)}
                      activeOpacity={0.7}
                    >
                      <IconSymbol name="bubble.left.fill" size={14} color={colors.primary} />
                      <Text className="text-sm ml-1" style={{ color: colors.primary }}>{resource.phone}</Text>
                    </TouchableOpacity>
                  )}
                </View>
                <IconSymbol name="arrow.up.right" size={18} color={colors.muted} />
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Suggest Resource */}
        <View className="px-4 py-4">
          <View className="bg-surface rounded-xl p-4 border border-border">
            <View className="flex-row items-center mb-2">
              <IconSymbol name="plus.circle" size={18} color={colors.primary} />
              <Text className="text-base font-semibold text-foreground ml-2">Know a helpful resource?</Text>
            </View>
            <Text className="text-sm text-muted leading-relaxed">
              We're always looking to expand our resource library. If you know of an organization that helps incarcerated individuals or their families, let us know.
            </Text>
          </View>
        </View>

        {/* Disclaimer */}
        <View className="px-4 py-4 mb-4">
          <View className="bg-surface rounded-xl p-4 border border-border">
            <View className="flex-row items-start">
              <IconSymbol name="info.circle" size={18} color={colors.muted} style={{ marginTop: 2 }} />
              <Text className="flex-1 text-xs text-muted ml-2 leading-relaxed">
                Inclusion in this directory does not constitute an endorsement. Always verify services and eligibility directly with the organization.
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
