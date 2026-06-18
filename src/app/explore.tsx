import { Ionicons } from '@expo/vector-icons';
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

import { ListingCard } from '@/components/kiki/listing-card';
import { ScreenContainer, ScreenHeader } from '@/components/kiki/screen-layout';
import { KikiColors, KikiRadius, KikiSpacing } from '@/constants/kiki-theme';
import { mockData } from '@/data';

export default function ExploreScreen() {
  const { app, listings } = mockData;

  return (
    <ScreenContainer>
      <ScreenHeader title="Explore" />
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}>
        <View style={styles.searchRow}>
          <View style={styles.searchBar}>
            <Ionicons name="search" size={18} color={KikiColors.textMuted} />
            <TextInput
              placeholder="Search by dates or duration"
              placeholderTextColor={KikiColors.textMuted}
              style={styles.searchInput}
              editable={false}
            />
          </View>
          <View style={styles.filtersButton}>
            <Text style={styles.filtersText}>Filters</Text>
          </View>
        </View>

        <View style={styles.actionRow}>
          <View style={styles.actionButton}>
            <Ionicons name="notifications-outline" size={16} color={KikiColors.text} />
            <Text style={styles.actionText}>Search Notifications</Text>
          </View>
          <View style={styles.actionButton}>
            <Ionicons name="heart-outline" size={16} color={KikiColors.heart} />
            <Text style={styles.actionText}>Favourites</Text>
          </View>
        </View>

        <View style={styles.statusPill}>
          <Text style={styles.statusText}>🏠 +{app.kikisAddedToday} Kiki&apos;s added today!</Text>
        </View>

        <View style={styles.listings}>
          {listings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: KikiSpacing.lg,
    paddingBottom: KikiSpacing.xxl,
    gap: KikiSpacing.md,
  },
  searchRow: {
    flexDirection: 'row',
    gap: KikiSpacing.sm,
    alignItems: 'center',
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: KikiSpacing.sm,
    borderWidth: 1,
    borderColor: KikiColors.border,
    borderRadius: KikiRadius.pill,
    paddingHorizontal: KikiSpacing.md,
    paddingVertical: 10,
    backgroundColor: KikiColors.white,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: KikiColors.text,
  },
  filtersButton: {
    borderWidth: 1,
    borderColor: KikiColors.teal,
    borderRadius: KikiRadius.pill,
    paddingHorizontal: KikiSpacing.lg,
    paddingVertical: 10,
  },
  filtersText: {
    color: KikiColors.teal,
    fontWeight: '600',
    fontSize: 15,
  },
  actionRow: {
    flexDirection: 'row',
    gap: KikiSpacing.sm,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    borderWidth: 1,
    borderColor: KikiColors.border,
    borderRadius: KikiRadius.pill,
    paddingVertical: 10,
    backgroundColor: KikiColors.white,
  },
  actionText: {
    fontSize: 13,
    color: KikiColors.text,
    fontWeight: '500',
  },
  statusPill: {
    alignSelf: 'center',
    backgroundColor: KikiColors.tealLight,
    borderRadius: KikiRadius.pill,
    paddingHorizontal: KikiSpacing.lg,
    paddingVertical: 6,
  },
  statusText: {
    fontSize: 13,
    color: KikiColors.teal,
    fontWeight: '600',
  },
  listings: {
    gap: KikiSpacing.lg,
    marginTop: KikiSpacing.sm,
  },
});
