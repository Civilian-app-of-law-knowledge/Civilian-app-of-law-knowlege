import { ScrollView, Text, View, TouchableOpacity, Linking } from "react-native";
import { useRouter } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useColors } from "@/hooks/use-colors";
import { useState } from "react";

const DA_ROLES = [
  { title: "District Attorney (DA)", desc: "Elected official who leads the prosecution office. Makes policy decisions on charging, plea deals, and diversion programs. Also called State's Attorney or County Attorney in some states." },
  { title: "Assistant District Attorney (ADA)", desc: "The lawyer who actually handles your case in court. They present evidence, negotiate plea deals, and argue at trial." },
  { title: "Victim Advocate", desc: "Works with crime victims to explain the process, provide support, and ensure victims' rights are protected. Can be a resource for domestic violence cases." },
  { title: "Investigators", desc: "DA's office has its own investigators who gather evidence, interview witnesses, and build cases." },
  { title: "Diversion Coordinator", desc: "Manages alternative programs like ARD, PTI, and drug court. Contact them to ask about eligibility for diversion." },
];

const DOMESTIC_VIOLENCE = [
  { title: "National Domestic Violence Hotline", phone: "1-800-799-7233", url: "https://www.thehotline.org/", desc: "24/7 confidential support, safety planning, and resources" },
  { title: "National Sexual Assault Hotline", phone: "1-800-656-4673", url: "https://www.rainn.org/", desc: "24/7 support from trained staff members" },
  { title: "StrongHearts Native Helpline", phone: "1-844-762-8483", url: "https://strongheartshelpline.org/", desc: "For Native Americans and Alaska Natives" },
  { title: "National Child Abuse Hotline", phone: "1-800-422-4453", url: "https://www.childhelp.org/", desc: "24/7 crisis counseling and referrals" },
  { title: "WomensLaw.org", phone: "", url: "https://www.womenslaw.org/", desc: "Legal information for survivors of domestic violence" },
  { title: "Love Is Respect", phone: "1-866-331-9474", url: "https://www.loveisrespect.org/", desc: "Resources for young people in abusive relationships" },
];

const DV_LAWS = [
  { title: "Protection Orders (PFA/TRO)", desc: "Emergency and final protection orders available in all states. Can include no-contact provisions, custody arrangements, and housing protections. Violation is a criminal offense." },
  { title: "Mandatory Arrest Laws", desc: "Many states require police to make an arrest when there's probable cause of domestic violence. Officers determine the 'primary aggressor' — the person most responsible." },
  { title: "No-Drop Prosecution", desc: "In many jurisdictions, the DA can proceed with charges even if the victim doesn't want to press charges. The state is the plaintiff, not the victim." },
  { title: "Strangulation Laws", desc: "Most states now have specific felony strangulation laws. Even without visible injuries, strangulation is often charged as a felony." },
  { title: "Firearms Restrictions", desc: "Federal law (Lautenberg Amendment) prohibits anyone convicted of a misdemeanor domestic violence offense from possessing firearms." },
  { title: "Address Confidentiality Programs", desc: "Most states offer programs that provide a substitute address for DV survivors to keep their real location private." },
];

const NAVIGATING_DA = [
  { step: "1", title: "Know Who's Handling Your Case", desc: "Ask the court clerk or your attorney for the name of the ADA assigned to your case. This is who you (or your lawyer) will negotiate with." },
  { step: "2", title: "Understand the Charging Decision", desc: "The DA decides what charges to file. They can charge more or less than what police recommended. They can also decline to prosecute." },
  { step: "3", title: "Ask About Diversion Programs", desc: "Before accepting a plea deal, ask if you qualify for ARD, PTI, drug court, or other diversion programs that could result in charges being dismissed." },
  { step: "4", title: "Request Discovery", desc: "Your attorney can request all evidence the DA has against you. This includes police reports, witness statements, video, and forensic evidence." },
  { step: "5", title: "Understand Plea Negotiations", desc: "Most cases are resolved through plea bargaining. The DA may offer reduced charges or recommend lighter sentences in exchange for a guilty plea." },
  { step: "6", title: "Know Your Rights at Every Stage", desc: "You have the right to remain silent, the right to an attorney, the right to a speedy trial, and the right to confront witnesses." },
  { step: "7", title: "File Complaints if Necessary", desc: "If a prosecutor engages in misconduct, you can file a complaint with the state bar association or the state attorney general's office." },
];

