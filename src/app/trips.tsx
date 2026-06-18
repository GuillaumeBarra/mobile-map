import { Ionicons } from '@expo/vector-icons';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { ScreenContainer, ScreenHeader } from '@/components/kiki/screen-layout';
import { KikiColors, KikiRadius, KikiSpacing } from '@/constants/kiki-theme';

export default function TripsScreen() {
  return (
    <ScreenContainer>
      <ScreenHeader title="Kiki Trips" />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.card}>
          <Text style={styles.intro}>
            This is where you&apos;ll see all of your trips, requests, and matches
          </Text>

          <Text style={styles.body}>
            If you are going away and want to host, first list your home and then come back here to add
            all of the dates you&apos;re away!
          </Text>
          <View style={styles.button}>
            <Ionicons name="add" size={20} color={KikiColors.white} />
            <Text style={styles.buttonText}>List your home</Text>
          </View>

          <Text style={styles.body}>
            If you are looking for a place to stay, explore our listings, send a booking request, and
            come back here to check on the status of them
          </Text>
          <View style={styles.button}>
            <Ionicons name="search" size={18} color={KikiColors.white} />
            <Text style={styles.buttonText}>Explore listings</Text>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: KikiSpacing.lg,
  },
  card: {
    backgroundColor: KikiColors.white,
    borderRadius: KikiRadius.lg,
    borderWidth: 1,
    borderColor: KikiColors.border,
    padding: KikiSpacing.xl,
    gap: KikiSpacing.lg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  intro: {
    fontSize: 16,
    color: KikiColors.text,
    lineHeight: 24,
  },
  body: {
    fontSize: 15,
    color: KikiColors.textSecondary,
    lineHeight: 22,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: KikiSpacing.sm,
    backgroundColor: KikiColors.teal,
    borderRadius: KikiRadius.md,
    paddingVertical: 14,
  },
  buttonText: {
    color: KikiColors.white,
    fontSize: 16,
    fontWeight: '600',
  },
});
