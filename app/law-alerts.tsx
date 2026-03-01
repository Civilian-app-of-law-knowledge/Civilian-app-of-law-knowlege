import { ScrollView, Text, View, TouchableOpacity, Linking } from "react-native";
import { useRouter } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useColors } from "@/hooks/use-colors";
import { useState } from "react";

const LAW_ALERTS = [
  { id: "1", date: "Feb 2026", category: "Federal", priority: "critical", title: "First Step Act Expansion Proposed", summary: "New bipartisan bill proposes expanding earned time credits and expanding eligibility for compassionate release. Would affect federal inmates currently serving sentences.", link: "https://www.congress.gov/" },
  { id: "2", date: "Feb 2026", category: "Criminal Justice", priority: "critical", title: "Clean Slate Act Progress", summary: "Federal Clean Slate Act continues to gain support. Would automatically seal certain federal criminal records after a waiting period. Multiple states have already passed similar laws.", link: "https://www.congress.gov/" },
  { id: "3", date: "Jan 2026", category: "Benefits", priority: "important", title: "Medicaid Reentry Coverage Expansion", summary: "CMS approves more states to provide Medicaid coverage 30-90 days before release from incarceration. Check if your state has adopted this policy.", link: "https://www.medicaid.gov/" },
  { id: "4", date: "Jan 2026", category: "Employment", priority: "important", title: "Ban the Box Updates", summary: "Additional cities and states adopting fair chance hiring laws. Over 37 states now have some form of Ban the Box legislation for public and/or private employers.", link: "https://www.nelp.org/campaign/ban-the-box-fair-chance-act/" },
  { id: "5", date: "Jan 2026", category: "Voting", priority: "important", title: "Voting Rights Restoration Expansion", summary: "Several states expanding voting rights for people with felony convictions. Some states now allow voting while on probation or parole.", link: "https://www.ncsl.org/elections-and-campaigns/felon-voting-rights" },
  { id: "6", date: "Dec 2025", category: "Sentencing", priority: "critical", title: "Sentencing Reform Updates", summary: "Multiple states reviewing mandatory minimum sentences for non-violent drug offenses. Several states have reduced or eliminated mandatory minimums.", link: "https://www.sentencingproject.org/" },
  { id: "7", date: "Dec 2025", category: "Housing", priority: "important", title: "HUD Fair Housing Guidance", summary: "Updated HUD guidance on criminal records and housing. Blanket bans on applicants with criminal records may violate Fair Housing Act.", link: "https://www.hud.gov/program_offices/fair_housing_equal_opp" },
  { id: "8", date: "Nov 2025", category: "Technology", priority: "informational", title: "Tablet Programs Expanding", summary: "More correctional facilities adopting tablet programs for education, communication, and legal research. Several states now provide tablets at no cost to inmates.", link: "https://www.bop.gov/" },
  { id: "9", date: "Nov 2025", category: "Marijuana", priority: "critical", title: "Marijuana Legalization & Expungement", summary: "Additional states legalizing marijuana and providing automatic expungement for prior marijuana convictions. Check your state's specific provisions.", link: "https://norml.org/" },
  { id: "10", date: "Oct 2025", category: "Reentry", priority: "important", title: "Second Chance Pell Grants Permanent", summary: "Pell Grants for incarcerated students are now permanently restored. Eligible students can receive federal financial aid for college courses while incarcerated.", link: "https://www.ed.gov/laws-and-policy/higher-education-laws-and-regulations/second-chance-pell" },
];

const CATEGORIES = ["All", "Federal", "Criminal Justice", "Benefits", "Employment", "Voting", "Sentencing", "Housing", "Technology", "Marijuana", "Reentry"];

const NEWS_SOURCES = [
  { title: "The Marshall Project", desc: "Nonprofit journalism about criminal justice", url: "https://www.themarshallproject.org/" },
  { title: "The Sentencing Project", desc: "Research and advocacy for sentencing reform", url: "https://www.sentencingproject.org/" },
  { title: "Prison Policy Initiative", desc: "Research on mass incarceration", url: "https://www.prisonpolicy.org/" },
  { title: "Vera Institute of Justice", desc: "Research and policy reform", url: "https://www.vera.org/" },
  { title: "FAMM (Families Against Mandatory Minimums)", desc: "Sentencing reform advocacy", url: "https://famm.org/" },
  { title: "ACLU Criminal Justice", desc: "Civil liberties and criminal justice news", url: "https://www.aclu.org/issues/criminal-law-reform" },
  { title: "Justice Policy Institute", desc: "Research-based policy recommendations", url: "https://justicepolicy.org/" },
  { title: "NCSL Criminal Justice", desc: "State legislation tracking", url: "https://www.ncsl.org/research/civil-and-criminal-justice.aspx" },
];

