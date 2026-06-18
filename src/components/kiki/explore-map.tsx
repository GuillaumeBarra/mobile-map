import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

import { KikiColors, KikiRadius } from '@/constants/kiki-theme';
import type { AppConfig, Listing } from '@/data';

import { MapPriceMarker } from './map-price-marker';

export type ExploreMapHandle = {
  focusListing: (listing: Listing) => void;
};

type ExploreMapProps = {
  app: AppConfig;
  listings: Listing[];
  selectedListingId: string | null;
  onListingPress: (listingId: string) => void;
};

const MAP_DELTA = {
  latitudeDelta: 0.045,
  longitudeDelta: 0.045,
};

function MapPlaceholder({
  listings,
  selectedListingId,
  onListingPress,
}: Pick<ExploreMapProps, 'listings' | 'selectedListingId' | 'onListingPress'>) {
  const centerLat = 51.5074;
  const centerLng = -0.1278;
  const latSpread = 0.012;
  const lngSpread = 0.018;

  return (
    <View style={styles.placeholder}>
      <Image
        source={{
          uri: 'https://images.unsplash.com/photo-1529655683826-aba9b3e77383?w=1200&h=800&fit=crop',
        }}
        style={StyleSheet.absoluteFill}
        contentFit="cover"
      />
      <View style={styles.placeholderOverlay} />
      {listings.map((listing, index) => {
        const row = Math.floor(index / 4);
        const col = index % 4;
        const latOffset = (listing.latitude - centerLat) / latSpread;
        const lngOffset = (listing.longitude - centerLng) / lngSpread;

        return (
          <Pressable
            key={listing.id}
            onPress={() => onListingPress(listing.id)}
            style={[
              styles.placeholderMarker,
              {
                top: `${42 - latOffset * 14 + row * 0.5}%`,
                left: `${38 + lngOffset * 16 + col * 0.2}%`,
              },
            ]}>
            <MapPriceMarker price={listing.price} selected={selectedListingId === listing.id} />
          </Pressable>
        );
      })}
      <View style={styles.cityLabel}>
        <Ionicons name="location" size={14} color={KikiColors.text} />
        <Text style={styles.cityText}>Central London</Text>
      </View>
    </View>
  );
}

export const ExploreMap = forwardRef<ExploreMapHandle, ExploreMapProps>(function ExploreMap(
  { app, listings, selectedListingId, onListingPress },
  ref,
) {
  const mapRef = useRef<MapView>(null);
  const [tracksViews, setTracksViews] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setTracksViews(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (selectedListingId !== null) {
      setTracksViews(true);
      const timer = setTimeout(() => setTracksViews(false), 500);
      return () => clearTimeout(timer);
    }
  }, [selectedListingId]);

  useImperativeHandle(ref, () => ({
    focusListing(listing: Listing) {
      mapRef.current?.animateToRegion(
        {
          latitude: listing.latitude,
          longitude: listing.longitude,
          latitudeDelta: 0.025,
          longitudeDelta: 0.025,
        },
        350,
      );
    },
  }));

  if (Platform.OS === 'web') {
    return (
      <MapPlaceholder
        listings={listings}
        selectedListingId={selectedListingId}
        onListingPress={onListingPress}
      />
    );
  }

  return (
    <MapView
      ref={mapRef}
      style={StyleSheet.absoluteFill}
      initialRegion={{
        latitude: app.mapLatitude,
        longitude: app.mapLongitude,
        ...MAP_DELTA,
      }}
      showsUserLocation={false}
      showsCompass={false}
      rotateEnabled={false}
      moveOnMarkerPress={false}>
      {listings.map((listing) => (
        <Marker
          key={listing.id}
          identifier={listing.id}
          coordinate={{ latitude: listing.latitude, longitude: listing.longitude }}
          anchor={{ x: 0.5, y: 0.5 }}
          onPress={() => onListingPress(listing.id)}
          tracksViewChanges={tracksViews}>
          <MapPriceMarker price={listing.price} selected={selectedListingId === listing.id} />
        </Marker>
      ))}
    </MapView>
  );
});

const styles = StyleSheet.create({
  placeholder: {
    ...StyleSheet.absoluteFill,
    backgroundColor: '#D6EAF0',
  },
  placeholderOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
  placeholderMarker: {
    position: 'absolute',
  },
  cityLabel: {
    position: 'absolute',
    top: '42%',
    left: '38%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: KikiColors.white,
    borderRadius: KikiRadius.pill,
    paddingHorizontal: 12,
    paddingVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 3,
  },
  cityText: {
    fontSize: 14,
    fontWeight: '700',
    color: KikiColors.text,
  },
});
