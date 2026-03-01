import { ScrollView, Text, View, TouchableOpacity, Linking } from "react-native";
import { useRouter } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useColors } from "@/hooks/use-colors";
import { useState } from "react";

const PROGRAMS = [
  {
    id: "ard",
    title: "Accelerated Rehabilitative Disposition (ARD)",
    states: "Pennsylvania (other states have similar programs)",
    description: "A pre-trial diversion program for first-time, non-violent offenders. Complete the program and charges are DISMISSED and eligible for expungement.",
    eligibility: ["First-time offender (no prior criminal record)", "Non-violent offense (commonly DUI, drug possession, theft)", "Victim must consent (in some cases)", "DA must approve your application", "Cannot have a prior ARD"],
    process: ["Your attorney requests ARD from the District Attorney", "DA reviews your case and criminal history", "If approved, you enter a probation-like program (6-24 months)", "Complete community service, classes, and any required treatment", "Pay program costs and restitution", "Upon completion, charges are DISMISSED", "File for expungement to clear your record completely"],
    links: [{ title: "PA ARD Program Info", url: "https://www.pacode.com/secure/data/234/chapter3/s316.html" }],
  },
  {
    id: "pti",
    title: "Pre-Trial Intervention (PTI)",
    states: "New Jersey, Florida, and many other states",
    description: "Similar to ARD — a supervised program that, if completed, results in charges being dismissed.",
    eligibility: ["Generally first-time offenders", "Non-violent offenses preferred", "Must apply through the prosecutor's office", "Some states allow PTI for certain felonies"],
    process: ["Apply through the county prosecutor's office", "Interview with a PTI coordinator", "If accepted, follow program conditions (counseling, community service, drug testing)", "Program typically lasts 1-3 years", "Successful completion = charges dismissed", "May be eligible for expungement"],
    links: [{ title: "NJ PTI Program", url: "https://www.njcourts.gov/courts/criminal/pretrial-intervention" }],
  },
  {
    id: "deferred",
    title: "Deferred Adjudication / Deferred Sentencing",
    states: "Texas, Georgia, Michigan, and many others",
    description: "The judge defers (delays) entering a conviction. Complete probation and the case may be dismissed or sealed.",
    eligibility: ["Available for many offense types (varies by state)", "Judge must agree to deferred adjudication", "Often available through plea agreements", "Some states exclude violent felonies and sex offenses"],
    process: ["Negotiate deferred adjudication as part of a plea deal", "Plead guilty or no contest, but judge does NOT enter a conviction", "Complete probation period with all conditions", "If successful, case is dismissed or sealed", "Violation of probation = judge can impose the full sentence"],
    links: [{ title: "TX Deferred Adjudication", url: "https://statutes.capitol.texas.gov/Docs/CR/htm/CR.42A.htm" }],
  },
  {
    id: "drug-court",
    title: "Drug Court / Treatment Court",
    states: "All 50 states have drug court programs",
    description: "Intensive treatment program instead of incarceration for drug-related offenses. Graduate and charges may be reduced or dismissed.",
    eligibility: ["Substance abuse is a factor in the offense", "Non-violent offense (some courts accept violent offenses)", "Must be willing to participate in intensive treatment", "Regular drug testing and court appearances required"],
    process: ["Your attorney or the court refers you to drug court", "Assessment by treatment professionals", "If accepted, attend regular court sessions (weekly or bi-weekly)", "Complete substance abuse treatment, counseling, and drug testing", "Program typically lasts 12-24 months", "Graduation can result in reduced charges, dismissed charges, or sealed records"],
    links: [{ title: "NADCP - Find a Drug Court", url: "https://www.nadcp.org/find-a-drug-court/" }, { title: "SAMHSA Treatment Locator", url: "https://findtreatment.gov/" }],
  },
  {
    id: "diversion",
    title: "Prosecutor Diversion Programs",
    states: "Varies by county — check with your local DA",
    description: "Programs run by the DA's office that allow charges to be dropped after completing requirements.",
    eligibility: ["Usually first-time or low-level offenders", "Offense-specific programs (shoplifting, bad checks, marijuana)", "Must be approved by the prosecutor", "Some programs require victim consent"],
    process: ["DA offers diversion as an alternative to prosecution", "Pay program fees and complete requirements", "May include classes, community service, restitution", "Charges are dropped upon completion", "No conviction on your record"],
    links: [{ title: "Fair and Just Prosecution", url: "https://fairandjustprosecution.org/" }],
  },
  {
    id: "plea",
    title: "Plea Bargaining for Reduced Charges",
    states: "All states",
    description: "Negotiate with the prosecutor to plead to a lesser charge, reducing the severity of your conviction.",
    eligibility: ["Available in virtually all criminal cases", "Strength of evidence affects bargaining power", "Prior record affects what deals are offered", "Having a good attorney significantly helps"],
    process: ["Your attorney reviews the evidence and identifies weaknesses", "Attorney negotiates with the prosecutor", "Common reductions: felony → misdemeanor, multiple charges → single charge", "You plead guilty to the reduced charge", "Judge must approve the plea agreement", "The reduced charge appears on your record (not the original charge)"],
    tips: [
      "ALWAYS have an attorney negotiate for you — never try to plea bargain yourself",
      "The earlier you negotiate, the better the deal usually is",
      "Cooperating with the investigation can lead to better offers",
      "Ask about 'charge bargaining' (reduced charge) vs 'sentence bargaining' (reduced sentence)",
      "If the deal isn't good enough, you have the right to go to trial",
    ],
    links: [{ title: "NACDL - Plea Bargaining", url: "https://www.nacdl.org/Landing/TrialPenalty" }],
  },
];

