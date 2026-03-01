import { ScrollView, Text, View, TouchableOpacity, Linking } from "react-native";
import { useRouter } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useColors } from "@/hooks/use-colors";
import { useState } from "react";

const VA_PROGRAMS = [
  { title: "Health Care for Reentry Veterans (HCRV)", desc: "VA outreach program specifically for veterans leaving incarceration. Provides health care enrollment, mental health services, substance abuse treatment, housing assistance, and employment help. Contact your local VA medical center.", url: "https://www.va.gov/homeless/reentry.asp" },
  { title: "Veterans Justice Outreach (VJO)", desc: "VJO specialists work in courts and jails to connect justice-involved veterans with VA services. They can advocate for treatment alternatives to incarceration.", url: "https://www.va.gov/homeless/vjo.asp" },
  { title: "Veterans Treatment Courts", desc: "Specialized courts for veterans that focus on treatment and rehabilitation rather than punishment. Available in many counties. Your VJO specialist can help you get into one.", url: "https://justiceforvets.org/what-are-veterans-treatment-courts/" },
  { title: "Compensated Work Therapy (CWT)", desc: "VA program providing job training, supported employment, and transitional work for veterans with disabilities or barriers to employment.", url: "https://www.va.gov/health/cwt/" },
  { title: "HUD-VASH (Housing)", desc: "Housing vouchers specifically for homeless veterans. Combines HUD housing assistance with VA case management and clinical services.", url: "https://www.va.gov/homeless/hud-vash.asp" },
  { title: "Supportive Services for Veteran Families (SSVF)", desc: "Provides case management, housing assistance, and other support to prevent veteran families from becoming homeless.", url: "https://www.va.gov/homeless/ssvf/" },
];

const BENEFITS_DURING = [
  { title: "VA Disability Compensation", desc: "Reduced to 10% rating level after 60 days of incarceration for a felony. Restored to full amount upon release. File for restoration BEFORE release." },
  { title: "VA Pension", desc: "Suspended after 60 days of incarceration. Can be restored upon release. Dependents may be eligible to receive apportioned benefits." },
  { title: "VA Health Care", desc: "Enrollment is NOT affected by incarceration. You can receive VA health care upon release without re-enrolling." },
  { title: "GI Bill Education Benefits", desc: "Cannot use while incarcerated in a federal or state facility. Benefits are preserved and available upon release." },
  { title: "Dependents' Benefits", desc: "Your dependents may be eligible to receive a portion of your VA benefits while you're incarcerated. They must apply for apportionment." },
];

const REENTRY_CHECKLIST = [
  "Contact VA HCRV program 3-6 months before release",
  "Request restoration of full VA disability benefits",
  "Enroll in VA health care (or confirm enrollment is active)",
  "Apply for HUD-VASH housing voucher",
  "Contact Veterans Justice Outreach specialist",
  "Apply for VA Compensated Work Therapy",
  "Request copies of your DD-214 (military records)",
  "Check eligibility for state veteran benefits",
  "Contact your county Veterans Service Officer",
  "Apply for VA vocational rehabilitation if service-connected disability",
];

