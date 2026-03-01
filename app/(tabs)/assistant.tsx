import { useState, useRef, useEffect } from "react";
import { ScrollView, Text, View, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, ActivityIndicator } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { ScreenContainer } from "@/components/screen-container";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useColors } from "@/hooks/use-colors";
import { trpc } from "@/lib/trpc";

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export default function AssistantScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const scrollViewRef = useRef<ScrollView>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const askAI = trpc.ai.askLegalQuestion.useMutation();

  const suggestedQuestions = [
    "What are my rights if denied medical care?",
    "How do I file a grievance?",
    "How does good time credit work?",
    "What is the difference between bail and bond?",
    "How do I request a public defender?",
    "What can I send in the mail to an inmate?",
  ];

  const scrollToBottom = () => {
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: text.trim(),
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    try {
      const response = await askAI.mutateAsync({ question: text.trim() });
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response.answer,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "I apologize, but I'm having trouble connecting right now. Please try again in a moment, or browse our Know Your Rights section for information.",
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearChat = () => {
    setMessages([]);
  };

  return (
    <ScreenContainer edges={["top", "left", "right"]}>
      <KeyboardAvoidingView 
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={0}
      >
        {/* Header */}
        <View className="px-5 pt-4 pb-3 bg-surface border-b border-border flex-row items-center justify-between">
          <View>
            <Text className="text-xl font-bold text-foreground">AI Legal Assistant</Text>
            <Text className="text-xs text-muted">Ask questions about rights & procedures</Text>
          </View>
          {messages.length > 0 && (
            <TouchableOpacity
              className="p-2"
              onPress={handleClearChat}
              activeOpacity={0.7}
            >
              <IconSymbol name="trash" size={20} color={colors.muted} />
            </TouchableOpacity>
          )}
        </View>

        {/* Disclaimer Banner */}
        <View className="px-4 py-2 bg-warning/10 border-b border-warning/30">
          <View className="flex-row items-center">
            <IconSymbol name="exclamationmark.triangle" size={14} color={colors.warning} />
            <Text className="flex-1 text-xs text-foreground ml-2">
              AI responses are for educational purposes only and do not constitute legal advice.
            </Text>
          </View>
        </View>

        {/* Messages */}
        <ScrollView 
          ref={scrollViewRef}
          className="flex-1 px-4"
          contentContainerStyle={{ paddingVertical: 16 }}
          showsVerticalScrollIndicator={false}
        >
          {messages.length === 0 ? (
            <View className="flex-1">
              {/* Welcome Message */}
              <View className="items-center py-6">
                <View 
                  className="w-16 h-16 rounded-full items-center justify-center mb-4"
                  style={{ backgroundColor: colors.primary + '20' }}
                >
                  <IconSymbol name="bubble.left.fill" size={32} color={colors.primary} />
                </View>
                <Text className="text-lg font-semibold text-foreground text-center mb-2">
                  How can I help you today?
                </Text>
                <Text className="text-sm text-muted text-center px-8">
                  Ask me about your rights, legal procedures, or how to navigate the justice system.
                </Text>
              </View>

              {/* Suggested Questions */}
              <View className="mt-4">
                <Text className="text-sm font-medium text-muted mb-3 px-1">Suggested Questions</Text>
                {suggestedQuestions.map((question, index) => (
                  <TouchableOpacity
                    key={index}
                    className="bg-surface rounded-xl p-4 mb-2 border border-border flex-row items-center"
                    onPress={() => handleSend(question)}
                    activeOpacity={0.7}
                  >
                    <IconSymbol name="questionmark.circle" size={18} color={colors.primary} />
                    <Text className="flex-1 text-sm text-foreground ml-3">{question}</Text>
                    <IconSymbol name="paperplane.fill" size={16} color={colors.muted} />
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          ) : (
            <>
              {messages.map((message) => (
                <View
                  key={message.id}
                  className={`mb-4 ${message.role === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <View
                    className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                      message.role === 'user' 
                        ? 'rounded-br-sm' 
                        : 'rounded-bl-sm bg-surface border border-border'
                    }`}
                    style={{
                      backgroundColor: message.role === 'user' ? colors.primary : colors.surface,
                    }}
                  >
                    <Text 
                      className={`text-base leading-relaxed ${
                        message.role === 'user' ? 'text-white' : 'text-foreground'
                      }`}
                    >
                      {message.content}
                    </Text>
                  </View>
                  <Text className="text-xs text-muted mt-1 px-1">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </Text>
                </View>
              ))}
              {isLoading && (
                <View className="items-start mb-4">
                  <View className="bg-surface rounded-2xl rounded-bl-sm px-4 py-3 border border-border flex-row items-center">
                    <ActivityIndicator size="small" color={colors.primary} />
                    <Text className="text-sm text-muted ml-2">Thinking...</Text>
                  </View>
                </View>
              )}
            </>
          )}
        </ScrollView>

        {/* Input Area */}
        <View 
          className="px-4 py-3 bg-surface border-t border-border"
          style={{ paddingBottom: Math.max(insets.bottom, 12) }}
        >
          <View className="flex-row items-end">
            <View className="flex-1 bg-background rounded-2xl border border-border overflow-hidden mr-2">
              <TextInput
                className="px-4 py-3 text-base text-foreground max-h-24"
                placeholder="Ask a legal question..."
                placeholderTextColor={colors.muted}
                value={inputText}
                onChangeText={setInputText}
                multiline
                returnKeyType="default"
                editable={!isLoading}
              />
            </View>
            <TouchableOpacity
              className="w-12 h-12 rounded-full items-center justify-center"
              style={{ 
                backgroundColor: inputText.trim() && !isLoading ? colors.primary : colors.muted + '40' 
              }}
              onPress={() => handleSend(inputText)}
              disabled={!inputText.trim() || isLoading}
              activeOpacity={0.7}
            >
              <IconSymbol 
                name="paperplane.fill" 
                size={20} 
                color={inputText.trim() && !isLoading ? '#FFFFFF' : colors.muted} 
              />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </ScreenContainer>
  );
}
