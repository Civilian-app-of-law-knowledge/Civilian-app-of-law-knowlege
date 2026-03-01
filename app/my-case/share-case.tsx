import { useState, useEffect, useCallback } from "react";
import { ScrollView, Text, View, TouchableOpacity, Alert, Share, Platform } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import QRCode from "react-native-qrcode-svg";

import { ScreenContainer } from "@/components/screen-container";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useColors } from "@/hooks/use-colors";
import { CaseStorage, CaseInfo, CourtDate, LegalContact, CaseTodo } from "@/lib/case-storage";
import { 
  createShareableCase, 
  ShareOptions, 
  getExpirationLabel,
  formatTimeRemaining,
  getActiveSharesForCase,
  revokeShare,
} from "@/lib/case-sharing";

type ExpirationOption = ShareOptions['expiresIn'];

export default function ShareCaseScreen() {
  const router = useRouter();
  const colors = useColors();
  const params = useLocalSearchParams<{ caseId: string }>();
  
  const [caseInfo, setCaseInfo] = useState<CaseInfo | null>(null);
  const [courtDates, setCourtDates] = useState<CourtDate[]>([]);
  const [contacts, setContacts] = useState<LegalContact[]>([]);
  const [todos, setTodos] = useState<CaseTodo[]>([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  
  // Share options
  const [includeBasicInfo, setIncludeBasicInfo] = useState(true);
  const [includeCourtDates, setIncludeCourtDates] = useState(true);
  const [includeContacts, setIncludeContacts] = useState(false);
  const [includeTodos, setIncludeTodos] = useState(false);
  const [includeNotes, setIncludeNotes] = useState(false);
  const [expiresIn, setExpiresIn] = useState<ExpirationOption>('24hours');
  
  // Generated QR data
  const [qrData, setQrData] = useState<string | null>(null);
  const [shareId, setShareId] = useState<string | null>(null);
  const [expiresAt, setExpiresAt] = useState<Date | null>(null);
  
  // Active shares
  const [activeShares, setActiveShares] = useState<any[]>([]);

  const loadData = useCallback(async () => {
    if (!params.caseId) return;
    
    try {
      const [cases, dates, contactsList, todosList] = await Promise.all([
        CaseStorage.getCases(),
        CaseStorage.getCourtDates(),
        CaseStorage.getContacts(),
        CaseStorage.getTodos(),
      ]);
      
      const foundCase = cases.find(c => c.id === params.caseId);
      if (foundCase) {
        setCaseInfo(foundCase);
        setCourtDates(dates.filter(d => d.caseId === params.caseId));
        setContacts(contactsList.filter(c => c.caseId === params.caseId));
        setTodos(todosList.filter(t => t.caseId === params.caseId));
      }
      
      // Load active shares
      const shares = await getActiveSharesForCase(params.caseId);
      setActiveShares(shares);
    } catch (error) {
      console.error('Error loading case data:', error);
    } finally {
      setLoading(false);
    }
  }, [params.caseId]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleGenerateQR = async () => {
    if (!caseInfo) return;
    
    if (!includeBasicInfo && !includeCourtDates && !includeContacts && !includeTodos) {
      Alert.alert('Select Data', 'Please select at least one type of information to share.');
      return;
    }
    
    setGenerating(true);
    try {
      const options: ShareOptions = {
        includeBasicInfo,
        includeCourtDates,
        includeContacts,
        includeTodos,
        includeNotes,
        expiresIn,
      };
      
      const result = await createShareableCase(
        caseInfo,
        courtDates,
        contacts,
        todos,
        options
      );
      
      setQrData(result.qrData);
      setShareId(result.shareId);
      setExpiresAt(result.expiresAt);
      
      // Refresh active shares
      const shares = await getActiveSharesForCase(params.caseId!);
      setActiveShares(shares);
    } catch (error) {
      console.error('Error generating QR code:', error);
      Alert.alert('Error', 'Failed to generate QR code. Please try again.');
    } finally {
      setGenerating(false);
    }
  };

  const handleShare = async () => {
    if (!shareId) return;
    
    try {
      await Share.share({
        message: `I'm sharing my case information with you via Civilian Law of Knowledge app.\n\nShare Code: ${shareId}\n\nOpen the app and scan the QR code or enter this code to view the shared information.\n\nThis share expires: ${expiresAt?.toLocaleString()}`,
        title: 'Share Case Information',
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const handleRevokeShare = async (id: string) => {
    Alert.alert(
      'Revoke Share',
      'Are you sure you want to revoke this share? Anyone with the QR code will no longer be able to view the information.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Revoke',
          style: 'destructive',
          onPress: async () => {
            await revokeShare(id);
            const shares = await getActiveSharesForCase(params.caseId!);
            setActiveShares(shares);
            if (shareId === id) {
              setQrData(null);
              setShareId(null);
              setExpiresAt(null);
            }
          },
        },
      ]
    );
  };

  const expirationOptions: { value: ExpirationOption; label: string }[] = [
    { value: '1hour', label: '1 Hour' },
    { value: '24hours', label: '24 Hours' },
    { value: '7days', label: '7 Days' },
    { value: '30days', label: '30 Days' },
  ];

  if (loading) {
    return (
      <ScreenContainer>
        <View className="flex-1 items-center justify-center">
          <Text className="text-muted">Loading...</Text>
        </View>
      </ScreenContainer>
    );
  }

  if (!caseInfo) {
    return (
      <ScreenContainer>
        <View className="flex-1 items-center justify-center p-4">
          <Text className="text-lg text-foreground mb-2">Case Not Found</Text>
          <TouchableOpacity
            className="bg-primary px-6 py-3 rounded-xl"
            onPress={() => router.back()}
          >
            <Text className="text-white font-semibold">Go Back</Text>
          </TouchableOpacity>
        </View>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="flex-row items-center px-4 py-4 border-b border-border">
          <TouchableOpacity
            className="mr-3 p-1"
            onPress={() => router.back()}
            activeOpacity={0.7}
          >
            <IconSymbol name="chevron.left" size={24} color={colors.foreground} />
          </TouchableOpacity>
          <View className="flex-1">
            <Text className="text-xl font-bold text-foreground">Share Case</Text>
            <Text className="text-sm text-muted">{caseInfo.caseNumber || 'Case Details'}</Text>
          </View>
          <View className="w-10 h-10 rounded-full bg-primary/20 items-center justify-center">
            <IconSymbol name="qrcode" size={20} color={colors.primary} />
          </View>
        </View>

        {/* Security Notice */}
        <View className="px-4 py-3">
          <View className="bg-warning/10 rounded-xl p-3 border border-warning/30 flex-row items-start">
            <IconSymbol name="exclamationmark.triangle.fill" size={18} color={colors.warning} />
            <Text className="flex-1 text-xs text-muted ml-2">
              Only share case information with people you trust. The QR code will expire after the selected time period.
            </Text>
          </View>
        </View>

        {/* QR Code Display (if generated) */}
        {qrData && (
          <View className="px-4 py-4">
            <View className="bg-white rounded-2xl p-6 items-center border border-border">
              <QRCode
                value={qrData}
                size={200}
                backgroundColor="white"
                color="black"
              />
              <View className="mt-4 items-center">
                <Text className="text-lg font-bold text-foreground">Share Code: {shareId}</Text>
                <Text className="text-sm text-muted mt-1">
                  Expires: {expiresAt?.toLocaleString()}
                </Text>
              </View>
              
              <View className="flex-row mt-4 gap-3">
                <TouchableOpacity
                  className="flex-1 bg-primary rounded-xl py-3 items-center"
                  onPress={handleShare}
                  activeOpacity={0.7}
                >
                  <Text className="text-white font-semibold">Share</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className="flex-1 bg-surface border border-border rounded-xl py-3 items-center"
                  onPress={() => {
                    setQrData(null);
                    setShareId(null);
                    setExpiresAt(null);
                  }}
                  activeOpacity={0.7}
                >
                  <Text className="text-foreground font-semibold">New QR</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}

        {/* Share Options (if not generated) */}
        {!qrData && (
          <>
            <View className="px-4 py-2">
              <Text className="text-lg font-bold text-foreground mb-3">What to Share</Text>
              
              {/* Basic Info Toggle */}
              <TouchableOpacity
                className="flex-row items-center justify-between bg-surface border border-border rounded-xl px-4 py-3 mb-2"
                onPress={() => setIncludeBasicInfo(!includeBasicInfo)}
                activeOpacity={0.7}
              >
                <View className="flex-row items-center flex-1">
                  <IconSymbol name="doc.text.fill" size={20} color={colors.primary} />
                  <View className="ml-3 flex-1">
                    <Text className="text-sm font-medium text-foreground">Case Information</Text>
                    <Text className="text-xs text-muted">Case #, docket #, charges, status</Text>
                  </View>
                </View>
                <View 
                  className={`w-6 h-6 rounded-md items-center justify-center ${includeBasicInfo ? 'bg-primary' : 'bg-border'}`}
                >
                  {includeBasicInfo && <IconSymbol name="checkmark" size={14} color="white" />}
                </View>
              </TouchableOpacity>

              {/* Court Dates Toggle */}
              <TouchableOpacity
                className="flex-row items-center justify-between bg-surface border border-border rounded-xl px-4 py-3 mb-2"
                onPress={() => setIncludeCourtDates(!includeCourtDates)}
                activeOpacity={0.7}
              >
                <View className="flex-row items-center flex-1">
                  <IconSymbol name="calendar" size={20} color={colors.primary} />
                  <View className="ml-3 flex-1">
                    <Text className="text-sm font-medium text-foreground">Court Dates</Text>
                    <Text className="text-xs text-muted">{courtDates.length} upcoming date(s)</Text>
                  </View>
                </View>
                <View 
                  className={`w-6 h-6 rounded-md items-center justify-center ${includeCourtDates ? 'bg-primary' : 'bg-border'}`}
                >
                  {includeCourtDates && <IconSymbol name="checkmark" size={14} color="white" />}
                </View>
              </TouchableOpacity>

              {/* Contacts Toggle */}
              <TouchableOpacity
                className="flex-row items-center justify-between bg-surface border border-border rounded-xl px-4 py-3 mb-2"
                onPress={() => setIncludeContacts(!includeContacts)}
                activeOpacity={0.7}
              >
                <View className="flex-row items-center flex-1">
                  <IconSymbol name="person.2.fill" size={20} color={colors.primary} />
                  <View className="ml-3 flex-1">
                    <Text className="text-sm font-medium text-foreground">Legal Contacts</Text>
                    <Text className="text-xs text-muted">{contacts.length} contact(s)</Text>
                  </View>
                </View>
                <View 
                  className={`w-6 h-6 rounded-md items-center justify-center ${includeContacts ? 'bg-primary' : 'bg-border'}`}
                >
                  {includeContacts && <IconSymbol name="checkmark" size={14} color="white" />}
                </View>
              </TouchableOpacity>

              {/* Todos Toggle */}
              <TouchableOpacity
                className="flex-row items-center justify-between bg-surface border border-border rounded-xl px-4 py-3 mb-2"
                onPress={() => setIncludeTodos(!includeTodos)}
                activeOpacity={0.7}
              >
                <View className="flex-row items-center flex-1">
                  <IconSymbol name="checklist" size={20} color={colors.primary} />
                  <View className="ml-3 flex-1">
                    <Text className="text-sm font-medium text-foreground">To-Do Items</Text>
                    <Text className="text-xs text-muted">{todos.length} item(s)</Text>
                  </View>
                </View>
                <View 
                  className={`w-6 h-6 rounded-md items-center justify-center ${includeTodos ? 'bg-primary' : 'bg-border'}`}
                >
                  {includeTodos && <IconSymbol name="checkmark" size={14} color="white" />}
                </View>
              </TouchableOpacity>

              {/* Notes Toggle (only if basic info is included) */}
              {includeBasicInfo && (
                <TouchableOpacity
                  className="flex-row items-center justify-between bg-surface border border-border rounded-xl px-4 py-3 mb-2"
                  onPress={() => setIncludeNotes(!includeNotes)}
                  activeOpacity={0.7}
                >
                  <View className="flex-row items-center flex-1">
                    <IconSymbol name="note.text" size={20} color={colors.primary} />
                    <View className="ml-3 flex-1">
                      <Text className="text-sm font-medium text-foreground">Personal Notes</Text>
                      <Text className="text-xs text-muted">Include your case notes</Text>
                    </View>
                  </View>
                  <View 
                    className={`w-6 h-6 rounded-md items-center justify-center ${includeNotes ? 'bg-primary' : 'bg-border'}`}
                  >
                    {includeNotes && <IconSymbol name="checkmark" size={14} color="white" />}
                  </View>
                </TouchableOpacity>
              )}
            </View>

            {/* Expiration Options */}
            <View className="px-4 py-4">
              <Text className="text-lg font-bold text-foreground mb-3">Expires After</Text>
              <View className="flex-row flex-wrap gap-2">
                {expirationOptions.map((option) => (
                  <TouchableOpacity
                    key={option.value}
                    className={`px-4 py-2 rounded-xl border ${
                      expiresIn === option.value 
                        ? 'bg-primary border-primary' 
                        : 'bg-surface border-border'
                    }`}
                    onPress={() => setExpiresIn(option.value)}
                    activeOpacity={0.7}
                  >
                    <Text className={`font-medium ${
                      expiresIn === option.value ? 'text-white' : 'text-foreground'
                    }`}>
                      {option.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Generate Button */}
            <View className="px-4 py-4">
              <TouchableOpacity
                className={`rounded-xl p-4 items-center ${generating ? 'bg-primary/50' : 'bg-primary'}`}
                onPress={handleGenerateQR}
                disabled={generating}
                activeOpacity={0.7}
              >
                <Text className="text-white font-semibold text-lg">
                  {generating ? 'Generating...' : 'Generate QR Code'}
                </Text>
              </TouchableOpacity>
            </View>
          </>
        )}

        {/* Active Shares */}
        {activeShares.length > 0 && (
          <View className="px-4 py-4">
            <Text className="text-lg font-bold text-foreground mb-3">Active Shares</Text>
            {activeShares.map((share) => (
              <View 
                key={share.id}
                className="bg-surface border border-border rounded-xl p-4 mb-2"
              >
                <View className="flex-row items-center justify-between">
                  <View>
                    <Text className="text-sm font-semibold text-foreground">Code: {share.id}</Text>
                    <Text className="text-xs text-muted">
                      {formatTimeRemaining(share.expiresAt)}
                    </Text>
                  </View>
                  <TouchableOpacity
                    className="bg-error/10 px-3 py-2 rounded-lg"
                    onPress={() => handleRevokeShare(share.id)}
                    activeOpacity={0.7}
                  >
                    <Text className="text-error text-xs font-medium">Revoke</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        )}

        {/* How It Works */}
        <View className="px-4 py-4 mb-8">
          <Text className="text-lg font-bold text-foreground mb-3">How It Works</Text>
          <View className="bg-surface border border-border rounded-xl p-4">
            <View className="flex-row items-start mb-3">
              <View className="w-6 h-6 rounded-full bg-primary items-center justify-center mr-3">
                <Text className="text-white text-xs font-bold">1</Text>
              </View>
              <Text className="flex-1 text-sm text-muted">
                Select what information you want to share and how long the share should last.
              </Text>
            </View>
            <View className="flex-row items-start mb-3">
              <View className="w-6 h-6 rounded-full bg-primary items-center justify-center mr-3">
                <Text className="text-white text-xs font-bold">2</Text>
              </View>
              <Text className="flex-1 text-sm text-muted">
                Generate a QR code that contains your selected case information.
              </Text>
            </View>
            <View className="flex-row items-start mb-3">
              <View className="w-6 h-6 rounded-full bg-primary items-center justify-center mr-3">
                <Text className="text-white text-xs font-bold">3</Text>
              </View>
              <Text className="flex-1 text-sm text-muted">
                Show the QR code to your attorney or family member to scan.
              </Text>
            </View>
            <View className="flex-row items-start">
              <View className="w-6 h-6 rounded-full bg-primary items-center justify-center mr-3">
                <Text className="text-white text-xs font-bold">4</Text>
              </View>
              <Text className="flex-1 text-sm text-muted">
                The share automatically expires after the selected time for your security.
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