export default function VeteransBenefitsScreen() {
  const router = useRouter();
  const colors = useColors();
  const [showDuring, setShowDuring] = useState(false);
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
            <Text className="text-2xl font-bold text-foreground mb-2">Veterans Benefits & Resources</Text>
            <Text className="text-muted text-sm leading-relaxed">
              VA programs specifically for justice-involved veterans — health care, housing, employment, treatment courts, and benefit restoration after incarceration.
            </Text>
          </View>

          <View className="bg-success/10 border border-success/30 rounded-xl p-4 mb-4">
            <Text className="text-foreground font-bold mb-1">You Served Your Country</Text>
            <Text className="text-muted text-sm leading-relaxed">
              The VA has programs specifically designed to help veterans who are incarcerated or recently released. You earned these benefits through your service — use them.
            </Text>
          </View>

          {/* VA Programs */}
          <Text className="text-foreground font-bold text-lg mb-3">VA Programs for Justice-Involved Veterans</Text>
          {VA_PROGRAMS.map((prog, i) => (
            <TouchableOpacity key={i} onPress={() => openLink(prog.url)} className="bg-surface rounded-xl border border-border mb-3 p-4">
              <Text className="text-foreground font-bold text-sm">{prog.title}</Text>
              <Text className="text-muted text-xs mt-1 leading-relaxed">{prog.desc}</Text>
              <View style={{ flexDirection: "row", alignItems: "center", marginTop: 6 }}>
                <IconSymbol name="arrow.up.right" size={12} color={colors.primary} />
                <Text className="text-primary text-xs ml-1">Learn More</Text>
              </View>
            </TouchableOpacity>
          ))}

          {/* Benefits During Incarceration */}
          <TouchableOpacity onPress={() => setShowDuring(!showDuring)} className="bg-surface rounded-xl border border-border p-4 mb-4">
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
              <Text className="text-foreground font-bold text-lg">Benefits During Incarceration</Text>
              <IconSymbol name={showDuring ? "chevron.up" : "chevron.down"} size={16} color={colors.muted} />
            </View>
            {showDuring && BENEFITS_DURING.map((item, i) => (
              <View key={i} className="mt-3 bg-background rounded-lg p-3 border border-border">
                <Text className="text-foreground font-semibold text-sm">{item.title}</Text>
                <Text className="text-muted text-xs mt-1 leading-relaxed">{item.desc}</Text>
              </View>
            ))}
          </TouchableOpacity>

          {/* Reentry Checklist */}
          <View className="bg-surface rounded-xl border border-border p-4 mb-4">
            <Text className="text-foreground font-bold text-lg mb-3">Veteran Reentry Checklist</Text>
            {REENTRY_CHECKLIST.map((item, i) => (
              <View key={i} style={{ flexDirection: "row", marginBottom: 8 }}>
                <Text className="text-primary mr-2">□</Text>
                <Text className="text-muted text-sm flex-1">{item}</Text>
              </View>
            ))}
          </View>

          {/* Key Contacts */}
          <View className="bg-surface rounded-xl border border-border p-4 mb-4">
            <Text className="text-foreground font-bold text-lg mb-3">Key Contacts</Text>
            {[
              { title: "Veterans Crisis Line", phone: "988 (press 1)", url: "https://www.veteranscrisisline.net/", desc: "24/7 crisis support" },
              { title: "VA Benefits Hotline", phone: "1-800-827-1000", url: "https://www.va.gov/", desc: "General benefits questions" },
              { title: "VA Health Care", phone: "1-877-222-8387", url: "https://www.va.gov/health-care/", desc: "Health care enrollment" },
              { title: "National Veterans Legal Services", phone: "", url: "https://www.nvlsp.org/", desc: "Free legal help for veterans" },
              { title: "Swords to Plowshares", phone: "", url: "https://www.swords-to-plowshares.org/", desc: "Legal aid for veterans" },
              { title: "Find Your Local VA", phone: "", url: "https://www.va.gov/find-locations/", desc: "VA facilities near you" },
            ].map((contact, i) => (
              <TouchableOpacity key={i} onPress={() => openLink(contact.url)} className="bg-background rounded-lg p-3 mb-2 border border-border">
                <Text className="text-foreground font-bold text-sm">{contact.title}</Text>
                {contact.phone ? <Text className="text-primary text-sm font-semibold">{contact.phone}</Text> : null}
                <Text className="text-muted text-xs mt-1">{contact.desc}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <View className="bg-surface rounded-xl p-4">
            <Text className="text-muted text-xs text-center leading-relaxed">
              VA benefits and eligibility vary. Contact your local VA medical center or Veterans Service Officer for personalized assistance.
            </Text>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
