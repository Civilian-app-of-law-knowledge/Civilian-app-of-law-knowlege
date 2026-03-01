import { ScrollView, Text, View, TouchableOpacity, Linking } from "react-native";
import { useRouter } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useColors } from "@/hooks/use-colors";
import { useState } from "react";

const WORK_RELEASE_BENEFITS = [
  { title: "Earn Real Money", desc: "Work a real job, earn wages, and start building financial stability before release", icon: "banknote" as const },
  { title: "Pay Down Fines & Fees", desc: "A percentage goes toward court fines, restitution, and fees — reducing your debt", icon: "dollarsign.circle" as const },
  { title: "Build Savings", desc: "Facilities hold a percentage for your release fund — you leave with money in your pocket", icon: "lock.fill" as const },
  { title: "Gain Work Experience", desc: "Build your resume with real employment history while still serving your sentence", icon: "briefcase.fill" as const },
  { title: "Maintain Family Connections", desc: "Working outside helps maintain normalcy and connection with family", icon: "heart.fill" as const },
  { title: "Smoother Reentry", desc: "Already employed when you walk out — dramatically reduces recidivism", icon: "checkmark.shield.fill" as const },
  { title: "Learn New Skills", desc: "On-the-job training, certifications, and skills that transfer to full-time employment", icon: "graduationcap.fill" as const },
  { title: "Mental Health Benefits", desc: "Purpose, structure, and productivity improve mental health and self-worth", icon: "brain.head.profile" as const },
];

const PETITION_STEPS = [
  {
    step: 1,
    title: "Check Your Eligibility",
    details: [
      "Most programs require you to be within 6-24 months of release",
      "Non-violent offenses typically qualify more easily",
      "Good behavior record is usually required (no major disciplinary actions in last 6-12 months)",
      "Must have served a minimum percentage of your sentence (varies by state — usually 25-50%)",
      "Some states exclude certain offenses (sex offenses, violent felonies) — check your state's rules",
      "Immigration detainers may disqualify you in some jurisdictions",
    ],
  },
  {
    step: 2,
    title: "Gather Your Documentation",
    details: [
      "Disciplinary record showing good behavior",
      "Program completion certificates (GED, vocational, substance abuse, anger management)",
      "Letters of support from counselors, case managers, chaplains, or teachers",
      "Job offer or employer willingness letter (if you already have one lined up)",
      "Housing plan for where you'll live during work release",
      "Transportation plan (how you'll get to and from work)",
      "Reentry plan showing your goals and steps for successful reintegration",
    ],
  },
  {
    step: 3,
    title: "Write Your Petition",
    details: [
      "Address it to the Warden or Work Release Coordinator",
      "State clearly that you are requesting work release placement",
      "List your eligibility factors (time served, behavior, programs completed)",
      "Explain your employment plan — what kind of work, where, how you'll get there",
      "Describe how work release will benefit your reentry and reduce recidivism",
      "Include your housing and transportation plan",
      "Attach all supporting documents",
      "Be professional, respectful, and specific",
    ],
  },
  {
    step: 4,
    title: "Submit and Follow Up",
    details: [
      "Submit to your case manager or counselor first — they often need to recommend you",
      "Keep a copy of everything you submit",
      "Follow up every 2 weeks if you haven't heard back",
      "If denied, ask for the specific reason in writing",
      "Address the reason and reapply — persistence matters",
      "Have family advocate on your behalf by contacting the facility",
      "Contact your state representative if you're being unfairly denied",
    ],
  },
];

const PETITION_TEMPLATE = `TO: [Warden Name / Work Release Coordinator]
[Facility Name]
[Facility Address]

FROM: [Your Full Name]
[Your Inmate ID Number]
[Your Housing Unit]

DATE: [Date]

RE: REQUEST FOR WORK RELEASE PROGRAM PLACEMENT

Dear [Warden / Coordinator],

I am writing to respectfully request consideration for placement in the Work Release Program. I believe I meet the eligibility requirements and am committed to making the most of this opportunity.

ELIGIBILITY:
• Current sentence: [Your sentence length]
• Time served: [How long you've been incarcerated]
• Projected release date: [Your release date]
• Disciplinary record: [Describe — e.g., "No major infractions in the past 12 months"]

PROGRAMS COMPLETED:
• [List all programs — GED, vocational training, substance abuse, etc.]
• [Include dates of completion]

EMPLOYMENT PLAN:
• [Describe the type of work you're seeking or a specific job offer]
• [If you have an employer willing to hire you, include their information]

HOUSING PLAN:
• [Where you will reside during work release]
• [Relationship to the person at that address]

TRANSPORTATION PLAN:
• [How you will get to and from work — public transit, ride services, walking distance]

I understand the responsibility that comes with work release and am committed to following all rules and requirements. Work release will allow me to:
1. Begin earning income to pay court fines and support my family
2. Build work experience for a successful reentry
3. Save money for my release
4. Demonstrate my commitment to being a productive member of society

I have attached [list attachments — support letters, certificates, job offer, etc.] for your review.

Thank you for your time and consideration.

Respectfully,
[Your Full Name]
[Your Inmate ID Number]`;