const PRO_BONO_RESOURCES = [
  { title: "Legal Aid Society", desc: "Free legal representation for low-income individuals", url: "https://www.lsc.gov/about-lsc/what-legal-aid/get-legal-help" },
  { title: "ACLU", desc: "Free legal help for civil rights and criminal justice issues", url: "https://www.aclu.org/need-legal-help" },
  { title: "Innocence Project", desc: "Free legal help for wrongful convictions", url: "https://innocenceproject.org/" },
  { title: "National Legal Aid & Defender Association", desc: "Find free legal services in your area", url: "https://www.nlada.org/" },
  { title: "LawHelp.org", desc: "Find free legal help in your state", url: "https://www.lawhelp.org/" },
  { title: "Pro Bono Net", desc: "Free legal resources and self-help tools", url: "https://www.probono.net/" },
  { title: "AARP Legal Services", desc: "Discounted legal help for members 50+", url: "https://www.aarp.org/money/estate-planning/legal-services/" },
  { title: "Veterans Legal Services", desc: "Free legal help for veterans", url: "https://www.vetsprobono.org/" },
];

export default function ChargeReductionScreen() {
  const router = useRouter();
  const colors = useColors();
  const [expandedProgram, setExpandedProgram] = useState<string | null>(null);

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
            <Text className="text-2xl font-bold text-foreground mb-2">Charge Reduction Hub</Text>
            <Text className="text-muted text-sm leading-relaxed">
              Programs and strategies to get charges dismissed, reduced, or sealed. Many people don't know these options exist — but they can change your life.
            </Text>
          </View>

          {/* Programs */}
          {PROGRAMS.map((prog) => (
            <View key={prog.id} className="bg-surface rounded-xl border border-border mb-4 overflow-hidden">
              <TouchableOpacity
                onPress={() => setExpandedProgram(expandedProgram === prog.id ? null : prog.id)}
                style={{ padding: 16 }}
              >
                <Text className="text-foreground font-bold text-base">{prog.title}</Text>
                <Text className="text-primary text-xs mt-1">{prog.states}</Text>
                <Text className="text-muted text-sm mt-2">{prog.description}</Text>
                <View style={{ flexDirection: "row", justifyContent: "flex-end", marginTop: 8 }}>
                  <Text className="text-primary text-xs">{expandedProgram === prog.id ? "Show Less" : "Show Details"}</Text>
                </View>
              </TouchableOpacity>

              {expandedProgram === prog.id && (
                <View className="px-4 pb-4 border-t border-border pt-3">
                  <Text className="text-foreground font-semibold mb-2">Eligibility:</Text>
                  {prog.eligibility.map((item, i) => (
                    <View key={i} style={{ flexDirection: "row", marginBottom: 4, paddingLeft: 8 }}>
                      <Text className="text-success mr-2">✓</Text>
                      <Text className="text-muted text-sm flex-1">{item}</Text>
                    </View>
                  ))}

                  <Text className="text-foreground font-semibold mb-2 mt-3">Process:</Text>
                  {prog.process.map((item, i) => (
                    <View key={i} style={{ flexDirection: "row", marginBottom: 4, paddingLeft: 8 }}>
                      <Text className="text-primary mr-2">{i + 1}.</Text>
                      <Text className="text-muted text-sm flex-1">{item}</Text>
                    </View>
                  ))}

                  {"tips" in prog && prog.tips && (
                    <>
                      <Text className="text-foreground font-semibold mb-2 mt-3">Pro Tips:</Text>
                      {prog.tips.map((tip, i) => (
                        <View key={i} style={{ flexDirection: "row", marginBottom: 4, paddingLeft: 8 }}>
                          <Text className="text-warning mr-2">★</Text>
                          <Text className="text-muted text-sm flex-1">{tip}</Text>
                        </View>
                      ))}
                    </>
                  )}

                  <View style={{ marginTop: 12 }}>
                    {prog.links.map((link, i) => (
                      <TouchableOpacity key={i} onPress={() => openLink(link.url)} style={{ flexDirection: "row", alignItems: "center", marginBottom: 6 }}>
                        <IconSymbol name="arrow.up.right" size={14} color={colors.primary} />
                        <Text className="text-primary text-sm ml-2 underline">{link.title}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              )}
            </View>
          ))}

          {/* Free Legal Help */}
          <View className="bg-surface rounded-xl border border-border p-4 mb-4">
            <Text className="text-foreground font-bold text-lg mb-3">Free & Low-Cost Legal Help</Text>
            <Text className="text-muted text-sm mb-4">These organizations provide free legal representation or resources to help you fight or reduce charges.</Text>
            {PRO_BONO_RESOURCES.map((res, i) => (
              <TouchableOpacity key={i} onPress={() => openLink(res.url)} className="mb-3 bg-background rounded-lg p-3 border border-border">
                <Text className="text-foreground font-semibold text-sm">{res.title}</Text>
                <Text className="text-muted text-xs mt-1">{res.desc}</Text>
                <View style={{ flexDirection: "row", alignItems: "center", marginTop: 4 }}>
                  <IconSymbol name="arrow.up.right" size={12} color={colors.primary} />
                  <Text className="text-primary text-xs ml-1">Visit</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          <View className="bg-surface rounded-xl p-4">
            <Text className="text-muted text-xs text-center leading-relaxed">
              This information is for educational purposes only. Availability of programs varies by state and county. Always consult with a qualified attorney about your specific case.
            </Text>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
