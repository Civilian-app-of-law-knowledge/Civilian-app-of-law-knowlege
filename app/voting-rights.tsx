import { ScrollView, Text, View, TouchableOpacity, Linking } from "react-native";
import { useRouter } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useColors } from "@/hooks/use-colors";
import { useState } from "react";

const CATEGORIES = [
  { id: "never", title: "Never Lose Voting Rights", color: "#22C55E", states: ["Maine", "Vermont", "Washington D.C."], desc: "You can vote even while incarcerated." },
  { id: "prison", title: "Restored After Prison Release", color: "#3B82F6", states: ["California", "Colorado", "Connecticut", "Hawaii", "Illinois", "Indiana", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Montana", "Nevada", "New Hampshire", "New Jersey", "New York", "North Dakota", "Ohio", "Oregon", "Pennsylvania", "Rhode Island", "Utah", "Washington"], desc: "Voting rights automatically restored upon release from prison." },
  { id: "parole", title: "Restored After Parole", color: "#F59E0B", states: ["California (2024)", "Connecticut (2023)", "Kentucky (partial)", "Louisiana"], desc: "Must complete parole before voting rights are restored." },
  { id: "probation", title: "Restored After Probation", color: "#F97316", states: ["Alaska", "Arkansas", "Georgia", "Idaho", "Kansas", "Missouri", "New Mexico", "North Carolina", "Oklahoma", "South Carolina", "South Dakota", "Texas", "West Virginia", "Wisconsin"], desc: "Must complete full sentence including probation." },
  { id: "varies", title: "Varies / Petition Required", color: "#EF4444", states: ["Alabama", "Arizona", "Delaware", "Florida", "Iowa", "Kentucky", "Mississippi", "Nebraska", "Tennessee", "Virginia", "Wyoming"], desc: "May require petition, governor's pardon, or varies by offense type." },
];

const HOW_TO_REGISTER = [
  { step: "1", title: "Check Your Eligibility", desc: "Use your state's voter registration website or call your county election office to confirm your voting rights have been restored." },
  { step: "2", title: "Register to Vote", desc: "Register online at Vote.org, at your local DMV, county election office, or through a voter registration drive." },
  { step: "3", title: "Choose Your Method", desc: "You can vote in person on Election Day, vote early in person, or request a mail-in/absentee ballot." },
  { step: "4", title: "Bring Valid ID", desc: "Most states require some form of ID to vote. Check your state's requirements at Vote.org." },
  { step: "5", title: "Know Your Polling Place", desc: "Find your polling place at Vote.org or your county election website." },
];

export default function VotingRightsScreen() {
  const router = useRouter();
  const colors = useColors();
  const [expandedCat, setExpandedCat] = useState<string | null>(null);
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
            <Text className="text-2xl font-bold text-foreground mb-2">Voting Rights Restoration</Text>
            <Text className="text-muted text-sm leading-relaxed">
              Your vote matters. Many people with felony convictions CAN vote — they just don't know it. Find out your state's rules and how to register.
            </Text>
          </View>

          <View className="bg-success/10 border border-success/30 rounded-xl p-4 mb-6">
            <Text className="text-foreground font-bold mb-1">Did You Know?</Text>
            <Text className="text-muted text-sm leading-relaxed">
              Over 4.6 million Americans are denied the right to vote due to felony convictions. But in most states, your voting rights CAN be restored. Over 19 million people with felony records ARE eligible to vote right now.
            </Text>
          </View>

          {/* State Categories */}
          {CATEGORIES.map((cat) => (
            <View key={cat.id} className="bg-surface rounded-xl border border-border mb-3 overflow-hidden">
              <TouchableOpacity onPress={() => setExpandedCat(expandedCat === cat.id ? null : cat.id)} style={{ padding: 16 }}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <View style={{ width: 12, height: 12, borderRadius: 6, backgroundColor: cat.color, marginRight: 10 }} />
                  <View style={{ flex: 1 }}>
                    <Text className="text-foreground font-bold text-sm">{cat.title}</Text>
                    <Text className="text-muted text-xs mt-1">{cat.states.length} states</Text>
                  </View>
                  <IconSymbol name={expandedCat === cat.id ? "chevron.up" : "chevron.down"} size={16} color={colors.muted} />
                </View>
              </TouchableOpacity>
              {expandedCat === cat.id && (
                <View className="px-4 pb-4 border-t border-border pt-3">
                  <Text className="text-muted text-sm mb-3">{cat.desc}</Text>
                  <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                    {cat.states.map((state, i) => (
                      <View key={i} style={{ backgroundColor: cat.color + "20", paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12, margin: 2 }}>
                        <Text style={{ color: cat.color, fontSize: 12, fontWeight: "600" }}>{state}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              )}
            </View>
          ))}

          {/* How to Register */}
          <View className="bg-surface rounded-xl border border-border p-4 mb-4 mt-4">
            <Text className="text-foreground font-bold text-lg mb-3">How to Register to Vote</Text>
            {HOW_TO_REGISTER.map((step, i) => (
              <View key={i} className="mb-3">
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <View className="w-7 h-7 rounded-full bg-primary items-center justify-center mr-3">
                    <Text style={{ color: "#fff", fontSize: 12, fontWeight: "800" }}>{step.step}</Text>
                  </View>
                  <Text className="text-foreground font-semibold text-sm flex-1">{step.title}</Text>
                </View>
                <Text className="text-muted text-sm mt-1 ml-10 leading-relaxed">{step.desc}</Text>
              </View>
            ))}
          </View>

          {/* Resources */}
          <View className="bg-surface rounded-xl border border-border p-4 mb-4">
            <Text className="text-foreground font-bold text-lg mb-3">Resources</Text>
            {[
              { title: "Vote.org - Register to Vote", url: "https://www.vote.org/register-to-vote/" },
              { title: "Vote.org - Check Registration Status", url: "https://www.vote.org/am-i-registered-to-vote/" },
              { title: "NCSL - Felon Voting Rights by State", url: "https://www.ncsl.org/elections-and-campaigns/felon-voting-rights" },
              { title: "Sentencing Project - Voting Rights", url: "https://www.sentencingproject.org/policy-brief/felony-disenfranchisement-in-the-united-states/" },
              { title: "Campaign Legal Center", url: "https://campaignlegal.org/issues/voting-rights-restoration" },
              { title: "ACLU - Voting Rights", url: "https://www.aclu.org/issues/voting-rights" },
            ].map((res, i) => (
              <TouchableOpacity key={i} onPress={() => openLink(res.url)} style={{ flexDirection: "row", alignItems: "center", marginBottom: 8 }}>
                <IconSymbol name="arrow.up.right" size={14} color={colors.primary} />
                <Text className="text-primary text-sm ml-2 underline">{res.title}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <View className="bg-surface rounded-xl p-4">
            <Text className="text-muted text-xs text-center leading-relaxed">
              Voting laws change frequently. Always verify your eligibility with your state election office before attempting to vote.
            </Text>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
