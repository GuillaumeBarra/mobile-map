import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { StyleSheet, Text, View } from 'react-native';

import { KikiColors, KikiRadius, KikiSpacing } from '@/constants/kiki-theme';
import type { AppConfig, Friend } from '@/data';

import { ProfileAvatar } from './profile-avatar';

type InviteCardProps = {
  app: AppConfig;
};

export function InviteCard({ app }: InviteCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.headerLabel}>Invite a Friend</Text>
        <Text style={styles.headerLabel}>{app.invitesLeft} invites left</Text>
      </View>
      <View style={styles.codeRow}>
        <Text style={styles.code}>{app.inviteCode}</Text>
        <Ionicons name="copy-outline" size={22} color={KikiColors.teal} />
      </View>
      <Text style={styles.link}>How do invite codes work?</Text>
    </View>
  );
}

type WaitlistCardProps = {
  count: number;
};

export function WaitlistCard({ count }: WaitlistCardProps) {
  return (
    <View style={styles.waitlistCard}>
      <Text style={styles.waitlistText}>
        <Text style={styles.waitlistHighlight}>{count} people</Text> are waiting to get into the club
      </Text>
    </View>
  );
}

type RewardCardProps = {
  app: AppConfig;
  userAvatar: string;
};

export function RewardCard({ app, userAvatar }: RewardCardProps) {
  const progress = app.rewardGoal > 0 ? app.rewardProgress / app.rewardGoal : 0;

  return (
    <View style={styles.rewardCard}>
      <View style={styles.rewardHeader}>
        <Text style={styles.rewardTitle}>Next reward</Text>
        <View style={styles.daysBadge}>
          <Ionicons name="time-outline" size={14} color={KikiColors.teal} />
          <Text style={styles.daysText}>{app.rewardDaysLeft} days left</Text>
        </View>
      </View>

      <View style={styles.rewardBody}>
        <Image source={{ uri: app.rewardImage }} style={styles.rewardImage} contentFit="cover" />
        <View style={styles.rewardInfo}>
          <Text style={styles.rewardName}>{app.rewardTitle}</Text>
          <Text style={styles.rewardDesc}>{app.rewardDescription}</Text>
          <Text style={styles.rewardProgress}>
            <Text style={styles.rewardProgressBold}>
              {app.rewardProgress}/{app.rewardGoal}
            </Text>{' '}
            invites
          </Text>
        </View>
      </View>

      <View style={styles.progressTrack}>
        <View style={[styles.progressFill, { width: `${Math.max(progress * 100, 2)}%` }]} />
        <ProfileAvatar uri={userAvatar} size={28} style={styles.progressAvatar} />
      </View>

      <Text style={styles.rewardFooter}>
        Past invites won&apos;t count toward this round&apos;s rewards. Every prize you unlock is yours to
        claim at the end.
      </Text>
    </View>
  );
}

type NetworkSectionProps = {
  friends: Friend[];
  count: number;
};

export function NetworkSection({ friends, count }: NetworkSectionProps) {
  return (
    <View style={styles.networkSection}>
      <View style={styles.networkHeader}>
        <Text style={styles.networkTitle}>My Kiki Network</Text>
        <Text style={styles.networkCount}>
          {count} friend{count === 1 ? '' : 's'}
        </Text>
      </View>
      <View style={styles.friendsRow}>
        {friends.map((friend) => (
          <View key={friend.id} style={styles.friendItem}>
            <ProfileAvatar uri={friend.avatarUrl} size={56} />
            <Text style={styles.friendName} numberOfLines={1}>
              {friend.name}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: KikiColors.tealLight,
    borderRadius: KikiRadius.lg,
    padding: KikiSpacing.lg,
    gap: KikiSpacing.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerLabel: {
    color: KikiColors.teal,
    fontSize: 14,
    fontWeight: '600',
  },
  codeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: KikiSpacing.md,
  },
  code: {
    fontSize: 36,
    fontWeight: '800',
    color: KikiColors.teal,
    letterSpacing: 2,
  },
  link: {
    color: KikiColors.teal,
    fontSize: 14,
    textDecorationLine: 'underline',
  },
  waitlistCard: {
    backgroundColor: KikiColors.white,
    borderRadius: KikiRadius.lg,
    borderWidth: 1,
    borderColor: KikiColors.border,
    padding: KikiSpacing.lg,
  },
  waitlistText: {
    fontSize: 15,
    color: KikiColors.text,
    lineHeight: 22,
  },
  waitlistHighlight: {
    color: KikiColors.teal,
    fontWeight: '700',
  },
  rewardCard: {
    backgroundColor: KikiColors.white,
    borderRadius: KikiRadius.lg,
    borderWidth: 1,
    borderColor: KikiColors.border,
    padding: KikiSpacing.lg,
    gap: KikiSpacing.md,
  },
  rewardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rewardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: KikiColors.text,
  },
  daysBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: KikiColors.tealLight,
    borderRadius: KikiRadius.pill,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  daysText: {
    fontSize: 13,
    color: KikiColors.teal,
    fontWeight: '600',
  },
  rewardBody: {
    flexDirection: 'row',
    gap: KikiSpacing.md,
  },
  rewardImage: {
    width: 80,
    height: 80,
    borderRadius: KikiRadius.md,
  },
  rewardInfo: {
    flex: 1,
    gap: 4,
  },
  rewardName: {
    fontSize: 15,
    fontWeight: '700',
    color: KikiColors.text,
  },
  rewardDesc: {
    fontSize: 13,
    color: KikiColors.textSecondary,
    lineHeight: 18,
  },
  rewardProgress: {
    fontSize: 14,
    color: KikiColors.text,
    marginTop: 4,
  },
  rewardProgressBold: {
    fontWeight: '700',
    color: KikiColors.teal,
  },
  progressTrack: {
    height: 8,
    backgroundColor: KikiColors.tealLight,
    borderRadius: KikiRadius.pill,
    position: 'relative',
    justifyContent: 'center',
  },
  progressFill: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    backgroundColor: KikiColors.tealMuted,
    borderRadius: KikiRadius.pill,
  },
  progressAvatar: {
    position: 'absolute',
    left: 0,
    top: -10,
  },
  rewardFooter: {
    fontSize: 12,
    color: KikiColors.textMuted,
    lineHeight: 17,
  },
  networkSection: {
    gap: KikiSpacing.md,
  },
  networkHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  networkTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: KikiColors.text,
  },
  networkCount: {
    fontSize: 14,
    color: KikiColors.textSecondary,
  },
  friendsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: KikiSpacing.lg,
  },
  friendItem: {
    alignItems: 'center',
    width: 72,
    gap: 6,
  },
  friendName: {
    fontSize: 12,
    color: KikiColors.textSecondary,
    textAlign: 'center',
  },
});
