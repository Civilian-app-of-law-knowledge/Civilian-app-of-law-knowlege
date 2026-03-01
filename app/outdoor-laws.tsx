import { ScrollView, Text, View, TouchableOpacity, Linking } from "react-native";
import { useRouter } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useColors } from "@/hooks/use-colors";
import { useState } from "react";

const HUNTING_SEASONS = [
  { state: "Pennsylvania", seasons: "Deer (archery Sep-Jan, rifle Nov-Dec), Turkey (spring Apr-May, fall Oct-Nov), Bear (Nov), Small game (Oct-Feb)", licenseUrl: "https://www.pgc.pa.gov/HuntTrap/Law/Pages/HuntTrapSeasons.aspx", dnrUrl: "https://www.pgc.pa.gov/" },
  { state: "Texas", seasons: "Deer (Nov-Jan), Turkey (spring Mar-May, fall Nov-Jan), Dove (Sep-Jan), Quail (Oct-Feb)", licenseUrl: "https://tpwd.texas.gov/regulations/outdoor-annual/", dnrUrl: "https://tpwd.texas.gov/" },
  { state: "Michigan", seasons: "Deer (archery Oct-Nov, rifle Nov, muzzleloader Dec), Turkey (spring Apr-Jun, fall Sep-Nov), Bear (Sep-Oct)", licenseUrl: "https://www.michigan.gov/dnr/things-to-do/hunting/regulations", dnrUrl: "https://www.michigan.gov/dnr" },
  { state: "Florida", seasons: "Deer (varies by zone, Sep-Feb), Turkey (spring Mar-Apr), Alligator (Aug-Nov), Wild hog (year-round on private land)", licenseUrl: "https://myfwc.com/hunting/regulations/", dnrUrl: "https://myfwc.com/" },
  { state: "California", seasons: "Deer (varies by zone, Jul-Nov), Turkey (spring Mar-May, fall Nov), Waterfowl (Oct-Jan), Wild pig (year-round)", licenseUrl: "https://wildlife.ca.gov/Regulations", dnrUrl: "https://wildlife.ca.gov/" },
  { state: "New York", seasons: "Deer (archery Oct-Dec, regular Nov-Dec), Turkey (spring May, fall Oct), Bear (Sep-Dec)", licenseUrl: "https://www.dec.ny.gov/outdoor/hunting.html", dnrUrl: "https://www.dec.ny.gov/" },
  { state: "Ohio", seasons: "Deer (archery Sep-Feb, gun Nov-Dec), Turkey (spring Apr-May, fall Oct), Small game (Sep-Feb)", licenseUrl: "https://ohiodnr.gov/discover-and-learn/safety-conservation/about-ODNR/wildlife/hunting-trapping-regulations", dnrUrl: "https://ohiodnr.gov/" },
  { state: "Georgia", seasons: "Deer (archery Sep-Jan, firearms Oct-Jan), Turkey (spring Mar-May), Bear (Sep-Jan), Alligator (Aug-Oct)", licenseUrl: "https://georgiawildlife.com/hunting/regulations", dnrUrl: "https://georgiawildlife.com/" },
];

const FELON_FIREARM_LAWS = [
  { title: "Federal Law (18 U.S.C. § 922(g))", desc: "Convicted felons are PROHIBITED from possessing firearms or ammunition. This is a federal law that applies in ALL states. Violation is punishable by up to 15 years in federal prison." },
  { title: "Hunting with Bow/Crossbow", desc: "In MOST states, convicted felons CAN hunt with archery equipment (bow, crossbow). Check your specific state laws, as some states have restrictions." },
  { title: "Hunting with Muzzleloader", desc: "Some states allow felons to hunt with muzzleloading firearms (antique-style weapons). This varies significantly by state — check before you hunt." },
  { title: "Rights Restoration", desc: "Some states allow felons to petition to have their firearm rights restored. This typically requires completing your sentence, waiting period, and a clean record." },
  { title: "Expungement Route", desc: "If your felony conviction is expunged or pardoned, your firearm rights may be restored. Consult an attorney about this option." },
];

