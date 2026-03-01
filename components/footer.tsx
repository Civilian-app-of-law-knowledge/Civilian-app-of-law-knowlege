import { Text, View, TouchableOpacity, Linking } from "react-native";
import { useRouter } from "expo-router";
import { useColors } from "@/hooks/use-colors";
import { IconSymbol } from "@/components/ui/icon-symbol";

interface FooterProps {
  showDisclaimer?: boolean;
}

export function Footer({ showDisclaimer = true }: FooterProps) {
  const colors = useColors();
  const router = useRouter();

  const quickLinks = [
    { title: "Know Your Rights", route: "/rights" },
    { title: "Expungement Guide", route: "/expungement" },
    { title: "Family Support", route: "/(tabs)/family" },
    { title: "Emergency Contacts", route: "/emergency-contacts" },
  ];

  const resourceLinks = [
    { title: "ACLU", url: "https://www.aclu.org" },
    { title: "Legal Aid", url: "https://www.lsc.gov/find-legal-aid" },
    { title: "NAACP Legal", url: "https://naacp.org/find-resources" },
    { title: "Innocence Project", url: "https://innocenceproject.org" },
  ];

  return (
    <View className="bg-surface border-t border-border mt-8">
      {/* Disclaimer */}
      {showDisclaimer && (
        <View className="px-4 py-4 bg-warning/5 border-b border-border">
          <View className="max-w-4xl mx-auto w-full">
            <View className="flex-row items-start">
              <IconSymbol name="exclamationmark.triangle" size={16} color={colors.warning} />
              <Text className="flex-1 text-xs text-muted ml-2 leading-relaxed">
                <Text className="font-semibold">Legal Disclaimer:</Text> The information provided in this app is for general educational purposes only and does not constitute legal advice. Every case is unique, and laws vary by jurisdiction. Always consult with a qualified attorney for advice specific to your situation. This app is not a substitute for professional legal counsel.
              </Text>
            </View>
          </View>
        </View>
      )}

      {/* Main Footer Content */}
      <View className="px-4 py-6">
        <View className="max-w-4xl mx-auto w-full">
          {/* Footer Grid - responsive */}
          <View className="flex-row flex-wrap">
            {/* About Section */}
            <View className="w-full md:w-1/3 mb-6 md:mb-0 md:pr-4">
              <Text className="text-lg font-bold text-foreground mb-2">
                Civilian Law of Knowledge
              </Text>
              <Text className="text-sm text-muted leading-relaxed mb-3">
                Knowledge is power. Providing clear, structured information about the justice system for civilians and families.
              </Text>
              <Text className="text-xs text-muted">
                Empowering communities through legal education.
              </Text>
            </View>

            {/* Quick Links */}
            <View className="w-1/2 md:w-1/3 mb-6 md:mb-0">
              <Text className="text-sm font-semibold text-foreground mb-3">Quick Links</Text>
              {quickLinks.map((link) => (
                <TouchableOpacity
                  key={link.route}
                  className="mb-2"
                  onPress={() => router.push(link.route as any)}
                  activeOpacity={0.7}
                >
                  <Text className="text-sm" style={{ color: colors.primary }}>
                    {link.title}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* External Resources */}
            <View className="w-1/2 md:w-1/3">
              <Text className="text-sm font-semibold text-foreground mb-3">Resources</Text>
              {resourceLinks.map((link) => (
                <TouchableOpacity
                  key={link.url}
                  className="mb-2 flex-row items-center"
                  onPress={() => Linking.openURL(link.url)}
                  activeOpacity={0.7}
                >
                  <Text className="text-sm" style={{ color: colors.primary }}>
                    {link.title}
                  </Text>
                  <IconSymbol name="arrow.up.right" size={12} color={colors.primary} style={{ marginLeft: 4 }} />
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Bottom Bar */}
          <View className="border-t border-border mt-6 pt-4">
            <View className="flex-row flex-wrap items-center justify-between">
              <Text className="text-xs text-muted">
                © {new Date().getFullYear()} Civilian Law of Knowledge. All rights reserved.
              </Text>
              <View className="flex-row items-center mt-2 md:mt-0">
                <TouchableOpacity
                  className="mr-4"
                  onPress={() => router.push("/faq" as any)}
                  activeOpacity={0.7}
                >
                  <Text className="text-xs" style={{ color: colors.primary }}>FAQ</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => Linking.openURL("mailto:support@civilianlaw.org")}
                  activeOpacity={0.7}
                >
                  <Text className="text-xs" style={{ color: colors.primary }}>Contact</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
