import { StyleSheet, Text, View } from 'react-native';

import { KikiColors, KikiRadius, KikiSpacing } from '@/constants/kiki-theme';
import type { ChatMessage } from '@/data';

type ChatBubbleProps = {
  message: ChatMessage;
};

export function ChatBubble({ message }: ChatBubbleProps) {
  return (
    <View style={[styles.row, message.isMe ? styles.rowMe : styles.rowThem]}>
      <View style={[styles.bubble, message.isMe ? styles.bubbleMe : styles.bubbleThem]}>
        {!message.isMe ? <Text style={styles.sender}>{message.sender}</Text> : null}
        <Text style={[styles.body, message.isMe && styles.bodyMe]}>{message.body}</Text>
        <Text style={[styles.time, message.isMe && styles.timeMe]}>{message.sentAt}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    marginBottom: KikiSpacing.sm,
  },
  rowMe: {
    alignItems: 'flex-end',
  },
  rowThem: {
    alignItems: 'flex-start',
  },
  bubble: {
    maxWidth: '82%',
    borderRadius: KikiRadius.lg,
    paddingHorizontal: KikiSpacing.md,
    paddingVertical: KikiSpacing.sm,
    gap: 4,
  },
  bubbleMe: {
    backgroundColor: KikiColors.teal,
    borderBottomRightRadius: KikiRadius.sm,
  },
  bubbleThem: {
    backgroundColor: KikiColors.white,
    borderWidth: 1,
    borderColor: KikiColors.border,
    borderBottomLeftRadius: KikiRadius.sm,
  },
  sender: {
    fontSize: 12,
    fontWeight: '600',
    color: KikiColors.teal,
  },
  body: {
    fontSize: 15,
    lineHeight: 21,
    color: KikiColors.text,
  },
  bodyMe: {
    color: KikiColors.white,
  },
  time: {
    fontSize: 11,
    color: KikiColors.textMuted,
    alignSelf: 'flex-end',
  },
  timeMe: {
    color: 'rgba(255,255,255,0.85)',
  },
});
