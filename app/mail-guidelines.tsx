import { ScrollView, Text, View, TouchableOpacity, Linking } from "react-native";
import { useRouter } from "expo-router";

import { ScreenContainer } from "@/components/screen-container";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useColors } from "@/hooks/use-colors";

export default function MailGuidelinesScreen() {
  const router = useRouter();
  const colors = useColors();

  const allowedItems = [
    'Letters and cards (white paper, blue or black ink)',
    'Photos (usually 4x6 or smaller, no Polaroids)',
    'Newspaper/magazine clippings',
    'Money orders (for commissary - check facility rules)',
    'Legal documents',
    'Religious materials',
    'Educational materials',
  ];

  const prohibitedItems = [
    'Stickers, labels, or adhesives',
    'Glitter, confetti, or loose items',
    'Perfume or scented items',
    'Crayon, marker, or colored pencil',
    'Polaroid photos',
    'Inappropriate images',
    'Cash or personal checks',
    'Food items',
    'Stamps (beyond return postage)',
  ];

  const electronicMessaging = [
    { name: 'JPay Email', description: 'Send electronic messages and photos', url: 'https://www.jpay.com/' },
    { name: 'GTL GettingOut', description: 'Messages and photo sharing', url: 'https://www.gettingout.com/' },
    { name: 'Securus eMessaging', description: 'Electronic messaging service', url: 'https://securustech.net/' },
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
          <View>
            <Text className="text-xl font-bold text-foreground">Mail Guidelines</Text>
            <Text className="text-sm text-muted">How to send mail to your loved one</Text>
          </View>
        </View>

        {/* Address Format */}
        <View className="px-4 py-4">
          <Text className="text-lg font-semibold text-foreground mb-3 px-1">How to Address Mail</Text>
          <View className="bg-surface rounded-xl p-4 border border-border">
            <View className="bg-background rounded-lg p-4 mb-3">
              <Text className="text-sm text-muted mb-1">Inmate Full Legal Name</Text>
              <Text className="text-sm text-muted mb-1">Inmate ID Number</Text>
              <Text className="text-sm text-muted mb-1">Facility Name</Text>
              <Text className="text-sm text-muted mb-1">Facility Address</Text>
              <Text className="text-sm text-muted">City, State ZIP</Text>
            </View>
            <View className="flex-row items-start">
              <IconSymbol name="exclamationmark.triangle" size={16} color={colors.warning} style={{ marginTop: 2 }} />
              <Text className="flex-1 text-xs text-muted ml-2">
                Always include the inmate ID number. Mail without proper identification may be returned or delayed.
              </Text>
            </View>
          </View>
        </View>

        {/* Return Address */}
        <View className="px-4 py-2">
          <View className="bg-primary/10 rounded-xl p-4 border border-primary/30">
            <View className="flex-row items-center mb-2">
              <IconSymbol name="info.circle" size={18} color={colors.primary} />
              <Text className="text-sm font-semibold text-foreground ml-2">Return Address Required</Text>
            </View>
            <Text className="text-sm text-muted leading-relaxed">
              All mail must include a complete return address with your full name and address. 
              Mail without a return address will typically be rejected.
            </Text>
          </View>
        </View>

        {/* What's Allowed */}
        <View className="px-4 py-4">
          <Text className="text-lg font-semibold text-foreground mb-3 px-1">What You Can Send</Text>
          <View className="bg-success/10 rounded-xl p-4 border border-success/30">
            {allowedItems.map((item, index) => (
              <View key={index} className="flex-row items-center mb-2">
                <IconSymbol name="checkmark.circle.fill" size={16} color={colors.success} />
                <Text className="flex-1 text-sm text-foreground ml-2">{item}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* What's NOT Allowed */}
        <View className="px-4 py-4">
          <Text className="text-lg font-semibold text-foreground mb-3 px-1">What You Cannot Send</Text>
          <View className="bg-error/10 rounded-xl p-4 border border-error/30">
            {prohibitedItems.map((item, index) => (
              <View key={index} className="flex-row items-center mb-2">
                <IconSymbol name="xmark.circle.fill" size={16} color={colors.error} />
                <Text className="flex-1 text-sm text-foreground ml-2">{item}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Legal Mail */}
        <View className="px-4 py-4">
          <Text className="text-lg font-semibold text-foreground mb-3 px-1">Legal Mail</Text>
          <View className="bg-surface rounded-xl p-4 border border-border">
            <Text className="text-sm text-foreground leading-relaxed mb-3">
              Mail to and from attorneys, courts, and legal organizations has special protections:
            </Text>
            <View className="flex-row items-start mb-2">
              <IconSymbol name="checkmark.shield" size={16} color={colors.primary} style={{ marginTop: 2 }} />
              <Text className="flex-1 text-sm text-foreground ml-2">
                Cannot be read by facility staff (may be opened in your presence to check for contraband)
              </Text>
            </View>
            <View className="flex-row items-start mb-2">
              <IconSymbol name="checkmark.shield" size={16} color={colors.primary} style={{ marginTop: 2 }} />
              <Text className="flex-1 text-sm text-foreground ml-2">
                Must be clearly marked as "Legal Mail" or "Attorney-Client Privileged"
              </Text>
            </View>
            <View className="flex-row items-start">
              <IconSymbol name="checkmark.shield" size={16} color={colors.primary} style={{ marginTop: 2 }} />
              <Text className="flex-1 text-sm text-foreground ml-2">
                Interference with legal mail can violate constitutional rights
              </Text>
            </View>
          </View>
        </View>

        {/* Electronic Messaging */}
        <View className="px-4 py-4">
          <Text className="text-lg font-semibold text-foreground mb-3 px-1">Electronic Messaging</Text>
          <Text className="text-sm text-muted mb-3 px-1">
            Many facilities now offer electronic messaging as a faster alternative to traditional mail.
          </Text>
          {electronicMessaging.map((service, index) => (
            <TouchableOpacity
              key={index}
              className="bg-surface rounded-xl p-4 mb-3 border border-border flex-row items-center"
              onPress={() => Linking.openURL(service.url)}
              activeOpacity={0.7}
            >
              <View 
                className="w-10 h-10 rounded-full items-center justify-center mr-3"
                style={{ backgroundColor: colors.primary + '20' }}
              >
                <IconSymbol name="doc.text" size={20} color={colors.primary} />
              </View>
              <View className="flex-1">
                <Text className="text-base font-medium text-foreground">{service.name}</Text>
                <Text className="text-xs text-muted">{service.description}</Text>
              </View>
              <IconSymbol name="arrow.up.right" size={18} color={colors.muted} />
            </TouchableOpacity>
          ))}
        </View>

        {/* Tips */}
        <View className="px-4 py-4">
          <View className="bg-warning/10 rounded-xl p-4 border border-warning/30">
            <View className="flex-row items-center mb-2">
              <IconSymbol name="lightbulb" size={18} color={colors.warning} />
              <Text className="text-sm font-semibold text-foreground ml-2">Tips for Getting Mail Through</Text>
            </View>
            <Text className="text-sm text-muted leading-relaxed mb-2">
              • Keep it simple - plain white paper, blue or black ink
            </Text>
            <Text className="text-sm text-muted leading-relaxed mb-2">
              • Don't seal envelopes with tape (use regular envelope adhesive)
            </Text>
            <Text className="text-sm text-muted leading-relaxed mb-2">
              • Number your pages (Page 1 of 3, etc.) so they know if something's missing
            </Text>
            <Text className="text-sm text-muted leading-relaxed">
              • If mail is rejected, ask specifically why so you can fix the issue
            </Text>
          </View>
        </View>

        {/* Books & Publications */}
        <View className="px-4 py-4">
          <Text className="text-lg font-semibold text-foreground mb-3 px-1">Sending Books</Text>
          <View className="bg-surface rounded-xl p-4 border border-border">
            <Text className="text-sm text-muted leading-relaxed mb-3">
              Many facilities allow books but have specific requirements:
            </Text>
            <View className="flex-row items-start mb-2">
              <Text className="text-muted mr-2">•</Text>
              <Text className="flex-1 text-sm text-foreground">Must be sent directly from publisher or approved retailer (Amazon, Barnes & Noble)</Text>
            </View>
            <View className="flex-row items-start mb-2">
              <Text className="text-muted mr-2">•</Text>
              <Text className="flex-1 text-sm text-foreground">Paperback only (hardcover often not allowed)</Text>
            </View>
            <View className="flex-row items-start mb-2">
              <Text className="text-muted mr-2">•</Text>
              <Text className="flex-1 text-sm text-foreground">New books only (used books typically rejected)</Text>
            </View>
            <View className="flex-row items-start">
              <Text className="text-muted mr-2">•</Text>
              <Text className="flex-1 text-sm text-foreground">Check facility limits on number of books allowed</Text>
            </View>
          </View>
        </View>

        {/* Disclaimer */}
        <View className="px-4 py-4 mb-4">
          <View className="bg-surface rounded-xl p-4 border border-border">
            <View className="flex-row items-start">
              <IconSymbol name="info.circle" size={18} color={colors.muted} style={{ marginTop: 2 }} />
              <Text className="flex-1 text-xs text-muted ml-2 leading-relaxed">
                Mail rules vary significantly by facility. Always check with the specific facility for their current mail policies before sending anything.
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
