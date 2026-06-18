import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';

import { ScreenContainer, ScreenHeader } from '@/components/kiki/screen-layout';
import { KikiColors, KikiSpacing } from '@/constants/kiki-theme';

export default function NotificationsScreen() {
  return (
    <ScreenContainer>
      <ScreenHeader title="Notifications" />
      <Text style={styles.markRead}>Mark all as read</Text>

      <View style={styles.emptyState}>
        <View style={styles.iconCircle}>
          <Ionicons name="notifications-outline" size={32} color={KikiColors.textSecondary} />
        </View>
        <Text style={styles.emptyText}>You&apos;re all up to date</Text>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  markRead: {
    paddingHorizontal: KikiSpacing.lg,
    fontSize: 14,
    color: KikiColors.textMuted,
    marginBottom: KikiSpacing.lg,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: KikiSpacing.lg,
    paddingBottom: 80,
  },
  iconCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: KikiColors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: KikiColors.textSecondary,
    fontWeight: '500',
  },
});
