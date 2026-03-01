import { ScrollView, Text, View, TouchableOpacity, Linking } from "react-native";
import { useRouter } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useColors } from "@/hooks/use-colors";
import { useState } from "react";

const BENEFIT_TYPES = [
  {
    id: "ssi",
    title: "Supplemental Security Income (SSI)",
    icon: "creditcard" as const,
    description: "Monthly payments for disabled, blind, or elderly individuals with limited income and resources",
    eligibility: [
      "Must be disabled, blind, or age 65+",
      "Limited income and resources (under $2,000 individual / $3,000 couple)",
      "Must be a U.S. citizen or qualifying non-citizen",
      "SSI payments are SUSPENDED (not terminated) during incarceration",
      "Benefits can be reinstated upon release if you were incarcerated less than 12 consecutive months",
      "If incarcerated 12+ months, you must file a NEW application",
      "You can apply up to 30 days BEFORE your release date",
    ],
    howToApply: [
      "Contact Social Security at 1-800-772-1213 (TTY: 1-800-325-0778)",
      "Visit your local Social Security office with ID and medical records",
      "Apply online at ssa.gov (for initial applications)",
      "Have your facility's social worker help you apply before release",
      "Gather medical documentation of your disability",
      "Get a letter from your facility confirming your release date",
    ],
    appealProcess: [
      "Step 1: Request Reconsideration within 60 days of denial",
      "Step 2: Request a hearing before an Administrative Law Judge (ALJ)",
      "Step 3: Request review by the Appeals Council",
      "Step 4: File a federal court lawsuit",
      "You have 60 days at each level to appeal",
      "Free legal help available through Legal Aid and disability advocates",
    ],
    links: [
      { title: "SSA - Benefits for Prisoners", url: "https://www.ssa.gov/pubs/EN-05-10133.pdf" },
      { title: "Apply for SSI Online", url: "https://www.ssa.gov/benefits/ssi/" },
      { title: "Find Your Local SSA Office", url: "https://secure.ssa.gov/ICON/main.jsp" },
      { title: "SSA Appeals Process", url: "https://www.ssa.gov/appeals/" },
    ],
  },
  {
    id: "ssdi",
    title: "Social Security Disability (SSDI)",
    icon: "doc.richtext" as const,
    description: "Benefits for workers who become disabled and have enough work credits",
    eligibility: [
      "Must have worked and paid Social Security taxes (FICA) for enough years",
      "Must have a medical condition that meets SSA's definition of disability",
      "SSDI payments are SUSPENDED after 30 days of incarceration",
      "Benefits automatically resume the month after release",
      "Your dependents (spouse, children) may still receive benefits while you're incarcerated",
      "Medicare coverage continues for incarcerated individuals on SSDI",
    ],
    howToApply: [
      "Call SSA at 1-800-772-1213 to start your application",
      "Gather all medical records and work history",
      "List all doctors, hospitals, and clinics that treated you",
      "Apply up to 30 days before your release",
      "Ask your facility social worker for help with the application",
    ],
    appealProcess: [
      "Same 4-step process as SSI appeals",
      "Consider hiring a disability attorney (they work on contingency — no upfront cost)",
      "Most cases are won at the ALJ hearing level",
      "Average wait time for ALJ hearing: 12-18 months",
    ],
    links: [
      { title: "SSDI Application", url: "https://www.ssa.gov/benefits/disability/" },
      { title: "Check Your Work Credits", url: "https://www.ssa.gov/myaccount/" },
      { title: "Disability Determination Process", url: "https://www.ssa.gov/disability/determination.htm" },
    ],
  },
  {
    id: "medicaid",
    title: "Medicaid & Healthcare",
    icon: "stethoscope" as const,
    description: "Free or low-cost health coverage for eligible individuals",
    eligibility: [
      "Medicaid is SUSPENDED (not terminated) during incarceration in most states",
      "Coverage should restart upon release — contact your state Medicaid office",
      "ACA Marketplace plans available during Special Enrollment Period after release",
      "Many states now allow Medicaid enrollment 30-90 days BEFORE release",
      "Community health centers provide care on a sliding fee scale",
      "Prescription assistance programs available for medications",
    ],
    howToApply: [
      "Apply through Healthcare.gov or your state's Medicaid website",
      "Visit your local Department of Social Services",
      "Ask your reentry case manager to help you apply before release",
      "Bring ID, proof of income, and proof of release",
      "Apply for both Medicaid AND ACA marketplace plans to see what you qualify for",
    ],
    appealProcess: [
      "Request a Fair Hearing if denied",
      "You have 60-90 days to appeal (varies by state)",
      "Free legal help available through Legal Aid for Medicaid appeals",
      "You can continue receiving benefits during the appeal process",
    ],
    links: [
      { title: "Healthcare.gov", url: "https://www.healthcare.gov/" },
      { title: "Medicaid.gov", url: "https://www.medicaid.gov/" },
      { title: "Find Community Health Centers", url: "https://findahealthcenter.hrsa.gov/" },
      { title: "NeedyMeds - Rx Assistance", url: "https://www.needymeds.org/" },
    ],
  },
  {
    id: "snap",
    title: "SNAP (Food Stamps)",
    icon: "cart" as const,
    description: "Monthly food assistance benefits loaded onto an EBT card",
    eligibility: [
      "Most people released from incarceration ARE eligible for SNAP",
      "Drug felony bans have been lifted or modified in most states",
      "Must meet income requirements (varies by household size)",
      "Can apply immediately upon release",
      "Some states allow application before release",
      "Expedited (emergency) benefits available within 7 days if you have less than $150 in assets",
    ],
    howToApply: [
      "Apply at your local Department of Social Services / SNAP office",
      "Apply online through your state's benefits portal",
      "Bring ID, proof of income, proof of address, and release papers",
      "Request EXPEDITED benefits if you have an emergency food need",
      "Benefits are typically approved within 30 days (7 days for expedited)",
    ],
    appealProcess: [
      "Request a Fair Hearing if denied or benefits seem too low",
      "You have 90 days to request a hearing",
      "Continue receiving benefits during the appeal",
      "Legal Aid can represent you at the hearing for free",
    ],
    links: [
      { title: "SNAP Eligibility", url: "https://www.fns.usda.gov/snap/recipient/eligibility" },
      { title: "Find Your State SNAP Office", url: "https://www.fns.usda.gov/snap/state-directory" },
      { title: "SNAP Pre-Entry Guide", url: "https://www.cbpp.org/research/food-assistance/snap-and-criminal-justice" },
    ],
  },
  {
    id: "housing",
    title: "Housing Assistance",
    icon: "house.fill" as const,
    description: "Programs to help with housing after release",
    eligibility: [
      "Section 8 / Housing Choice Vouchers — some restrictions for certain offenses",
      "HUD does NOT have a blanket ban on people with criminal records",
      "Each Public Housing Authority (PHA) sets its own policies",
      "Transitional housing programs specifically for reentry",
      "Rapid Rehousing programs available in many areas",
      "Veterans can access HUD-VASH vouchers through the VA",
    ],
    howToApply: [
      "Contact your local Public Housing Authority (PHA)",
      "Apply for transitional housing through reentry organizations",
      "Contact 211 for local housing resources",
      "Apply for emergency shelter if needed immediately",
      "Look into Oxford Houses (self-supporting recovery housing)",
    ],
    appealProcess: [
      "If denied public housing, request a written explanation",
      "You have the right to an informal hearing",
      "Provide evidence of rehabilitation and changed circumstances",
      "Legal Aid can help with housing discrimination appeals",
    ],
    links: [
      { title: "HUD - Find Housing", url: "https://www.hud.gov/topics/rental_assistance" },
      { title: "Find Your Local PHA", url: "https://www.hud.gov/program_offices/public_indian_housing/pha/contacts" },
      { title: "National Reentry Resource Center", url: "https://nationalreentryresourcecenter.org/" },
      { title: "Oxford Houses", url: "https://www.oxfordhouse.org/" },
      { title: "211 Helpline", url: "https://www.211.org/" },
    ],
  },
];