const FISHING_INFO = [
  { title: "Fishing License Requirements", desc: "All states require a fishing license for anyone over 16 (age varies by state). Licenses are available online, at sporting goods stores, and at DNR offices." },
  { title: "Free Fishing Days", desc: "Most states offer 1-2 free fishing days per year where no license is required. Great way to try fishing without cost." },
  { title: "Catch Limits & Regulations", desc: "Each state sets daily catch limits, size limits, and seasonal restrictions for different fish species. Check your state's regulations before fishing." },
  { title: "Fishing for Felons", desc: "Fishing licenses are available to everyone regardless of criminal history. No background check required. Great outdoor activity for reentry." },
];

const LAND_USE_LAWS = [
  { title: "Trespassing Laws", desc: "Hunting or fishing on private land without permission is trespassing. Always get written permission from the landowner. Posted signs must be respected." },
  { title: "Public Land Access", desc: "National forests, BLM land, state game lands, and wildlife management areas are generally open to hunting and fishing with proper licenses." },
  { title: "Right of Way", desc: "Some states have laws about accessing landlocked public land through private land. Know your state's specific rules." },
  { title: "Trail Use", desc: "National and state parks have specific rules about trail use, camping, and outdoor activities. Check park regulations before visiting." },
];

export default function OutdoorLawsScreen() {
  const router = useRouter();
  const colors = useColors();
  const [expandedState, setExpandedState] = useState<number | null>(null);
  const [showFirearmLaws, setShowFirearmLaws] = useState(false);

  const openLink = (url: string) => Linking.openURL(url);

  return (
    <ScreenContainer>
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        <View className="p-4">
          <TouchableOpacity onPress={() => router.back()} style={{ flexDirection: "row", alignItems: "center", marginBottom: 16 }}>
            <IconSymbol name="chevron.left" size={24} color={colors.primary} />
            <Text className="text-primary ml-1 text-base">Back</Text>
          </TouchableOpacity>

          <View className="bg-success/10 rounded-2xl p-5 mb-6">
            <Text className="text-2xl font-bold text-foreground mb-2">Outdoor & Hunting Laws</Text>
            <Text className="text-muted text-sm leading-relaxed">
              Hunting seasons, fishing licenses, firearm restrictions for felons, land use laws, and DNR contacts. Know the rules before you head outdoors.
            </Text>
          </View>

          {/* Felon Firearm Laws - Important */}
          <TouchableOpacity onPress={() => setShowFirearmLaws(!showFirearmLaws)} className="bg-error/10 border border-error/30 rounded-xl p-4 mb-4">
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
              <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
                <IconSymbol name="exclamationmark.triangle" size={20} color={colors.error} />
                <Text className="text-foreground font-bold text-base ml-2">Firearm Restrictions for Felons</Text>
              </View>
              <IconSymbol name={showFirearmLaws ? "chevron.up" : "chevron.down"} size={16} color={colors.muted} />
            </View>
            {showFirearmLaws && (
              <View style={{ marginTop: 12 }}>
                {FELON_FIREARM_LAWS.map((law, i) => (
                  <View key={i} className="mb-3 bg-background rounded-lg p-3 border border-border">
                    <Text className="text-foreground font-semibold text-sm">{law.title}</Text>
                    <Text className="text-muted text-xs mt-1 leading-relaxed">{law.desc}</Text>
                  </View>
                ))}
              </View>
            )}
          </TouchableOpacity>

          {/* Hunting Seasons by State */}
          <Text className="text-foreground font-bold text-lg mb-3">Hunting Seasons by State</Text>
          {HUNTING_SEASONS.map((state, i) => (
            <View key={i} className="bg-surface rounded-xl border border-border mb-3 overflow-hidden">
              <TouchableOpacity onPress={() => setExpandedState(expandedState === i ? null : i)} style={{ padding: 16 }}>
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                  <Text className="text-foreground font-bold text-base">{state.state}</Text>
                  <IconSymbol name={expandedState === i ? "chevron.up" : "chevron.down"} size={16} color={colors.muted} />
                </View>
              </TouchableOpacity>
              {expandedState === i && (
                <View className="px-4 pb-4 border-t border-border pt-3">
                  <Text className="text-muted text-sm leading-relaxed mb-3">{state.seasons}</Text>
                  <TouchableOpacity onPress={() => openLink(state.licenseUrl)} style={{ flexDirection: "row", alignItems: "center", marginBottom: 8 }}>
                    <IconSymbol name="arrow.up.right" size={14} color={colors.primary} />
                    <Text className="text-primary text-sm ml-2">View Regulations & Get License</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => openLink(state.dnrUrl)} style={{ flexDirection: "row", alignItems: "center" }}>
                    <IconSymbol name="arrow.up.right" size={14} color={colors.primary} />
                    <Text className="text-primary text-sm ml-2">State Wildlife Agency</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          ))}

          {/* More State Resources */}
          <TouchableOpacity onPress={() => openLink("https://www.fws.gov/offices")} className="bg-surface rounded-xl border border-border p-4 mb-4">
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <IconSymbol name="arrow.up.right" size={16} color={colors.primary} />
              <Text className="text-primary font-semibold ml-2">Find All State Wildlife Agencies (U.S. Fish & Wildlife)</Text>
            </View>
          </TouchableOpacity>

          {/* Fishing */}
          <View className="bg-surface rounded-xl border border-border p-4 mb-4">
            <Text className="text-foreground font-bold text-lg mb-3">Fishing Information</Text>
            {FISHING_INFO.map((info, i) => (
              <View key={i} className="mb-3 bg-background rounded-lg p-3 border border-border">
                <Text className="text-foreground font-semibold text-sm">{info.title}</Text>
                <Text className="text-muted text-xs mt-1 leading-relaxed">{info.desc}</Text>
              </View>
            ))}
            <TouchableOpacity onPress={() => openLink("https://www.takemefishing.org/state-licensing-guide/")} style={{ flexDirection: "row", alignItems: "center", marginTop: 4 }}>
              <IconSymbol name="arrow.up.right" size={14} color={colors.primary} />
              <Text className="text-primary text-sm ml-2">Get Your Fishing License</Text>
            </TouchableOpacity>
          </View>

          {/* Land Use */}
          <View className="bg-surface rounded-xl border border-border p-4 mb-4">
            <Text className="text-foreground font-bold text-lg mb-3">Land Use & Access Laws</Text>
            {LAND_USE_LAWS.map((law, i) => (
              <View key={i} className="mb-3 bg-background rounded-lg p-3 border border-border">
                <Text className="text-foreground font-semibold text-sm">{law.title}</Text>
                <Text className="text-muted text-xs mt-1 leading-relaxed">{law.desc}</Text>
              </View>
            ))}
            <View style={{ marginTop: 8 }}>
              <TouchableOpacity onPress={() => openLink("https://www.fs.usda.gov/")} style={{ flexDirection: "row", alignItems: "center", marginBottom: 6 }}>
                <IconSymbol name="arrow.up.right" size={14} color={colors.primary} />
                <Text className="text-primary text-sm ml-2">U.S. Forest Service</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => openLink("https://www.blm.gov/")} style={{ flexDirection: "row", alignItems: "center", marginBottom: 6 }}>
                <IconSymbol name="arrow.up.right" size={14} color={colors.primary} />
                <Text className="text-primary text-sm ml-2">Bureau of Land Management</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => openLink("https://www.nps.gov/")} style={{ flexDirection: "row", alignItems: "center" }}>
                <IconSymbol name="arrow.up.right" size={14} color={colors.primary} />
                <Text className="text-primary text-sm ml-2">National Park Service</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View className="bg-surface rounded-xl p-4">
            <Text className="text-muted text-xs text-center leading-relaxed">
              Hunting and fishing regulations change annually. Always verify current seasons, bag limits, and license requirements with your state wildlife agency before heading out.
            </Text>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
