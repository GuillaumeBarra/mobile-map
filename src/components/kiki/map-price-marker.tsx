import { StyleSheet, Text, View } from 'react-native';

import { KikiColors, KikiRadius } from '@/constants/kiki-theme';

type MapPriceMarkerProps = {
  price: number;
  selected?: boolean;
};

export function MapPriceMarker({ price, selected = false }: MapPriceMarkerProps) {
  return (
    <View style={[styles.marker, selected && styles.markerSelected]} collapsable={false}>
      <Text style={[styles.priceText, selected && styles.priceTextSelected]}>£{price}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  marker: {
    backgroundColor: KikiColors.white,
    borderRadius: KikiRadius.pill,
    paddingHorizontal: 10,
    paddingVertical: 6,
    minWidth: 44,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.18,
    shadowRadius: 4,
    elevation: 4,
    borderWidth: 1,
    borderColor: KikiColors.border,
  },
  markerSelected: {
    backgroundColor: KikiColors.text,
    borderColor: KikiColors.text,
    transform: [{ scale: 1.08 }],
  },
  priceText: {
    fontSize: 13,
    fontWeight: '700',
    color: KikiColors.text,
  },
  priceTextSelected: {
    color: KikiColors.white,
  },
});
