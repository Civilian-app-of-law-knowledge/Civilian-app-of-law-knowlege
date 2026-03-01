import { ScrollView, Text, View, TouchableOpacity, Linking } from "react-native";
import { useRouter } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useColors } from "@/hooks/use-colors";
import { useState } from "react";

const SECTIONS = [
  {
    id: "types", title: "Types of Supervision", items: [
      { title: "Probation", desc: "Court-ordered supervision instead of (or in addition to) incarceration. You remain in the community under conditions set by the judge. Violating conditions can result in jail time." },
      { title: "Parole", desc: "Supervised release from prison before your sentence is complete. Granted by a parole board based on behavior, risk assessment, and time served." },
      { title: "Supervised Release", desc: "Federal version of parole. A period of supervision that follows a federal prison sentence. Conditions are set by the judge at sentencing." },
      { title: "Unsupervised Probation", desc: "You don't report to a PO, but you must still follow all conditions. Violation can still result in revocation." },
      { title: "Intensive Supervision (ISP)", desc: "Strict probation with frequent reporting, curfews, electronic monitoring, and random drug testing. Often used as an alternative to incarceration." },
    ]
  },
  {
    id: "conditions", title: "Common Conditions", items: [
      { title: "Regular Reporting", desc: "Meet with your probation/parole officer on a set schedule (weekly, bi-weekly, or monthly)" },
      { title: "Drug & Alcohol Testing", desc: "Random urine tests, breathalyzers, or hair follicle tests. Failing a test is a violation." },
      { title: "Employment Requirement", desc: "Must maintain employment or actively seek work. Provide pay stubs or job search logs." },
      { title: "Travel Restrictions", desc: "Cannot leave the county/state without written permission from your PO. Must request travel passes in advance." },
      { title: "No Contact Orders", desc: "May be prohibited from contacting certain people (victims, co-defendants, known criminals)." },
      { title: "Curfew", desc: "Must be home by a certain time. May be verified by phone calls or home visits." },
      { title: "Community Service", desc: "Required hours of unpaid work for approved organizations." },
      { title: "Fines & Restitution", desc: "Must make regular payments toward court-ordered fines, costs, and victim restitution." },
      { title: "Treatment Programs", desc: "May be required to attend drug/alcohol treatment, anger management, or mental health counseling." },
      { title: "No Firearms", desc: "Cannot possess firearms, ammunition, or dangerous weapons while on supervision." },
    ]
  },
  {
    id: "violations", title: "Violations & Consequences", items: [
      { title: "Technical Violations", desc: "Breaking a condition of supervision (missed appointment, failed drug test, missed curfew). May result in warning, increased supervision, or revocation hearing." },
      { title: "New Criminal Charges", desc: "Being arrested for a new crime while on supervision. This is the most serious type of violation and often results in revocation." },
      { title: "Graduated Sanctions", desc: "Many jurisdictions now use graduated sanctions — increasing consequences for repeated violations rather than immediate revocation." },
      { title: "Revocation Hearing", desc: "If your PO files a violation, you have the right to a hearing before a judge. You can present evidence and have an attorney represent you." },
      { title: "Your Rights at a Violation Hearing", desc: "Right to written notice of violations, right to an attorney (appointed if you can't afford one), right to present evidence and witnesses, right to cross-examine witnesses." },
    ]
  },
  {
    id: "early", title: "Early Termination", items: [
      { title: "When Can You Request It?", desc: "Most states allow you to petition for early termination after completing at least half of your probation/parole term with no violations." },
      { title: "How to Request", desc: "File a motion with the court (probation) or petition the parole board (parole). Your attorney can help prepare the motion." },
      { title: "What Helps Your Case", desc: "Clean record on supervision, steady employment, completed all programs, paid all fines/restitution, community involvement, letters of support." },
      { title: "Federal Early Termination", desc: "Under 18 U.S.C. § 3583(e), federal judges can terminate supervised release after 1 year if the defendant has demonstrated good conduct." },
      { title: "Sample Motion Template", desc: "Your motion should include: your case number, date of sentencing, conditions completed, employment status, community ties, and why early termination serves the interest of justice." },
    ]
  },
  {
    id: "travel", title: "Travel Permissions", items: [
      { title: "In-State Travel", desc: "Generally allowed within your county. Some jurisdictions require permission to leave the county." },
      { title: "Out-of-State Travel", desc: "Must request a travel pass from your PO in advance (usually 2-4 weeks). Provide destination, dates, purpose, and contact info." },
      { title: "Interstate Compact", desc: "If you need to move to another state, your supervision can be transferred through the Interstate Compact for Adult Offender Supervision (ICAOS)." },
      { title: "International Travel", desc: "Generally prohibited while on supervision. Some exceptions may be granted for work or family emergencies with court approval." },
      { title: "Emergency Travel", desc: "For family emergencies, contact your PO immediately. They may grant verbal permission and follow up with paperwork." },
    ]
  },
];

