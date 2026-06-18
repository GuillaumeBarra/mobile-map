import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { KikiColors, KikiRadius, KikiSpacing } from '@/constants/kiki-theme';
import type { AppConfig } from '@/data';

const FILTERS = ['Any', 'Room', 'Whole Place'] as const;

type ExploreSearchBarProps = {
  app: AppConfig;
};

export function ExploreSearchBar({ app }: ExploreSearchBarProps) {
  const insets = useSafeAreaInsets();
  const [activeFilter, setActiveFilter] = useState<(typeof FILTERS)[number]>('Any');

  return (
    <View style={[styles.container, { paddingTop: insets.top + KikiSpacing.sm }]}>
      <View style={styles.searchRow}>
        <View style={styles.searchPill}>
          <View style={styles.searchTextWrap}>
            <Text style={styles.searchTitle}>{app.exploreTitle}</Text>
            <Text style={styles.searchSubtitle}>{app.exploreSubtitle}</Text>
          </View>
        </View>
        <Pressable style={styles.filterButton}>
          <Ionicons name="options-outline" size={22} color={KikiColors.text} />
        </Pressable>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filters}>
        {FILTERS.map((filter) => {
          const isActive = activeFilter === filter;
          return (
            <Pressable
              key={filter}
              onPress={() => setActiveFilter(filter)}
              style={[styles.filterPill, isActive && styles.filterPillActive]}>
              <Text style={[styles.filterText, isActive && styles.filterTextActive]}>{filter}</Text>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    paddingHorizontal: KikiSpacing.lg,
    gap: KikiSpacing.md,
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: KikiSpacing.sm,
  },
  searchPill: {
    flex: 1,
    backgroundColor: KikiColors.white,
    borderRadius: KikiRadius.pill,
    paddingHorizontal: KikiSpacing.lg,
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 6,
  },
  searchTextWrap: {
    alignItems: 'center',
    gap: 2,
  },
  searchTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: KikiColors.text,
  },
  searchSubtitle: {
    fontSize: 13,
    color: KikiColors.textSecondary,
  },
  filterButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: KikiColors.white,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 6,
  },
  filters: {
    gap: KikiSpacing.sm,
    paddingBottom: KikiSpacing.xs,
  },
  filterPill: {
    borderWidth: 1,
    borderColor: KikiColors.border,
    borderRadius: KikiRadius.pill,
    paddingHorizontal: KikiSpacing.lg,
    paddingVertical: 8,
    backgroundColor: KikiColors.white,
  },
  filterPillActive: {
    borderColor: KikiColors.text,
    borderWidth: 2,
  },
  filterText: {
    fontSize: 14,
    color: KikiColors.textSecondary,
    fontWeight: '500',
  },
  filterTextActive: {
    color: KikiColors.text,
    fontWeight: '600',
  },
});
