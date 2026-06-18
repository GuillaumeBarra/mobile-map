import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { useCallback, useMemo, useRef, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import type { ScrollView } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { ExploreMap, type ExploreMapHandle } from '@/components/kiki/explore-map';
import { ExploreSearchBar } from '@/components/kiki/explore-search-bar';
import { PlaceInfoCard } from '@/components/kiki/place-info-card';
import { KikiColors, KikiRadius, KikiSpacing } from '@/constants/kiki-theme';
import { mockData } from '@/data';

const TAB_BAR_HEIGHT = 88;
const DEFAULT_SHEET_INDEX = 1;

export default function ExploreScreen() {
  const { app, listings } = mockData;
  const bottomSheetRef = useRef<BottomSheet>(null);
  const scrollRef = useRef<ScrollView>(null);
  const mapRef = useRef<ExploreMapHandle>(null);

  const [selectedListingId, setSelectedListingId] = useState<string | null>(null);
  const snapPoints = useMemo(() => ['13%', '45%', '92%'], []);

  const drawerListings = useMemo(() => {
    if (!selectedListingId) {
      return listings;
    }

    const selected = listings.find((listing) => listing.id === selectedListingId);
    if (!selected) {
      return listings;
    }

    return [selected, ...listings.filter((listing) => listing.id !== selectedListingId)];
  }, [listings, selectedListingId]);

  const handleListingSelect = useCallback(
    (listingId: string) => {
      const listing = listings.find((item) => item.id === listingId);
      if (!listing) {
        return;
      }

      setSelectedListingId(listingId);
      mapRef.current?.focusListing(listing);
      bottomSheetRef.current?.snapToIndex(DEFAULT_SHEET_INDEX);

      requestAnimationFrame(() => {
        scrollRef.current?.scrollTo({ y: 0, animated: true });
      });
    },
    [listings],
  );

  const handleSheetChange = useCallback((index: number) => {
    if (index >= DEFAULT_SHEET_INDEX && selectedListingId) {
      requestAnimationFrame(() => {
        scrollRef.current?.scrollTo({ y: 0, animated: true });
      });
    }
  }, [selectedListingId]);

  return (
    <GestureHandlerRootView style={styles.root}>
      <View style={styles.container}>
        <ExploreMap
          ref={mapRef}
          app={app}
          listings={listings}
          selectedListingId={selectedListingId}
          onListingPress={handleListingSelect}
        />
        <ExploreSearchBar app={app} />

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
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 12,
  },
  sheetContent: {
    paddingHorizontal: KikiSpacing.lg,
    paddingBottom: TAB_BAR_HEIGHT + KikiSpacing.lg,
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
