import { ScrollView, Text, View, TouchableOpacity, Linking } from "react-native";
import { useRouter } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useColors } from "@/hooks/use-colors";
import { useState } from "react";

const KNOW_YOUR_RIGHTS = [
  { title: "Right to Remain Silent", desc: "You have the right to remain silent. You do NOT have to answer questions about your immigration status, where you were born, or how you entered the U.S." },
  { title: "Right to an Attorney", desc: "You have the right to speak with a lawyer. Ask for one immediately. You do NOT have to sign anything without a lawyer present." },
  { title: "Right to a Hearing", desc: "In most cases, you have the right to appear before an immigration judge. Do NOT agree to voluntary departure without speaking to a lawyer." },
  { title: "Right to Refuse Consent", desc: "You do NOT have to consent to a search of yourself, your car, or your home. ICE needs a warrant signed by a JUDGE (not just an ICE agent)." },
  { title: "Right to Contact Your Consulate", desc: "If you're a foreign national, you have the right to contact your country's consulate. The jail MUST allow this." },
  { title: "Do NOT Carry False Documents", desc: "Carrying false immigration documents is a federal crime and will make your situation much worse." },
];

const ICE_DETAINERS = [
  { title: "What Is an ICE Detainer?", desc: "A request from ICE to a jail to hold you for up to 48 hours AFTER you would otherwise be released, so ICE can pick you up. It is NOT a warrant." },
  { title: "Detainers Are Voluntary", desc: "ICE detainers are REQUESTS, not orders. Many cities and counties (sanctuary jurisdictions) do not honor them. Your jail's policy matters." },
  { title: "ICE Warrant vs. Judicial Warrant", desc: "An ICE administrative warrant (Form I-200) is signed by an ICE agent. A judicial warrant is signed by a judge. Only a judicial warrant requires compliance." },
  { title: "Your Rights with a Detainer", desc: "You can challenge a detainer through a habeas corpus petition. An immigration attorney can help you fight it." },
  { title: "Bond Hearings", desc: "If detained by ICE, you may be eligible for a bond hearing before an immigration judge. Bond amounts typically range from $1,500 to $25,000+." },
];

const DEPORTATION_DEFENSE = [
  { title: "Cancellation of Removal", desc: "If you've been in the U.S. for 10+ years, have good moral character, and removal would cause exceptional hardship to a U.S. citizen family member." },
  { title: "Asylum", desc: "If you fear persecution in your home country based on race, religion, nationality, political opinion, or membership in a particular social group." },
  { title: "U-Visa (Crime Victims)", desc: "For victims of certain crimes who have suffered abuse and are helpful to law enforcement. Provides temporary legal status and work authorization." },
  { title: "T-Visa (Trafficking Victims)", desc: "For victims of human trafficking. Provides temporary legal status, work authorization, and path to permanent residency." },
  { title: "VAWA (Domestic Violence)", desc: "Abused spouses, children, and parents of U.S. citizens or permanent residents can self-petition for legal status." },
  { title: "Prosecutorial Discretion", desc: "ICE has discretion to close or deprioritize cases. Factors include ties to the community, military service, age, health, and criminal history." },
  { title: "DACA", desc: "Deferred Action for Childhood Arrivals. For people brought to the U.S. as children. Check current status as this program has faced legal challenges." },
];