const PO_TIPS = [
  "Always be honest with your PO — lying makes everything worse",
  "Show up to every appointment on time. Call ahead if you'll be late",
  "Keep documentation of everything (pay stubs, program certificates, community service hours)",
  "If you're struggling, tell your PO BEFORE it becomes a violation",
  "Be respectful but know your rights — you don't have to consent to everything",
  "Keep your PO's contact info saved and accessible at all times",
  "If you feel your PO is being unfair, you can request a supervisor meeting",
  "Document any issues or concerns in writing (email is best for a paper trail)",
];

export default function ProbationGuideScreen() {
  const router = useRouter();
  const colors = useColors();
  const [expandedSection, setExpandedSection] = useState<string | null>("types");

  const openLink = (url: string) => Linking.openURL(url);

  return (
    <ScreenContainer>
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        <View className="p-4">
          <TouchableOpacity onPress={() => router.back()} style={{ flexDirection: "row", alignItems: "center", marginBottom: 16 }}>
            <IconSymbol name="chevron.left" size={24} color={colors.primary} />
            <Text className="text-primary ml-1 text-base">Back</Text>
          </TouchableOpacity>

          <View className="bg-primary/10 rounded-2xl p-5 mb-6">
            <Text className="text-2xl font-bold text-foreground mb-2">Probation & Parole Guide</Text>
            <Text className="text-muted text-sm leading-relaxed">
              Everything you need to know about probation, parole, and supervised release — your conditions, rights, how to request early termination, and travel permissions.
            </Text>
          </View>

          {/* Sections */}
          {SECTIONS.map((section) => (
            <View key={section.id} className="bg-surface rounded-xl border border-border mb-4 overflow-hidden">
              <TouchableOpacity onPress={() => setExpandedSection(expandedSection === section.id ? null : section.id)} style={{ padding: 16 }}>
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                  <Text className="text-foreground font-bold text-base">{section.title}</Text>
                  <IconSymbol name={expandedSection === section.id ? "chevron.up" : "chevron.down"} size={16} color={colors.muted} />
                </View>
              </TouchableOpacity>
              {expandedSection === section.id && (
                <View className="px-4 pb-4">
                  {section.items.map((item, i) => (
                    <View key={i} className="mb-3 bg-background rounded-lg p-3 border border-border">
                      <Text className="text-foreground font-semibold text-sm">{item.title}</Text>
                      <Text className="text-muted text-xs mt-1 leading-relaxed">{item.desc}</Text>
                    </View>
                  ))}
                </View>
              )}
            </View>
          ))}

          {/* Tips for Success */}
          <View className="bg-success/10 border border-success/30 rounded-xl p-4 mb-4">
            <Text className="text-foreground font-bold mb-3">Tips for Successful Supervision</Text>
            {PO_TIPS.map((tip, i) => (
              <View key={i} style={{ flexDirection: "row", marginBottom: 6 }}>
                <Text className="text-success mr-2">✓</Text>
                <Text className="text-muted text-sm flex-1">{tip}</Text>
              </View>
            ))}
          </View>

          {/* Resources */}
          <View className="bg-surface rounded-xl border border-border p-4 mb-4">
            <Text className="text-foreground font-bold text-lg mb-3">Resources</Text>
            {[
              { title: "Interstate Compact (ICAOS)", url: "https://www.interstatecompact.org/", desc: "Transfer supervision between states" },
              { title: "Federal Probation & Pretrial Services", url: "https://www.uscourts.gov/services-forms/probation-and-pretrial-services", desc: "Federal supervision info" },
              { title: "APPA - American Probation & Parole Association", url: "https://www.appa-net.org/", desc: "Professional association with resources" },
              { title: "Parole Board Contact Info", url: "https://www.apaintl.org/", desc: "Association of Paroling Authorities International" },
            ].map((res, i) => (
              <TouchableOpacity key={i} onPress={() => openLink(res.url)} style={{ flexDirection: "row", alignItems: "center", marginBottom: 10 }}>
                <IconSymbol name="arrow.up.right" size={14} color={colors.primary} />
                <View style={{ marginLeft: 8 }}>
                  <Text className="text-foreground font-semibold text-sm">{res.title}</Text>
                  <Text className="text-muted text-xs">{res.desc}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          <View className="bg-surface rounded-xl p-4">
            <Text className="text-muted text-xs text-center leading-relaxed">
              Probation and parole conditions vary by jurisdiction. Always consult with your attorney or PO about your specific conditions and rights.
            </Text>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
