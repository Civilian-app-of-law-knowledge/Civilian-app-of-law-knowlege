import { useState } from "react";
import { ScrollView, Text, View, TouchableOpacity, TextInput } from "react-native";
import { useRouter } from "expo-router";

import { ScreenContainer } from "@/components/screen-container";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useColors } from "@/hooks/use-colors";
import { faqs } from "@/data/legal-content";

export default function FAQScreen() {
  const router = useRouter();
  const colors = useColors();
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Get unique categories
  const categories = [...new Set(faqs.map(faq => faq.category))];

  const filteredFaqs = faqs.filter(faq => {
    const matchesSearch = searchQuery === '' || 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === null || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

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
            <Text className="text-xl font-bold text-foreground">Frequently Asked Questions</Text>
            <Text className="text-sm text-muted">Common questions answered</Text>
          </View>
        </View>

        {/* Search */}
        <View className="px-4 py-3">
          <View className="bg-surface rounded-xl border border-border overflow-hidden">
            <View className="flex-row items-center px-4">
              <IconSymbol name="magnifyingglass" size={20} color={colors.muted} />
              <TextInput
                className="flex-1 py-3 px-3 text-base text-foreground"
                placeholder="Search questions..."
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

        {/* FAQ List */}
        <View className="px-4 py-4">
          <Text className="text-sm text-muted mb-3 px-1">
            {filteredFaqs.length} questions
          </Text>
          {filteredFaqs.map((faq) => (
            <TouchableOpacity
              key={faq.id}
              className="bg-surface rounded-xl mb-3 border border-border overflow-hidden"
              onPress={() => setExpandedFaq(expandedFaq === faq.id ? null : faq.id)}
              activeOpacity={0.7}
            >
              <View className="p-4">
                <View className="flex-row items-start">
                  <View 
                    className="w-8 h-8 rounded-full items-center justify-center mr-3 mt-0.5"
                    style={{ backgroundColor: colors.primary + '20' }}
                  >
                    <IconSymbol name="questionmark.circle" size={18} color={colors.primary} />
                  </View>
                  <View className="flex-1">
                    <View className="flex-row items-center mb-1">
                      <View 
                        className="px-2 py-0.5 rounded-full"
                        style={{ backgroundColor: colors.muted + '30' }}
                      >
                        <Text className="text-xs text-muted">{faq.category}</Text>
                      </View>
                    </View>
                    <Text className="text-base font-medium text-foreground">{faq.question}</Text>
                  </View>
                  <IconSymbol 
                    name={expandedFaq === faq.id ? "chevron.up" : "chevron.down"} 
                    size={18} 
                    color={colors.muted} 
                  />
                </View>
              </View>
              {expandedFaq === faq.id && (
                <View className="px-4 pb-4 pt-0">
                  <View className="bg-background rounded-lg p-4 ml-11">
                    <Text className="text-sm text-foreground leading-relaxed">{faq.answer}</Text>
                  </View>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* Can't Find Answer */}
        <View className="px-4 py-4">
          <View className="bg-primary/10 rounded-xl p-4 border border-primary/30">
            <View className="flex-row items-center mb-2">
              <IconSymbol name="bubble.left.fill" size={18} color={colors.primary} />
              <Text className="text-base font-semibold text-foreground ml-2">Can't find your answer?</Text>
            </View>
            <Text className="text-sm text-muted leading-relaxed mb-3">
              Ask our AI assistant for help with your specific question.
            </Text>
            <TouchableOpacity
              className="bg-primary rounded-xl py-3 items-center"
              onPress={() => router.push("/assistant" as any)}
              activeOpacity={0.7}
            >
              <Text className="text-white font-semibold">Ask AI Assistant</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Disclaimer */}
        <View className="px-4 py-4 mb-4">
          <View className="bg-surface rounded-xl p-4 border border-border">
            <View className="flex-row items-start">
              <IconSymbol name="info.circle" size={18} color={colors.muted} style={{ marginTop: 2 }} />
              <Text className="flex-1 text-xs text-muted ml-2 leading-relaxed">
                These answers are for general information only and do not constitute legal advice. 
                Consult an attorney for advice specific to your situation.
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
