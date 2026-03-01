import { useState } from "react";
import { ScrollView, Text, View, TouchableOpacity, Linking } from "react-native";
import { useRouter } from "expo-router";

import { ScreenContainer } from "@/components/screen-container";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useColors } from "@/hooks/use-colors";

export default function RehabAlternativesScreen() {
  const router = useRouter();
  const colors = useColors();
  const [expandedProgram, setExpandedProgram] = useState<string | null>(null);

  const diversionPrograms = [
    {
      id: 'drug-court',
      title: 'Drug Court',
      icon: 'cross.case.fill' as const,
      description: 'Specialized court program that focuses on treatment instead of incarceration for drug-related offenses.',
      benefits: [
        'Treatment instead of jail time',
        'Charges may be dismissed upon completion',
        'Regular support and accountability',
        'Access to counseling and resources',
        'Opportunity to keep your job and family',
      ],
      requirements: [
        'Non-violent drug offense',
        'Willingness to participate in treatment',
        'Regular court appearances',
        'Drug testing',
        'Completion of treatment program',
      ],
      howToRequest: 'Ask your defense attorney about drug court eligibility at your arraignment or pre-trial hearing. You can also contact the court clerk to ask if your county has a drug court program.',
      successRate: 'Drug courts have a 75% lower recidivism rate compared to traditional prosecution.',
    },
    {
      id: 'mental-health-court',
      title: 'Mental Health Court',
      icon: 'brain.head.profile' as const,
      description: 'Court program for people whose offenses are related to mental health conditions. Focuses on treatment and stability.',
      benefits: [
        'Mental health treatment instead of jail',
        'Connection to ongoing services',
        'Housing and employment assistance',
        'Medication management support',
        'Case management and advocacy',
      ],
      requirements: [
        'Diagnosed mental health condition',
        'Offense related to mental health',
        'Willingness to engage in treatment',
        'Regular court check-ins',
        'Compliance with treatment plan',
      ],
      howToRequest: 'Your attorney can request a mental health evaluation. If eligible, they can petition for transfer to mental health court. You can also ask the public defender\'s office about mental health court options.',
      successRate: 'Participants are 20% less likely to be re-arrested compared to traditional court.',
    },
    {
      id: 'veterans-court',
      title: 'Veterans Treatment Court',
      icon: 'star.circle.fill' as const,
      description: 'Specialized court for veterans that addresses service-related issues like PTSD, TBI, and substance abuse.',
      benefits: [
        'Treatment for service-related conditions',
        'Peer mentorship from other veterans',
        'Connection to VA services',
        'Charges may be dismissed or reduced',
        'Honor and dignity preserved',
      ],
      requirements: [
        'Military service (any branch)',
        'Offense related to service issues',
        'Willingness to participate',
        'Engagement with VA services',
        'Completion of treatment program',
      ],
      howToRequest: 'Inform your attorney of your veteran status immediately. They can request transfer to veterans court. Contact your local VA or veterans service organization for support.',
      successRate: 'Veterans courts have graduation rates of 65-75% with significantly reduced recidivism.',
    },
    {
      id: 'pretrial-diversion',
      title: 'Pre-Trial Diversion',
      icon: 'arrow.triangle.branch' as const,
      description: 'Program that allows you to avoid prosecution by completing certain requirements before trial.',
      benefits: [
        'Charges dismissed upon completion',
        'No conviction on your record',
        'Avoid jail time entirely',
        'Keep your job and housing',
        'Faster resolution than trial',
      ],
      requirements: [
        'Usually first-time offenders',
        'Non-violent offense',
        'Community service hours',
        'Possible restitution',
        'Stay out of trouble during program',
      ],
      howToRequest: 'Ask your attorney about pre-trial diversion at your first court appearance. The prosecutor must agree, so having a strong case for why you deserve a second chance helps.',
      successRate: 'Over 70% of participants successfully complete diversion and have charges dismissed.',
    },
    {
      id: 'deferred-adjudication',
      title: 'Deferred Adjudication',
      icon: 'clock.arrow.circlepath' as const,
      description: 'Plead guilty but sentencing is deferred. Complete probation successfully and avoid a conviction.',
      benefits: [
        'No conviction if completed successfully',
        'Avoid jail time',
        'May be eligible for expungement later',
        'Chance to prove yourself',
        'Less severe than standard probation',
      ],
      requirements: [
        'Guilty plea required',
        'Probation period (varies)',
        'May include treatment or classes',
        'Regular check-ins',
        'No new offenses',
      ],
      howToRequest: 'Your attorney can negotiate deferred adjudication with the prosecutor as part of a plea agreement. This is often available for first-time offenders.',
      successRate: 'Successful completion rates vary by jurisdiction but average 60-80%.',
    },
    {
      id: 'treatment-court',
      title: 'Treatment Courts (General)',
      icon: 'heart.text.square.fill' as const,
      description: 'Various specialized courts that focus on treatment for underlying issues rather than punishment.',
      benefits: [
        'Addresses root causes of behavior',
        'Comprehensive support services',
        'Regular judicial oversight',
        'Team approach to recovery',
        'Better long-term outcomes',
      ],
      requirements: [
        'Eligible offense type',
        'Underlying issue (addiction, mental health, etc.)',
        'Commitment to treatment',
        'Regular court appearances',
        'Program compliance',
      ],
      howToRequest: 'Ask your attorney about all available treatment court options in your jurisdiction. Different courts exist for DUI, family issues, domestic violence, and more.',
      successRate: 'Treatment courts consistently show better outcomes than traditional prosecution.',
    },
  ];

  const howToAsk = [
    {
      step: 1,
      title: 'Tell Your Attorney Immediately',
      description: 'As soon as you\'re arrested or charged, tell your attorney (or public defender) that you want to explore treatment alternatives. The earlier you ask, the better.',
    },
    {
      step: 2,
      title: 'Be Honest About Your Situation',
      description: 'Share any substance abuse issues, mental health conditions, or trauma history. This information helps identify which programs you may qualify for.',
    },
    {
      step: 3,
      title: 'Show Willingness to Change',
      description: 'Prosecutors and judges want to see that you\'re serious about rehabilitation. Voluntarily entering treatment before court can strengthen your case.',
    },
    {
      step: 4,
      title: 'Gather Supporting Documents',
      description: 'Medical records, treatment history, employment records, and character references can all help your case for diversion.',
    },
    {
      step: 5,
      title: 'Request at the Right Time',
      description: 'Diversion requests are typically made at arraignment or pre-trial hearings. Your attorney will know the best timing for your jurisdiction.',
    },
  ];

  const importantNotes = [
    'Not all offenses qualify for diversion - violent crimes and repeat offenses are often excluded',
    'You may need to waive your right to a speedy trial to participate in treatment programs',
    'Failing to complete a diversion program can result in the original charges being prosecuted',
    'Some programs require you to plead guilty first (deferred adjudication)',
    'Availability varies significantly by county and state',
    'Having an attorney advocate for you greatly increases your chances',
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
            <Text className="text-xl font-bold text-foreground">Rehab Alternatives</Text>
            <Text className="text-sm text-muted">Treatment instead of incarceration</Text>
          </View>
        </View>

        {/* Hero Section */}
        <View className="px-4 py-4">
          <View className="bg-primary rounded-xl p-5">
            <View className="flex-row items-center mb-3">
              <View className="w-14 h-14 rounded-full bg-white/20 items-center justify-center mr-3">
                <IconSymbol name="arrow.triangle.branch" size={32} color="#FFFFFF" />
              </View>
              <View className="flex-1">
                <Text className="text-xl font-bold text-white">There May Be Options</Text>
                <Text className="text-sm text-white/80">Treatment can replace jail time</Text>
              </View>
            </View>
            <Text className="text-sm text-white/90 leading-relaxed">
              Many courts now recognize that treatment is more effective than incarceration for certain offenses. 
              Drug courts, mental health courts, and diversion programs can help you get the help you need 
              while avoiding or reducing jail time. <Text className="font-semibold">Ask your attorney about these options.</Text>
            </Text>
          </View>
        </View>

        {/* Key Message */}
        <View className="px-4 py-2">
          <View className="bg-success/10 rounded-xl p-4 border border-success/30">
            <View className="flex-row items-center">
              <Text className="text-2xl mr-3">💡</Text>
              <View className="flex-1">
                <Text className="text-base font-semibold text-foreground">The Key: Ask Early</Text>
                <Text className="text-sm text-muted">
                  Tell your attorney you want treatment alternatives at your FIRST court appearance. 
                  The earlier you ask, the more options you may have.
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Diversion Programs */}
        <View className="px-4 py-4">
          <Text className="text-lg font-semibold text-foreground mb-3 px-1">Diversion Programs</Text>
          {diversionPrograms.map((program) => (
            <TouchableOpacity
              key={program.id}
              className="bg-surface rounded-xl mb-3 border border-border overflow-hidden"
              onPress={() => setExpandedProgram(expandedProgram === program.id ? null : program.id)}
              activeOpacity={0.7}
            >
              <View className="p-4">
                <View className="flex-row items-center">
                  <View 
                    className="w-10 h-10 rounded-full items-center justify-center mr-3"
                    style={{ backgroundColor: colors.primary + '20' }}
                  >
                    <IconSymbol name={program.icon} size={22} color={colors.primary} />
                  </View>
                  <View className="flex-1">
                    <Text className="text-base font-semibold text-foreground">{program.title}</Text>
                    <Text className="text-xs text-muted" numberOfLines={expandedProgram === program.id ? undefined : 1}>
                      {program.description}
                    </Text>
                  </View>
                  <IconSymbol 
                    name={expandedProgram === program.id ? "chevron.up" : "chevron.down"} 
                    size={20} 
                    color={colors.muted} 
                  />
                </View>
              </View>
              
              {expandedProgram === program.id && (
                <View className="px-4 pb-4">
                  {/* Benefits */}
                  <View className="bg-success/10 rounded-lg p-3 mb-3">
                    <Text className="text-sm font-semibold text-foreground mb-2">✅ Benefits</Text>
                    {program.benefits.map((benefit, index) => (
                      <View key={index} className="flex-row items-start mb-1">
                        <Text className="text-success mr-2">•</Text>
                        <Text className="flex-1 text-sm text-muted">{benefit}</Text>
                      </View>
                    ))}
                  </View>

                  {/* Requirements */}
                  <View className="bg-warning/10 rounded-lg p-3 mb-3">
                    <Text className="text-sm font-semibold text-foreground mb-2">📋 Requirements</Text>
                    {program.requirements.map((req, index) => (
                      <View key={index} className="flex-row items-start mb-1">
                        <Text className="text-warning mr-2">•</Text>
                        <Text className="flex-1 text-sm text-muted">{req}</Text>
                      </View>
                    ))}
                  </View>

                  {/* How to Request */}
                  <View className="bg-primary/10 rounded-lg p-3 mb-3">
                    <Text className="text-sm font-semibold text-foreground mb-2">🗣️ How to Request</Text>
                    <Text className="text-sm text-muted">{program.howToRequest}</Text>
                  </View>

                  {/* Success Rate */}
                  <View className="bg-background rounded-lg p-3">
                    <Text className="text-sm font-semibold text-foreground mb-1">📊 Success Rate</Text>
                    <Text className="text-sm text-muted">{program.successRate}</Text>
                  </View>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* How to Ask */}
        <View className="px-4 py-4">
          <Text className="text-lg font-semibold text-foreground mb-3 px-1">How to Ask for Alternatives</Text>
          <View className="bg-surface rounded-xl p-4 border border-border">
            {howToAsk.map((item, index) => (
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
              </View>
            ))}
          </View>
        </View>

        {/* Important Notes */}
        <View className="px-4 py-4">
          <View className="bg-warning/10 rounded-xl p-4 border border-warning/30">
            <View className="flex-row items-center mb-3">
              <IconSymbol name="exclamationmark.triangle" size={18} color={colors.warning} />
              <Text className="text-base font-semibold text-foreground ml-2">Important to Know</Text>
            </View>
            {importantNotes.map((note, index) => (
              <View key={index} className="flex-row items-start mb-2">
                <Text className="text-warning mr-2">•</Text>
                <Text className="flex-1 text-sm text-muted">{note}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Find Treatment */}
        <View className="px-4 py-4">
          <Text className="text-lg font-semibold text-foreground mb-3 px-1">Find Treatment Now</Text>
          <TouchableOpacity
            className="bg-surface rounded-xl p-4 mb-3 border border-border flex-row items-center"
            onPress={() => Linking.openURL('https://findtreatment.gov/')}
            activeOpacity={0.7}
          >
            <View 
              className="w-10 h-10 rounded-full items-center justify-center mr-3"
              style={{ backgroundColor: colors.success + '20' }}
            >
              <IconSymbol name="cross.fill" size={20} color={colors.success} />
            </View>
            <View className="flex-1">
              <Text className="text-base font-semibold text-foreground">SAMHSA Treatment Locator</Text>
              <Text className="text-xs text-muted">Find substance abuse and mental health treatment</Text>
            </View>
            <IconSymbol name="arrow.up.right" size={18} color={colors.primary} />
          </TouchableOpacity>

          <TouchableOpacity
            className="bg-surface rounded-xl p-4 mb-3 border border-border flex-row items-center"
            onPress={() => Linking.openURL('tel:1-800-662-4357')}
            activeOpacity={0.7}
          >
            <View 
              className="w-10 h-10 rounded-full items-center justify-center mr-3"
              style={{ backgroundColor: colors.primary + '20' }}
            >
              <IconSymbol name="phone.fill" size={20} color={colors.primary} />
            </View>
            <View className="flex-1">
              <Text className="text-base font-semibold text-foreground">SAMHSA Helpline</Text>
              <Text className="text-xs text-muted">1-800-662-4357 (Free, 24/7)</Text>
            </View>
            <IconSymbol name="phone.arrow.up.right" size={18} color={colors.success} />
          </TouchableOpacity>
        </View>

        {/* Ask AI */}
        <View className="px-4 py-4">
          <TouchableOpacity
            className="bg-primary rounded-xl p-4 flex-row items-center justify-center"
            onPress={() => router.push("/assistant" as any)}
            activeOpacity={0.7}
          >
            <IconSymbol name="bubble.left.fill" size={20} color="#FFFFFF" />
            <Text className="text-white font-semibold ml-2">Ask AI About Treatment Options</Text>
          </TouchableOpacity>
        </View>

        {/* Disclaimer */}
        <View className="px-4 py-4 mb-4">
          <View className="bg-surface rounded-xl p-4 border border-border">
            <View className="flex-row items-start">
              <IconSymbol name="info.circle" size={18} color={colors.muted} style={{ marginTop: 2 }} />
              <Text className="flex-1 text-xs text-muted ml-2 leading-relaxed">
                Availability of diversion programs varies by jurisdiction and is subject to prosecutorial discretion. 
                This information is educational only. Always work with a qualified attorney to explore your options.
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
