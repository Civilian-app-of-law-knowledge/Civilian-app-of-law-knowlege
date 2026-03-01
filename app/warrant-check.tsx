import { ScrollView, Text, View, TouchableOpacity, Linking } from "react-native";
import { useRouter } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useColors } from "@/hooks/use-colors";

const WARRANT_TYPES = [
  { title: "Arrest Warrant", desc: "Issued by a judge when there's probable cause you committed a crime. Police can arrest you anywhere — home, work, traffic stop." },
  { title: "Bench Warrant", desc: "Issued when you fail to appear in court (FTA) or violate a court order. Most common type of outstanding warrant." },
  { title: "Search Warrant", desc: "Authorizes police to search a specific location for evidence. Must describe the place and items to be searched." },
  { title: "Capias Warrant", desc: "Similar to a bench warrant. Issued for failure to comply with court orders, often related to unpaid fines or probation violations." },
];

const HOW_TO_CHECK = [
  { title: "Online Court Records", desc: "Many counties have online docket search systems. Search by your name to see if there are any active warrants or pending cases.", url: "https://www.uscourts.gov/court-records" },
  { title: "State Court Websites", desc: "Most state court systems have online portals where you can search for warrants and case information.", url: "" },
  { title: "Local Sheriff's Office", desc: "Call the non-emergency number of your county sheriff's office and ask if there are any active warrants in your name.", url: "" },
  { title: "VINE (Victim Information & Notification)", desc: "Originally for victim notification, VINE also allows warrant searches in many jurisdictions.", url: "https://www.vinelink.com/" },
  { title: "Hire an Attorney", desc: "The SAFEST way to check. An attorney can check for warrants confidentially and advise you on how to handle them without risk of immediate arrest.", url: "" },
];

const HANDLING_WARRANTS = [
  { step: "1", title: "Don't Panic", desc: "Having a warrant doesn't mean police are actively looking for you. Many warrants sit for years. But they won't go away on their own." },
  { step: "2", title: "Hire an Attorney", desc: "A lawyer can often arrange for you to turn yourself in on favorable terms — sometimes without spending any time in jail." },
  { step: "3", title: "Arrange Bail in Advance", desc: "Your attorney may be able to arrange bail or a bond before you turn yourself in, so you can be released quickly." },
  { step: "4", title: "Turn Yourself In", desc: "Voluntarily surrendering looks much better to the judge than being arrested. It shows responsibility and good faith." },
  { step: "5", title: "Appear at Your Hearing", desc: "The judge will address the underlying issue (missed court date, unpaid fines, etc.). Having a plan shows the court you're serious." },
  { step: "6", title: "Request a Recall", desc: "Your attorney can file a motion to recall (cancel) the warrant. If granted, the warrant is removed from the system." },
];

export default function WarrantCheckScreen() {
  const router = useRouter();
  const colors = useColors();
  const openLink = (url: string) => { if (url) Linking.openURL(url); };

  return (
    <ScreenContainer>
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        <View className="p-4">
          <TouchableOpacity onPress={() => router.back()} style={{ flexDirection: "row", alignItems: "center", marginBottom: 16 }}>
            <IconSymbol name="chevron.left" size={24} color={colors.primary} />
            <Text className="text-primary ml-1 text-base">Back</Text>
          </TouchableOpacity>

          <View className="bg-warning/10 rounded-2xl p-5 mb-6">
            <Text className="text-2xl font-bold text-foreground mb-2">Warrant Check Resources</Text>
            <Text className="text-muted text-sm leading-relaxed">
              How to check for outstanding warrants, what types exist, and how to handle them safely and legally.
            </Text>
          </View>

          <View className="bg-error/10 border border-error/30 rounded-xl p-4 mb-4">
            <Text className="text-foreground font-bold mb-1">Important Warning</Text>
            <Text className="text-muted text-sm leading-relaxed">
              Warrants do NOT expire. They stay active until resolved. If you have an outstanding warrant, you can be arrested at any time — during a traffic stop, at a job, or even at your home. The best approach is to address it proactively with an attorney.
            </Text>
          </View>

          <Text className="text-foreground font-bold text-lg mb-3">Types of Warrants</Text>
          {WARRANT_TYPES.map((w, i) => (
            <View key={i} className="bg-surface rounded-xl border border-border mb-3 p-4">
              <Text className="text-foreground font-bold text-sm">{w.title}</Text>
              <Text className="text-muted text-xs mt-1 leading-relaxed">{w.desc}</Text>
            </View>
          ))}

          <Text className="text-foreground font-bold text-lg mb-3 mt-4">How to Check for Warrants</Text>
          {HOW_TO_CHECK.map((item, i) => (
            <TouchableOpacity key={i} onPress={() => item.url && openLink(item.url)} className="bg-surface rounded-xl border border-border mb-3 p-4">
              <Text className="text-foreground font-bold text-sm">{item.title}</Text>
              <Text className="text-muted text-xs mt-1 leading-relaxed">{item.desc}</Text>
              {item.url ? (
                <View style={{ flexDirection: "row", alignItems: "center", marginTop: 6 }}>
                  <IconSymbol name="arrow.up.right" size={12} color={colors.primary} />
                  <Text className="text-primary text-xs ml-1">Visit</Text>
                </View>
              ) : null}
            </TouchableOpacity>
          ))}

          <Text className="text-foreground font-bold text-lg mb-3 mt-4">How to Handle an Outstanding Warrant</Text>
          {HANDLING_WARRANTS.map((step, i) => (
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

          <View className="bg-surface rounded-xl p-4 mt-4">
            <Text className="text-muted text-xs text-center leading-relaxed">
              This is for informational purposes only. If you believe you have an outstanding warrant, consult an attorney before taking any action.
            </Text>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
