import { useState, useCallback, useEffect } from "react";
import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Alert,
  Modal,
} from "react-native";
import { useRouter, useFocusEffect } from "expo-router";

import { ScreenContainer } from "@/components/screen-container";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useColors } from "@/hooks/use-colors";
import {
  DocumentWallet,
  WalletDocument,
  DocumentCategory,
  DOCUMENT_CATEGORIES,
} from "@/lib/document-wallet";

// ---- Add / Edit Modal ----

interface DocFormProps {
  visible: boolean;
  initial: Partial<WalletDocument> | null;
  onSave: (data: Omit<WalletDocument, "id" | "createdAt" | "updatedAt">) => void;
  onClose: () => void;
}

function DocFormModal({ visible, initial, onSave, onClose }: DocFormProps) {
  const colors = useColors();
  const [title, setTitle] = useState(initial?.title ?? "");
  const [category, setCategory] = useState<DocumentCategory>(initial?.category ?? "other");
  const [description, setDescription] = useState(initial?.description ?? "");
  const [caseNumber, setCaseNumber] = useState(initial?.caseNumber ?? "");
  const [dateIssued, setDateIssued] = useState(initial?.dateIssued ?? "");
  const [notes, setNotes] = useState(initial?.notes ?? "");

  // Sync form fields when editing a different document
  useEffect(() => {
    setTitle(initial?.title ?? "");
    setCategory(initial?.category ?? "other");
    setDescription(initial?.description ?? "");
    setCaseNumber(initial?.caseNumber ?? "");
    setDateIssued(initial?.dateIssued ?? "");
    setNotes(initial?.notes ?? "");
  }, [initial]);

  const handleSave = () => {
    if (!title.trim()) {
      Alert.alert("Required", "Please enter a document title.");
      return;
    }
    onSave({
      title: title.trim(),
      category,
      description: description.trim(),
      caseNumber: caseNumber.trim(),
      dateIssued: dateIssued.trim(),
      notes: notes.trim(),
      isPinned: initial?.isPinned ?? false,
    });
  };

  return (
    <Modal visible={visible} animationType="slide" presentationStyle="pageSheet" onRequestClose={onClose}>
      <View className="flex-1 bg-background">
        {/* Header */}
        <View
          className="flex-row items-center justify-between px-5 pt-6 pb-4 bg-surface border-b border-border"
        >
          <TouchableOpacity onPress={onClose} activeOpacity={0.7}>
            <Text className="text-base" style={{ color: colors.muted }}>Cancel</Text>
          </TouchableOpacity>
          <Text className="text-lg font-bold text-foreground">
            {initial?.id ? "Edit Document" : "Add Document"}
          </Text>
          <TouchableOpacity onPress={handleSave} activeOpacity={0.7}>
            <Text className="text-base font-semibold" style={{ color: colors.primary }}>Save</Text>
          </TouchableOpacity>
        </View>

        <ScrollView className="flex-1 px-5" contentContainerStyle={{ paddingBottom: 40 }}>
          {/* Title */}
          <Text className="text-sm font-semibold text-foreground mt-5 mb-1">Document Title *</Text>
          <TextInput
            className="bg-surface rounded-xl px-4 py-3 text-base text-foreground border border-border"
            placeholder="e.g. Affidavit of John Smith"
            placeholderTextColor={colors.muted}
            value={title}
            onChangeText={setTitle}
          />

          {/* Category */}
          <Text className="text-sm font-semibold text-foreground mt-4 mb-2">Category *</Text>
          <View className="flex-row flex-wrap">
            {DOCUMENT_CATEGORIES.map((cat) => (
              <TouchableOpacity
                key={cat.id}
                className="px-3 py-2 rounded-full mr-2 mb-2 border"
                style={{
                  backgroundColor: category === cat.id ? colors.primary : colors.surface,
                  borderColor: category === cat.id ? colors.primary : colors.border,
                }}
                onPress={() => setCategory(cat.id)}
                activeOpacity={0.7}
              >
                <Text
                  className="text-sm font-medium"
                  style={{ color: category === cat.id ? "#FFFFFF" : colors.foreground }}
                >
                  {cat.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Description */}
          <Text className="text-sm font-semibold text-foreground mt-4 mb-1">Description</Text>
          <TextInput
            className="bg-surface rounded-xl px-4 py-3 text-base text-foreground border border-border"
            placeholder="Brief description of this document"
            placeholderTextColor={colors.muted}
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={3}
          />

          {/* Case Number */}
          <Text className="text-sm font-semibold text-foreground mt-4 mb-1">Case / Docket Number</Text>
          <TextInput
            className="bg-surface rounded-xl px-4 py-3 text-base text-foreground border border-border"
            placeholder="Optional"
            placeholderTextColor={colors.muted}
            value={caseNumber}
            onChangeText={setCaseNumber}
          />

          {/* Date Issued */}
          <Text className="text-sm font-semibold text-foreground mt-4 mb-1">Date Issued</Text>
          <TextInput
            className="bg-surface rounded-xl px-4 py-3 text-base text-foreground border border-border"
            placeholder="MM/DD/YYYY"
            placeholderTextColor={colors.muted}
            value={dateIssued}
            onChangeText={setDateIssued}
          />

          {/* Notes */}
          <Text className="text-sm font-semibold text-foreground mt-4 mb-1">Notes</Text>
          <TextInput
            className="bg-surface rounded-xl px-4 py-3 text-base text-foreground border border-border"
            placeholder="Any additional notes"
            placeholderTextColor={colors.muted}
            value={notes}
            onChangeText={setNotes}
            multiline
            numberOfLines={3}
          />

          {/* Disclaimer */}
          <View className="mt-6 bg-surface rounded-xl p-4 border border-border">
            <View className="flex-row items-start">
              <IconSymbol name="info.circle" size={16} color={colors.muted} style={{ marginTop: 2 }} />
              <Text className="flex-1 text-xs text-muted ml-2 leading-relaxed">
                This stores document metadata only. No files are uploaded. All data is saved locally
                on your device and is never sent to any server.
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
}

// ---- Main Screen ----

export default function DocumentWalletScreen() {
  const router = useRouter();
  const colors = useColors();
  const [documents, setDocuments] = useState<WalletDocument[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<DocumentCategory | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingDoc, setEditingDoc] = useState<WalletDocument | null>(null);

  const loadDocuments = useCallback(async () => {
    const docs = await DocumentWallet.getDocuments(selectedCategory ?? undefined);
    setDocuments(docs);
  }, [selectedCategory]);

  useFocusEffect(
    useCallback(() => {
      loadDocuments();
    }, [loadDocuments])
  );

  const handleSave = async (
    data: Omit<WalletDocument, "id" | "createdAt" | "updatedAt">
  ) => {
    if (editingDoc) {
      await DocumentWallet.updateDocument(editingDoc.id, data);
    } else {
      await DocumentWallet.addDocument(data);
    }
    setModalVisible(false);
    setEditingDoc(null);
    loadDocuments();
  };

  const handleEdit = (doc: WalletDocument) => {
    setEditingDoc(doc);
    setModalVisible(true);
  };

  const handleDelete = (doc: WalletDocument) => {
    Alert.alert(
      "Delete Document",
      `Remove "${doc.title}" from your wallet?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            await DocumentWallet.deleteDocument(doc.id);
            loadDocuments();
          },
        },
      ]
    );
  };

  const handlePin = async (doc: WalletDocument) => {
    if (doc.isPinned) {
      await DocumentWallet.unpinAffidavit();
    } else {
      await DocumentWallet.pinAffidavit(doc.id);
    }
    loadDocuments();
  };

  const getCategoryInfo = (id: DocumentCategory) =>
    DOCUMENT_CATEGORIES.find((c) => c.id === id)!;

  const filteredDocs = selectedCategory
    ? documents.filter((d) => d.category === selectedCategory)
    : documents;

  return (
    <ScreenContainer>
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View className="px-5 pt-4 pb-4 bg-surface flex-row items-center">
          <TouchableOpacity className="mr-3 p-1" onPress={() => router.back()} activeOpacity={0.7}>
            <IconSymbol name="chevron.left" size={24} color={colors.foreground} />
          </TouchableOpacity>
          <View className="flex-1">
            <Text className="text-xl font-bold text-foreground">Document Wallet</Text>
            <Text className="text-sm text-muted">Store & organize your legal documents</Text>
          </View>
          <TouchableOpacity
            className="w-10 h-10 rounded-full items-center justify-center"
            style={{ backgroundColor: colors.primary + "20" }}
            onPress={() => {
              setEditingDoc(null);
              setModalVisible(true);
            }}
            activeOpacity={0.7}
          >
            <IconSymbol name="plus" size={22} color={colors.primary} />
          </TouchableOpacity>
        </View>

        {/* Privacy Notice */}
        <View className="px-4 py-3">
          <View className="bg-success/10 rounded-xl p-3 border border-success/30 flex-row items-center">
            <IconSymbol name="checkmark.shield.fill" size={18} color={colors.success} />
            <Text className="flex-1 text-xs text-muted ml-2">
              All document metadata is stored securely on your device only.
            </Text>
          </View>
        </View>

        {/* Category Filters */}
        <View className="px-4 py-2">
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <TouchableOpacity
              className="px-4 py-2 rounded-full mr-2 border"
              style={{
                backgroundColor: selectedCategory === null ? colors.primary : colors.surface,
                borderColor: selectedCategory === null ? colors.primary : colors.border,
              }}
              onPress={() => setSelectedCategory(null)}
              activeOpacity={0.7}
            >
              <Text
                className="text-sm font-medium"
                style={{ color: selectedCategory === null ? "#FFFFFF" : colors.foreground }}
              >
                All ({documents.length})
              </Text>
            </TouchableOpacity>
            {DOCUMENT_CATEGORIES.map((cat) => {
              const count = documents.filter((d) => d.category === cat.id).length;
              return (
                <TouchableOpacity
                  key={cat.id}
                  className="px-4 py-2 rounded-full mr-2 border"
                  style={{
                    backgroundColor: selectedCategory === cat.id ? colors.primary : colors.surface,
                    borderColor: selectedCategory === cat.id ? colors.primary : colors.border,
                  }}
                  onPress={() =>
                    setSelectedCategory(selectedCategory === cat.id ? null : cat.id)
                  }
                  activeOpacity={0.7}
                >
                  <Text
                    className="text-sm font-medium"
                    style={{
                      color: selectedCategory === cat.id ? "#FFFFFF" : colors.foreground,
                    }}
                  >
                    {cat.label} ({count})
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* Document List */}
        <View className="px-4 py-4">
          {filteredDocs.length === 0 ? (
            <View className="bg-surface rounded-xl p-8 border border-border items-center">
              <View
                className="w-16 h-16 rounded-full items-center justify-center mb-4"
                style={{ backgroundColor: colors.primary + "20" }}
              >
                <IconSymbol name="folder.fill" size={32} color={colors.primary} />
              </View>
              <Text className="text-base font-semibold text-foreground mb-2">No Documents Yet</Text>
              <Text className="text-sm text-muted text-center mb-4">
                Add document metadata to keep your legal papers organized.
              </Text>
              <TouchableOpacity
                className="px-6 py-3 rounded-xl"
                style={{ backgroundColor: colors.primary }}
                onPress={() => {
                  setEditingDoc(null);
                  setModalVisible(true);
                }}
                activeOpacity={0.7}
              >
                <Text className="text-white font-semibold">Add Your First Document</Text>
              </TouchableOpacity>
            </View>
          ) : (
            filteredDocs.map((doc) => {
              const catInfo = getCategoryInfo(doc.category);
              return (
                <View
                  key={doc.id}
                  className="bg-surface rounded-xl p-4 mb-3 border border-border"
                >
                  <View className="flex-row items-start">
                    <View
                      className="w-10 h-10 rounded-full items-center justify-center mr-3"
                      style={{ backgroundColor: colors.primary + "20" }}
                    >
                      <IconSymbol name={catInfo.icon as any} size={20} color={colors.primary} />
                    </View>
                    <View className="flex-1">
                      <View className="flex-row items-center flex-wrap mb-1">
                        <View
                          className="px-2 py-0.5 rounded-full mr-2"
                          style={{ backgroundColor: colors.muted + "30" }}
                        >
                          <Text className="text-xs text-muted">{catInfo.label}</Text>
                        </View>
                        {doc.isPinned && (
                          <View
                            className="px-2 py-0.5 rounded-full"
                            style={{ backgroundColor: colors.primary + "30" }}
                          >
                            <Text className="text-xs font-semibold" style={{ color: colors.primary }}>
                              📌 Pinned
                            </Text>
                          </View>
                        )}
                      </View>
                      <Text className="text-base font-semibold text-foreground mb-1">{doc.title}</Text>
                      {doc.description ? (
                        <Text className="text-sm text-muted mb-1" numberOfLines={2}>
                          {doc.description}
                        </Text>
                      ) : null}
                      {doc.caseNumber ? (
                        <Text className="text-xs text-muted">Case: {doc.caseNumber}</Text>
                      ) : null}
                      {doc.dateIssued ? (
                        <Text className="text-xs text-muted">Date: {doc.dateIssued}</Text>
                      ) : null}
                    </View>
                  </View>

                  {/* Actions */}
                  <View className="flex-row mt-3 pt-3 border-t border-border">
                    {doc.category === "affidavit" && (
                      <TouchableOpacity
                        className="flex-row items-center px-3 py-1.5 rounded-lg mr-2"
                        style={{
                          backgroundColor: doc.isPinned
                            ? colors.primary + "20"
                            : colors.surface,
                          borderWidth: 1,
                          borderColor: doc.isPinned ? colors.primary : colors.border,
                        }}
                        onPress={() => handlePin(doc)}
                        activeOpacity={0.7}
                      >
                        <IconSymbol
                          name="pin.fill"
                          size={14}
                          color={doc.isPinned ? colors.primary : colors.muted}
                        />
                        <Text
                          className="text-xs font-medium ml-1"
                          style={{ color: doc.isPinned ? colors.primary : colors.muted }}
                        >
                          {doc.isPinned ? "Unpin" : "Pin to Home"}
                        </Text>
                      </TouchableOpacity>
                    )}
                    <TouchableOpacity
                      className="flex-row items-center px-3 py-1.5 rounded-lg mr-2 border border-border"
                      onPress={() => handleEdit(doc)}
                      activeOpacity={0.7}
                    >
                      <IconSymbol name="pencil" size={14} color={colors.muted} />
                      <Text className="text-xs font-medium text-muted ml-1">Edit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      className="flex-row items-center px-3 py-1.5 rounded-lg border"
                      style={{ borderColor: colors.error + "50" }}
                      onPress={() => handleDelete(doc)}
                      activeOpacity={0.7}
                    >
                      <IconSymbol name="trash" size={14} color={colors.error} />
                      <Text className="text-xs font-medium ml-1" style={{ color: colors.error }}>
                        Delete
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              );
            })
          )}
        </View>

        {/* Category Quick-Add Reference */}
        {documents.length > 0 && (
          <View className="px-4 py-4">
            <Text className="text-base font-semibold text-foreground mb-3 px-1">Document Categories</Text>
            <View className="flex-row flex-wrap">
              {DOCUMENT_CATEGORIES.map((cat) => (
                <View
                  key={cat.id}
                  className="bg-surface rounded-xl p-3 mr-2 mb-2 border border-border"
                  style={{ minWidth: "47%" }}
                >
                  <View className="flex-row items-center mb-1">
                    <IconSymbol name={cat.icon as any} size={16} color={colors.primary} />
                    <Text className="text-sm font-semibold text-foreground ml-2">{cat.label}</Text>
                  </View>
                  <Text className="text-xs text-muted">{cat.description}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Disclaimer */}
        <View className="px-4 py-4 mb-4">
          <View className="bg-surface rounded-xl p-4 border border-border">
            <View className="flex-row items-start">
              <IconSymbol name="info.circle" size={18} color={colors.muted} style={{ marginTop: 2 }} />
              <Text className="flex-1 text-xs text-muted ml-2 leading-relaxed">
                This wallet stores document metadata (titles, notes, dates) only. No files are
                uploaded or stored. This is an educational organizational tool and does not
                constitute legal advice. Consult an attorney for legal guidance.
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Add / Edit Modal */}
      <DocFormModal
        visible={modalVisible}
        initial={editingDoc}
        onSave={handleSave}
        onClose={() => {
          setModalVisible(false);
          setEditingDoc(null);
        }}
      />
    </ScreenContainer>
  );
}
