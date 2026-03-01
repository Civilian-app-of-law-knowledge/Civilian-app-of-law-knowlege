import { ScrollView, Text, View, TouchableOpacity, Linking } from "react-native";
import { useRouter } from "expo-router";

import { ScreenContainer } from "@/components/screen-container";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useColors } from "@/hooks/use-colors";

export default function BailBondScreen() {
  const router = useRouter();
  const colors = useColors();

  const bailTypes = [
    {
      title: 'Cash Bail',
      description: 'Pay the full bail amount in cash',
      details: 'You pay the entire bail amount to the court. This money is returned (minus fees) when the case concludes, as long as the defendant appears at all court dates.',
      pros: ['Full amount returned if defendant appears', 'No ongoing fees'],
      cons: ['Requires full amount upfront', 'Money tied up until case ends'],
    },
    {
      title: 'Bail Bond (Surety Bond)',
      description: 'Pay 10% to a bail bondsman',
      details: 'A bail bondsman posts the full bail amount for a non-refundable fee (typically 10% of the bail). The bondsman guarantees the defendant will appear in court.',
      pros: ['Only need 10% upfront', 'Faster release'],
      cons: ['10% fee is non-refundable', 'May require collateral', 'Bondsman can revoke bond'],
    },
    {
      title: 'Property Bond',
      description: 'Use property as collateral',
      details: 'Real property (like a house) is used as collateral for the bail amount. If the defendant fails to appear, the property can be seized.',
      pros: ['No cash needed upfront'],
      cons: ['Risk losing property', 'Takes longer to process', 'Property must have sufficient equity'],
    },
    {
      title: 'Release on Own Recognizance (ROR)',
      description: 'Released without paying bail',
      details: 'The defendant is released based on their promise to appear in court. Usually granted for minor offenses or defendants with strong community ties.',
      pros: ['No money required', 'Immediate release'],
      cons: ['Only available for certain cases', 'Judge must approve'],
    },
  ];

  const bailProcess = [
    { step: 1, title: 'Arrest & Booking', description: 'Person is arrested and processed at the jail' },
    { step: 2, title: 'Bail Hearing', description: 'Judge sets bail amount based on charges, flight risk, and other factors' },
    { step: 3, title: 'Post Bail', description: 'Pay bail directly or through a bondsman' },
    { step: 4, title: 'Release', description: 'Defendant is released pending trial' },
    { step: 5, title: 'Court Appearances', description: 'Must appear at all scheduled court dates' },
    { step: 6, title: 'Case Resolution', description: 'Bail returned (cash bail) or bond released when case ends' },
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
            <Text className="text-xl font-bold text-foreground">Bail & Bond Information</Text>
            <Text className="text-sm text-muted">Understanding the bail system</Text>
          </View>
        </View>

        {/* What is Bail */}
        <View className="px-4 py-4">
          <View className="bg-surface rounded-xl p-4 border border-border">
            <Text className="text-base font-semibold text-foreground mb-2">What is Bail?</Text>
            <Text className="text-sm text-muted leading-relaxed">
              Bail is money or property given to the court to ensure a defendant returns for trial. 
              It allows someone to be released from jail while awaiting their court date. 
              The amount is set by a judge based on the charges, criminal history, flight risk, and community ties.
            </Text>
          </View>
        </View>

        {/* Bail vs Bond */}
        <View className="px-4 py-2">
          <View className="bg-primary/10 rounded-xl p-4 border border-primary/30">
            <View className="flex-row items-center mb-2">
              <IconSymbol name="info.circle" size={18} color={colors.primary} />
              <Text className="text-sm font-semibold text-foreground ml-2">Bail vs. Bond</Text>
            </View>
            <Text className="text-sm text-muted leading-relaxed">
              <Text className="font-semibold">Bail</Text> is the amount set by the court. 
              <Text className="font-semibold"> Bond</Text> is the agreement with a bail bondsman who posts bail for you in exchange for a fee.
            </Text>
          </View>
        </View>

        {/* Types of Bail */}
        <View className="px-4 py-4">
          <Text className="text-lg font-semibold text-foreground mb-3 px-1">Types of Bail</Text>
          {bailTypes.map((type, index) => (
            <View key={index} className="bg-surface rounded-xl p-4 mb-3 border border-border">
              <View className="flex-row items-center mb-2">
                <View 
                  className="w-8 h-8 rounded-full items-center justify-center mr-3"
                  style={{ backgroundColor: colors.primary + '20' }}
                >
                  <IconSymbol name="scale.3d" size={18} color={colors.primary} />
                </View>
                <View>
                  <Text className="text-base font-semibold text-foreground">{type.title}</Text>
                  <Text className="text-xs text-muted">{type.description}</Text>
                </View>
              </View>
              <Text className="text-sm text-muted leading-relaxed mb-3">{type.details}</Text>
              <View className="flex-row">
                <View className="flex-1 mr-2">
                  <Text className="text-xs font-semibold text-success mb-1">Pros:</Text>
                  {type.pros.map((pro, i) => (
                    <Text key={i} className="text-xs text-muted">• {pro}</Text>
                  ))}
                </View>
                <View className="flex-1 ml-2">
                  <Text className="text-xs font-semibold text-error mb-1">Cons:</Text>
                  {type.cons.map((con, i) => (
                    <Text key={i} className="text-xs text-muted">• {con}</Text>
                  ))}
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Bail Process */}
        <View className="px-4 py-4">
          <Text className="text-lg font-semibold text-foreground mb-3 px-1">The Bail Process</Text>
          <View className="bg-surface rounded-xl p-4 border border-border">
            {bailProcess.map((item, index) => (
              <View key={index} className="flex-row items-start mb-4">
                <View 
                  className="w-8 h-8 rounded-full items-center justify-center mr-3"
                  style={{ backgroundColor: colors.primary }}
                >
                  <Text className="text-sm text-white font-bold">{item.step}</Text>
                </View>
                <View className="flex-1 pt-1">
                  <Text className="text-sm font-semibold text-foreground">{item.title}</Text>
                  <Text className="text-xs text-muted">{item.description}</Text>
                </View>
                {index < bailProcess.length - 1 && (
                  <View 
                    className="absolute left-7 top-10 w-0.5 h-6"
                    style={{ backgroundColor: colors.border }}
                  />
                )}
              </View>
            ))}
          </View>
        </View>

        {/* What Happens If */}
        <View className="px-4 py-4">
          <Text className="text-lg font-semibold text-foreground mb-3 px-1">What Happens If...</Text>
          <View className="bg-warning/10 rounded-xl p-4 border border-warning/30 mb-3">
            <Text className="text-sm font-semibold text-foreground mb-2">...You Miss a Court Date?</Text>
            <Text className="text-sm text-muted leading-relaxed">
              A warrant will be issued for arrest. If you posted cash bail, you forfeit the money. 
              If you used a bondsman, they will look for you and may hire a bounty hunter. 
              Contact your attorney immediately if you miss a date - sometimes it can be resolved.
            </Text>
          </View>
          <View className="bg-error/10 rounded-xl p-4 border border-error/30">
            <Text className="text-sm font-semibold text-foreground mb-2">...You Can't Afford Bail?</Text>
            <Text className="text-sm text-muted leading-relaxed">
              Options include: requesting a bail reduction hearing, using a bail bondsman (10% fee), 
              asking about payment plans, or contacting a bail fund organization that may help with low-level offenses.
            </Text>
          </View>
        </View>

        {/* Tips */}
        <View className="px-4 py-4">
          <View className="bg-surface rounded-xl p-4 border border-border">
            <View className="flex-row items-center mb-2">
              <IconSymbol name="lightbulb" size={18} color={colors.warning} />
              <Text className="text-sm font-semibold text-foreground ml-2">Important Tips</Text>
            </View>
            <Text className="text-sm text-muted leading-relaxed mb-2">
              • Keep all bail paperwork in a safe place
            </Text>
            <Text className="text-sm text-muted leading-relaxed mb-2">
              • Understand all conditions of release (curfew, travel restrictions, etc.)
            </Text>
            <Text className="text-sm text-muted leading-relaxed mb-2">
              • Never miss a court date - call your attorney if there's an emergency
            </Text>
            <Text className="text-sm text-muted leading-relaxed">
              • If using a bondsman, read the contract carefully before signing
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
            <Text className="text-white font-semibold ml-2">Ask AI About Bail</Text>
          </TouchableOpacity>
        </View>

        {/* Disclaimer */}
        <View className="px-4 py-4 mb-4">
          <View className="bg-surface rounded-xl p-4 border border-border">
            <View className="flex-row items-start">
              <IconSymbol name="info.circle" size={18} color={colors.muted} style={{ marginTop: 2 }} />
              <Text className="flex-1 text-xs text-muted ml-2 leading-relaxed">
                Bail laws and procedures vary by jurisdiction. This is general information only. 
                Consult with an attorney for advice specific to your case.
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
