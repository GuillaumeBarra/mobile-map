import { StyleSheet, Text, View, type ViewProps } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { KikiColors, KikiSpacing } from '@/constants/kiki-theme';

type ScreenContainerProps = ViewProps & {
  children: React.ReactNode;
};

export function ScreenContainer({ children, style, ...props }: ScreenContainerProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top }, style]} {...props}>
      {children}
    </View>
  );
}

type ScreenHeaderProps = {
  title: string;
  rightAction?: React.ReactNode;
};

export function ScreenHeader({ title, rightAction }: ScreenHeaderProps) {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>{title}</Text>
      {rightAction}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: KikiColors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: KikiSpacing.lg,
    paddingVertical: KikiSpacing.md,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: KikiColors.text,
  },
});
