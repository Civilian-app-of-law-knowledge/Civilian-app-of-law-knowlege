import { ScrollView, Text, View, TouchableOpacity, Linking } from "react-native";
import { useRouter } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useColors } from "@/hooks/use-colors";
import { useState } from "react";

const GRIEVANCE_TYPES = [
  {
    id: "general",
    title: "General Grievance",
    icon: "doc.on.clipboard" as const,
    description: "Complaints about facility conditions, food, mail, property, or general treatment",
    steps: [
      "Attempt to resolve the issue informally with staff first",
      "Request a grievance form from your housing unit officer or counselor",
      "Fill out the form completely — include dates, times, names, and specific details",
      "Keep a copy of everything you submit (write it down before turning it in)",
      "Submit the grievance to the designated grievance coordinator",
      "You should receive a written response within 15-30 days (varies by facility)",
      "If denied, you have the right to appeal — usually within 5-15 days of the response",
      "Appeal to the next level (Warden, then Regional Director, then Central Office)",
      "Exhaust ALL administrative remedies before filing in court — this is required by the PLRA"
    ],
  },
  {
    id: "medical",
    title: "Medical Grievance",
    icon: "cross.case.fill" as const,
    description: "Denial of medical care, delayed treatment, medication issues, mental health",
    steps: [
      "Submit a sick call request FIRST — document that you tried to get care",
      "If denied or delayed, file a medical grievance specifically about the denial",
      "Include your symptoms, when they started, and what care you requested",
      "Reference the 8th Amendment — deliberate indifference to medical needs is unconstitutional",
      "Request copies of your medical records (you have the right to them)",
      "If it's an emergency and you're being ignored, have family call the facility AND file a complaint with the state health department",
      "Contact the ACLU or a prisoners' rights organization if care continues to be denied",
      "Document EVERYTHING — dates, who you spoke to, what was said"
    ],
  },
  {
    id: "prea",
    title: "PREA Complaint (Sexual Abuse)",
    icon: "exclamationmark.triangle.fill" as const,
    description: "Report sexual abuse, harassment, or assault under the Prison Rape Elimination Act",
    steps: [
      "You can report to ANY staff member — they are ALL mandatory reporters",
      "You do NOT have to report to the person who committed the abuse",
      "You can report anonymously through the PREA hotline",
      "The facility MUST investigate — they cannot ignore your report",
      "You have the right to be separated from the abuser immediately",
      "You have the right to medical care and mental health support",
      "You can also report to outside agencies — the DOJ, state inspector general, or advocacy organizations",
      "Retaliation for reporting is ILLEGAL — document any retaliation immediately"
    ],
    hotline: "1-800-656-4673",
    hotlineLabel: "National Sexual Assault Hotline (RAINN)",
  },
  {
    id: "use-of-force",
    title: "Excessive Force Complaint",
    icon: "hand.raised.fill" as const,
    description: "Report excessive or unnecessary use of force by corrections officers",
    steps: [
      "Document everything immediately — date, time, location, officers involved, witnesses",
      "Request medical attention and have injuries documented in your medical record",
      "File a grievance as soon as possible — delays weaken your case",
      "Include names or badge numbers of ALL officers present, not just those who used force",
      "Request preservation of any video footage — facilities often have cameras",
      "Contact family to file a complaint with the facility AND the state DOC inspector general",
      "Contact a prisoners' rights attorney — excessive force violates the 8th Amendment",
      "File a complaint with the DOJ Civil Rights Division if the facility fails to act"
    ],
  },
  {
    id: "retaliation",
    title: "Retaliation Complaint",
    icon: "flag.fill" as const,
    description: "Report retaliation for filing grievances, complaints, or exercising your rights",
    steps: [
      "Document the timeline: what you filed, when you filed it, and what happened after",
      "Retaliation can include: cell transfers, loss of privileges, disciplinary write-ups, threats, isolation",
      "File a separate grievance specifically about the retaliation",
      "Reference the First Amendment — retaliation for exercising rights is unconstitutional",
      "Notify family members so they can contact advocacy organizations",
      "Contact the ACLU, state prisoners' rights project, or legal aid",
      "Keep copies of ALL grievances and responses — build your paper trail",
      "If you fear for your safety, request protective custody and document the request"
    ],
  },
  {
    id: "conditions",
    title: "Conditions of Confinement",
    icon: "building.columns" as const,
    description: "Overcrowding, unsanitary conditions, extreme temperatures, lack of exercise",
    steps: [
      "Document specific conditions: temperatures, cleanliness, overcrowding numbers, broken fixtures",
      "File grievances about each specific condition separately",
      "Reference the 8th Amendment — conditions that pose a substantial risk of harm are unconstitutional",
      "Request inspection by the state health department or fire marshal if conditions are dangerous",
      "Have family contact local media and advocacy organizations",
      "Contact the DOJ Civil Rights Division — they investigate systemic conditions issues",
      "Join with other inmates if the issue affects everyone — class action grievances carry more weight",
      "Document any illnesses or injuries caused by the conditions"
    ],
  },
];

