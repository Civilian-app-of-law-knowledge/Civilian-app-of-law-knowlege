import { useState } from "react";
import { ScrollView, Text, View, TouchableOpacity, TextInput, Linking, FlatList } from "react-native";
import { useRouter } from "expo-router";

import { ScreenContainer } from "@/components/screen-container";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useColors } from "@/hooks/use-colors";
import { facilities } from "@/data/legal-content";

type SearchMode = 'name' | 'docket' | 'case';

const STATE_SEARCH_PORTALS = [
  { state: "Federal (BOP)", url: "https://www.bop.gov/inmateloc/", desc: "All federal prison inmates" },
  { state: "VINELink (Nationwide)", url: "https://www.vinelink.com/", desc: "Victim notification & inmate search" },
  { state: "Alabama", url: "https://doc.alabama.gov/InmateSearch", desc: "AL DOC inmate search" },
  { state: "Alaska", url: "https://www.vinelink.com/#/home/site/1000", desc: "AK inmate search via VINE" },
  { state: "Arizona", url: "https://corrections.az.gov/inmate-search", desc: "AZ DOC inmate search" },
  { state: "Arkansas", url: "https://www.vinelink.com/#/home/site/4000", desc: "AR inmate search via VINE" },
  { state: "California", url: "https://inmatelocator.cdcr.ca.gov/", desc: "CA CDCR inmate locator" },
  { state: "Colorado", url: "https://www.vinelink.com/#/home/site/6000", desc: "CO inmate search via VINE" },
  { state: "Connecticut", url: "https://www.vinelink.com/#/home/site/7000", desc: "CT inmate search via VINE" },
  { state: "Delaware", url: "https://www.vinelink.com/#/home/site/8000", desc: "DE inmate search via VINE" },
  { state: "Florida", url: "http://www.dc.state.fl.us/offenderSearch/", desc: "FL DOC offender search" },
  { state: "Georgia", url: "http://www.dcor.state.ga.us/GDC/OffenderQuery/jsp/OffQryForm.jsp", desc: "GA DOC offender query" },
  { state: "Hawaii", url: "https://www.vinelink.com/#/home/site/12000", desc: "HI inmate search via VINE" },
  { state: "Idaho", url: "https://www.idoc.idaho.gov/content/prisons/offender_search", desc: "ID DOC offender search" },
  { state: "Illinois", url: "https://www.idoc.state.il.us/subsections/search/ISinms2.asp", desc: "IL DOC inmate search" },
  { state: "Indiana", url: "https://www.in.gov/idoc/find-a-facility/offender-locator/", desc: "IN DOC offender locator" },
  { state: "Iowa", url: "https://www.vinelink.com/#/home/site/16000", desc: "IA inmate search via VINE" },
  { state: "Kansas", url: "https://www.vinelink.com/#/home/site/17000", desc: "KS inmate search via VINE" },
  { state: "Kentucky", url: "https://kool.corrections.ky.gov/KOOL/", desc: "KY DOC inmate lookup" },
  { state: "Louisiana", url: "https://doc.louisiana.gov/imprisoned-person-locator/", desc: "LA DOC inmate locator" },
  { state: "Maine", url: "https://www.vinelink.com/#/home/site/20000", desc: "ME inmate search via VINE" },
  { state: "Maryland", url: "https://www.dpscs.state.md.us/inmate/", desc: "MD DPSCS inmate search" },
  { state: "Massachusetts", url: "https://www.vinelink.com/#/home/site/22000", desc: "MA inmate search via VINE" },
  { state: "Michigan", url: "https://mdocweb.state.mi.us/OTIS2/otis2.aspx", desc: "MI DOC OTIS search" },
  { state: "Minnesota", url: "https://coms.doc.state.mn.us/publicviewer", desc: "MN DOC offender search" },
  { state: "Mississippi", url: "https://www.ms.gov/mdoc/inmate/", desc: "MS DOC inmate search" },
  { state: "Missouri", url: "https://doc.mo.gov/offender-search", desc: "MO DOC offender search" },
  { state: "Montana", url: "https://app.mt.gov/conweb/", desc: "MT DOC offender search" },
  { state: "Nebraska", url: "https://www.vinelink.com/#/home/site/28000", desc: "NE inmate search via VINE" },
  { state: "Nevada", url: "https://ofdsearch.doc.nv.gov/", desc: "NV DOC offender search" },
  { state: "New Hampshire", url: "https://www.vinelink.com/#/home/site/30000", desc: "NH inmate search via VINE" },
  { state: "New Jersey", url: "https://www20.state.nj.us/DOC_Inmate/inmatesearch", desc: "NJ DOC inmate search" },
  { state: "New Mexico", url: "https://cd.nm.gov/offender-search/", desc: "NM DOC offender search" },
  { state: "New York", url: "http://nysdoccslookup.doccs.ny.gov/", desc: "NY DOCCS inmate lookup" },
  { state: "North Carolina", url: "https://webapps.doc.state.nc.us/opi/offendersearch.do", desc: "NC DPS offender search" },
  { state: "North Dakota", url: "https://www.vinelink.com/#/home/site/36000", desc: "ND inmate search via VINE" },
  { state: "Ohio", url: "https://appgateway.drc.ohio.gov/OffenderSearch", desc: "OH DRC offender search" },
  { state: "Oklahoma", url: "https://okoffender.doc.ok.gov/", desc: "OK DOC offender lookup" },
  { state: "Oregon", url: "https://docpub.state.or.us/OOS/intro.jsf", desc: "OR DOC offender search" },
  { state: "Pennsylvania", url: "https://inmatelocator.cor.pa.gov/", desc: "PA DOC inmate locator" },
  { state: "Rhode Island", url: "https://www.vinelink.com/#/home/site/40000", desc: "RI inmate search via VINE" },
  { state: "South Carolina", url: "https://public.doc.state.sc.us/scdc-public/", desc: "SC DOC inmate search" },
  { state: "South Dakota", url: "https://doc.sd.gov/adult/lookup/", desc: "SD DOC inmate lookup" },
  { state: "Tennessee", url: "https://apps.tn.gov/foil-app/search.jsp", desc: "TN DOC felony search" },
  { state: "Texas", url: "https://inmate.tdcj.texas.gov/InmateSearch/start.action", desc: "TX TDCJ inmate search" },
  { state: "Utah", url: "https://www.vinelink.com/#/home/site/45000", desc: "UT inmate search via VINE" },
  { state: "Vermont", url: "https://www.vinelink.com/#/home/site/46000", desc: "VT inmate search via VINE" },
  { state: "Virginia", url: "https://vadoc.virginia.gov/offenders/locator/", desc: "VA DOC offender locator" },
  { state: "Washington", url: "https://www.doc.wa.gov/information/inmate-search.htm", desc: "WA DOC inmate search" },
  { state: "West Virginia", url: "https://www.vinelink.com/#/home/site/49000", desc: "WV inmate search via VINE" },
  { state: "Wisconsin", url: "https://appsdoc.wi.gov/lop/", desc: "WI DOC offender locator" },
  { state: "Wyoming", url: "https://www.vinelink.com/#/home/site/51000", desc: "WY inmate search via VINE" },
];