const TRANSPORTATION_RESOURCES = [
  { name: "Lyft / Uber", desc: "Rideshare services — some facilities allow for work release transportation", url: "https://www.lyft.com/" },
  { name: "Via / HopSkipDrive", desc: "Shared ride services available in many metro areas", url: "https://ridewithvia.com/" },
  { name: "Public Transit", desc: "Most cities have bus/rail — check your local transit authority", url: "https://www.apta.com/research-technical-resources/public-transportation-links/" },
  { name: "Goodwill Transportation", desc: "Some Goodwill locations offer transportation assistance for employment", url: "https://www.goodwill.org/" },
  { name: "211 Transportation Help", desc: "Dial 211 for local transportation assistance resources", url: "https://www.211.org/" },
];

const STATE_WORK_RELEASE = [
  { state: "Federal (BOP)", info: "Residential Reentry Centers (RRC) — last 6-12 months", url: "https://www.bop.gov/inmates/custody_and_care/reentry.jsp" },
  { state: "California", info: "CDCR Alternative Custody Program & Male Community Reentry Program", url: "https://www.cdcr.ca.gov/adult-operations/fops/male-community-reentry-program/" },
  { state: "Texas", info: "TDCJ Pre-Parole Transfer Facility & Work Release", url: "https://www.tdcj.texas.gov/divisions/rpd/work_release.html" },
  { state: "Florida", info: "DOC Community Release Programs", url: "https://www.dc.state.fl.us/ci/index.html" },
  { state: "New York", info: "DOCCS Temporary Release Programs (Work Release, Furlough)", url: "https://doccs.ny.gov/temporary-release-programs" },
  { state: "Pennsylvania", info: "DOC Community Corrections Centers", url: "https://www.cor.pa.gov/community-reentry/Pages/Community-Corrections-Centers.aspx" },
  { state: "Ohio", info: "DRC Transitional Control / Halfway House", url: "https://drc.ohio.gov/reentry" },
  { state: "Michigan", info: "MDOC Residential Reentry Program", url: "https://www.michigan.gov/corrections/reentry" },
  { state: "Illinois", info: "IDOC Adult Transition Centers", url: "https://idoc.illinois.gov/" },
  { state: "Georgia", info: "GDC Transitional Centers", url: "http://www.dcor.state.ga.us/Divisions/FacilitiesOperations/TransitionalCenters" },
  { state: "New Jersey", info: "NJ DOC Mutual Agreement Program", url: "https://www.nj.gov/corrections/" },
  { state: "Virginia", info: "VADOC Diversion Center / Work Release", url: "https://vadoc.virginia.gov/" },
  { state: "North Carolina", info: "NCDPS Community Supervision Programs", url: "https://www.dac.nc.gov/" },
  { state: "Washington", info: "DOC Work Release — multiple facilities statewide", url: "https://www.doc.wa.gov/corrections/programs/work-release.htm" },
  { state: "Colorado", info: "CDOC Community Return to Custody & Intensive Supervision", url: "https://cdoc.colorado.gov/" },
];

