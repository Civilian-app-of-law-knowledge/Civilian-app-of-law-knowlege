import { ScrollView, Text, View, TouchableOpacity, Linking } from "react-native";
import { useRouter } from "expo-router";

import { ScreenContainer } from "@/components/screen-container";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useColors } from "@/hooks/use-colors";

export default function FamilyReunificationScreen() {
  const router = useRouter();
  const colors = useColors();

  const reunificationPrograms = [
    {
      title: 'Family Reunification Counseling',
      description: 'Professional counseling to help families reconnect after incarceration. Many programs are free or low-cost.',
      icon: 'heart.fill' as const,
      tips: [
        'Start counseling before release if possible',
        'Include children in age-appropriate sessions',
        'Be patient - rebuilding trust takes time',
        'Set realistic expectations for everyone',
      ],
    },
    {
      title: 'Parenting Classes',
      description: 'Learn effective parenting skills and how to reconnect with your children after time apart.',
      icon: 'person.2.fill' as const,
      tips: [
        'Many courts accept these for custody cases',
        'Available in-person and online',
        'Some facilities offer classes before release',
        'Ask about certificates for court documentation',
      ],
    },
    {
      title: 'Family Therapy Programs',
      description: 'Work with a therapist as a family unit to address trauma, rebuild communication, and heal together.',
      icon: 'bubble.left.and.bubble.right.fill' as const,
      tips: [
        'Look for trauma-informed therapists',
        'Many accept Medicaid or offer sliding scale',
        'Virtual options available for distance',
        'Include extended family when helpful',
      ],
    },
    {
      title: 'Co-Parenting Support',
      description: 'Resources for parents who need to work together after incarceration, even if no longer in a relationship.',
      icon: 'arrow.triangle.2.circlepath' as const,
      tips: [
        'Focus on the children\'s needs first',
        'Use co-parenting apps for communication',
        'Establish consistent routines',
        'Consider mediation for disagreements',
      ],
    },
  ];

  const childrenResources = [
    {
      name: 'Sesame Street: Little Children, Big Challenges',
      description: 'Free resources designed specifically for children with incarcerated parents, including videos and activities.',
      url: 'https://sesamestreetincommunities.org/topics/incarceration/',
      type: 'Educational Materials',
    },
    {
      name: 'Children of Inmates',
      description: 'Support groups and resources for children dealing with a parent\'s incarceration.',
      url: 'https://childrenofinmates.org/',
      type: 'Support Organization',
    },
    {
      name: 'Angel Tree (Prison Fellowship)',
      description: 'Provides Christmas gifts and support to children of incarcerated parents.',
      url: 'https://www.prisonfellowship.org/about/angel-tree/',
      type: 'Holiday Support',
    },
    {
      name: 'Big Brothers Big Sisters',
      description: 'Mentoring programs that can provide positive role models for children with incarcerated parents.',
      url: 'https://www.bbbs.org/',
      type: 'Mentoring',
    },
    {
      name: 'Camp Hope America',
      description: 'Summer camps specifically for children who have experienced trauma, including parental incarceration.',
      url: 'https://www.camphopetexas.org/',
      type: 'Youth Programs',
    },
  ];

  const transitionTips = [
    {
      phase: 'Before Release',
      icon: 'calendar' as const,
      tips: [
        'Start family counseling while still incarcerated if possible',
        'Have honest conversations about expectations',
        'Plan the first meeting - keep it simple and low-pressure',
        'Prepare children with age-appropriate information',
        'Connect with a reentry case manager',
      ],
    },
    {
      phase: 'First Days Home',
      icon: 'house.fill' as const,
      tips: [
        'Take things slow - don\'t try to fix everything at once',
        'Let children set the pace for reconnecting',
        'Establish simple routines together',
        'Be patient with yourself and family members',
        'Avoid major decisions in the first few weeks',
      ],
    },
    {
      phase: 'First Months',
      icon: 'heart.circle.fill' as const,
      tips: [
        'Continue family counseling or therapy',
        'Celebrate small wins and progress',
        'Address conflicts calmly and constructively',
        'Build new positive memories together',
        'Stay connected with support groups',
      ],
    },
    {
      phase: 'Long-Term Success',
      icon: 'star.fill' as const,
      tips: [
        'Maintain open communication',
        'Keep attending support groups or counseling',
        'Be consistent and reliable',
        'Focus on being present, not perfect',
        'Help children process their feelings ongoing',
      ],
    },
  ];

  const nationalResources = [
    { name: 'National Fatherhood Initiative', url: 'https://www.fatherhood.org/', description: 'Resources for fathers rebuilding relationships' },
    { name: 'National Institute of Corrections', url: 'https://nicic.gov/projects/children-incarcerated-parents', description: 'Research and programs for families' },
    { name: 'Osborne Association', url: 'https://www.osborneny.org/', description: 'Family services and reentry support' },
    { name: 'Hour Children', url: 'https://hourchildren.org/', description: 'Support for mothers and children' },
  ];

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
          <View className="flex-1">
            <Text className="text-xl font-bold text-foreground">Family Reunification</Text>
            <Text className="text-sm text-muted">Rebuilding bonds, healing together</Text>
          </View>
        </View>

        {/* Hero Section */}
        <View className="px-4 py-4">
          <View className="bg-primary rounded-xl p-5">
            <View className="flex-row items-center mb-3">
              <View className="w-14 h-14 rounded-full bg-white/20 items-center justify-center mr-3">
                <IconSymbol name="heart.fill" size={32} color="#FFFFFF" />
              </View>
              <View className="flex-1">
                <Text className="text-xl font-bold text-white">Families Heal Together</Text>
                <Text className="text-sm text-white/80">You're not alone in this journey</Text>
              </View>
            </View>
            <Text className="text-sm text-white/90 leading-relaxed">
              Reuniting with family after incarceration takes time, patience, and support. 
              These resources can help you rebuild relationships with your children, partner, 
              and loved ones. Remember: healing is possible, and many families have successfully 
              come back together stronger than before.
            </Text>
          </View>
        </View>

        {/* Encouragement Card */}
        <View className="px-4 py-2">
          <View className="bg-success/10 rounded-xl p-4 border border-success/30">
            <View className="flex-row items-center">
              <Text className="text-2xl mr-3">💚</Text>
              <View className="flex-1">
                <Text className="text-base font-semibold text-foreground">You Can Do This</Text>
                <Text className="text-sm text-muted">
                  Thousands of families successfully reunite every year. With the right support and commitment, 
                  you can rebuild those precious bonds.
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Reunification Programs */}
        <View className="px-4 py-4">
          <Text className="text-lg font-semibold text-foreground mb-3 px-1">Programs & Support</Text>
          {reunificationPrograms.map((program, index) => (
            <View key={index} className="bg-surface rounded-xl p-4 mb-3 border border-border">
              <View className="flex-row items-center mb-3">
                <View 
                  className="w-10 h-10 rounded-full items-center justify-center mr-3"
                  style={{ backgroundColor: colors.primary + '20' }}
                >
                  <IconSymbol name={program.icon} size={22} color={colors.primary} />
                </View>
                <View className="flex-1">
                  <Text className="text-base font-semibold text-foreground">{program.title}</Text>
                </View>
              </View>
              <Text className="text-sm text-muted mb-3">{program.description}</Text>
              <View className="bg-background rounded-lg p-3">
                <Text className="text-xs font-semibold text-foreground mb-2">Tips:</Text>
                {program.tips.map((tip, tipIndex) => (
                  <View key={tipIndex} className="flex-row items-start mb-1">
                    <Text className="text-primary mr-2">•</Text>
                    <Text className="flex-1 text-xs text-muted">{tip}</Text>
                  </View>
                ))}
              </View>
            </View>
          ))}
        </View>

        {/* Children's Resources */}
        <View className="px-4 py-4">
          <View className="flex-row items-center mb-3 px-1">
            <Text className="text-2xl mr-2">👨‍👩‍👧‍👦</Text>
            <Text className="text-lg font-semibold text-foreground">For the Children</Text>
          </View>
          <Text className="text-sm text-muted mb-3 px-1">
            Children need special support when a parent is incarcerated. These resources are designed 
            specifically to help kids understand, cope, and thrive.
          </Text>
          {childrenResources.map((resource, index) => (
            <TouchableOpacity
              key={index}
              className="bg-surface rounded-xl p-4 mb-3 border border-border"
              onPress={() => Linking.openURL(resource.url)}
              activeOpacity={0.7}
            >
              <View className="flex-row items-start">
                <View className="flex-1">
                  <View className="flex-row items-center mb-1">
                    <Text className="text-base font-semibold text-foreground flex-1">{resource.name}</Text>
                    <IconSymbol name="arrow.up.right" size={16} color={colors.primary} />
                  </View>
                  <Text className="text-xs text-primary mb-2">{resource.type}</Text>
                  <Text className="text-sm text-muted">{resource.description}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Transition Timeline */}
        <View className="px-4 py-4">
          <Text className="text-lg font-semibold text-foreground mb-3 px-1">Transition Timeline</Text>
          <Text className="text-sm text-muted mb-3 px-1">
            Reunification is a journey. Here's what to expect at each phase:
          </Text>
          {transitionTips.map((phase, index) => (
            <View key={index} className="bg-surface rounded-xl p-4 mb-3 border border-border">
              <View className="flex-row items-center mb-3">
                <View 
                  className="w-10 h-10 rounded-full items-center justify-center mr-3"
                  style={{ backgroundColor: colors.success + '20' }}
                >
                  <IconSymbol name={phase.icon} size={20} color={colors.success} />
                </View>
                <Text className="text-base font-semibold text-foreground">{phase.phase}</Text>
              </View>
              {phase.tips.map((tip, tipIndex) => (
                <View key={tipIndex} className="flex-row items-start mb-2 ml-13">
                  <View 
                    className="w-5 h-5 rounded-full items-center justify-center mr-2"
                    style={{ backgroundColor: colors.primary + '20' }}
                  >
                    <Text className="text-xs font-bold" style={{ color: colors.primary }}>{tipIndex + 1}</Text>
                  </View>
                  <Text className="flex-1 text-sm text-muted">{tip}</Text>
                </View>
              ))}
            </View>
          ))}
        </View>

        {/* National Resources */}
        <View className="px-4 py-4">
          <Text className="text-lg font-semibold text-foreground mb-3 px-1">National Organizations</Text>
          {nationalResources.map((resource, index) => (
            <TouchableOpacity
              key={index}
              className="bg-surface rounded-xl p-4 mb-3 border border-border flex-row items-center"
              onPress={() => Linking.openURL(resource.url)}
              activeOpacity={0.7}
            >
              <View 
                className="w-10 h-10 rounded-full items-center justify-center mr-3"
                style={{ backgroundColor: colors.primary + '20' }}
              >
                <IconSymbol name="building.columns" size={20} color={colors.primary} />
              </View>
              <View className="flex-1">
                <Text className="text-base font-semibold text-foreground">{resource.name}</Text>
                <Text className="text-xs text-muted">{resource.description}</Text>
              </View>
              <IconSymbol name="arrow.up.right" size={18} color={colors.primary} />
            </TouchableOpacity>
          ))}
        </View>

        {/* Ask AI */}
        <View className="px-4 py-4">
          <TouchableOpacity
            className="bg-primary rounded-xl p-4 flex-row items-center justify-center"
            onPress={() => router.push("/assistant" as any)}
            activeOpacity={0.7}
          >
            <IconSymbol name="bubble.left.fill" size={20} color="#FFFFFF" />
            <Text className="text-white font-semibold ml-2">Ask AI About Family Reunification</Text>
          </TouchableOpacity>
        </View>

        {/* Encouragement Footer */}
        <View className="px-4 py-4 mb-4">
          <View className="bg-primary/10 rounded-xl p-4 border border-primary/30">
            <Text className="text-center text-base font-semibold text-foreground mb-2">
              "The best time to plant a tree was 20 years ago. The second best time is now."
            </Text>
            <Text className="text-center text-sm text-muted">
              It's never too late to rebuild your family. Every step forward matters.
            </Text>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
