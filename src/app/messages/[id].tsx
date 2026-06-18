import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useMemo, useRef, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ChatBubble } from '@/components/kiki/chat-bubble';
import { ConversationReplyBar } from '@/components/kiki/conversation-reply-bar';
import { KikiColors, KikiSpacing } from '@/constants/kiki-theme';
import {
  getChatMessagesForThread,
  getMessageThread,
  mockData,
  type ChatMessage,
} from '@/data';

export default function ConversationScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams<{ id: string }>();
  const scrollRef = useRef<ScrollView>(null);

  const thread = getMessageThread(mockData.messages, id ?? '');
  const initialMessages = useMemo(
    () => getChatMessagesForThread(mockData.chatMessages, id ?? ''),
    [id],
  );

  const [replyText, setReplyText] = useState('');
  const [localMessages, setLocalMessages] = useState<ChatMessage[]>([]);

  const allMessages = useMemo(
    () => [...initialMessages, ...localMessages],
    [initialMessages, localMessages],
  );

  if (!thread) {
    return (
      <View style={styles.notFound}>
        <Text style={styles.notFoundText}>Conversation not found</Text>
        <Pressable onPress={() => router.back()}>
          <Text style={styles.backLink}>Go back</Text>
        </Pressable>
      </View>
    );
  }

  const handleSend = () => {
    const trimmed = replyText.trim();
    if (!trimmed) {
      return;
    }

    const newMessage: ChatMessage = {
      id: `local-${Date.now()}`,
      threadId: thread.id,
      sender: mockData.app.userName,
      isMe: true,
      body: trimmed,
      sentAt: 'Just now',
    };

    setLocalMessages((current) => [...current, newMessage]);
    setReplyText('');

    requestAnimationFrame(() => {
      scrollRef.current?.scrollToEnd({ animated: true });
    });
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />

      <View style={[styles.header, { paddingTop: insets.top + KikiSpacing.sm }]}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color={KikiColors.text} />
        </Pressable>
        <Image source={{ uri: thread.contactAvatar }} style={styles.avatar} contentFit="cover" />
        <View style={styles.headerText}>
          <Text style={styles.name} numberOfLines={1}>
            {thread.contactName}
          </Text>
          {thread.listingTitle ? (
            <Text style={styles.listing} numberOfLines={1}>
              {thread.listingTitle}
            </Text>
          ) : null}
        </View>
      </View>

      <KeyboardAvoidingView
        style={styles.body}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={0}>
        <ScrollView
          ref={scrollRef}
          style={styles.messages}
          contentContainerStyle={styles.messagesContent}
          showsVerticalScrollIndicator={false}
          onContentSizeChange={() => scrollRef.current?.scrollToEnd({ animated: false })}>
          {allMessages.map((message) => (
            <ChatBubble key={message.id} message={message} />
          ))}
        </ScrollView>

        <ConversationReplyBar value={replyText} onChangeText={setReplyText} onSend={handleSend} />
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: KikiColors.screenBackground,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: KikiSpacing.md,
    paddingHorizontal: KikiSpacing.lg,
    paddingBottom: KikiSpacing.md,
    backgroundColor: KikiColors.white,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: KikiColors.border,
  },
  backButton: {
    marginLeft: -KikiSpacing.sm,
    padding: KikiSpacing.sm,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  headerText: {
    flex: 1,
    gap: 2,
  },
  name: {
    fontSize: 17,
    fontWeight: '700',
    color: KikiColors.text,
  },
  listing: {
    fontSize: 13,
    color: KikiColors.teal,
    fontWeight: '500',
  },
  body: {
    flex: 1,
  },
  messages: {
    flex: 1,
  },
  messagesContent: {
    padding: KikiSpacing.lg,
    paddingBottom: KikiSpacing.xl,
  },
  notFound: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: KikiSpacing.md,
  },
  notFoundText: {
    fontSize: 16,
    color: KikiColors.textSecondary,
  },
  backLink: {
    fontSize: 15,
    color: KikiColors.teal,
    fontWeight: '600',
  },
});
