import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { KikiColors, KikiRadius, KikiSpacing } from '@/constants/kiki-theme';

type ConversationReplyBarProps = {
  value: string;
  onChangeText: (text: string) => void;
  onSend: () => void;
};

export function ConversationReplyBar({ value, onChangeText, onSend }: ConversationReplyBarProps) {
  const insets = useSafeAreaInsets();
  const canSend = value.trim().length > 0;

  return (
    <View style={[styles.container, { paddingBottom: Math.max(insets.bottom, KikiSpacing.sm) }]}>
      <View style={styles.inputWrap}>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder="Write a reply..."
          placeholderTextColor={KikiColors.textMuted}
          style={styles.input}
          multiline
          maxLength={500}
        />
      </View>
      <Pressable
        onPress={onSend}
        disabled={!canSend}
        style={[styles.sendButton, canSend && styles.sendButtonActive]}>
        <Ionicons name="send" size={18} color={canSend ? KikiColors.white : KikiColors.textMuted} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: KikiSpacing.sm,
    paddingHorizontal: KikiSpacing.lg,
    paddingTop: KikiSpacing.sm,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: KikiColors.border,
    backgroundColor: KikiColors.white,
  },
  inputWrap: {
    flex: 1,
    borderWidth: 1,
    borderColor: KikiColors.border,
    borderRadius: KikiRadius.lg,
    paddingHorizontal: KikiSpacing.md,
    paddingVertical: 10,
    backgroundColor: KikiColors.screenBackground,
    maxHeight: 120,
  },
  input: {
    fontSize: 15,
    color: KikiColors.text,
    minHeight: 22,
  },
  sendButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: KikiColors.border,
  },
  sendButtonActive: {
    backgroundColor: KikiColors.teal,
  },
});
