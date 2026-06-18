import { Image } from 'expo-image';
import { StyleSheet, Text, View, type ViewStyle } from 'react-native';

import { KikiColors, KikiRadius } from '@/constants/kiki-theme';
import { flagEmoji } from '@/data';

type ProfileAvatarProps = {
  uri: string;
  flag?: string;
  size?: number;
  style?: ViewStyle;
};

export function ProfileAvatar({ uri, flag, size = 48, style }: ProfileAvatarProps) {
  const flagFontSize = Math.round(size * 0.28);

  return (
    <View style={[styles.container, { width: size, height: size }, style]}>
      <Image
        source={{ uri }}
        style={{ width: size, height: size, borderRadius: size / 2 }}
        contentFit="cover"
      />
      {flag ? (
        <View style={styles.flagBadge}>
          <Text style={{ fontSize: flagFontSize }}>{flagEmoji(flag)}</Text>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  flagBadge: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    backgroundColor: KikiColors.white,
    borderRadius: KikiRadius.sm,
    paddingHorizontal: 2,
    paddingVertical: 1,
  },
});