const AARP_PROGRAMS = [
  { title: "AARP Legal Services Network", desc: "Discounted legal consultations for members 50+", url: "https://www.aarp.org/money/estate-planning/legal-services/" },
  { title: "AARP Foundation", desc: "Free tax preparation, job training, and legal assistance for low-income seniors", url: "https://www.aarp.org/aarp-foundation/" },
  { title: "ElderLaw Answers", desc: "Find elder law attorneys who handle SSI, Medicaid, and benefits issues", url: "https://www.elderlawanswers.com/" },
  { title: "Benefits.gov", desc: "Find all government benefits you may qualify for", url: "https://www.benefits.gov/" },
  { title: "BenefitsCheckUp", desc: "National Council on Aging tool to find benefits for seniors", url: "https://www.benefitscheckup.org/" },
];

export default function SSIBenefitsScreen() {
  const router = useRouter();
  const colors = useColors();
  const [expandedBenefit, setExpandedBenefit] = useState<string | null>(null);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const openLink = (url: string) => Linking.openURL(url);

  return (
    <ScreenContainer>
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        <View className="p-4">
          {/* Header */}
          <TouchableOpacity onPress={() => router.back()} style={{ flexDirection: "row", alignItems: "center", marginBottom: 16 }}>
            <IconSymbol name="chevron.left" size={24} color={colors.primary} />
            <Text className="text-primary ml-1 text-base">Back</Text>
          </TouchableOpacity>

          <View className="bg-primary/10 rounded-2xl p-5 mb-6">
            <Text className="text-2xl font-bold text-foreground mb-2">SSI & Benefits Center</Text>
            <Text className="text-muted text-sm leading-relaxed">
              Know what benefits you qualify for. Whether you're currently incarcerated, recently released, or helping a loved one — this guide covers SSI, SSDI, Medicaid, SNAP, housing assistance, and how to appeal if denied.
            </Text>
          </View>

          {/* Important Notice */}
          <View className="bg-warning/10 border border-warning/30 rounded-xl p-4 mb-6">
            <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 8 }}>
              <IconSymbol name="exclamationmark.triangle" size={20} color={colors.warning} />
              <Text className="text-foreground font-bold ml-2">Important: Apply BEFORE Release</Text>
            </View>
            <Text className="text-muted text-sm leading-relaxed">
              You can apply for SSI, SSDI, Medicaid, and SNAP up to 30 days before your release date. Ask your facility's social worker or case manager to help you start the process early. Don't wait until you're out — the sooner you apply, the sooner benefits kick in.
            </Text>
          </View>

          {/* Benefit Types */}
          {BENEFIT_TYPES.map((benefit) => (
            <View key={benefit.id} className="bg-surface rounded-xl border border-border mb-4 overflow-hidden">
              <TouchableOpacity
                onPress={() => setExpandedBenefit(expandedBenefit === benefit.id ? null : benefit.id)}
                style={{ flexDirection: "row", alignItems: "center", padding: 16 }}
              >
                <View className="w-10 h-10 rounded-full bg-primary/10 items-center justify-center mr-3">
                  <IconSymbol name={benefit.icon} size={20} color={colors.primary} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text className="text-foreground font-bold text-base">{benefit.title}</Text>
                  <Text className="text-muted text-xs mt-1">{benefit.description}</Text>
                </View>
                <IconSymbol name={expandedBenefit === benefit.id ? "chevron.up" : "chevron.down"} size={20} color={colors.muted} />
              </TouchableOpacity>

              {expandedBenefit === benefit.id && (
                <View className="px-4 pb-4">
                  {/* Eligibility */}
                  <TouchableOpacity
                    onPress={() => setExpandedSection(expandedSection === `${benefit.id}-elig` ? null : `${benefit.id}-elig`)}
                    style={{ flexDirection: "row", alignItems: "center", paddingVertical: 10, borderTopWidth: 1, borderTopColor: colors.border }}
                  >
                    <IconSymbol name="checkmark.circle.fill" size={18} color={colors.success} />
                    <Text className="text-foreground font-semibold ml-2 flex-1">Eligibility & Key Facts</Text>
                    <IconSymbol name={expandedSection === `${benefit.id}-elig` ? "chevron.up" : "chevron.down"} size={16} color={colors.muted} />
                  </TouchableOpacity>
                  {expandedSection === `${benefit.id}-elig` && benefit.eligibility.map((item, i) => (
                    <View key={i} style={{ flexDirection: "row", paddingLeft: 28, marginBottom: 6 }}>
                      <Text className="text-primary mr-2">•</Text>
                      <Text className="text-muted text-sm flex-1 leading-relaxed">{item}</Text>
                    </View>
                  ))}

                  {/* How to Apply */}
                  <TouchableOpacity
                    onPress={() => setExpandedSection(expandedSection === `${benefit.id}-apply` ? null : `${benefit.id}-apply`)}
                    style={{ flexDirection: "row", alignItems: "center", paddingVertical: 10, borderTopWidth: 1, borderTopColor: colors.border }}
                  >
                    <IconSymbol name="doc.text" size={18} color={colors.primary} />
                    <Text className="text-foreground font-semibold ml-2 flex-1">How to Apply</Text>
                    <IconSymbol name={expandedSection === `${benefit.id}-apply` ? "chevron.up" : "chevron.down"} size={16} color={colors.muted} />
                  </TouchableOpacity>
                  {expandedSection === `${benefit.id}-apply` && benefit.howToApply.map((item, i) => (
                    <View key={i} style={{ flexDirection: "row", paddingLeft: 28, marginBottom: 6 }}>
                      <Text className="text-primary mr-2">{i + 1}.</Text>
                      <Text className="text-muted text-sm flex-1 leading-relaxed">{item}</Text>
                    </View>
                  ))}

                  {/* Appeal Process */}
                  <TouchableOpacity
                    onPress={() => setExpandedSection(expandedSection === `${benefit.id}-appeal` ? null : `${benefit.id}-appeal`)}
                    style={{ flexDirection: "row", alignItems: "center", paddingVertical: 10, borderTopWidth: 1, borderTopColor: colors.border }}
                  >
                    <IconSymbol name="exclamationmark.triangle" size={18} color={colors.warning} />
                    <Text className="text-foreground font-semibold ml-2 flex-1">How to Appeal if Denied</Text>
                    <IconSymbol name={expandedSection === `${benefit.id}-appeal` ? "chevron.up" : "chevron.down"} size={16} color={colors.muted} />
                  </TouchableOpacity>
                  {expandedSection === `${benefit.id}-appeal` && benefit.appealProcess.map((item, i) => (
                    <View key={i} style={{ flexDirection: "row", paddingLeft: 28, marginBottom: 6 }}>
                      <Text className="text-primary mr-2">→</Text>
                      <Text className="text-muted text-sm flex-1 leading-relaxed">{item}</Text>
                    </View>
                  ))}

                  {/* Links */}
                  <View style={{ borderTopWidth: 1, borderTopColor: colors.border, paddingTop: 10, marginTop: 4 }}>
                    <Text className="text-foreground font-semibold mb-2">Official Resources:</Text>
                    {benefit.links.map((link, i) => (
                      <TouchableOpacity key={i} onPress={() => openLink(link.url)} style={{ flexDirection: "row", alignItems: "center", marginBottom: 8 }}>
                        <IconSymbol name="arrow.up.right" size={14} color={colors.primary} />
                        <Text className="text-primary text-sm ml-2 underline">{link.title}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              )}
            </View>
          ))}

          {/* AARP & Senior Programs */}
          <View className="bg-surface rounded-xl border border-border p-4 mb-4">
            <Text className="text-foreground font-bold text-lg mb-3">AARP & Senior Programs</Text>
            <Text className="text-muted text-sm mb-4 leading-relaxed">
              If you or your loved one is 50+, these organizations provide legal help, benefits assistance, and support programs.
            </Text>
            {AARP_PROGRAMS.map((prog, i) => (
              <TouchableOpacity key={i} onPress={() => openLink(prog.url)} className="mb-3 bg-background rounded-lg p-3 border border-border">
                <Text className="text-foreground font-semibold text-sm">{prog.title}</Text>
                <Text className="text-muted text-xs mt-1">{prog.desc}</Text>
                <View style={{ flexDirection: "row", alignItems: "center", marginTop: 6 }}>
                  <IconSymbol name="arrow.up.right" size={12} color={colors.primary} />
                  <Text className="text-primary text-xs ml-1">Visit Website</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* Quick Tips */}
          <View className="bg-success/10 border border-success/30 rounded-xl p-4 mb-4">
            <Text className="text-foreground font-bold mb-2">Quick Tips for Getting Benefits</Text>
            {[
              "Apply 30 days before release — don't wait",
              "Keep copies of EVERYTHING you submit",
              "Always appeal a denial — most denials are overturned on appeal",
              "Get free legal help from Legal Aid for benefits cases",
              "Ask for expedited processing if you have an emergency need",
              "Your facility social worker can help you apply — ask them",
              "Call 211 for local resources and benefit assistance",
              "Benefits.gov can show you ALL programs you may qualify for",
            ].map((tip, i) => (
              <View key={i} style={{ flexDirection: "row", marginBottom: 4 }}>
                <Text className="text-success mr-2">✓</Text>
                <Text className="text-muted text-sm flex-1">{tip}</Text>
              </View>
            ))}
          </View>

          {/* Disclaimer */}
          <View className="bg-surface rounded-xl p-4 mt-2">
            <Text className="text-muted text-xs text-center leading-relaxed">
              This information is for educational purposes only and does not constitute legal or financial advice. Benefit eligibility varies by state and individual circumstances. Contact your local Social Security office or Legal Aid for personalized guidance.
            </Text>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
