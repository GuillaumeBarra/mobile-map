import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { KikiColors, KikiSpacing } from '@/constants/kiki-theme';
import type { Message } from '@/data';

type MessageThreadRowProps = {
  message: Message;
  onPress?: () => void;
};

export function MessageThreadRow({ message, onPress }: MessageThreadRowProps) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.row, pressed && styles.rowPressed]}>
      <Image source={{ uri: message.contactAvatar }} style={styles.avatar} contentFit="cover" />
      <View style={styles.content}>
        <View style={styles.topLine}>
          <Text style={[styles.name, message.unread && styles.unreadText]} numberOfLines={1}>
            {message.contactName}
          </Text>
          <Text style={[styles.time, message.unread && styles.unreadTime]}>{message.timestamp}</Text>
        </View>
        {message.listingTitle ? (
          <Text style={styles.listing} numberOfLines={1}>
            {message.listingTitle}
          </Text>
        ) : null}
        <View style={styles.previewRow}>
          <Text
            style={[styles.preview, message.unread && styles.unreadPreview]}
            numberOfLines={2}>
            {message.lastMessage}
          </Text>
          {message.unread ? <View style={styles.unreadDot} /> : null}
        </View>
      </View>
      <Ionicons name="chevron-forward" size={16} color={KikiColors.textMuted} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: KikiSpacing.md,
    paddingVertical: KikiSpacing.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: KikiColors.border,
  },
  rowPressed: {
    opacity: 0.7,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
  },
  content: {
    flex: 1,
    gap: 2,
  },
  topLine: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: KikiSpacing.sm,
  },
  name: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: KikiColors.text,
  },
  unreadText: {
    fontWeight: '700',
  },
  time: {
    fontSize: 13,
    color: KikiColors.textMuted,
  },
  unreadTime: {
    color: KikiColors.teal,
    fontWeight: '600',
  },
  listing: {
    fontSize: 13,
    color: KikiColors.teal,
    fontWeight: '500',
  },
  previewRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: KikiSpacing.sm,
  },
  preview: {
    flex: 1,
    fontSize: 14,
    color: KikiColors.textSecondary,
    lineHeight: 19,
  },
  unreadPreview: {
    color: KikiColors.text,
  },
  unreadDot: {
    width: 9,
    height: 9,
    borderRadius: 5,
    backgroundColor: KikiColors.teal,
    marginTop: 5,
  },
});