export default function LawAlertsScreen() {
  const router = useRouter();
  const colors = useColors();
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filtered = selectedCategory === "All" ? LAW_ALERTS : LAW_ALERTS.filter(a => a.category === selectedCategory);
  const openLink = (url: string) => Linking.openURL(url);

  const getPriorityColor = (p: string) => p === "critical" ? colors.error : p === "important" ? colors.warning : colors.primary;
  const getPriorityLabel = (p: string) => p === "critical" ? "CRITICAL" : p === "important" ? "IMPORTANT" : "INFO";

  return (
    <ScreenContainer>
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        <View className="p-4">
          <TouchableOpacity onPress={() => router.back()} style={{ flexDirection: "row", alignItems: "center", marginBottom: 16 }}>
            <IconSymbol name="chevron.left" size={24} color={colors.primary} />
            <Text className="text-primary ml-1 text-base">Back</Text>
          </TouchableOpacity>

          <View className="bg-error/10 rounded-2xl p-5 mb-6">
            <Text className="text-2xl font-bold text-foreground mb-2">Law Change Alerts</Text>
            <Text className="text-muted text-sm leading-relaxed">
              Stay informed about new laws, policy changes, and legal developments that affect you and your loved ones. Knowledge of changing laws is power.
            </Text>
          </View>

          {/* Category Filter */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 16 }}>
            {CATEGORIES.map((cat) => (
              <TouchableOpacity
                key={cat}
                onPress={() => setSelectedCategory(cat)}
                style={{
                  paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20, marginRight: 8,
                  backgroundColor: selectedCategory === cat ? colors.primary : colors.surface,
                  borderWidth: 1, borderColor: selectedCategory === cat ? colors.primary : colors.border,
                }}
              >
                <Text style={{ color: selectedCategory === cat ? "#fff" : colors.muted, fontSize: 13, fontWeight: "600" }}>{cat}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Alerts */}
          {filtered.map((alert) => (
            <TouchableOpacity key={alert.id} onPress={() => openLink(alert.link)} className="bg-surface rounded-xl border border-border mb-3 p-4">
              <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 8 }}>
                <View style={{ backgroundColor: getPriorityColor(alert.priority) + "20", paddingHorizontal: 8, paddingVertical: 2, borderRadius: 4 }}>
                  <Text style={{ color: getPriorityColor(alert.priority), fontSize: 10, fontWeight: "800" }}>{getPriorityLabel(alert.priority)}</Text>
                </View>
                <Text className="text-muted text-xs ml-2">{alert.date}</Text>
                <Text className="text-muted text-xs ml-2">• {alert.category}</Text>
              </View>
              <Text className="text-foreground font-bold text-base mb-2">{alert.title}</Text>
              <Text className="text-muted text-sm leading-relaxed">{alert.summary}</Text>
              <View style={{ flexDirection: "row", alignItems: "center", marginTop: 8 }}>
                <IconSymbol name="arrow.up.right" size={14} color={colors.primary} />
                <Text className="text-primary text-xs ml-1">Read More</Text>
              </View>
            </TouchableOpacity>
          ))}

          {/* News Sources */}
          <View className="bg-surface rounded-xl border border-border p-4 mt-4 mb-4">
            <Text className="text-foreground font-bold text-lg mb-3">Stay Updated — Trusted Sources</Text>
            <Text className="text-muted text-sm mb-4">Follow these organizations for the latest criminal justice news and law changes:</Text>
            {NEWS_SOURCES.map((src, i) => (
              <TouchableOpacity key={i} onPress={() => openLink(src.url)} style={{ flexDirection: "row", alignItems: "center", marginBottom: 10 }}>
                <IconSymbol name="arrow.up.right" size={14} color={colors.primary} />
                <View style={{ marginLeft: 8, flex: 1 }}>
                  <Text className="text-foreground font-semibold text-sm">{src.title}</Text>
                  <Text className="text-muted text-xs">{src.desc}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
