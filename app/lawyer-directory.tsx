import { ScrollView, Text, View, TouchableOpacity, Linking, TextInput } from "react-native";
import { useRouter } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useColors } from "@/hooks/use-colors";
import { useState } from "react";

const SPECIALTIES = ["All", "Criminal Defense", "DUI/DWI", "Drug Offenses", "Domestic Violence", "Federal", "Juvenile", "Expungement", "Immigration", "Family Law", "Civil Rights"];

const LAWYER_SEARCH_SITES = [
  { title: "Avvo", desc: "Lawyer ratings, reviews, and free Q&A", url: "https://www.avvo.com/", rating: "Avvo Rating 1-10 scale" },
  { title: "Martindale-Hubbell", desc: "Peer-reviewed lawyer ratings since 1868", url: "https://www.martindale.com/", rating: "AV Preeminent, BV Distinguished" },
  { title: "Super Lawyers", desc: "Top-rated attorneys selected by peers", url: "https://www.superlawyers.com/", rating: "Peer nomination + evaluation" },
  { title: "FindLaw", desc: "Comprehensive attorney directory by Thomson Reuters", url: "https://lawyers.findlaw.com/", rating: "Client reviews" },
  { title: "Justia", desc: "Free legal information and lawyer directory", url: "https://www.justia.com/lawyers/", rating: "Client reviews + peer endorsements" },
  { title: "NOLO", desc: "Legal guides and attorney directory", url: "https://www.nolo.com/lawyers/", rating: "Client reviews" },
  { title: "Lawyers.com", desc: "Attorney search by practice area and location", url: "https://www.lawyers.com/", rating: "Client reviews" },
  { title: "State Bar Associations", desc: "Official lawyer lookup through your state bar", url: "https://www.americanbar.org/groups/bar_services/resources/state_local_bar_associations/", rating: "Verified license status" },
];

const WHAT_TO_LOOK_FOR = [
  { title: "Experience with Your Charge Type", desc: "Ask how many cases like yours they've handled and what the outcomes were" },
  { title: "Trial Experience", desc: "Some lawyers only do plea deals. Make sure they're willing and able to go to trial if needed" },
  { title: "Local Knowledge", desc: "A lawyer who knows the local judges, prosecutors, and court system has a huge advantage" },
  { title: "Communication Style", desc: "Do they return calls? Explain things clearly? You need someone who keeps you informed" },
  { title: "Fee Structure", desc: "Flat fee vs hourly? What's included? Get it in writing before you hire" },
  { title: "Client Reviews", desc: "Check Avvo, Google, and Martindale for real client reviews and ratings" },
  { title: "Bar Standing", desc: "Verify they're licensed and in good standing with your state bar association" },
  { title: "Caseload", desc: "If they have too many cases, yours won't get the attention it deserves" },
];

const PD_VS_PRIVATE = [
  { aspect: "Cost", pd: "Free (court-appointed)", private: "$2,000 - $50,000+ depending on case" },
  { aspect: "Caseload", pd: "Very high (often 100+ cases)", private: "Lower, more time per case" },
  { aspect: "Experience", pd: "Often very experienced in criminal law", private: "Varies — check their track record" },
  { aspect: "Choice", pd: "You don't choose who you get", private: "You pick your attorney" },
  { aspect: "Resources", pd: "Limited budget for investigators/experts", private: "Can hire experts and investigators" },
  { aspect: "Availability", pd: "May be hard to reach", private: "Generally more accessible" },
  { aspect: "Local Knowledge", pd: "Excellent — they're in court daily", private: "Varies by attorney" },
  { aspect: "Quality", pd: "Many are excellent but overworked", private: "Varies widely — research carefully" },
];

const FREE_LEGAL_RESOURCES = [
  { title: "Legal Aid Society", url: "https://www.lsc.gov/about-lsc/what-legal-aid/get-legal-help", desc: "Free legal help for qualifying individuals" },
  { title: "NACDL Find a Lawyer", url: "https://www.nacdl.org/Find-an-Attorney/", desc: "National Association of Criminal Defense Lawyers" },
  { title: "Federal Defender Services", url: "https://www.fd.org/", desc: "Free representation in federal cases" },
  { title: "LawHelp.org", url: "https://www.lawhelp.org/", desc: "Find free legal help in your state" },
  { title: "ABA Free Legal Answers", url: "https://abafreelegalanswers.org/", desc: "Free legal Q&A from volunteer attorneys" },
];