const STATE_GRIEVANCE_RESOURCES = [
  { state: "Federal (BOP)", url: "https://www.bop.gov/inmates/communications.jsp", process: "BP-8 → BP-9 → BP-10 → BP-11" },
  { state: "California", url: "https://www.cdcr.ca.gov/regulations/cdcr-regulations/grievance-process/", process: "CDCR Form 602" },
  { state: "Texas", url: "https://www.tdcj.texas.gov/divisions/oid/grievance.html", process: "Step 1 → Step 2 Grievance" },
  { state: "Florida", url: "http://www.dc.state.fl.us/ci/index.html", process: "Informal → Formal → Appeal" },
  { state: "New York", url: "https://doccs.ny.gov/directives", process: "IGP → CORC Appeal" },
  { state: "Pennsylvania", url: "https://www.cor.pa.gov/Inmates/Pages/Inmate-Grievance-System.aspx", process: "DC-ADM 804 Process" },
  { state: "Ohio", url: "https://drc.ohio.gov/policies", process: "Informal → Inspector of Institutional Services" },
  { state: "Michigan", url: "https://www.michigan.gov/corrections", process: "Step I → Step II → Step III" },
  { state: "Illinois", url: "https://idoc.illinois.gov/", process: "Counselor → Grievance Officer → ARB" },
  { state: "Georgia", url: "http://www.dcor.state.ga.us/", process: "Informal → Formal → Commissioner's Appeal" },
  { state: "Arizona", url: "https://corrections.az.gov/", process: "Informal → Formal → Director's Appeal" },
  { state: "Virginia", url: "https://vadoc.virginia.gov/", process: "Informal → Regular → Level I → Level II" },
  { state: "North Carolina", url: "https://www.dac.nc.gov/", process: "Step 1 → Step 2 → Step 3" },
  { state: "New Jersey", url: "https://www.nj.gov/corrections/", process: "Inmate Remedy System" },
  { state: "Colorado", url: "https://cdoc.colorado.gov/", process: "Step 1 → Step 2 → Step 3" },
  { state: "Washington", url: "https://www.doc.wa.gov/", process: "Level I → Level II → Level III" },
  { state: "Oregon", url: "https://www.oregon.gov/doc/", process: "Grievance → Appeal → Review" },
  { state: "Indiana", url: "https://www.in.gov/idoc/", process: "Informal → Formal → Appeal" },
  { state: "Tennessee", url: "https://www.tn.gov/correction.html", process: "Informal → Formal → Commissioner" },
  { state: "Missouri", url: "https://doc.mo.gov/", process: "IRR → Grievance → Appeal" },
];

