import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import type { ScrollView } from 'react-native';

import { ExploreMap, type ExploreMapHandle } from '@/components/kiki/explore-map';
import {
  ExploreSearchBar,
  type ListingTypeFilter,
} from '@/components/kiki/explore-search-bar';
import { PlaceInfoCard } from '@/components/kiki/place-info-card';
import {
  KikiColors,
  KikiRadius,
  KikiShadows,
  KikiSpacing,
  KikiTabBarHeight,
} from '@/constants/kiki-theme';
import { mockData, type Listing } from '@/data';

const DEFAULT_SHEET_INDEX = 1;

function filterListings(listings: Listing[], filter: ListingTypeFilter): Listing[] {
  if (filter === 'Any') {
    return listings;
  }

  return listings.filter((listing) => listing.listingType === filter);
}

function withSelectedFirst(listings: Listing[], selectedId: string | null): Listing[] {
  if (!selectedId) {
    return listings;
  }

  const selected = listings.find((listing) => listing.id === selectedId);
  if (!selected) {
    return listings;
  }

  return [selected, ...listings.filter((listing) => listing.id !== selectedId)];
}

export default function ExploreScreen() {
  const { app, listings } = mockData;
  const bottomSheetRef = useRef<BottomSheet>(null);
  const scrollRef = useRef<ScrollView>(null);
  const mapRef = useRef<ExploreMapHandle>(null);

  const [selectedListingId, setSelectedListingId] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<ListingTypeFilter>('Any');
  const snapPoints = useMemo(() => ['13%', '45%', '92%'], []);

  const filteredListings = useMemo(
    () => filterListings(listings, activeFilter),
    [listings, activeFilter],
  );

  const drawerListings = useMemo(
    () => withSelectedFirst(filteredListings, selectedListingId),
    [filteredListings, selectedListingId],
  );

  useEffect(() => {
    if (
      selectedListingId &&
      !filteredListings.some((listing) => listing.id === selectedListingId)
    ) {
      setSelectedListingId(null);
    }
  }, [filteredListings, selectedListingId]);

  const scrollSheetToTop = useCallback(() => {
    requestAnimationFrame(() => {
      scrollRef.current?.scrollTo({ y: 0, animated: true });
    });
  }, []);

  const handleListingSelect = useCallback(
    (listingId: string) => {
      const listing = filteredListings.find((item) => item.id === listingId);
      if (!listing) {
        return;
      }

      setSelectedListingId(listingId);
      mapRef.current?.focusListing(listing);
      bottomSheetRef.current?.snapToIndex(DEFAULT_SHEET_INDEX);
      scrollSheetToTop();
    },
    [filteredListings, scrollSheetToTop],
  );

  const handleSheetChange = useCallback(
    (index: number) => {
      if (index >= DEFAULT_SHEET_INDEX && selectedListingId) {
        scrollSheetToTop();
      }
    },
    [selectedListingId, scrollSheetToTop],
  );

  return (
    <View style={styles.container}>
      <ExploreMap
        ref={mapRef}
        app={app}
        listings={filteredListings}
        selectedListingId={selectedListingId}
        onListingPress={handleListingSelect}
      />
      <ExploreSearchBar
        app={app}
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
      />

      <BottomSheet
        ref={bottomSheetRef}
        index={DEFAULT_SHEET_INDEX}
        snapPoints={snapPoints}
        enablePanDownToClose={false}
        onChange={handleSheetChange}
        handleIndicatorStyle={styles.handle}
        backgroundStyle={styles.sheetBackground}>
        <BottomSheetScrollView
          ref={scrollRef}
          contentContainerStyle={styles.sheetContent}
          showsVerticalScrollIndicator={false}>
          <Text style={styles.resultsCount}>
            {drawerListings.length} home{drawerListings.length === 1 ? '' : 's'}
          </Text>

          {drawerListings.map((listing) => (
            <PlaceInfoCard
              key={listing.id}
              listing={listing}
              highlighted={selectedListingId === listing.id}
            />
          ))}
        </BottomSheetScrollView>
      </BottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: KikiColors.screenBackground,
  },
  handle: {
    backgroundColor: KikiColors.textMuted,
    width: 40,
  },
  sheetBackground: {
    backgroundColor: KikiColors.white,
    borderTopLeftRadius: KikiRadius.xl,
    borderTopRightRadius: KikiRadius.xl,
    ...KikiShadows.sheet,
  },
  sheetContent: {
    paddingHorizontal: KikiSpacing.lg,
    paddingBottom: KikiTabBarHeight + KikiSpacing.lg,
    gap: KikiSpacing.lg,
  },
  resultsCount: {
    textAlign: 'center',
    fontSize: 15,
    fontWeight: '600',
    color: KikiColors.text,
    marginBottom: KikiSpacing.xs,
  },
});