export default function LawyerDirectoryScreen() {
  const router = useRouter();
  const colors = useColors();
  const [selectedSpecialty, setSelectedSpecialty] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [showComparison, setShowComparison] = useState(false);

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
            <Text className="text-2xl font-bold text-foreground mb-2">Find a Lawyer</Text>
            <Text className="text-muted text-sm leading-relaxed">
              Find the right attorney for your case. Search by specialty, read reviews, compare ratings, and know what to look for before hiring.
            </Text>
          </View>

          {/* Search Sites */}
          <Text className="text-foreground font-bold text-lg mb-3">Search for Attorneys</Text>
          <Text className="text-muted text-sm mb-4">Use these trusted directories to find and compare lawyers in your area:</Text>

          {LAWYER_SEARCH_SITES.map((site, i) => (
            <TouchableOpacity key={i} onPress={() => openLink(site.url)} className="bg-surface rounded-xl border border-border mb-3 p-4">
              <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                <Text className="text-foreground font-bold text-base">{site.title}</Text>
                <View style={{ backgroundColor: colors.primary + "20", paddingHorizontal: 8, paddingVertical: 2, borderRadius: 4 }}>
                  <Text style={{ color: colors.primary, fontSize: 10, fontWeight: "700" }}>{site.rating}</Text>
                </View>
              </View>
              <Text className="text-muted text-sm mt-1">{site.desc}</Text>
              <View style={{ flexDirection: "row", alignItems: "center", marginTop: 8 }}>
                <IconSymbol name="arrow.up.right" size={14} color={colors.primary} />
                <Text className="text-primary text-xs ml-1">Search Attorneys</Text>
              </View>
            </TouchableOpacity>
          ))}

          {/* What to Look For */}
          <View className="bg-surface rounded-xl border border-border p-4 mb-4 mt-4">
            <Text className="text-foreground font-bold text-lg mb-3">What to Look For in a Lawyer</Text>
            {WHAT_TO_LOOK_FOR.map((item, i) => (
              <View key={i} className="mb-3 bg-background rounded-lg p-3 border border-border">
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text className="text-primary font-bold mr-2">{i + 1}.</Text>
                  <Text className="text-foreground font-semibold text-sm">{item.title}</Text>
                </View>
                <Text className="text-muted text-xs mt-1 ml-5">{item.desc}</Text>
              </View>
            ))}
          </View>

          {/* PD vs Private Comparison */}
          <TouchableOpacity
            onPress={() => setShowComparison(!showComparison)}
            className="bg-surface rounded-xl border border-border p-4 mb-4"
          >
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
              <Text className="text-foreground font-bold text-lg">Public Defender vs Private Attorney</Text>
              <IconSymbol name={showComparison ? "chevron.up" : "chevron.down"} size={20} color={colors.muted} />
            </View>
            {showComparison && (
              <View style={{ marginTop: 12 }}>
                {PD_VS_PRIVATE.map((row, i) => (
                  <View key={i} className="mb-3 border-b border-border pb-3">
                    <Text className="text-primary font-bold text-sm mb-1">{row.aspect}</Text>
                    <View style={{ flexDirection: "row" }}>
                      <View style={{ flex: 1, marginRight: 8 }}>
                        <Text className="text-muted text-xs font-semibold">Public Defender:</Text>
                        <Text className="text-muted text-xs">{row.pd}</Text>
                      </View>
                      <View style={{ flex: 1 }}>
                        <Text className="text-muted text-xs font-semibold">Private Attorney:</Text>
                        <Text className="text-muted text-xs">{row.private}</Text>
                      </View>
                    </View>
                  </View>
                ))}
              </View>
            )}
          </TouchableOpacity>

          {/* Questions to Ask */}
          <View className="bg-warning/10 border border-warning/30 rounded-xl p-4 mb-4">
            <Text className="text-foreground font-bold mb-2">Questions to Ask Before Hiring</Text>
            {[
              "How many cases like mine have you handled?",
              "What were the outcomes?",
              "Will you personally handle my case or pass it to an associate?",
              "What is your fee structure? Any hidden costs?",
              "How often will you update me on my case?",
              "Are you willing to go to trial if needed?",
              "What's your honest assessment of my case?",
              "Can I speak to former clients as references?",
            ].map((q, i) => (
              <View key={i} style={{ flexDirection: "row", marginBottom: 4 }}>
                <Text className="text-warning mr-2">?</Text>
                <Text className="text-muted text-sm flex-1">{q}</Text>
              </View>
            ))}
          </View>

          {/* Free Legal Help */}
          <View className="bg-success/10 border border-success/30 rounded-xl p-4 mb-4">
            <Text className="text-foreground font-bold mb-3">Free Legal Help</Text>
            {FREE_LEGAL_RESOURCES.map((res, i) => (
              <TouchableOpacity key={i} onPress={() => openLink(res.url)} style={{ flexDirection: "row", alignItems: "center", marginBottom: 8 }}>
                <IconSymbol name="arrow.up.right" size={14} color={colors.success} />
                <View style={{ marginLeft: 8 }}>
                  <Text className="text-foreground text-sm font-semibold">{res.title}</Text>
                  <Text className="text-muted text-xs">{res.desc}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          <View className="bg-surface rounded-xl p-4">
            <Text className="text-muted text-xs text-center leading-relaxed">
              This directory is for informational purposes only. We do not endorse any specific attorney. Always verify credentials with your state bar association.
            </Text>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
