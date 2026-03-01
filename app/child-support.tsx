import { ScrollView, Text, View, TouchableOpacity, Linking } from "react-native";
import { useRouter } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useColors } from "@/hooks/use-colors";
import { useState } from "react";

const KEY_FACTS = [
  { title: "Child Support Doesn't Stop Automatically", desc: "Incarceration does NOT automatically pause or reduce your child support obligation. Payments continue to accrue, and unpaid amounts become arrears (back-owed debt)." },
  { title: "You Can Request a Modification", desc: "You have the RIGHT to petition the court for a modification of your child support order based on changed circumstances (incarceration = loss of income)." },
  { title: "Turner v. Rogers (2011)", desc: "The Supreme Court ruled that courts must consider a person's ability to pay before jailing them for failure to pay child support. You cannot be jailed for being too poor to pay." },
  { title: "Arrears Can Be Devastating", desc: "If you don't modify your order, arrears can accumulate to tens of thousands of dollars. Interest may be added. Your driver's license, passport, and tax refunds can be seized." },
  { title: "Federal Law Protects You", desc: "The Bradley Amendment (42 U.S.C. § 666) prevents retroactive modification of child support arrears. This means you MUST file for modification BEFORE arrears accumulate." },
];

const MODIFICATION_STEPS = [
  { step: "1", title: "File a Motion IMMEDIATELY", desc: "As soon as you're incarcerated, file a motion to modify child support with the family court that issued your order. Don't wait — arrears accumulate from day one." },
  { step: "2", title: "Request Court Forms", desc: "Ask the jail law library for modification forms, or have a family member download them from your county court website. Many courts have self-help forms." },
  { step: "3", title: "Document Your Situation", desc: "Include proof of incarceration (commitment order), your current income ($0 or minimal), expected release date, and any assets." },
  { step: "4", title: "Serve the Other Parent", desc: "The other parent must be notified of your modification request. The court clerk can help with service of process." },
  { step: "5", title: "Attend the Hearing", desc: "Request to appear by phone or video if you can't be transported. Many courts allow remote appearances for incarcerated individuals." },
  { step: "6", title: "Request Retroactive Modification", desc: "Ask the court to make the modification effective from the date you filed the motion, not the date of the hearing." },
];

const AFTER_RELEASE = [
  { title: "Update Your Order Again", desc: "Once you're employed, you may need to update your child support order to reflect your new income. Don't ignore this — the court may increase or decrease the amount." },
  { title: "Set Up a Payment Plan for Arrears", desc: "Contact your state child support agency to arrange a payment plan for any accumulated arrears. Most agencies will work with you." },
  { title: "Request an Arrears Compromise", desc: "Some states allow you to negotiate a reduced amount for arrears owed to the state (not the custodial parent). Ask about compromise programs." },
  { title: "Keep Records of All Payments", desc: "Always pay through the state child support agency (not directly to the other parent) so payments are documented. Keep receipts." },
  { title: "Maintain Contact with Your Children", desc: "Child support and visitation are separate legal issues. You have the right to see your children even if you owe child support." },
];

const STATE_RESOURCES = [
  { title: "Federal Office of Child Support Services", url: "https://www.acf.hhs.gov/css", desc: "Federal agency overseeing child support programs" },
  { title: "Find Your State Child Support Agency", url: "https://www.acf.hhs.gov/css/contact-information/state-and-tribal-child-support-agency-contacts", desc: "Contact info for all 50 states" },
  { title: "National Conference of State Legislatures", url: "https://www.ncsl.org/human-services/child-support-and-incarceration", desc: "State-by-state incarceration policies" },
  { title: "Legal Aid - Child Support", url: "https://www.lawhelp.org/", desc: "Find free legal help for child support issues" },
  { title: "Self-Help Court Forms", url: "https://www.courts.ca.gov/selfhelp-childSupport.htm", desc: "Example: California self-help forms (search your state)" },
];

export default function ChildSupportScreen() {
  const router = useRouter();
  const colors = useColors();
  const [showAfterRelease, setShowAfterRelease] = useState(false);
  const openLink = (url: string) => Linking.openURL(url);

  return (
    <ScreenContainer>
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        <View className="p-4">
          <TouchableOpacity onPress={() => router.back()} style={{ flexDirection: "row", alignItems: "center", marginBottom: 16 }}>
            <IconSymbol name="chevron.left" size={24} color={colors.primary} />
            <Text className="text-primary ml-1 text-base">Back</Text>
          </TouchableOpacity>

          <View className="bg-warning/10 rounded-2xl p-5 mb-6">
            <Text className="text-2xl font-bold text-foreground mb-2">Child Support & Incarceration</Text>
            <Text className="text-muted text-sm leading-relaxed">
              How to modify child support during incarceration, avoid devastating arrears, and protect your rights as a parent.
            </Text>
          </View>

          {/* Critical Warning */}
          <View className="bg-error/10 border border-error/30 rounded-xl p-4 mb-4">
            <Text className="text-foreground font-bold mb-1">Act Immediately</Text>
            <Text className="text-muted text-sm leading-relaxed">
              File for modification as SOON as you're incarcerated. Every day you wait, arrears accumulate. The court cannot go back and erase arrears that built up before you filed.
            </Text>
          </View>

          {/* Key Facts */}
          <Text className="text-foreground font-bold text-lg mb-3">Key Facts You Must Know</Text>
          {KEY_FACTS.map((fact, i) => (
            <View key={i} className="bg-surface rounded-xl border border-border mb-3 p-4">
              <Text className="text-foreground font-bold text-sm">{fact.title}</Text>
              <Text className="text-muted text-xs mt-1 leading-relaxed">{fact.desc}</Text>
            </View>
          ))}

          {/* Modification Steps */}
          <View className="bg-surface rounded-xl border border-border p-4 mb-4 mt-4">
            <Text className="text-foreground font-bold text-lg mb-3">How to Modify Your Order</Text>
            {MODIFICATION_STEPS.map((step, i) => (
              <View key={i} className="mb-4">
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

          {/* After Release */}
          <TouchableOpacity onPress={() => setShowAfterRelease(!showAfterRelease)} className="bg-surface rounded-xl border border-border p-4 mb-4">
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
              <Text className="text-foreground font-bold text-lg">After Release</Text>
              <IconSymbol name={showAfterRelease ? "chevron.up" : "chevron.down"} size={16} color={colors.muted} />
            </View>
            {showAfterRelease && AFTER_RELEASE.map((item, i) => (
              <View key={i} className="mt-3 bg-background rounded-lg p-3 border border-border">
                <Text className="text-foreground font-semibold text-sm">{item.title}</Text>
                <Text className="text-muted text-xs mt-1 leading-relaxed">{item.desc}</Text>
              </View>
            ))}
          </TouchableOpacity>

          {/* Resources */}
          <View className="bg-surface rounded-xl border border-border p-4 mb-4">
            <Text className="text-foreground font-bold text-lg mb-3">Resources</Text>
            {STATE_RESOURCES.map((res, i) => (
              <TouchableOpacity key={i} onPress={() => openLink(res.url)} style={{ flexDirection: "row", alignItems: "center", marginBottom: 10 }}>
                <IconSymbol name="arrow.up.right" size={14} color={colors.primary} />
                <View style={{ marginLeft: 8 }}>
                  <Text className="text-foreground font-semibold text-sm">{res.title}</Text>
                  <Text className="text-muted text-xs">{res.desc}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          <View className="bg-surface rounded-xl p-4">
            <Text className="text-muted text-xs text-center leading-relaxed">
              Child support laws vary by state. This is general guidance — consult a family law attorney for advice specific to your situation.
            </Text>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
