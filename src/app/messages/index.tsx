import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

import { MessageThreadRow } from '@/components/kiki/message-thread-row';
import { ScreenContainer, ScreenHeader } from '@/components/kiki/screen-layout';
import { KikiColors, KikiRadius, KikiSpacing } from '@/constants/kiki-theme';
import { mockData } from '@/data';

const FILTERS = ['All', 'Unread', 'Hosting'] as const;

export default function MessagesScreen() {
  const router = useRouter();
  const { messages } = mockData;
  const [query, setQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<(typeof FILTERS)[number]>('All');

  const filteredMessages = useMemo(() => {
    return messages.filter((message) => {
      const matchesQuery =
        query.trim().length === 0 ||
        message.contactName.toLowerCase().includes(query.toLowerCase()) ||
        message.lastMessage.toLowerCase().includes(query.toLowerCase()) ||
        message.listingTitle.toLowerCase().includes(query.toLowerCase());

      const matchesFilter =
        activeFilter === 'All' ||
        (activeFilter === 'Unread' && message.unread) ||
        (activeFilter === 'Hosting' && message.listingTitle.length > 0);

      return matchesQuery && matchesFilter;
    });
  }, [activeFilter, messages, query]);

  return (
    <ScreenContainer>
      <ScreenHeader title="Messages" />

      <View style={styles.searchWrap}>
        <Ionicons name="search" size={18} color={KikiColors.textMuted} />
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="Search messages"
          placeholderTextColor={KikiColors.textMuted}
          style={styles.searchInput}
        />
      </View>

      <View style={styles.filters}>
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
      </View>

      <ScrollView
        style={styles.list}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}>
        {filteredMessages.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="chatbubbles-outline" size={36} color={KikiColors.textMuted} />
            <Text style={styles.emptyText}>No messages match your search</Text>
          </View>
        ) : (
          filteredMessages.map((message) => (
            <MessageThreadRow
              key={message.id}
              message={message}
              onPress={() => router.push(`/messages/${message.id}`)}
            />
          ))
        )}
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  searchWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: KikiSpacing.sm,
    marginHorizontal: KikiSpacing.lg,
    marginBottom: KikiSpacing.md,
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
  filters: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: KikiSpacing.lg,
    gap: KikiSpacing.sm,
    marginBottom: KikiSpacing.md,
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
    backgroundColor: KikiColors.tealLight,
    borderColor: KikiColors.teal,
  },
  filterText: {
    fontSize: 14,
    color: KikiColors.textSecondary,
    fontWeight: '500',
  },
  filterTextActive: {
    color: KikiColors.teal,
    fontWeight: '600',
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: KikiSpacing.lg,
    paddingBottom: KikiSpacing.xxl,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 80,
    gap: KikiSpacing.md,
  },
  emptyText: {
    fontSize: 15,
    color: KikiColors.textSecondary,
  },
});
