import { useState } from "react";
import { ScrollView, Text, View, TouchableOpacity, Linking } from "react-native";
import { useRouter } from "expo-router";

import { ScreenContainer } from "@/components/screen-container";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useColors } from "@/hooks/use-colors";

export default function ExpungementScreen() {
  const router = useRouter();
  const colors = useColors();
  const [expandedSection, setExpandedSection] = useState<string | null>('what-is');

  const expungementTypes = [
    {
      title: 'Expungement',
      description: 'Complete removal of records',
      details: 'Expungement completely erases the arrest or conviction from your record as if it never happened. After expungement, you can legally say you were never arrested or convicted for that offense. The records are destroyed or returned to you.',
      availability: 'Available in most states for certain offenses',
    },
    {
      title: 'Record Sealing',
      description: 'Records hidden from public view',
      details: 'Sealing hides your record from the general public, employers, and landlords. However, sealed records can still be accessed by law enforcement and courts. Some states use "sealing" and "expungement" interchangeably.',
      availability: 'More widely available than full expungement',
    },
    {
      title: 'Set-Aside / Dismissal',
      description: 'Conviction set aside after completion',
      details: 'In some states, you can petition to have your conviction "set aside" after completing your sentence. This withdraws the guilty plea or verdict and dismisses the case. The arrest may still show, but the conviction is removed.',
      availability: 'Available in states like Arizona, Oregon',
    },
    {
      title: 'Certificate of Rehabilitation',
      description: 'Official recognition of rehabilitation',
      details: 'Some states issue certificates recognizing that you have been rehabilitated. While this doesn\'t erase your record, it can help with employment and licensing. In some states, it\'s a prerequisite for a pardon.',
      availability: 'California, New York, and others',
    },
    {
      title: 'Pardon',
      description: 'Official forgiveness from the governor/president',
      details: 'A pardon is official forgiveness for a crime. It doesn\'t erase the conviction but restores rights (like voting, gun ownership). Pardons are granted by governors (state crimes) or the President (federal crimes).',
      availability: 'All states and federal system',
    },
    {
      title: 'Automatic Expungement (Clean Slate)',
      description: 'Records cleared automatically',
      details: 'Some states have "Clean Slate" laws that automatically expunge certain records after a waiting period without requiring you to file a petition. This is the newest and most accessible form of relief.',
      availability: 'PA, MI, UT, NJ, and growing',
    },
  ];

  const eligibilityFactors = [
    { factor: 'Type of Offense', description: 'Non-violent, misdemeanors, and lower-level felonies are more likely eligible. Serious violent crimes, sex offenses, and DUIs are often excluded.' },
    { factor: 'Time Since Conviction', description: 'Most states require a waiting period (typically 3-10 years) after completing your sentence before you can apply.' },
    { factor: 'Completion of Sentence', description: 'You must have completed all parts of your sentence including probation, parole, fines, and restitution.' },
    { factor: 'No New Offenses', description: 'You typically cannot have any new arrests or convictions during the waiting period.' },
    { factor: 'Number of Convictions', description: 'Some states limit expungement to first-time offenders or limit the number of convictions that can be expunged.' },
    { factor: 'Age at Offense', description: 'Juvenile records are often easier to expunge. Some states have special provisions for young adult offenders.' },
  ];

  const expungementSteps = [
    { step: 1, title: 'Get Your Criminal Record', description: 'Request your official criminal history from the state police or court. You need to know exactly what\'s on your record.' },
    { step: 2, title: 'Determine Eligibility', description: 'Review your state\'s expungement laws to see if your conviction(s) qualify. Consider consulting with a lawyer or legal aid.' },
    { step: 3, title: 'Obtain the Forms', description: 'Get the official petition forms from the court clerk or court website. Some states have different forms for different types of relief.' },
    { step: 4, title: 'Complete the Petition', description: 'Fill out all forms completely and accurately. Include all required information about your conviction and rehabilitation.' },
    { step: 5, title: 'Gather Supporting Documents', description: 'Collect documents showing rehabilitation: employment records, education certificates, community service, character references.' },
    { step: 6, title: 'File with the Court', description: 'Submit your petition to the appropriate court (usually where you were convicted). Pay any filing fees (fee waivers may be available).' },
    { step: 7, title: 'Serve Required Parties', description: 'You may need to notify the prosecutor\'s office and other parties. Follow your state\'s service requirements exactly.' },
    { step: 8, title: 'Attend the Hearing', description: 'Some petitions require a hearing. Be prepared to explain your rehabilitation and why expungement should be granted.' },
    { step: 9, title: 'Receive the Order', description: 'If granted, get certified copies of the expungement order. Send copies to relevant agencies (FBI, state police, etc.).' },
    { step: 10, title: 'Verify Completion', description: 'After processing time, check your record to confirm the expungement was completed. Follow up if records still appear.' },
  ];

  const stateResources = [
    { state: 'Pennsylvania', url: 'https://www.pacourts.us/learn/expungement', notes: 'Clean Slate law (Act 56) provides automatic expungement for many offenses' },
    { state: 'California', url: 'https://www.courts.ca.gov/1070.htm', notes: 'PC 1203.4 allows dismissal after probation; Prop 47 reduced many felonies' },
    { state: 'Texas', url: 'https://www.txcourts.gov/programs-services/self-help/expunction-and-nondisclosure/', notes: 'Expunction for arrests; nondisclosure for deferred adjudication' },
    { state: 'New York', url: 'https://www.nycourts.gov/courthelp/Criminal/expungement.shtml', notes: 'Limited sealing available; marijuana convictions can be expunged' },
    { state: 'Florida', url: 'https://www.fdle.state.fl.us/Seal-and-Expunge/Seal-and-Expunge-Home.aspx', notes: 'One-time expungement or sealing available for eligible offenses' },
    { state: 'Michigan', url: 'https://www.michigan.gov/ag/initiatives/expungement', notes: 'Clean Slate law expanded eligibility significantly in 2021' },
    { state: 'New Jersey', url: 'https://www.njcourts.gov/self-help/expungement', notes: 'Clean Slate law provides automatic expungement after waiting periods' },
    { state: 'Illinois', url: 'https://www.ilcourts.gov/Forms/approved/expungement/', notes: 'Expanded expungement and sealing options available' },
  ];

  const commonMistakes = [
    'Not checking ALL courts where you may have records (municipal, county, federal)',
    'Filing before the waiting period is complete',
    'Not paying off all fines and restitution first',
    'Using incorrect or outdated forms',
    'Not serving all required parties',
    'Missing court deadlines or hearing dates',
    'Not following up to verify records were actually expunged',
    'Assuming expungement is automatic when it requires a petition',
  ];

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
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
          <View className="flex-1">
            <Text className="text-xl font-bold text-foreground">Expungement Guide</Text>
            <Text className="text-sm text-muted">Clear your record, reclaim your future</Text>
          </View>
        </View>

        {/* Hero Section */}
        <View className="px-4 py-4">
          <View className="bg-primary rounded-xl p-5">
            <View className="flex-row items-center mb-3">
              <View className="w-12 h-12 rounded-full bg-white/20 items-center justify-center mr-3">
                <IconSymbol name="checkmark.shield.fill" size={28} color="#FFFFFF" />
              </View>
              <View className="flex-1">
                <Text className="text-xl font-bold text-white">You May Be Eligible</Text>
                <Text className="text-sm text-white/80">Millions qualify but never apply</Text>
              </View>
            </View>
            <Text className="text-sm text-white/90 leading-relaxed mb-4">
              Expungement can remove arrests and convictions from your record, opening doors to jobs, 
              housing, education, and more. Many people are eligible but don't know it or don't know how to apply.
            </Text>
            <TouchableOpacity
              className="bg-white rounded-xl py-3 items-center flex-row justify-center"
              onPress={() => router.push("/expungement-quiz" as any)}
              activeOpacity={0.8}
            >
              <IconSymbol name="checkmark.circle.fill" size={20} color={colors.primary} />
              <Text className="font-semibold ml-2" style={{ color: colors.primary }}>Take Eligibility Quiz</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* What is Expungement */}
        <View className="px-4 py-2">
          <TouchableOpacity
            className="bg-surface rounded-xl border border-border overflow-hidden"
            onPress={() => toggleSection('what-is')}
            activeOpacity={0.7}
          >
            <View className="p-4 flex-row items-center justify-between">
              <View className="flex-row items-center">
                <View 
                  className="w-10 h-10 rounded-full items-center justify-center mr-3"
                  style={{ backgroundColor: colors.primary + '20' }}
                >
                  <IconSymbol name="questionmark.circle" size={22} color={colors.primary} />
                </View>
                <Text className="text-lg font-semibold text-foreground">What is Expungement?</Text>
              </View>
              <IconSymbol 
                name={expandedSection === 'what-is' ? "chevron.up" : "chevron.down"} 
                size={20} 
                color={colors.muted} 
              />
            </View>
            {expandedSection === 'what-is' && (
              <View className="px-4 pb-4">
                <View className="bg-background rounded-lg p-4">
                  <Text className="text-sm text-foreground leading-relaxed mb-3">
                    <Text className="font-semibold">Expungement</Text> is a legal process that erases or seals 
                    criminal records from public view. After expungement, in most cases, you can legally answer 
                    "No" when asked if you have a criminal record on job applications, housing applications, 
                    and other forms.
                  </Text>
                  <Text className="text-sm text-foreground leading-relaxed mb-3">
                    The exact process and what qualifies varies significantly by state. Some states call it 
                    "expungement," others call it "sealing," "set-aside," or "dismissal." The effects also 
                    vary—some truly erase records while others just hide them from public view.
                  </Text>
                  <Text className="text-sm text-muted">
                    Understanding your state's specific laws is crucial to knowing what relief is available to you.
                  </Text>
                </View>
              </View>
            )}
          </TouchableOpacity>
        </View>

        {/* Types of Record Relief */}
        <View className="px-4 py-4">
          <Text className="text-lg font-semibold text-foreground mb-3 px-1">Types of Record Relief</Text>
          {expungementTypes.map((type, index) => (
            <View key={index} className="bg-surface rounded-xl p-4 mb-3 border border-border">
              <View className="flex-row items-center mb-2">
                <View 
                  className="w-8 h-8 rounded-full items-center justify-center mr-3"
                  style={{ backgroundColor: colors.success + '20' }}
                >
                  <IconSymbol name="checkmark.circle.fill" size={18} color={colors.success} />
                </View>
                <View className="flex-1">
                  <Text className="text-base font-semibold text-foreground">{type.title}</Text>
                  <Text className="text-xs text-muted">{type.description}</Text>
                </View>
              </View>
              <Text className="text-sm text-muted leading-relaxed mb-2">{type.details}</Text>
              <View className="bg-background rounded-lg px-3 py-2">
                <Text className="text-xs text-primary font-medium">{type.availability}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Eligibility Factors */}
        <View className="px-4 py-4">
          <Text className="text-lg font-semibold text-foreground mb-3 px-1">What Determines Eligibility?</Text>
          <View className="bg-surface rounded-xl border border-border overflow-hidden">
            {eligibilityFactors.map((item, index) => (
              <View 
                key={index} 
                className={`p-4 ${index < eligibilityFactors.length - 1 ? 'border-b border-border' : ''}`}
              >
                <Text className="text-sm font-semibold text-foreground mb-1">{item.factor}</Text>
                <Text className="text-sm text-muted">{item.description}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Step by Step Process */}
        <View className="px-4 py-4">
          <Text className="text-lg font-semibold text-foreground mb-3 px-1">Step-by-Step Process</Text>
          <View className="bg-surface rounded-xl p-4 border border-border">
            {expungementSteps.map((item, index) => (
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

        {/* State Resources */}
        <View className="px-4 py-4">
          <Text className="text-lg font-semibold text-foreground mb-3 px-1">State-Specific Resources</Text>
          {stateResources.map((state, index) => (
            <TouchableOpacity
              key={index}
              className="bg-surface rounded-xl p-4 mb-3 border border-border flex-row items-center"
              onPress={() => Linking.openURL(state.url)}
              activeOpacity={0.7}
            >
              <View 
                className="w-10 h-10 rounded-full items-center justify-center mr-3"
                style={{ backgroundColor: colors.primary + '20' }}
              >
                <IconSymbol name="building.columns" size={20} color={colors.primary} />
              </View>
              <View className="flex-1">
                <Text className="text-base font-semibold text-foreground">{state.state}</Text>
                <Text className="text-xs text-muted" numberOfLines={2}>{state.notes}</Text>
              </View>
              <IconSymbol name="arrow.up.right" size={18} color={colors.primary} />
            </TouchableOpacity>
          ))}
          <View className="bg-primary/10 rounded-xl p-4 border border-primary/30">
            <Text className="text-sm text-foreground leading-relaxed">
              <Text className="font-semibold">Don't see your state?</Text> Search "[Your State] expungement" 
              or visit your state court's website. You can also contact your local legal aid organization for help.
            </Text>
          </View>
        </View>

        {/* Common Mistakes */}
        <View className="px-4 py-4">
          <Text className="text-lg font-semibold text-foreground mb-3 px-1">Common Mistakes to Avoid</Text>
          <View className="bg-warning/10 rounded-xl p-4 border border-warning/30">
            {commonMistakes.map((mistake, index) => (
              <View key={index} className="flex-row items-start mb-2">
                <IconSymbol name="exclamationmark.triangle" size={14} color={colors.warning} style={{ marginTop: 3 }} />
                <Text className="flex-1 text-sm text-foreground ml-2">{mistake}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Cost Information */}
        <View className="px-4 py-4">
          <View className="bg-surface rounded-xl p-4 border border-border">
            <View className="flex-row items-center mb-2">
              <IconSymbol name="dollarsign.circle" size={18} color={colors.primary} />
              <Text className="text-base font-semibold text-foreground ml-2">Cost & Free Help</Text>
            </View>
            <Text className="text-sm text-muted leading-relaxed mb-3">
              Filing fees typically range from $0-$500 depending on your state. Many states offer fee waivers 
              for those who can't afford the fees. Legal aid organizations often provide free help with expungement.
            </Text>
            <View className="flex-row flex-wrap">
              <TouchableOpacity
                className="bg-primary/10 rounded-lg px-3 py-2 mr-2 mb-2"
                onPress={() => Linking.openURL('https://www.lawhelp.org/')}
                activeOpacity={0.7}
              >
                <Text className="text-sm font-medium" style={{ color: colors.primary }}>LawHelp.org</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="bg-primary/10 rounded-lg px-3 py-2 mr-2 mb-2"
                onPress={() => Linking.openURL('https://www.cleanslateclearinghouse.org/')}
                activeOpacity={0.7}
              >
                <Text className="text-sm font-medium" style={{ color: colors.primary }}>Clean Slate Clearinghouse</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* After Expungement */}
        <View className="px-4 py-4">
          <View className="bg-success/10 rounded-xl p-4 border border-success/30">
            <View className="flex-row items-center mb-2">
              <IconSymbol name="checkmark.circle.fill" size={18} color={colors.success} />
              <Text className="text-base font-semibold text-foreground ml-2">After Expungement</Text>
            </View>
            <Text className="text-sm text-muted leading-relaxed">
              Once your record is expunged, you can generally:{'\n\n'}
              • Answer "No" to questions about arrests/convictions on most applications{'\n'}
              • Apply for jobs without disclosing the expunged offense{'\n'}
              • Apply for housing without the record appearing{'\n'}
              • Pursue professional licenses that were previously denied{'\n'}
              • Have peace of mind that your past won't follow you{'\n\n'}
              <Text className="font-semibold">Note:</Text> Some exceptions exist for government jobs, law enforcement, 
              and certain professional licenses. Always check specific requirements.
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
            <Text className="text-white font-semibold ml-2">Ask AI About Expungement</Text>
          </TouchableOpacity>
        </View>

        {/* Disclaimer */}
        <View className="px-4 py-4 mb-4">
          <View className="bg-surface rounded-xl p-4 border border-border">
            <View className="flex-row items-start">
              <IconSymbol name="info.circle" size={18} color={colors.muted} style={{ marginTop: 2 }} />
              <Text className="flex-1 text-xs text-muted ml-2 leading-relaxed">
                Expungement laws vary significantly by state and change frequently. This guide provides general 
                information only. For advice specific to your situation, consult with an attorney or your local 
                legal aid organization. Many offer free consultations for expungement cases.
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