const GRIEVANCE_TEMPLATES = [
  {
    title: "General Conditions Grievance",
    template: `TO: Grievance Coordinator
FROM: [Your Name], [Your ID Number]
DATE: [Date]
HOUSING: [Unit/Cell]

GRIEVANCE:

I am filing this grievance regarding [specific issue]. On [date], at approximately [time], [describe what happened in detail].

[Include names of staff involved, witnesses, and any prior attempts to resolve informally.]

RELIEF REQUESTED:

I am requesting [specific action you want taken — be specific].

I have attempted to resolve this informally by [describe what you did].

Respectfully submitted,
[Your Name]
[Your ID Number]`,
  },
  {
    title: "Medical Care Denial Grievance",
    template: `TO: Grievance Coordinator / Health Services Administrator
FROM: [Your Name], [Your ID Number]
DATE: [Date]

MEDICAL GRIEVANCE:

I am filing this grievance regarding denial/delay of medical care. On [date], I submitted a sick call request for [symptoms/condition]. 

[Describe what happened — were you seen? What was the response? Were medications denied?]

The 8th Amendment prohibits deliberate indifference to serious medical needs (Estelle v. Gamble, 429 U.S. 97, 1976).

RELIEF REQUESTED:

I am requesting [specific medical care, evaluation, medication, specialist referral].

Respectfully submitted,
[Your Name]
[Your ID Number]`,
  },
  {
    title: "Excessive Force Grievance",
    template: `TO: Grievance Coordinator / Inspector General
FROM: [Your Name], [Your ID Number]
DATE: [Date]

USE OF FORCE GRIEVANCE:

On [date] at approximately [time] in [location], Officer(s) [names/badge numbers] used excessive force against me.

[Describe exactly what happened — what led to it, what force was used, injuries sustained, witnesses present.]

I request that any available video footage from [location] be preserved as evidence.

I received medical treatment on [date] for [injuries].

RELIEF REQUESTED:

I am requesting an investigation into this use of force, disciplinary action against the officer(s), and preservation of all video evidence.

Respectfully submitted,
[Your Name]
[Your ID Number]`,
  },
];

const IMPORTANT_CASES = [
  { name: "Estelle v. Gamble (1976)", desc: "Deliberate indifference to medical needs violates 8th Amendment", url: "https://supreme.justia.com/cases/federal/us/429/97/" },
  { name: "Hudson v. McMillian (1992)", desc: "Excessive force doesn't require serious injury to be unconstitutional", url: "https://supreme.justia.com/cases/federal/us/503/1/" },
  { name: "Turner v. Safley (1987)", desc: "Standard for evaluating prison regulations that restrict rights", url: "https://supreme.justia.com/cases/federal/us/482/78/" },
  { name: "Farmer v. Brennan (1994)", desc: "Officials liable if they know of and disregard substantial risk", url: "https://supreme.justia.com/cases/federal/us/511/825/" },
  { name: "Bounds v. Smith (1977)", desc: "Inmates have right to access courts — must have law library or legal assistance", url: "https://supreme.justia.com/cases/federal/us/430/817/" },
  { name: "Wolff v. McDonnell (1974)", desc: "Due process rights in prison disciplinary proceedings", url: "https://supreme.justia.com/cases/federal/us/418/539/" },
];