const COURT_SEARCH_TOOLS = [
  { name: "PACER (Federal Courts)", desc: "Search all federal court cases, dockets, and documents", url: "https://pacer.uscourts.gov/" },
  { name: "PA Unified Judicial System", desc: "Pennsylvania court case search & docket sheets", url: "https://ujsportal.pacourts.us/" },
  { name: "NY eCourts", desc: "New York court case search", url: "https://iapps.courts.state.ny.us/webcivil/FCASMain" },
  { name: "CA Courts Case Search", desc: "California court case lookup", url: "https://www.courts.ca.gov/find-my-court.htm" },
  { name: "TX Courts Online", desc: "Texas court records search", url: "https://www.txcourts.gov/case-search/" },
  { name: "FL Courts Search", desc: "Florida court case search", url: "https://www.flcourts.gov/" },
];

export default function SearchScreen() {
  const router = useRouter();
  const colors = useColors();
  const [searchMode, setSearchMode] = useState<SearchMode>('name');
  const [searchQuery, setSearchQuery] = useState('');
  const [hasSearched, setHasSearched] = useState(false);
  const [stateFilter, setStateFilter] = useState('');
  const [showAllStates, setShowAllStates] = useState(false);

  const searchModes = [
    { id: 'name' as SearchMode, label: 'By Name' },
    { id: 'docket' as SearchMode, label: 'By Docket #' },
    { id: 'case' as SearchMode, label: 'By Case #' },
  ];

  const getPlaceholder = () => {
    switch (searchMode) {
      case 'name': return 'Enter full name (e.g., John Smith)';
      case 'docket': return 'Enter docket number';
      case 'case': return 'Enter case number';
    }
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      setHasSearched(true);
    }
  };

  const filteredStates = STATE_SEARCH_PORTALS.filter(s =>
    s.state.toLowerCase().includes(stateFilter.toLowerCase())
  );

  const displayedStates = showAllStates ? filteredStates : filteredStates.slice(0, 10);

  const openSearchWithQuery = (baseUrl: string) => {
    Linking.openURL(baseUrl);
  };

  return (
    <ScreenContainer>
      <ScrollView 
        className="flex-1" 
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View className="px-5 pt-4 pb-4 bg-surface">
          <Text className="text-2xl font-bold text-foreground mb-1">
            Inmate & Case Search
          </Text>
          <Text className="text-sm text-muted">
            Find inmates by name, docket number, or case number across all 50 states
          </Text>
        </View>

        {/* Search Mode Tabs */}
        <View className="px-4 py-3">
          <View className="flex-row bg-surface rounded-xl p-1 border border-border">
            {searchModes.map((mode) => (
              <TouchableOpacity
                key={mode.id}
                className="flex-1 py-2 rounded-lg"
                style={{ 
                  backgroundColor: searchMode === mode.id ? colors.primary : 'transparent' 
                }}
                onPress={() => {
                  setSearchMode(mode.id);
                  setHasSearched(false);
                }}
                activeOpacity={0.7}
              >
                <Text 
                  className="text-center text-sm font-medium"
                  style={{ 
                    color: searchMode === mode.id ? '#FFFFFF' : colors.muted 
                  }}
                >
                  {mode.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Search Input */}
        <View className="px-4 py-2">
          <View className="bg-surface rounded-xl border border-border overflow-hidden">
            <View className="flex-row items-center px-4">
              <IconSymbol name="magnifyingglass" size={20} color={colors.muted} />
              <TextInput
                className="flex-1 py-4 px-3 text-base text-foreground"
                placeholder={getPlaceholder()}
                placeholderTextColor={colors.muted}
                value={searchQuery}
                onChangeText={setSearchQuery}
                onSubmitEditing={handleSearch}
                returnKeyType="search"
                autoCapitalize="words"
                autoCorrect={false}
              />
              {searchQuery.length > 0 && (
                <TouchableOpacity onPress={() => { setSearchQuery(''); setHasSearched(false); }} activeOpacity={0.7}>
                  <IconSymbol name="xmark.circle.fill" size={20} color={colors.muted} />
                </TouchableOpacity>
              )}
            </View>
          </View>
          <TouchableOpacity
            className="mt-3 py-3 rounded-xl items-center"
            style={{ backgroundColor: colors.primary }}
            onPress={handleSearch}
            activeOpacity={0.8}
          >
            <Text className="text-base font-semibold text-white">Search</Text>
          </TouchableOpacity>
        </View>

        {/* Search Results - Direct Links */}
        {hasSearched && (
          <View className="px-4 py-4">
            <View className="bg-primary/10 rounded-xl p-4 border border-primary/20 mb-3">
              <Text className="text-foreground font-bold text-base mb-2">
                Searching for: "{searchQuery}"
              </Text>
              <Text className="text-muted text-sm leading-relaxed mb-3">
                {searchMode === 'name' 
                  ? "Click any state below to search their official inmate database. Try first name, last name, or variations (middle name, maiden name, nicknames)."
                  : searchMode === 'docket'
                  ? "Use the court search tools below to look up your docket number. Federal cases use PACER, state cases use the state court portal."
                  : "Use the court search tools below to look up your case number."}
              </Text>
              <View className="bg-surface rounded-lg p-3 border border-border">
                <Text className="text-foreground font-semibold text-sm mb-1">Quick Search Tips:</Text>
                <Text className="text-muted text-xs leading-relaxed">• Try different name spellings and variations{"\n"}• Use last name only if full name doesn't work{"\n"}• Check both state DOC and county jail portals{"\n"}• Federal inmates: use BOP locator first{"\n"}• Recently booked: check county jail website directly</Text>
              </View>
            </View>

            {/* Quick Federal Search */}
            <TouchableOpacity
              className="bg-surface rounded-xl p-4 mb-3 border border-border flex-row items-center"
              onPress={() => openSearchWithQuery("https://www.bop.gov/inmateloc/")}
              activeOpacity={0.7}
            >
              <View className="w-10 h-10 rounded-full items-center justify-center mr-3" style={{ backgroundColor: colors.primary + '20' }}>
                <IconSymbol name="arrow.up.right" size={20} color={colors.primary} />
              </View>
              <View className="flex-1">
                <Text className="text-base font-semibold text-foreground">Federal BOP Inmate Locator</Text>
                <Text className="text-sm text-muted">Search all federal prison inmates by name</Text>
              </View>
              <IconSymbol name="chevron.right" size={18} color={colors.muted} />
            </TouchableOpacity>

            <TouchableOpacity
              className="bg-surface rounded-xl p-4 mb-3 border border-border flex-row items-center"
              onPress={() => openSearchWithQuery("https://www.vinelink.com/")}
              activeOpacity={0.7}
            >
              <View className="w-10 h-10 rounded-full items-center justify-center mr-3" style={{ backgroundColor: colors.primary + '20' }}>
                <IconSymbol name="arrow.up.right" size={20} color={colors.primary} />
              </View>
              <View className="flex-1">
                <Text className="text-base font-semibold text-foreground">VINELink (Nationwide)</Text>
                <Text className="text-sm text-muted">Search inmates across all states</Text>
              </View>
              <IconSymbol name="chevron.right" size={18} color={colors.muted} />
            </TouchableOpacity>
          </View>
        )}

        {/* Court Search Tools */}
        {(searchMode === 'docket' || searchMode === 'case') && (
          <View className="px-4 py-4">
            <Text className="text-lg font-semibold text-foreground mb-3 px-1">Court Record Search</Text>
            {COURT_SEARCH_TOOLS.map((tool, i) => (
              <TouchableOpacity
                key={i}
                className="bg-surface rounded-xl p-4 mb-3 border border-border flex-row items-center"
                onPress={() => Linking.openURL(tool.url)}
                activeOpacity={0.7}
              >
                <View className="w-10 h-10 rounded-full items-center justify-center mr-3" style={{ backgroundColor: colors.primary + '20' }}>
                  <IconSymbol name="arrow.up.right" size={20} color={colors.primary} />
                </View>
                <View className="flex-1">
                  <Text className="text-base font-semibold text-foreground">{tool.name}</Text>
                  <Text className="text-sm text-muted">{tool.desc}</Text>
                </View>
                <IconSymbol name="chevron.right" size={18} color={colors.muted} />
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* State-by-State Inmate Search */}
        <View className="px-4 py-4">
          <Text className="text-lg font-semibold text-foreground mb-1 px-1">Search by State</Text>
          <Text className="text-sm text-muted mb-3 px-1">All 50 state DOC inmate search portals</Text>
          
          {/* State Filter */}
          <View className="bg-surface rounded-xl border border-border overflow-hidden mb-3">
            <View className="flex-row items-center px-4">
              <IconSymbol name="magnifyingglass" size={16} color={colors.muted} />
              <TextInput
                className="flex-1 py-3 px-3 text-sm text-foreground"
                placeholder="Filter states..."
                placeholderTextColor={colors.muted}
                value={stateFilter}
                onChangeText={setStateFilter}
                autoCapitalize="words"
              />
            </View>
          </View>

          {displayedStates.map((portal, i) => (
            <TouchableOpacity
              key={i}
              className="bg-surface rounded-xl p-3 mb-2 border border-border flex-row items-center"
              onPress={() => Linking.openURL(portal.url)}
              activeOpacity={0.7}
            >
              <View className="flex-1">
                <Text className="text-sm font-semibold text-foreground">{portal.state}</Text>
                <Text className="text-xs text-muted">{portal.desc}</Text>
              </View>
              <IconSymbol name="arrow.up.right" size={16} color={colors.primary} />
            </TouchableOpacity>
          ))}

          {!showAllStates && filteredStates.length > 10 && (
            <TouchableOpacity
              className="py-3 items-center"
              onPress={() => setShowAllStates(true)}
              activeOpacity={0.7}
            >
              <Text className="text-sm font-medium" style={{ color: colors.primary }}>
                Show All {filteredStates.length} States →
              </Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Quick Links */}
        <View className="px-4 py-4">
          <Text className="text-lg font-semibold text-foreground mb-3 px-1">More Tools</Text>
          {[
            { title: "State Inmate Lookup", desc: "All 50 state DOC portals", route: "/state-lookup" },
            { title: "Court Records Search", desc: "PACER and state court portals", route: "/court-records" },
            { title: "Lawyer Directory", desc: "Find attorneys by county & specialty", route: "/lawyer-directory" },
            { title: "Warrant Check", desc: "How to check for outstanding warrants", route: "/warrant-check" },
          ].map((link, i) => (
            <TouchableOpacity
              key={i}
              className="bg-surface rounded-xl p-4 mb-3 border border-border flex-row items-center"
              onPress={() => router.push(link.route as any)}
              activeOpacity={0.7}
            >
              <View className="flex-1">
                <Text className="text-base font-semibold text-foreground">{link.title}</Text>
                <Text className="text-sm text-muted">{link.desc}</Text>
              </View>
              <IconSymbol name="chevron.right" size={18} color={colors.muted} />
            </TouchableOpacity>
          ))}
        </View>

        {/* Facility Quick Links */}
        <View className="px-4 py-4">
          <Text className="text-lg font-semibold text-foreground mb-3 px-1">Local Facilities</Text>
          {facilities.slice(0, 3).map((facility) => (
            <TouchableOpacity
              key={facility.id}
              className="bg-surface rounded-xl p-4 mb-3 border border-border"
              onPress={() => router.push(`/facility/${facility.id}` as any)}
              activeOpacity={0.7}
            >
              <View className="flex-row items-start justify-between">
                <View className="flex-1">
                  <View className="flex-row items-center mb-1">
                    <View className="px-2 py-0.5 rounded-full mr-2" style={{ backgroundColor: colors.muted + '30' }}>
                      <Text className="text-xs text-muted uppercase">{facility.type}</Text>
                    </View>
                  </View>
                  <Text className="text-base font-semibold text-foreground mb-1">{facility.name}</Text>
                  <Text className="text-sm text-muted">{facility.city}, {facility.state}</Text>
                </View>
                <IconSymbol name="chevron.right" size={18} color={colors.muted} />
              </View>
            </TouchableOpacity>
          ))}
          <TouchableOpacity
            className="py-3 items-center"
            onPress={() => router.push("/facilities" as any)}
            activeOpacity={0.7}
          >
            <Text className="text-sm font-medium" style={{ color: colors.primary }}>
              View All Facilities →
            </Text>
          </TouchableOpacity>
        </View>

        {/* Disclaimer */}
        <View className="px-4 py-4 mb-4">
          <View className="bg-surface rounded-xl p-4 border border-border">
            <View className="flex-row items-start">
              <IconSymbol name="info.circle" size={18} color={colors.muted} style={{ marginTop: 2 }} />
              <Text className="flex-1 text-xs text-muted ml-2 leading-relaxed">
                Information is sourced from public records and may not be current. 
                Contact the facility directly for the most accurate information.
                Search by name works best with exact spelling — try variations if needed.
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
