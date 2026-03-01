import { useState, useEffect, useCallback } from "react";
import { ScrollView, Text, View, TouchableOpacity, RefreshControl, Platform } from "react-native";
import { useRouter, useFocusEffect } from "expo-router";

import { ScreenContainer } from "@/components/screen-container";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useColors } from "@/hooks/use-colors";
import { CaseStorage, CaseInfo, CourtDate, CaseTodo, LegalContact } from "@/lib/case-storage";
import { addCourtDateToCalendar } from "@/lib/calendar-sync";
import { Alert } from "react-native";

export default function MyCaseScreen() {
  const router = useRouter();
  const colors = useColors();
  const [cases, setCases] = useState<CaseInfo[]>([]);
  const [upcomingDates, setUpcomingDates] = useState<CourtDate[]>([]);
  const [pendingTodos, setPendingTodos] = useState<CaseTodo[]>([]);
  const [contacts, setContacts] = useState<LegalContact[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      const [casesData, datesData, todosData, contactsData] = await Promise.all([
        CaseStorage.getCases(),
        CaseStorage.getUpcomingCourtDates(3),
        CaseStorage.getPendingTodos(5),
        CaseStorage.getContacts(),
      ]);
      setCases(casesData);
      setUpcomingDates(datesData);
      setPendingTodos(todosData);
      setContacts(contactsData);
    } catch (error) {
      console.error('Error loading case data:', error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [])
  );

  const onRefresh = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const getDaysUntil = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffTime = date.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getStatusColor = (status: CaseInfo['status']) => {
    switch (status) {
      case 'pending': return colors.warning;
      case 'active': return colors.primary;
      case 'resolved': return colors.success;
      case 'appealed': return colors.error;
      default: return colors.muted;
    }
  };

  const getPriorityColor = (priority: CaseTodo['priority']) => {
    switch (priority) {
      case 'high': return colors.error;
      case 'medium': return colors.warning;
      case 'low': return colors.muted;
      default: return colors.muted;
    }
  };

  const handleAddToCalendar = async (courtDate: CourtDate) => {
    const result = await addCourtDateToCalendar(courtDate);
    if (result.success) {
      Alert.alert(
        'Added to Calendar',
        Platform.OS === 'web' 
          ? 'Calendar file downloaded. Open it to add the event to your calendar.'
          : 'Court date has been added to your calendar with reminders set for 1 day and 1 hour before.',
        [{ text: 'OK' }]
      );
    } else {
      Alert.alert('Error', result.error || 'Failed to add to calendar');
    }
  };

  const getCourtTypeLabel = (type: CourtDate['type']) => {
    const labels: Record<CourtDate['type'], string> = {
      arraignment: 'Arraignment',
      pretrial: 'Pre-Trial',
      hearing: 'Hearing',
      trial: 'Trial',
      sentencing: 'Sentencing',
      other: 'Court Date',
    };
    return labels[type] || 'Court Date';
  };

  const quickActions = [
    { id: 'add-case', title: 'Add Case', icon: 'doc.text' as const, route: '/my-case/add-case' },
    { id: 'add-date', title: 'Add Court Date', icon: 'calendar' as const, route: '/my-case/add-court-date' },
    { id: 'add-contact', title: 'Add Contact', icon: 'person.fill' as const, route: '/my-case/add-contact' },
    { id: 'add-doc', title: 'Add Document', icon: 'doc.text' as const, route: '/my-case/add-document' },
  ];

  return (
    <ScreenContainer>
      <ScrollView 
        className="flex-1" 
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Header */}
        <View className="px-5 pt-4 pb-4 bg-surface flex-row items-center">
          <TouchableOpacity
            className="mr-3 p-1"
            onPress={() => router.back()}
            activeOpacity={0.7}
          >
            <IconSymbol name="chevron.left" size={24} color={colors.foreground} />
          </TouchableOpacity>
          <View className="flex-1">
            <Text className="text-xl font-bold text-foreground">My Case</Text>
            <Text className="text-sm text-muted">Track your legal matters securely</Text>
          </View>
          <TouchableOpacity
            className="w-10 h-10 rounded-full bg-primary/20 items-center justify-center mr-2"
            onPress={() => router.push('/notification-settings' as any)}
            activeOpacity={0.7}
          >
            <IconSymbol name="bell.fill" size={18} color={colors.primary} />
          </TouchableOpacity>
          <View className="w-10 h-10 rounded-full bg-primary/20 items-center justify-center">
            <IconSymbol name="shield.fill" size={20} color={colors.primary} />
          </View>
        </View>

        {/* Security Notice */}
        <View className="px-4 py-3">
          <View className="bg-success/10 rounded-xl p-3 border border-success/30 flex-row items-center">
            <IconSymbol name="checkmark.shield.fill" size={18} color={colors.success} />
            <Text className="flex-1 text-xs text-muted ml-2">
              Your data is stored securely on your device only. It is not uploaded to any server.
            </Text>
          </View>
        </View>

        {/* Quick Actions */}
        <View className="px-4 py-2">
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {quickActions.map((action) => (
              <TouchableOpacity
                key={action.id}
                className="bg-surface rounded-xl px-4 py-3 mr-3 border border-border flex-row items-center"
                onPress={() => router.push(action.route as any)}
                activeOpacity={0.7}
              >
                <View 
                  className="w-8 h-8 rounded-full items-center justify-center mr-2"
                  style={{ backgroundColor: colors.primary + '20' }}
                >
                  <IconSymbol name={action.icon} size={16} color={colors.primary} />
                </View>
                <Text className="text-sm font-medium text-foreground">{action.title}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* No Cases Yet */}
        {cases.length === 0 && !loading && (
          <View className="px-4 py-8">
            <View className="bg-surface rounded-xl p-6 border border-border items-center">
              <View 
                className="w-16 h-16 rounded-full items-center justify-center mb-4"
                style={{ backgroundColor: colors.primary + '20' }}
              >
                <IconSymbol name="doc.text" size={32} color={colors.primary} />
              </View>
              <Text className="text-lg font-semibold text-foreground mb-2">No Cases Yet</Text>
              <Text className="text-sm text-muted text-center mb-4">
                Start tracking your legal matters by adding your first case.
              </Text>
              <TouchableOpacity
                className="bg-primary rounded-xl px-6 py-3"
                onPress={() => router.push("/my-case/add-case" as any)}
                activeOpacity={0.7}
              >
                <Text className="text-white font-semibold">Add Your First Case</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Upcoming Court Dates */}
        {upcomingDates.length > 0 && (
          <View className="px-4 py-4">
            <View className="flex-row items-center justify-between mb-3 px-1">
              <Text className="text-lg font-semibold text-foreground">Upcoming Court Dates</Text>
              <TouchableOpacity
                onPress={() => router.push("/my-case/court-dates" as any)}
                activeOpacity={0.7}
              >
                <Text className="text-sm font-medium" style={{ color: colors.primary }}>View All</Text>
              </TouchableOpacity>
            </View>
            {upcomingDates.map((date) => {
              const daysUntil = getDaysUntil(date.date);
              const isUrgent = daysUntil <= 3;
              return (
                <TouchableOpacity
                  key={date.id}
                  className={`rounded-xl p-4 mb-3 border ${isUrgent ? 'bg-error/10 border-error/30' : 'bg-surface border-border'}`}
                  onPress={() => router.push(`/my-case/court-date/${date.id}` as any)}
                  activeOpacity={0.7}
                >
                  <View className="flex-row items-start">
                    <View 
                      className="w-12 h-12 rounded-xl items-center justify-center mr-3"
                      style={{ backgroundColor: isUrgent ? colors.error + '20' : colors.primary + '20' }}
                    >
                      <Text className="text-lg font-bold" style={{ color: isUrgent ? colors.error : colors.primary }}>
                        {new Date(date.date).getDate()}
                      </Text>
                      <Text className="text-xs" style={{ color: isUrgent ? colors.error : colors.primary }}>
                        {new Date(date.date).toLocaleDateString('en-US', { month: 'short' })}
                      </Text>
                    </View>
                    <View className="flex-1">
                      <Text className="text-base font-semibold text-foreground">{date.title}</Text>
                      <Text className="text-sm text-muted">{getCourtTypeLabel(date.type)} • {date.time}</Text>
                      <Text className="text-xs text-muted mt-1">{date.location}</Text>
                    </View>
                    <View className="items-end">
                      <View 
                        className="px-2 py-1 rounded-full mb-2"
                        style={{ backgroundColor: isUrgent ? colors.error + '20' : colors.warning + '20' }}
                      >
                        <Text 
                          className="text-xs font-semibold"
                          style={{ color: isUrgent ? colors.error : colors.warning }}
                        >
                          {daysUntil === 0 ? 'TODAY' : daysUntil === 1 ? 'TOMORROW' : `${daysUntil} DAYS`}
                        </Text>
                      </View>
                      <TouchableOpacity
                        className="flex-row items-center bg-primary/10 px-2 py-1 rounded-full"
                        onPress={(e) => {
                          e.stopPropagation();
                          handleAddToCalendar(date);
                        }}
                        activeOpacity={0.7}
                      >
                        <IconSymbol name="calendar" size={12} color={colors.primary} />
                        <Text className="text-xs font-medium ml-1" style={{ color: colors.primary }}>Add to Cal</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        )}

        {/* My Cases */}
        {cases.length > 0 && (
          <View className="px-4 py-4">
            <View className="flex-row items-center justify-between mb-3 px-1">
              <Text className="text-lg font-semibold text-foreground">My Cases</Text>
              <TouchableOpacity
                onPress={() => router.push("/my-case/cases" as any)}
                activeOpacity={0.7}
              >
                <Text className="text-sm font-medium" style={{ color: colors.primary }}>View All</Text>
              </TouchableOpacity>
            </View>
            {cases.slice(0, 3).map((caseItem) => (
              <TouchableOpacity
                key={caseItem.id}
                className="bg-surface rounded-xl p-4 mb-3 border border-border"
                onPress={() => router.push(`/my-case/case/${caseItem.id}` as any)}
                activeOpacity={0.7}
              >
                <View className="flex-row items-start justify-between mb-2">
                  <View className="flex-1">
                    <Text className="text-base font-semibold text-foreground">
                      Case #{caseItem.caseNumber || 'N/A'}
                    </Text>
                    {caseItem.docketNumber && (
                      <Text className="text-xs text-muted">Docket: {caseItem.docketNumber}</Text>
                    )}
                  </View>
                  <View 
                    className="px-2 py-1 rounded-full"
                    style={{ backgroundColor: getStatusColor(caseItem.status) + '20' }}
                  >
                    <Text 
                      className="text-xs font-semibold capitalize"
                      style={{ color: getStatusColor(caseItem.status) }}
                    >
                      {caseItem.status}
                    </Text>
                  </View>
                </View>
                {caseItem.charges.length > 0 && (
                  <Text className="text-sm text-muted mb-2" numberOfLines={1}>
                    {caseItem.charges.join(', ')}
                  </Text>
                )}
                <View className="flex-row items-center justify-between">
                  <View className="flex-row items-center flex-1">
                    <IconSymbol name="building.columns" size={14} color={colors.muted} />
                    <Text className="text-xs text-muted ml-1">{caseItem.courtName || 'Court not specified'}</Text>
                  </View>
                  <TouchableOpacity
                    className="bg-primary/10 px-3 py-1.5 rounded-lg flex-row items-center"
                    onPress={(e) => {
                      e.stopPropagation();
                      router.push(`/my-case/share-case?caseId=${caseItem.id}` as any);
                    }}
                    activeOpacity={0.7}
                  >
                    <IconSymbol name="qrcode" size={14} color={colors.primary} />
                    <Text className="text-xs font-medium ml-1" style={{ color: colors.primary }}>Share</Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Pending Tasks */}
        {pendingTodos.length > 0 && (
          <View className="px-4 py-4">
            <View className="flex-row items-center justify-between mb-3 px-1">
              <Text className="text-lg font-semibold text-foreground">To-Do</Text>
              <TouchableOpacity
                onPress={() => router.push("/my-case/todos" as any)}
                activeOpacity={0.7}
              >
                <Text className="text-sm font-medium" style={{ color: colors.primary }}>View All</Text>
              </TouchableOpacity>
            </View>
            <View className="bg-surface rounded-xl border border-border overflow-hidden">
              {pendingTodos.map((todo, index) => (
                <TouchableOpacity
                  key={todo.id}
                  className={`p-4 flex-row items-center ${index > 0 ? 'border-t border-border' : ''}`}
                  onPress={() => router.push(`/my-case/todo/${todo.id}` as any)}
                  activeOpacity={0.7}
                >
                  <View 
                    className="w-3 h-3 rounded-full mr-3"
                    style={{ backgroundColor: getPriorityColor(todo.priority) }}
                  />
                  <Text className="flex-1 text-sm text-foreground" numberOfLines={1}>{todo.task}</Text>
                  {todo.dueDate && (
                    <Text className="text-xs text-muted">{formatDate(todo.dueDate)}</Text>
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {/* Legal Contacts */}
        {contacts.length > 0 && (
          <View className="px-4 py-4">
            <View className="flex-row items-center justify-between mb-3 px-1">
              <Text className="text-lg font-semibold text-foreground">Legal Contacts</Text>
              <TouchableOpacity
                onPress={() => router.push("/my-case/contacts" as any)}
                activeOpacity={0.7}
              >
                <Text className="text-sm font-medium" style={{ color: colors.primary }}>View All</Text>
              </TouchableOpacity>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {contacts.slice(0, 4).map((contact) => (
                <TouchableOpacity
                  key={contact.id}
                  className="bg-surface rounded-xl p-4 mr-3 border border-border"
                  style={{ width: 160 }}
                  onPress={() => router.push(`/my-case/contact/${contact.id}` as any)}
                  activeOpacity={0.7}
                >
                  <View 
                    className="w-10 h-10 rounded-full items-center justify-center mb-2"
                    style={{ backgroundColor: colors.primary + '20' }}
                  >
                    <IconSymbol name="person.fill" size={20} color={colors.primary} />
                  </View>
                  <Text className="text-sm font-semibold text-foreground" numberOfLines={1}>{contact.name}</Text>
                  <Text className="text-xs text-muted capitalize">{contact.role.replace('_', ' ')}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}

        {/* More Options */}
        <View className="px-4 py-4">
          <Text className="text-lg font-semibold text-foreground mb-3 px-1">More</Text>
          <View className="flex-row flex-wrap">
            <TouchableOpacity
              className="bg-surface rounded-xl px-4 py-3 mr-2 mb-2 border border-border flex-row items-center"
              onPress={() => router.push("/my-case/documents" as any)}
              activeOpacity={0.7}
            >
              <IconSymbol name="doc.text" size={16} color={colors.primary} />
              <Text className="text-sm font-medium text-foreground ml-2">Documents</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="bg-surface rounded-xl px-4 py-3 mr-2 mb-2 border border-border flex-row items-center"
              onPress={() => router.push("/my-case/notes" as any)}
              activeOpacity={0.7}
            >
              <IconSymbol name="doc.text" size={16} color={colors.primary} />
              <Text className="text-sm font-medium text-foreground ml-2">Notes</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="bg-surface rounded-xl px-4 py-3 mr-2 mb-2 border border-border flex-row items-center"
              onPress={() => router.push("/my-case/timeline" as any)}
              activeOpacity={0.7}
            >
              <IconSymbol name="clock.arrow.circlepath" size={16} color={colors.primary} />
              <Text className="text-sm font-medium text-foreground ml-2">Timeline</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Ask AI */}
        <View className="px-4 py-4 mb-4">
          <TouchableOpacity
            className="bg-primary rounded-xl p-4 flex-row items-center justify-center"
            onPress={() => router.push("/assistant" as any)}
            activeOpacity={0.7}
          >
            <IconSymbol name="bubble.left.fill" size={20} color="#FFFFFF" />
            <Text className="text-white font-semibold ml-2">Ask AI About Your Case</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