export default function WorkReleaseScreen() {
  const router = useRouter();
  const colors = useColors();
  const [showPetition, setShowPetition] = useState(false);
  const [expandedStep, setExpandedStep] = useState<number | null>(null);
  const [showAllStates, setShowAllStates] = useState(false);

  const displayedStates = showAllStates ? STATE_WORK_RELEASE : STATE_WORK_RELEASE.slice(0, 8);

  return (
    <ScreenContainer>
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        <View className="p-4">
          {/* Header */}
          <View className="flex-row items-center mb-2">
            <TouchableOpacity onPress={() => router.back()} style={{ padding: 8, marginRight: 8 }}>
              <IconSymbol name="chevron.left" size={24} color={colors.foreground} />
            </TouchableOpacity>
            <Text className="text-2xl font-bold text-foreground flex-1">Work Release Center</Text>
          </View>

          {/* Hero Banner */}
          <View className="bg-success/10 rounded-2xl p-5 mb-6 border border-success/30">
            <Text className="text-lg font-bold text-foreground mb-2">Work Release Works.</Text>
            <Text className="text-sm text-foreground leading-relaxed mb-3">
              Work release programs reduce recidivism by up to 50%. They help you earn money, pay fines, build savings, gain experience, and transition back into society with purpose and stability. Every person deserves this opportunity.
            </Text>
            <Text className="text-xs text-muted italic">
              "I had two jobs — working at the farm and Goodwill. They took a percentage for fines, gave me some back, and held the rest for when I got out. I was set."
            </Text>
          </View>

          {/* Benefits Grid */}
          <Text className="text-xl font-bold text-foreground mb-4">Why Work Release Matters</Text>
          <View className="flex-row flex-wrap" style={{ marginHorizontal: -4 }}>
            {WORK_RELEASE_BENEFITS.map((benefit, idx) => (
              <View key={idx} style={{ width: "50%", padding: 4 }}>
                <View className="bg-surface rounded-xl p-3 border border-border" style={{ minHeight: 120 }}>
                  <IconSymbol name={benefit.icon} size={24} color={colors.primary} />
                  <Text className="text-sm font-bold text-foreground mt-2">{benefit.title}</Text>
                  <Text className="text-xs text-muted mt-1 leading-relaxed">{benefit.desc}</Text>
                </View>
              </View>
            ))}
          </View>

          {/* How to Petition */}
          <Text className="text-xl font-bold text-foreground mt-6 mb-4">How to Petition for Work Release</Text>
          {PETITION_STEPS.map((step) => (
            <TouchableOpacity
              key={step.step}
              onPress={() => setExpandedStep(expandedStep === step.step ? null : step.step)}
              style={{ marginBottom: 12 }}
            >
              <View className="bg-surface rounded-2xl p-4 border border-border">
                <View className="flex-row items-center">
                  <View className="w-10 h-10 rounded-full bg-primary items-center justify-center mr-3">
                    <Text className="text-base font-bold text-background">{step.step}</Text>
                  </View>
                  <Text className="text-base font-bold text-foreground flex-1">{step.title}</Text>
                  <IconSymbol
                    name={expandedStep === step.step ? "chevron.up" : "chevron.down"}
                    size={20}
                    color={colors.muted}
                  />
                </View>
                {expandedStep === step.step && (
                  <View className="mt-3 pt-3 border-t border-border">
                    {step.details.map((detail, idx) => (
                      <View key={idx} className="flex-row mb-2">
                        <IconSymbol name="checkmark.circle.fill" size={16} color={colors.success} style={{ marginTop: 2 }} />
                        <Text className="text-sm text-foreground ml-2 flex-1 leading-relaxed">{detail}</Text>
                      </View>
                    ))}
                  </View>
                )}
              </View>
            </TouchableOpacity>
          ))}

          {/* Petition Template */}
          <TouchableOpacity onPress={() => setShowPetition(!showPetition)} style={{ marginBottom: 16 }}>
            <View className="bg-primary/10 rounded-2xl p-4 border border-primary/30">
              <View className="flex-row items-center justify-between">
                <View className="flex-row items-center">
                  <IconSymbol name="doc.text" size={24} color={colors.primary} />
                  <Text className="text-base font-bold text-foreground ml-2">Sample Petition Template</Text>
                </View>
                <IconSymbol
                  name={showPetition ? "chevron.up" : "chevron.down"}
                  size={20}
                  color={colors.primary}
                />
              </View>
              <Text className="text-xs text-muted mt-1">Tap to view a ready-to-use petition template</Text>
              {showPetition && (
                <View className="mt-3 pt-3 border-t border-primary/20 bg-background rounded-xl p-3">
                  <Text className="text-xs text-foreground leading-relaxed" style={{ fontFamily: "monospace" }}>
                    {PETITION_TEMPLATE}
                  </Text>
                </View>
              )}
            </View>
          </TouchableOpacity>

          {/* How Jail Banking Works */}
          <Text className="text-xl font-bold text-foreground mt-4 mb-4">How Jail Banking Works</Text>
          <View className="bg-surface rounded-2xl p-4 border border-border mb-4">
            <Text className="text-sm text-foreground leading-relaxed mb-3">
              When you work on work release, your earnings are typically split into portions:
            </Text>
            {[
              { label: "Court Fines & Restitution", pct: "20-30%", desc: "Goes directly toward paying off your legal obligations" },
              { label: "Room & Board", pct: "10-25%", desc: "Covers your housing costs at the facility" },
              { label: "Savings (Release Fund)", pct: "10-20%", desc: "Held for you until release — you walk out with money" },
              { label: "Spending Money", pct: "10-20%", desc: "Available for commissary, phone calls, and personal needs" },
              { label: "Family Support", pct: "Optional", desc: "Some programs allow you to send money to family" },
            ].map((item, idx) => (
              <View key={idx} className="flex-row items-center mb-3 pb-3 border-b border-border">
                <View className="bg-primary/15 rounded-lg px-2 py-1 mr-3" style={{ minWidth: 60 }}>
                  <Text className="text-xs font-bold text-primary text-center">{item.pct}</Text>
                </View>
                <View className="flex-1">
                  <Text className="text-sm font-bold text-foreground">{item.label}</Text>
                  <Text className="text-xs text-muted">{item.desc}</Text>
                </View>
              </View>
            ))}
            <Text className="text-xs text-muted italic mt-2">
              Percentages vary by facility and state. Ask your case manager for your facility's specific breakdown.
            </Text>
          </View>

          {/* Transportation */}
          <Text className="text-xl font-bold text-foreground mt-4 mb-4">Transportation Resources</Text>
          <Text className="text-sm text-muted mb-3">
            Transportation is no excuse to deny work release. These resources exist:
          </Text>
          {TRANSPORTATION_RESOURCES.map((resource, idx) => (
            <TouchableOpacity
              key={idx}
              onPress={() => Linking.openURL(resource.url)}
              style={{ marginBottom: 8 }}
            >
              <View className="bg-surface rounded-xl p-3 border border-border flex-row items-center">
                <IconSymbol name="bus" size={20} color={colors.primary} />
                <View className="flex-1 ml-3">
                  <Text className="text-sm font-bold text-foreground">{resource.name}</Text>
                  <Text className="text-xs text-muted">{resource.desc}</Text>
                </View>
                <IconSymbol name="arrow.up.right" size={16} color={colors.primary} />
              </View>
            </TouchableOpacity>
          ))}

          {/* State Programs */}
          <Text className="text-xl font-bold text-foreground mt-6 mb-4">State Work Release Programs</Text>
          {displayedStates.map((state, idx) => (
            <TouchableOpacity
              key={idx}
              onPress={() => Linking.openURL(state.url)}
              style={{ marginBottom: 8 }}
            >
              <View className="bg-surface rounded-xl p-3 border border-border flex-row items-center">
                <View className="flex-1">
                  <Text className="text-sm font-bold text-foreground">{state.state}</Text>
                  <Text className="text-xs text-muted mt-1">{state.info}</Text>
                </View>
                <IconSymbol name="arrow.up.right" size={16} color={colors.primary} />
              </View>
            </TouchableOpacity>
          ))}
          {!showAllStates && (
            <TouchableOpacity onPress={() => setShowAllStates(true)} style={{ marginTop: 4, marginBottom: 12 }}>
              <Text className="text-sm font-bold text-primary text-center">
                Show All {STATE_WORK_RELEASE.length} States →
              </Text>
            </TouchableOpacity>
          )}

          {/* Advocacy Section */}
          <View className="bg-warning/10 rounded-2xl p-4 mt-6 border border-warning/30">
            <Text className="text-base font-bold text-foreground mb-2">Advocate for Work Release</Text>
            <Text className="text-sm text-foreground leading-relaxed mb-3">
              If your county doesn't have a work release program, petition for one. Contact your county commissioners, sheriff, and state representatives. Work release saves taxpayer money, reduces recidivism, and gives people a real chance.
            </Text>
            <Text className="text-sm text-foreground leading-relaxed">
              Families can advocate too — write letters, attend county meetings, and contact local media. Change happens when people speak up.
            </Text>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
