import { Ionicons } from '@expo/vector-icons';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { ProfileAvatar } from '@/components/kiki/profile-avatar';
import { ScreenContainer, ScreenHeader } from '@/components/kiki/screen-layout';
import { KikiColors, KikiRadius, KikiSpacing } from '@/constants/kiki-theme';
import { mockData } from '@/data';

export default function ProfileScreen() {
  const { app } = mockData;

  return (
    <ScreenContainer>
      <ScreenHeader
        title="Profile"
        rightAction={<Ionicons name="settings-outline" size={24} color={KikiColors.textSecondary} />}
      />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.profileSection}>
          <ProfileAvatar uri={app.userAvatar} flag={app.userFlag} size={100} />
          <Text style={styles.name}>{app.userName}</Text>
          <View style={styles.editButton}>
            <Text style={styles.editText}>Tap to edit</Text>
          </View>
        </View>

        <View style={styles.banner}>
          <Ionicons name="information-circle" size={20} color={KikiColors.infoBannerText} />
          <Text style={styles.bannerText}>
            Want to host? Click <Text style={styles.bannerLink}>here</Text> to get started
          </Text>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: KikiSpacing.lg,
    paddingBottom: KikiSpacing.xxl,
    gap: KikiSpacing.xl,
  },
  profileSection: {
    alignItems: 'center',
    gap: KikiSpacing.md,
    paddingTop: KikiSpacing.lg,
  },
  name: {
    fontSize: 24,
    fontWeight: '700',
    color: KikiColors.text,
  },
  editButton: {
    borderWidth: 1,
    borderColor: KikiColors.teal,
    borderRadius: KikiRadius.pill,
    paddingHorizontal: KikiSpacing.xl,
    paddingVertical: KikiSpacing.sm,
  },
  editText: {
    color: KikiColors.teal,
    fontSize: 15,
    fontWeight: '600',
  },
  banner: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: KikiSpacing.sm,
    backgroundColor: KikiColors.infoBanner,
    borderRadius: KikiRadius.lg,
    padding: KikiSpacing.lg,
  },
  bannerText: {
    flex: 1,
    fontSize: 14,
    color: KikiColors.infoBannerText,
    lineHeight: 20,
  },
  bannerLink: {
    textDecorationLine: 'underline',
    fontWeight: '600',
  },
});
