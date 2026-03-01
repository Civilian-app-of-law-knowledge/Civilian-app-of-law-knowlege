import { useState } from "react";
import { ScrollView, Text, View, TouchableOpacity, TextInput } from "react-native";
import { useRouter } from "expo-router";

import { ScreenContainer } from "@/components/screen-container";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useColors } from "@/hooks/use-colors";
import { rightsCategories, rights } from "@/data/legal-content";

export default function RightsScreen() {
  const router = useRouter();
  const colors = useColors();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredRights = rights.filter(right => {
    const matchesSearch = searchQuery === '' || 
      right.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      right.summary.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === null || right.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getCategoryIcon = (iconName: string) => {
    const iconMap: Record<string, any> = {
      'cross.case.fill': 'cross.case.fill',
      'hands.sparkles': 'hands.sparkles',
      'figure.stand': 'figure.stand',
      'list.bullet.clipboard': 'list.bullet.clipboard',
      'scale.3d': 'scale.3d',
      'doc.text': 'doc.text',
      'person.fill': 'person.fill',
      'bubble.left.fill': 'bubble.left.fill',
    };
    return iconMap[iconName] || 'shield.fill';
  };

  const additionalGuides = [
    { title: 'Grievance Filing Guide', subtitle: 'Step-by-step process', route: '/grievance-guide' },
    { title: 'Bail & Bond Information', subtitle: 'Understanding the system', route: '/bail-bond' },
    { title: 'Sentence Calculator Info', subtitle: 'Good time credits explained', route: '/sentence-info' },
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
            Know Your Rights
          </Text>
          <Text className="text-sm text-muted">
            Constitutional protections explained in plain language
          </Text>
        </View>

        {/* Search */}
        <View className="px-4 py-3">
          <View className="bg-surface rounded-xl border border-border overflow-hidden">
            <View className="flex-row items-center px-4">
              <IconSymbol name="magnifyingglass" size={20} color={colors.muted} />
              <TextInput
                className="flex-1 py-3 px-3 text-base text-foreground"
                placeholder="Search rights..."
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
            {rightsCategories.map((category) => (
              <TouchableOpacity
                key={category.id}
                className="px-4 py-2 rounded-full mr-2"
                style={{ 
                  backgroundColor: selectedCategory === category.id ? colors.primary : colors.surface,
                  borderWidth: 1,
                  borderColor: selectedCategory === category.id ? colors.primary : colors.border,
                }}
                onPress={() => setSelectedCategory(category.id)}
                activeOpacity={0.7}
              >
                <Text 
                  className="text-sm font-medium"
                  style={{ color: selectedCategory === category.id ? '#FFFFFF' : colors.foreground }}
                >
                  {category.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Rights List */}
        <View className="px-4 py-4">
          <Text className="text-lg font-semibold text-foreground mb-3 px-1">
            {selectedCategory 
              ? rightsCategories.find(c => c.id === selectedCategory)?.name 
              : 'All Rights'} 
            ({filteredRights.length})
          </Text>
          {filteredRights.map((right) => {
            const category = rightsCategories.find(c => c.id === right.category);
            return (
              <TouchableOpacity
                key={right.id}
                className="bg-surface rounded-xl p-4 mb-3 border border-border"
                onPress={() => router.push(`/right/${right.id}` as any)}
                activeOpacity={0.7}
              >
                <View className="flex-row items-start">
                  <View 
                    className="w-10 h-10 rounded-full items-center justify-center mr-3"
                    style={{ backgroundColor: colors.primary + '20' }}
                  >
                    <IconSymbol 
                      name={getCategoryIcon(category?.icon || 'shield.fill') as any} 
                      size={20} 
                      color={colors.primary} 
                    />
                  </View>
                  <View className="flex-1">
                    <View className="flex-row items-center mb-1">
                      <View 
                        className="px-2 py-0.5 rounded-full mr-2"
                        style={{ backgroundColor: colors.muted + '30' }}
                      >
                        <Text className="text-xs text-muted">{category?.name}</Text>
                      </View>
                    </View>
                    <Text className="text-base font-semibold text-foreground mb-1">{right.title}</Text>
                    <Text className="text-sm text-muted" numberOfLines={2}>{right.summary}</Text>
                  </View>
                  <IconSymbol name="chevron.right" size={18} color={colors.muted} />
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Additional Guides */}
        <View className="px-4 py-4">
          <Text className="text-lg font-semibold text-foreground mb-3 px-1">Helpful Guides</Text>
          {additionalGuides.map((guide, index) => (
            <TouchableOpacity
              key={index}
              className="bg-surface rounded-xl p-4 mb-3 border border-border flex-row items-center"
              onPress={() => router.push(guide.route as any)}
              activeOpacity={0.7}
            >
              <View 
                className="w-10 h-10 rounded-full items-center justify-center mr-3"
                style={{ backgroundColor: colors.warning + '20' }}
              >
                <IconSymbol name="doc.text" size={20} color={colors.warning} />
              </View>
              <View className="flex-1">
                <Text className="text-base font-semibold text-foreground">{guide.title}</Text>
                <Text className="text-sm text-muted">{guide.subtitle}</Text>
              </View>
              <IconSymbol name="chevron.right" size={18} color={colors.muted} />
            </TouchableOpacity>
          ))}
        </View>

        {/* Law Updates Link */}
        <View className="px-4 py-2">
          <TouchableOpacity
            className="bg-primary/10 rounded-xl p-4 border border-primary/30 flex-row items-center"
            onPress={() => router.push("/updates" as any)}
            activeOpacity={0.7}
          >
            <View 
              className="w-10 h-10 rounded-full items-center justify-center mr-3"
              style={{ backgroundColor: colors.primary + '30' }}
            >
              <IconSymbol name="bell.fill" size={20} color={colors.primary} />
            </View>
            <View className="flex-1">
              <Text className="text-base font-semibold text-foreground">Law Updates & Alerts</Text>
              <Text className="text-sm text-muted">Stay informed about legal changes</Text>
            </View>
            <IconSymbol name="chevron.right" size={18} color={colors.primary} />
          </TouchableOpacity>
        </View>

        {/* Disclaimer */}
        <View className="px-4 py-4 mb-4">
          <View className="bg-surface rounded-xl p-4 border border-border">
            <View className="flex-row items-start">
              <IconSymbol name="info.circle" size={18} color={colors.muted} style={{ marginTop: 2 }} />
              <Text className="flex-1 text-xs text-muted ml-2 leading-relaxed">
                This information is educational and does not constitute legal advice. 
                Rights may vary by jurisdiction and circumstances. Consult an attorney for specific legal questions.
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