const FIND_DA_LINKS = [
  { title: "Find Your County DA", url: "https://www.justice.gov/usao/find-your-united-states-attorney", desc: "U.S. Attorney offices (federal)" },
  { title: "National District Attorneys Association", url: "https://ndaa.org/", desc: "Find state and local prosecutors" },
  { title: "State Attorney General Offices", url: "https://www.naag.org/find-my-ag/", desc: "Find your state AG" },
];

export default function ProsecutorInfoScreen() {
  const router = useRouter();
  const colors = useColors();
  const [expandedRole, setExpandedRole] = useState<number | null>(null);
  const [showDVLaws, setShowDVLaws] = useState(false);

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
            <Text className="text-2xl font-bold text-foreground mb-2">Prosecutor's Office Guide</Text>
            <Text className="text-muted text-sm leading-relaxed">
              Understand how the DA's office works, who handles your case, how to navigate the system, and resources for domestic violence situations.
            </Text>
          </View>

          {/* DA Roles */}
          <Text className="text-foreground font-bold text-lg mb-3">Who's Who in the DA's Office</Text>
          {DA_ROLES.map((role, i) => (
            <TouchableOpacity key={i} onPress={() => setExpandedRole(expandedRole === i ? null : i)} className="bg-surface rounded-xl border border-border mb-3 p-4">
              <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                <Text className="text-foreground font-bold text-sm flex-1">{role.title}</Text>
                <IconSymbol name={expandedRole === i ? "chevron.up" : "chevron.down"} size={16} color={colors.muted} />
              </View>
              {expandedRole === i && <Text className="text-muted text-sm mt-2 leading-relaxed">{role.desc}</Text>}
            </TouchableOpacity>
          ))}

          {/* Navigating the DA */}
          <View className="bg-surface rounded-xl border border-border p-4 mb-4 mt-4">
            <Text className="text-foreground font-bold text-lg mb-3">How to Navigate the DA's Office</Text>
            {NAVIGATING_DA.map((step, i) => (
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

          {/* Domestic Violence Section */}
          <View className="bg-error/10 border border-error/30 rounded-xl p-4 mb-4">
            <Text className="text-foreground font-bold text-lg mb-2">Domestic Violence Resources</Text>
            <Text className="text-muted text-sm mb-4">If you or someone you know is experiencing domestic violence, these resources provide immediate help:</Text>
            {DOMESTIC_VIOLENCE.map((res, i) => (
              <TouchableOpacity key={i} onPress={() => openLink(res.url)} className="bg-background rounded-lg p-3 mb-2 border border-border">
                <Text className="text-foreground font-bold text-sm">{res.title}</Text>
                {res.phone ? <Text className="text-primary text-sm font-semibold mt-1">{res.phone}</Text> : null}
                <Text className="text-muted text-xs mt-1">{res.desc}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* DV Laws */}
          <TouchableOpacity onPress={() => setShowDVLaws(!showDVLaws)} className="bg-surface rounded-xl border border-border p-4 mb-4">
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
              <Text className="text-foreground font-bold text-lg">Domestic Violence Laws</Text>
              <IconSymbol name={showDVLaws ? "chevron.up" : "chevron.down"} size={20} color={colors.muted} />
            </View>
            {showDVLaws && DV_LAWS.map((law, i) => (
              <View key={i} className="mt-3 bg-background rounded-lg p-3 border border-border">
                <Text className="text-foreground font-semibold text-sm">{law.title}</Text>
                <Text className="text-muted text-xs mt-1 leading-relaxed">{law.desc}</Text>
              </View>
            ))}
          </TouchableOpacity>

          {/* Find Your DA */}
          <View className="bg-surface rounded-xl border border-border p-4 mb-4">
            <Text className="text-foreground font-bold text-lg mb-3">Find Your Prosecutor</Text>
            {FIND_DA_LINKS.map((link, i) => (
              <TouchableOpacity key={i} onPress={() => openLink(link.url)} style={{ flexDirection: "row", alignItems: "center", marginBottom: 10 }}>
                <IconSymbol name="arrow.up.right" size={14} color={colors.primary} />
                <View style={{ marginLeft: 8 }}>
                  <Text className="text-foreground font-semibold text-sm">{link.title}</Text>
                  <Text className="text-muted text-xs">{link.desc}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          <View className="bg-surface rounded-xl p-4">
            <Text className="text-muted text-xs text-center leading-relaxed">
              If you are in immediate danger, call 911. This information is for educational purposes only and does not constitute legal advice.
            </Text>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
