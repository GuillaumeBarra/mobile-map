import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';

import { KikiColors, KikiRadius, KikiSpacing } from '@/constants/kiki-theme';
import type { Listing } from '@/data';
import { listingImageUrl } from '@/data';
import { Image } from 'expo-image';

import { ProfileAvatar } from './profile-avatar';

type ListingCardProps = {
  listing: Listing;
};

export function ListingCard({ listing }: ListingCardProps) {
  const dateLabel = listing.extraDates
    ? `${listing.dateStart} - ${listing.dateEnd}`
    : `${listing.dateStart} - ${listing.dateEnd}`;

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <ProfileAvatar uri={listing.hostAvatar} flag={listing.hostFlag} size={44} />
        <View style={styles.headerText}>
          <Text style={styles.title}>{listing.title}</Text>
          <View style={styles.locationRow}>
            <Ionicons name="location-outline" size={14} color={KikiColors.textSecondary} />
            <Text style={styles.location}>{listing.location}</Text>
          </View>
          <View style={styles.dateRow}>
            <View style={styles.datePill}>
              <Text style={styles.dateText}>{dateLabel}</Text>
            </View>
            {listing.extraDates ? (
              <View style={styles.extraDatesPill}>
                <Text style={styles.extraDatesText}>+{listing.extraDates}</Text>
              </View>
            ) : null}
          </View>
        </View>
        <Ionicons
          name={listing.isFavourite ? 'heart' : 'heart-outline'}
          size={22}
          color={KikiColors.heart}
        />
      </View>

      <View style={styles.imageWrap}>
        <Image
          source={{ uri: listingImageUrl(listing.imageSeed) }}
          style={styles.image}
          contentFit="cover"
        />
        <View style={styles.priceBadge}>
          <Text style={styles.priceType}>{listing.listingType}</Text>
          {listing.bedrooms ? (
            <View style={styles.bedroomRow}>
              <Text style={styles.priceType}> {listing.bedrooms} </Text>
              <Ionicons name="bed-outline" size={12} color={KikiColors.text} />
            </View>
          ) : null}
          <Text style={styles.priceAmount}> £{listing.price}</Text>
          <Text style={styles.priceUnit}> / night</Text>
        </View>
        <View style={styles.favouritesBadge}>
          <Ionicons name="heart" size={12} color={KikiColors.heart} />
          <Text style={styles.favouritesText}>by {listing.favouritesCount} people</Text>
        </View>
        <View style={styles.dots}>
          {[0, 1, 2, 3].map((dot) => (
            <View key={dot} style={[styles.dot, dot === 0 && styles.dotActive]} />
          ))}
        </View>
      </View>

      <View style={styles.footer}>
        <View style={styles.vouchRow}>
          <ProfileAvatar uri={listing.vouchedAvatar} size={20} />
          <Text style={styles.vouchText}>Vouched for by {listing.vouchedBy}</Text>
        </View>
        {listing.pastBookings > 0 ? (
          <View style={styles.bookingBadge}>
            <Text style={styles.bookingText}>
              {listing.pastBookings} Past Booking{listing.pastBookings > 1 ? 's' : ''}
            </Text>
          </View>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: KikiColors.white,
    borderRadius: KikiRadius.lg,
    borderWidth: 1,
    borderColor: KikiColors.border,
    padding: KikiSpacing.lg,
    gap: KikiSpacing.md,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: KikiSpacing.md,
  },
  headerText: {
    flex: 1,
    gap: 4,
  },
  title: {
    fontSize: 17,
    fontWeight: '700',
    color: KikiColors.text,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  location: {
    fontSize: 14,
    color: KikiColors.textSecondary,
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: KikiSpacing.sm,
    marginTop: 2,
  },
  datePill: {
    backgroundColor: KikiColors.datePill,
    borderRadius: KikiRadius.pill,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  dateText: {
    color: KikiColors.white,
    fontSize: 12,
    fontWeight: '600',
  },
  extraDatesPill: {
    backgroundColor: KikiColors.border,
    borderRadius: KikiRadius.pill,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  extraDatesText: {
    fontSize: 12,
    color: KikiColors.textSecondary,
    fontWeight: '600',
  },
  imageWrap: {
    borderRadius: KikiRadius.lg,
    overflow: 'hidden',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 220,
  },
  priceBadge: {
    position: 'absolute',
    top: KikiSpacing.md,
    left: KikiSpacing.md,
    backgroundColor: KikiColors.white,
    borderRadius: KikiRadius.pill,
    paddingHorizontal: 12,
    paddingVertical: 6,
    flexDirection: 'row',
    alignItems: 'center',
  },
  priceType: {
    fontSize: 13,
    color: KikiColors.text,
  },
  bedroomRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  priceAmount: {
    fontSize: 13,
    fontWeight: '700',
    color: KikiColors.text,
  },
  priceUnit: {
    fontSize: 13,
    color: KikiColors.textSecondary,
  },
  favouritesBadge: {
    position: 'absolute',
    bottom: KikiSpacing.md,
    left: KikiSpacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(255,255,255,0.92)',
    borderRadius: KikiRadius.pill,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  favouritesText: {
    fontSize: 12,
    color: KikiColors.text,
  },
  dots: {
    position: 'absolute',
    bottom: KikiSpacing.md,
    alignSelf: 'center',
    left: '50%',
    transform: [{ translateX: -24 }],
    flexDirection: 'row',
    gap: 4,
    backgroundColor: 'rgba(0,0,0,0.35)',
    borderRadius: KikiRadius.pill,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255,255,255,0.5)',
  },
  dotActive: {
    backgroundColor: KikiColors.white,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  vouchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flex: 1,
  },
  vouchText: {
    fontSize: 13,
    color: KikiColors.teal,
    fontWeight: '500',
  },
  bookingBadge: {
    borderWidth: 1,
    borderColor: KikiColors.teal,
    borderRadius: KikiRadius.pill,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  bookingText: {
    fontSize: 12,
    color: KikiColors.teal,
    fontWeight: '600',
  },
});