export default function GrievancesScreen() {
  const router = useRouter();
  const colors = useColors();
  const [expandedType, setExpandedType] = useState<string | null>(null);
  const [expandedTemplate, setExpandedTemplate] = useState<number | null>(null);
  const [showAllStates, setShowAllStates] = useState(false);

  const displayedStates = showAllStates ? STATE_GRIEVANCE_RESOURCES : STATE_GRIEVANCE_RESOURCES.slice(0, 8);

  return (
    <ScreenContainer>
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        <View className="p-4">
          {/* Header */}
          <View className="flex-row items-center mb-2">
            <TouchableOpacity
              onPress={() => router.back()}
              style={{ padding: 8, marginRight: 8 }}
            >
              <IconSymbol name="chevron.left" size={24} color={colors.foreground} />
            </TouchableOpacity>
            <Text className="text-2xl font-bold text-foreground flex-1">
              Grievance Filing System
            </Text>
          </View>

          {/* Important Notice */}
          <View className="bg-error/10 rounded-2xl p-4 mb-6 border border-error/30">
            <View className="flex-row items-center mb-2">
              <IconSymbol name="exclamationmark.triangle.fill" size={20} color={colors.error} />
              <Text className="text-base font-bold text-error ml-2">Critical: Exhaust All Remedies</Text>
            </View>
            <Text className="text-sm text-foreground leading-relaxed">
              Under the Prison Litigation Reform Act (PLRA), you MUST exhaust all available administrative remedies before filing a lawsuit in federal court. This means completing every step of the grievance process, including all appeals. If you skip a step, your case can be dismissed.
            </Text>
          </View>

          {/* Grievance Types */}
          <Text className="text-xl font-bold text-foreground mb-4">Types of Grievances</Text>
          {GRIEVANCE_TYPES.map((type) => (
            <TouchableOpacity
              key={type.id}
              onPress={() => setExpandedType(expandedType === type.id ? null : type.id)}
              style={{ marginBottom: 12 }}
            >
              <View className="bg-surface rounded-2xl p-4 border border-border">
                <View className="flex-row items-center mb-2">
                  <View className="w-10 h-10 rounded-full bg-primary/15 items-center justify-center mr-3">
                    <IconSymbol name={type.icon} size={20} color={colors.primary} />
                  </View>
                  <View className="flex-1">
                    <Text className="text-base font-bold text-foreground">{type.title}</Text>
                    <Text className="text-xs text-muted mt-1">{type.description}</Text>
                  </View>
                  <IconSymbol
                    name={expandedType === type.id ? "chevron.up" : "chevron.down"}
                    size={20}
                    color={colors.muted}
                  />
                </View>

                {expandedType === type.id && (
                  <View className="mt-3 pt-3 border-t border-border">
                    <Text className="text-sm font-bold text-foreground mb-2">Step-by-Step Process:</Text>
                    {type.steps.map((step, idx) => (
                      <View key={idx} className="flex-row mb-2">
                        <View className="w-6 h-6 rounded-full bg-primary/20 items-center justify-center mr-2 mt-0.5">
                          <Text className="text-xs font-bold text-primary">{idx + 1}</Text>
                        </View>
                        <Text className="text-sm text-foreground flex-1 leading-relaxed">{step}</Text>
                      </View>
                    ))}
                    {"hotline" in type && type.hotline && (
                      <TouchableOpacity
                        onPress={() => Linking.openURL(`tel:${type.hotline}`)}
                        style={{ marginTop: 12, backgroundColor: colors.error + "20", borderRadius: 12, padding: 12 }}
                      >
                        <Text className="text-sm font-bold text-error text-center">
                          {type.hotlineLabel}: {type.hotline}
                        </Text>
                      </TouchableOpacity>
                    )}
                  </View>
                )}
              </View>
            </TouchableOpacity>
          ))}

          {/* Grievance Templates */}
          <Text className="text-xl font-bold text-foreground mt-6 mb-4">Grievance Templates</Text>
          <Text className="text-sm text-muted mb-4">
            Use these templates as starting points. Always customize with your specific details, dates, and names.
          </Text>
          {GRIEVANCE_TEMPLATES.map((tmpl, idx) => (
            <TouchableOpacity
              key={idx}
              onPress={() => setExpandedTemplate(expandedTemplate === idx ? null : idx)}
              style={{ marginBottom: 12 }}
            >
              <View className="bg-surface rounded-2xl p-4 border border-border">
                <View className="flex-row items-center justify-between">
                  <View className="flex-row items-center flex-1">
                    <IconSymbol name="doc.text" size={20} color={colors.primary} />
                    <Text className="text-base font-bold text-foreground ml-2">{tmpl.title}</Text>
                  </View>
                  <IconSymbol
                    name={expandedTemplate === idx ? "chevron.up" : "chevron.down"}
                    size={20}
                    color={colors.muted}
                  />
                </View>
                {expandedTemplate === idx && (
                  <View className="mt-3 pt-3 border-t border-border bg-background rounded-xl p-3">
                    <Text className="text-xs text-foreground font-mono leading-relaxed" style={{ fontFamily: "monospace" }}>
                      {tmpl.template}
                    </Text>
                  </View>
                )}
              </View>
            </TouchableOpacity>
          ))}

          {/* State-Specific Processes */}
          <Text className="text-xl font-bold text-foreground mt-6 mb-4">State Grievance Processes</Text>
          {displayedStates.map((state, idx) => (
            <TouchableOpacity
              key={idx}
              onPress={() => Linking.openURL(state.url)}
              style={{ marginBottom: 8 }}
            >
              <View className="bg-surface rounded-xl p-3 border border-border flex-row items-center">
                <View className="flex-1">
                  <Text className="text-sm font-bold text-foreground">{state.state}</Text>
                  <Text className="text-xs text-muted mt-1">Process: {state.process}</Text>
                </View>
                <IconSymbol name="arrow.up.right" size={16} color={colors.primary} />
              </View>
            </TouchableOpacity>
          ))}
          {!showAllStates && (
            <TouchableOpacity onPress={() => setShowAllStates(true)} style={{ marginTop: 4, marginBottom: 12 }}>
              <Text className="text-sm font-bold text-primary text-center">
                Show All {STATE_GRIEVANCE_RESOURCES.length} States →
              </Text>
            </TouchableOpacity>
          )}

          {/* Landmark Cases */}
          <Text className="text-xl font-bold text-foreground mt-6 mb-4">Know Your Legal Precedents</Text>
          <Text className="text-sm text-muted mb-4">
            These Supreme Court cases established the rights you can reference in your grievances.
          </Text>
          {IMPORTANT_CASES.map((c, idx) => (
            <TouchableOpacity
              key={idx}
              onPress={() => Linking.openURL(c.url)}
              style={{ marginBottom: 8 }}
            >
              <View className="bg-surface rounded-xl p-3 border border-border">
                <Text className="text-sm font-bold text-primary">{c.name}</Text>
                <Text className="text-xs text-muted mt-1">{c.desc}</Text>
              </View>
            </TouchableOpacity>
          ))}

          {/* Tips */}
          <View className="bg-primary/10 rounded-2xl p-4 mt-6 border border-primary/30">
            <Text className="text-base font-bold text-foreground mb-3">Grievance Filing Tips</Text>
            {[
              "Always keep copies of EVERYTHING — grievances, responses, appeals",
              "Be specific — include dates, times, names, badge numbers, locations",
              "Stay factual and professional — emotional language weakens your case",
              "File within the time limit — most facilities require filing within 15-30 days",
              "One issue per grievance — don't combine multiple complaints",
              "Never threaten staff in a grievance — it can be used against you",
              "If you can't get a form, write your grievance on any paper and submit it",
              "Have a witness sign and date a copy if possible",
              "Mail copies to family so there's an outside record",
              "If you're being denied forms, that itself is a grievable issue",
            ].map((tip, idx) => (
              <View key={idx} className="flex-row mb-2">
                <IconSymbol name="checkmark.circle.fill" size={16} color={colors.success} style={{ marginTop: 2 }} />
                <Text className="text-sm text-foreground ml-2 flex-1 leading-relaxed">{tip}</Text>
              </View>
            ))}
          </View>

          {/* External Resources */}
          <Text className="text-xl font-bold text-foreground mt-6 mb-4">Grievance Help Resources</Text>
          {[
            { name: "ACLU National Prison Project", url: "https://www.aclu.org/issues/prisoners-rights", desc: "Legal advocacy for prisoners' rights" },
            { name: "Prison Policy Initiative", url: "https://www.prisonpolicy.org/", desc: "Research and advocacy on mass incarceration" },
            { name: "Prisoners' Rights Project (Legal Aid)", url: "https://legalaidnyc.org/programs-projects-units/prisoners-rights-project/", desc: "Free legal help for incarcerated individuals" },
            { name: "DOJ Civil Rights Division", url: "https://www.justice.gov/crt/special-litigation-section", desc: "Federal investigation of systemic issues" },
            { name: "National PREA Resource Center", url: "https://www.prearesourcecenter.org/", desc: "Sexual abuse prevention and reporting" },
            { name: "Jailhouse Lawyer's Handbook", url: "https://jailhouselaw.org/", desc: "Free legal guide for filing grievances and lawsuits" },
          ].map((resource, idx) => (
            <TouchableOpacity
              key={idx}
              onPress={() => Linking.openURL(resource.url)}
              style={{ marginBottom: 8 }}
            >
              <View className="bg-surface rounded-xl p-3 border border-border flex-row items-center">
                <View className="flex-1">
                  <Text className="text-sm font-bold text-foreground">{resource.name}</Text>
                  <Text className="text-xs text-muted mt-1">{resource.desc}</Text>
                </View>
                <IconSymbol name="arrow.up.right" size={16} color={colors.primary} />
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
