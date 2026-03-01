import { ScrollView, Text, View, TouchableOpacity, Linking } from "react-native";
import { useRouter } from "expo-router";

import { ScreenContainer } from "@/components/screen-container";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useColors } from "@/hooks/use-colors";
import { emergencyContacts } from "@/data/legal-content";

export default function EmergencyContactsScreen() {
  const router = useRouter();
  const colors = useColors();

  const additionalHotlines = [
    { name: 'National Suicide Prevention Lifeline', phone: '988', description: 'Free, confidential support 24/7' },
    { name: 'SAMHSA National Helpline', phone: '1-800-662-4357', description: 'Substance abuse and mental health' },
    { name: 'National Domestic Violence Hotline', phone: '1-800-799-7233', description: 'Support for domestic violence' },
    { name: 'RAINN Sexual Assault Hotline', phone: '1-800-656-4673', description: 'Sexual assault support' },
    { name: 'National Alliance on Mental Illness', phone: '1-800-950-6264', description: 'Mental health support and resources' },
  ];

  const makeCall = (phone: string) => {
    const cleanPhone = phone.replace(/[^0-9]/g, '');
    Linking.openURL(`tel:${cleanPhone}`);
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
            <Text className="text-xl font-bold text-foreground">Emergency Contacts</Text>
            <Text className="text-sm text-muted">Important hotlines and numbers</Text>
          </View>
        </View>

        {/* Emergency Banner */}
        <View className="px-4 py-4">
          <View className="bg-error/10 rounded-xl p-4 border border-error/30">
            <View className="flex-row items-center mb-2">
              <IconSymbol name="exclamationmark.triangle" size={20} color={colors.error} />
              <Text className="text-base font-semibold text-foreground ml-2">In Immediate Danger?</Text>
            </View>
            <Text className="text-sm text-muted leading-relaxed mb-3">
              If you or someone you know is in immediate danger, call 911 or contact facility staff immediately.
            </Text>
            <TouchableOpacity
              className="bg-error rounded-xl py-3 items-center"
              onPress={() => makeCall('911')}
              activeOpacity={0.7}
            >
              <Text className="text-white font-bold">Call 911</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Prison/Jail Specific */}
        <View className="px-4 py-2">
          <Text className="text-lg font-semibold text-foreground mb-3 px-1">Prison & Jail Resources</Text>
          {emergencyContacts.map((contact) => (
            <TouchableOpacity
              key={contact.id}
              className="bg-surface rounded-xl p-4 mb-3 border border-border"
              onPress={() => makeCall(contact.phone)}
              activeOpacity={0.7}
            >
              <View className="flex-row items-center">
                <View 
                  className="w-12 h-12 rounded-full items-center justify-center mr-3"
                  style={{ backgroundColor: colors.primary + '20' }}
                >
                  <IconSymbol name="bubble.left.fill" size={24} color={colors.primary} />
                </View>
                <View className="flex-1">
                  <Text className="text-base font-semibold text-foreground">{contact.name}</Text>
                  <Text className="text-sm text-muted mb-1">{contact.description}</Text>
                  <Text className="text-base font-bold" style={{ color: colors.primary }}>{contact.phone}</Text>
                </View>
                <View 
                  className="w-10 h-10 rounded-full items-center justify-center"
                  style={{ backgroundColor: colors.success }}
                >
                  <IconSymbol name="bubble.left.fill" size={20} color="#FFFFFF" />
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* General Hotlines */}
        <View className="px-4 py-4">
          <Text className="text-lg font-semibold text-foreground mb-3 px-1">National Hotlines</Text>
          {additionalHotlines.map((hotline, index) => (
            <TouchableOpacity
              key={index}
              className="bg-surface rounded-xl p-4 mb-3 border border-border"
              onPress={() => makeCall(hotline.phone)}
              activeOpacity={0.7}
            >
              <View className="flex-row items-center">
                <View 
                  className="w-12 h-12 rounded-full items-center justify-center mr-3"
                  style={{ backgroundColor: colors.warning + '20' }}
                >
                  <IconSymbol name="bubble.left.fill" size={24} color={colors.warning} />
                </View>
                <View className="flex-1">
                  <Text className="text-base font-semibold text-foreground">{hotline.name}</Text>
                  <Text className="text-sm text-muted mb-1">{hotline.description}</Text>
                  <Text className="text-base font-bold" style={{ color: colors.primary }}>{hotline.phone}</Text>
                </View>
                <View 
                  className="w-10 h-10 rounded-full items-center justify-center"
                  style={{ backgroundColor: colors.success }}
                >
                  <IconSymbol name="bubble.left.fill" size={20} color="#FFFFFF" />
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* For Family Members */}
        <View className="px-4 py-4">
          <View className="bg-primary/10 rounded-xl p-4 border border-primary/30">
            <View className="flex-row items-center mb-2">
              <IconSymbol name="heart.fill" size={18} color={colors.primary} />
              <Text className="text-sm font-semibold text-foreground ml-2">For Family Members</Text>
            </View>
            <Text className="text-sm text-muted leading-relaxed">
              If you're concerned about a loved one's safety or treatment in a facility:{'\n\n'}
              • Contact the facility directly and ask to speak with a supervisor{'\n'}
              • File a complaint with the state Department of Corrections{'\n'}
              • Contact the facility's ombudsman if available{'\n'}
              • Reach out to prisoner rights organizations{'\n'}
              • Document everything in writing
            </Text>
          </View>
        </View>

        {/* Reporting Abuse */}
        <View className="px-4 py-4">
          <View className="bg-warning/10 rounded-xl p-4 border border-warning/30">
            <View className="flex-row items-center mb-2">
              <IconSymbol name="exclamationmark.circle" size={18} color={colors.warning} />
              <Text className="text-sm font-semibold text-foreground ml-2">Reporting Abuse or Misconduct</Text>
            </View>
            <Text className="text-sm text-muted leading-relaxed">
              If you or a loved one has experienced abuse or misconduct:{'\n\n'}
              • Document everything (dates, times, names, witnesses){'\n'}
              • File a grievance through the facility's process{'\n'}
              • Report to the Office of Inspector General (federal){'\n'}
              • Contact the ACLU or other civil rights organizations{'\n'}
              • Consider consulting with an attorney
            </Text>
          </View>
        </View>

        {/* Mental Health in Custody */}
        <View className="px-4 py-4">
          <View className="bg-surface rounded-xl p-4 border border-border">
            <View className="flex-row items-center mb-2">
              <IconSymbol name="brain" size={18} color={colors.muted} />
              <Text className="text-sm font-semibold text-foreground ml-2">Mental Health Support</Text>
            </View>
            <Text className="text-sm text-muted leading-relaxed">
              Incarcerated individuals have a right to mental health care. If you or a loved one needs support:{'\n\n'}
              • Request to see mental health staff through sick call{'\n'}
              • Ask about crisis intervention services{'\n'}
              • Family can request welfare checks through the facility{'\n'}
              • Document any denial of mental health services
            </Text>
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
            <Text className="text-white font-semibold ml-2">Ask AI for Help</Text>
          </TouchableOpacity>
        </View>

        {/* Disclaimer */}
        <View className="px-4 py-4 mb-4">
          <View className="bg-surface rounded-xl p-4 border border-border">
            <View className="flex-row items-start">
              <IconSymbol name="info.circle" size={18} color={colors.muted} style={{ marginTop: 2 }} />
              <Text className="flex-1 text-xs text-muted ml-2 leading-relaxed">
                This information is provided for reference. In any emergency, contact appropriate authorities immediately. 
                Hotline availability and numbers may change.
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