export default function ImmigrationRightsScreen() {
  const router = useRouter();
  const colors = useColors();
  const [showDetainers, setShowDetainers] = useState(false);
  const [showDefense, setShowDefense] = useState(false);
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
            <Text className="text-2xl font-bold text-foreground mb-2">Immigration & ICE Rights</Text>
            <Text className="text-muted text-sm leading-relaxed">
              Know your rights with ICE, understand detainers, and learn about deportation defense options. Everyone has constitutional rights regardless of immigration status.
            </Text>
          </View>

          <View className="bg-error/10 border border-error/30 rounded-xl p-4 mb-4">
            <Text className="text-foreground font-bold mb-1">If ICE Contacts You</Text>
            <Text className="text-muted text-sm leading-relaxed">
              Stay calm. Do NOT run. Do NOT lie. Say: "I am exercising my right to remain silent. I want to speak with a lawyer." Do NOT sign anything.
            </Text>
          </View>

          {/* Know Your Rights */}
          <Text className="text-foreground font-bold text-lg mb-3">Know Your Rights</Text>
          {KNOW_YOUR_RIGHTS.map((right, i) => (
            <View key={i} className="bg-surface rounded-xl border border-border mb-3 p-4">
              <Text className="text-foreground font-bold text-sm">{right.title}</Text>
              <Text className="text-muted text-xs mt-1 leading-relaxed">{right.desc}</Text>
            </View>
          ))}

          {/* ICE Detainers */}
          <TouchableOpacity onPress={() => setShowDetainers(!showDetainers)} className="bg-surface rounded-xl border border-border p-4 mb-4 mt-2">
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
              <Text className="text-foreground font-bold text-lg">ICE Detainers Explained</Text>
              <IconSymbol name={showDetainers ? "chevron.up" : "chevron.down"} size={16} color={colors.muted} />
            </View>
            {showDetainers && ICE_DETAINERS.map((item, i) => (
              <View key={i} className="mt-3 bg-background rounded-lg p-3 border border-border">
                <Text className="text-foreground font-semibold text-sm">{item.title}</Text>
                <Text className="text-muted text-xs mt-1 leading-relaxed">{item.desc}</Text>
              </View>
            ))}
          </TouchableOpacity>

          {/* Deportation Defense */}
          <TouchableOpacity onPress={() => setShowDefense(!showDefense)} className="bg-surface rounded-xl border border-border p-4 mb-4">
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
              <Text className="text-foreground font-bold text-lg">Deportation Defense Options</Text>
              <IconSymbol name={showDefense ? "chevron.up" : "chevron.down"} size={16} color={colors.muted} />
            </View>
            {showDefense && DEPORTATION_DEFENSE.map((item, i) => (
              <View key={i} className="mt-3 bg-background rounded-lg p-3 border border-border">
                <Text className="text-foreground font-semibold text-sm">{item.title}</Text>
                <Text className="text-muted text-xs mt-1 leading-relaxed">{item.desc}</Text>
              </View>
            ))}
          </TouchableOpacity>

          {/* Resources */}
          <View className="bg-surface rounded-xl border border-border p-4 mb-4">
            <Text className="text-foreground font-bold text-lg mb-3">Resources</Text>
            {[
              { title: "ACLU - Immigrants' Rights", url: "https://www.aclu.org/issues/immigrants-rights" },
              { title: "National Immigration Law Center", url: "https://www.nilc.org/" },
              { title: "American Immigration Lawyers Association", url: "https://www.aila.org/" },
              { title: "United We Dream", url: "https://unitedwedream.org/" },
              { title: "RAICES (Legal Services)", url: "https://www.raicestexas.org/" },
              { title: "Florence Project (Detained Immigrants)", url: "https://firrp.org/" },
              { title: "National Immigrant Justice Center", url: "https://immigrantjustice.org/" },
              { title: "ICE Detainee Locator", url: "https://locator.ice.gov/odls/#/index" },
              { title: "Know Your Rights Card (Printable)", url: "https://www.aclu.org/know-your-rights/immigrants-rights" },
            ].map((res, i) => (
              <TouchableOpacity key={i} onPress={() => openLink(res.url)} style={{ flexDirection: "row", alignItems: "center", marginBottom: 8 }}>
                <IconSymbol name="arrow.up.right" size={14} color={colors.primary} />
                <Text className="text-primary text-sm ml-2 underline">{res.title}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <View className="bg-surface rounded-xl p-4">
            <Text className="text-muted text-xs text-center leading-relaxed">
              Immigration law is extremely complex. This information is for educational purposes only. Always consult with an immigration attorney for advice specific to your situation.
            </Text>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
