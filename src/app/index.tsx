import { Ionicons } from '@expo/vector-icons';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import {
  InviteCard,
  NetworkSection,
  RewardCard,
  WaitlistCard,
} from '@/components/kiki/community-sections';
import { ScreenContainer } from '@/components/kiki/screen-layout';
import { KikiColors, KikiRadius, KikiSpacing } from '@/constants/kiki-theme';
import { mockData } from '@/data';

export default function CommunityScreen() {
  const { app, friends } = mockData;
  const displayedFriends = friends.slice(0, app.networkCount);

  return (
    <ScreenContainer>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}>
        <InviteCard app={app} />
        <WaitlistCard count={app.waitlistCount} />

        <View style={styles.rewardsHeader}>
          <View style={styles.rewardsTitleRow}>
            <Text style={styles.rewardsTitle}>Invite friends, win prizes</Text>
            <Ionicons name="information-circle-outline" size={20} color={KikiColors.teal} />
          </View>
          <Text style={styles.rewardsSubtitle}>
            Just a lil something to say thank youuu for helping us build a more trusted community
          </Text>
        </View>

        <RewardCard app={app} userAvatar={app.userAvatar} />

        <View style={styles.journeyButton}>
          <Text style={styles.journeyText}>See reward journey</Text>
          <Ionicons name="chevron-down" size={18} color={KikiColors.teal} />
        </View>

        <NetworkSection friends={displayedFriends} count={app.networkCount} />
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: KikiSpacing.lg,
    gap: KikiSpacing.lg,
    paddingBottom: KikiSpacing.xxl,
  },
  rewardsHeader: {
    gap: KikiSpacing.sm,
  },
  rewardsTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rewardsTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: KikiColors.teal,
    flex: 1,
  },
  rewardsSubtitle: {
    fontSize: 14,
    color: KikiColors.teal,
    lineHeight: 20,
  },
  journeyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: KikiSpacing.sm,
    borderWidth: 1,
    borderColor: KikiColors.border,
    borderRadius: KikiRadius.lg,
    paddingVertical: KikiSpacing.md,
    backgroundColor: KikiColors.white,
  },
  journeyText: {
    fontSize: 15,
    color: KikiColors.teal,
    fontWeight: '600',
  },
});
